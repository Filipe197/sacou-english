// Grava com a ElevenLabs o áudio das frases das lições que ainda não têm MP3 em public/audio
// (as lições novas do A1 completo). Mesma lista de frases e mesmo nome de arquivo do
// scripts/gen-audio.py (hash FNV-1a de "voz|texto", igual ao src/lib/fx.js), então o site
// toca sem mudar nada. Só grava o que falta.
//
// Uso (na pasta do projeto):  node scripts/gen-audio-eleven.mjs [--ver]   (--ver: só lista)
// Precisa no .env: ELEVENLABS_API_KEY (nunca é impressa). ~1 crédito por caractere.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)
  .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map(([, k, v]) => [k, v.replace(/^["']|["']$/g, '')]));
const KEY = process.env.ELEVENLABS_API_KEY || env.ELEVENLABS_API_KEY;
const VOICE = { f: 'EXAVITQu4vr4xnSDxMaL', m: 'iP95p4xoKVk53GoZ742B' }; // Sarah e Chris (as mesmas das escutas)

const G = JSON.parse(fs.readFileSync(path.join(root, 'src/lib/voices.json'), 'utf8'));
const GENDER = Object.fromEntries([...G.f.map(n => [n, 'f']), ...G.m.map(n => [n, 'm'])]);
const gender = (who) => GENDER[String(who || '').trim().toLowerCase()] || 'f';
const norm = (t) => String(t).replace(/\s+/g, ' ').trim();
function key(v, t) {
  const s = `${v}|${norm(t)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

const entries = new Map(); // hash -> [voz, texto]
const add = (t, v = 'f') => {
  t = norm(t || '');
  if (!t || t.includes('___') || !/[A-Za-z]/.test(t) || t.length > 220) return;
  entries.set(key(v, t), [v, t]);
};
for (const lv of fs.readdirSync(path.join(root, 'src/content')).filter(d => /^[abc][12]$/.test(d))) {
  for (const f of fs.readdirSync(path.join(root, 'src/content', lv)).filter(f => f.endsWith('.json'))) {
    const u = JSON.parse(fs.readFileSync(path.join(root, 'src/content', lv, f), 'utf8'));
    for (const w of u.words || []) add(w[0]);
    for (const p of u.guide?.points || []) if (p.en) { add(p.en); add(p.en.replace(/\(.*?\)/g, '')); }
    for (const l of u.lessons) {
      for (const ln of l.story?.lines || []) {
        if (ln.ask || !ln.en) continue;
        add(ln.gap ? ln.en.replace('___', ln.gap.answer) : ln.en, gender(ln.who));
      }
      for (const it of l.items) {
        const ty = it.type;
        if (['meaning', 'listen', 'dictation', 'speak'].includes(ty)) {
          add(it.en);
          if (ty === 'speak') for (const w of norm(it.en).split(' ')) add(w.replace(/[^A-Za-z'-]/g, ''));
        }
        if (ty === 'choice') { add(it.en.replace('___', it.answer)); it.options.forEach(o => add(o)); }
        if (ty === 'build') { add(it.answer); add(it.display || it.answer); [...it.answer.split(' '), ...(it.extra || [])].forEach(w => add(w)); }
        if (ty === 'type') { add(it.answer); (it.accept || []).forEach(a => add(a)); }
        if (ty === 'dictation') (it.accept || []).forEach(a => add(a));
        if (ty === 'match') it.pairs.forEach(([en]) => add(en));
        if (ty === 'dialogue') {
          for (const [who, t] of it.lines) if (t !== '___') add(t, gender(who));
          const blank = (it.lines.find(([, t]) => t === '___') || ['B'])[0];
          it.options.forEach(o => add(o, gender(blank)));
        }
      }
    }
  }
}

const OUT = path.join(root, 'public/audio');
const idxFile = path.join(OUT, 'index.json');
const index = new Set(JSON.parse(fs.readFileSync(idxFile, 'utf8')));
const todo = [...entries].filter(([k]) => !index.has(k) || !fs.existsSync(path.join(OUT, k + '.mp3')));
const chars = todo.reduce((n, [, [, t]]) => n + t.length, 0);
console.log(`${entries.size} frases nas lições, ${todo.length} sem áudio (${chars} caracteres)`);
if (process.argv.includes('--ver')) { for (const [k, [v, t]] of todo) console.log(`  ${k} ${v} ${t}`); process.exit(0); }
if (!KEY) { console.error('Falta ELEVENLABS_API_KEY no .env.'); process.exit(1); }

for (const [k, [v, t]] of todo) {
  for (let tries = 0; ; tries++) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE[v] || VOICE.f}?output_format=mp3_44100_64`, {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text: t, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true, speed: 0.9 } }),
    });
    if (r.ok) { fs.writeFileSync(path.join(OUT, k + '.mp3'), Buffer.from(await r.arrayBuffer())); break; }
    if (tries < 3 && (r.status === 429 || r.status >= 500)) { await new Promise(res => setTimeout(res, 2000 * (tries + 1))); continue; }
    console.error(`Falhou em "${t.slice(0, 40)}" (${r.status}): ${(await r.text().catch(() => '')).slice(0, 200)}`);
    process.exit(1);
  }
  index.add(k);
  fs.writeFileSync(idxFile, JSON.stringify([...index].sort()));
  console.log(`🎙️ ${v} ${k}  ${t.slice(0, 60)}`);
}
console.log(`Pronto: ${todo.length} frases.`);
