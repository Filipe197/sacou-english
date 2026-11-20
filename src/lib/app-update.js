// Atualização automática do app Android (carregado só no app, por native-app.js).
// - Ao abrir e ao voltar para o app, confere /app/manifest.json no site.
// - Versão nova do conteúdo: baixa o pacote em segundo plano e aplica na próxima abertura
//   (nunca no meio de uma lição: só ao abrir o app ou ao voltar depois de um tempo fora,
//   numa tela "parada").
// - Se a versão nova precisa de um APK mais novo (algo nativo mudou), não baixa o pacote e
//   avisa com "Atualizar app" (evento 'sacou-apk-update', mostrado por AppUpdateBar).
/* global __BUILD_ID__ */
import { App } from '@capacitor/app';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { REMOTE } from './native.js';

const CURRENT = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';
const PENDING = 'sacou-pacote-pronto'; // { id, web } baixado e esperando a próxima abertura
const BUSY = /^\/(licao|revisao|praticar|conversar|fone|caderno|nivelamento|bem-vindo|aula|duvidas|desafio|prova|jogos\/.+)/;
const AWAY_MS = 20 * 60 * 1000; // fora do app por 20 min conta como "abrir de novo"

const readPending = () => { try { return JSON.parse(localStorage.getItem(PENDING) || 'null'); } catch { return null; } };
const writePending = (v) => { try { if (v) localStorage.setItem(PENDING, JSON.stringify(v)); else localStorage.removeItem(PENDING); } catch { /* sem storage */ } };

export let apkUpdate = null; // { url } quando há APK novo
let checking = false;

async function applyPending() {
  const p = readPending();
  if (!p || p.web === CURRENT) { writePending(null); return false; }
  try { await CapacitorUpdater.set({ id: p.id }); return true; } // recarrega o app na versão nova
  catch { writePending(null); return false; }
}

async function check() {
  if (checking || (typeof navigator !== 'undefined' && navigator.onLine === false)) return;
  checking = true;
  try {
    const r = await fetch(`${REMOTE}/app/manifest.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return;
    const m = await r.json();
    const info = await App.getInfo().catch(() => null);
    const installed = +(info?.build || 0);
    if (m.apk && installed && installed < m.apk) {
      apkUpdate = { url: REMOTE + m.apkUrl };
      window.dispatchEvent(new CustomEvent('sacou-apk-update', { detail: apkUpdate }));
      return; // pacote novo não roda no APK antigo
    }
    if (!m.web || m.web === CURRENT || readPending()?.web === m.web) return;
    const bundle = await CapacitorUpdater.download({ url: REMOTE + m.url, version: m.web, checksum: m.checksum });
    writePending({ id: bundle.id, web: m.web });
  } catch { /* sem internet ou site fora: tenta na próxima */ }
  finally { checking = false; }
}

export async function startAppUpdates() {
  try { await CapacitorUpdater.notifyAppReady(); } catch { /* sem o plugin */ }
  if (await applyPending()) return; // abriu agora: já entra na versão nova
  check();
  let leftAt = 0;
  App.addListener('appStateChange', async ({ isActive }) => {
    if (!isActive) { leftAt = Date.now(); return; }
    if (leftAt && Date.now() - leftAt > AWAY_MS && !BUSY.test(location.pathname) && (await applyPending())) return;
    check();
  });
}
