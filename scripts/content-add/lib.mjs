// Ajuda para acrescentar lições novas a uma unidade existente (A1 completo, docs/plano-expansao-a1.md).
// Mantém o formato dos arquivos (JSON com 1 espaço, sem quebra de linha no fim), marca cada lição
// nova com "added" (a trilha não trava quem já passou daquele ponto: src/lib/trail-rules.js) e
// pode rodar de novo sem duplicar nada.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const ADDED = '2026-11';

export function addLessons(file, { words = [], lessons = [], extraVocab = [] }) {
  const p = path.join(root, 'src/content', file);
  const u = JSON.parse(fs.readFileSync(p, 'utf8'));
  const newIds = new Set(lessons.map(x => x.lesson.id));
  u.lessons = u.lessons.filter(l => !newIds.has(l.id)); // rodar de novo substitui
  for (const { after, lesson } of lessons) {
    const i = u.lessons.findIndex(l => l.id === after);
    if (i < 0) throw new Error(`${file}: lição "${after}" não encontrada`);
    const { id, title, story, items, bonus } = lesson;
    u.lessons.splice(i + 1, 0, { id, title, added: ADDED, ...(bonus ? { bonus: true } : {}), ...(story ? { story } : {}), items });
  }
  // palavra acima do nível com justificativa (o build aceita com aviso)
  u.extra_vocab ||= [];
  for (const e of extraVocab) if (!u.extra_vocab.some(x => x.word === e.word)) u.extra_vocab.push(e);
  const have = new Set((u.words || []).map(w => w[0].toLowerCase()));
  for (const w of words) if (!have.has(w[0].toLowerCase())) u.words.push(w);
  fs.writeFileSync(p, JSON.stringify(u, null, 1));
  console.log(`✓ ${file}: ${lessons.length} lições novas (${u.lessons.length} no total)`);
}

// Unidade inteira nova (A1 completo, etapas 2 e 3): todas as lições levam "added".
export function writeUnit(file, unit) {
  const p = path.join(root, 'src/content', file);
  const u = { ...unit, lessons: unit.lessons.map(({ id, title, story, items }) => ({ id, title, added: ADDED, ...(story ? { story } : {}), items })) };
  fs.writeFileSync(p, JSON.stringify(u, null, 1));
  console.log(`✓ ${file}: unidade ${u.id} com ${u.lessons.length} lições e ${u.lessons.reduce((n, l) => n + l.items.length, 0)} exercícios`);
}

// Escuta (podcast) de uma unidade nova: entra logo depois do episódio "after" (mesmo formato do arquivo)
export function addPodcast(ep, after) {
  const p = path.join(root, 'src/games/data/podcasts.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.episodes = j.episodes.filter(e => e.id !== ep.id);
  const i = j.episodes.findIndex(e => e.id === after);
  j.episodes.splice(i < 0 ? j.episodes.length : i + 1, 0, ep);
  fs.writeFileSync(p, JSON.stringify(j, null, 1).replace(/\n/g, '\r\n'));
  console.log(`✓ escuta ${ep.id} (${ep.lines.length} falas)`);
}

// Cena ao lado da trilha (src/components/TrailScene.jsx)
export function addScene(unitId, fig, obj) {
  const p = path.join(root, 'src/components/TrailScene.jsx');
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes(`'${unitId}':`)) return;
  s = s.replace(/(  'a2-u1': )/, `  '${unitId}': ['${fig}', '${obj}'],\n$1`);
  fs.writeFileSync(p, s);
  console.log(`✓ cena ${unitId}`);
}
