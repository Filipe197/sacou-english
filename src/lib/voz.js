// Voz natural do Professor Juvenal (ElevenLabs, via api/voz.js) para as falas que a IA cria
// na hora. Se não der (sem internet, limite do dia, sem créditos), devolve null e a aula usa
// a voz do aparelho. Limite por aula: supabase/013_voz.sql.
import { supabase } from './supabase.js';
import { playUrl } from './fx.js';

const cache = new Map(); // "aula|idioma|texto" -> Promise<url | null>
let off = '';            // motivo para parar de pedir nesta sessão
let firstFail = 0;

// '' (funcionando), 'limite-aulas', 'limite-site', 'limite-falas' ou 'indisponivel'
export const juvenalVoiceOff = () => off;

export function fetchJuvenal(text, lang, aula, level) {
  if (off || !text || !aula) return Promise.resolve(null);
  const k = `${aula}|${lang}|${text}`;
  if (!cache.has(k)) cache.set(k, request(text, lang, aula, level));
  return cache.get(k);
}

async function request(text, lang, aula, level) {
  try {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return null;
    const r = await fetch('/api/voz', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: text.slice(0, 400), lang, aula, level }),
    });
    if (r.ok && /audio/.test(r.headers.get('content-type') || '')) return URL.createObjectURL(await r.blob());
    const j = await r.json().catch(() => ({}));
    if (/^limite-/.test(j.error || '')) off = j.error;
    else if (r.status === 503 || r.status === 401 || ++firstFail >= 2) off = 'indisponivel';
    return null;
  } catch {
    if (++firstFail >= 2) off = 'indisponivel';
    return null;
  }
}

// Fala com a voz natural; devolve false se não deu (aí quem chamou usa a voz do aparelho)
export async function speakJuvenal(text, lang, aula, level) {
  const url = await fetchJuvenal(text, lang, aula, level);
  return url ? playUrl(url) : false;
}

// Aulas com voz natural que ainda restam hoje: { plan, limit, used } ou null
export async function voiceStatus() {
  try { const { data, error } = await supabase.rpc('voice_status'); return error ? null : data; } catch { return null; }
}

// Nova aula: o limite de falas era da aula anterior
export function newJuvenalLesson() { if (off === 'limite-falas') off = ''; }

// Aulas com o Juvenal hoje: { used, limit, admin } ou null (014_aula_diaria.sql ainda não rodou)
export async function aulaStatus() {
  try { const { data, error } = await supabase.rpc('aula_status'); return error ? null : data; } catch { return null; }
}
