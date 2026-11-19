// Ajuda para acrescentar lições novas a uma unidade existente (A1 completo, docs/plano-expansao-a1.md).
// Mantém o formato dos arquivos (JSON com 1 espaço, sem quebra de linha no fim), marca cada lição
// nova com "added" (a trilha não trava quem já passou daquele ponto: src/lib/trail-rules.js) e
// pode rodar de novo sem duplicar nada.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const ADDED = '2026-11';

export function addLessons(file, { words = [], lessons = [] }) {
  const p = path.join(root, 'src/content', file);
  const u = JSON.parse(fs.readFileSync(p, 'utf8'));
  const newIds = new Set(lessons.map(x => x.lesson.id));
  u.lessons = u.lessons.filter(l => !newIds.has(l.id)); // rodar de novo substitui
  for (const { after, lesson } of lessons) {
    const i = u.lessons.findIndex(l => l.id === after);
    if (i < 0) throw new Error(`${file}: lição "${after}" não encontrada`);
    const { id, title, story, items } = lesson;
    u.lessons.splice(i + 1, 0, { id, title, added: ADDED, ...(story ? { story } : {}), items });
  }
  const have = new Set((u.words || []).map(w => w[0].toLowerCase()));
  for (const w of words) if (!have.has(w[0].toLowerCase())) u.words.push(w);
  fs.writeFileSync(p, JSON.stringify(u, null, 1));
  console.log(`✓ ${file}: ${lessons.length} lições novas (${u.lessons.length} no total)`);
}
