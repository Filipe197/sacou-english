// Cartão "Novidades": aparece uma vez, depois de uma atualização, para quem já usava o app.
// O texto fica em src/novidades.json.
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import data from '../novidades.json';

const KEY = (uid) => `sacou-novidades:${uid}`;
const QUIET = /^\/(licao|revisao|praticar|conversar|fone|nivelamento|bem-vindo|jogos\/.+|entrar|criar-conta|sobre|apoie|baixar|privacidade|termos|creditos|$)/;

export default function Novidades() {
  const { user, profile } = useAuth();
  const loc = useLocation();
  const [item, setItem] = useState(null);
  const top = data.itens[0];

  useEffect(() => {
    if (!user || !profile?.onboarded || !top) return;
    let seen = null;
    try { seen = localStorage.getItem(KEY(user.id)); } catch { return; }
    if (seen === top.id) return;
    // conta nova (menos de 1 dia): não precisa de novidades, já vê tudo pela primeira vez
    const fresh = profile.created_at && Date.now() - new Date(profile.created_at).getTime() < 864e5;
    if (fresh) { try { localStorage.setItem(KEY(user.id), top.id); } catch { /* nada */ } return; }
    setItem(top);
  }, [user?.id, profile?.onboarded]);

  function close() {
    try { localStorage.setItem(KEY(user.id), item.id); } catch { /* nada */ }
    setItem(null);
  }

  if (!item || QUIET.test(loc.pathname)) return null;
  return (
    <div className="nov-bg" onClick={close}>
      <div className="nov" role="dialog" aria-modal="true" aria-labelledby="nov-t" onClick={e => e.stopPropagation()}>
        <span className="nov-tag">Atualização</span>
        <h2 id="nov-t">{item.titulo}</h2>
        <ul>{item.linhas.map(l => <li key={l}>{l}</li>)}</ul>
        <div className="nov-actions">
          {item.botao && <Link className="btn btn-violet btn-3d" to={item.botao.para} onClick={close}>{item.botao.texto}</Link>}
          <button type="button" className="btn btn-out" onClick={close} autoFocus={!item.botao}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
