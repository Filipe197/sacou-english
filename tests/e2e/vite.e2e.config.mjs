// Sobe o site com login e banco falsos (dados de demonstração) para os testes de tela.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import contentSkeleton from '../../scripts/vite-content.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
process.env.AI_MOCK = '1';

export default {
  root,
  logLevel: 'error',
  server: { port: 5310, strictPort: true, fs: { allow: [root] } },
  resolve: { dedupe: ['react', 'react-dom'] },
  define: { 'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify('off') }, // sem anti-robô nos testes
  esbuild: { jsx: 'automatic' },
  plugins: [contentSkeleton(), {
    name: 'e2e-mocks', enforce: 'pre',
    resolveId(src, importer) {
      if (!importer || importer.includes(`${path.sep}e2e${path.sep}`) || importer.includes('/e2e/')) return null;
      if (/\/auth\.jsx$/.test(src)) return path.join(here, 'mock-auth.jsx');
      if (/\/supabase\.js$/.test(src)) return path.join(here, 'mock-supabase.js');
      return null;
    },
  }, {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url || '').split('?')[0].replace(/^\/+/, '');
        if (!/^[a-z-]+$/.test(name)) return next();
        const mod = await server.ssrLoadModule(`/api/${name}.js`);
        let raw = ''; for await (const c of req) raw += c;
        req.body = raw ? JSON.parse(raw) : {};
        await mod.default(req, res);
      });
    },
  }],
};
