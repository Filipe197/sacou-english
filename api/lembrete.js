// Lembrete diário no celular. A Vercel chama esta rota uma vez por dia (vercel.json → crons),
// às 19h de Brasília, e ela avisa quem ainda não estudou hoje.
//
// Variáveis na Vercel: VITE_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, CRON_SECRET e
// SUPABASE_SERVICE_ROLE_KEY (chave secreta do Supabase: só aqui no servidor).
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';
import { send } from './_lib.js';

const todayBR = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
const yesterdayBR = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(Date.now() - 864e5));

function message(p) {
  const name = (p.display_name || '').split(' ')[0];
  if (p.streak > 1 && p.last_active === yesterdayBR()) {
    return { title: `🔥 ${p.streak} dias seguidos em risco!`, body: `${name ? name + ', uma' : 'Uma'} lição de 3 minutos garante sua sequência de hoje.` };
  }
  const msgs = [
    { title: 'Bora praticar inglês? 💜', body: '5 minutinhos hoje já fazem diferença. Sua próxima lição está esperando.' },
    { title: 'Seu inglês sentiu sua falta 👀', body: 'Que tal uma conversa rápida com o Sam no café?' },
    { title: 'Missões da semana te esperando 🎯', body: 'Uma lição agora e você fica mais perto da semana perfeita.' },
  ];
  return msgs[new Date().getDate() % msgs.length];
}

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return send(res, 401, { error: 'não autorizado' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const pub = process.env.VAPID_PUBLIC_KEY || process.env.VITE_VAPID_PUBLIC_KEY;
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
  send(res, 200, { sent, removed: gone });
}
