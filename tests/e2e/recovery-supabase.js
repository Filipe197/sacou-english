import { supabase as base } from './mock-supabase.js';

export const USER_ID = '00000000-0000-4000-8000-0000000000d1';
const profile = { id: USER_ID, display_name: 'Ana', onboarded: true, sound_on: false, daily_goal_xp: 30, xp_total: 20, streak: 1, start_level: 'A1' };
const listeners = new Set();
const state = () => (globalThis.__recovery ||= {});
const failure = message => ({ data: null, error: { message } });

function builder(table) {
  let write = false;
  const resolve = async () => {
    const s = state();
    if (table === 'profiles') {
      if (s.profile === 'error') return failure('Failed to fetch');
      if (s.profile === 'missing') return { data: null, error: null };
      return { data: { ...profile, ...s.profileData }, error: null };
    }
    if (table === 'notes' && write) {
      s.noteWrites = (s.noteWrites || 0) + 1;
      if (s.notes === 'error') return failure('Failed to fetch');
      if (s.notes === 'slow') await new Promise(r => { s.releaseNote = r; });
    }
    return { data: [], error: null };
  };
  const b = new Proxy({}, { get(_target, prop) {
    if (prop === 'then') return (ok, bad) => resolve().then(ok, bad);
    if (prop === 'single' || prop === 'maybeSingle') return resolve;
    return () => { if (['insert', 'upsert', 'delete', 'update'].includes(prop)) write = true; return b; };
  } });
  return b;
}

export const supabase = {
  ...base,
  from: table => ['profiles', 'notes', 'activity', 'push_subs'].includes(table) ? builder(table) : base.from(table),
  rpc: async (fn, args) => {
    const s = state();
    (s.calls ||= []).push({ fn, args });
    if (s.rpc === 'offline') return failure('Failed to fetch');
    if (s.rpc === 'error') return failure('Permission denied');
    if (s.rpc === 'reject') throw new Error('Failed to fetch');
    if (fn === 'complete_session') {
      const reward = s.reward || {};
      const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
      const until = reward.boost ? new Date(Date.now() + 600000).toISOString() : null;
      return { data: {
        profile: { ...profile, last_active: today, streak: reward.days || 1, xp_boost_day: today, xp_boost_until: until },
        awarded_xp: args.p_xp * (reward.multiplier || 1), multiplier: reward.multiplier || 1,
        streak_increased: !!reward.days, boost_started: !!reward.boost, boost_until: until,
      }, error: null };
    }
    if (fn === 'complete_lesson' || fn === 'complete_lesson_at') return { data: profile, error: null };
    return base.rpc(fn, args);
  },
  auth: {
    ...base.auth,
    getSession: async () => ({ data: { session: { access_token: 'demo', user: { id: USER_ID, email: 'ana@example.com' } } } }),
    onAuthStateChange: cb => { listeners.add(cb); return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } }; },
    signOut: async () => { state().signedOut = true; listeners.forEach(cb => cb('SIGNED_OUT', null)); return {}; },
  },
};
export const authErrorPt = () => 'Erro de teste.';
