// Valida o conteúdo dos minijogos (src/games/data) com a mesma lista CEFR-J das lições.
// Todo texto em inglês precisa estar no nível do episódio/caso/missão (ou abaixo).
// Se houver ERRO, o build falha.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokens, known, loadVocab, allowedFor } from './cefr.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VOCAB = loadVocab(fs.readFileSync(path.join(root, 'content/sources/cefrj-vocabulary-profile-1.5.csv'), 'utf8'));
const D = (f) => JSON.parse(fs.readFileSync(path.join(root, 'src/games/data', f), 'utf8'));
const cast = D('cast.json');
const units = new Set(fs.readdirSync(path.join(root, 'src/content')).filter(d => /^[abc][12]$/.test(d))
  .flatMap(d => fs.readdirSync(path.join(root, 'src/content', d)).map(f => JSON.parse(fs.readFileSync(path.join(root, 'src/content', d, f), 'utf8')).id)));

// nomes dos personagens e algumas palavras de cenário (lugares e moeda) liberados
const EXTRA = new Set([...Object.values(cast).map(c => c.name.toLowerCase()), 'scotland', 'silva', 'wi', 'fi', 'ok', 'pounds', 'pound', 'goodbye', 'podcast', 'podcasts', 'mum', 'rio', 'chips', 'app', 'apps', 'phrasal']);
const errors = [];
const err = (w, m) => errors.push(`${w}: ${m}`);
let words = 0;

function checker(level, where) {
  const allowed = allowedFor(VOCAB, level);
  return (text) => {
    if (!text) { err(where, 'texto em inglês vazio'); return; }
    for (const t of tokens(text)) {
      words++;
      if (EXTRA.has(t)) continue;
      if (known(t, new Set(), allowed) === null) err(where, `palavra acima do ${level} (CEFR-J): "${t}" em "${text}"`);
    }
  };
}
const ids = new Set();
function base(x, where) {
  if (!/^[a-z0-9-]{2,30}$/.test(x.id || '')) err(where, `id inválido "${x.id}"`);
  if (ids.has(x.id)) err(where, `id repetido "${x.id}"`); ids.add(x.id);
  if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(x.level)) err(where, `nível inválido "${x.level}"`);
  if (!units.has(x.unlock)) err(where, `unlock aponta para unidade inexistente "${x.unlock}"`);
  if (!x.title) err(where, 'sem título');
}
const who = (id, where) => { if (!cast[id]) err(where, `personagem desconhecido "${id}"`); };
const choice = (s, where, en) => {
  if (!s.options?.includes(s.answer)) err(where, `resposta "${s.answer}" não está nas opções`);
  if (new Set(s.options).size !== s.options?.length) err(where, 'opções repetidas');
  if (!s.why || s.why.length < 15) err(where, 'falta explicação "why"');
  if (en) s.options?.forEach(en);
};

// episódios
const ep = D('episodes.json');
for (const e of ep.episodes) {
  const W = `episódio ${e.id}`; base(e, W);
  const en = checker(e.level, W);
  if (!e.intro) err(W, 'sem introdução');
  let interactions = 0;
  const steps = (list, where) => {
    for (const s of list) {
      if (s.ask) { interactions++; choice(s, `${where} pergunta`); }
      else if (s.pick) { interactions++; who(s.who, where); choice(s, `${where} escolha`, en); if (!s.pt) err(where, `escolha sem tradução "${s.answer}"`); }
      else if (s.branch) {
        interactions++; who(s.who, where);
        if (!Array.isArray(s.options) || s.options.length < 2) err(where, 'ramificação precisa de 2 opções');
        for (const o of s.options || []) { en(o.en); if (!o.pt) err(where, `ramificação sem tradução "${o.en}"`); steps(o.then || [], where); }
      } else { who(s.who, where); en(s.en); if (!s.pt) err(where, `fala sem tradução "${s.en}"`); }
    }
  };
  for (const [i, sc] of (e.scenes || []).entries()) {
    sc.cast.forEach(c => who(c, `${W} cena ${i + 1}`));
    steps(sc.steps, `${W} cena ${i + 1}`);
  }
  if (interactions < 4) err(W, 'episódio precisa de pelo menos 4 interações');
}

// casos de detetive
for (const c of D('mysteries.json').cases) {
  const W = `caso ${c.id}`; base(c, W);
  const en = checker(c.level, W);
  for (const s of c.suspects) { who(s.id, W); en(s.en); if (!s.pt) err(W, 'depoimento sem tradução'); }
  for (const k of c.clues) { en(k.en); if (!k.pt) err(W, 'pista sem tradução'); choice(k.check, `${W} pista`); }
  if (!c.suspects.some(s => s.id === c.answer)) err(W, 'culpado não está entre os suspeitos');
  if (!c.solution) err(W, 'sem solução explicada');
}

// missões na cidade
for (const m of D('city.json').missions) {
  const W = `missão ${m.id}`; base(m, W); who(m.npc, W);
  const en = checker(m.level, W);
  for (const s of m.steps) { en(s.en); if (!s.pt) err(W, 'fala sem tradução'); choice(s, W, en); }
}

// podcasts
for (const pc of D('podcasts.json').episodes) {
  const W = `podcast ${pc.id}`; base(pc, W);
  const en = checker(pc.level, W);
  if (!pc.intro) err(W, 'sem introdução');
  if ((pc.lines || []).length < 8) err(W, 'podcast precisa de pelo menos 8 falas');
  for (const l of pc.lines || []) { who(l.who, W); en(l.en); if (!l.pt) err(W, `fala sem tradução "${l.en}"`); }
  if ((pc.questions || []).length < 3) err(W, 'podcast precisa de 3 perguntas');
  for (const q of pc.questions || []) choice(q, `${W} pergunta`);
}

// figuras (Ouviu, tocou): todas no A1
const a1 = checker('A1', 'figuras');
for (const [w, pt, pic] of D('pictures.json').words) { a1(w); if (!pt || !pic) err('figuras', `"${w}" sem tradução ou figura`); }

if (errors.length) {
  console.error(`\n✗ Minijogos: ${errors.length} erro(s):\n` + errors.map(e => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ Minijogos: ${words} palavras conferidas na CEFR-J.`);
