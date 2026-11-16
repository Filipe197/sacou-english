import { useEffect, useState } from 'react';

// Guarda o convite de instalação do navegador (Chrome/Edge/Android) para mostrar um botão "Instalar app".
let deferred = null;
const listeners = new Set();
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; listeners.forEach(f => f(true)); });
  window.addEventListener('appinstalled', () => { deferred = null; listeners.forEach(f => f(false)); });
}
const isStandalone = () => typeof window !== 'undefined' && (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone);
const isIOS = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

export function useInstall() {
  const [can, setCan] = useState(!!deferred);
  useEffect(() => { listeners.add(setCan); return () => listeners.delete(setCan); }, []);
  return {
    canInstall: can && !isStandalone(),
    iosHint: isIOS() && !isStandalone(),
    async install() { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; setCan(false); },
  };
}
