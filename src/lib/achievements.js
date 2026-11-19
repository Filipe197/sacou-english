// Conquistas (medalhas): calculadas a partir do progresso do aluno, sem tabela nova.
import { UNITS, LESSONS, LEVELS, unitComplete } from './content.js';

const count = (scores, prefix) => Object.keys(scores || {}).filter(k => k.startsWith(prefix)).length;

function context({ profile, done, scores }) {
  const lessons = LESSONS.filter(l => done.has(l.id)).length;
  const words = UNITS.filter(u => unitComplete(u.lessons, done)).reduce((n, u) => n + (u.words?.length || 0), 0);
  const perfectUnit = UNITS.some(u => u.lessons.every(l => (scores?.[l.id]?.best_score ?? 0) >= 100 && scores?.[l.id]?.times_done > 0));
  const levelDone = (lv) => { const us = UNITS.filter(u => u.level === lv); return us.length > 0 && us.every(u => unitComplete(u.lessons, done)); };
  return {
    lessons, words, perfectUnit, levelDone,
    best: Math.max(profile?.best_streak || 0, profile?.streak || 0),
    xp: profile?.xp_total || 0,
    podcasts: count(scores, 'jogo-pod-'),
    stories: count(scores, 'jogo-ep'),
    cases: count(scores, 'jogo-caso'),
    city: count(scores, 'jogo-m-'),
  };
}

const n = (key, goal) => (c) => ({ value: Math.min(c[key], goal), goal });
const lv = (level) => (c) => ({ value: c.levelDone(level) ? 1 : 0, goal: 1 });

export const ACHIEVEMENTS = [
  { id: 'licao-1', icon: '🌱', title: 'Primeiro passo', desc: 'Conclua sua primeira lição.', check: n('lessons', 1) },
  { id: 'licao-10', icon: '📘', title: 'Pegando o ritmo', desc: 'Conclua 10 lições.', check: n('lessons', 10) },
  { id: 'licao-50', icon: '📚', title: 'Estudante dedicado', desc: 'Conclua 50 lições.', check: n('lessons', 50) },
  { id: 'licao-150', icon: '🎓', title: 'Maratonista', desc: 'Conclua 150 lições.', check: n('lessons', 150) },
  { id: 'seq-3', icon: '🔥', title: 'Aquecendo', desc: 'Estude 3 dias seguidos.', check: n('best', 3) },
  { id: 'seq-7', icon: '🔥', title: 'Uma semana inteira', desc: 'Estude 7 dias seguidos (e ganhe um escudo).', check: n('best', 7) },
  { id: 'seq-30', icon: '🌟', title: 'Um mês de foco', desc: 'Estude 30 dias seguidos.', check: n('best', 30) },
  { id: 'seq-100', icon: '👑', title: 'Imparável', desc: 'Estude 100 dias seguidos.', check: n('best', 100) },
  { id: 'xp-500', icon: '⚡', title: 'Faísca', desc: 'Ganhe 500 XP.', check: n('xp', 500) },
  { id: 'xp-2000', icon: '⚡', title: 'Energia pura', desc: 'Ganhe 2.000 XP.', check: n('xp', 2000) },
  { id: 'xp-10000', icon: '🚀', title: 'Foguete', desc: 'Ganhe 10.000 XP.', check: n('xp', 10000) },
  { id: 'perfeito', icon: '💎', title: 'Unidade perfeita', desc: 'Faça 100% em todas as lições de uma unidade.', check: (c) => ({ value: c.perfectUnit ? 1 : 0, goal: 1 }) },
  { id: 'palavras-100', icon: '🧠', title: '100 palavras', desc: 'Aprenda 100 palavras (unidades concluídas).', check: n('words', 100) },
  { id: 'palavras-500', icon: '🧠', title: '500 palavras', desc: 'Aprenda 500 palavras (unidades concluídas).', check: n('words', 500) },
  { id: 'podcast-1', icon: '🎙️', title: 'Primeiro episódio', desc: 'Ouça e responda um episódio do podcast.', check: n('podcasts', 1) },
  { id: 'podcast-10', icon: '🎧', title: 'Ouvinte fiel', desc: 'Complete 10 episódios do podcast.', check: n('podcasts', 10) },
  { id: 'historias-5', icon: '📖', title: 'Fã da Ana', desc: 'Complete 5 episódios de Ana em Londres.', check: n('stories', 5) },
  { id: 'detetive-3', icon: '🕵️', title: 'Detetive', desc: 'Resolva 3 casos.', check: n('cases', 3) },
  { id: 'cidade-4', icon: '🗺️', title: 'Viajante', desc: 'Complete as 4 missões na cidade.', check: n('city', 4) },
  ...['A1', 'A2', 'B1', 'B2'].filter(l => LEVELS.includes(l)).map((l, i) => ({
    id: `nivel-${l}`, icon: ['🥉', '🥈', '🥇', '🏆'][i], title: `Nível ${l} completo`, desc: `Conclua todas as lições do ${l}.`, check: lv(l),
  })),
];

export function evaluate(data) {
  const c = context(data);
  return ACHIEVEMENTS.map(a => { const r = a.check(c); return { ...a, ...r, done: r.value >= r.goal }; });
}

// "Nova!" até o aluno ver a conquista em Meu progresso (fica no aparelho)
const KEY = (uid) => `sacou-conquistas:${uid}`;
export function seenSet(uid) { try { return new Set(JSON.parse(localStorage.getItem(KEY(uid)) || '[]')); } catch { return new Set(); } }
export function markSeen(uid, ids) { try { localStorage.setItem(KEY(uid), JSON.stringify([...new Set([...seenSet(uid), ...ids])])); } catch { /* sem espaço */ } }
