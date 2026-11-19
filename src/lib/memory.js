// Memória de cada exercício (palavra, frase ou estrutura): revisão espaçada por item.
// Cada item tem uma "caixa" de 0 a 5. Acertou de primeira, sobe uma caixa e volta mais tarde;
// errou, volta para a caixa 0 e reaparece no dia seguinte. É o que alimenta o treino
// ("o que você está esquecendo hoje"), a lição adaptativa e a escrita sem ajuda.
//
// Fica no aparelho (funciona offline) e é copiada para a conta na tabela item_memory
// (supabase/015_memoria.sql). Sem a tabela, continua funcionando só no aparelho.
import { useEffect } from 'react';
import { supabase } from './supabase.js';
import { getItem, isContentReady } from './content.js';

const DAYS = [1, 2, 4, 8, 16, 32]; // dias até a próxima revisão em cada caixa
export const MASTERED = 4; // a partir desta caixa o item é considerado dominado

const dayBR = (offset = 0) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(Date.now() + offset * 864e5));
const KEY = (uid) => `sacou-memoria:${uid || 'anon'}`;
let cache = { uid: null, data: {} };
let dirty = new Map(); // itemId -> linha para enviar

function load(uid) {
  if (cache.uid === uid) return cache.data;
  let data = {};
  try { data = JSON.parse(localStorage.getItem(KEY(uid)) || '{}') || {}; } catch { data = {}; }
  cache = { uid, data };
  return data;
}
function save(uid) {
  try { localStorage.setItem(KEY(uid), JSON.stringify(cache.data)); } catch { /* sem armazenamento */ }
}

// Só itens do curso (os criados pela IA no treino não têm id fixo)
const isCourseItem = (id) => !!id && !String(id).startsWith('ia-');

export function remember(uid, entry, ok) {
  const item = entry?.item;
  if (!uid || !item || !isCourseItem(item.id) || item.type === 'story') return;
  const data = load(uid);
  const m = data[item.id] || { b: 0, n: 0, w: 0 };
  const b = ok ? Math.min(5, (m.n ? m.b + 1 : 1)) : 0;
  const next = { b, d: dayBR(ok ? DAYS[b] : 1), l: entry.lessonId, n: m.n + 1, w: m.w + (ok ? 0 : 1), t: Date.now() };
  data[item.id] = next;
  save(uid);
  dirty.set(item.id, next);
  scheduleSync(uid);
}

export const boxOf = (uid, itemId) => load(uid)[itemId]?.b ?? -1; // -1 = nunca visto
export const seenBefore = (uid, itemId) => !!load(uid)[itemId];

// Itens que chegaram no dia de revisar, os mais esquecidos primeiro
export function dueItemIds(uid, limit = 50) {
  const data = load(uid), today = dayBR();
  return Object.entries(data)
    .filter(([, m]) => m.d && m.d <= today)
    .sort((a, b) => a[1].b - b[1].b || (a[1].d < b[1].d ? -1 : 1))
    .slice(0, limit)
    .map(([id]) => id);
}

// Entradas prontas para o executor de lições
export function dueEntries(uid, limit = 8) {
  if (!isContentReady()) return [];
  return dueItemIds(uid, limit * 3).map(id => {
    const f = getItem(id);
    return f && f.item.type !== 'story' && f.item.type !== 'quiz' && { item: f.item, lessonId: f.lesson.id, unit: f.lesson.unit, story: f.lesson.story };
  }).filter(Boolean).slice(0, limit);
}

export const dueCount = (uid) => dueItemIds(uid, 999).length;

// ---------- cópia na conta ----------
let timer = null;
function scheduleSync(uid) {
  clearTimeout(timer);
  timer = setTimeout(() => pushMemory(uid), 4000);
}
let tableMissing = false;
export async function pushMemory(uid) {
  if (!uid || tableMissing || !dirty.size || (typeof navigator !== 'undefined' && navigator.onLine === false)) return;
  const rows = [...dirty.entries()].map(([item_id, m]) => ({ user_id: uid, item_id, lesson_id: m.l || null, box: m.b, due_on: m.d, seen: m.n, wrong: m.w, updated_at: new Date(m.t || Date.now()).toISOString() }));
  dirty = new Map();
  try {
    const { error } = await supabase.from('item_memory').upsert(rows, { onConflict: 'user_id,item_id' });
    if (error) {
      if (/item_memory|schema cache|does not exist/i.test(error.message || '')) tableMissing = true;
      else for (const r of rows) if (!dirty.has(r.item_id)) dirty.set(r.item_id, load(uid)[r.item_id]); // tenta depois
    }
  } catch { /* sem conexão: fica para a próxima */ }
}

const pulled = new Set();
export async function pullMemory(uid) {
  if (!uid || pulled.has(uid)) return;
  pulled.add(uid);
  try {
    const { data: rows, error } = await supabase.from('item_memory').select('item_id,lesson_id,box,due_on,seen,wrong,updated_at').limit(5000);
    if (error || !Array.isArray(rows)) { if (error && /item_memory|schema cache|does not exist/i.test(error.message || '')) tableMissing = true; return; }
    const data = load(uid);
    let changed = false;
    for (const r of rows) {
      const t = Date.parse(r.updated_at) || 0;
      const mine = data[r.item_id];
      if (!mine || (mine.t || 0) < t) { data[r.item_id] = { b: r.box, d: r.due_on, l: r.lesson_id, n: r.seen, w: r.wrong, t }; changed = true; }
      else if ((mine.t || 0) > t) dirty.set(r.item_id, mine); // o aparelho está mais novo: manda
    }
    // o que só existe no aparelho também sobe
    const inServer = new Set(rows.map(r => r.item_id));
    for (const [id, m] of Object.entries(data)) if (!inServer.has(id)) dirty.set(id, m);
    if (changed) save(uid);
    if (dirty.size) scheduleSync(uid);
  } catch { pulled.delete(uid); }
}

// Usado no Shell: traz a memória da conta uma vez por sessão e manda o que ficou pendente ao sair
export function useMemorySync(uid) {
  useEffect(() => {
    if (!uid) return;
    pullMemory(uid);
    const flush = () => { if (document.visibilityState === 'hidden') pushMemory(uid); };
    document.addEventListener('visibilitychange', flush);
    return () => document.removeEventListener('visibilitychange', flush);
  }, [uid]);
}

// Cópia da memória inteira (para o retrato por habilidade em "Meu progresso")
export const memorySnapshot = (uid) => ({ ...load(uid) });
