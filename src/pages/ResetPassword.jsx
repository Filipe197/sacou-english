import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, authErrorPt } from '../lib/supabase.js';
import { Logo } from '../components/ui.jsx';

export default function ResetPassword() {
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function save(e) {
    e.preventDefault(); setErr('');
    if (pw.length < 8) return setErr('A senha precisa ter pelo menos 8 caracteres.');
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return setErr(authErrorPt(error));
    setMsg('Senha alterada! Levando você para suas lições…');
    setTimeout(() => nav('/aprender'), 1500);
  }

  return (
    <div className="center-page">
      <form className="card form-box" onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 32 }}>
        <Logo />
        <h1 style={{ margin: 0, fontSize: 30 }}>Criar nova senha</h1>
        <p className="muted" style={{ margin: 0 }}>Escolha uma senha nova para sua conta.</p>
        <div className="field"><label htmlFor="np">Nova senha</label>
          <input id="np" type="password" autoComplete="new-password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Mínimo de 8 caracteres" /></div>
        {err && <div className="alert" role="alert">{err}</div>}
        {msg && <div className="note" role="status">{msg}</div>}
        <button className="btn btn-violet">Salvar nova senha</button>
      </form>
    </div>
  );
}
