// Dicas de palavra (como no Duolingo): toque numa palavra para ver a tradução.
// Fontes: palavras de cada unidade, pares dos exercícios de ligar e um dicionário básico.
import DICT from '../content/dictionary.json';
import { LESSONS, UNITS, isContentReady } from './content.js';

const strip = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const clean = (s) => strip(String(s).toLowerCase().replace(/\(.*?\)/g, '').replace(/[?!.,"“”]/g, '').replace(/’/g, "'").replace(/\s+/g, ' ').trim());

const EN = new Map(); // inglês -> português
const PT = new Map(); // português -> inglês

function addEN(en, pt) {
  for (const e of String(en).split(' / ')) { const k = clean(e); if (k && !EN.has(k)) EN.set(k, pt); }
}
function addPT(pt, en) {
  const enMain = String(en).split(' / ')[0].replace(/\?$/, '');
  for (const raw of String(pt).split(/\s*\/\s*|,\s*/)) {
    const base = clean(raw);
    if (!base) continue;
    const variants = [base];
    if (/\(a\)/.test(raw)) variants.push(base.replace(/o$/, 'a'), base.replace(/r$/, 'ra')); // professor(a) -> professora
    for (const v of variants) if (!PT.has(v)) PT.set(v, enMain);
  }
}

for (const u of UNITS) for (const [en, pt] of u.words || []) { addEN(en, pt); addPT(pt, en); }
for (const [en, pt] of Object.entries(DICT)) { addEN(en, pt); addPT(pt.split(' / ')[0], en); }
// Pares dos exercícios de ligar e palavras novas dependem dos exercícios, que chegam
// depois da abertura (loadContent): são montados na primeira consulta com tudo carregado.
let built = false;
function build() {
  if (built || !isContentReady()) return;
  built = true;
  for (const u of UNITS) for (const l of u.lessons) for (const it of l.items) if (it.type === 'match') for (const [en, pt] of it.pairs) {
    if (!/^\d+$/.test(pt)) { addEN(en, pt); addPT(pt, en); }
  }
  buildNewWords();
}

function lookupEN(w) {
  build();
  const k = clean(w);
  if (EN.has(k)) return EN.get(k);
  const cands = [k.replace(/'s$/, ''), k.replace(/s$/, ''), k.replace(/es$/, ''), k.replace(/ies$/, 'y'), k.replace(/ed$/, ''), k.replace(/ed$/, 'e'),
    k.replace(/ing$/, ''), k.replace(/ing$/, 'e'), k.replace(/([b-df-hj-np-tv-z])\1ing$/, '$1')];
  for (const c of cands) if (EN.has(c)) return EN.get(c);
  return null;
}
const lookupPT = (w) => { build(); return PT.get(clean(w)) || null; };
// Tradução sugerida para o caderno (palavra ou expressão inteira)
export const suggestPT = (en) => lookupEN(String(en || '').replace(/[?!.]+$/, '')) || null;
export const suggestEN = (pt) => lookupPT(pt);

// Quebra o texto em pedaços; junta expressões de até 3 palavras quando existem no dicionário.
export function hintPieces(text, lang = 'en') {
  const parts = String(text).split(/(\s+|[.,!?;:"“”()]+)/).filter(p => p !== '');
  const isWord = (p) => /[A-Za-zÀ-ÿ0-9']/.test(p);
  const map = lang === 'en' ? EN : PT;
  const out = [];
  for (let i = 0; i < parts.length;) {
    if (!isWord(parts[i])) { out.push({ text: parts[i] }); i++; continue; }
    let done = false;
    for (const n of [3, 2]) { // expressões: "good morning", "next to", "have breakfast"
      const idx = []; let j = i;
      while (idx.length < n && j < parts.length) { if (isWord(parts[j])) idx.push(j); else if (!/^\s+$/.test(parts[j])) break; j++; }
      if (idx.length < n) continue;
      const phrase = parts.slice(i, idx[n - 1] + 1).join('');
      if (map.has(clean(phrase))) { out.push({ text: phrase, hint: map.get(clean(phrase)), key: clean(phrase) }); i = idx[n - 1] + 1; done = true; break; }
    }
    if (done) continue;
    const hint = lang === 'en' ? lookupEN(parts[i]) : lookupPT(parts[i]);
    out.push({ text: parts[i], hint, key: clean(parts[i]) });
    i++;
  }
  return out;
}

// Palavras novas: a primeira vez que uma palavra das listas das unidades aparece na trilha.
function itemEnglish(it, lesson) {
  const t = [];
  if (it.type === 'story' && lesson.story) for (const ln of lesson.story.lines) if (ln.en) t.push(ln.gap ? ln.en.replace('___', ln.gap.answer) : ln.en);
  if (it.en) t.push(it.en.replace('___', it.type === 'choice' ? it.answer : ''));
  if (it.type === 'build' || it.type === 'type' || it.type === 'dialogue') t.push(it.answer);
  if (it.lines) for (const [, x] of it.lines) if (x !== '___') t.push(x);
  if (it.pairs) for (const [en] of it.pairs) t.push(en);
  return ' ' + clean(t.join(' | ')).replace(/[|]/g, ' ') + ' ';
}
const NEW_WORDS = new Map(); // itemId -> [{en, pt}]
function buildNewWords() {
  const seen = new Set();
  for (const l of LESSONS) {
    const vocab = (l.unit.words || []).flatMap(([en, pt]) => String(en).split(' / ').map(e => ({ en: e.replace(/\?$/, ''), pt, key: clean(e) })));
    for (const it of l.items) {
      const txt = itemEnglish(it, l);
      const fresh = vocab.filter(v => !seen.has(v.key) && txt.includes(' ' + v.key + ' '));
      fresh.forEach(v => seen.add(v.key));
      if (fresh.length) NEW_WORDS.set(it.id, fresh.map(({ en, pt, key }) => ({ en, pt, key })));
    }
  }
}
export const getNewWords = (itemId) => { build(); return NEW_WORDS.get(itemId) || []; };
// em PT, destaca a palavra se a tradução dela é uma palavra nova
export const ptKeyToEn = (key) => { build(); const en = PT.get(key); return en ? clean(en) : null; };
