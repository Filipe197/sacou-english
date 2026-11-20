// Abertura e encerramento falados do "Podcast da Ana" (em português, com a voz da Ana pela
// ElevenLabs): "Está no ar o Podcast da Ana! Episódio 3: ..." e um encerramento único.
// Mistura cada fala com a vinheta (scripts/gen-podcast-jingle.mjs, a música abaixa enquanto a
// Ana fala) e grava public/audio/podcast/abertura-<id>.mp3 e encerramento.mp3. Cada fala fica
// em .cache: rodar de novo só grava o que mudou.
//
// Uso: node scripts/gen-podcast-intros.mjs [--so pod-a1u1] [--voz <id>] [--saida <pasta>]
// Precisa no .env: ELEVENLABS_API_KEY (nunca é impressa) e do ffmpeg.
// Gasta ~60 créditos por episódio (cerca de 2.500 para os 40) e ~90 no encerramento.
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

const arg = (k) => (process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : null);
const VOICE = arg('--voz') || 'EXAVITQu4vr4xnSDxMaL'; // Sarah, a mesma voz da Ana nos episódios
const OUT = path.resolve(root, arg('--saida') || 'public/audio/podcast');
const only = arg('--so');
const CACHE = path.join(root, '.cache/podcast-intros');
fs.mkdirSync(CACHE, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });

const data = JSON.parse(fs.readFileSync(path.join(root, 'src/games/data/podcasts.json'), 'utf8'));
export const introText = (n, title) => `Está no ar o Podcast da Ana! Episódio ${n}: ${title}.`;
const OUTRO = 'Esse foi o Podcast da Ana. Agora é com você: responda às perguntas. Tchau, tchau!';

const dur = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();
if (!fs.existsSync(path.join(CACHE, 'vinheta-abertura.mp3'))) execFileSync('node', [path.join(root, 'scripts/gen-podcast-jingle.mjs'), CACHE], { stdio: 'inherit' });

// vinheta + fala: a fala entra em `at` segundos e a música abaixa (duck) enquanto ela dura
function mix(jingle, voice, at, file) {
  const end = at + dur(voice) + 0.15;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(CACHE, jingle), '-i', voice, '-filter_complex',
    `[0]volume='if(between(t,${at},${end.toFixed(2)}),0.32,1)':eval=frame[j];[1]adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[v];[j][v]amix=inputs=2:normalize=0:duration=longest,alimiter=limit=0.95[o]`,
    '-map', '[o]', '-ac', '1', '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '96k', file]);
  console.log('ok:', path.relative(root, file));
}

async function tts(text, file) {
  const cache = path.join(CACHE, crypto.createHash('sha1').update(`${VOICE}|${text}`).digest('hex').slice(0, 16) + '.mp3');
  if (!fs.existsSync(cache)) {
    for (let tries = 0; ; tries++) {
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_96`, {
        method: 'POST',
        headers: { 'xi-api-key': KEY, 'content-type': 'application/json' },
        body: JSON.stringify({
          text, model_id: 'eleven_multilingual_v2', language_code: 'pt',
          voice_settings: { stability: 0.4, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true, speed: 1 },
        }),
      });
      if (r.ok) { fs.writeFileSync(cache, Buffer.from(await r.arrayBuffer())); break; }
      const msg = (await r.text().catch(() => '')).slice(0, 200);
      if (tries < 3 && (r.status === 429 || r.status >= 500)) { await new Promise(res => setTimeout(res, 2000 * (tries + 1))); continue; }
      throw new Error(`Falhou em "${text.slice(0, 40)}…" (${r.status}): ${msg}`);
    }
  }
  // corta o silêncio das pontas e deixa o volume parelho com os episódios
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', cache, '-af',
    'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5',
    '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '96k', file]);
}

const eps = data.episodes.filter(ep => !only || ep.id === only);
const tmp = path.join(CACHE, 'fala.mp3');
for (const ep of eps) {
  await tts(introText(data.episodes.indexOf(ep) + 1, ep.title), tmp);
  mix('vinheta-abertura.mp3', tmp, 0.9, path.join(OUT, `abertura-${ep.id}.mp3`));
}
await tts(OUTRO, tmp);
mix('vinheta-fim.mp3', tmp, 0.55, path.join(OUT, 'encerramento.mp3'));
fs.rmSync(tmp);
