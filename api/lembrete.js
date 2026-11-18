// Lembrete diário no celular. A Vercel chama esta rota uma vez por dia (vercel.json → crons),
// às 19h de Brasília, e ela avisa quem ainda não estudou hoje.
//
// Variáveis na Vercel: VITE_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, CRON_SECRET e
// SUPABASE_SERVICE_ROLE_KEY (chave secreta do Supabase: só aqui no servidor).
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';
import { send } from './_lib.js';

// mesma chave pública de src/lib/push.js (não é segredo)
const VAPID_PUBLIC = 'BCKicE52M32o-5W3chpko560BIQrrm4FU_B_uh61OKqSOkNgmbSdrX7uS2o8yDdbp5tS_SXQg6yyW_WguNz6cts';

const todayBR = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
const yesterdayBR = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(Date.now() - 864e5));

// Falas do Professor Juvenal, o mais ranzinza do Brasil: dramático e engraçado,
// mas nunca ofende o aluno. Sem "hmph"/"hmm" (a voz e o leitor de tela leem errado).
const RISK = [
  (n, d) => ({ title: `😤 ${d} dias de ofensiva por um fio!`, body: `Misericórdia, ${n}! Três minutinhos de lição e eu paro de reclamar. Pelo menos hoje.` }),
  (n, d) => ({ title: `🔥 ${d} dias seguidos. Vai jogar fora?`, body: `Ô ${n}, nem o meu vizinho desiste tão fácil da reforma. Uma lição e tá salvo!` }),
  (n, d) => ({ title: `⏰ Sua ofensiva de ${d} dias tá chorando`, body: `${n}, eu já perdi o cafezinho quente hoje. Não me faça perder sua sequência também.` }),
];
const AWAY = [ // sumiu há alguns dias
  (n, d) => ({ title: `👀 ${d} dias sem aparecer, ${n}?`, body: 'Até o Louro já sabe falar "hello". E ele só fala português! Bora voltar?' }),
  (n) => ({ title: 'Ô criatura, cadê você?', body: `${n}, sua lição tá aí parada mais que fila de banco. Cinco minutinhos resolvem.` }),
];
const DAILY = [
  (n) => ({ title: 'O Professor Juvenal tá esperando 😤', body: `${n}, já são sete da noite e nada de inglês hoje. Uma lição rápida e eu sossego.` }),
  (n) => ({ title: 'Quase não é gol! ⚽', body: `Falta só a lição de hoje, ${n}. Chuta essa bola pra dentro!` }),
  (n) => ({ title: 'Recado do Juvenal 📢', body: `${n}, o grupo da família mandou 47 mensagens e você não abriu o inglês. Prioridades!` }),
  (n) => ({ title: 'Calor de rachar e você sem estudar? 🥵', body: 'Pelo menos o inglês não sua. Cinco minutinhos e tá feito, prometo.' }),
  (n) => ({ title: 'Missões da semana te esperando 🎯', body: `${n}, uma lição agora e a semana perfeita fica mais perto. Eu conto os dias, viu?` }),
];
const pick = (list, seed) => list[seed % list.length];

function message(p) {
  const name = (p.display_name || '').split(' ')[0] || 'criatura';
  // varia por pessoa e por dia, para ninguém receber sempre a mesma fala
  const seed = new Date().getDate() + [...String(p.id || '')].reduce((s, c) => s + c.charCodeAt(0), 0);
  if (p.streak > 1 && p.last_active === yesterdayBR()) return pick(RISK, seed)(name, p.streak);
  const away = p.last_active ? Math.round((Date.parse(todayBR()) - Date.parse(p.last_active)) / 864e5) : 0;
  if (away >= 3) return pick(AWAY, seed)(name, away);
  return pick(DAILY, seed)(name);
}

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return send(res, 401, { error: 'não autorizado' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const pub = process.env.VAPID_PUBLIC_KEY || process.env.VITE_VAPID_PUBLIC_KEY || VAPID_PUBLIC;
  if (!url || !key || !pub || !process.env.VAPID_PRIVATE_KEY) return send(res, 503, { error: 'lembretes não configurados' });
  webpush.setVapidDetails('https://sacou-english.vercel.app', pub, process.env.VAPID_PRIVATE_KEY);
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: subs, error } = await sb.from('push_subs').select('endpoint,user_id,p256dh,auth').limit(5000);
  if (error) return send(res, 500, { error: error.message });
  const ids = [...new Set(subs.map(s => s.user_id))];
  const profiles = new Map();
  for (let i = 0; i < ids.length; i += 200) {
    const { data } = await sb.from('profiles').select('id,display_name,streak,last_active').in('id', ids.slice(i, i + 200));
    for (const p of data || []) profiles.set(p.id, p);
  }
  const today = todayBR();
  let sent = 0, gone = 0;
  await Promise.all(subs.map(async (s) => {
    const p = profiles.get(s.user_id);
    if (!p || p.last_active === today) return; // já estudou hoje
    const m = message(p);
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify({ ...m, url: '/aprender' }), { TTL: 6 * 3600, urgency: 'normal' });
      sent++;
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) { gone++; await sb.from('push_subs').delete().eq('endpoint', s.endpoint); }
      else console.error('push', e.statusCode, e.body);
    }
  }));
  // aviso para os administradores: erros do site nas últimas 24 h (008_erros.sql)
  let alerts = 0;
  const since = new Date(Date.now() - 864e5).toISOString();
  const { count: errs } = await sb.from('app_errors').select('id', { count: 'exact', head: true }).gte('created_at', since);
  if (errs > 0) {
    const { data: admins } = await sb.from('admins').select('user_id');
    const ids = new Set((admins || []).map(a => a.user_id));
    for (const s of subs.filter(x => ids.has(x.user_id))) {
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify({ title: `⚠️ ${errs} ${errs === 1 ? 'erro' : 'erros'} no Sacou English`, body: 'Aconteceram nas últimas 24 horas. Veja os detalhes no painel Admin.', url: '/admin' }), { TTL: 12 * 3600 });
        alerts++;
      } catch (e) { console.error('push admin', e.statusCode); }
    }
  }
  send(res, 200, { sent, removed: gone, alerts });
}
