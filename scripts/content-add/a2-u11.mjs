// Etapa 2 do A2 completo: unidade nova 11 — Convites e combinados.
// Gera src/content/a2/unit-11.json. Todas as lições levam "added".
// Uso: node scripts/content-add/a2-u11.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u11-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u11l${n}-${k}`, ...o });

writeUnit('a2/unit-11.json', {
  id: 'a2-u11', level: 'A2', order: 11,
  title: 'Convites e combinados',
  subtitle: 'Convidar, aceitar, recusar com educação e combinar um programa.',
  can_do: {
    text: 'Consigo fazer e responder convites, sugerir um programa e combinar dia, hora e lugar.',
    source: 'CEFR (Conselho da Europa) — Interação oral: fazer convites, sugestões e combinar encontros, nível A2',
  },
  core_inventory: ['Functions: inviting, accepting and refusing', 'Functions: making suggestions (Let\'s..., How about...?, Why don\'t we...?)', 'Grammar: Would you like to...? / I\'d love to', 'Grammar: present continuous for future arrangements'],
  words: [
    ['invite', 'convidar'],
    ['accept', 'aceitar'],
    ['free', 'livre, desocupado(a)'],
    ['busy', 'ocupado(a)'],
    ['barbecue', 'churrasco'],
    ['picnic', 'piquenique'],
    ['festival', 'festival'],
    ['theatre', 'teatro'],
    ['guest', 'convidado(a)'],
    ['celebrate', 'comemorar'],
    ['anniversary', 'aniversário (de casamento, de empresa)'],
    ['suggest', 'sugerir'],
    ['instead', 'em vez disso, no lugar'],
    ['unfortunately', 'infelizmente'],
    ['pity', 'pena (que pena)'],
  ],
  guide: {
    title: 'Convidar, aceitar e combinar',
    intro: 'Para convidar alguém em inglês, o jeito mais educado é "Would you like to...?". Para sugerir, usamos "Let\'s...", "How about...?" e "Why don\'t we...?". E para falar de um compromisso já marcado, usamos o presente contínuo.',
    points: [
      { en: 'Would you like to come to my party?', pt: 'Você gostaria de vir à minha festa?', note: '"Would you like to + verbo" é o convite educado.' },
      { en: "I'd love to!", pt: 'Eu adoraria!', note: 'O "sim" mais simpático. Também vale "Yes, sure!" e "Sounds great!".' },
      { en: "Sorry, I can't. I'm busy on Saturday.", pt: 'Desculpa, não posso. Estou ocupado no sábado.', note: 'Para recusar com educação: peça desculpas e dê um motivo.' },
      { en: "Let's have a barbecue!", pt: 'Vamos fazer um churrasco!', note: '"Let\'s" + verbo normal = vamos...' },
      { en: 'How about going to the cinema?', pt: 'Que tal ir ao cinema?', note: 'Depois de "How about" o verbo vai com -ing.' },
      { en: "I'm meeting Julia on Friday.", pt: 'Vou encontrar a Julia na sexta. (já está combinado)', note: 'Presente contínuo + quando = compromisso já marcado no futuro.' },
    ],
    tips: ['"Birthday" é aniversário de pessoa; "anniversary" é de casamento, de namoro ou de empresa.', '"Are you free on Sunday?" é a pergunta natural antes de convidar alguém.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Você gostaria de...?', [
      I(1, 1, { type: 'match', pairs: [['invite', 'convidar'], ['accept', 'aceitar'], ['guest', 'convidado'], ['celebrate', 'comemorar']], why: '"Guest" se fala "GUÉST": o "u" é mudo.' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'Would you like ___ to the cinema?', pt: 'Você gostaria de ir ao cinema?', options: ['to go', 'going', 'go'], answer: 'to go', why: '"Would you like" + to + verbo.', wrong: { going: '"Would like" pede "to".', go: 'Falta o "to".' } }),
      I(1, 3, { type: 'meaning', en: "We're having a barbecue on Sunday. Would you like to come?", options: ['Vamos fazer um churrasco no domingo. Você gostaria de vir?', 'Fizemos um churrasco no domingo. Você veio?', 'Você gosta de churrasco no domingo?'], answer: 'Vamos fazer um churrasco no domingo. Você gostaria de vir?', why: '"We\'re having" = vamos fazer (já combinado). "Would you like to come?" = convite.' }),
      I(1, 4, { type: 'listen', en: 'Are you free on Saturday?', options: ['Você está livre no sábado?', 'Você está ocupado no sábado?', 'Você vem no sábado?'], answer: 'Você está livre no sábado?', why: '"Free" aqui é livre, sem compromisso (não é "grátis").' }),
      I(1, 5, { type: 'build', pt: 'Você gostaria de vir à minha festa?', answer: 'Would you like to come to my party', extra: ['coming', 'do'], display: 'Would you like to come to my party?', why: '"Would you like to + verbo" = convite educado.' }),
      I(1, 6, { type: 'choice', prompt: 'Complete:', en: "I'd ___ to come!", pt: 'Eu adoraria ir!', options: ['love', 'loving', 'loves'], answer: 'love', why: '"I\'d love to" = eu adoraria. "I\'d" = I would.', wrong: { loving: 'Depois de "I\'d" o verbo fica normal.', loves: 'Sem -s com "I".' } }),
    ]),
    L(2, 'Sim ou não, com educação', [
      I(2, 1, { type: 'match', pairs: [['free', 'livre'], ['busy', 'ocupado'], ['unfortunately', 'infelizmente'], ['pity', 'pena']], why: '"What a pity!" = que pena! Use quando alguém não pode ir.' }),
      I(2, 2, { type: 'dialogue', lines: [['A', 'Would you like to come to the festival?'], ['B', '___']], options: ['Yes, sure! Sounds great!', 'Yes, I like.', 'Yes, I would like the festival.'], answer: 'Yes, sure! Sounds great!', pt: 'Claro! Parece ótimo!', why: '"Sounds great!" = parece ótimo. Jeito natural de aceitar.', wrong: { 'Yes, I like.': '"I like" sozinho não aceita um convite.', 'Yes, I would like the festival.': 'Soa estranho. Diga "I\'d love to!".' } }),
      I(2, 3, { type: 'dialogue', lines: [['A', 'Do you want to have dinner tonight?'], ['B', '___']], options: ["Sorry, I can't. I'm working late.", "No. I don't want.", "Sorry, I don't can."], answer: "Sorry, I can't. I'm working late.", pt: 'Desculpa, não posso. Vou trabalhar até tarde.', why: 'Recusa educada: desculpa + motivo.', wrong: { "No. I don't want.": 'Fica grosseiro e incompleto.', "Sorry, I don't can.": 'A negativa de can é "can\'t".' } }),
      I(2, 4, { type: 'choice', prompt: 'Complete:', en: "___, I'm busy that day.", pt: 'Infelizmente, estou ocupado nesse dia.', options: ['Unfortunately', 'Of course', 'Great'], answer: 'Unfortunately', why: '"Unfortunately" = infelizmente. Suaviza a recusa.', wrong: { 'Of course': '"Of course" é "claro", para aceitar.', Great: '"Great" é ótimo, não combina com uma recusa.' } }),
      I(2, 5, { type: 'dialogue', lines: [['A', "I can't come to your party. I'm ill."], ['B', '___']], options: ['Oh, what a pity! Get well soon.', "Oh, great! See you there.", 'Oh, you should come.'], answer: 'Oh, what a pity! Get well soon.', pt: 'Ah, que pena! Melhoras.', why: '"What a pity!" = que pena. "Get well soon" = melhoras.', wrong: { "Oh, great! See you there.": 'A pessoa NÃO vai.', 'Oh, you should come.': 'Ela está doente; insistir não é educado.' } }),
      I(2, 6, { type: 'speak', en: "I'd love to, thank you!", pt: 'Eu adoraria, obrigado!', why: '"I\'d love to" soa como "áid LÂV tu".' }),
    ]),
    L(3, 'Vamos...? Que tal...?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "Let's ___ a picnic in the park.", pt: 'Vamos fazer um piquenique no parque.', options: ['have', 'having', 'to have'], answer: 'have', why: '"Let\'s" + verbo normal.', wrong: { having: 'Depois de "let\'s", sem -ing.', 'to have': 'Sem "to" depois de "let\'s".' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'How about ___ to the theatre?', pt: 'Que tal ir ao teatro?', options: ['going', 'go', 'to go'], answer: 'going', why: '"How about" + -ing.', wrong: { go: 'Depois de "how about", -ing.', 'to go': '"How about to go" não existe.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: "Why don't we ___ pizza tonight?", pt: 'Por que a gente não pede pizza hoje?', options: ['order', 'ordering', 'to order'], answer: 'order', why: '"Why don\'t we" + verbo normal = sugestão.', wrong: { ordering: 'Sem -ing aqui.', 'to order': 'Sem "to".' } }),
      I(3, 4, { type: 'meaning', en: "It's raining. Let's watch a film at home instead.", options: ['Está chovendo. Vamos ver um filme em casa, em vez disso.', 'Está chovendo. Vamos ao cinema.', 'Está fazendo sol. Vamos sair.'], answer: 'Está chovendo. Vamos ver um filme em casa, em vez disso.', why: '"Instead" = em vez disso, no lugar.' }),
      I(3, 5, { type: 'build', pt: 'Que tal comemorar no sábado?', answer: 'How about celebrating on Saturday', extra: ['celebrate', 'in'], display: 'How about celebrating on Saturday?', why: '"How about + -ing". Dia da semana com "on".' }),
      I(3, 6, { type: 'dialogue', lines: [['A', "Let's go to the beach!"], ['B', '___']], options: ["Good idea! Let's go!", 'Good idea! Lets going!', 'Good idea! Go we!'], answer: "Good idea! Let's go!", pt: 'Boa ideia! Vamos!', why: '"Good idea!" = boa ideia. "Let\'s go!" = vamos!', wrong: { 'Good idea! Lets going!': 'Precisa do apóstrofo (let\'s) e verbo sem -ing.', 'Good idea! Go we!': 'Não é assim que se forma "vamos".' } }),
      I(3, 7, { type: 'speak', en: 'How about going to a festival?', pt: 'Que tal ir a um festival?', why: '"How about" soa como "ráu a-BÁUT".' }),
    ]),
    L(4, 'Prática: já está marcado', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "I ___ Julia on Friday at eight.", pt: 'Vou encontrar a Julia na sexta às oito. (já combinado)', options: ['am meeting', 'meet', 'met'], answer: 'am meeting', why: 'Compromisso marcado: presente contínuo + quando (on Friday at eight).', wrong: { meet: '"I meet" é rotina (encontro sempre).', met: '"Met" é passado.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'What ___ you doing this weekend?', pt: 'O que você vai fazer neste fim de semana?', options: ['are', 'do', 'will'], answer: 'are', why: 'Pergunta sobre planos marcados: What are you doing...?', wrong: { do: '"What do you do" pergunta a profissão ou a rotina.', will: '"Will you doing" não existe.' } }),
      I(4, 3, { type: 'meaning', en: "We're celebrating our anniversary next week.", options: ['Vamos comemorar nosso aniversário de casamento semana que vem.', 'Comemoramos nosso aniversário semana passada.', 'Estamos comemorando um aniversário agora.'], answer: 'Vamos comemorar nosso aniversário de casamento semana que vem.', why: '"Next week" mostra que é futuro. "Anniversary" = aniversário de casamento.' }),
      I(4, 4, { type: 'match', pairs: [['barbecue', 'churrasco'], ['picnic', 'piquenique'], ['theatre', 'teatro'], ['festival', 'festival']], why: '"Theatre" é a forma britânica; nos EUA se escreve "theater".' }),
      I(4, 5, { type: 'build', pt: 'Ela vai jantar com os pais dela hoje à noite.', answer: 'She is having dinner with her parents tonight', extra: ['has', 'his'], display: 'She is having dinner with her parents tonight.', why: 'Presente contínuo + "tonight" = plano já marcado.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', 'Are you free on Sunday?'], ['B', '___']], options: ["No, I'm visiting my grandma.", 'No, I visit my grandma yesterday.', 'No, I am visit my grandma.'], answer: "No, I'm visiting my grandma.", pt: 'Não, vou visitar minha avó.', why: 'Compromisso combinado: I\'m visiting.', wrong: { 'No, I visit my grandma yesterday.': '"Yesterday" é passado.', 'No, I am visit my grandma.': 'Falta o -ing: visiting.' } }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'I suggest ___ at seven.', pt: 'Sugiro a gente se encontrar às sete.', options: ['meeting', 'to meet', 'meet'], answer: 'meeting', why: '"Suggest" + -ing.', wrong: { 'to meet': '"Suggest" não aceita "to".', meet: 'Precisa do -ing.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Você gostaria de vir?', answer: 'Would you like to come?', why: '"Would you like to + verbo?" = convite.' }),
      I(5, 2, { type: 'type', pt: 'Vamos fazer um churrasco!', answer: "Let's have a barbecue!", why: '"Let\'s have" = vamos fazer (uma refeição, uma festa).' }),
      I(5, 3, { type: 'dictation', en: 'Are you free tomorrow?', why: '"Free" = livre, sem compromisso.' }),
      I(5, 4, { type: 'type', pt: 'Desculpa, estou ocupado.', answer: "Sorry, I'm busy.", accept: ['Sorry, I am busy.'], why: '"Busy" = ocupado. Soa como "BÍ-zi".' }),
      I(5, 5, { type: 'dictation', en: 'How about a picnic?', why: '"How about" também funciona com um substantivo: How about a picnic?' }),
      I(5, 6, { type: 'type', pt: 'Eu adoraria!', answer: "I'd love to!", accept: ['I would love to!'], why: '"I\'d love to!" = eu adoraria.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "Why don't we meet at the station?", options: ['Por que a gente não se encontra na estação?', 'Por que você não foi à estação?', 'A gente se encontrou na estação.'], answer: 'Por que a gente não se encontra na estação?', why: '"Why don\'t we...?" = sugestão.' }),
      I(6, 2, { type: 'dictation', en: "I'm meeting my friends tonight.", why: 'Presente contínuo para um plano marcado.' }),
      I(6, 3, { type: 'listen', en: 'Thank you for inviting me!', options: ['Obrigado por me convidar!', 'Obrigado por vir!', 'Obrigado pelo presente!'], answer: 'Obrigado por me convidar!', why: '"Thank you for + -ing". "Invite" = convidar.' }),
      I(6, 4, { type: 'dictation', en: 'There are twenty guests.', why: '"Guests" = convidados. O "u" é mudo: "GUÉSTS".' }),
      I(6, 5, { type: 'listen', en: 'What a pity you can\'t come.', options: ['Que pena que você não pode vir.', 'Que bom que você pode vir.', 'Você não quer vir?'], answer: 'Que pena que você não pode vir.', why: '"What a pity" = que pena.' }),
      I(6, 6, { type: 'dictation', en: "Let's celebrate!", why: '"Celebrate" soa como "SÉ-le-breit".' }),
      I(6, 7, { type: 'speak', en: 'Are you doing anything on Saturday?', pt: 'Você vai fazer alguma coisa no sábado?', why: 'Jeito comum de puxar um convite.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Are you doing anything on Friday night?'], ['B', '___']], options: ["No, I'm free. Why?", 'No, I free. Why?', 'No, I am doing free.'], answer: "No, I'm free. Why?", pt: 'Não, estou livre. Por quê?', why: '"I\'m free" = estou livre. "Why?" abre espaço para o convite.', wrong: { 'No, I free. Why?': 'Falta o "am": I\'m free.', 'No, I am doing free.': 'Não faz sentido.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Would you like to see a play at the theatre?'], ['B', '___']], options: ['Sounds great! What time?', 'Sounds great! What time is it now?', 'I like theatre.'], answer: 'Sounds great! What time?', pt: 'Parece ótimo! Que horas?', why: 'Aceite e já combine a hora: What time?', wrong: { 'Sounds great! What time is it now?': 'Isso pergunta as horas agora, não a hora do programa.', 'I like theatre.': 'Não responde se você vai ou não.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "It starts at eight. Let's meet at seven thirty."], ['B', '___']], options: ['OK. Where should we meet?', 'OK. Where we meet should?', 'OK. When is eight?'], answer: 'OK. Where should we meet?', pt: 'Certo. Onde a gente se encontra?', why: '"Where should we meet?" = onde a gente se encontra?', wrong: { 'OK. Where we meet should?': 'Ordem errada: Where + should + we + meet.', 'OK. When is eight?': 'Não faz sentido.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'How about in front of the theatre?'], ['B', '___']], options: ['Perfect. See you on Friday!', 'Perfect. See you yesterday!', 'Perfect. I see you Friday ago!'], answer: 'Perfect. See you on Friday!', pt: 'Perfeito. Até sexta!', why: '"See you on Friday!" = até sexta!', wrong: { 'Perfect. See you yesterday!': '"Yesterday" é passado.', 'Perfect. I see you Friday ago!': '"Ago" é para o passado.' } }),
      I(7, 5, { type: 'speak', en: 'Would you like to have dinner with me?', pt: 'Você gostaria de jantar comigo?', why: '"Would you" soa quase como "UÚ-dju".' }),
      I(7, 6, { type: 'speak', en: "Sorry, I can't. I'm busy.", pt: 'Desculpa, não posso. Estou ocupado.', why: '"Can\'t" soa como "KÉNT" (americano) ou "KÁNT" (britânico).' }),
    ]),
    L(8, 'Lendo: um convite de aniversário', [
      I(8, 1, { type: 'story', why: 'A Emma manda um convite e duas amigas respondem. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que a Emma vai comemorar?', options: ['O aniversário dela', 'O casamento dela', 'Um emprego novo'], answer: 'O aniversário dela', why: '"I\'m celebrating my birthday."' }),
      I(8, 3, { type: 'quiz', q: 'Onde vai ser a festa?', options: ['No jardim da casa dela', 'Num restaurante', 'Na praia'], answer: 'No jardim da casa dela', why: '"A barbecue in my garden."' }),
      I(8, 4, { type: 'quiz', q: 'Por que a Sarah não pode ir?', options: ['Vai visitar os avós', 'Está doente', 'Vai trabalhar'], answer: 'Vai visitar os avós', why: '"I\'m visiting my grandparents."' }),
    ], {
      title: 'Um convite de aniversário',
      lines: [
        { who: 'Emma', en: "Hi everyone! I'm celebrating my birthday on Saturday.", pt: 'Oi, pessoal! Vou comemorar meu aniversário no sábado.' },
        { who: 'Emma', en: "We're having a barbecue in my garden at four. Would you like to come?", pt: 'Vamos fazer um churrasco no meu jardim às quatro. Vocês gostariam de vir?' },
        { ask: 'A que horas começa o churrasco?', options: ['Às quatro', 'Às oito', 'Ao meio-dia'], answer: 'Às quatro', why: '"At four" = às quatro.' },
        { who: 'Julia', en: "I'd love ___! Can I bring a cake?", pt: 'Eu adoraria! Posso levar um bolo?', gap: { answer: 'to', options: ['to', 'it', 'for'] } },
        { who: 'Sarah', en: "Unfortunately, I can't. I'm visiting my grandparents. What a pity!", pt: 'Infelizmente não posso. Vou visitar meus avós. Que pena!' },
        { who: 'Emma', en: "No problem, Sarah! Let's have lunch next week instead.", pt: 'Sem problema, Sarah! Vamos almoçar na semana que vem, então.' },
        { ask: 'O que a Julia oferece levar?', options: ['Um bolo', 'Bebidas', 'Música'], answer: 'Um bolo', why: '"Can I bring a cake?"' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'How about ___ a film?', pt: 'Que tal ver um filme?', options: ['watching', 'watch', 'to watch'], answer: 'watching', why: '"How about" + -ing.', wrong: { watch: 'Precisa do -ing.', 'to watch': 'Sem "to".' } }),
      I(9, 2, { type: 'type', pt: 'Vou encontrar o Tom amanhã. (já combinado)', answer: "I'm meeting Tom tomorrow.", accept: ['I am meeting Tom tomorrow.'], why: 'Presente contínuo para compromisso marcado.' }),
      I(9, 3, { type: 'meaning', en: "Why don't we invite your neighbours?", options: ['Por que a gente não convida seus vizinhos?', 'Por que seus vizinhos não vieram?', 'Seus vizinhos convidaram a gente.'], answer: 'Por que a gente não convida seus vizinhos?', why: '"Why don\'t we...?" = sugestão.' }),
      I(9, 4, { type: 'dictation', en: 'Would you like to come with us?', why: '"With us" = com a gente.' }),
      I(9, 5, { type: 'listen', en: "I'm afraid I'm busy that evening.", options: ['Infelizmente estou ocupado nessa noite.', 'Tenho medo daquela noite.', 'Estou livre nessa noite.'], answer: 'Infelizmente estou ocupado nessa noite.', why: '"I\'m afraid..." aqui não é medo: é um jeito educado de dar uma má notícia (infelizmente).' }),
      I(9, 6, { type: 'build', pt: 'Vamos comemorar no parque, em vez disso.', answer: "Let's celebrate in the park instead", extra: ['celebrating', 'on'], display: "Let's celebrate in the park instead.", why: '"Let\'s" + verbo normal. "Instead" vai no fim.' }),
    ]),
    L(10, 'História: o plano de sábado', [
      I(10, 1, { type: 'story', why: 'O Tom e a Ana tentam combinar um programa. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Por que eles desistem da praia?', options: ['Vai chover', 'A Ana está ocupada', 'A praia está fechada'], answer: 'Vai chover', why: '"It\'s going to rain on Saturday."' }),
      I(10, 3, { type: 'quiz', q: 'O que eles decidem fazer?', options: ['Ir ao teatro', 'Fazer um churrasco', 'Ficar em casa'], answer: 'Ir ao teatro', why: '"Let\'s go to the theatre instead."' }),
      I(10, 4, { type: 'quiz', q: 'Onde eles vão se encontrar?', options: ['No café em frente ao teatro', 'Na praia', 'Na casa do Tom'], answer: 'No café em frente ao teatro', why: '"At the coffee shop in front of the theatre."' }),
    ], {
      title: 'O plano de sábado',
      lines: [
        { who: 'Tom', en: 'Hi, Ana! Are you free on Saturday?', pt: 'Oi, Ana! Você está livre no sábado?' },
        { who: 'Ana', en: "In the morning I'm working, but I'm free after lunch. Why?", pt: 'De manhã vou trabalhar, mas estou livre depois do almoço. Por quê?' },
        { who: 'Tom', en: 'How about going to the beach?', pt: 'Que tal ir à praia?' },
        { who: 'Ana', en: "It's going to rain on Saturday. Let's go to the theatre ___.", pt: 'Vai chover no sábado. Vamos ao teatro, em vez disso.', gap: { answer: 'instead', options: ['instead', 'ago', 'already'] } },
        { ask: 'A Ana está livre a que horas?', options: ['Depois do almoço', 'De manhã', 'O dia todo'], answer: 'Depois do almoço', why: '"I\'m free after lunch."' },
        { who: 'Tom', en: 'Good idea! The play starts at five.', pt: 'Boa ideia! A peça começa às cinco.' },
        { who: 'Ana', en: "Perfect. Why don't we meet at the coffee shop in front of the theatre?", pt: 'Perfeito. Por que a gente não se encontra no café em frente ao teatro?' },
        { who: 'Tom', en: "OK! See you there at four thirty.", pt: 'Combinado! Te vejo lá às quatro e meia.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u11', level: 'A2', unlock: 'a2-u11', title: 'Como dizer não sem ser grosso',
  intro: 'A Ana e o Tom mostram como convidar, aceitar e recusar com educação.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're talking about how to invite people.", pt: 'E eu sou o Tom. Hoje vamos falar de como convidar as pessoas.' },
    { who: 'ana', en: 'Tom, would you like to come to my house for dinner on Friday?', pt: 'Tom, você gostaria de jantar na minha casa na sexta?' },
    { who: 'tom', en: "I'd love to! But unfortunately I'm working late on Friday.", pt: 'Eu adoraria! Mas infelizmente vou trabalhar até tarde na sexta.' },
    { who: 'ana', en: "What a pity! How about Saturday instead?", pt: 'Que pena! Que tal sábado, então?' },
    { who: 'tom', en: "Saturday is perfect. Can I bring something?", pt: 'Sábado é perfeito. Posso levar alguma coisa?' },
    { who: 'ana', en: "Why don't you bring a dessert?", pt: 'Por que você não leva uma sobremesa?' },
    { who: 'tom', en: "Great idea! See you on Saturday.", pt: 'Ótima ideia! Até sábado.' },
    { who: 'ana', en: "That's all for today. Remember: say sorry and give a reason!", pt: 'Por hoje é só. Lembrem: peçam desculpas e deem um motivo!' },
    { who: 'tom', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'Por que o Tom não pode na sexta?', options: ['Vai trabalhar até tarde', 'Está doente', 'Vai viajar'], answer: 'Vai trabalhar até tarde', why: '"I\'m working late on Friday."' },
    { q: 'Qual dia eles combinam?', options: ['Sábado', 'Domingo', 'Sexta'], answer: 'Sábado', why: '"How about Saturday instead?" — "Saturday is perfect."' },
    { q: 'O que o Tom vai levar?', options: ['Uma sobremesa', 'Bebidas', 'Flores'], answer: 'Uma sobremesa', why: '"Why don\'t you bring a dessert?"' },
  ],
}, 'pod-a2u10');
addScene('a2-u11', 'standing-7', 'party');
