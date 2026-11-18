// Conteúdo do curso em duas partes, para o site abrir mais rápido:
// 1) esqueleto (na abertura): unidades, lições, guias e palavras, sem os exercícios
//    (scripts/vite-content.mjs). Dá para desenhar a trilha, o progresso e os guias.
// 2) exercícios e histórias: chegam logo depois, em arquivos separados (loadContent).
//    Telas que precisam deles esperam com useContentReady() (ver ContentGate em App.jsx).
// Tudo é validado no build por scripts/validate-content.mjs.
import { useEffect, useState } from 'react';

const modules = import.meta.glob('../content/*/*.json', { eager: true, query: '?esqueleto', import: 'default' });
const full = import.meta.glob('../content/*/*.json', { import: 'default' });

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const LEVEL_NAMES = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Independente', C1: 'Avançado', C2: 'Fluente' };
const rank = (u) => LEVEL_ORDER.indexOf(u.level) * 100 + u.order;

export const UNITS = Object.values(modules).sort((a, b) => rank(a) - rank(b));
export const LEVELS = LEVEL_ORDER.filter(l => UNITS.some(u => u.level === l)); // níveis com conteúdo
export const NEXT_LEVEL = LEVEL_ORDER[LEVELS.length] || null; // próximo nível em preparação
export const unitsOf = (level) => UNITS.filter(u => u.level === level);

export const LESSONS = UNITS.flatMap(u => u.lessons.map((l, i) => Object.assign(l, { unit: u, index: i })));

const ITEM_INDEX = new Map();
export const getLesson = (id) => LESSONS.find(l => l.id === id) || null;
export const getUnit = (id) => UNITS.find(u => u.id === id) || null;
// Só depois de loadContent() (as telas que usam esperam useContentReady)
export const getItem = (id) => ITEM_INDEX.get(id) || null;

// ---------- exercícios (segunda parte) ----------
let ready = false, loading = null;
const waiting = new Set();
export const isContentReady = () => ready;
export function loadContent() {
  if (ready) return Promise.resolve(true);
  return (loading ||= Promise.all(Object.values(full).map(load => load())).then(units => {
    const byId = new Map(LESSONS.map(l => [l.id, l]));
    for (const u of units) for (const l of u.lessons) {
      const sk = byId.get(l.id);
      if (!sk) continue;
      sk.items = l.items; sk.story = l.story || null;
      for (const it of l.items) ITEM_INDEX.set(it.id, { item: it, lesson: sk });
    }
    ready = true;
    waiting.forEach(fn => fn(true));
    return true;
  }).catch(e => { loading = null; throw e; }));
}
// true quando os exercícios chegaram; 'erro' se não deu para baixar (sem internet na 1ª visita)
export function useContentReady() {
  const [ok, setOk] = useState(ready);
  useEffect(() => {
    if (ready) { setOk(true); return; }
    let alive = true;
    const on = () => alive && setOk(true);
    waiting.add(on);
    loadContent().catch(() => alive && setOk('erro'));
    return () => { alive = false; waiting.delete(on); };
  }, []);
  return ok;
}

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
