import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import contentSkeleton from './scripts/vite-content.mjs';

// No PC (npm run dev), serve as funções de api/ do mesmo jeito que a Vercel faz.
function apiDev() {
  return {
    name: 'sacou-api-dev',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url || '').split('?')[0].replace(/^\/+/, '');
        if (!/^[a-z-]+$/.test(name)) return next();
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.js`);
          let raw = '';
          for await (const chunk of req) raw += chunk;
          req.body = raw ? JSON.parse(raw) : {};
          await mod.default(req, res);
        } catch (e) {
          server.config.logger.error(String(e?.stack || e));
          res.statusCode = 500; res.end(JSON.stringify({ error: 'Erro na função local.' }));
        }
      });
    },
  };
}

// Número da versão publicada: o app compara com /version.json para saber se saiu atualização.
// SACOU_BUILD_ID: o pacote do app Android (scripts/build-app-bundle.mjs) usa o mesmo número do site
const BUILD_ID = process.env.SACOU_BUILD_ID || (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 12) || `local-${Date.now().toString(36)}`;
function versionFile() {
  return {
    name: 'sacou-version',
    generateBundle() { this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ v: BUILD_ID }) }); },
  };
}

export default defineConfig(({ mode }) => {
  // variáveis sem VITE_ (como ANTHROPIC_API_KEY) ficam só no servidor local
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return { plugins: [contentSkeleton(), react(), apiDev(), versionFile()], define: { __BUILD_ID__: JSON.stringify(BUILD_ID) } };
});
