// Título, descrição e dados estruturados das páginas públicas /ingles.
// Usado pelo site (useSeo em src/pages/Ingles.jsx) e pelo build (scripts/prerender-ingles.mjs),
// que grava um HTML pronto para cada página para o Google ler sem rodar JavaScript.
import PAGINAS from './paginas.json' with { type: 'json' };

export const SITE_URL = 'https://sacou-english.vercel.app';
export const TEMAS = ['Frases do dia a dia', 'Inglês para viagem', 'Erros comuns'];

export const INDICE = {
  path: '/ingles',
  titulo: 'Frases e dicas de inglês grátis, com áudio',
  descricao: 'Como se diz em inglês? Frases do dia a dia, inglês para viagem e os erros que todo brasileiro comete, com pronúncia, áudio e teste rápido. Grátis.',
};

export function seoOf(slug) {
  if (!slug) {
    return {
      ...INDICE,
      ld: {
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: INDICE.titulo, description: INDICE.descricao, url: SITE_URL + INDICE.path,
        hasPart: Object.entries(PAGINAS).map(([s, p]) => ({ '@type': 'WebPage', name: p.titulo, url: `${SITE_URL}/ingles/${s}` })),
      },
    };
  }
  const p = PAGINAS[slug];
  if (!p) return null;
  return {
    path: `/ingles/${slug}`,
    titulo: p.titulo,
    descricao: p.descricao,
    ld: {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [{ '@type': 'Question', name: p.titulo, acceptedAnswer: { '@type': 'Answer', text: `${p.resposta.en} (fala-se ${p.resposta.fala}). ${p.explica}` } }],
    },
  };
}
