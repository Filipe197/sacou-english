// Etapa 3 do B1 completo: unidade nova 16 — Quem me dera… (wish + passado, if only). Fecha o B1.
// Gera src/content/b1/unit-16.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u16.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u16-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u16l${n}-${k}`, ...o });

writeUnit('b1/unit-16.json', {
  id: 'b1-u16', level: 'B1', order: 16,
  title: 'Quem me dera…',
  subtitle: 'Wish e if only: desejos sobre o presente.',
  can_do: {
    text: 'Consigo expressar desejos e pequenos arrependimentos sobre a minha vida agora e falar de sonhos.',
    source: 'CEFR (Conselho da Europa) — Produção oral: expressar desejos, sonhos e sentimentos, nível B1',
  },
  core_inventory: ['Grammar: wish + past simple (present wishes)', 'Grammar: wish + could', 'Grammar: if only + past simple', 'Grammar: I wish I were (formal) / was (informal)'],
  words: [
    ['wish', 'desejar, queria que'],
    ['if only', 'se ao menos, quem me dera'],
    ['fluent', 'fluente'],
    ['talent', 'talento'],
    ['instrument', 'instrumento (musical)'],
    ['afford', 'ter dinheiro para'],
    ['lucky', 'sortudo(a), com sorte'],
    ['regret', 'se arrepender'],
    ['complain', 'reclamar'],
    ['dream', 'sonho, sonhar'],
    ['free time', 'tempo livre'],
    ['abroad', 'no exterior'],
  ],
  guide: {
    title: 'Quem me dera: desejos sobre o presente',
    intro: 'Para dizer que você queria que algo fosse diferente AGORA, o inglês usa "wish" + passado. Parece estranho, mas o passado aqui mostra que é só um desejo, não a realidade.',
    points: [
      { en: 'I wish I had more free time.', pt: 'Queria ter mais tempo livre. (mas não tenho)', note: 'Wish + passado simples (had) para um desejo sobre agora.' },
      { en: 'I wish I were taller.', pt: 'Queria ser mais alto.', note: 'Com "be", o mais correto é "were" para todos. No dia a dia muita gente diz "was".' },
      { en: 'I wish I could speak French.', pt: 'Queria saber falar francês.', note: '"Wish + could" = queria conseguir, queria poder.' },
      { en: 'If only it were Friday!', pt: 'Quem me dera fosse sexta!', note: '"If only" = se ao menos, quem me dera. Mais forte que "I wish".' },
      { en: 'She wishes she lived near the beach.', pt: 'Ela queria morar perto da praia.', note: 'Com she: wishes (com -es) + passado.' },
      { en: "I wish I didn't have to work today.", pt: 'Queria não precisar trabalhar hoje.', note: 'Desejo negativo: wish + didn\'t.' },
    ],
    tips: ['Erro comum: "I wish I have a car". Depois de "wish", passado: I wish I HAD a car.', '"I hope" é para algo possível no futuro (I hope you pass). "I wish" é para algo que não é real agora.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Queria ter…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'I wish I ___ a car.', pt: 'Queria ter um carro.', options: ['had', 'have', 'will have'], answer: 'had', why: 'Wish + passado simples para um desejo sobre agora.', wrong: { have: 'Depois de "wish", use o passado: had.', 'will have': '"Will" não vem depois de "wish" aqui.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'I wish I ___ near the beach.', pt: 'Queria morar perto da praia.', options: ['lived', 'live', 'living'], answer: 'lived', why: 'Wish + passado: lived.', wrong: { live: 'Precisa do passado.', living: 'Precisa do passado.' } }),
      I(1, 3, { type: 'meaning', en: 'I wish I had more free time.', options: ['Queria ter mais tempo livre.', 'Tenho muito tempo livre.', 'Tive tempo livre ontem.'], answer: 'Queria ter mais tempo livre.', why: '"I wish I had" = queria ter (mas não tenho).' }),
      I(1, 4, { type: 'build', pt: 'Ela queria ter um cachorro.', answer: 'She wishes she had a dog', extra: ['wish', 'has'], display: 'She wishes she had a dog.', why: 'Com she: wishes. Depois, passado: had.' }),
      I(1, 5, { type: 'listen', en: 'I wish I knew the answer.', options: ['Queria saber a resposta.', 'Eu sei a resposta.', 'Eu sabia a resposta ontem.'], answer: 'Queria saber a resposta.', why: '"I wish I knew" = queria saber.' }),
      I(1, 6, { type: 'match', pairs: [['wish', 'desejar'], ['if only', 'quem me dera'], ['fluent', 'fluente'], ['talent', 'talento']], why: '"Fluent in English" = fluente em inglês.' }),
    ]),
    L(2, 'Queria ser, queria conseguir', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'I wish I ___ taller.', pt: 'Queria ser mais alto.', options: ['were', 'am', 'be'], answer: 'were', why: 'Com "be", use "were" (ou "was", informal).', wrong: { am: 'Depois de "wish", passado.', be: 'Precisa do passado.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'I wish I ___ speak French.', pt: 'Queria saber falar francês.', options: ['could', 'can', 'will'], answer: 'could', why: '"Wish + could" = queria conseguir.', wrong: { can: 'Depois de "wish", o passado de can: could.', will: '"Will" não funciona aqui.' } }),
      I(2, 3, { type: 'meaning', en: 'I wish I could play an instrument.', options: ['Queria saber tocar um instrumento.', 'Eu toco vários instrumentos.', 'Vou aprender um instrumento.'], answer: 'Queria saber tocar um instrumento.', why: '"I wish I could" = queria conseguir.' }),
      I(2, 4, { type: 'build', pt: 'Queria ser fluente em inglês.', answer: 'I wish I were fluent in English', extra: ['am', 'on'], display: 'I wish I were fluent in English.', why: '"Were" depois de wish. "Fluent in" = fluente em.' }),
      I(2, 5, { type: 'listen', en: 'He wishes he could travel abroad.', options: ['Ele queria poder viajar para o exterior.', 'Ele viaja muito para o exterior.', 'Ele vai viajar amanhã.'], answer: 'Ele queria poder viajar para o exterior.', why: '"Could travel" = poder viajar.' }),
      I(2, 6, { type: 'speak', en: 'I wish I could sing.', pt: 'Queria saber cantar.', why: '"Wish" soa como "UÍX".' }),
    ]),
    L(3, 'If only!', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'If only it ___ Friday!', pt: 'Quem me dera fosse sexta!', options: ['were', 'is', 'will be'], answer: 'were', why: '"If only" + passado, como "wish".', wrong: { is: 'Precisa do passado.', 'will be': 'Não funciona aqui.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "If only I ___ afford that house.", pt: 'Se ao menos eu pudesse pagar aquela casa.', options: ['could', 'can', 'would'], answer: 'could', why: '"If only I could" = se ao menos eu pudesse.', wrong: { can: 'Precisa do passado: could.', would: '"I would afford" não forma o desejo.' } }),
      I(3, 3, { type: 'meaning', en: 'If only I had more money!', options: ['Se ao menos eu tivesse mais dinheiro!', 'Eu tenho dinheiro de sobra.', 'Ganhei dinheiro ontem.'], answer: 'Se ao menos eu tivesse mais dinheiro!', why: '"If only" = se ao menos.' }),
      I(3, 4, { type: 'build', pt: 'Quem me dera não estivesse chovendo.', answer: "If only it wasn't raining", extra: ['isn\'t', 'will'], display: "If only it wasn't raining!", why: '"If only" + passado (wasn\'t raining).' }),
      I(3, 5, { type: 'listen', en: 'If only I were on holiday!', options: ['Quem me dera estar de férias!', 'Estou de férias!', 'Vou sair de férias.'], answer: 'Quem me dera estar de férias!', why: '"On holiday" = de férias.' }),
      I(3, 6, { type: 'match', pairs: [['afford', 'poder pagar'], ['lucky', 'sortudo'], ['instrument', 'instrumento'], ['abroad', 'no exterior']], why: '"You\'re so lucky!" = que sorte a sua!' }),
      I(3, 7, { type: 'choice', prompt: 'Qual usa o verbo certo?', en: '___', pt: 'Queria que você estivesse aqui.', options: ['I wish you were here.', 'I wish you are here.', 'I wish you will be here.'], answer: 'I wish you were here.', why: 'Wish + passado: were.', wrong: { 'I wish you are here.': 'Depois de "wish", passado.', 'I wish you will be here.': '"Will" não funciona aqui.' } }),
    ]),
    L(4, 'Prática: wish ou hope?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ you pass the exam tomorrow!', pt: 'Espero que você passe na prova amanhã!', options: ['hope', 'wish', 'regret'], answer: 'hope', why: 'Para algo possível no futuro: hope.', wrong: { wish: '"Wish" é para algo que não é real agora.', regret: '"Regret" = se arrepender.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'I ___ I had a sister.', pt: 'Queria ter uma irmã.', options: ['wish', 'hope', 'want'], answer: 'wish', why: 'Desejo irreal sobre agora: wish + passado.', wrong: { hope: '"Hope" é para algo possível.', want: '"I want I had" não existe.' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: "I wish I ___ have to work today.", pt: 'Queria não precisar trabalhar hoje.', options: ["didn't", "don't", "won't"], answer: "didn't", why: 'Desejo negativo: wish + didn\'t.', wrong: { "don't": 'Precisa do passado.', "won't": 'Não funciona aqui.' } }),
      I(4, 4, { type: 'meaning', en: "You're so lucky! I wish I had your talent.", options: ['Que sorte a sua! Queria ter o seu talento.', 'Você tem azar. Eu tenho talento.', 'Você me deu sorte.'], answer: 'Que sorte a sua! Queria ter o seu talento.', why: '"Lucky" = sortudo. "Talent" = talento.' }),
      I(4, 5, { type: 'build', pt: 'Espero que você goste do presente.', answer: 'I hope you like the present', extra: ['wish', 'liked'], display: 'I hope you like the present.', why: 'Algo possível: hope + presente.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', "I'm so tired of the rain."], ['B', '___']], options: ['Me too. I wish it were summer.', 'Me too. I wish it is summer.', 'Me too. I hope it were summer.'], answer: 'Me too. I wish it were summer.', pt: 'Eu também. Queria que fosse verão.', why: 'Desejo irreal: wish + were.', wrong: { 'Me too. I wish it is summer.': 'Depois de "wish", passado.', 'Me too. I hope it were summer.': '"Hope" não vai com passado assim.' } }),
      I(4, 7, { type: 'listen', en: 'Do you ever wish you lived in another country?', options: ['Você às vezes queria morar em outro país?', 'Você já morou em outro país?', 'Você vai se mudar de país?'], answer: 'Você às vezes queria morar em outro país?', why: '"Do you ever wish" = você às vezes deseja.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Queria ter um carro.', answer: 'I wish I had a car.', why: 'Depois de wish, passado: had.' }),
      I(5, 2, { type: 'type', pt: 'Queria saber nadar.', answer: 'I wish I could swim.', why: '"Wish + could" = queria conseguir.' }),
      I(5, 3, { type: 'dictation', en: 'If only it were Friday!', why: '"If only" = quem me dera.' }),
      I(5, 4, { type: 'type', pt: 'Queria que você estivesse aqui.', answer: 'I wish you were here.', accept: ['I wish you was here.'], why: 'Depois de wish, "were" (ou "was", informal).' }),
      I(5, 5, { type: 'dictation', en: 'She wishes she had more time.', why: 'She wishes (com -es).' }),
      I(5, 6, { type: 'type', pt: 'Espero que você venha.', answer: 'I hope you come.', accept: ['I hope you will come.', "I hope you'll come."], why: 'Algo possível: hope.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "I wish I didn't live so far from work.", options: ['Queria não morar tão longe do trabalho.', 'Moro perto do trabalho.', 'Vou me mudar para perto.'], answer: 'Queria não morar tão longe do trabalho.', why: '"Didn\'t live" = não morasse.' }),
      I(6, 2, { type: 'dictation', en: 'I wish I were fluent.', why: '"Fluent" = fluente.' }),
      I(6, 3, { type: 'listen', en: 'If only we could stay longer!', options: ['Se ao menos pudéssemos ficar mais!', 'Vamos ficar mais tempo.', 'Não podemos ficar.'], answer: 'Se ao menos pudéssemos ficar mais!', why: '"If only we could" = se ao menos pudéssemos.' }),
      I(6, 4, { type: 'dictation', en: 'He wishes he could play the guitar.', why: '"Play the guitar" = tocar violão.' }),
      I(6, 5, { type: 'listen', en: 'I hope it doesn\'t rain tomorrow.', options: ['Espero que não chova amanhã.', 'Queria que chovesse.', 'Choveu ontem.'], answer: 'Espero que não chova amanhã.', why: '"Hope" = espero (algo possível).' }),
      I(6, 6, { type: 'dictation', en: 'You are so lucky!', why: '"Lucky" = sortudo.' }),
      I(6, 7, { type: 'speak', en: 'I wish I had more free time.', pt: 'Queria ter mais tempo livre.', why: 'Frase que todo mundo usa!' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "I'm going to Italy next month!"], ['B', '___']], options: ["Lucky you! I wish I could go too.", 'Lucky you! I wish I can go too.', 'Lucky you! I hope I could go.'], answer: 'Lucky you! I wish I could go too.', pt: 'Que sorte! Queria poder ir também.', why: '"Lucky you!" = que sorte! "Wish + could".', wrong: { 'Lucky you! I wish I can go too.': 'Depois de "wish": could.', 'Lucky you! I hope I could go.': '"Hope" + could não forma o desejo.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Do you speak Italian?'], ['B', '___']], options: ['No. I wish I did!', 'No. I wish I do!', 'No. I hope I did!'], answer: 'No. I wish I did!', pt: 'Não. Bem que eu queria!', why: 'Resposta curta: I wish I did (= I wish I spoke Italian).', wrong: { 'No. I wish I do!': 'Depois de "wish", passado: did.', 'No. I hope I did!': '"Hope" não serve aqui.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'What would you change in your life?'], ['B', '___']], options: ['I wish I had more time with my family.', 'I wish I have more time with my family.', 'I hope I had more time.'], answer: 'I wish I had more time with my family.', pt: 'Queria ter mais tempo com a minha família.', why: 'Desejo irreal sobre agora: wish + had.', wrong: { 'I wish I have more time with my family.': 'Depois de wish, passado.', 'I hope I had more time.': '"Hope" não vai com passado assim.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Good luck in your interview tomorrow!'], ['B', '___']], options: ['Thanks! I hope I get the job.', 'Thanks! I wish I get the job.', 'Thanks! If only I get the job.'], answer: 'Thanks! I hope I get the job.', pt: 'Valeu! Espero conseguir o emprego.', why: 'Algo possível no futuro: hope.', wrong: { 'Thanks! I wish I get the job.': '"Wish" é para algo irreal agora.', 'Thanks! If only I get the job.': '"If only" pede passado.' } }),
      I(7, 5, { type: 'speak', en: 'I wish I could speak French.', pt: 'Queria saber falar francês.', why: '"Could" soa como "KÚD", o "l" é mudo.' }),
      I(7, 6, { type: 'speak', en: 'If only it were Friday!', pt: 'Quem me dera fosse sexta!', why: '"If only" soa como "if-ÔUN-li".' }),
    ]),
    L(8, 'Lendo: a lista de desejos do Ben', [
      I(8, 1, { type: 'story', why: 'O Ben escreve sobre o que queria que fosse diferente na vida dele. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que o Ben queria saber fazer?', options: ['Tocar piano', 'Nadar', 'Cozinhar'], answer: 'Tocar piano', why: '"I wish I could play the piano."' }),
      I(8, 3, { type: 'quiz', q: 'Onde ele queria morar?', options: ['Perto do mar', 'No centro da cidade', 'No exterior'], answer: 'Perto do mar', why: '"I wish I lived near the sea."' }),
      I(8, 4, { type: 'quiz', q: 'O que ele decide no fim?', options: ['Começar aulas de piano', 'Mudar de cidade', 'Parar de trabalhar'], answer: 'Começar aulas de piano', why: '"I\'m starting piano lessons next week!"' }),
    ], {
      title: 'A lista de desejos do Ben',
      lines: [
        { who: 'Ben', en: "I like my life, but sometimes I wish things were a little different.", pt: 'Gosto da minha vida, mas às vezes queria que as coisas fossem um pouco diferentes.' },
        { who: 'Ben', en: 'I wish I lived near the sea. I love swimming, but the beach is three hours away.', pt: 'Queria morar perto do mar. Adoro nadar, mas a praia fica a três horas daqui.' },
        { ask: 'A que distância fica a praia?', options: ['Três horas', 'Trinta minutos', 'Três dias'], answer: 'Três horas', why: '"The beach is three hours away."' },
        { who: 'Ben', en: 'I also wish I ___ play the piano. My grandma had a real talent for it.', pt: 'Também queria saber tocar piano. Minha avó tinha um talento de verdade.', gap: { answer: 'could', options: ['could', 'can', 'will'] } },
        { who: 'Ben', en: "If only I had more free time! I work too much.", pt: 'Se ao menos eu tivesse mais tempo livre! Trabalho demais.' },
        { who: 'Ben', en: "But wishing isn't enough. I'm starting piano lessons next week!", pt: 'Mas desejar não basta. Vou começar aulas de piano semana que vem!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'I wish I ___ so tired.', pt: 'Queria não estar tão cansado.', options: ["weren't", "am not", "won't be"], answer: "weren't", why: 'Wish + passado negativo de be: weren\'t.', wrong: { "am not": 'Depois de wish, passado.', "won't be": 'Não funciona aqui.' } }),
      I(9, 2, { type: 'type', pt: 'Se ao menos eu pudesse viajar!', answer: 'If only I could travel!', why: '"If only I could" = se ao menos eu pudesse.' }),
      I(9, 3, { type: 'meaning', en: 'She wishes she had studied harder.', options: ['Ela queria ter estudado mais.', 'Ela estuda muito.', 'Ela vai estudar mais.'], answer: 'Ela queria ter estudado mais.', why: 'Para o passado: wish + had + particípio (arrependimento). Você vai ver mais disso no B2.' }),
      I(9, 4, { type: 'dictation', en: 'I hope you have a great trip.', why: '"Hope" para algo possível.' }),
      I(9, 5, { type: 'listen', en: "I wish my neighbours didn't make so much noise.", options: ['Queria que meus vizinhos não fizessem tanto barulho.', 'Meus vizinhos são silenciosos.', 'Eu faço muito barulho.'], answer: 'Queria que meus vizinhos não fizessem tanto barulho.', why: 'Wish + outra pessoa + passado.' }),
      I(9, 6, { type: 'build', pt: 'Queria saber falar inglês fluentemente.', answer: 'I wish I could speak English fluently', extra: ['can', 'fluent'], display: 'I wish I could speak English fluently.', why: '"Fluently" é o advérbio (fluentemente).' }),
    ]),
    L(10, 'História: o último dia de aula', [
      I(10, 1, { type: 'story', why: 'É o último dia do curso de inglês, e a turma fala dos desejos para o futuro. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que a Laura queria?', options: ['Que o curso não acabasse', 'Ter faltado menos', 'Uma nota melhor'], answer: 'Que o curso não acabasse', why: '"I wish the course didn\'t end today."' }),
      I(10, 3, { type: 'quiz', q: 'Qual é o sonho do Marcos?', options: ['Trabalhar no exterior', 'Ser professor', 'Aprender francês'], answer: 'Trabalhar no exterior', why: '"I wish I could work abroad someday."' }),
      I(10, 4, { type: 'quiz', q: 'O que a professora diz no fim?', options: ['Que espera que eles continuem praticando', 'Que eles precisam repetir o curso', 'Que a prova foi difícil'], answer: 'Que espera que eles continuem praticando', why: '"I hope you keep practising."' }),
    ], {
      title: 'O último dia de aula',
      lines: [
        { who: 'Sarah', en: "Well, this is our last class. How do you feel?", pt: 'Bom, esta é a nossa última aula. Como vocês estão se sentindo?' },
        { who: 'Laura', en: "Sad! I wish the course didn't end today.", pt: 'Triste! Queria que o curso não acabasse hoje.' },
        { who: 'Marcos', en: "Me too. Now I can talk to people in English. I wish I ___ work abroad someday.", pt: 'Eu também. Agora consigo conversar em inglês. Queria poder trabalhar no exterior algum dia.', gap: { answer: 'could', options: ['could', 'can', 'will'] } },
        { ask: 'O que o Marcos já consegue fazer?', options: ['Conversar em inglês', 'Falar francês', 'Trabalhar no exterior'], answer: 'Conversar em inglês', why: '"Now I can talk to people in English."' },
        { who: 'Sarah', en: "You're all so much better than at the start. I'm very proud of you.", pt: 'Vocês estão muito melhores do que no começo. Tenho muito orgulho de vocês.' },
        { who: 'Sarah', en: "I hope you keep practising. And remember: wishing is good, but doing is better!", pt: 'Espero que vocês continuem praticando. E lembrem: desejar é bom, mas fazer é melhor!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u16', level: 'B1', unlock: 'b1-u16', title: 'Quem me dera…',
  intro: 'No último episódio do B1, a Ana e o Tom falam dos desejos e sonhos deles.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the last podcast of this level. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao último podcast deste nível. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: wishes and dreams.", pt: 'E eu sou o Tom. Hoje: desejos e sonhos.' },
    { who: 'ana', en: 'Tom, what do you wish?', pt: 'Tom, o que você deseja?' },
    { who: 'tom', en: "I wish I could play the drums. And I wish I lived near the beach.", pt: 'Queria saber tocar bateria. E queria morar perto da praia.' },
    { who: 'ana', en: 'I wish I had more time to read. If only days had thirty hours!', pt: 'Eu queria ter mais tempo para ler. Quem me dera o dia tivesse trinta horas!' },
    { who: 'tom', en: "Ha! And what do you hope for the future?", pt: 'Rá! E o que você espera do futuro?' },
    { who: 'ana', en: "I hope you keep learning English. You've done so well!", pt: 'Espero que vocês continuem aprendendo inglês. Vocês foram muito bem!' },
    { who: 'tom', en: 'See you in the next level! Bye!', pt: 'Até o próximo nível! Tchau!' },
  ],
  questions: [
    { q: 'O que o Tom queria saber tocar?', options: ['Bateria', 'Piano', 'Violão'], answer: 'Bateria', why: '"I wish I could play the drums."' },
    { q: 'O que a Ana queria ter?', options: ['Mais tempo para ler', 'Mais dinheiro', 'Uma casa na praia'], answer: 'Mais tempo para ler', why: '"I wish I had more time to read."' },
    { q: 'O que a Ana espera do futuro?', options: ['Que os ouvintes continuem aprendendo', 'Viajar pelo mundo', 'Ter um podcast novo'], answer: 'Que os ouvintes continuem aprendendo', why: '"I hope you keep learning English."' },
  ],
}, 'pod-b1u15');
addScene('b1-u16', 'standing-15', 'thought');
