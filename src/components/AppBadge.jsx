// Número no ícone do app instalado (Android, Windows, Mac; iPhone com o app na tela de início).
// Mostra quantos erros há para revisar; sem erros, mostra 1 se ainda não estudou hoje.
// Some quando não há nada pendente.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { todayBR } from '../lib/progress.js';

export default function AppBadge() {
  const { user, profile } = useAuth();
  const loc = useLocation();
  useEffect(() => {
    if (!('setAppBadge' in navigator)) return;
    if (!user) { navigator.clearAppBadge?.().catch(() => {}); return; }
    let alive = true;
    const t = setTimeout(async () => {
      const { count } = await supabase.from('mistakes').select('item_id', { count: 'exact', head: true }).eq('resolved', false);
      if (!alive) return;
      const n = (count || 0) > 0 ? count : profile?.last_active === todayBR() ? 0 : 1;
      (n > 0 ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(() => {});
    }, 800);
    return () => { alive = false; clearTimeout(t); };
  }, [user?.id, profile?.last_active, loc.pathname]);
  return null;
}
