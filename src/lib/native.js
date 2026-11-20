// App Android (Capacitor). O mesmo código do site vira o app: a versão do app é gerada com
// `npm run build:android` (arquivo .env.android), que liga VITE_NATIVE e aponta VITE_REMOTE
// para o site publicado. No site, NATIVE é false e REMOTE é '' (tudo continua relativo).
export const NATIVE = import.meta.env.VITE_NATIVE === '1';
// Onde ficam as funções de IA (/api) e os áudios (/audio), que não vão dentro do APK.
export const REMOTE = NATIVE ? (import.meta.env.VITE_REMOTE || 'https://sacou-english.vercel.app') : '';
// Endereço para onde o login do Google volta dentro do app (configure em Supabase → Auth → URL Configuration)
export const APP_CALLBACK = 'com.sacouenglish.app://login';
// Endereço do site para links que saem por e-mail (confirmação, nova senha, convite de turma)
export const SITE = NATIVE ? REMOTE : (typeof location !== 'undefined' ? location.origin : '');
