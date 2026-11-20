// Chamadas às funções de IA do servidor (api/). O token do login vai junto
// para o servidor conferir quem é o aluno e o limite diário.
import { supabase } from './supabase.js';
import { reportError } from './errors.js';
import { REMOTE } from './native.js';

export async function askAI(path, body) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new Error('Sem internet. O professor de IA precisa de conexão.');
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  let r;
  try {
    r = await fetch(`${REMOTE}/api/${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Não consegui falar com o professor. Verifique sua internet.');
  }
  const raw = await r.text().catch(() => '');
  let j = null;
  try { j = JSON.parse(raw); } catch { j = null; }
  // resposta que não é JSON = a função do servidor quebrou ou estourou o tempo: avisa o admin
  if (!j) reportError('api', `/api/${path} respondeu ${r.status} sem JSON`, raw.slice(0, 600));
  else if (r.status >= 500) reportError('api', `/api/${path} respondeu ${r.status}: ${j.error || ''}`);
  if (!r.ok || !j) throw new Error(j?.error || 'O professor não respondeu agora. Tente de novo.');
  return j;
}

// Documento simples do caderno (formato do editor) a partir de parágrafos de texto.
export function textDoc(blocks) {
  return {
    type: 'doc',
    content: blocks.filter(Boolean).map(b => typeof b === 'string'
      ? { type: 'paragraph', content: b ? [{ type: 'text', text: b }] : [] }
      : b),
  };
}
export const heading = (text, level = 3) => ({ type: 'heading', attrs: { level }, content: [{ type: 'text', text }] });
export const bullets = (items) => ({ type: 'bulletList', content: items.map(t => ({ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: t }] }] })) });
