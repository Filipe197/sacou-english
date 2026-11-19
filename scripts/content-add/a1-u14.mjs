// Etapa 3 do A1 completo (docs/plano-expansao-a1.md): unidade nova 14 — O que você está fazendo?
// Gera src/content/a1/unit-14.json, a escuta pod-a1u14 e a cena da trilha.
// Uso: node scripts/content-add/a1-u14.mjs  (pode rodar de novo)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a1-u14-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a1u14l${n}-${k}`, ...o });

writeUnit('a1/unit-14.json', {
  id: 'a1-u14', level: 'A1', order: 14,
  title: 'O que você está fazendo?',
  subtitle: 'Falar do que está acontecendo agora.',
  can_do: {
    text: 'Consigo dizer o que eu e outras pessoas estamos fazendo agora e perguntar o que alguém está fazendo.',
    source: 'CEFR (Conselho da Europa) — Interação: mensagens e ligações simples, nível A1',
  },
  core_inventory: ['Present continuous: am / is / are + -ing', 'What are you doing?', 'now / right now / look!', 'Spelling of -ing (writing, running)'],
  words: [
    ['now', 'agora'],
    ['right now', 'neste momento'],
    ['wait', 'esperar'],
    ['call', 'ligar / chamar'],
    ['write', 'escrever'],
    ['message', 'mensagem'],
    ['run', 'correr'],
    ['sit', 'sentar'],
    ['wear', 'vestir / usar (roupa)'],
    ['talk', 'conversar / falar'],
    ['look', 'olhar'],
    ['listen', 'escutar'],
    ['rain', 'chover / chuva'],
  ],
  guide: {
    title: 'O presente contínuo: o que está acontecendo agora',
    intro: 'Para falar do que está acontecendo AGORA usamos am / is / are + verbo com -ing. É como o "estou fazendo" do português.',
    points: [
      { en: 'I am reading a book.', pt: 'Estou lendo um livro.', note: 'I am + -ing. Com he/she/it: is. Com you/we/they: are.' },
      { en: 'What are you doing?', pt: 'O que você está fazendo?', note: 'Pergunta: o verbo to be vem antes: ARE you doing?' },
      { en: 'She isn\'t working now.', pt: 'Ela não está trabalhando agora.', note: 'Negativa: isn\'t / aren\'t / I\'m not + -ing.' },
      { en: 'It is raining.', pt: 'Está chovendo.', note: 'Para o tempo também: it is raining, it is snowing.' },
      { en: 'write → writing, run → running', pt: 'escrever → escrevendo, correr → correndo', note: 'Verbo terminado em "e" perde o "e" (writing). Verbo curto terminado em consoante dobra a letra (running, sitting).' },
    ],
    tips: ['Compare: "I work every day" (sempre) x "I am working now" (agora).', '"Look!" e "Listen!" no começo da frase pedem o presente contínuo: Look! It is raining!'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Estou fazendo', [
      I(1, 1, { type: 'meaning', en: 'I am reading a book.', options: ['Estou lendo um livro.', 'Eu leio livros.', 'Eu li um livro.'], answer: 'Estou lendo um livro.', why: 'Am + reading = estou lendo (agora).' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'She ___ cooking dinner.', pt: 'Ela está fazendo o jantar.', options: ['is', 'are', 'am'], answer: 'is', why: 'Com she: is + -ing.', wrong: { are: '"Are" vai com you, we e they.', am: '"Am" só vai com I.' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'We are ___ TV.', pt: 'Estamos vendo TV.', options: ['watching', 'watch', 'watches'], answer: 'watching', why: 'Depois de am/is/are o verbo leva -ing.', wrong: { watch: 'Falta o -ing.', watches: 'Com "are" o verbo vai com -ing.' } }),
      I(1, 4, { type: 'build', pt: 'Estou esperando o ônibus.', answer: 'I am waiting for the bus', extra: ['wait', 'is'], display: "I'm waiting for the bus.", why: '"Wait for" = esperar alguém ou algo. Com I: am waiting.' }),
      I(1, 5, { type: 'listen', en: 'They are talking in the kitchen.', options: ['Eles estão conversando na cozinha.', 'Eles conversam na cozinha.', 'Eles estão cozinhando na cozinha.'], answer: 'Eles estão conversando na cozinha.', why: '"Talk" = conversar. They are talking.' }),
      I(1, 6, { type: 'meaning', en: 'Look! It is raining!', options: ['Olha! Está chovendo!', 'Olha! Vai chover!', 'Olha! Choveu!'], answer: 'Olha! Está chovendo!', why: '"It is raining" = está chovendo (agora).' }),
    ]),
    L(2, 'O que você está fazendo?', [
      I(2, 1, { type: 'meaning', en: 'What are you doing?', options: ['O que você está fazendo?', 'O que você faz?', 'O que você quer?'], answer: 'O que você está fazendo?', why: 'Pergunta do presente contínuo: What + are + you + doing?' }),
      I(2, 2, { type: 'choice', prompt: 'Complete a pergunta:', en: '___ he sleeping?', pt: 'Ele está dormindo?', options: ['Is', 'Does', 'Are'], answer: 'Is', why: 'Na pergunta o verbo to be vem antes: Is he sleeping?', wrong: { Does: '"Does" é do presente simples.', Are: 'Com he é "is".' } }),
      I(2, 3, { type: 'dialogue', lines: [['A', 'Are you working?'], ['B', '___']], options: ["No, I'm not. I'm at home.", "No, I don't.", 'No, I working.'], answer: "No, I'm not. I'm at home.", pt: 'Não, não estou. Estou em casa.', why: 'Pergunta com "Are you...?": resposta "Yes, I am / No, I\'m not".', wrong: { "No, I don't.": 'Responde "Do you...?".', 'No, I working.': 'Falta o "am".' } }),
      I(2, 4, { type: 'build', pt: 'O que ela está escrevendo?', answer: 'What is she writing', extra: ['does', 'write'], display: 'What is she writing?', why: 'What + is + she + writing. "Write" perde o "e": writing.' }),
      I(2, 5, { type: 'listen', en: 'Who are you calling?', options: ['Para quem você está ligando?', 'Quem está ligando?', 'Você está ligando?'], answer: 'Para quem você está ligando?', why: '"Call" = ligar. "Who" = quem.' }),
      I(2, 6, { type: 'choice', prompt: 'Complete:', en: "I'm ___ a message to my mom.", pt: 'Estou escrevendo uma mensagem para minha mãe.', options: ['writing', 'writeing', 'write'], answer: 'writing', why: 'Write termina em "e": tiramos o "e" e pomos -ing: writing.', wrong: { writeing: 'O "e" final cai: writing.', write: 'Falta o -ing.' } }),
    ]),
    L(3, 'Agora x sempre', [
      I(3, 1, { type: 'meaning', en: 'I work every day, but now I am sleeping.', options: ['Trabalho todo dia, mas agora estou dormindo.', 'Estou trabalhando e agora vou dormir.', 'Durmo todo dia e agora estou trabalhando.'], answer: 'Trabalho todo dia, mas agora estou dormindo.', why: 'Presente simples para rotina (every day); presente contínuo para agora (now).' }),
      I(3, 2, { type: 'choice', prompt: 'É agora ou sempre?', en: 'Look! The baby ___.', pt: 'Olha! O bebê está dormindo.', options: ['is sleeping', 'sleeps', 'sleep'], answer: 'is sleeping', why: '"Look!" mostra que é agora: is sleeping.', wrong: { sleeps: '"Sleeps" é hábito (ele dorme), não agora.', sleep: 'Com "the baby" (it) nem estaria certo.' } }),
      I(3, 3, { type: 'choice', prompt: 'É agora ou sempre?', en: 'She ___ to school every day.', pt: 'Ela vai à escola todo dia.', options: ['goes', 'is going', 'going'], answer: 'goes', why: '"Every day" é rotina: presente simples (goes).', wrong: { 'is going': 'O contínuo é para agora, não para rotina.', going: 'Falta o verbo to be, e aqui é rotina.' } }),
      I(3, 4, { type: 'build', pt: 'Ele está correndo no parque agora.', answer: 'He is running in the park now', extra: ['runs', 'runing'], display: 'He is running in the park now.', why: '"Run" dobra o "n": running.' }),
      I(3, 5, { type: 'meaning', en: "She is wearing a red dress today.", options: ['Ela está usando um vestido vermelho hoje.', 'Ela usa vestido vermelho todo dia.', 'Ela está comprando um vestido vermelho.'], answer: 'Ela está usando um vestido vermelho hoje.', why: '"Wear" = usar, vestir (roupa).' }),
      I(3, 6, { type: 'listen', en: "I'm sitting in the garden.", options: ['Estou sentado no jardim.', 'Eu sento no jardim.', 'Estou correndo no jardim.'], answer: 'Estou sentado no jardim.', why: '"Sit" dobra o "t": sitting.' }),
    ]),
    L(4, 'Mensagens e ligações', [
      I(4, 1, { type: 'match', pairs: [['call', 'ligar'], ['wait', 'esperar'], ['write', 'escrever'], ['listen', 'escutar']], why: 'Verbos comuns em mensagens e ligações.' }),
      I(4, 2, { type: 'meaning', en: "Sorry, I can't talk now. I'm driving.", options: ['Desculpe, não posso falar agora. Estou dirigindo.', 'Desculpe, não sei falar. Eu dirijo.', 'Desculpe, estou falando e dirigindo.'], answer: 'Desculpe, não posso falar agora. Estou dirigindo.', why: '"Drive" perde o "e": driving.' }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: "They aren't ___. They're sleeping.", pt: 'Eles não estão escutando. Estão dormindo.', options: ['listening', 'listen', 'listens'], answer: 'listening', why: 'Negativa: aren\'t + -ing.', wrong: { listen: 'Falta o -ing.', listens: 'Com "aren\'t" usamos -ing.' } }),
      I(4, 4, { type: 'dialogue', lines: [['A', "Hi! Where are you? I'm waiting for you."], ['B', '___']], options: ["Sorry! I'm coming now.", "Sorry! I come every day.", "I'm wait."], answer: "Sorry! I'm coming now.", pt: 'Desculpa! Estou chegando.', why: '"I\'m coming" = estou indo/chegando.', wrong: { 'Sorry! I come every day.': 'Fala de rotina, não de agora.', "I'm wait.": 'Falta o -ing.' } }),
      I(4, 5, { type: 'build', pt: 'Estou te ligando agora.', answer: 'I am calling you now', extra: ['call', 'are'], display: "I'm calling you now.", why: 'I am + calling + you.' }),
      I(4, 6, { type: 'meaning', en: 'Are you listening to me?', options: ['Você está me escutando?', 'Você me escuta sempre?', 'Você está me ligando?'], answer: 'Você está me escutando?', why: '"Listen to" = escutar alguém ou algo.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Estou lendo.', answer: 'I am reading.', accept: ["I'm reading."], why: 'I am + reading.' }),
      I(5, 2, { type: 'type', pt: 'O que você está fazendo?', answer: 'What are you doing?', why: 'What + are + you + doing?' }),
      I(5, 3, { type: 'dictation', en: 'It is raining now.', accept: ["It's raining now."], why: '"It is raining" = está chovendo.' }),
      I(5, 4, { type: 'type', pt: 'Ela está correndo.', answer: 'She is running.', accept: ["She's running."], why: '"Run" dobra o "n": running.' }),
      I(5, 5, { type: 'dictation', en: "We're waiting for the bus.", accept: ['We are waiting for the bus.'], why: '"Wait for" = esperar.' }),
      I(5, 6, { type: 'type', pt: 'Ele não está trabalhando.', answer: "He isn't working.", accept: ['He is not working.', "He's not working."], why: 'Negativa: isn\'t + -ing.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'What are you doing right now?', options: ['O que você está fazendo neste momento?', 'O que você faz todo dia?', 'O que você vai fazer agora?'], answer: 'O que você está fazendo neste momento?', why: '"Right now" = neste exato momento.' }),
      I(6, 2, { type: 'dictation', en: "I'm writing a message.", accept: ['I am writing a message.'], why: '"Message" soa como "MÉ-sidj".' }),
      I(6, 3, { type: 'listen', en: 'The children are playing in the garden.', options: ['As crianças estão brincando no jardim.', 'As crianças brincam no jardim.', 'As crianças estão dormindo no jardim.'], answer: 'As crianças estão brincando no jardim.', why: '"Play" também é brincar. "Children" = crianças.' }),
      I(6, 4, { type: 'dictation', en: 'She is wearing a hat.', accept: ["She's wearing a hat."], why: '"Wear" = usar (roupa, chapéu).' }),
      I(6, 5, { type: 'listen', en: "He isn't sleeping. He's reading.", options: ['Ele não está dormindo. Está lendo.', 'Ele está dormindo e lendo.', 'Ele não lê. Ele dorme.'], answer: 'Ele não está dormindo. Está lendo.', why: '"Isn\'t" = não está.' }),
      I(6, 6, { type: 'dictation', en: 'Are you listening?', why: '"Listen" tem o "t" mudo: "LÍ-sen".' }),
      I(6, 7, { type: 'speak', en: "I'm waiting for you.", pt: 'Estou te esperando.', why: '"Waiting" soa como "UÊI-ting".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Hi, Ana! What are you doing?'], ['B', '___']], options: ["I'm cooking dinner.", 'I cook dinner every day.', "I'm cook."], answer: "I'm cooking dinner.", pt: 'Estou fazendo o jantar.', why: 'Pergunta sobre agora: responda com am + -ing.', wrong: { 'I cook dinner every day.': 'Fala da rotina, não de agora.', "I'm cook.": 'Diria "eu sou cozinheiro" errado.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Is it raining there?'], ['B', '___']], options: ["Yes, it is. Take a coat!", 'Yes, it does.', 'Yes, it rain.'], answer: 'Yes, it is. Take a coat!', pt: 'Sim, está. Leve um casaco!', why: '"Is it...?" se responde "Yes, it is / No, it isn\'t".', wrong: { 'Yes, it does.': 'Responde "Does it...?".', 'Yes, it rain.': 'Falta o verbo to be.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Can you talk now?'], ['B', '___']], options: ["Sorry, I'm driving. I can call you later.", "Yes, I'm talk.", 'No, I talking.'], answer: "Sorry, I'm driving. I can call you later.", pt: 'Desculpa, estou dirigindo. Posso te ligar depois.', why: 'Explique o que está fazendo e ofereça ligar depois: call you later.', wrong: { "Yes, I'm talk.": 'Falta o -ing.', 'No, I talking.': 'Falta o "am".' } }),
      I(7, 4, { type: 'speak', en: 'What are you doing?', pt: 'O que você está fazendo?', why: 'Fale ligando: "uót ar iu DÚ-ing".' }),
      I(7, 5, { type: 'speak', en: "I'm watching a movie.", pt: 'Estou vendo um filme.', why: '"Watching" soa como "UÓT-ching".' }),
      I(7, 6, { type: 'dialogue', lines: [['A', 'Where is Tom?'], ['B', '___']], options: ["He's sitting in the garden.", 'He sits in the garden every day.', "He's sit."], answer: "He's sitting in the garden.", pt: 'Ele está sentado no jardim.', why: 'Onde ele está agora: is sitting.', wrong: { 'He sits in the garden every day.': 'Fala de rotina.', "He's sit.": 'Falta o -ing (sitting).' } }),
    ]),
    L(8, 'Lendo: mensagens no grupo', [
      I(8, 1, { type: 'story', why: 'Mensagens no grupo da família num sábado. Leia o que cada um está fazendo.' }),
      I(8, 2, { type: 'quiz', q: 'O que a mãe está fazendo?', options: ['Fazendo um bolo', 'Correndo no parque', 'Vendo um filme'], answer: 'Fazendo um bolo', why: '"I\'m making a cake".' }),
      I(8, 3, { type: 'quiz', q: 'Onde o Lucas está?', options: ['No parque', 'Em casa', 'No ônibus'], answer: 'No parque', why: '"I\'m running in the park".' }),
      I(8, 4, { type: 'quiz', q: 'Por que a Julia não responde rápido?', options: ['Está dirigindo', 'Está dormindo', 'Está no trabalho'], answer: 'Está dirigindo', why: '"I\'m driving! Talk later!".' }),
    ], {
      title: 'Mensagens no grupo',
      lines: [
        { who: 'Ana', en: 'Hi, family! What are you doing?', pt: 'Oi, família! O que vocês estão fazendo?' },
        { who: 'Ana', en: "I'm at home. I'm making a cake for dinner!", pt: 'Estou em casa. Estou fazendo um bolo para o jantar!' },
        { who: 'Lucas', en: "I'm running in the park. It's sunny!", pt: 'Estou correndo no parque. Está ensolarado!' },
        { ask: 'Como está o tempo onde o Lucas está?', options: ['Ensolarado', 'Chuvoso', 'Frio'], answer: 'Ensolarado', why: '"It\'s sunny!".' },
        { who: 'Julia', en: "I'm driving! Talk ___!", pt: 'Estou dirigindo! A gente fala depois!', gap: { answer: 'later', options: ['later', 'now', 'today'] } },
        { who: 'Ana', en: 'OK! Dinner is at seven. See you!', pt: 'Tá bom! O jantar é às sete. Até mais!' },
        { ask: 'A que horas é o jantar?', options: ['Às sete', 'Às oito', 'Às seis'], answer: 'Às sete', why: '"Dinner is at seven".' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'They ___ playing football now.', pt: 'Eles estão jogando futebol agora.', options: ['are', 'is', 'do'], answer: 'are', why: 'Com they: are + -ing.', wrong: { is: '"Is" vai com he, she e it.', do: '"Do" é do presente simples.' } }),
      I(9, 2, { type: 'type', pt: 'Estou ouvindo música.', answer: 'I am listening to music.', accept: ["I'm listening to music."], why: '"Listen TO music" + -ing.' }),
      I(9, 3, { type: 'meaning', en: 'He usually walks to work, but today he is taking the bus.', options: ['Ele costuma ir a pé, mas hoje está pegando o ônibus.', 'Ele está andando, mas pega o ônibus todo dia.', 'Ele vai de ônibus todo dia.'], answer: 'Ele costuma ir a pé, mas hoje está pegando o ônibus.', why: '"Usually" = rotina (presente simples); "today" = agora (contínuo).' }),
      I(9, 4, { type: 'dictation', en: 'What is she wearing?', why: 'What + is + she + wearing?' }),
      I(9, 5, { type: 'listen', en: "Listen! The baby is crying.", options: ['Escuta! O bebê está chorando.', 'Escuta! O bebê está dormindo.', 'Olha! O bebê está rindo.'], answer: 'Escuta! O bebê está chorando.', why: '"Cry" = chorar. "Listen!" mostra que é agora.' }),
      I(9, 6, { type: 'speak', en: "It's raining, so I'm reading at home.", pt: 'Está chovendo, então estou lendo em casa.', why: '"So" = então (resultado).' }),
    ]),
    L(10, 'História: a ligação', [
      I(10, 1, { type: 'story', why: 'O Tom liga para a Sofia. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que a Sofia está fazendo?', options: ['Estudando inglês', 'Cozinhando', 'Dormindo'], answer: 'Estudando inglês', why: '"I\'m studying English".' }),
      I(10, 3, { type: 'quiz', q: 'Onde o Tom está?', options: ['No café', 'Em casa', 'No ônibus'], answer: 'No café', why: '"I\'m sitting in the cafe".' }),
      I(10, 4, { type: 'quiz', q: 'O que a Sofia decide?', options: ['Ir ao café', 'Ficar em casa', 'Ligar depois'], answer: 'Ir ao café', why: 'Ela diz "I\'m coming!" (estou indo!).' }),
    ], {
      title: 'A ligação',
      lines: [
        { who: 'Tom', en: 'Hi, Sofia! Are you busy?', pt: 'Oi, Sofia! Você está ocupada?' },
        { who: 'Sofia', en: "Hi, Tom! A little. I'm studying English.", pt: 'Oi, Tom! Um pouco. Estou estudando inglês.' },
        { ask: 'O que a Sofia está fazendo?', options: ['Estudando', 'Trabalhando', 'Correndo'], answer: 'Estudando', why: '"I\'m studying English".' },
        { who: 'Tom', en: "I'm sitting in the cafe near your house. Ana and Leo are here too.", pt: 'Estou sentado no café perto da sua casa. A Ana e o Leo também estão aqui.' },
        { who: 'Sofia', en: 'What are you ___?', pt: 'O que vocês estão bebendo?', gap: { answer: 'drinking', options: ['drinking', 'drink', 'drinks'] } },
        { who: 'Tom', en: "We're drinking coffee and eating cake. Come!", pt: 'Estamos tomando café e comendo bolo. Vem!' },
        { who: 'Sofia', en: "Cake? OK, I'm coming!", pt: 'Bolo? Tá bom, estou indo!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a1u14', level: 'A1', unlock: 'a1-u14', title: 'Ao vivo!',
  intro: 'Um episódio ao vivo: a Ana conta o que está acontecendo no estúdio agora.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Hello!", pt: 'E eu sou o Tom. Olá!' },
    { who: 'ana', en: "Today we are live! Tom, what are you doing right now?", pt: 'Hoje estamos ao vivo! Tom, o que você está fazendo neste momento?' },
    { who: 'tom', en: "I'm drinking coffee and reading your messages.", pt: 'Estou tomando café e lendo as mensagens de vocês.' },
    { who: 'ana', en: 'And look! It is raining outside.', pt: 'E olha! Está chovendo lá fora.' },
    { who: 'tom', en: 'Yes, and a man is running with an umbrella!', pt: 'Sim, e um homem está correndo com um guarda-chuva!' },
    { who: 'ana', en: "Ha! What are you doing at home? Write to us!", pt: 'Ha! E vocês, o que estão fazendo em casa? Escrevam para a gente!' },
    { who: 'tom', en: 'Maria is listening in her car. Lucas is cooking dinner.', pt: 'A Maria está ouvindo no carro. O Lucas está fazendo o jantar.' },
    { who: 'ana', en: 'Thank you! We love your messages.', pt: 'Obrigada! A gente adora as mensagens de vocês.' },
    { who: 'tom', en: "That's all for today. Thank you for listening!", pt: 'Por hoje é só. Obrigado por ouvir!' },
    { who: 'ana', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'O que o Tom está fazendo?', options: ['Tomando café e lendo mensagens', 'Cozinhando', 'Correndo na chuva'], answer: 'Tomando café e lendo mensagens', why: '"I\'m drinking coffee and reading your messages".' },
    { q: 'Como está o tempo lá fora?', options: ['Chovendo', 'Ensolarado', 'Nevando'], answer: 'Chovendo', why: '"It is raining outside".' },
    { q: 'Onde a Maria está ouvindo o podcast?', options: ['No carro', 'Na cozinha', 'No parque'], answer: 'No carro', why: '"Maria is listening in her car".' },
  ],
}, 'pod-a1u13');
addScene('a1-u14', 'standing-9', 'phone');
