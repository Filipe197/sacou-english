// Aviso "Nova versão do app" (só no app Android, quando a atualização precisa de um APK novo).
// O botão baixa o APK pelo navegador; o Android abre a tela de instalação por cima do app atual.
import { useEffect, useState } from 'react';
import { Icon } from './ui.jsx';

export default function AppUpdateBar() {
  const [upd, setUpd] = useState(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    import('../lib/app-update.js').then(m => { if (m.apkUpdate) setUpd(m.apkUpdate); }).catch(() => {});
    const on = (e) => setUpd(e.detail);
    window.addEventListener('sacou-apk-update', on);
    return () => window.removeEventListener('sacou-apk-update', on);
  }, []);
  if (!upd || hidden) return null;
  async function go() {
    try { const { Browser } = await import('@capacitor/browser'); await Browser.open({ url: upd.url }); }
    catch { location.href = upd.url; }
  }
  return (
    <div className="upd-bar app-upd" role="status">
      <span className="upd-ic" aria-hidden="true">📲</span>
      <span className="upd-txt"><b>Nova versão do app</b><small>Baixe e toque em Instalar</small></span>
      <button type="button" className="upd-go" onClick={go}><Icon name="download" size={16} />Atualizar</button>
      <button type="button" className="upd-x" aria-label="Agora não" onClick={() => setHidden(true)}>×</button>
    </div>
  );
}
