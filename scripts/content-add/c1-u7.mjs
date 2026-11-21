// C1, etapa 2: unidade 7 — Falando por expressões (idioms do dia a dia).
// Gera src/content/c1/unit-07.json. Todas as lições levam "added".
// Uso: node scripts/content-add/c1-u7.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `c1-u7-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `c1u7l${n}-${k}`, ...o });

writeUnit('c1/unit-07.json', {
  id: 'c1-u7', level: 'C1', order: 7,
  title: 'Falando por expressões',
  subtitle: 'Idioms do dia a dia: a piece of cake, break the ice, call it a day, under the weather.',
  can_do: {
    text: 'Consigo entender e usar as expressões idiomáticas mais comuns do inglês, em conversas, séries e no trabalho.',
    source: 'CEFR (Conselho da Europa) — Compreensão e produção: expressões idiomáticas e coloquiais, nível C1',
  },
  core_inventory: ['Vocabulary: common idioms (a piece of cake, break the ice)', 'Vocabulary: work idioms (call it a day, on the same page, the ball is in your court)', 'Vocabulary: feelings and health (under the weather, over the moon)', 'Functions: recognising idioms in films and series'],
  words: [
    ['a piece of cake', 'moleza, muito fácil'],
    ['break the ice', 'quebrar o gelo'],
    ['call it a day', 'encerrar por hoje'],
    ['under the weather', 'meio doente, indisposto'],
    ['over the moon', 'nas nuvens, muito feliz'],
    ['cost an arm and a leg', 'custar os olhos da cara'],
    ['on the same page', 'na mesma página, de acordo'],
    ['once in a blue moon', 'muito raramente'],
    ['hit the nail on the head', 'acertar em cheio'],
    ['the ball is in your court', 'a bola está com você'],
  ],
  guide: {
    title: 'Expressões que não dá para traduzir ao pé da letra',
    intro: 'Idioms são expressões cujo sentido não sai das palavras. "A piece of cake" não é um pedaço de bolo, é "moleza". Os nativos usam isso o tempo todo, e muitas têm um equivalente em português.',
    points: [
      { en: 'The test was a piece of cake.', pt: 'A prova foi moleza.', note: 'Algo muito fácil.' },
      { en: 'She told a joke to break the ice.', pt: 'Ela contou uma piada para quebrar o gelo.', note: 'Igualzinho ao português!' },
      { en: "It's late. Let's call it a day.", pt: 'Está tarde. Vamos encerrar por hoje.', note: 'Parar de trabalhar.' },
      { en: "I'm feeling a bit under the weather.", pt: 'Estou meio indisposto.', note: 'Levemente doente.' },
      { en: 'That car cost an arm and a leg.', pt: 'Aquele carro custou os olhos da cara.', note: 'No inglês é "um braço e uma perna".' },
      { en: 'We only eat out once in a blue moon.', pt: 'A gente só come fora muito de vez em quando.', note: '"Blue moon" é rara, então: quase nunca.' },
    ],
    tips: ['Não exagere: um ou dois idioms numa conversa soam naturais; dez soam forçados.', 'Ao ver uma série, repare: idioms aparecem em quase toda cena.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Moleza!', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: "Don't worry, the exam was ___.", pt: 'Não se preocupe, a prova foi moleza.', options: ['a piece of cake', 'a piece of bread', 'a cake of piece'], answer: 'a piece of cake', why: '"A piece of cake" = moleza, muito fácil.', wrong: { 'a piece of bread': 'Não é a expressão.', 'a cake of piece': 'Ordem errada.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'Nobody was talking, so I told a joke to ___.', pt: 'Ninguém falava, então contei uma piada para quebrar o gelo.', options: ['break the ice', 'break a leg', 'cut the ice'], answer: 'break the ice', why: '"Break the ice" = quebrar o gelo.', wrong: { 'break a leg': '"Break a leg" = boa sorte (no teatro).', 'cut the ice': 'Não se usa assim.' } }),
      I(1, 3, { type: 'meaning', en: 'Fixing the computer was a piece of cake for him.', options: ['Consertar o computador foi moleza para ele.', 'Ele comeu bolo enquanto consertava.', 'Ele não conseguiu consertar.'], answer: 'Consertar o computador foi moleza para ele.', why: 'Idiom: muito fácil.' }),
      I(1, 4, { type: 'build', pt: 'Vamos fazer um jogo para quebrar o gelo.', answer: "Let's play a game to break the ice", extra: ['broke', 'cold'], display: "Let's play a game to break the ice.", why: '"Break the ice" = quebrar o gelo.' }),
      I(1, 5, { type: 'listen', en: 'Good luck tonight. Break a leg!', options: ['Boa sorte hoje à noite!', 'Cuidado para não se machucar!', 'Não vá hoje à noite!'], answer: 'Boa sorte hoje à noite!', why: '"Break a leg" = boa sorte (antes de uma apresentação).' }),
      I(1, 6, { type: 'match', pairs: [['a piece of cake', 'moleza'], ['break the ice', 'quebrar o gelo'], ['break a leg', 'boa sorte'], ['once in a blue moon', 'muito raramente']], why: 'Expressões que não se traduzem palavra por palavra.' }),
    ]),
    L(2, 'Expressões do trabalho', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: "We've done enough for today. Let's ___.", pt: 'Já fizemos o suficiente por hoje. Vamos encerrar.', options: ['call it a day', 'call it a night day', 'make a day'], answer: 'call it a day', why: '"Call it a day" = encerrar por hoje.', wrong: { 'call it a night day': 'Não existe.', 'make a day': 'Não é a expressão.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "Before we start, let's make sure we're all ___.", pt: 'Antes de começar, vamos garantir que estamos todos de acordo.', options: ['on the same page', 'in the same book', 'on the same side'], answer: 'on the same page', why: '"On the same page" = de acordo, alinhados.', wrong: { 'in the same book': 'Não é a expressão.', 'on the same side': 'Seria "do mesmo lado", outra ideia.' } }),
      I(2, 3, { type: 'meaning', en: "I've sent my offer. Now the ball is in your court.", options: ['Mandei a minha proposta. Agora é com você.', 'Vamos jogar bola amanhã.', 'Não vou mandar proposta.'], answer: 'Mandei a minha proposta. Agora é com você.', why: '"The ball is in your court" = agora a decisão é sua.' }),
      I(2, 4, { type: 'build', pt: 'Você acertou em cheio.', answer: 'You hit the nail on the head', extra: ['nails', 'heads'], display: 'You hit the nail on the head.', why: '"Hit the nail on the head" = acertar em cheio.' }),
      I(2, 5, { type: 'listen', en: "It's six o'clock. Let's call it a day.", options: ['São seis horas. Vamos parar por hoje.', 'São seis horas. Vamos começar.', 'Vamos trabalhar a noite toda.'], answer: 'São seis horas. Vamos parar por hoje.', why: '"Call it a day" = encerrar o dia de trabalho.' }),
      I(2, 6, { type: 'speak', en: "Let's make sure we're on the same page.", pt: 'Vamos garantir que estamos alinhados.', why: 'Muito usado em reuniões.' }),
    ]),
    L(3, 'Como você está?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "I'm not going out tonight. I feel a bit ___.", pt: 'Não vou sair hoje à noite. Estou meio indisposto.', options: ['under the weather', 'over the weather', 'under the rain'], answer: 'under the weather', why: '"Under the weather" = meio doente.', wrong: { 'over the weather': 'Não existe.', 'under the rain': 'Seria literal: debaixo de chuva.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'She got the job and she is ___.', pt: 'Ela conseguiu o emprego e está nas nuvens.', options: ['over the moon', 'under the moon', 'on the moon'], answer: 'over the moon', why: '"Over the moon" = muito feliz.', wrong: { 'under the moon': 'Não existe.', 'on the moon': 'Seria literal: na Lua.' } }),
      I(3, 3, { type: 'meaning', en: "I'm feeling under the weather, so I'll work from home.", options: ['Estou meio indisposto, então vou trabalhar de casa.', 'Está chovendo, então vou trabalhar de casa.', 'Estou ótimo e vou ao escritório.'], answer: 'Estou meio indisposto, então vou trabalhar de casa.', why: 'Nada a ver com o tempo: é saúde.' }),
      I(3, 4, { type: 'build', pt: 'Meus pais ficaram nas nuvens com a notícia.', answer: 'My parents were over the moon about the news', extra: ['on', 'was'], display: 'My parents were over the moon about the news.', why: '"Over the moon" = muito feliz.' }),
      I(3, 5, { type: 'listen', en: 'I was over the moon when I passed.', options: ['Fiquei nas nuvens quando passei.', 'Fiquei triste quando passei.', 'Não passei na prova.'], answer: 'Fiquei nas nuvens quando passei.', why: '"Over the moon" = radiante.' }),
      I(3, 6, { type: 'match', pairs: [['under the weather', 'indisposto'], ['over the moon', 'nas nuvens'], ['call it a day', 'encerrar por hoje'], ['on the same page', 'de acordo']], why: 'Expressões de sentimento e de trabalho.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', "You don't look very well. Are you OK?"], ['B', '___']], options: ["I'm a bit under the weather. I think I'll call it a day.", "I'm a bit under the rain. I call the day.", "I'm over the weather. Day call."], answer: "I'm a bit under the weather. I think I'll call it a day.", pt: 'Estou meio indisposto. Acho que vou encerrar por hoje.', why: 'Duas expressões juntas, bem natural.', wrong: { "I'm a bit under the rain. I call the day.": 'Expressões erradas.', "I'm over the weather. Day call.": 'Expressão errada e frase quebrada.' } }),
    ]),
    L(4, 'Prática: dinheiro e frequência', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'The concert tickets ___.', pt: 'Os ingressos do show custaram os olhos da cara.', options: ['cost an arm and a leg', 'cost the eyes of the face', 'cost a head'], answer: 'cost an arm and a leg', why: 'No inglês é "um braço e uma perna".', wrong: { 'cost the eyes of the face': 'Tradução literal do português: não existe em inglês.', 'cost a head': 'Não é a expressão.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'We go to the theatre ___.', pt: 'A gente vai ao teatro muito de vez em quando.', options: ['once in a blue moon', 'once a moon', 'in a blue day'], answer: 'once in a blue moon', why: '"Once in a blue moon" = muito raramente.', wrong: { 'once a moon': 'Não existe.', 'in a blue day': 'Não existe.' } }),
      I(4, 3, { type: 'meaning', en: 'Stop beating around the bush and tell me the truth.', options: ['Pare de enrolar e me conte a verdade.', 'Pare de bater no arbusto.', 'Conte a verdade amanhã.'], answer: 'Pare de enrolar e me conte a verdade.', why: '"Beat around the bush" = enrolar, fazer rodeios.' }),
      I(4, 4, { type: 'build', pt: 'Aquele celular custa os olhos da cara.', answer: 'That phone costs an arm and a leg', extra: ['eyes', 'cost'], display: 'That phone costs an arm and a leg.', why: 'Com "that phone": costs.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Do you still go to the beach a lot?'], ['B', '___']], options: ['Not really. Only once in a blue moon now.', 'Not really. Only one blue moon.', 'Not really. Moon blue once.'], answer: 'Not really. Only once in a blue moon now.', pt: 'Não muito. Só muito de vez em quando agora.', why: '"Once in a blue moon" = quase nunca.', wrong: { 'Not really. Only one blue moon.': 'Expressão incompleta.', 'Not really. Moon blue once.': 'Ordem errada.' } }),
      I(4, 6, { type: 'listen', en: "Don't beat around the bush.", options: ['Não enrole.', 'Não corte as plantas.', 'Não fale alto.'], answer: 'Não enrole.', why: '"Beat around the bush" = fazer rodeios.' }),
      I(4, 7, { type: 'speak', en: 'It cost an arm and a leg!', pt: 'Custou os olhos da cara!', why: 'Fale com emoção: é uma reclamação.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Foi moleza.', answer: 'It was a piece of cake.', accept: ['It was a piece of cake'], why: '"A piece of cake" = moleza.' }),
      I(5, 2, { type: 'type', pt: 'Vamos encerrar por hoje.', answer: "Let's call it a day.", accept: ['Let us call it a day.'], why: '"Call it a day" = encerrar por hoje.' }),
      I(5, 3, { type: 'dictation', en: 'She was over the moon.', why: '"Over the moon" = nas nuvens.' }),
      I(5, 4, { type: 'type', pt: 'Estou meio indisposto hoje.', answer: "I'm a bit under the weather today.", accept: ["I'm feeling a bit under the weather today.", 'I am a bit under the weather today.', "I'm under the weather today."], why: '"Under the weather" = indisposto.' }),
      I(5, 5, { type: 'dictation', en: 'Now the ball is in your court.', why: '"The ball is in your court" = agora é com você.' }),
      I(5, 6, { type: 'type', pt: 'Você acertou em cheio.', answer: 'You hit the nail on the head.', accept: ['You hit the nail on the head'], why: '"Hit the nail on the head" = acertar em cheio.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Learning to drive was a piece of cake.', options: ['Aprender a dirigir foi moleza.', 'Aprender a dirigir foi difícil.', 'Ainda não sei dirigir.'], answer: 'Aprender a dirigir foi moleza.', why: '"A piece of cake" = moleza.' }),
      I(6, 2, { type: 'dictation', en: 'Are we on the same page?', why: '"On the same page" = de acordo.' }),
      I(6, 3, { type: 'listen', en: 'I only see my cousins once in a blue moon.', options: ['Só vejo os meus primos muito de vez em quando.', 'Vejo os meus primos toda semana.', 'Moro com os meus primos.'], answer: 'Só vejo os meus primos muito de vez em quando.', why: '"Once in a blue moon" = quase nunca.' }),
      I(6, 4, { type: 'dictation', en: "Let's call it a day.", why: '"Call it a day" = encerrar.' }),
      I(6, 5, { type: 'listen', en: 'That restaurant costs an arm and a leg.', options: ['Aquele restaurante custa os olhos da cara.', 'Aquele restaurante é barato.', 'Aquele restaurante fechou.'], answer: 'Aquele restaurante custa os olhos da cara.', why: 'Cost an arm and a leg = muito caro.' }),
      I(6, 6, { type: 'dictation', en: 'Stop beating around the bush.', why: '"Beat around the bush" = enrolar.' }),
      I(6, 7, { type: 'speak', en: 'You hit the nail on the head!', pt: 'Você acertou em cheio!', why: 'Ótimo para concordar com entusiasmo.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'How was the job interview?'], ['B', '___']], options: ["Better than I expected! The first questions were a piece of cake.", "Better! The first questions were a cake piece.", "Better. Piece cake questions."], answer: 'Better than I expected! The first questions were a piece of cake.', pt: 'Melhor do que eu esperava! As primeiras perguntas foram moleza.', why: '"A piece of cake" = moleza.', wrong: { 'Better! The first questions were a cake piece.': 'Ordem errada.', 'Better. Piece cake questions.': 'Incompleto.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Were you nervous?'], ['B', '___']], options: ["At first, but the manager told a joke to break the ice.", "At first, but the manager broke the ice cream.", "At first, ice break manager."], answer: 'At first, but the manager told a joke to break the ice.', pt: 'No começo, mas o gerente contou uma piada para quebrar o gelo.', why: '"Break the ice".', wrong: { 'At first, but the manager broke the ice cream.': '"Ice cream" é sorvete!', 'At first, ice break manager.': 'Ordem errada.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Did they make an offer?'], ['B', '___']], options: ["Yes! Now the ball is in my court. I need to decide by Friday.", "Yes! Now the ball is in my house.", "Yes! Ball court my."], answer: 'Yes! Now the ball is in my court. I need to decide by Friday.', pt: 'Sim! Agora é comigo. Preciso decidir até sexta.', why: '"The ball is in my court" = a decisão é minha.', wrong: { 'Yes! Now the ball is in my house.': 'Não é a expressão.', 'Yes! Ball court my.': 'Ordem errada.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', "That's amazing! You must be over the moon."], ['B', '___']], options: ["I am! But the salary isn't great, and rent here costs an arm and a leg.", "I am! But salary bad, rent costs eyes.", "I am! Rent arm leg."], answer: "I am! But the salary isn't great, and rent here costs an arm and a leg.", pt: 'Estou! Mas o salário não é ótimo, e o aluguel aqui custa os olhos da cara.', why: '"Cost an arm and a leg".', wrong: { 'I am! But salary bad, rent costs eyes.': 'Tradução literal do português.', 'I am! Rent arm leg.': 'Incompleto.' } }),
      I(7, 5, { type: 'speak', en: 'The ball is in your court.', pt: 'A bola está com você.', why: 'Use quando a decisão é da outra pessoa.' }),
      I(7, 6, { type: 'speak', en: "I'm a bit under the weather.", pt: 'Estou meio indisposto.', why: 'Jeito leve de dizer que não está bem.' }),
    ]),
    L(8, 'Lendo: o diário de uma intercambista', [
      I(8, 1, { type: 'story', why: 'A Bruna escreve no diário sobre a primeira semana de intercâmbio, cheia de expressões que ela aprendeu. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Como foi a primeira aula?', options: ['Difícil no começo, mas uma colega quebrou o gelo', 'Moleza desde o início', 'Ela não foi'], answer: 'Difícil no começo, mas uma colega quebrou o gelo', why: '"A girl called Emma broke the ice."' }),
      I(8, 3, { type: 'quiz', q: 'O que a Bruna acha dos preços?', options: ['Tudo custa os olhos da cara', 'Tudo é barato', 'Os preços são normais'], answer: 'Tudo custa os olhos da cara', why: '"Everything costs an arm and a leg."' }),
      I(8, 4, { type: 'quiz', q: 'Como a Bruna está se sentindo?', options: ['Nas nuvens', 'Triste', 'Doente'], answer: 'Nas nuvens', why: '"I am over the moon."' }),
    ], {
      title: 'O diário de uma intercambista',
      lines: [
        { who: 'Bruna', en: 'Day one: the first class was hard. Nobody talked to me.', pt: 'Dia um: a primeira aula foi difícil. Ninguém falou comigo.' },
        { who: 'Bruna', en: 'Then a girl called Emma broke the ice. She asked about Brazil, and we talked for an hour!', pt: 'Aí uma menina chamada Emma quebrou o gelo. Ela perguntou do Brasil, e conversamos por uma hora!' },
        { ask: 'Quem quebrou o gelo?', options: ['Emma', 'O professor', 'A própria Bruna'], answer: 'Emma', why: '"A girl called Emma broke the ice."' },
        { who: 'Bruna', en: 'The only problem: everything here costs an arm and a ___.', pt: 'O único problema: tudo aqui custa os olhos da cara.', gap: { answer: 'leg', options: ['leg', 'head', 'eye'] } },
        { who: 'Bruna', en: 'I eat out only once in a blue moon. I cook pasta almost every night.', pt: 'Só como fora muito de vez em quando. Cozinho macarrão quase toda noite.' },
        { who: 'Bruna', en: 'But I am over the moon. This was the best decision of my life.', pt: 'Mas estou nas nuvens. Essa foi a melhor decisão da minha vida.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Qual NÃO existe em inglês?', en: '___', pt: 'Escolha a expressão inventada.', options: ['It cost the eyes of the face.', 'It cost an arm and a leg.', 'It was a piece of cake.'], answer: 'It cost the eyes of the face.', why: '"The eyes of the face" é tradução literal do português.', wrong: { 'It cost an arm and a leg.': 'Existe: muito caro.', 'It was a piece of cake.': 'Existe: moleza.' } }),
      I(9, 2, { type: 'type', pt: 'Estou nas nuvens!', answer: "I'm over the moon!", accept: ['I am over the moon!', "I'm over the moon."], why: '"Over the moon" = muito feliz.' }),
      I(9, 3, { type: 'meaning', en: 'We need to make sure everyone is on the same page.', options: ['Precisamos garantir que todos estão alinhados.', 'Todos precisam ler a mesma página.', 'Ninguém concorda.'], answer: 'Precisamos garantir que todos estão alinhados.', why: '"On the same page" = alinhados.' }),
      I(9, 4, { type: 'dictation', en: 'It was a piece of cake.', why: '"A piece of cake" = moleza.' }),
      I(9, 5, { type: 'listen', en: 'Break a leg tonight!', options: ['Boa sorte hoje à noite!', 'Cuidado com a perna!', 'Não vá hoje!'], answer: 'Boa sorte hoje à noite!', why: '"Break a leg" = boa sorte.' }),
      I(9, 6, { type: 'build', pt: 'Ela só liga muito de vez em quando.', answer: 'She only calls once in a blue moon', extra: ['call', 'moons'], display: 'She only calls once in a blue moon.', why: '"Once in a blue moon" = muito raramente.' }),
    ]),
    L(10, 'História: a apresentação do Caio', [
      I(10, 1, { type: 'story', why: 'O Caio tem a primeira apresentação em inglês no trabalho e conversa com a colega antes e depois. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que a colega deseja ao Caio antes da apresentação?', options: ['Boa sorte', 'Que ele desista', 'Que ele fale rápido'], answer: 'Boa sorte', why: '"Break a leg!" = boa sorte.' }),
      I(10, 3, { type: 'quiz', q: 'Como o Caio quebrou o gelo?', options: ['Com uma piada', 'Com um vídeo', 'Com um café'], answer: 'Com uma piada', why: '"I started with a joke to break the ice."' }),
      I(10, 4, { type: 'quiz', q: 'Como o Caio se sente no fim?', options: ['Nas nuvens', 'Indisposto', 'Arrependido'], answer: 'Nas nuvens', why: '"I\'m over the moon!"' }),
    ], {
      title: 'A apresentação do Caio',
      lines: [
        { who: 'Caio', en: "I'm so nervous. It's my first presentation in English.", pt: 'Estou tão nervoso. É a minha primeira apresentação em inglês.' },
        { who: 'Lara', en: "You'll be fine. You know the topic. Break a leg!", pt: 'Você vai se sair bem. Você conhece o tema. Boa sorte!' },
        { who: 'Caio', en: 'Thanks! I hope it is a piece of cake.', pt: 'Valeu! Espero que seja moleza.' },
        { ask: 'Como o Caio está antes da apresentação?', options: ['Nervoso', 'Tranquilo', 'Doente'], answer: 'Nervoso', why: '"I\'m so nervous."' },
        { who: 'Lara', en: 'So? How did it go?', pt: 'E aí? Como foi?' },
        { who: 'Caio', en: 'Great! I started with a joke to break the ___, and everyone laughed.', pt: 'Ótimo! Comecei com uma piada para quebrar o gelo, e todo mundo riu.', gap: { answer: 'ice', options: ['ice', 'leg', 'cake'] } },
        { who: 'Caio', en: "The director said I hit the nail on the head. I'm over the moon!", pt: 'O diretor disse que eu acertei em cheio. Estou nas nuvens!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-c1u7', level: 'C1', unlock: 'c1-u7', title: 'Nada de pé da letra',
  intro: 'A Ana e o Tom contam as expressões que mais confundem quem aprende inglês.',
  lines: [
    { who: 'ana', en: 'Tom, what was the first idiom that confused you in Portuguese?', pt: 'Tom, qual foi a primeira expressão que te confundiu em português?' },
    { who: 'tom', en: 'Someone said a phone cost "the eyes of the face". I was really worried!', pt: 'Alguém disse que um celular custou "os olhos da cara". Fiquei muito preocupado!' },
    { who: 'ana', en: 'Ha! In English, we say it cost an arm and a leg. Not much better!', pt: 'Rá! Em inglês dizemos que custou um braço e uma perna. Não é muito melhor!' },
    { who: 'tom', en: 'Some are almost the same, like "break the ice". That one is a piece of cake.', pt: 'Algumas são quase iguais, como "quebrar o gelo". Essa é moleza.' },
    { who: 'ana', en: 'But others are totally different. "Under the weather" has nothing to do with rain.', pt: 'Mas outras são totalmente diferentes. "Under the weather" não tem nada a ver com chuva.' },
    { who: 'tom', en: 'My advice: learn them in context, from films and series. Not from long lists.', pt: 'Meu conselho: aprendam no contexto, com filmes e séries. Não com listas enormes.' },
    { who: 'ana', en: 'And use them once in a while, not in every sentence!', pt: 'E usem de vez em quando, não em toda frase!' },
    { who: 'tom', en: "On that note, let's call it a day. Bye!", pt: 'Com isso, vamos encerrar por hoje. Tchau!' },
  ],
  questions: [
    { q: 'Que expressão em português confundiu o Tom?', options: ['Custar os olhos da cara', 'Quebrar o gelo', 'Estar nas nuvens'], answer: 'Custar os olhos da cara', why: '"Someone said a phone cost the eyes of the face."' },
    { q: 'Qual expressão é quase igual nas duas línguas?', options: ['Break the ice', 'Under the weather', 'A piece of cake'], answer: 'Break the ice', why: '"Some are almost the same, like break the ice."' },
    { q: 'Qual é o conselho do Tom?', options: ['Aprender com filmes e séries', 'Decorar listas enormes', 'Nunca usar idioms'], answer: 'Aprender com filmes e séries', why: '"Learn them in context, from films and series."' },
  ],
}, 'pod-c1u6');
addScene('c1-u7', 'standing-10', 'popcorn');
