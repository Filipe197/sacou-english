// Service worker do Sacou English: deixa o app abrir rápido e funcionar com internet fraca.
// - Páginas: tenta a rede primeiro; sem rede, usa a última versão salva.
// - Arquivos do site (JS, CSS, sons, ícones): usa o que está salvo e atualiza em segundo plano.
// - Supabase (login e progresso) NUNCA passa pelo cache.
const CACHE = 'sacou-v2';
const SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/favicon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // Supabase e fontes externas: direto na rede

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('/', copy)); return res; })
        .catch(() => caches.match('/'))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

// Lembrete diário (enviado pelo servidor em api/lembrete.js)
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { title: 'Sacou English', body: e.data?.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Sacou English', {
    body: d.body || 'Hora de praticar inglês!', icon: '/icon-192.png', badge: '/icon-192.png',
    tag: 'lembrete', renotify: true, data: { url: d.url || '/aprender' },
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/aprender';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if ('focus' in c) { c.navigate(url); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
