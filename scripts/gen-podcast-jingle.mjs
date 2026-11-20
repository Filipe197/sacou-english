// Vinheta do "Podcast da Ana" (abertura e encerramento), sintetizada aqui mesmo: música original,
// sem sample nem trilha de terceiros. Gera vinheta-abertura.mp3 e vinheta-fim.mp3 em .cache/podcast-intros,
// que o scripts/gen-podcast-intros.mjs mistura com a fala da Ana.
// Uso: node scripts/gen-podcast-jingle.mjs [pasta-de-saida]   (precisa do ffmpeg)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SR = 44100;
const OUT = process.argv[2] || '.cache/podcast-intros';
const BPM = 124, BEAT = 60 / BPM;
const hz = (m) => 440 * 2 ** ((m - 69) / 12); // nota MIDI -> frequência

function render(seconds, build) {
  const buf = new Float32Array(Math.ceil(seconds * SR));
  const add = (t0, dur, fn, gain = 1) => {
    const a = Math.floor(t0 * SR), n = Math.floor(dur * SR);
    for (let i = 0; i < n && a + i < buf.length; i++) buf[a + i] += fn(i / SR) * gain;
  };
  build(add);
  // normaliza para -1 dB e suaviza o fim
  let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v));
  const g = 0.89 / (peak || 1);
  const fade = Math.floor(0.25 * SR);
  for (let i = 0; i < buf.length; i++) buf[i] *= g * Math.min(1, (buf.length - i) / fade);
  return buf;
}
// instrumentos
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const pluck = (f) => (t) => env(t, 0.004, 0.18) * (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t) + 0.12 * Math.sin(6 * Math.PI * f * t));
const pad = (f, dur) => (t) => Math.min(1, t / 0.08) * Math.min(1, (dur - t) / 0.2) * (Math.sin(2 * Math.PI * f * t) + 0.5 * Math.sin(2 * Math.PI * f * 1.003 * t) + 0.25 * Math.sin(4 * Math.PI * f * t));
const bass = (f) => (t) => env(t, 0.01, 0.35) * (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t));
const kick = (t) => Math.exp(-t / 0.12) * Math.sin(2 * Math.PI * (45 + 90 * Math.exp(-t / 0.03)) * t);
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const clap = (t) => Math.exp(-t / 0.05) * rnd() * 0.8;
const bell = (f) => (t) => env(t, 0.002, 0.9) * (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t / 0.3));

// progressão alegre: C  Am  F  G  (um compasso de 2 tempos cada) e fecha em C
const CHORDS = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
const ARP = [0, 1, 2, 1];

function opening() {
  const bars = CHORDS.length, barLen = 2 * BEAT, end = bars * barLen;
  return render(end + 2.4, (add) => {
    CHORDS.forEach((ch, b) => {
      const t0 = b * barLen;
      ch.forEach(n => add(t0, barLen + 0.05, pad(hz(n), barLen + 0.05), 0.07));
      add(t0, barLen, bass(hz(ch[0] - 24)), 0.45);
      add(t0 + BEAT, barLen - BEAT, bass(hz(ch[0] - 24)), 0.3);
      for (let k = 0; k < 4; k++) add(t0 + k * BEAT / 2, 0.5, pluck(hz(ch[ARP[k]] + 12)), 0.22);
      add(t0, 0.4, kick, 0.7); add(t0 + BEAT, 0.4, kick, 0.55);
      add(t0 + BEAT, 0.2, clap, 0.25);
    });
    // final: acorde de C com sininho e uma "subida" de três notas
    [72, 76, 79].forEach((n, i) => add(end - 0.36 + i * 0.12, 0.6, pluck(hz(n)), 0.25));
    add(end, 0.4, kick, 0.8);
    [60, 64, 67, 72].forEach(n => add(end, 2.2, pad(hz(n), 2.2), 0.06));
    add(end, 2.2, bass(hz(36)), 0.5);
    [84, 88, 91].forEach((n, i) => add(end + i * 0.04, 2.2, bell(hz(n)), 0.14));
  });
}
function closing() {
  // assinatura curta: G -> C com sininho
  return render(2.6, (add) => {
    [67, 71, 74].forEach((n, i) => add(i * 0.12, 0.6, pluck(hz(n)), 0.25));
    add(0.42, 0.4, kick, 0.7);
    [60, 64, 67, 72].forEach(n => add(0.42, 2.1, pad(hz(n), 2.1), 0.07));
    add(0.42, 2.1, bass(hz(36)), 0.5);
    [84, 88, 91].forEach((n, i) => add(0.42 + i * 0.05, 2.1, bell(hz(n)), 0.14));
  });
}

function writeMp3(samples, file) {
  const wav = path.join(os.tmpdir(), `sacou-jingle-${Date.now()}.wav`);
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((v, i) => data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(v * 32767))), i * 2));
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.writeFileSync(wav, Buffer.concat([h, data]));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-codec:a', 'libmp3lame', '-b:a', '96k', file]);
  fs.rmSync(wav);
  console.log('ok:', file);
}
fs.mkdirSync(OUT, { recursive: true });
writeMp3(opening(), path.join(OUT, 'vinheta-abertura.mp3'));
writeMp3(closing(), path.join(OUT, 'vinheta-fim.mp3'));
