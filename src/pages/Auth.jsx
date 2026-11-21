import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, authErrorPt } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { Icon, Logo, Fire } from '../components/ui.jsx';
import { NATIVE, SITE } from '../lib/native.js';
import Turnstile, { TURNSTILE_KEY } from '../components/Turnstile.jsx';

// ligado (Google configurado no Supabase em 20/11/2026); VITE_ENABLE_GOOGLE=false desliga
const GOOGLE = import.meta.env.VITE_ENABLE_GOOGLE !== 'false';
// "G" oficial do Google (uso permitido em botões de login, conforme as regras de marca do Google)
const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

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
  const [token, setToken] = useState('');     // verificação anti-robô (Turnstile)
  const robo = useRef(null);
  const [enviado, setEnviado] = useState(''); // e-mail que ainda precisa ser confirmado
  const [espera, setEspera] = useState(0);    // segundos até poder reenviar o link
  useEffect(() => {
    if (espera <= 0) return undefined;
    const t = setTimeout(() => setEspera(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [espera]);

  if (session && profile) {
    const to = !profile.onboarded ? '/bem-vindo' + (params.get('nivel') ? '?nivel=1' : '') : (loc.state?.from || '/aprender');
    return <Navigate to={to} replace />;
  }

  // com o anti-robô ligado, cada chamada precisa de um token novo (vale uma vez só)
  const semToken = () => {
    if (!TURNSTILE_KEY || token) return false;
    setError('Aguarde um instante: estamos confirmando que você não é um robô.');
    return true;
  };
  const novoToken = () => robo.current?.reset();

  async function submit(e) {
    e.preventDefault();
    setError(''); setInfo('');
    if (isSignup && name.trim().length < 2) return setError('Diga como podemos te chamar.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError('Esse e-mail não parece válido.');
    if (password.length < 8 && isSignup) return setError('A senha precisa ter pelo menos 8 caracteres.');
    if (semToken()) return;
    setBusy(true);
    const captchaToken = token || undefined;
    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(), password,
        options: { data: { display_name: name.trim() }, emailRedirectTo: SITE + '/bem-vindo', captchaToken },
      });
      setBusy(false); novoToken();
      if (error) return setError(authErrorPt(error));
      if (!data.session) { setEnviado(email.trim()); setEspera(60); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password, options: { captchaToken } });
      setBusy(false); novoToken();
      if (error) {
        // conta criada mas e-mail ainda não confirmado: mostra a tela de reenviar o link
        if ((error.message || '').toLowerCase().includes('email not confirmed')) { setEnviado(email.trim()); return; }
        return setError(authErrorPt(error));
      }
    }
  }

  async function reenviar() {
    setError(''); setInfo('');
    if (semToken()) return;
    setBusy(true);
    const { error } = await supabase.auth.resend({ type: 'signup', email: enviado, options: { emailRedirectTo: SITE + '/bem-vindo', captchaToken: token || undefined } });
    setBusy(false); novoToken();
    if (error) return setError(authErrorPt(error));
    setInfo('Pronto, mandamos um link novo. Pode levar alguns minutos para chegar.');
    setEspera(60);
  }

  async function forgot() {
    setError(''); setInfo('');
    if (!email.includes('@')) return setError('Digite seu e-mail no campo acima e clique de novo em "Esqueci minha senha".');
    if (semToken()) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: SITE + '/redefinir-senha', captchaToken: token || undefined });
    novoToken();
    if (error) return setError(authErrorPt(error));
    setInfo('Se esse e-mail tiver uma conta, você vai receber um link para criar uma nova senha.');
  }

  async function google() {
    setError(''); setInfo('');
    // volta para a tela de onde a pessoa veio (ou para o início do curso); quem é novo cai no "bem-vindo"
    const back = params.get('nivel') ? '/bem-vindo?nivel=1' : (loc.state?.from || '/aprender');
    const { error } = NATIVE
      ? { error: await (await import('../lib/native-app.js')).openGoogleLogin(back) }
      : await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + back } });
    if (error) setError('Não foi possível abrir o login do Google agora. Tente de novo ou use seu e-mail.');
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
        {enviado ? (
          <div className="form-box confirma">
            <div className="confirma-ic" aria-hidden="true">📬</div>
            <h2 style={{ fontSize: 32, margin: '0 0 8px' }}>Confira seu e-mail</h2>
            <p className="muted" style={{ fontSize: 16, margin: 0 }}>Mandamos um link de confirmação para</p>
            <p className="confirma-mail">{enviado}</p>
            <ol className="confirma-passos">
              <li>Abra o e-mail do <b>Sacou English</b>.</li>
              <li>Toque em <b>Confirmar meu e-mail</b>.</li>
              <li>Pronto: você entra direto no curso.</li>
            </ol>
            <p className="hint">Não chegou? Espere um minuto e olhe também a pasta de <b>spam</b> e a aba <b>Promoções</b>.</p>
            <Turnstile ref={robo} onToken={setToken} />
            {error && <div className="alert" role="alert">{error}</div>}
            {info && <div className="note" role="status">{info}</div>}
            <button type="button" className="btn btn-violet btn-block" disabled={busy || espera > 0} onClick={reenviar}>
              {busy ? 'Aguarde…' : espera > 0 ? `Reenviar o link (${espera}s)` : 'Reenviar o link'}
            </button>
            <p className="confirma-links">
              <button type="button" className="link-btn" onClick={() => { setEnviado(''); setError(''); setInfo(''); }}>Usar outro e-mail</button>
              {isSignup && <Link to="/entrar">Já confirmei, entrar</Link>}
            </p>
          </div>
        ) : (
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
            <button type="button" className="btn btn-block btn-google" onClick={google}><GoogleG />{isSignup ? 'Criar conta com o Google' : 'Entrar com o Google'}</button>
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
            <Turnstile ref={robo} onToken={setToken} />
            {error && <div className="alert" role="alert">{error}</div>}
            {info && <div className="note" role="status">{info}</div>}
            <button className="btn btn-violet btn-block" disabled={busy}>{busy ? 'Aguarde…' : isSignup ? 'Criar conta e continuar' : 'Entrar'}</button>
            {!isSignup && <button type="button" className="link-btn" onClick={forgot}>Esqueci minha senha</button>}
            {isSignup && <p className="hint legal-hint">Ao criar a conta, você concorda com os <Link to="/termos">Termos de Uso</Link> e a <Link to="/privacidade">Política de Privacidade</Link>.</p>}
          </form>
          <p style={{ marginTop: 28 }}><button className="link-btn" onClick={() => nav('/')}><Icon name="back" size={16} /> Voltar ao início</button></p>
        </div>
        )}
      </main>
    </div>
  );
}
