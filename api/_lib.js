// Código comum das funções de IA (rodam no servidor da Vercel; a chave da IA
// nunca vai para o navegador). Arquivos com "_" na pasta api/ não viram rotas.
//
// Dois provedores possíveis, escolhidos por variável de ambiente:
//   AI_PROVIDER=deepseek  + DEEPSEEK_API_KEY   (DEEPSEEK_MODEL, padrão deepseek-flash)
//   AI_PROVIDER=anthropic + ANTHROPIC_API_KEY  (AI_MODEL, padrão claude-opus-5-5)
// Sem AI_PROVIDER, usa o que tiver chave (DeepSeek primeiro).
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

export const PROVIDER = (process.env.AI_PROVIDER || (process.env.DEEPSEEK_API_KEY ? 'deepseek' : 'anthropic')).toLowerCase();
export const MODEL = process.env.AI_MODEL || 'claude-opus-5-5';
const DS_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-flash';
// Modelos que aceitam o "fallbacks" do servidor (se um pedido for recusado,
// outro modelo responde na mesma chamada).
const FALLBACK_MODELS = new Set(['claude-opus-5-5', 'claude-opus-5', 'claude-fable-5-2', 'claude-fable-5-1', 'claude-sonnet-5-5']);

let anthropic = null;
const ai = () => (anthropic ||= new Anthropic());

// Modo de teste local: AI_MOCK=1 devolve respostas de exemplo sem chamar a API.
// Nunca vale em produção.
export const MOCK = process.env.AI_MOCK === '1' && process.env.VERCEL_ENV !== 'production';

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

// Confere o login (token do Supabase) e desconta um uso do limite diário.
export async function guard(req, kind) {
  if (req.method !== 'POST') throw new HttpError(405, 'Use POST.');
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) throw new HttpError(401, 'Entre na sua conta para usar o professor.');
  if (MOCK) return { user: { id: 'mock' }, left: 99 };
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new HttpError(500, 'Servidor sem configuração do Supabase.');
  const sb = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: u, error: ue } = await sb.auth.getUser(token);
  if (ue || !u?.user) throw new HttpError(401, 'Sua sessão expirou. Entre de novo.');
  const { data: left, error } = await sb.rpc('ai_take', { p_kind: kind });
  if (error) {
    if (/ai_take|schema cache|does not exist/i.test(error.message || '')) throw new HttpError(503, 'O professor de IA ainda não foi ativado (falta rodar supabase/004_ia.sql).');
    throw new HttpError(500, 'Não consegui verificar seu limite agora. Tente de novo.');
  }
  if (left < 0) throw new HttpError(429, 'Você chegou ao limite de hoje do professor de IA. Amanhã tem mais!');
  return { user: u.user, left };
}

export function readBody(req) {
  const b = typeof req.body === 'string' ? safeJson(req.body) : req.body;
  if (!b || typeof b !== 'object') throw new HttpError(400, 'Pedido inválido.');
  return b;
}
const safeJson = (s) => { try { return JSON.parse(s); } catch { return null; } };

// Texto curto vindo do aluno: recusa (não corta) o que passar do tamanho.
export function str(v, max, field) {
  if (v == null) return '';
  const s = String(v).trim();
  if (s.length > max) throw new HttpError(400, `Texto muito longo em "${field}".`);
  return s;
}

// Uma chamada à IA que devolve JSON no formato do schema.
export async function askJSON(opts) {
  return PROVIDER === 'deepseek' ? askDeepSeek(opts) : askClaude(opts);
}

async function askClaude({ system, messages, schema, maxTokens = 4000 }) {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    throw new HttpError(503, 'O professor de IA ainda não foi configurado (falta a chave da IA na Vercel).');
  }
  const params = {
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages,
    output_config: { effort: 'low', format: { type: 'json_schema', schema } },
  };
  let r;
  try {
    r = FALLBACK_MODELS.has(MODEL)
      ? await ai().beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
      : await ai().messages.create(params);
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) throw new HttpError(429, 'Muita gente usando o professor agora. Tente em alguns segundos.');
    if (e instanceof Anthropic.AuthenticationError) throw new HttpError(503, 'A chave da IA no servidor é inválida.');
    if (e instanceof Anthropic.APIError) { console.error('anthropic', e.status, e.message); throw new HttpError(502, 'O professor não respondeu. Tente de novo.'); }
    throw e;
  }
  if (r.stop_reason === 'refusal') throw new HttpError(422, 'O professor não pode responder a isso. Tente perguntar de outro jeito.');
  if (r.stop_reason === 'max_tokens') throw new HttpError(502, 'A resposta ficou longa demais. Tente de novo.');
  const text = r.content.filter(b => b.type === 'text').map(b => b.text).join('');
  try { return JSON.parse(text); } catch { throw new HttpError(502, 'Resposta inesperada do professor. Tente de novo.'); }
}

// DeepSeek (API no formato OpenAI). O "modo JSON" dela garante um JSON válido,
// mas não os campos: por isso o formato vai descrito no prompt, a resposta é
// conferida e ajustada ao schema, e uma resposta vazia ou quebrada é refeita uma vez.
async function askDeepSeek({ system, messages, schema, maxTokens = 4000 }) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new HttpError(503, 'O professor de IA ainda não foi configurado (falta a DEEPSEEK_API_KEY na Vercel).');
  const body = {
    model: DS_MODEL,
    messages: [
      { role: 'system', content: `${system}\n\nResponda SOMENTE com um objeto json válido, sem texto antes ou depois, com exatamente estes campos (os valores abaixo são só exemplo do tipo):\n${JSON.stringify(example(schema), null, 1)}` },
      ...messages.map(m => ({ role: m.role, content: String(m.content) })),
    ],
    response_format: { type: 'json_object' },
    thinking: { type: 'disabled' }, // respostas curtas e rápidas, sem raciocínio longo
    max_tokens: Math.min(maxTokens, 2500),
  };
  for (let attempt = 0; attempt < 2; attempt++) {
    let r;
    try {
      r = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(45000),
      });
    } catch {
      if (attempt === 0) continue;
      throw new HttpError(502, 'O professor não respondeu. Tente de novo.');
    }
    if (r.status === 401) throw new HttpError(503, 'A chave da DeepSeek no servidor é inválida.');
    if (r.status === 402) throw new HttpError(503, 'O professor de IA está sem créditos no momento. Avise o suporte.');
    if (r.status === 429) throw new HttpError(429, 'Muita gente usando o professor agora. Tente em alguns segundos.');
    if (r.status === 400 || r.status === 422) {
      console.error('deepseek', r.status, await r.text().catch(() => ''));
      throw new HttpError(502, 'O professor não entendeu o pedido. Tente de novo.');
    }
    if (!r.ok) { if (attempt === 0) continue; throw new HttpError(502, 'O professor não respondeu. Tente de novo.'); }
    const j = await r.json().catch(() => null);
    const choice = j?.choices?.[0];
    if (choice?.finish_reason === 'content_filter') throw new HttpError(422, 'O professor não pode responder a isso. Tente perguntar de outro jeito.');
    const text = (choice?.message?.content || '').trim();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    const fitted = data && fit(schema, data);
    if (fitted && !isBlank(fitted)) return fitted;
    if (attempt === 0) continue;
  }
  throw new HttpError(502, 'Resposta inesperada do professor. Tente de novo.');
}

// Exemplo de JSON a partir do schema (para o prompt).
function example(sc) {
  if (sc.type === 'object') return Object.fromEntries(Object.entries(sc.properties).map(([k, v]) => [k, example(v)]));
  if (sc.type === 'array') return [example(sc.items)];
  if (sc.type === 'boolean') return false;
  return '...';
}
// Ajusta a resposta ao schema: campos que faltam viram vazios, extras somem.
function fit(sc, v) {
  if (sc.type === 'object') {
    if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
    const out = {};
    for (const [k, p] of Object.entries(sc.properties)) {
      const f = fit(p, v[k]);
      out[k] = f ?? (p.type === 'array' ? [] : p.type === 'boolean' ? false : p.type === 'object' ? fit(p, {}) : '');
    }
    return out;
  }
  if (sc.type === 'array') return Array.isArray(v) ? v.map(x => fit(sc.items, x)).filter(x => x != null) : null;
  if (sc.type === 'boolean') return typeof v === 'boolean' ? v : v === 'true' ? true : v === 'false' ? false : null;
  return typeof v === 'string' ? v : typeof v === 'number' ? String(v) : null;
}
// Resposta sem nenhum texto útil (o modo JSON às vezes devolve tudo vazio).
const isBlank = (o) => !Object.values(o).some(v => (typeof v === 'string' ? v.trim() : Array.isArray(v) ? v.length : v && typeof v === 'object' ? !isBlank(v) : false));

export async function handle(res, fn) {
  try {
    send(res, 200, await fn());
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.message });
    console.error(e);
    send(res, 500, { error: 'Algo deu errado no servidor. Tente de novo.' });
  }
}

// Schema JSON estrito: todos os campos obrigatórios, sem campos extras.
export const obj = (props) => ({ type: 'object', properties: props, required: Object.keys(props), additionalProperties: false });
export const S = { type: 'string' };
