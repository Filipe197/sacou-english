import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import { fx } from './fx.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = carregando
  const [profile, setProfile] = useState(null);

  const loadProfile = useCallback(async (uid) => {
    if (!uid) { setProfile(null); return null; }
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle();
    setProfile(data || null);
    if (data) fx.setEnabled(data.sound_on);
    return data;
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      loadProfile(data.session?.user?.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      loadProfile(s?.user?.id);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const value = {
    session,
    user: session?.user || null,
    profile,
    setProfile,
    loading: session === undefined || (session && profile === null),
    refreshProfile: () => loadProfile(session?.user?.id),
    async updateProfile(patch) {
      const { data, error } = await supabase.from('profiles').update(patch).eq('id', session.user.id).select().single();
      if (!error) { setProfile(data); if ('sound_on' in patch) fx.setEnabled(data.sound_on); }
      return { data, error };
    },
    signOut: () => supabase.auth.signOut(),
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
