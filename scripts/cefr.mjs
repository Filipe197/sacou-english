// Vocabulário CEFR-J: leitura da lista e checagem de palavras. Usado pelo validador
// do conteúdo (build) e pelo treino com IA (api/treino.js), que confere as frases geradas.

// Nomes próprios, países, nacionalidades e interjeições (não constam em listas de vocabulário)
export const NAMES = new Set(`ana pedro maria john lucas sofia tom emma carlos julia mike sarah
brazil brazilian england english london portugal portuguese spain spanish
japan japanese usa american canada canadian mexico mexican rio paris italy italian
china chinese france french germany german reais
max sarah oh wow
argentina chile peru europe lisbon salvador bahia paulo rita ben laura nina leo marcos bruno clara paula
new york tokyo sydney ha edison`
  .split(/\s+/).filter(Boolean));

// ---------- CEFR-J ----------
export function parseCsvLine(line) {
  const out = []; let cur = ''; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
// ---------- palavras ----------
export const CONTRACTIONS = {
  "i'm": ['i', 'am'], "you're": ['you', 'are'], "we're": ['we', 'are'], "they're": ['they', 'are'],
  "he's": ['he', 'is'], "she's": ['she', 'is'], "it's": ['it', 'is'], "what's": ['what', 'is'],
  "where's": ['where', 'is'], "who's": ['who', 'is'], "that's": ['that', 'is'], "name's": ['name', 'is'],
  "isn't": ['is', 'not'], "aren't": ['are', 'not'], "don't": ['do', 'not'], "doesn't": ['does', 'not'],
  "can't": ['can', 'not'], cannot: ['can', 'not'], "i'd": ['i', 'would'], "you'd": ['you', 'would'],
  "didn't": ['did', 'not'], "there's": ['there', 'is'], "who's": ['who', 'is'], "here's": ['here', 'is'], "wasn't": ['was', 'not'], "weren't": ['were', 'not'], "won't": ['will', 'not'],
  "i'll": ['i', 'will'], "she'll": ['she', 'will'], "he'll": ['he', 'will'], "they'll": ['they', 'will'], "you'll": ['you', 'will'], "we'll": ['we', 'will'], "it'll": ['it', 'will'], "couldn't": ['could', 'not'],
  "haven't": ['have', 'not'], "hasn't": ['has', 'not'], "shouldn't": ['should', 'not'], "mustn't": ['must', 'not'], "i've": ['i', 'have'], "let's": ['let', 'us'],
  "we've": ['we', 'have'], "you've": ['you', 'have'], "they've": ['they', 'have'], "he'd": ['he', 'would'], "she'd": ['she', 'would'],
  "we'd": ['we', 'would'], "they'd": ['they', 'would'], "it'd": ['it', 'would'], "wouldn't": ['would', 'not'], "he's": ['he', 'is'],
  // B2: past perfect e modais com have
  "hadn't": ['had', 'not'], "would've": ['would', 'have'], "could've": ['could', 'have'], "should've": ['should', 'have'],
  "must've": ['must', 'have'], "might've": ['might', 'have'],
};
export const IRREG = { is: 'be', am: 'be', are: 'be', was: 'be', were: 'be', has: 'have', does: 'do', did: 'do',
  went: 'go', ate: 'eat', bought: 'buy', got: 'get', made: 'make', came: 'come', took: 'take', gave: 'give',
  wrote: 'write', met: 'meet', found: 'find', told: 'tell', said: 'say', saw: 'see', had: 'have', began: 'begin',
  thought: 'think', sat: 'sit', ran: 'run', swam: 'swim', drank: 'drink', slept: 'sleep', spoke: 'speak', sang: 'sing',
  felt: 'feel', knew: 'know', lost: 'lose', paid: 'pay', read: 'read', sent: 'send', spent: 'spend', stood: 'stand',
  taught: 'teach', understood: 'understand', woke: 'wake', wore: 'wear', won: 'win', drove: 'drive', flew: 'fly',
  // particípios e passados irregulares (B1)
  been: 'be', seen: 'see', eaten: 'eat', known: 'know', gone: 'go', done: 'do', driven: 'drive', ridden: 'ride', rode: 'ride',
  written: 'write', taken: 'take', given: 'give', spoken: 'speak', broken: 'break', broke: 'break', fallen: 'fall', fell: 'fall',
  forgotten: 'forget', forgot: 'forget', chosen: 'choose', chose: 'choose', stolen: 'steal', stole: 'steal', woken: 'wake',
  worn: 'wear', flown: 'fly', grown: 'grow', grew: 'grow', thrown: 'throw', threw: 'throw', shown: 'show', hidden: 'hide', hid: 'hide',
  begun: 'begin', drunk: 'drink', swum: 'swim', sung: 'sing', rung: 'ring', rang: 'ring', left: 'leave', heard: 'hear', kept: 'keep',
  built: 'build', caught: 'catch', brought: 'bring', held: 'hold', meant: 'mean', became: 'become', become: 'become', sold: 'sell',
  drew: 'draw', drawn: 'draw', lent: 'lend', fed: 'feed', fought: 'fight', hung: 'hang', led: 'lead', lay: 'lie', bit: 'bite', bitten: 'bite',
  shook: 'shake', shaken: 'shake', blew: 'blow', blown: 'blow', froze: 'freeze', frozen: 'freeze', rose: 'rise', risen: 'rise',
  better: 'good', best: 'good', worse: 'bad', worst: 'bad', men: 'man', women: 'woman', children: 'child', people: 'person', us: 'we', him: 'he', her: 'she', them: 'they' };

export function tokens(text) {
  return String(text).toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/___/g, ' ')
    .split(/[^a-z0-9'.]+/)
    .map(t => t.replace(/^'+|'+$/g, '').replace(/\.+$/, ''))
    .filter(Boolean)
    .flatMap(t => CONTRACTIONS[t] || [t.replace(/'s$/, '')]);
}
export function known(w, extra, allowed) {
  if (/^\d+(st|nd|rd|th)?$/.test(w)) return 'ok'; // números e datas escritas com número (5th, 21st)
  const cands = [w, IRREG[w], w.replace(/s$/, ''), w.replace(/es$/, ''), w.replace(/ies$/, 'y'),
    w.replace(/ed$/, ''), w.replace(/ed$/, 'e'), w.replace(/ied$/, 'y'), w.replace(/([b-df-hj-np-tv-z])\1ed$/, '$1'),
    w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/([b-df-hj-np-tv-z])\1ing$/, '$1'),
    w.replace(/er$/, ''), w.replace(/er$/, 'e'), w.replace(/ier$/, 'y'), w.replace(/([b-df-hj-np-tv-z])\1er$/, '$1'),
    w.replace(/est$/, ''), w.replace(/est$/, 'e'), w.replace(/iest$/, 'y'), w.replace(/([b-df-hj-np-tv-z])\1est$/, '$1')].filter(Boolean);
  if (cands.some(c => allowed.has(c))) return 'ok';
  if (NAMES.has(w)) return 'ok';
  if (cands.some(c => extra.has(c))) return 'extra';
  return null;
}

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Lê a CEFR-J Wordlist (texto do CSV) e devolve { A1: Set, A2: Set, ... }
export function loadVocab(csvText) {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  const iHead = header.indexOf('headword'); const iLvl = header.indexOf('CEFR');
  const VOCAB = Object.fromEntries(LEVEL_ORDER.map(l => [l, new Set()]));
  for (const l of lines.slice(1)) {
    const c = parseCsvLine(l);
    if (!VOCAB[c[iLvl]]) continue;
    for (const h of c[iHead].split('/')) {
      const w = h.trim().toLowerCase().replace(/\.$/, '');
      if (w) VOCAB[c[iLvl]].add(w);
    }
  }
  return VOCAB;
}

// Palavras permitidas num nível (o nível e os de baixo)
export const allowedFor = (VOCAB, level) => new Set(LEVEL_ORDER.slice(0, LEVEL_ORDER.indexOf(level) + 1).flatMap(l => [...VOCAB[l]]));
