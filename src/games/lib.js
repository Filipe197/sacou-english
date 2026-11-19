// Regras comuns dos minijogos: o que está liberado, XP, recordes e de onde vêm as palavras.
import { UNITS, LESSONS, getUnit, shuffle, unitComplete } from '../lib/content.js';
import { finishSession } from '../lib/finish-session.js';
import episodes from './data/episodes.json';
import mysteries from './data/mysteries.json';
import city from './data/city.json';
import pictures from './data/pictures.json';
import cast from './data/cast.json';
import podcasts from './data/podcasts.json';

export { cast };
// na ordem da trilha (cada episódio libera com uma unidade)
const unitRank = (id) => UNITS.findIndex(u => u.id === id);
export const EPISODES = [...episodes.episodes].sort((a, b) => unitRank(a.unlock) - unitRank(b.unlock));
export const SERIES = { title: episodes.series, about: episodes.about };
export const PODCASTS = [...podcasts.episodes].sort((a, b) => unitRank(a.unlock) - unitRank(b.unlock));
export const PODCAST_INFO = { title: podcasts.title, about: podcasts.about };
export const CASES = mysteries.cases;
export const MISSIONS = city.missions;
export const PICTURES = pictures.words.map(([en, pt, pic]) => ({ en, pt, pic }));

// Liberado quando todas as lições da unidade indicada estão feitas
export function unitDone(done, unitId) {
  const u = getUnit(unitId);
  return !!u && unitComplete(u.lessons, done);
}
export const unlockLabel = (unitId) => { const u = getUnit(unitId); return u ? `${u.level} · Unidade ${u.order}: ${u.title}` : unitId; };
export const gameId = (id) => `jogo-${id}`;
export const played = (scores, id) => !!scores?.[gameId(id)];

// Unidades que o aluno já começou (ou a primeira, para quem está chegando)
function studiedUnits(done) {
  const us = UNITS.filter(u => u.lessons.some(l => done.has(l.id)));
  return us.length ? us : UNITS.slice(0, 1);
}

// Pares inglês–português do vocabulário já estudado (palavras curtas, sem tradução repetida)
export function wordPairs(done) {
  const seenPt = new Set(), seenEn = new Set();
  const out = [];
  for (const u of studiedUnits(done)) for (const [en, pt] of u.words || []) {
    const e = en.trim(), p = pt.split(/[,/(]/)[0].trim();
    if (e.split(' ').length > 2 || p.length > 18 || seenPt.has(p.toLowerCase()) || seenEn.has(e.toLowerCase())) continue;
    seenPt.add(p.toLowerCase()); seenEn.add(e.toLowerCase());
    out.push({ en: e, pt: p });
  }
  return shuffle(out);
}

// Frases de "monte a frase" das lições já feitas (ou da primeira unidade)
export function sentences(done) {
  let ls = LESSONS.filter(l => done.has(l.id));
  if (!ls.length) ls = LESSONS.filter(l => l.unit.id === UNITS[0].id);
  const items = ls.flatMap(l => l.items.filter(i => i.type === 'build' && i.answer.split(' ').length <= 7).map(i => ({ id: i.id, pt: i.pt, answer: i.answer, display: i.display || i.answer })));
  return shuffle(items);
}

// Recorde pessoal (fica no aparelho, por conta)
const RKEY = (uid, game) => `sacou-recorde:${uid || 'anon'}:${game}`;
export function getBest(uid, game) { try { return Number(localStorage.getItem(RKEY(uid, game))) || 0; } catch { return 0; } }
export function setBest(uid, game, v) { try { if (v > getBest(uid, game)) { localStorage.setItem(RKEY(uid, game), String(v)); return true; } } catch { /* sem espaço */ } return false; }

// Fim de jogo: soma XP, conta para a sequência e para a missão da semana
export async function finishGame({ user, setProfile, id, score, xp, attemptId }) {
  return finishSession({ uid: user?.id, setProfile, lessonId: gameId(id), score: Math.round(score), xp, attemptId, activity: 'jogo' });
}
