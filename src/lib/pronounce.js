// Pronúncia palavra por palavra: compara a frase-alvo com o que o reconhecimento
// de voz entendeu e dá dicas para os sons que mais confundem quem fala português.
//
// O navegador não devolve uma nota por fonema; ele devolve o texto que entendeu.
// Uma palavra que ele não reconheceu é o melhor sinal de que o som saiu diferente.

const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
  "that's": 'that is', "what's": 'what is', "where's": 'where is', "isn't": 'is not', "aren't": 'are not', "don't": 'do not', "doesn't": 'does not',
  "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "i'll": 'i will', "let's": 'let us',
  // o reconhecimento às vezes devolve sem apóstrofo
  im: 'i am', youre: 'you are', theyre: 'they are', dont: 'do not', doesnt: 'does not', didnt: 'did not', cant: 'cannot',
  isnt: 'is not', arent: 'are not', wont: 'will not', thats: 'that is', whats: 'what is', lets: 'let us',
  // "its" e "it's" soam igual: os dois viram "it is" (na frase-alvo e no que foi ouvido)
  its: 'it is' };
// Números de 0 a 100 escritos por extenso viram algarismos (o reconhecimento devolve "7" ou "seven")
const UNITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const NUM = { hundred: '100', 'onehundred': '100' };
UNITS.forEach((w, i) => { NUM[w] = String(i); });
TENS.forEach((w, i) => { if (!w) return; NUM[w] = String(i * 10); for (let u = 1; u < 10; u++) NUM[w + UNITS[u]] = String(i * 10 + u); }); // "twenty-one" → twentyone

// Palavras que soam igual: o reconhecimento escolhe a grafia pelo contexto, então todas valem
const SAME = [['two', 'to', 'too', '2'], ['four', 'for', '4'], ['eight', 'ate', '8'], ['one', 'won', '1'], ['right', 'write'], ['hear', 'here'],
  ['there', 'their', "they're", 'theyre'], ['by', 'buy', 'bye'], ['know', 'no'], ['knew', 'new'], ['see', 'sea'], ['meet', 'meat'], ['week', 'weak'],
  ['hi', 'high'], ['i', 'eye'], ['son', 'sun'], ['wear', 'where'], ['your', "you're", 'youre'], ['red', 'read'], ['hour', 'our'],
  ['whether', 'weather'], ['wait', 'weight'], ['tail', 'tale'], ['flower', 'flour'], ['peace', 'piece'], ['plane', 'plain'], ['sale', 'sail'],
  ['ok', 'okay'], ['mr', 'mister'], ['mrs', 'missus'], ['dr', 'doctor'], ['grey', 'gray'], ['mum', 'mom'], ['programme', 'program'], ['practise', 'practice']];
const CANON = {};
for (const g of SAME) for (const w of g) CANON[w.replace(/'/g, '')] = CANON[w] = g[0];

// Inglês britânico (usado no curso) × americano (o reconhecimento devolve "color", "neighbor"...)
const usSpelling = (w) => w
  .replace(/^(colo|favo|neighbo|hono|flavo|behavio|humo|labo|harbo|rumo|endeavo)ur/, '$1r')
  .replace(/^(cent|theat|met|lit|fib)re(s?)$/, '$1er$2')
  .replace(/^(realis|organis|recognis|apologis|memoris|favoris|categoris)(e|ed|es|ing)$/, (m, a, b) => a.replace(/s$/, 'z') + b)
  .replace(/^(travel|cancel|model|label)l(ed|ing|er)$/, '$1$2');

const clean = (w) => w.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
// cada palavra vira uma ou mais "chaves" comparáveis (I'm = i am; 3 = three; to = two; colour = color)
const keys = (w) => {
  const c = clean(w);
  if (CONTR[c]) return CONTR[c].split(' ');
  const n = NUM[c.replace(/'/g, '')] || c;
  const k = usSpelling(n);
  return [CANON[k] || CANON[NUM[k] || ''] || k].filter(Boolean);
};
// iguais, ou quase (uma letra de diferença em palavras de 4+ letras: plural, grafia)
function near(a, b) {
  if (a === b) return true;
  if (Math.min(a.length, b.length) < 4 || Math.abs(a.length - b.length) > 1 || /d/.test(a + b)) return false;
  let i = 0, j = 0, diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++diff > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return diff + (a.length - i) + (b.length - j) <= 1;
}

// Alinha alvo e ouvido (maior subsequência comum) e marca cada palavra do alvo.
function alignOne(target, heard) {
  const tw = target.split(/\s+/).filter(Boolean);
  const tk = tw.flatMap((w, i) => keys(w).map(k => ({ k, i })));
  const hk = heard.split(/\s+/).flatMap(keys);
  const n = tk.length, m = hk.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    L[i][j] = near(tk[i].k, hk[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const hit = new Set();
  for (let i = 0, j = 0; i < n && j < m;) {
    if (near(tk[i].k, hk[j])) { hit.add(i); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
  }
  const okWord = tw.map((_, wi) => tk.every((t, ti) => t.i !== wi || hit.has(ti)));
  const words = tw.map((w, i) => ({ w, ok: okWord[i] || !clean(w) }));
  const scored = words.filter(x => clean(x.w));
  return { words, score: scored.length ? scored.filter(x => x.ok).length / scored.length : 0 };
}

// Usa a melhor entre as alternativas que o reconhecimento devolveu.
export function alignSpeech(target, alternatives) {
  let best = null;
  for (const h of alternatives) {
    const r = alignOne(target, h || '');
    if (!best || r.score > best.score) best = { ...r, heard: h };
  }
  return best || { words: alignOne(target, '').words, score: 0, heard: '' };
}

// Dicas para os sons difíceis para brasileiros (até 2 por palavra).
const RULES = [
  [w => /th/.test(w), 'TH: ponha a ponta da língua entre os dentes e solte o ar. Não é “f”, “d” nem “t”.'],
  [w => /^h/.test(w) && !/^(hour|honest|honor)/.test(w), 'H no começo é só um sopro, como o “r” de “rato” bem suave: house = “ráus”.'],
  [w => /^s[ptkcmnlw]/.test(w), 'Não coloque “i” antes do S: é “school”, não “iscool”. Comece direto no “s”.'],
  [w => /ed$/.test(w) && w.length > 3, '-ED: depois de t ou d soa “id” (wanted). Nos outros casos, quase não tem vogal: worked = “workt”.'],
  [w => /^r|[^aeiou]r/.test(w), 'R inglês: a língua não encosta no céu da boca; ela fica no meio e um pouco para trás.'],
  [w => /^w|wh/.test(w), 'W soa como um “u” rápido: water = “uó-ter”, what = “uót”.'],
  [w => /l$/.test(w), 'L no final: encoste a língua atrás dos dentes de cima. Não vira “u” (well, não “uéu”).'],
  [w => /m$/.test(w), 'M no final: feche os lábios no fim da palavra. Não vira um som nasal como “ã”.'],
  [w => /ee|ea|ie/.test(w), 'EE/EA: é um “i” longo, como se estivesse sorrindo: sheep, eat.'],
  [w => /^(it|is|in|this|sit|big|six|him|his|live|give|with|fish|ship|milk)$/.test(w), 'I curto: um som entre “i” e “ê”, bem rápido: it, sit, big.'],
  [w => /[bdgkpt]$/.test(w), 'Não acrescente “i” no final: é “big”, não “bigui”; “book”, não “buqui”.'],
  [w => /(^|[^aeiou])v/.test(w), 'V: encoste os dentes de cima no lábio de baixo, com vibração. Não troque por “b” nem “u”.'],
  [w => /z/.test(w), 'Z vibra, como um zumbido: Brazil = “bra-ZIL”. Não troque por “s”.'],
  [w => /tion$|sion$/.test(w), '-TION soa “shan”, rápido: station = “stêi-shan”.'],
];

export function tipsFor(word) {
  const w = clean(word);
  const out = RULES.filter(([test]) => test(w)).map(([, tip]) => tip).slice(0, 2);
  return out.length ? out : ['Ouça devagar, repita sílaba por sílaba e grave de novo. Exagerar um pouco ajuda no começo.'];
}

export const sameWord = (a, b) => { const x = keys(a), y = keys(b); return x.length === y.length && x.every((k, i) => near(k, y[i])); };
