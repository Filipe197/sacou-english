// Carrega as unidades de todos os níveis (validadas no build por scripts/validate-content.mjs)
const modules = import.meta.glob('../content/*/*.json', { eager: true });

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const LEVEL_NAMES = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Independente', C1: 'Avançado', C2: 'Fluente' };
const rank = (u) => LEVEL_ORDER.indexOf(u.level) * 100 + u.order;

export const UNITS = Object.values(modules).map(m => m.default || m).sort((a, b) => rank(a) - rank(b));
export const LEVELS = LEVEL_ORDER.filter(l => UNITS.some(u => u.level === l)); // níveis com conteúdo
export const NEXT_LEVEL = LEVEL_ORDER[LEVELS.length] || null; // próximo nível em preparação
export const unitsOf = (level) => UNITS.filter(u => u.level === level);

export const LESSONS = UNITS.flatMap(u => u.lessons.map((l, i) => ({ ...l, unit: u, index: i })));

const ITEM_INDEX = new Map();
for (const l of LESSONS) for (const it of l.items) ITEM_INDEX.set(it.id, { item: it, lesson: l });

export const getLesson = (id) => LESSONS.find(l => l.id === id) || null;
export const getUnit = (id) => UNITS.find(u => u.id === id) || null;
export const getItem = (id) => ITEM_INDEX.get(id) || null;

// Uma lição fica liberada quando a anterior foi concluída (A2 abre depois do A1)
export function lessonStates(doneSet) {
  let nextFound = false;
  return LESSONS.map((l) => {
    if (doneSet.has(l.id)) return { lesson: l, state: 'done' };
    if (!nextFound) { nextFound = true; return { lesson: l, state: 'current' }; }
    return { lesson: l, state: 'locked' };
  });
}

// Nível em que o aluno está: o da primeira lição ainda não feita
export function currentLevel(doneSet) {
  const next = LESSONS.find(l => !doneSet.has(l.id));
  return next ? next.unit.level : LEVELS[LEVELS.length - 1];
}

export function levelPercent(doneSet, level = currentLevel(doneSet)) {
  const ls = LESSONS.filter(l => l.unit.level === level);
  if (!ls.length) return 0;
  return Math.round((ls.filter(l => doneSet.has(l.id)).length / ls.length) * 100);
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
