// Etapa 3 do B2 completo: unidade nova 13 — Prefiro que… (would rather, it's time, as if / as though).
// Gera src/content/b2/unit-13.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u13.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u13-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u13l${n}-${k}`, ...o });

writeUnit('b2/unit-13.json', {
  id: 'b2-u13', level: 'B2', order: 13,
  title: 'Prefiro que…',
  subtitle: "Would rather, it's time e as if: preferências, cobranças e comparações imaginárias.",
  can_do: {
    text: 'Consigo dizer o que prefiro que os outros façam, cobrar algo com educação e comparar com situações imaginárias.',
    source: 'CEFR (Conselho da Europa) — Interação oral: expressar preferências e opiniões com nuance, nível B2',
  },
  core_inventory: ["Grammar: would rather + verb / would rather + someone + past", "Grammar: it's (high) time + someone + past", 'Grammar: as if / as though', 'Functions: polite preferences and complaints'],
  words: [
    ['would rather', 'preferiria'],
    ["it's time", 'já está na hora'],
    ['as if', 'como se'],
    ['as though', 'como se'],
    ['prefer', 'preferir'],
    ['behave', 'se comportar'],
    ['pretend', 'fingir'],
    ['seem', 'parecer'],
    ['suddenly', 'de repente'],
    ['complain', 'reclamar'],
  ],
  guide: {
    title: 'Preferências e situações imaginárias',
    intro: 'Três estruturas do B2 usam o passado para falar do presente, como o "wish": would rather (preferia que), it\'s time (já está na hora de) e as if (como se).',
    points: [
      { en: "I'd rather stay at home tonight.", pt: 'Prefiro ficar em casa hoje à noite.', note: '"Would rather" + verbo normal (sem to) = preferiria.' },
      { en: "I'd rather you didn't smoke here.", pt: 'Prefiro que você não fume aqui.', note: 'Com outra pessoa: would rather + pessoa + passado.' },
      { en: "It's time we left.", pt: 'Já está na hora de irmos.', note: '"It\'s time" + pessoa + passado = já passou da hora.' },
      { en: "It's time to go.", pt: 'Está na hora de ir.', note: 'Sem pessoa: it\'s time + to + verbo.' },
      { en: 'He talks as if he knew everything.', pt: 'Ele fala como se soubesse tudo.', note: '"As if" + passado = como se (não é verdade).' },
      { en: 'You look as though you need a rest.', pt: 'Você parece precisar de um descanso.', note: '"As though" = "as if". Com algo provável, pode usar presente.' },
    ],
    tips: ['"I\'d rather" = I would rather. Não confunda com "I\'d better" (é melhor eu...).', '"I\'d rather ... than ..." compara: I\'d rather walk than take the bus.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Eu preferiria…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: "I'd rather ___ at home tonight.", pt: 'Prefiro ficar em casa hoje à noite.', options: ['stay', 'to stay', 'staying'], answer: 'stay', why: '"Would rather" + verbo normal, sem "to".', wrong: { 'to stay': 'Sem "to" depois de "rather".', staying: 'Sem -ing.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "I'd rather walk ___ take the bus.", pt: 'Prefiro ir a pé do que pegar o ônibus.', options: ['than', 'that', 'to'], answer: 'than', why: '"Would rather A than B" = prefiro A a B.', wrong: { that: '"That" não compara.', to: '"Prefer A to B" usa "to", mas "rather" usa "than".' } }),
      I(1, 3, { type: 'meaning', en: "Would you rather go to the beach or the mountains?", options: ['Você prefere ir à praia ou às montanhas?', 'Você foi à praia ou às montanhas?', 'Vamos à praia e às montanhas.'], answer: 'Você prefere ir à praia ou às montanhas?', why: '"Would you rather...?" = você prefere...?' }),
      I(1, 4, { type: 'build', pt: 'Prefiro não falar sobre isso.', answer: "I'd rather not talk about it", extra: ['to', "don't"], display: "I'd rather not talk about it.", why: 'Negativa: would rather NOT + verbo.' }),
      I(1, 5, { type: 'listen', en: "I'd rather have tea than coffee.", options: ['Prefiro chá a café.', 'Gosto de chá e de café.', 'Não tomo chá nem café.'], answer: 'Prefiro chá a café.', why: '"Rather ... than" = prefiro ... a.' }),
      I(1, 6, { type: 'match', pairs: [['would rather', 'preferiria'], ["it's time", 'já está na hora'], ['as if', 'como se'], ['pretend', 'fingir']], why: 'Três estruturas que usam o passado para falar do presente.' }),
    ]),
    L(2, 'Prefiro que você…', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: "I'd rather you ___ here.", pt: 'Prefiro que você não fume aqui.', options: ["didn't smoke", "don't smoke", 'not smoke'], answer: "didn't smoke", why: 'Com outra pessoa: would rather + pessoa + passado.', wrong: { "don't smoke": 'Precisa do passado: didn\'t smoke.', 'not smoke': 'Falta o "didn\'t".' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "I'd rather you ___ me the truth.", pt: 'Prefiro que você me conte a verdade.', options: ['told', 'tell', 'will tell'], answer: 'told', why: 'Pessoa + passado: you told.', wrong: { tell: 'Precisa do passado.', 'will tell': '"Will" não entra aqui.' } }),
      I(2, 3, { type: 'meaning', en: "I'd rather we met at the park, not at the office.", options: ['Prefiro que a gente se encontre no parque, não no escritório.', 'A gente se encontrou no parque.', 'O escritório fica no parque.'], answer: 'Prefiro que a gente se encontre no parque, não no escritório.', why: '"We met" (passado) aqui fala do futuro: é desejo.' }),
      I(2, 4, { type: 'build', pt: 'Prefiro que você chegue cedo.', answer: "I'd rather you came early", extra: ['come', 'to'], display: "I'd rather you came early.", why: 'Pessoa + passado (came).' }),
      I(2, 5, { type: 'listen', en: "Would you rather I called you tomorrow?", options: ['Você prefere que eu ligue amanhã?', 'Eu te liguei ontem.', 'Você vai me ligar amanhã?'], answer: 'Você prefere que eu ligue amanhã?', why: '"Would you rather I called" = você prefere que eu ligue.' }),
      I(2, 6, { type: 'speak', en: "I'd rather you didn't tell anyone.", pt: 'Prefiro que você não conte para ninguém.', why: 'Frase educada para pedir segredo.' }),
    ]),
    L(3, 'Já está na hora… / Como se…', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "It's late. It's time we ___ home.", pt: 'Está tarde. Já está na hora de irmos para casa.', options: ['went', 'go', 'will go'], answer: 'went', why: '"It\'s time" + pessoa + passado.', wrong: { go: 'Com pessoa, use o passado: went.', 'will go': 'Não funciona aqui.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "It's time ___ dinner.", pt: 'Está na hora do jantar.', options: ['for', 'to', 'we'], answer: 'for', why: '"It\'s time for" + substantivo.', wrong: { to: '"It\'s time to" + verbo (to have dinner).', we: 'Faltaria o verbo.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: 'He talks as if he ___ the boss.', pt: 'Ele fala como se fosse o chefe.', options: ['were', 'is', 'will be'], answer: 'were', why: '"As if" + passado: não é verdade.', wrong: { is: 'Seria "como se fosse de verdade" (e ele não é).', 'will be': 'Não funciona aqui.' } }),
      I(3, 4, { type: 'meaning', en: "She looked at me as if she had seen a ghost.", options: ['Ela me olhou como se tivesse visto um fantasma.', 'Ela viu um fantasma.', 'Ela tem medo de fantasmas.'], answer: 'Ela me olhou como se tivesse visto um fantasma.', why: '"As if" + past perfect = como se tivesse.' }),
      I(3, 5, { type: 'build', pt: 'Já passou da hora de você arrumar um emprego.', answer: "It's high time you got a job", extra: ['get', 'to'], display: "It's high time you got a job.", why: '"High time" reforça: já passou (muito) da hora.' }),
      I(3, 6, { type: 'listen', en: 'You look as though you need a holiday.', options: ['Você parece precisar de férias.', 'Você voltou de férias.', 'Você está de férias.'], answer: 'Você parece precisar de férias.', why: '"As though" = como se, parece que.' }),
      I(3, 7, { type: 'match', pairs: [['behave', 'se comportar'], ['seem', 'parecer'], ['complain', 'reclamar'], ['suddenly', 'de repente']], why: '"Behave as if" = se comportar como se.' }),
    ]),
    L(4, 'Prática: preferências e cobranças', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "The kids are tired. It's time they ___ to bed.", pt: 'As crianças estão cansadas. Já está na hora de irem para a cama.', options: ['went', 'go', 'going'], answer: 'went', why: '"It\'s time they" + passado.', wrong: { go: 'Com pessoa, passado.', going: 'Sem -ing.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'He behaves as if nothing ___.', pt: 'Ele se comporta como se nada tivesse acontecido.', options: ['had happened', 'happens', 'will happen'], answer: 'had happened', why: '"As if" + past perfect = como se tivesse.', wrong: { happens: 'Não mostra o "como se tivesse".', 'will happen': 'Não funciona aqui.' } }),
      I(4, 3, { type: 'meaning', en: "I'd rather we didn't discuss this in front of the children.", options: ['Prefiro que a gente não discuta isso na frente das crianças.', 'Discutimos na frente das crianças.', 'As crianças querem discutir.'], answer: 'Prefiro que a gente não discuta isso na frente das crianças.', why: 'Would rather + we + passado.' }),
      I(4, 4, { type: 'build', pt: 'Ele finge que não me conhece.', answer: "He pretends he doesn't know me", extra: ['pretend', 'knew'], display: "He pretends he doesn't know me.", why: '"Pretend" = fingir.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Shall I cook tonight?'], ['B', '___']], options: ["Thanks, but I'd rather we ordered a pizza.", "Thanks, but I'd rather we order pizza.", "Thanks, but I rather pizza."], answer: "Thanks, but I'd rather we ordered a pizza.", pt: 'Obrigado, mas prefiro que a gente peça uma pizza.', why: 'Would rather + we + passado.', wrong: { "Thanks, but I'd rather we order pizza.": 'Com pessoa, passado: ordered.', "Thanks, but I rather pizza.": 'Falta o "would" e o verbo.' } }),
      I(4, 6, { type: 'listen', en: "It's time you started taking this seriously.", options: ['Já está na hora de você começar a levar isso a sério.', 'Você sempre leva tudo a sério.', 'Vamos começar amanhã.'], answer: 'Já está na hora de você começar a levar isso a sério.', why: 'It\'s time + you + passado (started).' }),
      I(4, 7, { type: 'choice', prompt: 'Qual frase está CERTA?', en: '___', pt: 'Prefiro ir a pé.', options: ["I'd rather walk.", "I'd rather to walk.", "I'd rather walking."], answer: "I'd rather walk.", why: 'Would rather + verbo normal.', wrong: { "I'd rather to walk.": 'Sem "to".', "I'd rather walking.": 'Sem -ing.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Prefiro ficar em casa.', answer: "I'd rather stay at home.", accept: ['I would rather stay at home.', "I'd rather stay home."], why: 'Would rather + verbo.' }),
      I(5, 2, { type: 'type', pt: 'Já está na hora de irmos.', answer: "It's time we left.", accept: ['It is time we left.', "It's time we went.", 'It is time we went.'], why: "It's time + we + passado." }),
      I(5, 3, { type: 'dictation', en: 'He acts as if he were rich.', why: '"As if" + were = como se fosse.' }),
      I(5, 4, { type: 'type', pt: 'Prefiro que você não ligue tarde.', answer: "I'd rather you didn't call late.", accept: ["I would rather you didn't call late."], why: 'Pessoa + passado negativo.' }),
      I(5, 5, { type: 'dictation', en: "I'd rather have tea, please.", why: '"Rather have" = prefiro.' }),
      I(5, 6, { type: 'type', pt: 'Você parece cansado.', answer: 'You look as if you are tired.', accept: ['You look tired.', 'You look as though you are tired.', 'You seem tired.'], why: '"Look as if" = parecer.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "I'd rather not say.", options: ['Prefiro não dizer.', 'Eu não sei.', 'Vou dizer depois.'], answer: 'Prefiro não dizer.', why: 'Resposta educada para não responder algo.' }),
      I(6, 2, { type: 'dictation', en: "It's high time we changed this.", why: '"High time" = já passou da hora.' }),
      I(6, 3, { type: 'listen', en: 'It sounds as if they are having a party.', options: ['Parece que eles estão dando uma festa.', 'Eles deram uma festa ontem.', 'Não tem festa nenhuma.'], answer: 'Parece que eles estão dando uma festa.', why: '"Sounds as if" = pelo barulho, parece que.' }),
      I(6, 4, { type: 'dictation', en: 'She pretended she was asleep.', why: '"Pretend" = fingir.' }),
      I(6, 5, { type: 'listen', en: "Would you rather I came with you?", options: ['Você prefere que eu vá com você?', 'Eu fui com você.', 'Você vai comigo?'], answer: 'Você prefere que eu vá com você?', why: 'Would you rather + I + passado.' }),
      I(6, 6, { type: 'dictation', en: 'Stop complaining and help me.', why: '"Stop complaining" = pare de reclamar.' }),
      I(6, 7, { type: 'speak', en: "It's time to go home.", pt: 'Está na hora de ir para casa.', why: 'Sem pessoa: it\'s time to + verbo.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Do you want to go out tonight?'], ['B', '___']], options: ["Honestly, I'd rather stay in and watch a film.", "Honestly, I'd rather to stay in.", 'Honestly, I rather staying in.'], answer: "Honestly, I'd rather stay in and watch a film.", pt: 'Sinceramente, prefiro ficar em casa e ver um filme.', why: '"Stay in" = ficar em casa.', wrong: { "Honestly, I'd rather to stay in.": 'Sem "to".', 'Honestly, I rather staying in.': 'Falta "would" e sem -ing.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', "My son is 30 and still lives with us."], ['B', '___']], options: ["Maybe it's time he found his own place.", "Maybe it's time he finds his own place.", 'Maybe time he find a place.'], answer: "Maybe it's time he found his own place.", pt: 'Talvez já esteja na hora de ele arrumar o próprio canto.', why: "It's time + he + passado.", wrong: { "Maybe it's time he finds his own place.": 'Use o passado: found.', 'Maybe time he find a place.': 'Faltam partes da estrutura.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Did you see Mike after he won the prize?'], ['B', '___']], options: ["Yes! He walked around as if he were a king.", 'Yes! He walked as if he is king.', 'Yes! He walk like king.'], answer: 'Yes! He walked around as if he were a king.', pt: 'Vi! Ele andava como se fosse um rei.', why: 'As if + were = como se fosse.', wrong: { 'Yes! He walked as if he is king.': 'Use "were" e "a king".', 'Yes! He walk like king.': 'Tempo e artigo errados.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Can I tell your parents the news?'], ['B', '___']], options: ["I'd rather you didn't. I want to tell them myself.", "I'd rather you don't. I tell myself.", 'I rather you not.'], answer: "I'd rather you didn't. I want to tell them myself.", pt: 'Prefiro que não. Quero contar eu mesmo.', why: 'Resposta curta: I\'d rather you didn\'t.', wrong: { "I'd rather you don't. I tell myself.": 'Use o passado: didn\'t.', 'I rather you not.': 'Falta "would" e o verbo.' } }),
      I(7, 5, { type: 'speak', en: "I'd rather not talk about it.", pt: 'Prefiro não falar sobre isso.', why: '"I\'d rather" soa como "áid-RÁ-der".' }),
      I(7, 6, { type: 'speak', en: "It's high time we left.", pt: 'Já passou da hora de irmos.', why: '"High time" reforça a cobrança.' }),
    ]),
    L(8, 'Lendo: o colega de apartamento', [
      I(8, 1, { type: 'story', why: 'A Paula escreve um bilhete para o colega de apartamento. Repare em "would rather", "it\'s time" e "as if".' }),
      I(8, 2, { type: 'quiz', q: 'Onde o Leo deixa a louça?', options: ['Na pia', 'No quarto', 'Na sala'], answer: 'Na pia', why: '"You leave your dishes in the sink."' }),
      I(8, 3, { type: 'quiz', q: 'O que a Paula prefere que ele faça com os amigos?', options: ['Que não traga amigos depois da meia-noite', 'Que traga mais amigos', 'Que saia com eles'], answer: 'Que não traga amigos depois da meia-noite', why: '"I\'d rather you didn\'t bring friends after midnight."' }),
      I(8, 4, { type: 'quiz', q: 'Qual é a sugestão final?', options: ['Conversar no jantar de sexta', 'Mudar de apartamento', 'Chamar o dono'], answer: 'Conversar no jantar de sexta', why: '"Let\'s talk about it over dinner on Friday."' }),
    ], {
      title: 'Bilhete para o Leo',
      lines: [
        { who: 'Paula', en: "Leo, I'd rather talk to you, but you're never home, so here's a note.", pt: 'Leo, eu preferia falar com você, mas você nunca está em casa, então lá vai um bilhete.' },
        { who: 'Paula', en: "You leave your dishes in the sink as if I were your cleaner!", pt: 'Você deixa a louça na pia como se eu fosse a sua faxineira!' },
        { ask: 'Do que a Paula reclama primeiro?', options: ['Da louça na pia', 'Do barulho', 'Do aluguel'], answer: 'Da louça na pia', why: '"You leave your dishes in the sink."' },
        { who: 'Paula', en: "Also, I'd rather you ___ bring friends after midnight. I have to work early.", pt: 'Além disso, prefiro que você não traga amigos depois da meia-noite. Tenho que trabalhar cedo.', gap: { answer: "didn't", options: ["didn't", "don't", "won't"] } },
        { who: 'Paula', en: "I think it's time we made some rules for the flat.", pt: 'Acho que já está na hora de a gente criar umas regras para o apartamento.' },
        { who: 'Paula', en: "Let's talk about it over dinner on Friday. I'll cook! Paula.", pt: 'Vamos conversar sobre isso no jantar de sexta. Eu cozinho! Paula.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: "I'd rather ___ by train than by plane.", pt: 'Prefiro viajar de trem do que de avião.', options: ['travel', 'to travel', 'travelling'], answer: 'travel', why: 'Would rather + verbo normal.', wrong: { 'to travel': 'Sem "to".', travelling: 'Sem -ing.' } }),
      I(9, 2, { type: 'type', pt: 'Ele fala como se soubesse tudo.', answer: 'He talks as if he knew everything.', accept: ['He speaks as if he knew everything.', 'He talks as though he knew everything.'], why: 'As if + passado.' }),
      I(9, 3, { type: 'meaning', en: "It's time you apologised to her.", options: ['Já está na hora de você pedir desculpas a ela.', 'Você já pediu desculpas.', 'Ela te pediu desculpas.'], answer: 'Já está na hora de você pedir desculpas a ela.', why: "It's time + you + passado." }),
      I(9, 4, { type: 'dictation', en: "I'd rather you stayed here.", why: 'Pessoa + passado (stayed).' }),
      I(9, 5, { type: 'listen', en: 'She seemed as if she was about to cry.', options: ['Ela parecia que ia chorar.', 'Ela chorou muito.', 'Ela estava rindo.'], answer: 'Ela parecia que ia chorar.', why: '"About to" = prestes a.' }),
      I(9, 6, { type: 'build', pt: 'Prefiro que a gente se encontre amanhã.', answer: "I'd rather we met tomorrow", extra: ['meet', 'to'], display: "I'd rather we met tomorrow.", why: 'Would rather + we + passado.' }),
    ]),
    L(10, 'História: a festa surpresa', [
      I(10, 1, { type: 'story', why: 'A Julia descobre que estão planejando uma festa surpresa para ela. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Como o Ben estava agindo?', options: ['Como se estivesse escondendo algo', 'Como se estivesse doente', 'Normal'], answer: 'Como se estivesse escondendo algo', why: '"You\'re acting as if you were hiding something."' }),
      I(10, 3, { type: 'quiz', q: 'O que a Julia prefere?', options: ['Um jantar pequeno', 'Uma festa grande', 'Não comemorar'], answer: 'Um jantar pequeno', why: '"I\'d rather have a small dinner."' }),
      I(10, 4, { type: 'quiz', q: 'O que a Julia promete no fim?', options: ['Fingir que não sabe de nada', 'Contar para todo mundo', 'Cancelar a festa'], answer: 'Fingir que não sabe de nada', why: '"I\'ll pretend I don\'t know anything."' }),
    ], {
      title: 'A festa surpresa',
      lines: [
        { who: 'Julia', en: "Ben, you're acting as if you were hiding something. What's going on?", pt: 'Ben, você está agindo como se estivesse escondendo alguma coisa. O que está acontecendo?' },
        { who: 'Ben', en: "Nothing! Well... OK. We're planning a surprise party for your birthday.", pt: 'Nada! Bom... tá. Estamos planejando uma festa surpresa para o seu aniversário.' },
        { who: 'Julia', en: "Oh no! You know I'd rather ___ a small dinner with a few friends.", pt: 'Ah, não! Você sabe que eu prefiro um jantar pequeno com poucos amigos.', gap: { answer: 'have', options: ['have', 'to have', 'having'] } },
        { ask: 'O que o Ben estava planejando?', options: ['Uma festa surpresa', 'Uma viagem', 'Um jantar pequeno'], answer: 'Uma festa surpresa', why: '"We\'re planning a surprise party."' },
        { who: 'Ben', en: "I know, but it's time you celebrated properly. Fifty people are coming!", pt: 'Eu sei, mas já está na hora de você comemorar direito. Cinquenta pessoas vão vir!' },
        { who: 'Julia', en: "Fifty? OK, OK. I'll pretend I don't know anything. Act as if you never told me!", pt: 'Cinquenta? Tá, tá. Vou fingir que não sei de nada. Age como se você nunca tivesse me contado!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u13', level: 'B2', unlock: 'b2-u13', title: 'Você prefere…?',
  intro: 'A Ana e o Tom jogam o "Você prefere?" em inglês.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're playing 'Would you rather'!", pt: 'E eu sou o Tom. Hoje vamos jogar "Você prefere"!' },
    { who: 'ana', en: 'Tom, would you rather live without music or without films?', pt: 'Tom, você prefere viver sem música ou sem filmes?' },
    { who: 'tom', en: "Hard one! I'd rather live without films. Music is everything to me.", pt: 'Difícil! Prefiro viver sem filmes. Música é tudo para mim.' },
    { who: 'ana', en: "My turn. Would I rather be rich or famous? I'd rather be rich, but nobody knew me!", pt: 'Minha vez. Prefiro ser rica ou famosa? Prefiro ser rica, mas que ninguém me conhecesse!' },
    { who: 'tom', en: "Ha! You talk as if you had thought about it a lot.", pt: 'Rá! Você fala como se tivesse pensado muito nisso.' },
    { who: 'ana', en: "Maybe I have! OK, it's time we said goodbye. Try this game with your friends!", pt: 'Talvez eu tenha! Bom, já está na hora de nos despedirmos. Tentem esse jogo com os amigos!' },
    { who: 'tom', en: 'Bye!', pt: 'Tchau!' },
  ],
  questions: [
    { q: 'O Tom prefere viver sem o quê?', options: ['Sem filmes', 'Sem música', 'Sem dinheiro'], answer: 'Sem filmes', why: '"I\'d rather live without films."' },
    { q: 'O que a Ana prefere ser?', options: ['Rica, mas sem ser conhecida', 'Famosa', 'Nem rica nem famosa'], answer: 'Rica, mas sem ser conhecida', why: '"I\'d rather be rich, but nobody knew me!"' },
    { q: 'Como a Ana fala, segundo o Tom?', options: ['Como se tivesse pensado muito nisso', 'Como se estivesse cansada', 'Como se fosse famosa'], answer: 'Como se tivesse pensado muito nisso', why: '"As if you had thought about it a lot."' },
  ],
}, 'pod-b2u12');
addScene('b2-u13', 'standing-7', 'party');
