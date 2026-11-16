// Lembrete diário no celular (notificações do app instalado).
import { supabase } from './supabase.js';

const KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export function pushSupport() {
  if (typeof window === 'undefined') return 'no';
  if (!KEY) return 'off'; // ainda não configurado no servidor
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone;
    return ios && !standalone ? 'ios-install' : 'no';
  }
  return 'yes';
}

const b64 = (s) => { const p = '='.repeat((4 - (s.length % 4)) % 4); const raw = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from([...raw].map(c => c.charCodeAt(0))); };

async function registration() {
  const reg = await navigator.serviceWorker.getRegistration();
  if (reg) return reg;
  return navigator.serviceWorker.register('/sw.js');
}

export async function pushStatus() {
  if (pushSupport() !== 'yes') return false;
  try { const reg = await navigator.serviceWorker.getRegistration(); return !!(await reg?.pushManager.getSubscription()) && Notification.permission === 'granted'; }
  catch { return false; }
}

export async function enablePush() {
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Você não permitiu as notificações. Dá para liberar nas configurações do navegador.');
  const reg = await registration();
  await navigator.serviceWorker.ready;
  const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(KEY) });
  const j = sub.toJSON();
  await supabase.from('push_subs').delete().eq('endpoint', j.endpoint); // troca de conta no mesmo aparelho
  const { error } = await supabase.from('push_subs').insert({ endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth });
  if (error) throw new Error(/schema cache|does not exist/i.test(error.message) ? 'Os lembretes ainda não foram ativados no banco (falta rodar o 005).' : 'Não consegui ativar agora. Tente de novo.');
}

export async function disablePush() {
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  if (sub) { await supabase.from('push_subs').delete().eq('endpoint', sub.endpoint); await sub.unsubscribe(); }
}
