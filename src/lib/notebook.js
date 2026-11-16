// Caderno digital: anotações e cartões de vocabulário do aluno.
//
// Funciona "local primeiro": tudo é salvo na hora no aparelho (localStorage) e
// sincronizado com o Supabase em segundo plano. Sem internet, as mudanças ficam
// numa fila e sobem quando a conexão voltar.
import { useEffect, useSyncExternalStore } from 'react';
import { supabase } from './supabase.js';
import { useAuth } from './auth.jsx';

const COLS = ['id', 'user_id', 'kind', 'title', 'content', 'plain', 'en', 'pt', 'example', 'color', 'tags', 'pinned',
  'lesson_id', 'unit_id', 'item_id', 'box', 'due_at', 'created_at', 'updated_at'];
export const COLORS = ['none', 'violet', 'lime', 'sky', 'rose', 'amber'];
export const COLOR_NAMES = { none: 'Sem cor', violet: 'Roxo', lime: 'Verde-limão', sky: 'Azul', rose: 'Rosa', amber: 'Amarelo' };

let uid = null;
let notes = [];
let pending = {}; // id -> { op: 'upsert' | 'delete', v: versão }
let sync = 'idle'; // idle | saving | saved | offline | missing (tabela não criada)
let loaded = false;
let snap = { notes, sync, loaded };
const listeners = new Set();
let flushTimer = null;
let retryTimer = null;
let version = 0;

const key = () => `sacou-caderno:${uid}`;
function persist() {
  try { localStorage.setItem(key(), JSON.stringify({ notes, pending })); } catch { /* sem espaço: segue só na memória */ }
}
function emit() {
  snap = { notes, sync, loaded };
  listeners.forEach(l => l());
}
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

const isMissing = (err) => err && (err.code === '42P01' || err.code === 'PGRST205' || /does not exist|schema cache/i.test(err.message || ''));

async function load(newUid) {
  if (uid === newUid && loaded) return;
  uid = newUid; loaded = false; notes = []; pending = {};
  try {
    const raw = JSON.parse(localStorage.getItem(key()) || 'null');
    if (raw) { notes = raw.notes || []; pending = raw.pending || {}; loaded = true; }
  } catch { /* cache corrompido: ignora */ }
  emit();
  const { data, error } = await supabase.from('notes').select(COLS.join(',')).order('updated_at', { ascending: false });
  if (uid !== newUid) return; // trocou de conta no meio
  if (error) {
    sync = isMissing(error) ? 'missing' : 'offline';
    loaded = true; emit(); scheduleRetry(); return;
  }
  // servidor + mudanças locais ainda não enviadas
  const byId = new Map(data.map(n => [n.id, n]));
  for (const [id, p] of Object.entries(pending)) {
    if (p.op === 'delete') byId.delete(id);
    else { const local = notes.find(n => n.id === id); if (local) byId.set(id, local); }
  }
  notes = sortNotes([...byId.values()]);
  loaded = true; sync = Object.keys(pending).length ? 'saving' : 'saved';
  persist(); emit();
  if (Object.keys(pending).length) flush();
}

function sortNotes(list) {
  return [...list].sort((a, b) => (b.pinned - a.pinned) || String(b.updated_at).localeCompare(String(a.updated_at)));
}

function scheduleFlush(ms = 700) {
  clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, ms);
}
function scheduleRetry() {
  clearTimeout(retryTimer);
  retryTimer = setTimeout(flush, 15000);
}

async function flush() {
  clearTimeout(flushTimer);
  const entries = Object.entries(pending);
  if (!uid || !entries.length) return;
  sync = 'saving'; emit();
  const ups = entries.filter(([, p]) => p.op === 'upsert').map(([id, p]) => ({ id, v: p.v, row: notes.find(n => n.id === id) })).filter(x => x.row);
  const dels = entries.filter(([, p]) => p.op === 'delete').map(([id, p]) => ({ id, v: p.v }));
  let err = null;
  if (ups.length) {
    const rows = ups.map(x => Object.fromEntries(COLS.map(c => [c, x.row[c] ?? null]).filter(([c, v]) => !(c === 'tags' && v === null))));
    const { error } = await supabase.from('notes').upsert(rows);
    if (error) err = error; else ups.forEach(x => { if (pending[x.id]?.v === x.v) delete pending[x.id]; });
  }
  if (dels.length && !err) {
    const { error } = await supabase.from('notes').delete().in('id', dels.map(d => d.id));
    if (error) err = error; else dels.forEach(d => { if (pending[d.id]?.v === d.v) delete pending[d.id]; });
  }
  // nota que sumiu da lista mas ficou como upsert (raro): descarta
  for (const [id, p] of Object.entries(pending)) if (p.op === 'upsert' && !notes.some(n => n.id === id)) delete pending[id];
  if (err) { sync = isMissing(err) ? 'missing' : 'offline'; scheduleRetry(); console.error(err); }
  else sync = Object.keys(pending).length ? 'saving' : 'saved';
  persist(); emit();
  if (!err && Object.keys(pending).length) scheduleFlush();
}

// Ao sair da conta: tenta enviar o que falta (até 3 s) e apaga o caderno deste aparelho,
// para quem usar o celular depois não ver as anotações de outra pessoa.
export async function clearNotebookCache() {
  try { await Promise.race([flush(), new Promise(r => setTimeout(r, 3000))]); } catch { /* segue */ }
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith('sacou-caderno:')) localStorage.removeItem(k);
    }
  } catch { /* sem acesso ao armazenamento */ }
  clearTimeout(flushTimer); clearTimeout(retryTimer);
  uid = null; notes = []; pending = {}; loaded = false; sync = 'idle';
  emit();
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => flush());
  window.addEventListener('beforeunload', () => { if (Object.keys(pending).length) flush(); });
}

const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
}));

function mark(id, op) { pending[id] = { op, v: ++version }; }

// ---------- API ----------
export const notebook = {
  create(partial = {}) {
    const now = new Date().toISOString();
    const n = {
      id: uuid(), user_id: uid, kind: 'note', title: '', content: null, plain: '', en: null, pt: null, example: null,
      color: 'none', tags: [], pinned: false, lesson_id: null, unit_id: null, item_id: null, box: 0, due_at: null,
      created_at: now, updated_at: now, ...partial,
    };
    notes = sortNotes([n, ...notes]);
    mark(n.id, 'upsert'); persist(); emit(); scheduleFlush();
    return n;
  },
  update(id, patch, { touch = true } = {}) {
    let changed = false;
    notes = notes.map(n => {
      if (n.id !== id) return n;
      changed = true;
      return { ...n, ...patch, ...(touch ? { updated_at: new Date().toISOString() } : {}) };
    });
    if (!changed) return;
    if ('pinned' in patch) notes = sortNotes(notes);
    mark(id, 'upsert'); persist(); emit(); scheduleFlush(1200);
  },
  remove(id) {
    const n = notes.find(x => x.id === id);
    if (!n) return null;
    notes = notes.filter(x => x.id !== id);
    mark(id, 'delete'); persist(); emit(); scheduleFlush(4000); // dá tempo de desfazer
    return n;
  },
  restore(n) {
    notes = sortNotes([n, ...notes.filter(x => x.id !== n.id)]);
    mark(n.id, 'upsert'); persist(); emit(); scheduleFlush();
  },
  retry: () => flush(),
  get: (id) => notes.find(n => n.id === id) || null,
};

export function useNotebook() {
  const { user } = useAuth();
  useEffect(() => { if (user?.id) load(user.id); }, [user?.id]);
  return useSyncExternalStore(subscribe, () => snap);
}

// ---------- vocabulário ----------
export const normWord = (s) => String(s || '').toLowerCase().replace(/[’]/g, "'").replace(/[.,!?;:"“”]/g, '').replace(/\s+/g, ' ').trim();
export const findWord = (list, en) => list.find(n => n.kind === 'word' && normWord(n.en) === normWord(en)) || null;

export function saveWord(list, { en, pt, example = null, plain = '', lessonId = null, unitId = null, itemId = null }) {
  const found = findWord(list, en);
  if (found) return { note: found, existed: true };
  const note = notebook.create({
    kind: 'word', en: String(en).trim(), pt: pt ? String(pt).trim() : null, example, plain,
    lesson_id: lessonId, unit_id: unitId, item_id: itemId, due_at: new Date().toISOString(),
  });
  return { note, existed: false };
}

// Flashcards no sistema de Leitner: cada acerto leva o cartão para a próxima caixa,
// que volta depois de mais dias. Errou? Volta para a caixa 0.
export const BOX_DAYS = [0, 1, 2, 4, 8, 16, 32];
export const isDue = (n) => n.kind === 'word' && (!n.due_at || new Date(n.due_at).getTime() <= Date.now());
export function gradeCard(n, grade) { // grade: 'again' | 'good' | 'easy'
  const box = grade === 'again' ? 0 : Math.min(6, (n.box || 0) + (grade === 'easy' ? 2 : 1));
  const ms = grade === 'again' ? 10 * 60e3 : BOX_DAYS[box] * 864e5;
  notebook.update(n.id, { box, due_at: new Date(Date.now() + ms).toISOString() }, { touch: false });
}

// ---------- texto ----------
export function snippet(n, len = 110) {
  const t = (n.kind === 'word' ? [n.pt, n.example, n.plain].filter(Boolean).join(' · ') : n.plain || '').replace(/\s+/g, ' ').trim();
  return t.length > len ? t.slice(0, len - 1) + '…' : t;
}

export function relTime(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return 'agora';
  if (s < 3600) return `há ${Math.floor(s / 60)} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  if (s < 7 * 86400) { const d = Math.floor(s / 86400); return d === 1 ? 'ontem' : `há ${d} dias`; }
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// Documento do editor (TipTap/ProseMirror JSON) → Markdown, para exportar
function inline(nodes = []) {
  return nodes.map(n => {
    if (n.type === 'hardBreak') return '  \n';
    let t = n.text || '';
    for (const m of n.marks || []) {
      if (m.type === 'bold') t = `**${t}**`;
      else if (m.type === 'italic') t = `*${t}*`;
      else if (m.type === 'strike') t = `~~${t}~~`;
      else if (m.type === 'code') t = '`' + t + '`';
      else if (m.type === 'highlight') t = `==${t}==`;
    }
    return t;
  }).join('');
}
function block(n, depth = 0) {
  const pad = '  '.repeat(depth);
  switch (n.type) {
    case 'heading': return '#'.repeat(n.attrs?.level || 2) + ' ' + inline(n.content);
    case 'paragraph': return pad + inline(n.content);
    case 'blockquote': return (n.content || []).map(c => '> ' + block(c)).join('\n');
    case 'horizontalRule': return '---';
    case 'codeBlock': return '```\n' + inline(n.content) + '\n```';
    case 'bulletList': return (n.content || []).map(li => listItem(li, pad + '- ', depth)).join('\n');
    case 'orderedList': return (n.content || []).map((li, i) => listItem(li, `${pad}${i + 1}. `, depth)).join('\n');
    case 'taskList': return (n.content || []).map(li => listItem(li, `${pad}- [${li.attrs?.checked ? 'x' : ' '}] `, depth)).join('\n');
    default: return inline(n.content);
  }
}
function listItem(li, prefix, depth) {
  const [first, ...rest] = li.content || [];
  return prefix + (first ? inline(first.content) : '') + rest.map(c => '\n' + block(c, depth + 1)).join('');
}
export function docToMarkdown(doc) {
  return (doc?.content || []).map(n => block(n)).join('\n\n');
}

export function exportMarkdown(list, unitTitle = (id) => id) {
  const ns = list.filter(n => n.kind === 'note');
  const ws = list.filter(n => n.kind === 'word');
  let md = `# Meu caderno — Sacou English\n\nExportado em ${new Date().toLocaleString('pt-BR')}\n\n`;
  if (ns.length) {
    md += `## Anotações\n\n`;
    for (const n of ns) {
      md += `### ${n.title || 'Sem título'}\n\n`;
      const meta = [n.unit_id && unitTitle(n.unit_id), n.tags?.length && n.tags.map(t => '#' + t).join(' ')].filter(Boolean).join(' · ');
      if (meta) md += `_${meta}_\n\n`;
      md += (n.content ? docToMarkdown(n.content) : n.plain) + '\n\n';
    }
  }
  if (ws.length) {
    md += `## Vocabulário\n\n| Inglês | Português | Exemplo |\n|---|---|---|\n`;
    const esc = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    for (const w of ws) md += `| ${esc(w.en)} | ${esc(w.pt)} | ${esc(w.example)} |\n`;
  }
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `caderno-sacou-english-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
