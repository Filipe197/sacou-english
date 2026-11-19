// Etapa 3 do A1 completo (docs/plano-expansao-a1.md): unidade nova 16 — Ontem e viagens.
// Gera src/content/a1/unit-16.json, a escuta pod-a1u16 e a cena da trilha.
// Uso: node scripts/content-add/a1-u16.mjs  (pode rodar de novo)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a1-u16-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a1u16l${n}-${k}`, ...o });

writeUnit('a1/unit-16.json', {
  id: 'a1-u16', level: 'A1', order: 16,
  title: 'Ontem e viagens',
  subtitle: 'Was e were: onde você estava e como foi a viagem.',
  can_do: {
    text: 'Consigo dizer onde estava, como foi um dia ou uma viagem e perguntar isso a outra pessoa.',
    source: 'CEFR (Conselho da Europa) — Produção oral: descrever experiências com frases simples, nível A1',
  },
  core_inventory: ['Past of be: was / were', 'yesterday / last night / last week / ago', 'How was...? / Where were you?', 'There was / there were', 'Travel: trip, hotel, ticket, plane'],
  words: [
    ['was / were', 'era, estava / eram, estavam'],
    ['yesterday', 'ontem'],
    ['last night', 'ontem à noite'],
    ['last week', 'semana passada'],
    ['ago', 'atrás (tempo)'],
    ['trip', 'viagem'],
    ['holiday', 'férias / feriado'],
    ['hotel', 'hotel'],
    ['ticket', 'passagem / ingresso'],
    ['plane', 'avião'],
    ['beach', 'praia'],
    ['travel', 'viajar'],
    ['great / terrible', 'ótimo / horrível'],
    ['boring / interesting', 'chato / interessante'],
  ],
  guide: {
    title: 'Was e were: falando do passado',
    intro: 'O verbo to be também tem passado: "was" e "were". Com eles você já conta onde estava e como foi o dia, a festa ou a viagem.',
    points: [
      { en: 'I was at home yesterday.', pt: 'Eu estava em casa ontem.', note: 'I / he / she / it → was.' },
      { en: 'We were in London last week.', pt: 'Nós estávamos em Londres semana passada.', note: 'You / we / they → were.' },
      { en: 'How was your trip?', pt: 'Como foi a sua viagem?', note: 'Pergunta: o verbo vem antes: WAS your trip...? WERE you...?' },
      { en: 'It wasn\'t boring. It was great!', pt: 'Não foi chato. Foi ótimo!', note: 'Negativa: wasn\'t (was not) / weren\'t (were not).' },
      { en: 'There were many people at the beach.', pt: 'Tinha muita gente na praia.', note: 'Passado de there is / there are: there was / there were.' },
      { en: 'two days ago', pt: 'dois dias atrás / há dois dias', note: '"Ago" vem DEPOIS do tempo: two days ago, a week ago.' },
    ],
    tips: ['"Last" = passado: last night (ontem à noite), last week, last year.', 'No Reino Unido férias é "holiday"; nos Estados Unidos, "vacation".'],
  },
  extra_vocab: [
    { word: 'last', reason: 'Indispensável para falar do passado com was/were (last night, last week), objetivo desta unidade A1; na CEFR-J "last" aparece no A2.' },
  ],
  lessons: [
    L(1, 'Eu estava, você estava', [
      I(1, 1, { type: 'meaning', en: 'I was at home yesterday.', options: ['Eu estava em casa ontem.', 'Eu estou em casa hoje.', 'Eu vou ficar em casa amanhã.'], answer: 'Eu estava em casa ontem.', why: '"Was" é o passado de am/is. "Yesterday" = ontem.' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'They ___ at the beach last week.', pt: 'Eles estavam na praia semana passada.', options: ['were', 'was', 'are'], answer: 'were', why: 'Com they: were.', wrong: { was: '"Was" vai com I, he, she e it.', are: '"Are" é presente; "last week" pede passado.' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'She ___ tired last night.', pt: 'Ela estava cansada ontem à noite.', options: ['was', 'were', 'is'], answer: 'was', why: 'Com she: was. "Last night" = ontem à noite.', wrong: { were: '"Were" vai com you, we e they.', is: '"Is" é presente.' } }),
      I(1, 4, { type: 'build', pt: 'Nós estávamos no hotel.', answer: 'We were at the hotel', extra: ['was', 'are'], display: 'We were at the hotel.', why: 'Com "we" o passado de to be é "were".' }),
      I(1, 5, { type: 'listen', en: 'Where were you yesterday?', options: ['Onde você estava ontem?', 'Onde você está hoje?', 'Onde você mora?'], answer: 'Onde você estava ontem?', why: 'Pergunta: Where + were + you?' }),
      I(1, 6, { type: 'dialogue', lines: [['A', 'Where were you last night?'], ['B', '___']], options: ['I was at the cinema.', 'I am at the cinema.', 'I were at the cinema.'], answer: 'I was at the cinema.', pt: 'Eu estava no cinema.', why: 'Com I: was. "Last night" pede passado.', wrong: { 'I am at the cinema.': 'Presente; a pergunta é sobre ontem à noite.', 'I were at the cinema.': 'Com I é "was".' } }),
    ]),
    L(2, 'Como foi?', [
      I(2, 1, { type: 'match', pairs: [['great', 'ótimo'], ['terrible', 'horrível'], ['boring', 'chato'], ['interesting', 'interessante']], why: 'Para dizer como foi: It was great / terrible / boring / interesting.' }),
      I(2, 2, { type: 'meaning', en: 'How was your weekend?', options: ['Como foi o seu fim de semana?', 'Como é o seu fim de semana?', 'Onde foi o seu fim de semana?'], answer: 'Como foi o seu fim de semana?', why: '"How was...?" = como foi...?' }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: "The movie ___ boring. It was very interesting!", pt: 'O filme não foi chato. Foi muito interessante!', options: ["wasn't", "weren't", "isn't"], answer: "wasn't", why: 'Negativa de was: wasn\'t.', wrong: { "weren't": '"Weren\'t" vai com you, we e they.', "isn't": '"Isn\'t" é presente.' } }),
      I(2, 4, { type: 'dialogue', lines: [['A', 'How was the party?'], ['B', '___']], options: ['It was great!', 'It is great!', 'Yes, it was.'], answer: 'It was great!', pt: 'Foi ótima!', why: '"How was...?" pede como foi: It was great/terrible...', wrong: { 'It is great!': 'Presente; a festa já passou.', 'Yes, it was.': '"How" pede como foi, não sim ou não.' } }),
      I(2, 5, { type: 'build', pt: 'O hotel foi horrível.', answer: 'The hotel was terrible', extra: ['were', 'is'], display: 'The hotel was terrible.', why: '"The hotel" (it) + was.' }),
      I(2, 6, { type: 'listen', en: 'It was a very interesting trip.', options: ['Foi uma viagem muito interessante.', 'É uma viagem muito interessante.', 'Foi uma viagem muito chata.'], answer: 'Foi uma viagem muito interessante.', why: '"Interesting" soa como "ÍN-tres-ting".' }),
    ]),
    L(3, 'Ontem, semana passada, há dois dias', [
      I(3, 1, { type: 'match', pairs: [['yesterday', 'ontem'], ['last night', 'ontem à noite'], ['last week', 'semana passada'], ['two days ago', 'dois dias atrás']], why: '"Ago" vem DEPOIS do tempo: two days ago.' }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'I was in Paris three years ___.', pt: 'Eu estive em Paris três anos atrás.', options: ['ago', 'last', 'yesterday'], answer: 'ago', why: '"Ago" = atrás, depois do tempo: three years ago.', wrong: { last: '"Last" vem antes: last year.', yesterday: '"Yesterday" não vai com "three years".' } }),
      I(3, 3, { type: 'meaning', en: 'We were on holiday last month.', options: ['Estávamos de férias no mês passado.', 'Vamos sair de férias no mês que vem.', 'Estamos de férias este mês.'], answer: 'Estávamos de férias no mês passado.', why: '"On holiday" = de férias. "Last month" = mês passado.' }),
      I(3, 4, { type: 'build', pt: 'Eu estava doente ontem.', answer: 'I was sick yesterday', extra: ['were', 'ago'], display: 'I was sick yesterday.', why: 'Com I: was. "Yesterday" no fim.' }),
      I(3, 5, { type: 'choice', prompt: 'Complete:', en: 'There ___ many people at the beach.', pt: 'Tinha muita gente na praia.', options: ['were', 'was', 'is'], answer: 'were', why: '"Many people" é plural: there were.', wrong: { was: '"There was" é para uma coisa só.', is: 'Presente; aqui é passado.' } }),
      I(3, 6, { type: 'listen', en: 'There was a big hotel near the beach.', options: ['Tinha um hotel grande perto da praia.', 'Tem um hotel grande perto da praia.', 'Tinha muitos hotéis na praia.'], answer: 'Tinha um hotel grande perto da praia.', why: '"There was" = tinha, havia (passado).' }),
    ]),
    L(4, 'Viajando', [
      I(4, 1, { type: 'match', pairs: [['trip', 'viagem'], ['ticket', 'passagem'], ['plane', 'avião'], ['hotel', 'hotel']], why: '"Trip" é a viagem. "Travel" é o verbo viajar.' }),
      I(4, 2, { type: 'meaning', en: 'I love travelling by plane.', options: ['Eu adoro viajar de avião.', 'Eu adoro aviões.', 'Eu viajo de avião todo dia.'], answer: 'Eu adoro viajar de avião.', why: 'Love + -ing. "By plane" = de avião.' }),
      I(4, 3, { type: 'dialogue', lines: [['A', 'Were you on holiday last week?'], ['B', '___']], options: ['Yes, I was. I was at the beach.', 'Yes, I were.', 'Yes, I am.'], answer: 'Yes, I was. I was at the beach.', pt: 'Sim, estava. Estava na praia.', why: 'Resposta curta com I: Yes, I was / No, I wasn\'t.', wrong: { 'Yes, I were.': 'Com I é "was".', 'Yes, I am.': 'Presente; a pergunta é sobre a semana passada.' } }),
      I(4, 4, { type: 'build', pt: 'A passagem foi cara.', answer: 'The ticket was expensive', extra: ['were', 'trip'], display: 'The ticket was expensive.', why: '"Ticket" = passagem. It + was.' }),
      I(4, 5, { type: 'choice', prompt: 'Complete:', en: '___ the hotel nice?', pt: 'O hotel era bom?', options: ['Was', 'Were', 'Did'], answer: 'Was', why: 'Pergunta: o verbo vem antes: Was the hotel nice?', wrong: { Were: '"Were" vai com you, we e they.', Did: 'Com adjetivo (nice) usamos was/were.' } }),
      I(4, 6, { type: 'listen', en: 'Our trip was wonderful!', options: ['Nossa viagem foi maravilhosa!', 'Nossa viagem foi horrível!', 'Nossa viagem é amanhã!'], answer: 'Nossa viagem foi maravilhosa!', why: '"Wonderful" = maravilhoso.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Eu estava em casa ontem.', answer: 'I was at home yesterday.', why: 'Com "I" o passado de to be é "was".' }),
      I(5, 2, { type: 'type', pt: 'Como foi a sua viagem?', answer: 'How was your trip?', why: 'How + was + your trip?' }),
      I(5, 3, { type: 'dictation', en: 'We were at the beach last week.', why: 'Com "we" o passado de to be é "were".' }),
      I(5, 4, { type: 'type', pt: 'Não foi chato.', answer: "It wasn't boring.", accept: ['It was not boring.'], why: 'Negativa: wasn\'t.' }),
      I(5, 5, { type: 'dictation', en: 'I was in Rio two years ago.', why: '"Two years ago" = dois anos atrás.' }),
      I(5, 6, { type: 'type', pt: 'Onde vocês estavam?', answer: 'Where were you?', why: 'Where + were + you?' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'How was your holiday?', options: ['Como foram as suas férias?', 'Onde são as suas férias?', 'Quando são as suas férias?'], answer: 'Como foram as suas férias?', why: '"Holiday" = férias.' }),
      I(6, 2, { type: 'dictation', en: 'The weather was great.', why: '"The weather was great" = o tempo estava ótimo.' }),
      I(6, 3, { type: 'listen', en: "They weren't at school yesterday.", options: ['Eles não estavam na escola ontem.', 'Eles estavam na escola ontem.', 'Eles não estão na escola hoje.'], answer: 'Eles não estavam na escola ontem.', why: '"Weren\'t" = não estavam.' }),
      I(6, 4, { type: 'dictation', en: 'There were two beds in the room.', why: '"There were" = tinha (vários).' }),
      I(6, 5, { type: 'listen', en: 'I was in London a week ago.', options: ['Eu estive em Londres uma semana atrás.', 'Eu vou a Londres daqui a uma semana.', 'Eu moro em Londres há uma semana.'], answer: 'Eu estive em Londres uma semana atrás.', why: '"A week ago" = uma semana atrás.' }),
      I(6, 6, { type: 'dictation', en: 'Was the ticket expensive?', why: 'Pergunta: Was + the ticket + expensive?' }),
      I(6, 7, { type: 'speak', en: 'It was a great trip!', pt: 'Foi uma viagem ótima!', why: '"Was" soa como "uóz" (forte) ou "uâz" (rápido).' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'How was your weekend?'], ['B', '___']], options: ['It was great! I was at the beach.', 'It is great! I am at the beach.', 'Yes, it was.'], answer: 'It was great! I was at the beach.', pt: 'Foi ótimo! Eu estava na praia.', why: 'Conte como foi e onde você estava, no passado.', wrong: { 'It is great! I am at the beach.': 'O fim de semana já passou: use was.', 'Yes, it was.': 'A pergunta pede como foi.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Was the hotel nice?'], ['B', '___']], options: ["No, it wasn't. It was dirty.", "No, it weren't.", "No, it isn't nice yesterday."], answer: "No, it wasn't. It was dirty.", pt: 'Não. Estava sujo.', why: 'Resposta curta: No, it wasn\'t.', wrong: { "No, it weren't.": 'Com it é "wasn\'t".', "No, it isn't nice yesterday.": '"Yesterday" pede passado.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Where were you on Sunday?'], ['B', '___']], options: ['We were at my grandma\'s house.', 'We are at my grandma\'s house.', 'We was at my grandma\'s house.'], answer: "We were at my grandma's house.", pt: 'Estávamos na casa da minha avó.', why: 'Com "we" o passado de to be é "were".', wrong: { "We are at my grandma's house.": 'Presente; domingo já passou.', "We was at my grandma's house.": 'Com we é "were".' } }),
      I(7, 4, { type: 'speak', en: 'Where were you yesterday?', pt: 'Onde você estava ontem?', why: '"Were" soa como "uâr".' }),
      I(7, 5, { type: 'speak', en: 'I was on holiday last week.', pt: 'Eu estava de férias semana passada.', why: '"Holiday" soa como "HÓ-li-dei".' }),
      I(7, 6, { type: 'dialogue', lines: [['A', 'Welcome back! How was the trip?'], ['B', '___']], options: ["It was wonderful, thanks! But I'm tired.", "It's tomorrow.", "I'm welcome."], answer: "It was wonderful, thanks! But I'm tired.", pt: 'Foi maravilhosa, obrigado! Mas estou cansado.', why: 'Conte como foi (was) e como você está agora (am).', wrong: { "It's tomorrow.": 'A pessoa já voltou da viagem.', "I'm welcome.": 'Não responde como foi.' } }),
    ]),
    L(8, 'Lendo: o diário de viagem', [
      I(8, 1, { type: 'story', why: 'O diário de viagem da Sofia. Leia como foram os dias dela.' }),
      I(8, 2, { type: 'quiz', q: 'Onde a Sofia estava?', options: ['Em Londres', 'Em Paris', 'No Rio'], answer: 'Em Londres', why: '"Last week I was in London".' }),
      I(8, 3, { type: 'quiz', q: 'Como estava o tempo?', options: ['Frio e chuvoso', 'Quente e ensolarado', 'Com neve'], answer: 'Frio e chuvoso', why: '"It was cold and rainy".' }),
      I(8, 4, { type: 'quiz', q: 'O que a Sofia achou da cidade?', options: ['Muito interessante', 'Chata', 'Cara demais'], answer: 'Muito interessante', why: '"The city was very interesting".' }),
    ], {
      title: 'O diário de viagem',
      lines: [
        { who: 'Sofia', en: 'Last week I was in London with my friend Julia.', pt: 'Semana passada eu estava em Londres com minha amiga Julia.' },
        { who: 'Sofia', en: 'The plane was full and the trip was long.', pt: 'O avião estava cheio e a viagem foi longa.' },
        { ask: 'Com quem a Sofia viajou?', options: ['Com a Julia', 'Com a mãe', 'Sozinha'], answer: 'Com a Julia', why: '"With my friend Julia".' },
        { who: 'Sofia', en: 'Our hotel was small, but it was clean and nice.', pt: 'Nosso hotel era pequeno, mas era limpo e legal.' },
        { who: 'Sofia', en: 'It was cold and rainy, but we ___ happy.', pt: 'Estava frio e chuvoso, mas nós estávamos felizes.', gap: { answer: 'were', options: ['were', 'was', 'are'] } },
        { who: 'Sofia', en: 'The city was very interesting. There were many people there.', pt: 'A cidade era muito interessante. Tinha muita gente lá.' },
        { ask: 'Como era o hotel?', options: ['Pequeno, mas limpo', 'Grande e sujo', 'Caro e chato'], answer: 'Pequeno, mas limpo', why: '"Our hotel was small, but it was clean and nice".' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'You ___ very funny at the party!', pt: 'Você estava muito engraçado na festa!', options: ['were', 'was', 'are'], answer: 'were', why: 'Com you: were (singular ou plural).', wrong: { was: 'Com you é sempre "were".', are: 'Presente; a festa já passou.' } }),
      I(9, 2, { type: 'type', pt: 'Foi muito chato.', answer: 'It was very boring.', why: 'It + was + very boring.' }),
      I(9, 3, { type: 'meaning', en: 'Ten years ago, there was a park here.', options: ['Dez anos atrás, tinha um parque aqui.', 'Daqui a dez anos, vai ter um parque aqui.', 'Tem um parque aqui há dez anos.'], answer: 'Dez anos atrás, tinha um parque aqui.', why: '"Ago" = atrás. "There was" = tinha.' }),
      I(9, 4, { type: 'dictation', en: 'Were you at work yesterday?', why: 'Pergunta: Were + you...?' }),
      I(9, 5, { type: 'listen', en: "The tickets weren't expensive.", options: ['As passagens não estavam caras.', 'As passagens estavam caras.', 'A passagem não está cara.'], answer: 'As passagens não estavam caras.', why: '"Weren\'t" = não estavam (plural).' }),
      I(9, 6, { type: 'speak', en: 'My holiday was wonderful.', pt: 'Minhas férias foram maravilhosas.', why: '"Wonderful" soa como "UÂN-der-ful".' }),
    ]),
    L(10, 'História: de volta das férias', [
      I(10, 1, { type: 'story', why: 'O Tom voltou das férias e conta para a Ana como foi. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde o Tom estava?', options: ['Na praia, no Brasil', 'Em Londres', 'Na casa da avó'], answer: 'Na praia, no Brasil', why: '"I was at the beach in Brazil".' }),
      I(10, 3, { type: 'quiz', q: 'Como estava o tempo?', options: ['Ensolarado e quente', 'Frio', 'Chuvoso'], answer: 'Ensolarado e quente', why: '"It was sunny and hot every day".' }),
      I(10, 4, { type: 'quiz', q: 'O que foi ruim na viagem?', options: ['O avião', 'O hotel', 'A comida'], answer: 'O avião', why: '"The plane was terrible!".' }),
    ], {
      title: 'De volta das férias',
      lines: [
        { who: 'Ana', en: 'Tom! Welcome back! Where were you?', pt: 'Tom! Bem-vindo de volta! Onde você estava?' },
        { who: 'Tom', en: 'I was at the beach in Brazil for two weeks.', pt: 'Eu estava na praia, no Brasil, por duas semanas.' },
        { ask: 'Quanto tempo o Tom ficou?', options: ['Duas semanas', 'Dois dias', 'Um mês'], answer: 'Duas semanas', why: '"For two weeks".' },
        { who: 'Ana', en: 'Wow! How ___ the weather?', pt: 'Nossa! Como estava o tempo?', gap: { answer: 'was', options: ['was', 'were', 'is'] } },
        { who: 'Tom', en: 'It was sunny and hot every day. The hotel was great, too.', pt: 'Estava ensolarado e quente todo dia. O hotel também era ótimo.' },
        { who: 'Ana', en: 'And the trip?', pt: 'E a viagem?' },
        { who: 'Tom', en: 'The plane was terrible! There were three crying babies!', pt: 'O avião foi horrível! Tinha três bebês chorando!' },
        { who: 'Ana', en: 'Oh no! But the holiday was wonderful, right?', pt: 'Ah, não! Mas as férias foram maravilhosas, né?' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a1u16', level: 'A1', unlock: 'a1-u16', title: 'Como foi o fim de semana?',
  intro: 'No último episódio do A1, a Ana e o Tom contam como foi o fim de semana de cada um.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Hello!", pt: 'E eu sou o Tom. Olá!' },
    { who: 'ana', en: 'Tom, how was your weekend?', pt: 'Tom, como foi o seu fim de semana?' },
    { who: 'tom', en: "It was great! I was at my grandma's house with my family.", pt: 'Foi ótimo! Eu estava na casa da minha avó com minha família.' },
    { who: 'ana', en: 'Was the weather nice?', pt: 'O tempo estava bom?' },
    { who: 'tom', en: 'Yes, it was sunny. There were many birds and flowers.', pt: 'Sim, estava ensolarado. Tinha muitos pássaros e flores.' },
    { who: 'tom', en: 'And you, Ana? Where were you?', pt: 'E você, Ana? Onde você estava?' },
    { who: 'ana', en: "I was at home. I was sick on Saturday, but I was OK on Sunday.", pt: 'Eu estava em casa. Estava doente no sábado, mas fiquei bem no domingo.' },
    { who: 'tom', en: 'Oh no! I hope you are better now.', pt: 'Ah, não! Espero que você esteja melhor agora.' },
    { who: 'ana', en: "Yes, thank you! That's all for today. Thank you for listening!", pt: 'Sim, obrigada! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'Onde o Tom estava?', options: ['Na casa da avó, com a família', 'Na praia', 'Em casa'], answer: 'Na casa da avó, com a família', why: 'Ele diz que estava "at my grandma\'s house".' },
    { q: 'Como estava o tempo para o Tom?', options: ['Ensolarado', 'Chuvoso', 'Frio'], answer: 'Ensolarado', why: '"Yes, it was sunny".' },
    { q: 'O que aconteceu com a Ana no sábado?', options: ['Estava doente', 'Estava viajando', 'Estava trabalhando'], answer: 'Estava doente', why: '"I was sick on Saturday".' },
  ],
}, 'pod-a1u15');
addScene('a1-u16', 'standing-18', 'suitcase');
