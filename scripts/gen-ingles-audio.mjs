// Áudios das páginas públicas /ingles/<slug> (voz natural ElevenLabs, normal e devagar).
// Lê src/seo/paginas.json, grava public/audio/ingles/<hash>-n.mp3 e -l.mp3 e a lista
// src/seo/audio.json (texto → arquivos). Só grava o que ainda não existe.
// Uso: node scripts/gen-ingles-audio.mjs   (lê ELEVENLABS_API_KEY do .env; a chave não é impressa)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)
  .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map(([, k, v]) => [k, v.replace(/^["']|["']$/g, '')]));
const VOZ = { ana: 'EXAVITQu4vr4xnSDxMaL', tom: 'iP95p4xoKVk53GoZ742B' };
const NORMAL = { stability: 0.5, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true, speed: 0.95 };
const LENTO = { stability: 0.8, similarity_boost: 0.75, style: 0, use_speaker_boost: true, speed: 0.72 };
const out = path.join(root, 'public/audio/ingles');
fs.mkdirSync(out, { recursive: true });

async function tts(text, voz, settings, file) {
  const dest = path.join(out, file);
  if (fs.existsSync(dest)) return;
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOZ[voz]}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', language_code: 'en', voice_settings: settings }),
  });
  if (!r.ok) { console.error('erro', r.status, (await r.text()).slice(0, 300)); process.exit(1); }
  const raw = dest.replace('.mp3', '.raw.mp3');
  fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer()));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5', '-b:a', '96k', dest]);
  fs.rmSync(raw);
  console.log('🎙️', file, text);
}

const paginas = JSON.parse(fs.readFileSync(path.join(root, 'src/seo/paginas.json'), 'utf8'));
const lista = {};
for (const p of Object.values(paginas)) {
  const falas = [p.resposta, ...p.exemplos, p.dica, ...p.erros.map(e => ({ en: e.certo, voz: 'ana' }))].filter(x => x?.en);
  for (const { en, voz = 'ana' } of falas) {
    const h = crypto.createHash('sha1').update(`${voz}|${en}`).digest('hex').slice(0, 10);
    await tts(en, voz, NORMAL, `${h}-n.mp3`);
    await tts(en, voz, LENTO, `${h}-l.mp3`);
    lista[en] = h;
  }
}
fs.writeFileSync(path.join(root, 'src/seo/audio.json'), JSON.stringify(lista, null, 1));
console.log('ok:', Object.keys(lista).length, 'falas');
