// Depois do "vite build": grava um HTML pronto para cada página pública /ingles
// (dist/ingles/<slug>/index.html), com título, descrição, dados estruturados e o texto da página
// dentro de #root, para o Google ler sem rodar JavaScript. Quando o site carrega, o React
// desenha a página por cima (mesmo conteúdo, agora com áudio e teste).
// Também grava dist/sitemap.xml e dist/robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PAGINAS from '../src/seo/paginas.json' with { type: 'json' };
import { SITE_URL, TEMAS, seoOf } from '../src/seo/seo.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, process.argv[2] || 'dist');
const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pagina(s, corpo) {
  const head = [
    `<title>${esc(s.titulo)} | Sacou English</title>`,
    `<meta name="description" content="${esc(s.descricao)}">`,
    `<link rel="canonical" href="${SITE_URL}${s.path}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="Sacou English">`,
    `<meta property="og:title" content="${esc(s.titulo)}">`,
    `<meta property="og:description" content="${esc(s.descricao)}">`,
    `<meta property="og:url" content="${SITE_URL}${s.path}">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<script type="application/ld+json">${JSON.stringify(s.ld).replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
  let html = base
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${corpo}</div>`);
  if (!html.includes(corpo)) throw new Error('não achei <div id="root"></div> no index.html');
  return html;
}

const mini = (slug) => {
  const p = PAGINAS[slug];
  return `<a class="ig-mini" href="/ingles/${slug}"><b>${esc(p.resposta.pt)}</b><i>${esc(p.resposta.en)}</i><span>${esc(p.resposta.fala)}</span></a>`;
};

function corpoFrase(slug) {
  const p = PAGINAS[slug];
  const r = p.resposta;
  return `<div class="ig"><main>
<a class="ig-voltar" href="/ingles">← Todas as frases</a>
<span class="ig-tema">${esc(p.tema)}</span>
<h1>${esc(p.titulo)}</h1>
<div class="ig-card">
<p class="ig-row"><span class="ig-lab">Português</span> <b class="ig-pt">${esc(r.pt)}</b></p>
<p class="ig-row"><span class="ig-lab">Inglês</span> <b class="ig-en">${esc(r.en)}</b></p>
<p class="ig-row"><span class="ig-lab">Como se fala</span> <b class="ig-fala">${esc(r.fala)}</b></p>
</div>
<p class="ig-explica">${esc(p.explica)}</p>
<section class="ig-box"><h2>Exemplos</h2><ul class="ig-ex">
${p.exemplos.map(e => `<li><div><b>${esc(e.en)}</b> <span>${esc(e.pt)}</span></div></li>`).join('\n')}
</ul></section>
${p.dica ? `<section class="ig-box ig-dica"><h2>${esc(p.dica.titulo)}</h2><p>${esc(p.dica.texto)}</p>
<p><b>${esc(p.dica.en)}</b> (${esc(p.dica.pt)}). Como se fala: ${esc(p.dica.fala)}</p></section>` : ''}
<section class="ig-box"><h2>O erro que todo brasileiro comete</h2>
${p.erros.map(e => `<div class="ig-erro"><p>Errado: ${esc(e.errado)}</p><p>Certo: <b>${esc(e.certo)}</b> (${esc(e.pt)})</p><p>${esc(e.porque)}</p></div>`).join('\n')}
</section>
<section class="ig-cta"><h2>Aprenda inglês grátis no Sacou English</h2>
<p>Lições curtas, áudio em tudo, pronúncia no microfone e explicação em português.</p>
<a class="btn btn-lime btn-lg" href="/criar-conta">Estude isso no Sacou →</a></section>
<section class="ig-rel"><h2>Veja também</h2><div class="ig-mini-grid">${p.relacionadas.filter(x => PAGINAS[x]).map(mini).join('')}</div></section>
</main></div>`;
}

function corpoIndice() {
  return `<div class="ig"><main>
<h1>Como se diz em inglês?</h1>
<p class="ig-explica">Frases do dia a dia, inglês para viagem e os erros que todo brasileiro comete, com pronúncia, áudio e teste rápido.</p>
${TEMAS.map(t => {
    const ss = Object.keys(PAGINAS).filter(s => PAGINAS[s].tema === t);
    return ss.length ? `<section class="ig-grupo"><h2>${esc(t)}</h2><div class="ig-mini-grid">${ss.map(mini).join('')}</div></section>` : '';
  }).join('\n')}
</main></div>`;
}

const grava = (rel, html) => {
  const f = path.join(dist, rel, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
};

grava('ingles', pagina(seoOf(null), corpoIndice()));
for (const slug of Object.keys(PAGINAS)) grava(`ingles/${slug}`, pagina(seoOf(slug), corpoFrase(slug)));

const hoje = new Date().toISOString().slice(0, 10);
const urls = ['/', '/ingles', ...Object.keys(PAGINAS).map(s => `/ingles/${s}`), '/sobre', '/baixar', '/apoie'];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`);
console.log(`páginas prontas para o Google: ${Object.keys(PAGINAS).length + 1} + sitemap.xml + robots.txt`);
