// Regras da trilha, sem depender do Vite (dá para testar no Node: tests/unit/trail-rules.mjs).
//
// Uma lição fica liberada quando a anterior foi concluída. Lições acrescentadas depois que o
// curso já tinha alunos levam "added" no conteúdo: para quem já passou daquele ponto da trilha,
// elas aparecem como "extra" (novas, liberadas e opcionais) e não travam o resto do caminho.

// lessons: [{ id, added? }] na ordem da trilha · done: Set de ids concluídos
export function statesOf(lessons, done) {
  let last = -1;
  lessons.forEach((l, i) => { if (done.has(l.id)) last = i; });
  let nextFound = false;
  return lessons.map((l, i) => {
    if (done.has(l.id)) return 'done';
    if (l.added && i < last) return 'extra';
    if (!nextFound) { nextFound = true; return 'current'; }
    return 'locked';
  });
}

// Lições que contam para dar a unidade como concluída: as originais. Numa unidade inteira nova,
// todas contam.
export function coreOf(lessons) {
  const core = lessons.filter(l => !l.added);
  return core.length ? core : lessons;
}
export const unitComplete = (lessons, done) => coreOf(lessons).every(l => done.has(l.id));
