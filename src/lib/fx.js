import VOICES from './voices.json';
// Efeitos: sons (arquivos prontos em /public/sounds) e voz em inglês.
// Se um arquivo de som não existir, o site continua funcionando em silêncio.

const SOUNDS = {
  correct: '/sounds/correct.ogg',
  wrong: '/sounds/wrong.ogg',
  complete: '/sounds/complete.ogg',
  click: '/sounds/click.ogg',
  streak: '/sounds/streak.ogg',
};

const cache = {};
let enabled = true;

export const fx = {
  setEnabled(v) { enabled = !!v; },
  isEnabled() { return enabled; },
  play(name) {
    if (!enabled || !SOUNDS[name]) return;
    try {
      if (!cache[name]) { cache[name] = new Audio(SOUNDS[name]); cache[name].volume = 0.5; }
      const a = cache[name];
      a.currentTime = 0;
      a.play().catch(() => {});
    } catch { /* sem som, sem problema */ }
  },
};

// Voz: usa a síntese de voz do próprio navegador (grátis, sem servidor).
let voice = null;
function pickVoice() {
  const vs = window.speechSynthesis?.getVoices() || [];
  voice = vs.find(v => /en-US/i.test(v.lang) && /google|samantha|aria|jenny|natural/i.test(v.name))
       || vs.find(v => /en-US/i.test(v.lang))
       || vs.find(v => /^en/i.test(v.lang)) || null;
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

// ---------- voz natural ----------
// Frases do curso têm áudio pronto (public/audio, gerado por scripts/gen-audio.py com voz
// feminina ou masculina conforme o personagem). Sem áudio pronto, usa a voz do aparelho.
const GENDER = Object.fromEntries([...VOICES.f.map(n => [n, 'f']), ...VOICES.m.map(n => [n, 'm'])]);
export const genderOf = (who) => GENDER[String(who || '').trim().toLowerCase()] || null;
const norm = (t) => String(t).replace(/\s+/g, ' ').trim();
function clipKey(v, t) {
  const str = `${v}|${norm(t)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
let clips = null;
if (typeof window !== 'undefined') {
  fetch('/audio/index.json').then(r => (r.ok ? r.json() : [])).then(list => { clips = new Set(list); }).catch(() => { clips = new Set(); });
}
function clipFor(text, who) {
  if (!clips || !text) return null;
  const g = genderOf(who);
  for (const v of g === 'm' ? ['m', 'f'] : g === 'f' ? ['f', 'm'] : ['f', 'm']) {
    const k = clipKey(v, text);
    if (clips.has(k)) return `/audio/${k}.mp3`;
  }
  return null;
}
let player = null;
function stopAll() {
  try { window.speechSynthesis?.cancel(); } catch { /* nada */ }
  if (player) { player.onended = player.onerror = null; player.pause(); }
}
// toca o áudio pronto; devolve uma promessa que termina quando acabar (ou false se não deu)
function playClip(url, slow) {
  return new Promise((resolve) => {
    stopAll();
    player ||= new Audio();
    player.src = url;
    player.playbackRate = slow ? 0.7 : 1;
    try { player.preservesPitch = true; } catch { /* navegadores antigos */ }
    player.onended = () => resolve(true);
    player.onerror = () => resolve(false);
    player.play().catch(() => resolve(false));
  });
}
// voz do aparelho (plano B): tenta uma voz masculina para personagens homens
let maleVoice;
function ttsVoice(who) {
  if (genderOf(who) === 'm') {
    if (maleVoice === undefined) {
      const vs = window.speechSynthesis?.getVoices() || [];
      maleVoice = vs.find(v => /^en/i.test(v.lang) && /male|david|guy|daniel|mark|fred|alex|tom|james|ryan|christopher|eric/i.test(v.name) && !/female/i.test(v.name)) || null;
    }
    if (maleVoice) return maleVoice;
  }
  return voice;
}

export function canSpeak() { return typeof window !== 'undefined' && (!!window.speechSynthesis || typeof Audio !== 'undefined'); }

function ttsSpeak(text, { slow, who, onEnd }) {
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  const v = ttsVoice(who); if (v) u.voice = v;
  u.rate = slow ? 0.5 : 0.9;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  window.speechSynthesis.speak(u);
}

// who: nome do personagem (Ana, Tom, Officer...) ou "A"/"B" nos diálogos
export function speak(text, { slow = false, who } = {}) {
  if (!canSpeak() || !text) return;
  const url = clipFor(text, who);
  if (url) playClip(url, slow).then(ok => { if (!ok) ttsSpeak(text, { slow, who }); });
  else { stopAll(); ttsSpeak(text, { slow, who }); }
}

// Fala e espera terminar (para o modo fone e os episódios). lang 'pt' usa uma voz em português.
let ptVoice = null;
export function speakAsync(text, { slow = false, lang = 'en', who } = {}) {
  return new Promise((resolve) => {
    if (!canSpeak()) { setTimeout(resolve, 600); return; }
    let done = false;
    const end = () => { if (!done) { done = true; resolve(); } };
    if (lang !== 'pt') {
      const url = clipFor(text, who);
      if (url) {
        setTimeout(end, 4000 + text.length * 160); // segurança
        playClip(url, slow).then(ok => { if (ok) end(); else ttsSpeak(text, { slow, who, onEnd: end }); });
        return;
      }
    }
    stopAll();
    if (!window.speechSynthesis) { setTimeout(end, 600); return; }
    const u = new SpeechSynthesisUtterance(text);
    if (lang === 'pt') {
      ptVoice ||= (window.speechSynthesis.getVoices() || []).find(v => /pt-BR/i.test(v.lang)) || null;
      u.lang = 'pt-BR'; if (ptVoice) u.voice = ptVoice; u.rate = 1;
    } else {
      u.lang = 'en-US'; const v = ttsVoice(who); if (v) u.voice = v; u.rate = slow ? 0.5 : 0.9;
    }
    u.onend = end; u.onerror = end;
    // segurança: alguns navegadores não disparam onend
    setTimeout(end, 1500 + text.length * (slow ? 140 : 90));
    window.speechSynthesis.speak(u);
  });
}
