// Etapa 3 do A1 completo (docs/plano-expansao-a1.md): unidade nova 15 — Pessoas.
// Gera src/content/a1/unit-15.json, a escuta pod-a1u15 e a cena da trilha.
// Uso: node scripts/content-add/a1-u15.mjs  (pode rodar de novo)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a1-u15-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a1u15l${n}-${k}`, ...o });

writeUnit('a1/unit-15.json', {
  id: 'a1-u15', level: 'A1', order: 15,
  title: 'Pessoas',
  subtitle: 'Descrever a aparência e o jeito de uma pessoa.',
  can_do: {
    text: 'Consigo descrever uma pessoa: como ela é (cabelo, olhos, altura) e o jeito dela.',
    source: 'CEFR (Conselho da Europa) — Produção oral geral: descrever pessoas com frases simples, nível A1',
  },
  core_inventory: ['have got / has got', 'Adjetivos de aparência e personalidade', 'Ordem: long black hair', 'What is he like?'],
  words: [
    ['hair', 'cabelo'],
    ['long / short', 'comprido / curto (ou baixo)'],
    ['black / blond', 'preto / loiro'],
    ['glasses', 'óculos'],
    ['tall / short', 'alto / baixo'],
    ['thin', 'magro(a)'],
    ['beautiful / pretty', 'lindo(a) / bonita'],
    ['handsome', 'bonito (homem)'],
    ['smart', 'inteligente'],
    ['shy', 'tímido(a)'],
    ['quiet', 'quieto(a) / calmo(a)'],
    ['lazy', 'preguiçoso(a)'],
    ['nice', 'legal / gentil'],
    ['person / people', 'pessoa / pessoas'],
  ],
  guide: {
    title: 'Como descrever uma pessoa',
    intro: 'Para a aparência usamos "have got" (ou "have") e o verbo to be. Para o jeito da pessoa, to be + adjetivo. E lembre: o adjetivo vem antes da coisa.',
    points: [
      { en: 'She has got long black hair.', pt: 'Ela tem cabelo preto comprido.', note: '"Have got" = ter (mais usado no Reino Unido). Com she/he: has got.' },
      { en: 'He is tall and thin.', pt: 'Ele é alto e magro.', note: 'Altura e corpo usam o verbo to be.' },
      { en: 'My sister has blue eyes and wears glasses.', pt: 'Minha irmã tem olhos azuis e usa óculos.', note: '"Glasses" (óculos) é sempre plural.' },
      { en: 'What is your brother like?', pt: 'Como é o seu irmão (de jeito)?', note: 'Pergunta sobre a personalidade. Resposta: He is funny and smart.' },
      { en: 'Her hair is long.', pt: 'O cabelo dela é comprido.', note: 'Em inglês "hair" não tem plural: her hair IS (nunca "hairs are").' },
    ],
    tips: ['Ordem dos adjetivos: tamanho antes da cor: long black hair (nunca "black long hair").', '"Short" serve para cabelo curto e para pessoa baixa.'],
  },
  extra_vocab: [
    { word: 'blond', reason: 'Cor de cabelo, essencial para descrever pessoas (objetivo desta unidade A1); na CEFR-J "blond" aparece no A2.' },
    { word: 't', reason: 'Parte de "T-shirt" (A1 na CEFR-J): o validador separa a palavra no hífen.' },
  ],
  lessons: [
    L(1, 'Cabelo e olhos', [
      I(1, 1, { type: 'match', pairs: [['long', 'comprido'], ['short', 'curto'], ['black', 'preto'], ['blond', 'loiro']], why: 'Com cabelo: long hair, short hair, black hair, blond hair.' }),
      I(1, 2, { type: 'meaning', en: 'She has got long black hair.', options: ['Ela tem cabelo preto comprido.', 'Ela tem cabelo curto e preto.', 'Ela tem olhos pretos.'], answer: 'Ela tem cabelo preto comprido.', why: 'Tamanho antes da cor: long black hair.' }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'He ___ got blue eyes.', pt: 'Ele tem olhos azuis.', options: ['has', 'have', 'is'], answer: 'has', why: 'Com he/she: has got.', wrong: { have: '"Have got" vai com I, you, we e they.', is: '"Is got" não existe.' } }),
      I(1, 4, { type: 'choice', prompt: 'Complete:', en: 'Her hair ___ very long.', pt: 'O cabelo dela é muito comprido.', options: ['is', 'are', 'have'], answer: 'is', why: '"Hair" é singular em inglês: her hair IS.', wrong: { are: 'Em inglês "hair" não é plural.', have: 'Para dizer como é, usamos "is".' } }),
      I(1, 5, { type: 'build', pt: 'Eu tenho cabelo curto.', answer: 'I have got short hair', extra: ['has', 'hairs'], display: "I've got short hair.", why: 'Com I: have got. E "hair" sem -s.' }),
      I(1, 6, { type: 'listen', en: 'My brother wears glasses.', options: ['Meu irmão usa óculos.', 'Meu irmão tem olhos azuis.', 'Meu irmão bebe um copo.'], answer: 'Meu irmão usa óculos.', why: '"Glasses" = óculos. "Wear" = usar.' }),
    ]),
    L(2, 'Alto, baixo, bonito', [
      I(2, 1, { type: 'match', pairs: [['tall', 'alto'], ['thin', 'magro'], ['beautiful', 'lindo'], ['handsome', 'bonito (homem)']], why: '"Handsome" costuma ser para homens; "beautiful" e "pretty" para mulheres.' }),
      I(2, 2, { type: 'meaning', en: 'He is tall and handsome.', options: ['Ele é alto e bonito.', 'Ele é baixo e bonito.', 'Ele é alto e magro.'], answer: 'Ele é alto e bonito.', why: '"Tall" = alto. "Handsome" = bonito.' }),
      I(2, 3, { type: 'choice', prompt: 'O contrário de "tall":', en: 'My sister is ___, but I am tall.', pt: 'Minha irmã é baixa, mas eu sou alto.', options: ['short', 'long', 'small'], answer: 'short', why: 'Pessoa baixa = short. "Long" é para coisas compridas.', wrong: { long: '"Long" é comprido (cabelo, rua), não pessoa.', small: '"Small" é pequeno (coisas, crianças).' } }),
      I(2, 4, { type: 'build', pt: 'Ela é muito bonita.', answer: 'She is very pretty', extra: ['handsome', 'has'], display: 'She is very pretty.', why: '"Pretty" = bonita. "Very" = muito.' }),
      I(2, 5, { type: 'listen', en: 'Your mother is beautiful!', options: ['Sua mãe é linda!', 'Sua mãe é alta!', 'Sua mãe é engraçada!'], answer: 'Sua mãe é linda!', why: '"Beautiful" soa como "BIÚ-ti-ful".' }),
      I(2, 6, { type: 'meaning', en: 'There are many people in the park.', options: ['Tem muitas pessoas no parque.', 'Tem uma pessoa no parque.', 'O parque é muito bonito.'], answer: 'Tem muitas pessoas no parque.', why: 'Plural de "person" é "people".' }),
    ]),
    L(3, 'O jeito da pessoa', [
      I(3, 1, { type: 'match', pairs: [['smart', 'inteligente'], ['shy', 'tímido'], ['quiet', 'quieto'], ['lazy', 'preguiçoso']], why: 'Adjetivos de personalidade usam o verbo to be: he is shy.' }),
      I(3, 2, { type: 'meaning', en: "What's your teacher like?", options: ['Como é o seu professor?', 'Do que o seu professor gosta?', 'Onde está o seu professor?'], answer: 'Como é o seu professor?', why: '"What is ... like?" pergunta como a pessoa é (o jeito).' }),
      I(3, 3, { type: 'dialogue', lines: [['A', "What's your best friend like?"], ['B', '___']], options: ["She's funny and smart.", 'She likes pizza.', "She's twenty."], answer: "She's funny and smart.", pt: 'Ela é engraçada e inteligente.', why: '"What is she like?" pede o jeito dela, não do que ela gosta.', wrong: { 'She likes pizza.': 'Isso responde "What does she like?".', "She's twenty.": 'Isso é a idade.' } }),
      I(3, 4, { type: 'choice', prompt: 'Complete:', en: "Tom doesn't talk a lot. He is very ___.", pt: 'O Tom não fala muito. Ele é muito quieto.', options: ['quiet', 'funny', 'tall'], answer: 'quiet', why: 'Quem não fala muito é quiet (quieto).', wrong: { funny: '"Funny" é engraçado.', tall: '"Tall" é alto, aparência.' } }),
      I(3, 5, { type: 'build', pt: 'Meu gato é muito preguiçoso.', answer: 'My cat is very lazy', extra: ['has', 'lazys'], display: 'My cat is very lazy.', why: '"Lazy" = preguiçoso.' }),
      I(3, 6, { type: 'listen', en: 'She is shy, but very nice.', options: ['Ela é tímida, mas muito legal.', 'Ela é legal, mas muito tímida.', 'Ela é tímida e quieta.'], answer: 'Ela é tímida, mas muito legal.', why: '"Shy" = tímida. "Nice" = legal, gentil.' }),
    ]),
    L(4, 'Quem é quem?', [
      I(4, 1, { type: 'meaning', en: 'The man with glasses is my uncle.', options: ['O homem de óculos é meu tio.', 'O homem alto é meu tio.', 'Meu tio usa chapéu.'], answer: 'O homem de óculos é meu tio.', why: '"With glasses" = de óculos, com óculos.' }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'Which one is your sister? — The girl ___ long hair.', pt: 'Qual é a sua irmã? — A menina de cabelo comprido.', options: ['with', 'has', 'is'], answer: 'with', why: 'Para apontar alguém pela aparência: the girl WITH long hair.', wrong: { has: 'Precisaria de "who has". O simples é "with".', is: 'Não dá para dizer "the girl is long hair".' } }),
      I(4, 3, { type: 'dialogue', lines: [['A', 'Is your father tall?'], ['B', '___']], options: ["No, he isn't. He's short.", "No, he hasn't.", 'No, he is tall.'], answer: "No, he isn't. He's short.", pt: 'Não. Ele é baixo.', why: 'Pergunta com "Is he...?": resposta "Yes, he is / No, he isn\'t".', wrong: { "No, he hasn't.": 'Responde "Has he got...?".', 'No, he is tall.': 'Se é alto, a resposta seria "Yes".' } }),
      I(4, 4, { type: 'build', pt: 'Meu amigo tem olhos castanhos.', answer: 'My friend has brown eyes', extra: ['have', 'is'], display: 'My friend has brown eyes.', why: '"My friend" (he/she) + has. A cor vem antes: brown eyes.' }),
      I(4, 5, { type: 'meaning', en: 'People in my family are very tall.', options: ['As pessoas da minha família são muito altas.', 'Minha família é muito grande.', 'Uma pessoa da minha família é alta.'], answer: 'As pessoas da minha família são muito altas.', why: '"People" é plural: people ARE.' }),
      I(4, 6, { type: 'choice', prompt: 'Complete:', en: 'I ___ got two brothers.', pt: 'Eu tenho dois irmãos.', options: ['have', 'has', 'am'], answer: 'have', why: 'Com I: have got.', wrong: { has: '"Has" vai com he, she e it.', am: '"Am got" não existe.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Ela tem cabelo comprido.', answer: 'She has got long hair.', accept: ["She's got long hair.", 'She has long hair.'], why: 'Has got (ou só has) + long hair.' }),
      I(5, 2, { type: 'type', pt: 'Ele é alto e magro.', answer: 'He is tall and thin.', accept: ["He's tall and thin."], why: 'Altura e corpo com to be.' }),
      I(5, 3, { type: 'dictation', en: 'My mother wears glasses.', why: '"Glasses" = óculos.' }),
      I(5, 4, { type: 'type', pt: 'Como é a sua irmã?', answer: 'What is your sister like?', accept: ["What's your sister like?"], why: 'What is + pessoa + like?' }),
      I(5, 5, { type: 'dictation', en: 'He is shy but smart.', why: '"Shy" = tímido. "Smart" = inteligente.' }),
      I(5, 6, { type: 'type', pt: 'Eu tenho olhos verdes.', answer: 'I have green eyes.', accept: ["I've got green eyes.", 'I have got green eyes.'], why: 'Cor antes: green eyes.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'She has got short blond hair.', options: ['Ela tem cabelo loiro curto.', 'Ela tem cabelo preto comprido.', 'Ela é baixa e loira.'], answer: 'Ela tem cabelo loiro curto.', why: 'Short (tamanho) + blond (cor) + hair.' }),
      I(6, 2, { type: 'dictation', en: 'My father is very handsome.', why: '"Handsome" soa como "HÉN-som": o "d" é mudo.' }),
      I(6, 3, { type: 'listen', en: "What's he like?", options: ['Como ele é?', 'Do que ele gosta?', 'Como ele está?'], answer: 'Como ele é?', why: 'Atenção: "What\'s he like?" (como ele é) x "How is he?" (como ele está).' }),
      I(6, 4, { type: 'dictation', en: 'The girl with glasses is my sister.', why: '"With glasses" = de óculos.' }),
      I(6, 5, { type: 'listen', en: 'He is lazy. He sleeps all day!', options: ['Ele é preguiçoso. Dorme o dia todo!', 'Ele está cansado. Dorme muito!', 'Ele é quieto. Dorme cedo!'], answer: 'Ele é preguiçoso. Dorme o dia todo!', why: '"Lazy" = preguiçoso. "All day" = o dia todo.' }),
      I(6, 6, { type: 'dictation', en: 'There are ten people here.', why: '"People" = pessoas.' }),
      I(6, 7, { type: 'speak', en: 'I have got short black hair.', pt: 'Tenho cabelo preto curto.', why: 'Fale "ai hev gót short blék hér".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'What does your new teacher look like?'], ['B', '___']], options: ["She's tall and she has long hair.", "She's nice and funny.", 'She likes music.'], answer: "She's tall and she has long hair.", pt: 'Ela é alta e tem cabelo comprido.', why: '"Look like" pergunta a aparência: alta, cabelo, olhos...', wrong: { "She's nice and funny.": 'Isso é o jeito dela, não a aparência.', 'She likes music.': 'Isso é do que ela gosta.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Is your brother shy?'], ['B', '___']], options: ['No, he talks a lot!', 'No, he is shy.', "No, he hasn't."], answer: 'No, he talks a lot!', pt: 'Não, ele fala muito!', why: 'O contrário de tímido: fala muito (talks a lot).', wrong: { 'No, he is shy.': 'Contradiz o "no".', "No, he hasn't.": 'Responde "Has he got...?".' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Which one is Leo?'], ['B', '___']], options: ['The boy with the red T-shirt.', 'Leo is my friend.', 'He is twelve.'], answer: 'The boy with the red T-shirt.', pt: 'O menino de camiseta vermelha.', why: '"Which one?" = qual deles. Aponte pela aparência: the boy with...', wrong: { 'Leo is my friend.': 'Não diz qual é o Leo.', 'He is twelve.': 'A idade não ajuda a achar.' } }),
      I(7, 4, { type: 'speak', en: 'My best friend is funny and smart.', pt: 'Meu melhor amigo é engraçado e inteligente.', why: '"Best friend" = melhor amigo.' }),
      I(7, 5, { type: 'speak', en: 'She has blue eyes.', pt: 'Ela tem olhos azuis.', why: '"Eyes" soa como "áiz".' }),
      I(7, 6, { type: 'dialogue', lines: [['A', 'Your daughter is very pretty!'], ['B', '___']], options: ['Thank you! She is very nice, too.', "You're welcome!", 'Yes, she has.'], answer: 'Thank you! She is very nice, too.', pt: 'Obrigado! Ela também é muito querida.', why: 'Agradeça o elogio.', wrong: { "You're welcome!": 'É "de nada".', 'Yes, she has.': 'Não combina com "is very pretty".' } }),
    ]),
    L(8, 'Lendo: procurando um colega', [
      I(8, 1, { type: 'story', why: 'Uma mensagem para encontrar uma pessoa no aeroporto. Leia a descrição com atenção.' }),
      I(8, 2, { type: 'quiz', q: 'Como é o cabelo do Mike?', options: ['Curto e loiro', 'Comprido e preto', 'Curto e preto'], answer: 'Curto e loiro', why: '"He has got short blond hair".' }),
      I(8, 3, { type: 'quiz', q: 'O que o Mike está vestindo?', options: ['Jaqueta verde', 'Camiseta vermelha', 'Casaco preto'], answer: 'Jaqueta verde', why: '"Today he is wearing a green jacket".' }),
      I(8, 4, { type: 'quiz', q: 'Como é o jeito do Mike?', options: ['Quieto, mas muito legal', 'Engraçado e falante', 'Preguiçoso'], answer: 'Quieto, mas muito legal', why: '"He is quiet, but very nice".' }),
    ], {
      title: 'Procurando um colega',
      lines: [
        { who: 'Laura', en: 'Hi, Pedro! Please meet my friend Mike at the airport.', pt: 'Oi, Pedro! Por favor, encontre meu amigo Mike no aeroporto.' },
        { who: 'Laura', en: 'He is tall and thin. He has got short blond hair.', pt: 'Ele é alto e magro. Tem cabelo loiro curto.' },
        { ask: 'Como é o Mike?', options: ['Alto e magro', 'Baixo e magro', 'Alto e forte'], answer: 'Alto e magro', why: '"He is tall and thin".' },
        { who: 'Laura', en: 'He wears ___ and today he is wearing a green jacket.', pt: 'Ele usa óculos e hoje está de jaqueta verde.', gap: { answer: 'glasses', options: ['glasses', 'glass', 'eyes'] } },
        { who: 'Laura', en: 'He is quiet, but very nice. Thank you!', pt: 'Ele é quieto, mas muito legal. Obrigada!' },
        { ask: 'Onde o Pedro encontra o Mike?', options: ['No aeroporto', 'Na estação', 'No hotel'], answer: 'No aeroporto', why: '"Meet my friend Mike at the airport".' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'My grandma ___ got short white hair.', pt: 'Minha avó tem cabelo branco curto.', options: ['has', 'have', 'is'], answer: 'has', why: '"My grandma" (she) + has got.', wrong: { have: '"Have" vai com I, you, we e they.', is: '"Is got" não existe.' } }),
      I(9, 2, { type: 'type', pt: 'Ele é tímido e quieto.', answer: 'He is shy and quiet.', accept: ["He's shy and quiet."], why: 'Personalidade com to be.' }),
      I(9, 3, { type: 'meaning', en: 'The tall woman with long hair is my aunt.', options: ['A mulher alta de cabelo comprido é minha tia.', 'A mulher baixa de cabelo curto é minha tia.', 'Minha tia tem cabelo comprido e é baixa.'], answer: 'A mulher alta de cabelo comprido é minha tia.', why: 'Tall woman = mulher alta. With long hair = de cabelo comprido.' }),
      I(9, 4, { type: 'dictation', en: 'What is your teacher like?', why: '"What is ... like?" = como ele é?' }),
      I(9, 5, { type: 'listen', en: 'She is pretty, smart and very nice.', options: ['Ela é bonita, inteligente e muito legal.', 'Ela é alta, tímida e muito legal.', 'Ela é bonita, mas preguiçosa.'], answer: 'Ela é bonita, inteligente e muito legal.', why: '"Pretty" = bonita, "smart" = inteligente, "nice" = legal.' }),
      I(9, 6, { type: 'speak', en: 'My sister has long black hair.', pt: 'Minha irmã tem cabelo preto comprido.', why: 'Long (tamanho) antes de black (cor).' }),
    ]),
    L(10, 'História: o novo colega', [
      I(10, 1, { type: 'story', why: 'A Ana conta para a Julia sobre um colega novo. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Como é o colega novo?', options: ['Alto, de cabelo preto e olhos verdes', 'Baixo e loiro', 'Alto, loiro e de óculos'], answer: 'Alto, de cabelo preto e olhos verdes', why: '"He is tall, he has got black hair and green eyes".' }),
      I(10, 3, { type: 'quiz', q: 'Ele é tímido?', options: ['Não, é engraçado e fala muito', 'Sim, muito', 'Não diz'], answer: 'Não, é engraçado e fala muito', why: '"He isn\'t shy. He is funny and he talks a lot".' }),
      I(10, 4, { type: 'quiz', q: 'Quem é o colega novo?', options: ['O irmão da Julia', 'O primo da Ana', 'O professor'], answer: 'O irmão da Julia', why: '"That is my brother!".' }),
    ], {
      title: 'O novo colega',
      lines: [
        { who: 'Ana', en: 'Julia, there is a new boy in my class!', pt: 'Julia, tem um menino novo na minha turma!' },
        { who: 'Julia', en: "Really? What does he look like?", pt: 'Sério? Como ele é?' },
        { who: 'Ana', en: 'He is tall, he has got black hair and green eyes.', pt: 'Ele é alto, tem cabelo preto e olhos verdes.' },
        { ask: 'Qual é a cor dos olhos dele?', options: ['Verdes', 'Pretos', 'Azuis'], answer: 'Verdes', why: '"Green eyes" = olhos verdes.' },
        { who: 'Julia', en: "And what's he ___?", pt: 'E como ele é de jeito?', gap: { answer: 'like', options: ['like', 'look', 'has'] } },
        { who: 'Ana', en: "He isn't shy. He is funny and he talks a lot. His name is Lucas.", pt: 'Ele não é tímido. É engraçado e fala muito. O nome dele é Lucas.' },
        { who: 'Julia', en: 'Lucas? Ha! That is my brother!', pt: 'Lucas? Ha! É o meu irmão!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a1u15', level: 'A1', unlock: 'a1-u15', title: 'Quem é o seu melhor amigo?',
  intro: 'A Ana e o Tom descrevem os melhores amigos: a aparência e o jeito de cada um.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Hello!", pt: 'E eu sou o Tom. Olá!' },
    { who: 'ana', en: 'Tom, who is your best friend?', pt: 'Tom, quem é o seu melhor amigo?' },
    { who: 'tom', en: 'My best friend is Leo. He is short and he has got long black hair.', pt: 'Meu melhor amigo é o Leo. Ele é baixo e tem cabelo preto comprido.' },
    { who: 'ana', en: "What's he like?", pt: 'E como ele é de jeito?' },
    { who: 'tom', en: 'He is very funny, but a little lazy!', pt: 'Ele é muito engraçado, mas um pouco preguiçoso!' },
    { who: 'tom', en: 'And your best friend, Ana?', pt: 'E a sua melhor amiga, Ana?' },
    { who: 'ana', en: 'Her name is Sofia. She is tall and she wears glasses.', pt: 'O nome dela é Sofia. Ela é alta e usa óculos.' },
    { who: 'ana', en: 'She is shy, but she is very smart and nice.', pt: 'Ela é tímida, mas é muito inteligente e legal.' },
    { who: 'tom', en: "That's all for today. Thank you for listening!", pt: 'Por hoje é só. Obrigado por ouvir!' },
    { who: 'ana', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'Como é o cabelo do Leo?', options: ['Preto e comprido', 'Loiro e curto', 'Castanho e curto'], answer: 'Preto e comprido', why: '"He has got long black hair".' },
    { q: 'Como é o jeito do Leo?', options: ['Engraçado e um pouco preguiçoso', 'Tímido e quieto', 'Sério e inteligente'], answer: 'Engraçado e um pouco preguiçoso', why: '"He is very funny, but a little lazy".' },
    { q: 'O que a Sofia usa?', options: ['Óculos', 'Chapéu', 'Jaqueta verde'], answer: 'Óculos', why: '"She wears glasses" = ela usa óculos.' },
  ],
}, 'pod-a1u14');
addScene('a1-u15', 'standing-12', 'talk');
