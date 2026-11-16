// Carrega as unidades (validadas no build por scripts/validate-content.mjs)
const modules = import.meta.glob('../content/a1/*.json', { eager: true });

export const UNITS = Object.values(modules)
  .map(m => m.default || m)
  .sort((a, b) => a.order - b.order);

export const LESSONS = UNITS.flatMap(u => u.lessons.map((l, i) => ({ ...l, unit: u, index: i })));

const ITEM_INDEX = new Map();
for (const l of LESSONS) for (const it of l.items) ITEM_INDEX.set(it.id, { item: it, lesson: l });

export const getLesson = (id) => LESSONS.find(l => l.id === id) || null;
export const getUnit = (id) => UNITS.find(u => u.id === id) || null;
export const getItem = (id) => ITEM_INDEX.get(id) || null;

// Uma lição fica liberada quando a anterior foi concluída
export function lessonStates(doneSet) {
  let nextFound = false;
  return LESSONS.map((l) => {
    if (doneSet.has(l.id)) return { lesson: l, state: 'done' };
    if (!nextFound) { nextFound = true; return { lesson: l, state: 'current' }; }
    return { lesson: l, state: 'locked' };
  });
}

export function levelPercent(doneSet) {
  if (!LESSONS.length) return 0;
  return Math.round((LESSONS.filter(l => doneSet.has(l.id)).length / LESSONS.length) * 100);
}

export const PLANNED_A1_UNITS = 8; // unidades previstas para o A1 completo

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
