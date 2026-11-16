import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import { useAuth } from './auth.jsx';
import { queuedLessonIds } from './offline.js';

export function todayBR() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

// Progresso do aluno: lições feitas, erros pendentes e XP dos últimos 7 dias
export function useProgress() {
  const { user } = useAuth();
  const [state, setState] = useState({ loading: true, done: new Set(), scores: {}, mistakes: [], week: [], error: null });

  const load = useCallback(async () => {
    if (!user) return;
    const since = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
    const [lp, mk, dx] = await Promise.all([
      supabase.from('lesson_progress').select('lesson_id,best_score,times_done,completed_at'),
      supabase.from('mistakes').select('item_id,lesson_id,times,last_seen').eq('resolved', false).order('last_seen', { ascending: false }),
      supabase.from('daily_xp').select('day,xp').gte('day', since),
    ]);
    const err = lp.error || mk.error || dx.error;
    setState({
      loading: false,
      error: err ? 'Não foi possível carregar seu progresso. Verifique a conexão.' : null,
      done: new Set([...(lp.data || []).map(r => r.lesson_id), ...queuedLessonIds(user.id)]),
      scores: Object.fromEntries((lp.data || []).map(r => [r.lesson_id, r])),
      mistakes: mk.data || [],
      week: dx.data || [],
    });
  }, [user]);

  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load };
}

export function lastSevenDays(week) {
  const map = Object.fromEntries(week.map(w => [w.day, w.xp]));
  const out = [];
  const names = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    const key = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(d);
    const wd = new Date(key + 'T12:00:00').getDay();
    out.push({ day: key, label: i === 0 ? 'Hoje' : names[wd], xp: map[key] || 0 });
  }
  return out;
}

// A sequência só vale se o último dia ativo foi hoje ou ontem, ou se os escudos cobrem os dias perdidos
export function liveStreak(profile) {
  if (!profile?.last_active) return 0;
  const missed = Math.round((new Date(todayBR() + 'T12:00:00') - new Date(profile.last_active + 'T12:00:00')) / 864e5) - 1;
  if (missed <= 0) return profile.streak;
  return missed <= (profile.streak_freezes || 0) ? profile.streak : 0;
}
// Dias perdidos que um escudo vai cobrir na próxima lição (0 = nenhum)
export function shieldCovering(profile) {
  if (!profile?.last_active || !profile.streak) return 0;
  const missed = Math.round((new Date(todayBR() + 'T12:00:00') - new Date(profile.last_active + 'T12:00:00')) / 864e5) - 1;
  return missed > 0 && missed <= (profile.streak_freezes || 0) ? missed : 0;
}

// Revisão espaçada: uma lição "volta" 1, 3, 7, 14 e 30 dias depois de feita.
const INTERVALS = [[1, 2], [3, 4], [7, 9], [14, 17], [30, 35]];
export function dueLessonIds(scores) {
  const now = Date.now();
  return Object.values(scores).filter(r => {
    if (!r.completed_at || !r.times_done) return false; // puladas no teste não entram
    const days = (now - new Date(r.completed_at).getTime()) / 864e5;
    return INTERVALS.some(([a, b]) => days >= a && days < b);
  }).map(r => r.lesson_id);
}
