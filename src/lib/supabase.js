import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  // Mostra um aviso claro em vez de uma tela branca
  console.error('Faltam VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env / Vercel.');
}

export const supabase = createClient(url || 'http://localhost', key || 'missing', {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

// Traduz as mensagens de erro mais comuns do Supabase Auth
export function authErrorPt(error) {
  const m = (error?.message || '').toLowerCase();
  if (m.includes('invalid login')) return 'E-mail ou senha incorretos.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Já existe uma conta com esse e-mail. Tente entrar.';
  if (m.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar (veja sua caixa de entrada e o spam).';
  if (m.includes('password should be') || m.includes('weak')) return 'A senha precisa ter pelo menos 8 caracteres.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Muitas tentativas seguidas. Espere alguns minutos e tente de novo.';
  if (m.includes('invalid email') || m.includes('unable to validate email')) return 'Esse e-mail não parece válido.';
  if (m.includes('failed to fetch') || m.includes('network')) return 'Sem conexão com o servidor. Verifique sua internet.';
  return 'Algo deu errado. Tente de novo em instantes.';
}
