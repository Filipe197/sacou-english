// Mantém a tela do celular acesa enquanto a pessoa está numa lição ou aula (Screen Wake Lock).
// O navegador solta a trava quando o app vai para segundo plano; ao voltar, pedimos de novo.
// Onde não existe (alguns navegadores antigos), simplesmente não faz nada.
import { useEffect } from 'react';

export function useWakeLock(active = true) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return;
    let lock = null, alive = true;
    const ask = async () => {
      if (!alive || document.visibilityState !== 'visible' || lock) return;
      try {
        lock = await navigator.wakeLock.request('screen');
        lock.addEventListener?.('release', () => { lock = null; });
      } catch { lock = null; /* bateria fraca ou sem permissão: segue sem a trava */ }
    };
    const onVis = () => { if (document.visibilityState === 'visible') ask(); };
    ask();
    document.addEventListener('visibilitychange', onVis);
    return () => { alive = false; document.removeEventListener('visibilitychange', onVis); lock?.release?.().catch(() => {}); lock = null; };
  }, [active]);
}
