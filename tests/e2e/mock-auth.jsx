// Login falso com um aluno de demonstração (testes automáticos).
import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState({
    id: '00000000-0000-4000-8000-0000000000d1', display_name: 'Ana', onboarded: true, sound_on: false, daily_goal_xp: 30,
    xp_total: 1840, streak: 23, best_streak: 23, last_active: today, start_level: 'A1',
  });
  const value = {
    session: { user: { id: profile.id } }, user: { id: profile.id }, profile, setProfile, isAdmin: false, loading: false,
    refreshProfile() {}, async updateProfile(p) { setProfile(x => ({ ...x, ...p })); return {}; }, signOut: async () => {},
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
