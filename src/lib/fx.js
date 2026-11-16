import VOICES from './voices.json';
import { reportError } from './errors.js';
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
let wordClips = null;
if (typeof window !== 'undefined') {
  fetch('/audio/words.json').then(r => (r.ok ? r.json() : [])).then(list => { wordClips = new Set(list); }).catch(() => { wordClips = new Set(); });
}
// Mesma separação de palavras de scripts/gen-audio.py (split_words)
export const wordsOf = (t) => norm(t).replace(/’/g, "'").split(' ')
  .map(raw => raw.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '').replace(/^'+|'+$/g, ''))
  .filter(Boolean).map(w => w.toLowerCase());
function wordClip(w, who) {
  if (!wordClips) return null;
  const g = genderOf(who);
  for (const v of g === 'm' ? ['m', 'f'] : ['f', 'm']) {
    const k = clipKey('w' + v, w);
    if (wordClips.has(k)) return `/audio/w/${k}.mp3`;
  }
  return null;
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
let seq = 0;               // cada fala nova cancela a anterior
const slowSources = [];   // trechos do modo lento tocando agora
function stopAll() {
  seq++;
  for (const src of slowSources.splice(0)) { try { src.stop(); } catch { /* já parou */ } }
  try { window.speechSynthesis?.cancel(); } catch { /* nada */ }
  if (player) { player.onended = player.onerror = player.onplaying = null; try { player.pause(); player.removeAttribute('src'); player.load(); } catch { /* nada */ } player = null; }
}
// Toca o áudio pronto num player novo a cada vez (reaproveitar o mesmo player travava
// em alguns navegadores). Termina com true ao acabar, ou false se não começar a tocar.
function playClip(url, slow) {
  return new Promise((resolve) => {
    stopAll();
    const a = new Audio(url);
    player = a;
    let started = false, done = false;
    const finish = (ok) => { if (done) return; done = true; clearTimeout(guard); resolve(ok); };
    a.playbackRate = slow ? 0.7 : 1;
    try { a.preservesPitch = true; } catch { /* navegadores antigos */ }
    a.onplaying = () => { started = true; };
    a.onended = () => finish(true);
    a.onerror = () => finish(false);
    const guard = setTimeout(() => { if (!started && player === a) { stopAll(); finish(false); } }, 2500);
    a.play().catch((e) => { if (e?.name !== 'AbortError') finish(false); });
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

// ---------- modo lento: palavra por palavra, com pausa entre elas (como "This · is · my · car") ----------
const GAP = 0.28; // segundos de pausa entre as palavras
let ctx = null;
const decoded = new Map();
async function bufferFor(url) {
  if (!decoded.has(url)) {
    decoded.set(url, fetch(url).then(r => { if (!r.ok) throw new Error('sem áudio'); return r.arrayBuffer(); })
      .then(b => ctx.decodeAudioData(b)).catch(e => { decoded.delete(url); throw e; }));
  }
  return decoded.get(url);
}
// corta o silêncio do começo e do fim de cada palavra, para as pausas ficarem iguais
function trim(buf) {
  const d = buf.getChannelData(0), th = 0.012;
  let a = 0, b = d.length - 1;
  while (a < b && Math.abs(d[a]) < th) a++;
  while (b > a && Math.abs(d[b]) < th) b--;
  const pad = Math.floor(buf.sampleRate * 0.03);
  return [Math.max(0, a - pad) / buf.sampleRate, Math.min(d.length, b + pad) / buf.sampleRate];
}
async function playWords(urls, my) {
  ctx ||= new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') await ctx.resume();
  const bufs = await Promise.all(urls.map(bufferFor));
  if (my !== seq) return true;
  let t = ctx.currentTime + 0.05;
  for (const b of bufs) {
    const [from, to] = trim(b);
    const src = ctx.createBufferSource();
    src.buffer = b; src.connect(ctx.destination);
    src.start(t, from, to - from);
    slowSources.push(src);
    t += (to - from) + GAP;
  }
  await new Promise(r => setTimeout(r, (t - ctx.currentTime) * 1000));
  return true;
}
// fala devagar com a voz do aparelho, uma palavra por vez (plano B)
function ttsWords(words, who, my) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    let i = 0;
    const next = () => {
      if (my !== seq || i >= words.length) { resolve(); return; }
      const u = new SpeechSynthesisUtterance(words[i++]);
      u.lang = 'en-US'; const v = ttsVoice(who); if (v) u.voice = v; u.rate = 0.75;
      u.onend = u.onerror = () => setTimeout(next, GAP * 1000);
      window.speechSynthesis.speak(u);
    };
    next();
  });
}
async function slowSpeak(text, who) {
  stopAll();
  const my = seq;
  const words = wordsOf(text);
  if (!words.length) return;
  const urls = words.map(w => wordClip(w, who));
  try {
    if (urls.every(Boolean)) { await playWords(urls, my); return; }
  } catch { /* cai no plano B */ }
  if (my !== seq) return;
  // alguma palavra sem áudio: com 1 palavra, usa o áudio da frase mais devagar; senão, palavra por palavra no aparelho
  const full = words.length === 1 && clipFor(text, who);
  if (full) { await playClip(full, true); return; }
  await ttsWords(text.split(/\s+/).filter(Boolean), who, my);
}

// who: nome do personagem (Ana, Tom, Officer...) ou "A"/"B" nos diálogos
export function speak(text, { slow = false, who } = {}) {
  if (!canSpeak() || !text) return;
  if (slow) { slowSpeak(text, who); return; }
  const url = clipFor(text, who);
  if (url) playClip(url, slow).then(ok => { if (!ok) { reportError('js', 'Áudio pronto não tocou (usou a voz do aparelho)', `${url} ${navigator.userAgent}`); ttsSpeak(text, { slow, who }); } });
  else { stopAll(); ttsSpeak(text, { slow, who }); }
}

// Fala e espera terminar (para o modo fone e os episódios). lang 'pt' usa uma voz em português.
let ptVoice = null;
export function speakAsync(text, { slow = false, lang = 'en', who } = {}) {
  return new Promise((resolve) => {
    if (!canSpeak()) { setTimeout(resolve, 600); return; }
    let done = false;
    const end = () => { if (!done) { done = true; resolve(); } };
    if (slow && lang !== 'pt') { slowSpeak(text, who).then(end, end); return; }
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
