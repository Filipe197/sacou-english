// Atualização automática do app Android (sem baixar APK): depois do build do site, gera a versão
// do app (mesmo número do site), compacta em dist/app/web-<versão>.zip e escreve
// dist/app/manifest.json. O app confere esse manifesto ao abrir (src/lib/app-update.js), baixa o
// pacote em segundo plano e passa a usar na próxima vez que for aberto.
//
// "apk" no manifesto é o versionCode do android/app/build.gradle: só aumente quando mudar algo
// nativo (plugin, permissão, ícone). Pacotes novos exigem esse APK; quem tem um APK mais antigo
// vê o aviso "Atualizar app" em vez de receber um pacote que não funcionaria.
//
// Uso: roda sozinho no fim de `npm run build`. Também serve para `npm run build:android`.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(root, 'dist'), OUT = path.join(root, 'dist-android');
const id = JSON.parse(fs.readFileSync(path.join(DIST, 'version.json'), 'utf8')).v;
const apk = +(fs.readFileSync(path.join(root, 'android/app/build.gradle'), 'utf8').match(/versionCode\s+(\d+)/)?.[1] || 1);

// 1) versão do app com o mesmo número do site
execSync('npx vite build --mode android --outDir dist-android --emptyOutDir --logLevel warn', {
  cwd: root, stdio: 'inherit', env: { ...process.env, SACOU_BUILD_ID: id },
});
// 2) o que não vai para o app (áudios e APK ficam no site; service worker não é usado no app)
for (const p of ['audio', 'download', 'sw.js']) fs.rmSync(path.join(OUT, p), { recursive: true, force: true });

// 3) zip com index.html na raiz
const files = {};
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else files[path.relative(OUT, full).split(path.sep).join('/')] = [fs.readFileSync(full), { level: /\.(png|jpe?g|webp|gif|mp3|woff2?|lottie)$/i.test(e.name) ? 0 : 6 }];
  }
})(OUT);
const zip = zipSync(files);
fs.mkdirSync(path.join(DIST, 'app'), { recursive: true });
const name = `web-${id}.zip`;
fs.writeFileSync(path.join(DIST, 'app', name), zip);
fs.writeFileSync(path.join(DIST, 'app', 'manifest.json'), JSON.stringify({ web: id, url: `/app/${name}`, checksum: crypto.createHash('sha256').update(zip).digest('hex'), apk, apkUrl: '/download/sacou-english.apk' }));
console.log(`app: pacote ${name} (${(zip.length / 1048576).toFixed(1)} MB), exige APK ${apk}`);
