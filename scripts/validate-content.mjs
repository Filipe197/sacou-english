// Valida o conteúdo das lições antes de cada build.
// Se houver ERRO, o build falha (o Vercel não publica conteúdo quebrado).
//
// Checagens:
//  1. Estrutura: ids únicos, tipos válidos, resposta presente nas opções,
//     explicação ("why") em todo exercício, peças do "build" formam a resposta.
//  2. Vocabulário: toda palavra em inglês precisa estar no nível da unidade (ou abaixo) na
//     CEFR-J Wordlist (Tono Laboratory, TUFS), ser um nome próprio da lista
//     NAMES, ou estar declarada em "extra_vocab" da unidade (vira AVISO).
//  3. Progressão: uma palavra de "words" só pode aparecer em exercícios a
//     partir da unidade em que é apresentada (AVISO se aparecer antes).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSV = path.join(root, 'content/sources/cefrj-vocabulary-profile-1.5.csv');
const CONTENT_DIR = path.join(root, 'src/content');
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

import { NAMES, tokens, known, loadVocab, OCTANOVE_CSV } from './cefr.mjs';

const VOCAB = loadVocab(fs.readFileSync(CSV, 'utf8'), fs.readFileSync(path.join(root, OCTANOVE_CSV), 'utf8'));

// ---------- validação ----------
const errors = []; const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const files = fs.readdirSync(CONTENT_DIR).filter(d => /^[abc][12]$/.test(d))
  .flatMap(d => fs.readdirSync(path.join(CONTENT_DIR, d)).filter(f => f.endsWith('.json')).map(f => `${d}/${f}`)).sort();
const ids = new Set();
const TYPES = new Set(['choice', 'build', 'match', 'listen', 'meaning', 'type', 'dictation', 'speak', 'dialogue', 'story', 'quiz']);
let itemCount = 0; let wordCount = 0;
const introduced = new Map(); // palavra -> ordem da unidade

const units = files.map(f => {
  const u = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'));
  if (!LEVEL_ORDER.includes(u.level)) err(f, `nível inválido "${u.level}"`);
  if (!f.startsWith(String(u.level).toLowerCase() + '/')) err(f, `arquivo está na pasta errada para o nível ${u.level}`);
  return { f, u, rank: LEVEL_ORDER.indexOf(u.level) * 100 + u.order };
}).sort((a, b) => a.rank - b.rank);

for (const { u, rank } of units) for (const [en] of u.words || []) {
  for (const t of tokens(en)) if (!introduced.has(t)) introduced.set(t, { rank, label: `${u.level}-U${u.order}` });
}

for (const { f, u, rank } of units) {
  const W = `${f}`;
  const allowed = new Set(LEVEL_ORDER.slice(0, LEVEL_ORDER.indexOf(u.level) + 1).flatMap(l => [...VOCAB[l]]));
  for (const k of ['id', 'title', 'order', 'can_do', 'guide', 'lessons']) if (u[k] == null) err(W, `campo "${k}" faltando`);
  if (!u.can_do?.source) err(W, 'can_do sem "source" (descritor CEFR de referência)');
  if (!Array.isArray(u.core_inventory) || !u.core_inventory.length) err(W, 'core_inventory vazio');
  const extra = new Map((u.extra_vocab || []).map(e => [e.word.toLowerCase(), e.reason]));
  for (const [w, reason] of extra) if (!reason) err(W, `extra_vocab "${w}" sem justificativa`);
  const extraSet = new Set(extra.keys());
  const early = new Set();

  const checkEn = (where, text) => {
    for (const t of tokens(text)) {
      wordCount++;
      const k = known(t, extraSet, allowed);
      if (k === null) err(where, `palavra acima do ${u.level} (CEFR-J): "${t}" em "${text}"`);
      else if (k === 'extra') warn(where, `palavra extra "${t}" (justificativa: ${extra.get(t) || 'ver extra_vocab'})`);
      const intro = introduced.get(t);
      if (intro && intro.rank > rank) early.add(`${t} (${intro.label})`);
    }
  };

  for (const [en, pt] of u.words || []) {
    if (!pt) err(W, `palavra "${en}" sem tradução`);
    checkEn(`${W} words`, en);
    // par "boyfriend / girlfriend" = "namorado / namorada": os dois lados precisam ter o mesmo número de partes,
    // senão a dica de palavra mostra a tradução errada (ex.: boyfriend = namorado / namorada)
    const ne = String(en).split(" / ").length, np = String(pt).split(" / ").length;
    if (ne > 1 && np > 1 && ne !== np) err(W, `palavra "${en}" = "${pt}": o inglês tem ${ne} partes e o português ${np}`);
  }
  for (const p of u.guide?.points || []) if (p.en) checkEn(`${W} guide`, p.en);

  for (const l of u.lessons || []) {
    if (!/^[a-z0-9-]{3,40}$/.test(l.id)) err(W, `id de lição inválido "${l.id}"`);
    if (ids.has(l.id)) err(W, `id repetido "${l.id}"`); ids.add(l.id);
    if (!l.items?.length || l.items.length < (l.story ? 3 : 4)) err(l.id, 'lição precisa de pelo menos 4 exercícios (3 se tiver história)');
    if (l.story) {
      if (!l.story.title || !Array.isArray(l.story.lines) || l.story.lines.length < 4) err(l.id, 'história precisa de título e pelo menos 4 frases');
      let asks = 0, gaps = 0;
      for (const ln of l.story.lines || []) {
        if (ln.ask) { // pergunta no meio da história
          asks++;
          if (!ln.options?.includes(ln.answer)) err(l.id, `pergunta "${ln.ask}" sem a resposta nas opções`);
          if (!ln.why) err(l.id, `pergunta "${ln.ask}" sem explicação`);
          continue;
        }
        if (!ln.en || !ln.pt) { err(l.id, 'frase da história sem en/pt'); continue; }
        if (ln.gap) {
          gaps++;
          if (!ln.en.includes('___')) err(l.id, `lacuna sem "___" em "${ln.en}"`);
          if (!ln.gap.options?.includes(ln.gap.answer)) err(l.id, `lacuna sem a resposta nas opções em "${ln.en}"`);
          if (new Set(ln.gap.options).size !== ln.gap.options?.length) err(l.id, 'opções repetidas na lacuna');
          ln.gap.options?.forEach(o => checkEn(`${l.id} história`, o));
          checkEn(`${l.id} história`, ln.en.replace('___', ln.gap.answer));
        } else {
          if (ln.en.includes('___')) err(l.id, `"___" sem lacuna definida em "${ln.en}"`);
          checkEn(`${l.id} história`, ln.en);
        }
      }
      if (gaps + asks < 2) err(l.id, 'história precisa de pelo menos 2 interações (lacunas ou perguntas)');
      if (l.items[0]?.type !== 'story') err(l.id, 'lição com história deve começar com um item "story"');
    }
    for (const it of l.items || []) {
      itemCount++;
      const L = `${l.id}/${it.id}`;
      if (!it.id) { err(l.id, 'exercício sem id'); continue; }
      if (ids.has(it.id)) err(L, 'id repetido'); ids.add(it.id);
      if (!TYPES.has(it.type)) err(L, `tipo inválido "${it.type}"`);
      if (!it.why || it.why.length < 15) err(L, 'falta explicação "why" (mín. 15 caracteres)');
      switch (it.type) {
        case 'choice':
          if (!it.en?.includes('___')) err(L, 'choice precisa de "___" na frase');
          if (!it.pt) err(L, 'choice precisa da frase completa em português "pt" (vira o verso do cartão)');
          if (!it.options?.includes(it.answer)) err(L, 'resposta não está nas opções');
          if (new Set(it.options).size !== it.options?.length) err(L, 'opções repetidas');
          checkEn(L, it.en); it.options?.forEach(o => checkEn(L, o));
          for (const o of Object.keys(it.wrong || {})) if (!it.options.includes(o)) err(L, `"wrong" cita opção inexistente "${o}"`);
          break;
        case 'build':
          if (!it.pt) err(L, 'build precisa do texto em português "pt"');
          checkEn(L, it.answer); (it.extra || []).forEach(o => checkEn(L, o));
          if (!it.answer || it.answer.split(' ').length < 2) err(L, 'resposta do build muito curta');
          for (const x of it.extra || []) if (it.answer.split(' ').includes(x)) err(L, `peça extra "${x}" também está na resposta`);
          break;
        case 'match':
          if (!Array.isArray(it.pairs) || it.pairs.length < 3 || it.pairs.length > 5) err(L, 'match precisa de 3 a 5 pares');
          it.pairs?.forEach(([en, pt]) => { checkEn(L, en); if (!pt) err(L, `par "${en}" sem tradução`); });
          if (new Set(it.pairs?.map(p => p[1])).size !== it.pairs?.length) err(L, 'traduções repetidas no match');
          break;
        case 'type':
          if (!it.pt) err(L, 'type precisa do texto em português "pt"');
          if (!it.answer) err(L, 'type precisa de "answer"');
          checkEn(L, it.answer); (it.accept || []).forEach(a => checkEn(L, a));
          break;
        case 'dictation':
          if (!it.en) err(L, 'dictation precisa de "en"');
          checkEn(L, it.en); (it.accept || []).forEach(a => checkEn(L, a));
          break;
        case 'speak':
          if (!it.en || !it.pt) err(L, 'speak precisa de "en" e "pt"');
          if (it.en && it.en.split(' ').length > 9) err(L, 'frase de fala longa demais (máx. 9 palavras)');
          checkEn(L, it.en);
          break;
        case 'dialogue':
          if (!Array.isArray(it.lines) || it.lines.length < 2 || it.lines.length > 4) err(L, 'dialogue precisa de 2 a 4 falas');
          if ((it.lines || []).filter(([, t]) => t === '___').length !== 1) err(L, 'dialogue precisa de exatamente uma fala "___"');
          if (!it.pt) err(L, 'dialogue precisa da resposta em português "pt" (vira o verso do cartão)');
          (it.lines || []).forEach(([who, t]) => { if (!['A', 'B'].includes(who)) err(L, `falante inválido "${who}"`); if (t !== '___') checkEn(L, t); });
          if (!it.options?.includes(it.answer)) err(L, 'resposta não está nas opções');
          if (new Set(it.options).size !== it.options?.length) err(L, 'opções repetidas');
          it.options?.forEach(o => checkEn(L, o));
          for (const o of Object.keys(it.wrong || {})) if (!it.options.includes(o)) err(L, `"wrong" cita opção inexistente "${o}"`);
          break;
        case 'story':
          if (!l.story) err(L, 'item "story" em lição sem história');
          break;
        case 'quiz':
          if (!l.story) err(L, 'quiz precisa de uma história na lição');
          if (!it.q) err(L, 'quiz precisa da pergunta "q"');
          if (!it.options?.includes(it.answer)) err(L, 'resposta não está nas opções');
          if (new Set(it.options).size !== it.options?.length) err(L, 'opções repetidas');
          break;
        case 'listen':
        case 'meaning':
          checkEn(L, it.en);
          if (!it.options?.includes(it.answer)) err(L, 'resposta não está nas opções');
          if (new Set(it.options).size !== it.options?.length) err(L, 'opções repetidas');
          break;
      }
    }
  }
  if (early.size) warn(W, `usa palavras apresentadas em unidades seguintes (mesmo nível ou abaixo): ${[...early].join(', ')}`);
}

console.log(`\nConteúdo: ${units.length} unidades, ${ids.size} ids, ${itemCount} exercícios, ${wordCount} palavras checadas contra a CEFR-J (A1: ${VOCAB.A1.size}, A2: ${VOCAB.A2.size} entradas).`);
if (warnings.length) { console.log(`\nAVISOS (${warnings.length}):`); for (const w of [...new Set(warnings)]) console.log('  - ' + w); }
if (errors.length) { console.error(`\nERROS (${errors.length}):`); for (const e of errors) console.error('  x ' + e); process.exit(1); }
console.log('\nOK: conteúdo válido.\n');
