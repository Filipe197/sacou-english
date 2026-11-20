// Prepara os arquivos do app Android (versão enxuta): os áudios (dezenas de MB) não vão
// dentro do APK, o app busca no site (VITE_REMOTE). Rode com `npm run build:android`.
import { rmSync, existsSync } from 'node:fs';
for (const p of ['dist-android/audio', 'dist-android/sw.js', 'dist-android/download']) {
  if (existsSync(p)) { rmSync(p, { recursive: true, force: true }); console.log('fora do APK:', p); }
}
