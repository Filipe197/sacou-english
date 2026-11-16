// Supabase falso para os testes automáticos (dados de demonstração, nada vai para a internet).
import { LESSONS } from '/src/lib/content.js';

const day = (n) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(Date.now() - n * 864e5));
const done = LESSONS.filter(l => l.unit.level === 'A1' && l.unit.order <= 5);
const TABLES = {
  lesson_progress: done.map((l, i) => ({ lesson_id: l.id, best_score: [100, 92, 85, 100, 96][i % 5], times_done: 1 + (i % 3), completed_at: new Date(Date.now() - (done.length - i) * 0.7 * 864e5).toISOString() })),
  mistakes: [
    { item_id: 'a1u5l2-1', lesson_id: 'a1-u5-l2', times: 2, last_seen: new Date().toISOString() },
    { item_id: 'a1u5l3-4', lesson_id: 'a1-u5-l3', times: 1, last_seen: new Date().toISOString() },
    { item_id: 'a1u4l2-3', lesson_id: 'a1-u4-l2', times: 1, last_seen: new Date().toISOString() },
  ],
  daily_xp: [[6, 35], [5, 50], [4, 30], [3, 45], [2, 60], [1, 40], [0, 35]].map(([d, xp]) => ({ day: day(d), xp })),
  notes: [],
};

function builder(table) {
  const res = { data: TABLES[table] || [], error: null };
  const b = new Proxy({}, {
    get(_t, prop) {
      if (prop === 'then') return (ok, bad) => Promise.resolve(res).then(ok, bad);
      if (prop === 'single' || prop === 'maybeSingle') return () => Promise.resolve({ data: res.data[0] || null, error: null });
      return () => b;
    },
  });
  return b;
}

export const supabase = {
  from: (t) => builder(t),
  rpc: async (fn, args) => {
    if (fn === 'admin_stats') return { data: { users: 3, new_users_7d: 2, active_today: 1, active_7d: 2, lessons_done: 14, open_reports: 0, daily: [], top_lessons: [], hard_items: [] }, error: null };
    if (fn === 'admin_users') {
      const all = [
        { id: 'a', name: 'Mariana Souza', email: 'mariana.souza@example.com', created_at: '2026-11-15T21:10:00Z', provider: 'google', start_level: 'A1', xp_total: 320, streak: 3, last_active: '2026-11-16', lessons_done: 9 },
        { id: 'b', name: 'Lucas', email: 'lucas.teste@example.com', created_at: '2026-11-14T12:00:00Z', provider: 'email', start_level: 'A2', xp_total: 80, streak: 1, last_active: '2026-11-14', lessons_done: 3 },
        { id: 'c', name: null, email: 'semnome@example.com', created_at: '2026-11-10T09:00:00Z', provider: 'email', start_level: 'A1', xp_total: 0, streak: 0, last_active: null, lessons_done: 0 },
      ];
      const q = (args?.p_search || '').toLowerCase();
      const rows = all.filter(r => (r.email + ' ' + (r.name || '')).toLowerCase().includes(q));
      return { data: { total: rows.length, rows }, error: null };
    }
    return { data: null, error: null };
  },
  auth: {
    getUser: async () => ({ data: { user: { id: 'demo' } } }),
    getSession: async () => ({ data: { session: { access_token: 'demo', user: { id: 'demo' } } } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
    signOut: async () => ({}),
  },
};

export const authErrorPt = () => 'Erro de demonstração.';
