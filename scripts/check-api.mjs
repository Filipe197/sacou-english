// Carrega cada função do servidor (api/*.js) antes do deploy. Se alguma não abrir
// (erro de sintaxe, import quebrado), o build falha em vez de publicar uma rota que
// só daria FUNCTION_INVOCATION_FAILED no site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'api');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('_'));
let bad = 0;
for (const f of files) {
  try {
    const m = await import(pathToFileURL(path.join(dir, f)).href);
    if (typeof m.default !== 'function') throw new Error('não exporta uma função padrão (export default)');
  } catch (e) {
    bad++;
    console.error(`✗ api/${f}: ${e.message}`);
  }
}
if (bad) { console.error(`\n${bad} função(ões) do servidor com erro. Corrija antes de publicar.`); process.exit(1); }
console.log(`✓ Servidor: ${files.length} funções carregam sem erro.`);
