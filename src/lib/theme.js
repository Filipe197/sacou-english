// Aparência: automático (segue o celular/computador), claro ou escuro.
// A escolha fica no aparelho. As páginas de entrada (início, login, cadastro) ficam sempre claras.
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KEY = 'sacou-tema';
export const THEMES = [['auto', 'Automático', 'Segue o tema do aparelho'], ['light', 'Claro', 'Sempre claro'], ['dark', 'Escuro', 'Melhor para estudar à noite']];
const LIGHT_ONLY = ['/', '/entrar', '/criar-conta', '/redefinir-senha'];
const listeners = new Set();

export function getTheme() {
  try { const v = localStorage.getItem(KEY); return ['auto', 'light', 'dark'].includes(v) ? v : 'auto'; } catch { return 'auto'; }
}
export function setTheme(v) {
  try { localStorage.setItem(KEY, v); } catch { /* sem armazenamento: vale só agora */ }
  listeners.forEach(fn => fn(v));
}
const systemDark = () => typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;

export function applyTheme(pathname, pref = getTheme()) {
  const dark = !LIGHT_ONLY.includes(pathname) && (pref === 'dark' || (pref === 'auto' && systemDark()));
  const html = document.documentElement;
  if (dark) html.dataset.theme = 'dark'; else delete html.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0E1020' : '#0B0D1A');
}

export function useTheme() {
  const [pref, setPref] = useState(getTheme);
  useEffect(() => { listeners.add(setPref); return () => listeners.delete(setPref); }, []);
  return [pref, setTheme];
}

// Aplica o tema ao trocar de página, de escolha ou de tema do aparelho
export function ThemeManager() {
  const { pathname } = useLocation();
  const [pref] = useTheme();
  useEffect(() => {
    applyTheme(pathname, pref);
    const mq = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
    const on = () => applyTheme(pathname, pref);
    mq?.addEventListener?.('change', on);
    return () => mq?.removeEventListener?.('change', on);
  }, [pathname, pref]);
  return null;
}
