// Só no app Android (carregado por main.jsx quando NATIVE). O WebView do Android não tem a voz
// nem o reconhecimento de fala do Chrome, então este arquivo cria as mesmas APIs do navegador
// (speechSynthesis e SpeechRecognition) usando os recursos nativos do celular. Assim o resto do
// app não muda nada. Também cuida do botão Voltar e da volta do login do Google.
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { supabase } from './supabase.js';
import { APP_CALLBACK } from './native.js';
import { startAppUpdates } from './app-update.js';

// atualização automática: confere a versão nova no site e aplica na próxima abertura
startAppUpdates();

// ---------- voz (texto para fala) ----------
class Utterance {
  constructor(text = '') {
    Object.assign(this, { text, lang: 'en-US', rate: 1, pitch: 1, volume: 1, voice: null, onstart: null, onend: null, onerror: null, onboundary: null });
  }
}
const queue = [];
let current = null;
const synth = {
  speaking: false, pending: false, paused: false, onvoiceschanged: null,
  getVoices: () => [],
  speak(u) { queue.push(u); this.pending = true; if (!current) next(); },
  cancel() {
    const was = current; queue.length = 0; current = null;
    this.speaking = false; this.pending = false;
    TextToSpeech.stop().catch(() => {});
    if (was) was.onerror?.({ error: 'interrupted', utterance: was });
  },
  pause() {}, resume() {},
  addEventListener() {}, removeEventListener() {},
};
function next() {
  const u = queue.shift();
  synth.pending = queue.length > 0;
  if (!u) { current = null; synth.speaking = false; return; }
  current = u; synth.speaking = true;
  u.onstart?.({ utterance: u });
  TextToSpeech.speak({ text: u.text, lang: u.lang || 'en-US', rate: u.rate ?? 1, pitch: u.pitch ?? 1, volume: u.volume ?? 1, category: 'playback' })
    .then(() => { if (current !== u) return; current = null; u.onend?.({ utterance: u }); next(); })
    .catch(() => { if (current !== u) return; current = null; u.onerror?.({ error: 'synthesis-failed', utterance: u }); next(); });
}
try {
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = Utterance;
} catch { /* sem voz: o app usa os áudios prontos */ }

// ---------- reconhecimento de fala ----------
// Usa o reconhecedor do Android: ele para sozinho quando a pessoa fica em silêncio
// e devolve as alternativas de uma vez (sem o texto parcial enquanto fala).
const errName = (m = '') => (/permission/i.test(m) ? 'not-allowed' : /no match|no speech|timeout/i.test(m) ? 'no-speech' : 'network');
class NativeRecognition {
  constructor() {
    Object.assign(this, { lang: 'en-US', interimResults: false, continuous: false, maxAlternatives: 1, onresult: null, onerror: null, onend: null, onstart: null });
    this.live = false;
  }
  async start() {
    this.live = true;
    try {
      let p = await SpeechRecognition.checkPermissions();
      if (p.speechRecognition !== 'granted') p = await SpeechRecognition.requestPermissions();
      if (p.speechRecognition !== 'granted') throw new Error('permission');
      this.onstart?.({});
      const r = await SpeechRecognition.start({ language: this.lang, maxResults: Math.max(1, this.maxAlternatives), partialResults: false, popup: false });
      if (!this.live) return;
      const alts = (r?.matches || []).filter(Boolean).map(t => ({ transcript: t, confidence: 1 }));
      if (alts.length) this.onresult?.({ resultIndex: 0, results: [Object.assign(alts, { isFinal: true })] });
      else this.onerror?.({ error: 'no-speech' });
    } catch (e) {
      if (this.live) this.onerror?.({ error: errName(e?.message) });
    }
    if (this.live) { this.live = false; this.onend?.({}); }
  }
  stop() { SpeechRecognition.stop().catch(() => {}); }
  abort() {
    if (!this.live) return;
    this.live = false;
    SpeechRecognition.stop().catch(() => {});
    setTimeout(() => this.onend?.({}), 0); // como no navegador: o fim chega depois
  }
}
window.SpeechRecognition = NativeRecognition;
window.webkitSpeechRecognition = NativeRecognition;

// ---------- botão Voltar do Android ----------
App.addListener('backButton', ({ canGoBack }) => { if (canGoBack) history.back(); else App.exitApp(); });

// ---------- login do Google ----------
// O Google não aceita login dentro do app, então abre o navegador do celular, que volta
// para com.sacouenglish.app://login com a sessão.
const BACK_KEY = 'sacou-google-volta';
export async function openGoogleLogin(back) {
  try { localStorage.setItem(BACK_KEY, back); } catch { /* sem storage */ }
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: APP_CALLBACK, skipBrowserRedirect: true } });
  if (error || !data?.url) return error || new Error('sem url');
  await Browser.open({ url: data.url });
  return null;
}
App.addListener('appUrlOpen', async ({ url }) => {
  if (!url || !url.startsWith(APP_CALLBACK)) return;
  Browser.close().catch(() => {});
  const u = new URL(url.replace(/^[^:]+:\/\//, 'https://app/'));
  const hash = new URLSearchParams(u.hash.slice(1));
  const code = u.searchParams.get('code');
  try {
    if (code) await supabase.auth.exchangeCodeForSession(code);
    else if (hash.get('access_token')) await supabase.auth.setSession({ access_token: hash.get('access_token'), refresh_token: hash.get('refresh_token') });
  } catch { /* a tela de login continua aberta */ }
  let back = '/aprender';
  try { back = localStorage.getItem(BACK_KEY) || back; localStorage.removeItem(BACK_KEY); } catch { /* padrão */ }
  history.pushState({}, '', back);
  window.dispatchEvent(new PopStateEvent('popstate'));
});
