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

export function canSpeak() { return typeof window !== 'undefined' && !!window.speechSynthesis; }

export function speak(text, { slow = false } = {}) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  if (voice) u.voice = voice;
  u.rate = slow ? 0.5 : 0.9;
  window.speechSynthesis.speak(u);
}

// Fala e espera terminar (para o modo fone). lang 'pt' usa uma voz em português.
let ptVoice = null;
export function speakAsync(text, { slow = false, lang = 'en' } = {}) {
  return new Promise((resolve) => {
    if (!canSpeak()) { setTimeout(resolve, 600); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (lang === 'pt') {
      ptVoice ||= (window.speechSynthesis.getVoices() || []).find(v => /pt-BR/i.test(v.lang)) || null;
      u.lang = 'pt-BR'; if (ptVoice) u.voice = ptVoice; u.rate = 1;
    } else {
      u.lang = 'en-US'; if (voice) u.voice = voice; u.rate = slow ? 0.5 : 0.9;
    }
    let done = false;
    const end = () => { if (!done) { done = true; resolve(); } };
    u.onend = end; u.onerror = end;
    // segurança: alguns navegadores não disparam onend
    setTimeout(end, 1500 + text.length * (slow ? 140 : 90));
    window.speechSynthesis.speak(u);
  });
}
