// Etapa 3 do A1 completo (docs/plano-expansao-a1.md): unidade nova 13 — Datas e clima.
// Gera src/content/a1/unit-13.json, a escuta pod-a1u13 e a cena da trilha.
// Uso: node scripts/content-add/a1-u13.mjs  (pode rodar de novo)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a1-u13-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a1u13l${n}-${k}`, ...o });

writeUnit('a1/unit-13.json', {
  id: 'a1-u13', level: 'A1', order: 13,
  title: 'Datas e clima',
  subtitle: 'Meses, estações, aniversários e como está o tempo.',
  can_do: {
    text: 'Consigo dizer datas e meu aniversário, falar das estações e dizer como está o tempo.',
    source: 'CEFR (Conselho da Europa) — Produção oral: informações simples sobre datas e o tempo, nível A1',
  },
  core_inventory: ['Months and seasons', 'Ordinal numbers for dates (first, second, third...)', 'When is...? / in + month / on + date', 'Weather: It is sunny / cold...'],
  words: [
    ['January / February / March', 'janeiro / fevereiro / março'],
    ['April / May / June', 'abril / maio / junho'],
    ['July / August / September', 'julho / agosto / setembro'],
    ['October / November / December', 'outubro / novembro / dezembro'],
    ['month / year', 'mês / ano'],
    ['birthday', 'aniversário'],
    ['first / second / third', 'primeiro / segundo / terceiro'],
    ['spring / summer', 'primavera / verão'],
    ['autumn / winter', 'outono / inverno'],
    ['weather', 'tempo (clima)'],
    ['sunny / cloudy', 'ensolarado / nublado'],
    ['rainy / snowy', 'chuvoso / com neve'],
    ['warm', 'morno / quentinho'],
  ],
  guide: {
    title: 'Datas, estações e o tempo',
    intro: 'Em inglês os meses começam com letra maiúscula. Nas datas usamos números ordinais (first, second, third...). E para o tempo, "It is" + adjetivo: it is sunny, it is cold.',
    points: [
      { en: 'My birthday is in May.', pt: 'Meu aniversário é em maio.', note: 'Mês e estação usam "in": in May, in summer.' },
      { en: 'My birthday is on May 5th.', pt: 'Meu aniversário é no dia 5 de maio.', note: 'Data exata usa "on". Lemos "May the fifth".' },
      { en: 'first, second, third, fourth, fifth', pt: 'primeiro, segundo, terceiro, quarto, quinto', note: 'Os três primeiros são diferentes; depois é só pôr -th: sixth, seventh, tenth.' },
      { en: 'What is the weather like today?', pt: 'Como está o tempo hoje?', note: 'Pergunta comum. Resposta: It is sunny / It is cold.' },
      { en: 'It is hot in summer and cold in winter.', pt: 'É quente no verão e frio no inverno.', note: 'Para o tempo, a frase começa com "It is" (nunca só "is").' },
    ],
    tips: ['No Brasil é dia/mês (5/5); nos Estados Unidos é mês/dia (May 5).', '"Autumn" é britânico; nos Estados Unidos dizem "fall".'],
  },
  extra_vocab: [
    { word: 'third', reason: 'Dizer datas é objetivo do A1 no CEFR e pede os ordinais; na CEFR-J só first e second estão no A1.' },
    { word: 'fourth', reason: 'Ordinal usado em datas (objetivo A1 do CEFR); na CEFR-J aparece no A2.' },
    { word: 'fifth', reason: 'Ordinal usado em datas (objetivo A1 do CEFR); na CEFR-J aparece no A2.' },
    { word: 'season', reason: 'Necessária para falar das estações (spring, summer, autumn, winter são A1); na CEFR-J "season" aparece no A2.' },
  ],
  lessons: [
    L(1, 'Os meses', [
      I(1, 1, { type: 'match', pairs: [['January', 'janeiro'], ['February', 'fevereiro'], ['March', 'março'], ['April', 'abril']], why: 'Em inglês os meses sempre começam com letra maiúscula.' }),
      I(1, 2, { type: 'match', pairs: [['May', 'maio'], ['June', 'junho'], ['July', 'julho'], ['August', 'agosto']], why: '"June" (junho) e "July" (julho) são fáceis de confundir: JUne vem antes.' }),
      I(1, 3, { type: 'match', pairs: [['September', 'setembro'], ['October', 'outubro'], ['November', 'novembro'], ['December', 'dezembro']], why: 'Os quatro últimos meses são parecidos com o português.' }),
      I(1, 4, { type: 'choice', prompt: 'Complete:', en: 'My birthday is ___ June.', pt: 'Meu aniversário é em junho.', options: ['in', 'on', 'at'], answer: 'in', why: 'Com mês usamos "in": in June.', wrong: { on: '"On" é para dia (on Monday, on June 5th).', at: '"At" é para hora (at seven).' } }),
      I(1, 5, { type: 'listen', en: 'There are twelve months in a year.', options: ['Tem doze meses num ano.', 'Tem doze dias num mês.', 'Tem dois meses no ano.'], answer: 'Tem doze meses num ano.', why: '"Month" = mês, "year" = ano.' }),
      I(1, 6, { type: 'build', pt: 'Quando é o seu aniversário?', answer: 'When is your birthday', extra: ['where', 'are'], display: 'When is your birthday?', why: '"When" = quando. "Birthday" = aniversário.' }),
    ]),
    L(2, 'Datas', [
      I(2, 1, { type: 'match', pairs: [['first', '1º'], ['second', '2º'], ['third', '3º'], ['fifth', '5º']], why: 'Os ordinais 1º, 2º e 3º são especiais. Depois: fourth, fifth, sixth...' }),
      I(2, 2, { type: 'meaning', en: 'My birthday is on May 5th.', options: ['Meu aniversário é no dia 5 de maio.', 'Meu aniversário é em maio, dia 15.', 'Meu aniversário é no dia 5 de março.'], answer: 'Meu aniversário é no dia 5 de maio.', why: '"May 5th" se lê "May the fifth" = 5 de maio.' }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: 'The party is ___ Saturday, July 3rd.', pt: 'A festa é no sábado, 3 de julho.', options: ['on', 'in', 'at'], answer: 'on', why: 'Dia da semana e data usam "on".', wrong: { in: '"In" é para mês, ano e estação.', at: '"At" é para horas.' } }),
      I(2, 4, { type: 'listen', en: 'Today is the first of March.', options: ['Hoje é primeiro de março.', 'Hoje é primeiro de maio.', 'Hoje é três de março.'], answer: 'Hoje é primeiro de março.', why: '"The first of March" = primeiro de março.' }),
      I(2, 5, { type: 'build', pt: 'Meu aniversário é em dezembro.', answer: 'My birthday is in December', extra: ['on', 'at'], display: 'My birthday is in December.', why: 'Mês com "in": in December.' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'When is your birthday?'], ['B', '___']], options: ["It's on April 10th.", "It's in the summer house.", "I'm ten."], answer: "It's on April 10th.", pt: 'É no dia 10 de abril.', why: '"When" pede quando: diga a data.', wrong: { "It's in the summer house.": 'Isso é um lugar.', "I'm ten.": 'Isso é a idade.' } }),
    ]),
    L(3, 'As estações', [
      I(3, 1, { type: 'match', pairs: [['spring', 'primavera'], ['summer', 'verão'], ['autumn', 'outono'], ['winter', 'inverno']], why: 'Nos Estados Unidos, outono também é "fall".' }),
      I(3, 2, { type: 'meaning', en: 'It is hot in summer.', options: ['É quente no verão.', 'É frio no inverno.', 'É quente na primavera.'], answer: 'É quente no verão.', why: 'Estação com "in": in summer.' }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: 'It is very cold in ___.', pt: 'É muito frio no inverno.', options: ['winter', 'summer', 'spring'], answer: 'winter', why: 'Inverno = winter, a estação mais fria.', wrong: { summer: 'O verão é quente.', spring: 'A primavera costuma ser amena.' } }),
      I(3, 4, { type: 'listen', en: 'My favorite season is spring.', options: ['Minha estação favorita é a primavera.', 'Minha estação favorita é o verão.', 'Meu mês favorito é setembro.'], answer: 'Minha estação favorita é a primavera.', why: '"Season" = estação. "Favorite" = favorito.' }),
      I(3, 5, { type: 'build', pt: 'Eu adoro o verão.', answer: 'I love summer', extra: ['the', 'in'], display: 'I love summer.', why: 'Em inglês falamos da estação sem "the": I love summer.' }),
      I(3, 6, { type: 'meaning', en: 'In Brazil, summer is in December.', options: ['No Brasil, o verão é em dezembro.', 'No Brasil, o inverno é em dezembro.', 'No Brasil, dezembro é frio.'], answer: 'No Brasil, o verão é em dezembro.', why: 'No hemisfério sul as estações são ao contrário da Europa e dos Estados Unidos.' }),
    ]),
    L(4, 'Como está o tempo?', [
      I(4, 1, { type: 'match', pairs: [['sunny', 'ensolarado'], ['cloudy', 'nublado'], ['rainy', 'chuvoso'], ['snowy', 'com neve']], why: 'Sun (sol) + y = sunny. Cloud (nuvem) + y = cloudy. Rain (chuva) + y = rainy.' }),
      I(4, 2, { type: 'meaning', en: "What's the weather like today?", options: ['Como está o tempo hoje?', 'Que dia é hoje?', 'Você gosta do tempo?'], answer: 'Como está o tempo hoje?', why: '"Weather" = tempo, clima. A pergunta pede como ele está.' }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: '___ sunny and warm today.', pt: 'Está ensolarado e quentinho hoje.', options: ["It's", 'Is', "It"], answer: "It's", why: 'Para o tempo, a frase começa com "It is": It\'s sunny.', wrong: { Is: 'Em inglês a frase precisa de sujeito: IT is.', It: 'Falta o verbo: It IS.' } }),
      I(4, 4, { type: 'dialogue', lines: [['A', "What's the weather like in London?"], ['B', '___']], options: ["It's cloudy and cold.", "It's in England.", "It's December."], answer: "It's cloudy and cold.", pt: 'Está nublado e frio.', why: 'A pergunta é sobre o tempo: responda com sunny, cloudy, cold...', wrong: { "It's in England.": 'Diz onde fica, não o tempo.', "It's December.": 'Diz o mês, não o tempo.' } }),
      I(4, 5, { type: 'build', pt: 'Está chuvoso hoje.', answer: "It's rainy today", extra: ['is', 'rain'], display: "It's rainy today.", why: 'It\'s + adjetivo do tempo: it\'s rainy.' }),
      I(4, 6, { type: 'listen', en: 'It is snowy in winter.', options: ['Neva no inverno.', 'Chove no verão.', 'Faz sol no inverno.'], answer: 'Neva no inverno.', why: '"Snowy" = com neve.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Meu aniversário é em março.', answer: 'My birthday is in March.', why: 'Mês com "in" e letra maiúscula: in March.' }),
      I(5, 2, { type: 'type', pt: 'Está ensolarado hoje.', answer: "It's sunny today.", accept: ['It is sunny today.'], why: 'Tempo: It is + adjetivo.' }),
      I(5, 3, { type: 'dictation', en: 'When is your birthday?', why: '"When" = quando.' }),
      I(5, 4, { type: 'type', pt: 'É frio no inverno.', answer: 'It is cold in winter.', accept: ["It's cold in winter."], why: 'Estação com "in": in winter.' }),
      I(5, 5, { type: 'dictation', en: 'Today is the second of June.', why: '"Second" = segundo (2º).' }),
      I(5, 6, { type: 'type', pt: 'Eu adoro a primavera.', answer: 'I love spring.', why: 'Estação sem "the": I love spring.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "My birthday is on August 3rd.", options: ['Meu aniversário é no dia 3 de agosto.', 'Meu aniversário é no dia 3 de abril.', 'Meu aniversário é no dia 13 de agosto.'], answer: 'Meu aniversário é no dia 3 de agosto.', why: '"August the third" = 3 de agosto.' }),
      I(6, 2, { type: 'dictation', en: "It's cloudy today.", accept: ['It is cloudy today.'], why: '"Cloudy" = nublado.' }),
      I(6, 3, { type: 'listen', en: 'It is warm in spring.', options: ['É quentinho na primavera.', 'É frio no outono.', 'É quente no verão.'], answer: 'É quentinho na primavera.', why: '"Warm" = morno, agradável. "Hot" seria quente demais.' }),
      I(6, 4, { type: 'dictation', en: 'There are four seasons.', why: '"Season" = estação.' }),
      I(6, 5, { type: 'listen', en: "What's the weather like?", options: ['Como está o tempo?', 'Que horas são?', 'Que dia é hoje?'], answer: 'Como está o tempo?', why: 'Pergunta mais comum sobre o tempo.' }),
      I(6, 6, { type: 'dictation', en: 'The party is in July.', why: 'Mês com "in" e letra maiúscula.' }),
      I(6, 7, { type: 'speak', en: 'My birthday is in October.', pt: 'Meu aniversário é em outubro.', why: '"October" soa como "ók-TÔU-ber".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'When is your birthday?'], ['B', '___']], options: ["It's in November.", "It's sunny.", "It's my party."], answer: "It's in November.", pt: 'É em novembro.', why: 'Diga o mês (in) ou a data (on).', wrong: { "It's sunny.": 'Isso é o tempo.', "It's my party.": 'Não diz quando.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Is it cold today?'], ['B', '___']], options: ["No, it isn't. It's warm.", "No, I'm not cold.", 'No, it is winter.'], answer: "No, it isn't. It's warm.", pt: 'Não, não está. Está quentinho.', why: 'Pergunta com "Is it...?": resposta "Yes, it is / No, it isn\'t".', wrong: { "No, I'm not cold.": 'A pergunta é sobre o tempo, não sobre você.', 'No, it is winter.': 'No inverno costuma estar frio.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Happy birthday!'], ['B', '___']], options: ['Thank you!', "You're welcome!", 'Happy birthday!'], answer: 'Thank you!', pt: 'Obrigado!', why: 'Quando alguém te deseja feliz aniversário, agradeça.', wrong: { "You're welcome!": 'É "de nada".', 'Happy birthday!': 'O aniversário é seu, não da outra pessoa.' } }),
      I(7, 4, { type: 'speak', en: "It's sunny and hot today.", pt: 'Está ensolarado e quente hoje.', why: '"Sunny" soa como "SÂ-ni".' }),
      I(7, 5, { type: 'speak', en: 'My favorite season is summer.', pt: 'Minha estação favorita é o verão.', why: '"Season" soa como "SÍ-zon".' }),
      I(7, 6, { type: 'dialogue', lines: [['A', "What's the date today?"], ['B', '___']], options: ["It's the fifth of May.", "It's Monday morning.", "It's five o'clock."], answer: "It's the fifth of May.", pt: 'É cinco de maio.', why: '"Date" = data. Responda com o dia e o mês.', wrong: { "It's Monday morning.": 'Diz o dia da semana, não a data.', "It's five o'clock.": 'Diz a hora.' } }),
    ]),
    L(8, 'Lendo: a previsão do tempo', [
      I(8, 1, { type: 'story', why: 'A previsão do tempo da semana. Leia e descubra o melhor dia para ir à praia.' }),
      I(8, 2, { type: 'quiz', q: 'Como estará na segunda?', options: ['Chuvoso e frio', 'Ensolarado', 'Com neve'], answer: 'Chuvoso e frio', why: '"On Monday it is rainy and cold".' }),
      I(8, 3, { type: 'quiz', q: 'Qual é o melhor dia para a praia?', options: ['Sábado', 'Segunda', 'Quarta'], answer: 'Sábado', why: '"On Saturday it is sunny and hot. Go to the beach!".' }),
      I(8, 4, { type: 'quiz', q: 'Em que mês estamos?', options: ['Janeiro', 'Julho', 'Dezembro'], answer: 'Janeiro', why: '"The weather for this week in January".' }),
    ], {
      title: 'A previsão do tempo',
      lines: [
        { who: 'Laura', en: 'Hello! Here is the weather for this week in January.', pt: 'Olá! Aqui está o tempo desta semana em janeiro.' },
        { who: 'Laura', en: 'On Monday it is rainy and cold.', pt: 'Na segunda está chuvoso e frio.' },
        { who: 'Laura', en: 'On Wednesday it is ___, but warm.', pt: 'Na quarta está nublado, mas quentinho.', gap: { answer: 'cloudy', options: ['cloudy', 'snowy', 'winter'] } },
        { ask: 'Como estará na quarta?', options: ['Nublado e quentinho', 'Chuvoso e frio', 'Com neve'], answer: 'Nublado e quentinho', why: '"It is cloudy, but warm".' },
        { who: 'Laura', en: 'On Saturday it is sunny and hot. Go to the beach!', pt: 'No sábado está ensolarado e quente. Vá à praia!' },
        { who: 'Laura', en: 'Have a good week!', pt: 'Tenha uma boa semana!' },
        { ask: 'O que a moça sugere para sábado?', options: ['Ir à praia', 'Ficar em casa', 'Levar casaco'], answer: 'Ir à praia', why: '"Go to the beach!".' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'My birthday is ___ September 9th.', pt: 'Meu aniversário é no dia 9 de setembro.', options: ['on', 'in', 'at'], answer: 'on', why: 'Data exata usa "on".', wrong: { in: '"In" é só para o mês sozinho (in September).', at: '"At" é para horas.' } }),
      I(9, 2, { type: 'type', pt: 'Está chuvoso e frio.', answer: "It's rainy and cold.", accept: ['It is rainy and cold.'], why: 'It\'s + adjetivos do tempo.' }),
      I(9, 3, { type: 'meaning', en: 'December is in summer in Brazil.', options: ['Dezembro é no verão no Brasil.', 'Dezembro é no inverno no Brasil.', 'O verão é em julho no Brasil.'], answer: 'Dezembro é no verão no Brasil.', why: 'No Brasil, dezembro é verão.' }),
      I(9, 4, { type: 'dictation', en: 'Today is the third of October.', why: '"Third" = terceiro (3º).' }),
      I(9, 5, { type: 'listen', en: 'It is snowy in January in Canada.', options: ['Neva em janeiro no Canadá.', 'Chove em junho no Canadá.', 'Faz sol em janeiro no Canadá.'], answer: 'Neva em janeiro no Canadá.', why: '"Snowy" = com neve.' }),
      I(9, 6, { type: 'speak', en: 'When is your birthday?', pt: 'Quando é o seu aniversário?', why: '"Birthday" soa como "BÂRTH-dei".' }),
    ]),
    L(10, 'História: a festa de aniversário', [
      I(10, 1, { type: 'story', why: 'A Ana e o Tom planejam uma festa. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Quando é o aniversário da Julia?', options: ['6 de fevereiro', '16 de fevereiro', '6 de dezembro'], answer: '6 de fevereiro', why: '"It\'s on February 6th".' }),
      I(10, 3, { type: 'quiz', q: 'Onde vai ser a festa?', options: ['No jardim', 'Na escola', 'No restaurante'], answer: 'No jardim', why: '"Let\'s have the party in the garden!".' }),
      I(10, 4, { type: 'quiz', q: 'Como vai estar o tempo?', options: ['Ensolarado e quente', 'Chuvoso', 'Frio'], answer: 'Ensolarado e quente', why: '"It\'s sunny and hot".' }),
    ], {
      title: 'A festa de aniversário',
      lines: [
        { who: 'Ana', en: "Tom, when is Julia's birthday?", pt: 'Tom, quando é o aniversário da Julia?' },
        { who: 'Tom', en: "It's on February 6th. It's on Saturday!", pt: 'É no dia 6 de fevereiro. É no sábado!' },
        { ask: 'Em que dia da semana cai o aniversário?', options: ['Sábado', 'Domingo', 'Sexta'], answer: 'Sábado', why: '"It\'s on Saturday!".' },
        { who: 'Ana', en: "February is summer in Brazil. Let's have the party in the garden!", pt: 'Fevereiro é verão no Brasil. Vamos fazer a festa no jardim!' },
        { who: 'Tom', en: "What's the ___ like on Saturday?", pt: 'Como vai estar o tempo no sábado?', gap: { answer: 'weather', options: ['weather', 'birthday', 'season'] } },
        { who: 'Ana', en: "It's sunny and hot. Great!", pt: 'Ensolarado e quente. Ótimo!' },
        { who: 'Tom', en: 'Great! We need a big cake and cold drinks.', pt: 'Ótimo! Precisamos de um bolo grande e bebidas geladas.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a1u13', level: 'A1', unlock: 'a1-u13', title: 'Verão ou inverno?',
  intro: 'A Ana mora em Londres e o Tom passou um tempo no Brasil. Eles comparam o tempo e as estações.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Hello!", pt: 'E eu sou o Tom. Olá!' },
    { who: 'ana', en: "What's the weather like today, Tom?", pt: 'Como está o tempo hoje, Tom?' },
    { who: 'tom', en: "It's cold and rainy. It's January in London!", pt: 'Está frio e chuvoso. É janeiro em Londres!' },
    { who: 'ana', en: 'In Brazil, January is summer. It is hot and sunny.', pt: 'No Brasil, janeiro é verão. É quente e ensolarado.' },
    { who: 'tom', en: 'I love summer! My birthday is in July.', pt: 'Eu adoro o verão! Meu aniversário é em julho.' },
    { who: 'ana', en: 'July is winter in Brazil, but it is not very cold.', pt: 'Julho é inverno no Brasil, mas não é muito frio.' },
    { who: 'tom', en: 'And when is your birthday, Ana?', pt: 'E quando é o seu aniversário, Ana?' },
    { who: 'ana', en: "It's on March 21st. It's spring here!", pt: 'É no dia 21 de março. É primavera aqui!' },
    { who: 'tom', en: "That's all for today. Thank you for listening!", pt: 'Por hoje é só. Obrigado por ouvir!' },
    { who: 'ana', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'Como está o tempo em Londres?', options: ['Frio e chuvoso', 'Quente e ensolarado', 'Com neve'], answer: 'Frio e chuvoso', why: '"It\'s cold and rainy".' },
    { q: 'Quando é o aniversário do Tom?', options: ['Em julho', 'Em janeiro', 'Em março'], answer: 'Em julho', why: '"My birthday is in July".' },
    { q: 'Quando é o aniversário da Ana?', options: ['21 de março', '12 de março', '21 de maio'], answer: '21 de março', why: '"It\'s on March 21st".' },
  ],
}, 'pod-a1u12');
addScene('a1-u13', 'standing-19', 'sun');
