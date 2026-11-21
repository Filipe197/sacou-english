// Regrava o "Podcast da Ana" (a escuta de cada unidade, src/games/data/podcasts.json) com vozes
// naturais da ElevenLabs, uma voz para cada personagem. Substitui os MP3 da Kokoro em
// public/audio/podcast e atualiza index.json (início e fim de cada fala, para a transcrição
// acompanhar o áudio). Cada fala fica guardada em .cache/podcast-eleven: rodar de novo só
// grava o que mudou.
//
// Uso (na pasta do projeto):  node scripts/gen-podcasts-eleven.mjs [--so pod-a1u1]
// Precisa no .env: ELEVENLABS_API_KEY (nunca é impressa) e do ffmpeg instalado.
// Gasta ~1 crédito por caractere (cerca de 14.400 créditos para os 32 episódios).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)
  .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map(([, k, v]) => [k, v.replace(/^["']|["']$/g, '')]));
const KEY = process.env.ELEVENLABS_API_KEY || env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Falta ELEVENLABS_API_KEY no .env.'); process.exit(1); }

// vozes padrão da ElevenLabs (disponíveis em qualquer conta), inglês americano
const VOICES = {
  ana: 'EXAVITQu4vr4xnSDxMaL',   // Sarah
  laura: 'cgSgspJ2msm6clMCkdW9', // Jessica
  tom: 'iP95p4xoKVk53GoZ742B',   // Chris
  sam: 'cjVigY5qzO86Huf0OWal',   // Eric
};
const SPEED = { A1: 0.86, A2: 0.9, B1: 0.95, B2: 1, C1: 1 }; // mais devagar nos níveis iniciais
const SR = 24000; // pcm_24000: 16 bits, mono

const data = JSON.parse(fs.readFileSync(path.join(root, 'src/games/data/podcasts.json'), 'utf8'));
const OUT = path.join(root, 'public/audio/podcast');
const CACHE = path.join(root, '.cache/podcast-eleven');
fs.mkdirSync(CACHE, { recursive: true });
const idxFile = path.join(OUT, 'index.json');
const index = fs.existsSync(idxFile) ? JSON.parse(fs.readFileSync(idxFile, 'utf8')) : {};

// mesma assinatura do scripts/gen-podcasts.py (json.dumps do Python), para ele não regravar por cima
const sig = (ep) => crypto.createHash('sha1').update('[' + ep.lines.map(l => `[${JSON.stringify(l.who)}, ${JSON.stringify(l.en)}]`).join(', ') + ']').digest('hex').slice(0, 12);

const only = process.argv.includes('--so') ? process.argv[process.argv.indexOf('--so') + 1] : null;
const todo = data.episodes.filter(ep => (!only || ep.id === only) && (index[ep.id]?.voz !== 'eleven' || index[ep.id]?.sig !== sig(ep) || !fs.existsSync(path.join(OUT, ep.id + '.mp3'))));
console.log(`${data.episodes.length} episódios, ${todo.length} para gravar`);

async function line(text, who, level, prev, next) {
  const voice = VOICES[who] || VOICES.ana;
  const speed = SPEED[level] || 1;
  const file = path.join(CACHE, crypto.createHash('sha1').update(`${voice}|${speed}|${text}`).digest('hex').slice(0, 16) + '.pcm');
  if (fs.existsSync(file)) return { pcm: fs.readFileSync(file), chars: 0 };
  for (let tries = 0; ; tries++) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=pcm_24000`, {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'content-type': 'application/json' },
      body: JSON.stringify({
        text, model_id: 'eleven_multilingual_v2',
        previous_text: prev || undefined, next_text: next || undefined, // entonação de conversa
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.25, use_speaker_boost: true, speed },
      }),
    });
    if (r.ok) { const pcm = Buffer.from(await r.arrayBuffer()); fs.writeFileSync(file, pcm); return { pcm, chars: text.length }; }
    const msg = (await r.text().catch(() => '')).slice(0, 200);
    if (tries < 3 && (r.status === 429 || r.status >= 500)) { await new Promise(res => setTimeout(res, 2000 * (tries + 1))); continue; }
    throw new Error(`Falhou em "${text.slice(0, 40)}…" (${r.status}): ${msg}`);
  }
}

const silence = (s) => Buffer.alloc(Math.round(SR * s) * 2);
let total = 0;
for (const ep of todo) {
  const parts = [silence(0.6)], times = [];
  let t = 0.6, prevWho = null;
  for (let i = 0; i < ep.lines.length; i++) {
    const l = ep.lines[i];
    if (prevWho !== null) { const gap = l.who === prevWho ? 0.45 : 0.7; parts.push(silence(gap)); t += gap; }
    const { pcm, chars } = await line(l.en, l.who, ep.level, ep.lines[i - 1]?.en, ep.lines[i + 1]?.en);
    total += chars;
    const dur = pcm.length / 2 / SR;
    times.push([+t.toFixed(2), +(t + dur).toFixed(2)]);
    parts.push(pcm); t += dur; prevWho = l.who;
  }
  parts.push(silence(0.8)); t += 0.8;
  const raw = path.join(CACHE, ep.id + '.raw');
  fs.writeFileSync(raw, Buffer.concat(parts));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', String(SR), '-ac', '1', '-i', raw, '-codec:a', 'libmp3lame', '-b:a', '64k', path.join(OUT, ep.id + '.mp3')]);
  fs.unlinkSync(raw);
  index[ep.id] = { sig: sig(ep), duration: +t.toFixed(2), times, voz: 'eleven' };
  fs.writeFileSync(idxFile, JSON.stringify(index));
  console.log(`🎧 ${ep.id}: ${t.toFixed(0)}s`);
}
console.log(`Pronto. ${total} caracteres enviados à ElevenLabs nesta rodada.`);
