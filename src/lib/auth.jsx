import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from './supabase.js';
import { fx } from './fx.js';
import { flushQueue } from './offline.js';
import { clearNotebookCache } from './notebook.js';
import { disablePush } from './push.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = carregando
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const profileRequest = useRef(0);
  const signingOut = useRef(false);

  const loadProfile = useCallback(async (uid) => {
    const request = ++profileRequest.current;
    setProfileError(''); setIsAdmin(false);
    if (!uid) { setProfile(null); setProfileLoading(false); return null; }
    setProfileLoading(true);
    let data;
    try {
      const result = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle();
      if (result.error) throw result.error;
      data = result.data;
      if (!data) throw new Error('missing-profile');
    } catch (error) {
      if (request !== profileRequest.current) return null;
      setProfile(null);
      setProfileError(error.message === 'missing-profile'
        ? 'Seu perfil não foi encontrado. Tente novamente. Se continuar, entre em contato com o suporte.'
        : 'Não conseguimos carregar seu perfil. Verifique a conexão e tente novamente.');
      setProfileLoading(false);
      return null;
    }
    if (request !== profileRequest.current) return null;
    setProfile(data || null);
    setProfileLoading(false);
    if (data) fx.setEnabled(data.sound_on);
    // lições feitas sem internet sobem agora
    flushQueue(uid).then(p => { if (p && request === profileRequest.current) setProfile(p); }).catch(() => {});
    // painel de administração: só aparece para quem está na tabela admins
    supabase.rpc('is_admin').then(({ data: adm }) => { if (request === profileRequest.current) setIsAdmin(!!adm); }, () => {});
    return data;
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadProfile(data.session?.user?.id);
    }, () => { setSession(null); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      loadProfile(s?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  useEffect(() => {
    const uid = session?.user?.id;
    if (!uid) return;
    let active = true;
    const on = () => flushQueue(uid).then(p => { if (p && active) setProfile(p); }).catch(() => {});
    window.addEventListener('online', on);
    return () => { active = false; window.removeEventListener('online', on); };
  }, [session?.user?.id]);

  const value = {
    session,
    user: session?.user || null,
    profile,
    setProfile,
    isAdmin,
    profileError,
    loading: session === undefined || (session && (profileLoading || (!profile && !profileError))),
    refreshProfile: () => loadProfile(session?.user?.id),
    async updateProfile(patch) {
      const { data, error } = await supabase.from('profiles').update(patch).eq('id', session.user.id).select().single();
      if (!error) { setProfile(data); if ('sound_on' in patch) fx.setEnabled(data.sound_on); }
      return { data, error };
    },
    async signOut() {
      if (signingOut.current) return { error: new Error('Saída em andamento.') };
      signingOut.current = true;
      setSignOutError('');
      try {
        if (!await clearNotebookCache(session?.user?.id)) {
          throw new Error('Há anotações que ainda não foram enviadas. Você continua na sua conta e suas notas estão preservadas. Conecte-se à internet e tente sair novamente.');
        }
        // o próximo aluno neste aparelho não recebe os lembretes nem vê as notas de quem saiu
        try { await disablePush(); } catch { /* sem lembrete ativo */ }
        const result = await supabase.auth.signOut();
        if (result.error) throw new Error('Não conseguimos sair da conta. Tente novamente.');
        return result;
      } catch (error) {
        setSignOutError(error.message || 'Não conseguimos sair da conta. Tente novamente.');
        return { error };
      } finally { signingOut.current = false; }
    },
  };
  // Exclui a conta e todos os dados no servidor (012_conta_combo.sql) e limpa este aparelho
  value.deleteAccount = async () => {
    const uid = session?.user?.id;
    if (!uid) return { error: new Error('Entre na sua conta.') };
    const { error } = await supabase.rpc('delete_my_account');
    if (error) return { error: new Error(/delete_my_account|schema cache|does not exist/i.test(error.message || '')
      ? 'A exclusão de conta ainda não foi ativada no servidor. Tente mais tarde.'
      : 'Não conseguimos excluir sua conta agora. Verifique a conexão e tente de novo.') };
    try { Object.keys(localStorage).filter(k => k.startsWith('sacou-') && k.includes(uid)).forEach(k => localStorage.removeItem(k)); } catch { /* sem armazenamento */ }
    try { await disablePush(); } catch { /* sem lembrete ativo */ }
    try { await supabase.auth.signOut({ scope: 'local' }); } catch { /* a sessão já não vale no servidor */ }
    return {};
  };
  return <AuthCtx.Provider value={value}>{children}{signOutError && (
    <div role="alert" className="card auth-notice">
      <p>{signOutError}</p><button className="btn btn-violet" onClick={() => setSignOutError('')}>Entendi</button>
    </div>
  )}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
