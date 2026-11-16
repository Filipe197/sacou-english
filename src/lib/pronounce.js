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
  isnt: 'is not', arent: 'are not', wont: 'will not', thats: 'that is', whats: 'what is', lets: 'let us' };
const NUM = { one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', twenty: '20' };

const clean = (w) => w.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
// cada palavra vira uma ou mais "chaves" comparáveis (I'm = i am; 3 = three)
const keys = (w) => { const c = clean(w); return (CONTR[c] || NUM[c] || c).split(' ').filter(Boolean); };

// Alinha alvo e ouvido (maior subsequência comum) e marca cada palavra do alvo.
function alignOne(target, heard) {
  const tw = target.split(/\s+/).filter(Boolean);
  const tk = tw.flatMap((w, i) => keys(w).map(k => ({ k, i })));
  const hk = heard.split(/\s+/).flatMap(keys);
  const n = tk.length, m = hk.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    L[i][j] = tk[i].k === hk[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const hit = new Set();
  for (let i = 0, j = 0; i < n && j < m;) {
    if (tk[i].k === hk[j]) { hit.add(i); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
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

export const sameWord = (a, b) => keys(a).join(' ') === keys(b).join(' ');
