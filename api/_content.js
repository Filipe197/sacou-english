// Conteúdo das lições e lista CEFR-J lidos no servidor (para o treino com IA e
// para o professor saber em que o aluno costuma errar). Os arquivos vão junto
// com a função pelo "includeFiles" do vercel.json.
import fs from 'node:fs';
import path from 'node:path';
import { loadVocab, allowedFor } from '../scripts/cefr.mjs';

let items = null;
let vocab = null;
const allowedCache = {};

export function contentIndex() {
  if (items) return items;
  items = new Map();
  const dir = path.join(process.cwd(), 'src/content');
  for (const lv of fs.readdirSync(dir).filter(d => /^[abc][12]$/.test(d))) {
    for (const f of fs.readdirSync(path.join(dir, lv)).filter(f => f.endsWith('.json'))) {
      const u = JSON.parse(fs.readFileSync(path.join(dir, lv, f), 'utf8'));
      const unit = { id: u.id, level: u.level, order: u.order, title: u.title, guide: u.guide?.title || '' };
      for (const l of u.lessons || []) for (const it of l.items || []) items.set(it.id, { item: it, unit, lessonId: l.id });
    }
  }
  return items;
}

export function allowedWords(level) {
  if (!vocab) vocab = loadVocab(fs.readFileSync(path.join(process.cwd(), 'content/sources/cefrj-vocabulary-profile-1.5.csv'), 'utf8'));
  return (allowedCache[level] ||= allowedFor(vocab, level));
}

// Frase curta que descreve um exercício (para a IA entender o ponto da matéria)
export function describeItem(it) {
  const frase = it.type === 'choice' ? it.en.replace('___', `[${it.answer}]`)
    : it.type === 'build' || it.type === 'type' ? `${it.pt} → ${it.answer}`
    : it.type === 'dialogue' ? `${(it.lines || []).map(l => l[1]).join(' / ')} → ${it.answer}`
    : it.en ? `${it.en}${it.answer ? ` → ${it.answer}` : ''}`
    : it.pairs ? it.pairs.map(p => p.join(' = ')).join(', ') : '';
  return `${frase} (por quê: ${it.why || ''})`;
}

// Erros que o aluno mais repete (lidos com o login dele, respeitando as regras do banco)
export async function recurringMistakes(sb, limit = 6) {
  if (!sb) return [];
  const { data } = await sb.from('mistakes').select('item_id,times').eq('resolved', false).order('times', { ascending: false }).order('last_seen', { ascending: false }).limit(limit);
  const idx = contentIndex();
  return (data || []).map(m => ({ ...m, found: idx.get(m.item_id) })).filter(m => m.found);
}
