// Regrava as falas prontas do Professor Juvenal (INTRO, RETRY e GIVE_UP de src/lib/aula.js)
// com a voz dele na ElevenLabs. Substitui os MP3 da Kokoro em public/audio, com o mesmo nome
// (hash "jp|texto" e "je|texto", igual ao src/lib/fx.js), então o app não precisa mudar.
//
// Uso (na pasta do projeto):  node scripts/gen-juvenal-eleven.mjs
// Precisa no .env: ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID (a chave nunca é impressa).
// Gasta ~1 crédito por caractere (cerca de 2.400 créditos para as 32 falas, pt + en).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)
  .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map(([, k, v]) => [k, v.replace(/^["']|["']$/g, '')]));
const KEY = process.env.ELEVENLABS_API_KEY || env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID || env.ELEVENLABS_VOICE_ID || 'FspPSevACC3LOIYjKdIQ'; // voz "Professor Juvenal"
if (!KEY || !VOICE) { console.error('Falta ELEVENLABS_API_KEY ou ELEVENLABS_VOICE_ID no .env.'); process.exit(1); }

// mesma conta do site: FNV-1a 32 bits sobre "voz|texto normalizado"
const norm = (t) => String(t).replace(/\s+/g, ' ').trim();
function key(v, t) {
  const s = `${v}|${norm(t)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

const { INTRO, RETRY, GIVE_UP } = await import(pathToFileURL(path.join(root, 'src/lib/aula.js')).href);
const lines = [...RETRY, GIVE_UP, INTRO].flatMap(([pt, en]) => [['jp', 'pt', pt], ['je', 'en', en]]);
const only = process.argv.includes('--teste') ? lines.slice(0, 2) : lines; // --teste: só as 2 primeiras

const OUT = path.join(root, 'public/audio');
const idxFile = path.join(OUT, 'index.json');
const index = new Set(JSON.parse(fs.readFileSync(idxFile, 'utf8')));
let chars = 0;
for (const [v, lang, text] of only) {
  const k = key(v, text);
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE)}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'content-type': 'application/json', accept: 'audio/mpeg' },
    body: JSON.stringify({ text: norm(text), model_id: 'eleven_multilingual_v2', language_code: lang,
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true,
        speed: v === 'je' ? 0.94 : 1 } }), // inglês (B1 e B2) um pouco mais devagar
  });
  if (!r.ok) {
    const msg = (await r.text().catch(() => '')).slice(0, 200);
    console.error(`Falhou em "${text.slice(0, 40)}…" (${r.status}): ${msg}`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(OUT, k + '.mp3'), Buffer.from(await r.arrayBuffer()));
  index.add(k); chars += norm(text).length;
  console.log(`🎙️ ${v} ${k}  ${text.slice(0, 60)}`);
}
fs.writeFileSync(idxFile, JSON.stringify([...index].sort()));
console.log(`Pronto: ${only.length} falas, ${chars} caracteres.`);
