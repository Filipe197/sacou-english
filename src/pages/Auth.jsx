import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, authErrorPt } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { Icon, Logo, Fire } from '../components/ui.jsx';

const GOOGLE = import.meta.env.VITE_ENABLE_GOOGLE === 'true';

export default function Auth({ mode }) {
  const isSignup = mode === 'signup';
  const { session, profile } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [params] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  if (session && profile) {
    const to = !profile.onboarded ? '/bem-vindo' + (params.get('nivel') ? '?nivel=1' : '') : (loc.state?.from || '/aprender');
    return <Navigate to={to} replace />;
  }

  async function submit(e) {
    e.preventDefault();
    setError(''); setInfo('');
    if (isSignup && name.trim().length < 2) return setError('Diga como podemos te chamar.');
    if (password.length < 8 && isSignup) return setError('A senha precisa ter pelo menos 8 caracteres.');
    setBusy(true);
    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(), password,
        options: { data: { display_name: name.trim() }, emailRedirectTo: window.location.origin + '/bem-vindo' },
      });
      setBusy(false);
      if (error) return setError(authErrorPt(error));
      if (!data.session) setInfo('Conta criada! Enviamos um link de confirmação para o seu e-mail. Abra o link para entrar (confira também o spam).');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setBusy(false);
      if (error) return setError(authErrorPt(error));
    }
  }

  async function forgot() {
    setError(''); setInfo('');
    if (!email.includes('@')) return setError('Digite seu e-mail no campo acima e clique de novo em "Esqueci minha senha".');
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + '/redefinir-senha' });
    if (error) return setError(authErrorPt(error));
    setInfo('Se esse e-mail tiver uma conta, você vai receber um link para criar uma nova senha.');
  }

  async function google() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/aprender' } });
  }

  return (
    <div className="split">
      <aside>
        <Logo dark />
        <div className="benefits">
          <h1 style={{ fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.04, margin: '0 0 20px' }}>{isSignup ? <>Por que criar<br />uma conta?</> : <>Bom te ver<br />de volta!</>}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--on-dark)', margin: '0 0 32px', maxWidth: 440 }}>
            {isSignup ? 'Sua conta é o seu caderno. É nela que guardamos tudo o que você aprendeu, para você nunca começar do zero de novo.' : 'Entre para continuar exatamente de onde parou.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              [<Icon name="cloud" color="var(--lime)" />, 'Progresso salvo na nuvem', 'Estude no celular, continue no computador.'],
              [<Icon name="review" color="var(--lime)" />, 'Revisão dos seus erros', 'O que você errou volta para você praticar.'],
              [<Fire size={20} color="var(--lime)" />, 'Sequência e metas', 'Acompanhe seus dias seguidos e seu XP.'],
            ].map(([ic, t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 14 }}>
                <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 12, background: 'var(--ink2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</span>
                <div><b style={{ display: 'block', marginBottom: 2 }}>{t}</b><span style={{ color: 'var(--on-dark2)', fontSize: 15 }}>{d}</span></div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--on-dark2)' }}>Grátis para começar.</p>
      </aside>

      <main>
        <div className="form-box">
          {isSignup && (
            <div className="steps" aria-label="Etapa 1 de 2">
              <span className="s on" /><span className="s" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text3)', marginLeft: 6 }}>1 de 2</span>
            </div>
          )}
          <h2 style={{ fontSize: 36, margin: '0 0 8px' }}>{isSignup ? 'Criar sua conta' : 'Entrar'}</h2>
          <p className="muted" style={{ margin: '0 0 28px', fontSize: 16 }}>
            {isSignup ? <>Já tem conta? <Link to="/entrar" style={{ fontWeight: 600 }}>Entrar</Link></> : <>Ainda não tem conta? <Link to="/criar-conta" style={{ fontWeight: 600 }}>Criar grátis</Link></>}
          </p>

          {GOOGLE && <>
            <button type="button" className="btn btn-out btn-block" onClick={google}>Continuar com Google</button>
            <div className="divider">ou use seu e-mail</div>
          </>}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }} noValidate>
            {isSignup && (
              <div className="field"><label htmlFor="nome">Como podemos te chamar?</label>
                <input id="nome" autoComplete="given-name" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" /></div>
            )}
            <div className="field"><label htmlFor="email">E-mail</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" required />
              {isSignup && <span className="hint">Usamos para salvar seu progresso e recuperar sua senha.</span>}</div>
            <div className="field"><label htmlFor="senha">Senha</label>
              <input id="senha" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={isSignup ? 'Mínimo de 8 caracteres' : 'Sua senha'} required />
              {isSignup && <span className="hint">Dica: misture letras e números para deixar mais segura.</span>}</div>
            {error && <div className="alert" role="alert">{error}</div>}
            {info && <div className="note" role="status">{info}</div>}
            <button className="btn btn-violet btn-block" disabled={busy}>{busy ? 'Aguarde…' : isSignup ? 'Criar conta e continuar' : 'Entrar'}</button>
            {!isSignup && <button type="button" className="link-btn" onClick={forgot}>Esqueci minha senha</button>}
            {isSignup && <p className="hint legal-hint">Ao criar a conta, você concorda com os <Link to="/termos">Termos de Uso</Link> e a <Link to="/privacidade">Política de Privacidade</Link>.</p>}
          </form>
          <p style={{ marginTop: 28 }}><button className="link-btn" onClick={() => nav('/')}><Icon name="back" size={16} /> Voltar ao início</button></p>
        </div>
      </main>
    </div>
  );
}
