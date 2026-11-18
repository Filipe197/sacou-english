// Voz natural do Professor Juvenal na aula falada (ElevenLabs). Recebe o texto que a IA criou
// na hora e devolve o MP3 com a voz dele. A chave fica só no servidor.
//
// Variáveis na Vercel (e no .env para testar no PC):
//   ELEVENLABS_API_KEY   chave da API (ElevenLabs → Developers → API keys)
//   ELEVENLABS_VOICE_ID  opcional; ID da voz do Juvenal (padrão: a voz criada para o Sacou)
//   ELEVENLABS_MODEL     opcional; padrão eleven_flash_v2_5 (rápido e gasta menos crédito)
// Limite por AULA (supabase/013_voz.sql, voice_take): plano grátis 1 aula com voz natural por dia,
// premium 5; até 40 falas por aula e 60 no site inteiro por dia.
// Se algo falhar (sem créditos, sem chave, limite), o app usa a voz do aparelho.
import { guard, readBody, str, send, HttpError, MOCK } from './_lib.js';

export const MAX_CHARS = 400;
// Inglês mais devagar para quem está começando (velocidade da ElevenLabs: 0,7 a 1,2).
// O português (comentários do Juvenal no A1 e A2) fica no ritmo normal.
export const SPEED = { A1: 0.8, A2: 0.87, B1: 0.94, B2: 1 };
// Voz "Professor Juvenal" criada no Voice Design da ElevenLabs (o ID não é segredo; a chave é)
const JUVENAL_VOICE = 'FspPSevACC3LOIYjKdIQ';

export default async function handler(req, res) {
  try {
    const body = readBody(req);
    const text = str(body.text, MAX_CHARS, 'texto');
    if (!text) throw new HttpError(400, 'Faltou o texto.');
    const lang = body.lang === 'en' ? 'en' : 'pt';
    const speed = lang === 'en' ? (SPEED[body.level] || 0.9) : 1;
    const key = process.env.ELEVENLABS_API_KEY;
    const voice = process.env.ELEVENLABS_VOICE_ID || JUVENAL_VOICE;
    const aula = /^[0-9a-f-]{36}$/i.test(String(body.aula || '')) ? body.aula : null;
    if (!aula) throw new HttpError(400, 'Aula inválida.');
    if (MOCK || !key || !voice) throw new HttpError(503, 'Voz natural indisponível.');
    const { sb } = await guard(req, null);
    const { data: left, error } = await sb.rpc('voice_take', { p_aula: aula });
    if (error) throw new HttpError(503, 'Voz natural ainda não ativada (falta rodar supabase/013_voz.sql).');
    if (left === -1) throw new HttpError(429, 'limite-aulas');
    if (left === -2) throw new HttpError(429, 'limite-falas');
    if (left === -3) throw new HttpError(429, 'limite-site');

    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_64`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_MODEL || 'eleven_flash_v2_5',
        language_code: lang,
        voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed },
      }),
      signal: AbortSignal.timeout(20000),
    }).catch(() => null);
    if (!r) throw new HttpError(502, 'A voz não respondeu.');
    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('elevenlabs', r.status, detail.slice(0, 300));
      // 401: chave errada ou créditos esgotados (quota_exceeded); 429: muitas falas ao mesmo tempo
      throw new HttpError(r.status === 429 ? 429 : 503, 'Voz natural indisponível agora.');
    }
    const audio = Buffer.from(await r.arrayBuffer());
    res.statusCode = 200;
    res.setHeader('content-type', 'audio/mpeg');
    res.setHeader('cache-control', 'private, max-age=86400');
    res.end(audio);
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.message });
    console.error(e);
    send(res, 500, { error: 'Algo deu errado na voz.' });
  }
}
