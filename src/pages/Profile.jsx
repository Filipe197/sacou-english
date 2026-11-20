// Editar perfil: nome, meta diária, som, lembrete e senha.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { Shell, Icon } from '../components/ui.jsx';
import Reminder from '../components/Reminder.jsx';
import { THEMES, useTheme } from '../lib/theme.js';

const GOALS = [
  [10, 'Leve', 'cerca de 1 lição por dia'],
  [20, 'Normal', 'cerca de 2 lições por dia'],
  [30, 'Séria', 'cerca de 3 lições por dia'],
  [50, 'Intensa', '4 ou mais lições por dia'],
];

export default function Profile() {
  const { profile, user, updateProfile, signOut } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState(profile?.display_name || '');
  const [goal, setGoal] = useState(profile?.daily_goal_xp || 30);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [pwMsg, setPwMsg] = useState(null);
  const [pwBusy, setPwBusy] = useState(false);

  const cleanName = name.trim().replace(/\s+/g, ' ');
  const changed = cleanName !== (profile?.display_name || '') || goal !== (profile?.daily_goal_xp || 30);
  const google = user?.app_metadata?.provider === 'google';

  async function save(e) {
    e.preventDefault();
    if (cleanName.length < 2 || cleanName.length > 40) { setMsg({ ok: false, t: 'O nome precisa ter de 2 a 40 letras.' }); return; }
    setSaving(true); setMsg(null);
    const { error } = await updateProfile({ display_name: cleanName, daily_goal_xp: goal });
    setSaving(false);
    setMsg(error ? { ok: false, t: 'Não consegui salvar agora. Verifique a internet e tente de novo.' } : { ok: true, t: 'Perfil salvo!' });
  }

  async function changePassword(e) {
    e.preventDefault();
    if (pw.length < 8) { setPwMsg({ ok: false, t: 'A senha precisa ter pelo menos 8 caracteres.' }); return; }
    if (pw !== pw2) { setPwMsg({ ok: false, t: 'As duas senhas não são iguais.' }); return; }
    setPwBusy(true); setPwMsg(null);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setPwBusy(false);
    if (error) {
      const m = error.message || '';
      setPwMsg({ ok: false, t: /different from the old|same/i.test(m) ? 'A nova senha precisa ser diferente da atual.' : /weak|short|characters/i.test(m) ? 'Senha fraca. Use letras e números, com pelo menos 8 caracteres.' : /reauth|recent/i.test(m) ? 'Por segurança, saia e entre de novo na conta antes de trocar a senha.' : 'Não consegui trocar a senha agora. Tente de novo.' });
    } else { setPw(''); setPw2(''); setPwMsg({ ok: true, t: google ? 'Senha criada! Agora você também pode entrar com e-mail e senha.' : 'Senha alterada!' }); }
  }

  return (
    <Shell>
      <div className="pf">
        <Link to="/progresso" className="link-btn pf-back"><Icon name="back" size={16} />Meu progresso</Link>
        <h1 style={{ fontSize: 32, margin: '4px 0 18px' }}>Editar perfil</h1>

        <form className="card pf-card" onSubmit={save}>
          <label className="pf-label" htmlFor="pf-name">Seu nome</label>
          <input id="pf-name" className="pf-input" value={name} onChange={e => setName(e.target.value)} maxLength={40} autoComplete="given-name" placeholder="Como quer ser chamado?" />
          <span className="pf-hint">Aparece na trilha e nos cards que você compartilha.</span>

          <span className="pf-label" style={{ marginTop: 18 }}>Meta diária</span>
          <div className="pf-goals" role="radiogroup" aria-label="Meta diária">
            {GOALS.map(([xp, t, d]) => (
              <button key={xp} type="button" role="radio" aria-checked={goal === xp} className={'pf-goal' + (goal === xp ? ' on' : '')} onClick={() => setGoal(xp)}>
                <b>{t}</b><span>{xp} XP</span><small>{d}</small>
              </button>
            ))}
          </div>

          {msg && <div className={'pf-msg ' + (msg.ok ? 'ok' : 'bad')} role="status">{msg.t}</div>}
          <button className="btn btn-violet btn-3d" disabled={!changed || saving} style={{ marginTop: 16, alignSelf: 'flex-start' }}>{saving ? 'Salvando…' : 'Salvar alterações'}</button>
        </form>

        <div className="card pf-card">
          <span className="pf-label">Preferências</span>
          <button type="button" className="pf-row" onClick={() => updateProfile({ sound_on: !profile?.sound_on })} aria-pressed={!!profile?.sound_on}>
            <Icon name={profile?.sound_on ? 'sound' : 'mute'} size={20} />
            <span><b>Sons dos exercícios</b><small>{profile?.sound_on ? 'Ligados' : 'Desligados'}</small></span>
            <span className={'pf-switch' + (profile?.sound_on ? ' on' : '')} aria-hidden="true"><span /></span>
          </button>
        </div>

        <Appearance />

        <Reminder />

        <div className="card pf-card">
          <span className="pf-label">Conta</span>
          <div className="pf-row static"><Icon name="user" size={20} /><span><b>E-mail</b><small>{user?.email}{google ? ' · entra com Google' : ''}</small></span></div>
          <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <b style={{ fontSize: 15 }}>{google ? 'Criar uma senha' : 'Trocar senha'}</b>
            <input className="pf-input" type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Nova senha (mín. 8 caracteres)" autoComplete="new-password" aria-label="Nova senha" />
            <input className="pf-input" type="password" value={pw2} onChange={e => setPw2(e.target.value)} placeholder="Repita a nova senha" autoComplete="new-password" aria-label="Repita a nova senha" />
            {pwMsg && <div className={'pf-msg ' + (pwMsg.ok ? 'ok' : 'bad')} role="status">{pwMsg.t}</div>}
            <button className="btn btn-out" disabled={!pw || pwBusy} style={{ alignSelf: 'flex-start' }}>{pwBusy ? 'Salvando…' : google ? 'Criar senha' : 'Trocar senha'}</button>
          </form>
          <button type="button" className="btn btn-out" style={{ marginTop: 18, alignSelf: 'flex-start' }} onClick={async () => { const result = await signOut(); if (!result?.error) nav('/'); }}><Icon name="logout" size={18} />Sair da conta</button>
        </div>

        <DeleteAccount />
        <p className="muted pf-legal"><Link to="/sobre">Sobre o Sacou</Link> · <Link to="/privacidade">Política de Privacidade</Link> · <Link to="/termos">Termos de Uso</Link></p>
      </div>
    </Shell>
  );
}

// Excluir a conta (LGPD): pede para digitar EXCLUIR antes de apagar tudo de vez
function DeleteAccount() {
  const { deleteAccount } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const ok = typed.trim().toUpperCase() === 'EXCLUIR';
  async function go(e) {
    e.preventDefault();
    if (!ok || busy) return;
    setBusy(true); setErr('');
    const { error } = await deleteAccount();
    setBusy(false);
    if (error) { setErr(error.message); return; }
    nav('/?conta=excluida', { replace: true });
  }
  return (
    <div className="card pf-card pf-danger">
      <span className="pf-label">Excluir conta</span>
      {!open ? <>
        <p className="muted">Apaga para sempre seu perfil, progresso, sequência, caderno, turmas que você criou, ranking e lembretes. Não dá para desfazer.</p>
        <button type="button" className="btn btn-out pf-danger-btn" onClick={() => setOpen(true)}><Icon name="trash" size={18} />Excluir minha conta</button>
      </> : (
        <form onSubmit={go} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p><b>Tem certeza?</b> Tudo será apagado agora e não poderá ser recuperado. Se quiser guardar suas anotações, use antes <Link to="/caderno">Caderno → Exportar</Link>.</p>
          <label htmlFor="pf-del" style={{ fontSize: 15 }}>Para confirmar, digite <b>EXCLUIR</b>:</label>
          <input id="pf-del" className="pf-input" value={typed} onChange={e => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" />
          {err && <div className="pf-msg bad" role="alert">{err}</div>}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn pf-danger-go" disabled={!ok || busy}>{busy ? 'Excluindo…' : 'Excluir para sempre'}</button>
            <button type="button" className="btn btn-out" onClick={() => { setOpen(false); setTyped(''); setErr(''); }}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}

// Aparência: automático, claro ou escuro (fica salvo neste aparelho)
function Appearance() {
  const [pref, set] = useTheme();
  return (
    <div className="card pf-card">
      <span className="pf-label">Aparência</span>
      <div className="pf-theme" role="radiogroup" aria-label="Tema do aplicativo">
        {THEMES.map(([v, label, hint]) => (
          <button key={v} type="button" role="radio" aria-checked={pref === v} className={'pf-theme-opt' + (pref === v ? ' on' : '')} onClick={() => set(v)}>
            <span className={'pf-theme-ic ' + v} aria-hidden="true" />
            <b>{label}</b><small>{hint}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
