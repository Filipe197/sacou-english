// Atualização automática do app (PWA e site).
// - Toda vez que o app volta para a tela (e a cada 15 min), compara a versão em uso com
//   /version.json, que muda a cada publicação.
// - Se a pessoa está numa tela "parada" (trilha, jogos, progresso...), recarrega na hora.
// - Se está no meio de uma lição, jogo, conversa ou anotação, não interrompe: mostra uma faixa
//   e atualiza sozinho quando ela sair dessa tela.
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* global __BUILD_ID__ */
const CURRENT = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';
const BUSY = /^\/(licao|revisao|praticar|conversar|fone|caderno|nivelamento|bem-vindo|jogos\/.+)/;
const KEY = 'sacou-recarregou-para';

async function latest() {
  try {
    const r = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.v || null;
  } catch { return null; }
}

async function reloadTo(v) {
  try {
    if (sessionStorage.getItem(KEY) === v) return; // já tentou: não entra em loop se a CDN ainda não atualizou
    sessionStorage.setItem(KEY, v);
  } catch { /* sem storage, segue */ }
  try { const reg = await navigator.serviceWorker?.getRegistration(); await reg?.update(); } catch { /* sem SW */ }
  location.reload();
}

export default function UpdateManager() {
  const loc = useLocation();
  const [pending, setPending] = useState(null); // versão nova esperando a pessoa sair da tela
  const busyRef = useRef(false);
  busyRef.current = BUSY.test(loc.pathname);

  useEffect(() => {
    if (import.meta.env.DEV || CURRENT === 'dev') return;
    let alive = true;
    const check = async () => {
      if (document.visibilityState !== 'visible') return;
      const v = await latest();
      if (!alive || !v || v === CURRENT) return;
      if (busyRef.current) setPending(v);
      else reloadTo(v);
    };
    check();
    const onVis = () => check();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', onVis);
    window.addEventListener('online', onVis);
    const t = setInterval(check, 15 * 60 * 1000);
    return () => { alive = false; document.removeEventListener('visibilitychange', onVis); window.removeEventListener('focus', onVis); window.removeEventListener('online', onVis); clearInterval(t); };
  }, []);

  // saiu da lição/jogo: aplica a atualização que estava esperando
  useEffect(() => { if (pending && !BUSY.test(loc.pathname)) reloadTo(pending); }, [loc.pathname, pending]);

  if (!pending) return null;
  return (
    <div className="upd-bar" role="status">
      <span>✨ Nova versão do Sacou English disponível.</span>
      <button type="button" onClick={() => reloadTo(pending)}>Atualizar</button>
    </div>
  );
}
