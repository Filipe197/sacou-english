// Cobertura do vocabulário: quantas palavras da lista oficial de cada nível (CEFR-J Wordlist)
// o conteúdo do curso já usa em inglês. Roda no build (só informa, não bloqueia) e grava a lista
// do que falta, separada por classe de palavra, em docs/cobertura-vocabulario.md — é o mapa
// para escrever as unidades novas (docs/plano-expansao-a1.md).
//
// Uso: node scripts/coverage-cefr.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsvLine, tokens, IRREG, OCTANOVE_CSV } from './cefr.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

// lista oficial: { A1: [{ w, pos }], ... } (entradas com variantes "a/b" viram uma só, com as formas)
// A1 a B2 da CEFR-J; C1 da Octanove Vocabulary Profile C1/C2
const OFFICIAL = Object.fromEntries(LEVELS.map(l => [l, []]));
for (const file of ['content/sources/cefrj-vocabulary-profile-1.5.csv', OCTANOVE_CSV]) {
  const csv = fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/).filter(Boolean);
  const head = parseCsvLine(csv[0]);
  const iW = head.indexOf('headword'), iP = head.indexOf('pos'), iL = head.indexOf('CEFR');
  for (const line of csv.slice(1)) {
    const c = parseCsvLine(line);
    if (!OFFICIAL[c[iL]]) continue;
    const forms = c[iW].split('/').map(s => s.trim().toLowerCase().replace(/\.$/, '')).filter(Boolean);
    if (forms.length) OFFICIAL[c[iL]].push({ w: c[iW], pos: c[iP], forms });
  }
}

// textos em inglês de um nível
function englishOf(unit) {
  const out = [];
  const add = (s) => { if (typeof s === 'string') out.push(s); };
  for (const w of unit.words || []) add(Array.isArray(w) ? w[0] : w?.en);
  for (const p of unit.guide?.points || []) add(p.en);
  for (const l of unit.lessons || []) {
    for (const it of l.items || []) {
      add(it.en); add(it.display); (it.accept || []).forEach(add); (it.extra || []).forEach(add);
      if (['choice', 'dialogue', 'build', 'type', 'dictation', 'speak'].includes(it.type)) { add(it.answer); (it.options || []).forEach(add); }
      (it.pairs || []).forEach(p => add(p[0]));
      (it.lines || []).forEach(x => add(Array.isArray(x) ? x[1] : x?.en));
    }
    for (const x of l.story?.lines || []) { add(x.en); if (x.gap) { add(x.gap.answer); (x.gap.options || []).forEach(add); } }
  }
  return out;
}
const DOUBLE = /([b-df-hj-np-tv-z])$/;
function variants(f) {
  const v = [f, f + 's', f + 'es', f + 'ed', f + 'd', f + 'ing', f + 'er', f + 'est', f.replace(/e$/, '') + 'ing',
    f.replace(/y$/, 'ies'), f.replace(/y$/, 'ied'), f.replace(/y$/, 'ier'), f.replace(/y$/, 'iest')];
  if (DOUBLE.test(f)) { const d = f + f.slice(-1); v.push(d + 'ed', d + 'ing', d + 'er', d + 'est'); }
  return v;
}
const IRREG_BY_BASE = {};
for (const [form, base] of Object.entries(IRREG)) (IRREG_BY_BASE[base] ||= []).push(form);

const report = [];
const lines = ['# Cobertura do vocabulário (CEFR-J)', '', `Gerado por scripts/coverage-cefr.mjs em ${new Date().toISOString().slice(0, 10)}. Palavras da lista oficial de cada nível que o conteúdo daquele nível ainda não usa em inglês.`, ''];
for (const lv of LEVELS) {
  const dir = path.join(root, 'src/content', lv.toLowerCase());
  if (!fs.existsSync(dir)) continue;
  const text = fs.readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => englishOf(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))));
  const toks = new Set(text.flatMap(t => tokens(t)));
  const joined = ' ' + text.map(t => tokens(t).join(' ')).join(' | ') + ' ';
  const has = (e) => e.forms.some(f => (f.includes(' ') ? joined.includes(' ' + f + ' ') : variants(f).some(x => toks.has(x)) || (IRREG_BY_BASE[f] || []).some(x => toks.has(x))));
  const missing = OFFICIAL[lv].filter(e => !has(e));
  const n = OFFICIAL[lv].length, got = n - missing.length;
  report.push(`${lv} ${got}/${n} (${Math.round((got / n) * 100)}%)`);
  lines.push(`## ${lv}: ${got} de ${n} palavras (${Math.round((got / n) * 100)}%)`, '');
  const byPos = {};
  for (const e of missing) (byPos[e.pos] ||= []).push(e.w);
  for (const [pos, ws] of Object.entries(byPos).sort((a, b) => b[1].length - a[1].length)) lines.push(`- **${pos}** (${ws.length}): ${ws.join(', ')}`);
  lines.push('');
}
// ---------- por frequência: das palavras mais usadas no inglês real, quantas o curso já ensina ----------
// content/sources/frequencia-cefrj.json vem de scripts/gen-frequencia.py (wordfreq). Conta o curso
// acumulado: "até o A2" = tudo do A1 e do A2.
const FREQ_FILE = path.join(root, 'content/sources/frequencia-cefrj.json');
const freqLines = [];
let freqConsole = '';
if (fs.existsSync(FREQ_FILE)) {
  const FREQ = JSON.parse(fs.readFileSync(FREQ_FILE, 'utf8'))
    .filter(e => !/^'|^(mr|mrs|ms|dr)\b/i.test(e.w)) // 's e abreviações: o separador de palavras não as vê como palavras
    .map(e => ({ ...e, forms: e.w.split('/').map(s => s.trim().toLowerCase().replace(/\.$/, '')).filter(Boolean) }));
  const TIERS = [500, 1000, 2000, 3000];
  let toks = new Set(); let joined = ' ';
  const rows = [];
  const faltam = {};
  for (const lv of LEVELS) {
    const dir = path.join(root, 'src/content', lv.toLowerCase());
    if (!fs.existsSync(dir)) continue;
    const text = fs.readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => englishOf(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))));
    toks = new Set([...toks, ...text.flatMap(t => tokens(t))]);
    joined += text.map(t => tokens(t).join(' ')).join(' | ') + ' ';
    const has = (e) => e.forms.some(f => (f.includes(' ') ? joined.includes(' ' + f + ' ') : variants(f).some(x => toks.has(x)) || (IRREG_BY_BASE[f] || []).some(x => toks.has(x))));
    rows.push([lv, ...TIERS.map(n => { const top = FREQ.slice(0, n); return Math.round((top.filter(has).length / n) * 100); })]);
    faltam[lv] = FREQ.slice(0, 2000).filter(e => !has(e));
  }
  freqLines.push('## Por frequência de uso', '',
    'Das palavras da lista oficial, ordenadas pelo quanto aparecem no inglês real (wordfreq), quantas o curso já ensina, somando os níveis até ali. É a medida que mais importa: as palavras mais usadas primeiro.', '',
    `| Curso até | ${TIERS.map(n => `${n} mais usadas`).join(' | ')} |`, `|---|${TIERS.map(() => '---').join('|')}|`,
    ...rows.map(([lv, ...p]) => `| ${lv} | ${p.map(x => x + '%').join(' | ')} |`), '');
  for (const lv of ['A2', 'B1', 'B2']) {
    if (!faltam[lv]) continue;
    const ate = faltam[lv].filter(e => LEVELS.indexOf(e.lv) <= LEVELS.indexOf(lv));
    freqLines.push(`### Mais usadas que o curso ainda não ensina até o ${lv} (do nível ${lv} ou abaixo)`, '',
      ate.slice(0, 120).map(e => `${e.w} (${e.lv})`).join(', ') || 'nenhuma', '');
  }
  const last = rows[rows.length - 1];
  freqConsole = ` · por frequência, o curso todo cobre ${TIERS.map((n, i) => `${last[i + 1]}% das ${n}`).join(', ')} palavras mais usadas`;
}
lines.splice(4, 0, ...freqLines);

fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/cobertura-vocabulario.md'), lines.join('\n'));
console.log(`✓ Cobertura do vocabulário oficial: ${report.join(' · ')}${freqConsole} (lista do que falta em docs/cobertura-vocabulario.md)`);
