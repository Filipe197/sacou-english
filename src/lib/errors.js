// Aviso automático de erros: grava no Supabase (tabela app_errors, só o admin lê)
// quando algo quebra no aparelho do aluno. Sem dados pessoais além da conta logada.
import { supabase } from './supabase.js';

const sent = new Set();
let count = 0;
const MAX_PER_VISIT = 15;

const clip = (s, n) => String(s ?? '').slice(0, n);

export function reportError(kind, message, detail) {
  try {
    if (typeof window === 'undefined' || import.meta.env.DEV) return; // no PC de desenvolvimento, só no console
    const msg = clip(message || 'erro sem mensagem', 500);
    if (/ResizeObserver loop|Script error\.?$|Load failed|Failed to fetch|NetworkError|chrome-extension:|moz-extension:/i.test(msg + ' ' + (detail || ''))) return; // ruído do navegador e de rede
    const key = kind + msg;
    if (sent.has(key) || count >= MAX_PER_VISIT) return;
    sent.add(key); count++;
    supabase.from('app_errors').insert({
      kind, message: msg, detail: clip(detail, 4000) || null,
      page: clip(location.pathname + location.search, 300), ua: clip(navigator.userAgent, 300),
    }).then(() => {}, () => {});
  } catch { /* o aviso de erro nunca pode quebrar o site */ }
}

export function installErrorReporting() {
  if (typeof window === 'undefined') return;
  window.addEventListener('error', (e) => {
    if (!e.error && !e.message) return;
    reportError('js', e.message || String(e.error), e.error?.stack || `${e.filename}:${e.lineno}:${e.colno}`);
  });
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason;
    reportError('promise', r?.message || String(r), r?.stack);
  });
}
