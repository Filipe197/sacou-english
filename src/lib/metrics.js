// Métricas dos testadores: cada lição aberta vira uma "tentativa" (supabase/017_metricas.sql).
// Guarda em que exercício a pessoa está; se ela sai no meio, o painel Admin mostra onde parou.
// Tudo é silencioso: sem conexão ou sem a tabela, a lição segue normalmente.
import { supabase } from './supabase.js';

let off = false; // tabela não existe (SQL não rodado): para de tentar nesta visita

function send(row) {
  if (off || !row.id) return;
  supabase.from('lesson_runs').upsert(row, { onConflict: 'id', returning: 'minimal' })
    .then(({ error }) => { if (error && /lesson_runs|schema cache|does not exist/i.test(error.message || '')) off = true; }, () => {});
}

// exercício que está na tela agora (step começa em 0)
export function trackStep(runId, lessonId, step, total, itemId) {
  send({ id: runId, lesson_id: lessonId, last_step: Math.min(step, 500), total: Math.min(total, 500), last_item: itemId ? String(itemId).slice(0, 80) : null, updated_at: new Date().toISOString() });
}

export function trackFinish(runId, lessonId, total) {
  const now = new Date().toISOString();
  send({ id: runId, lesson_id: lessonId, last_step: Math.min(total, 500), total: Math.min(total, 500), updated_at: now, finished_at: now });
}
