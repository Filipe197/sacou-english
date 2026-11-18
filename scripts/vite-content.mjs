// Plugin do Vite: "esqueleto" das unidades para a primeira abertura do site.
// Importar "../content/a1/unit-01.json?esqueleto" traz a unidade inteira MENOS os
// exercícios e as histórias das lições (cerca de 80% do peso). Os exercícios
// completos chegam depois, em arquivos separados (src/lib/content.js → loadContent).
import fs from 'node:fs';
import path from 'node:path';

const PREFIX = '\0esqueleto:';

export function skeleton(unit) {
  return {
    ...unit,
    lessons: unit.lessons.map(l => ({ id: l.id, title: l.title, size: l.items.length, hasStory: !!l.story, items: null, story: null })),
  };
}

export default function contentSkeleton() {
  return {
    name: 'sacou-content-skeleton',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!source.endsWith('?esqueleto') || !importer) return null;
      const file = path.resolve(path.dirname(importer.replace(/^\0/, '')), source.slice(0, -'?esqueleto'.length));
      // o ".js" no fim evita que o Vite trate o resultado como JSON
      return PREFIX + file + '.js';
    },
    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const file = id.slice(PREFIX.length, -3);
      this.addWatchFile(file);
      return `export default ${JSON.stringify(skeleton(JSON.parse(fs.readFileSync(file, 'utf8'))))};`;
    },
  };
}
