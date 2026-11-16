// Cartão para ligar/desligar o lembrete diário no celular.
import { useEffect, useState } from 'react';
import { Icon } from './ui.jsx';
import { pushSupport, pushStatus, enablePush, disablePush } from '../lib/push.js';

export default function Reminder() {
  const support = pushSupport();
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => { pushStatus().then(setOn); }, []);
  if (support === 'no' || support === 'off') return null;

  async function toggle() {
    setBusy(true); setMsg('');
    try {
      if (on) { await disablePush(); setOn(false); setMsg('Lembrete desligado.'); }
      else { await enablePush(); setOn(true); setMsg('Pronto! Se você ainda não tiver estudado, avisamos por volta das 19h.'); }
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }
  return (
    <div className="card reminder">
      <h2 className="cl-h"><Icon name="bell" size={20} />Lembrete diário</h2>
      {support === 'ios-install' ? (
        <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>No iPhone, os lembretes funcionam com o app instalado: no Safari, toque em <b>Compartilhar</b> → <b>Adicionar à Tela de Início</b> e abra o Sacou pelo ícone.</p>
      ) : (
        <>
          <p className="muted" style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.5 }}>Um aviso por dia, à noite, só se você ainda não tiver estudado. Ajuda a não perder a sequência.</p>
          <button className={'btn ' + (on ? 'btn-out' : 'btn-violet')} onClick={toggle} disabled={busy}>
            <Icon name="bell" size={18} color={on ? undefined : '#fff'} />{busy ? 'Aguarde…' : on ? 'Desligar lembrete' : 'Ligar lembrete'}
          </button>
        </>
      )}
      {msg && <p className="muted" role="status" style={{ margin: '10px 0 0', fontSize: 14 }}>{msg}</p>}
    </div>
  );
}
