// Fila de envio para quando a internet cai: lições concluídas, erros e atividades
// ficam guardados no aparelho e sobem quando a conexão volta. A fila é por conta,
// então outro aluno no mesmo aparelho nunca envia (nem vê) a fila de outra pessoa.
import { supabase } from './supabase.js';

const KEY = (uid) => `sacou-fila:${uid}`;
let flushing = false;

export function readQueue(uid) {
  if (!uid) return [];
  try { return JSON.parse(localStorage.getItem(KEY(uid)) || '[]'); } catch { return []; }
}
function writeQueue(uid, q) {
  try { q.length ? localStorage.setItem(KEY(uid), JSON.stringify(q)) : localStorage.removeItem(KEY(uid)); return true; } catch { return false; }
}
export function enqueue(uid, job) {
  if (!uid) return false;
  const q = readQueue(uid);
  if (q.length >= 200) return false;
  q.push({ ...job, at: Date.now() });
  return writeQueue(uid, q);
}

// Lições concluídas que ainda não subiram (contam como feitas na trilha)
export const queuedLessonIds = (uid) => readQueue(uid).filter(j => ['complete_lesson', 'complete_session'].includes(j.fn)).map(j => j.args.p_lesson_id);

export const looksOffline = (error) => (typeof navigator !== 'undefined' && navigator.onLine === false) || /fetch|network|load failed|timeout/i.test(error?.message || '');

// Chama uma função do banco; sem conexão, guarda na fila.
export async function rpcOrQueue(uid, fn, args) {
  const { data, error } = await supabase.rpc(fn, args).then(r => r, error => ({ error }));
  if (error && looksOffline(error)) {
    const job = { fn, args };
    if (fn === 'complete_lesson') job.day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
    if (!enqueue(uid, job)) return { data: null, error: new Error('Não foi possível salvar neste aparelho.') };
    return { data: null, queued: true };
  }
  if (error) console.error(error);
  return { data, error };
}

export async function logActivity(uid, kind) {
  const { error } = await supabase.from('activity').insert({ kind });
  if (error && looksOffline(error)) enqueue(uid, { fn: 'activity', args: { kind } });
}

// Envia a fila. Devolve o perfil mais recente (se alguma lição subiu).
export async function flushQueue(uid) {
  if (!uid || flushing) return null;
  const q = readQueue(uid);
  if (!q.length || (typeof navigator !== 'undefined' && navigator.onLine === false)) return null;
  flushing = true;
  let profile = null;
  const left = [];
  try {
    for (let i = 0; i < q.length; i++) {
      const job = q[i];
      let error;
      try {
        const { data: auth, error: authError } = await supabase.auth.getSession();
        if (authError || auth?.session?.user?.id !== uid) { left.push(...q.slice(i)); break; }
        if (job.fn === 'activity') ({ error } = await supabase.from('activity').insert(job.args));
        else if (job.fn === 'complete_lesson') {
          let r = await supabase.rpc('complete_lesson_at', { ...job.args, p_day: job.day });
          // banco sem a função nova (005 ainda não rodado): usa a antiga
          if (r.error && !looksOffline(r.error) && /complete_lesson_at|schema cache|does not exist/i.test(r.error.message || '')) r = await supabase.rpc('complete_lesson', job.args);
          error = r.error; if (!error && r.data) profile = r.data;
        } else if (job.fn === 'complete_session') {
          const r = await supabase.rpc(job.fn, job.args);
          error = r.error; if (!error && r.data?.profile) profile = r.data.profile;
        } else ({ error } = await supabase.rpc(job.fn, job.args));
      } catch (cause) { error = cause; }
      if (error && looksOffline(error)) { left.push(...q.slice(i)); break; }
      if (error) left.push(job); // preserva pendências, inclusive durante atualização do banco
    }
    // o que entrou na fila enquanto enviava continua lá
    writeQueue(uid, [...left, ...readQueue(uid).slice(q.length)]);
    return profile;
  } finally { flushing = false; }
}
