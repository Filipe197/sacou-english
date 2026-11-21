// Etapa 3 do B2 completo: unidade nova 16 — Falando como nativo (marcadores de conversa). Fecha o curso.
// Gera src/content/b2/unit-16.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u16.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u16-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u16l${n}-${k}`, ...o });

writeUnit('b2/unit-16.json', {
  id: 'b2-u16', level: 'B2', order: 16,
  title: 'Falando como nativo',
  subtitle: 'Marcadores de conversa: well, actually, anyway, by the way, to be honest.',
  can_do: {
    text: 'Consigo conversar com naturalidade: ganhar tempo para pensar, mudar de assunto, voltar ao assunto e dar opinião com sinceridade.',
    source: 'CEFR (Conselho da Europa) — Interação oral: fluência e gestão da conversa, nível B2',
  },
  core_inventory: ['Discourse markers: well, actually, anyway, by the way', 'Discourse markers: to be honest, I mean, you know', 'Functions: changing the subject and coming back to it', 'Functions: softening opinions'],
  words: [
    ['well', 'bom, bem (para pensar)'],
    ['actually', 'na verdade'],
    ['anyway', 'enfim, de qualquer forma'],
    ['by the way', 'por falar nisso, aliás'],
    ['to be honest', 'para ser sincero'],
    ['I mean', 'quer dizer'],
    ['you know', 'sabe, tipo'],
    ['as I was saying', 'como eu estava dizendo'],
    ['speaking of', 'falando em'],
    ['basically', 'basicamente'],
  ],
  guide: {
    title: 'As palavrinhas que deixam a conversa natural',
    intro: 'Nativos não falam como livro. Eles usam pequenas palavras para pensar, corrigir, mudar de assunto e suavizar opiniões. Dominar isso é o que faz o seu inglês soar natural.',
    points: [
      { en: "Well, I'm not sure. Let me think.", pt: 'Bom, não tenho certeza. Deixa eu pensar.', note: '"Well" ganha tempo antes de responder.' },
      { en: "Actually, I'm from Salvador, not Rio.", pt: 'Na verdade, sou de Salvador, não do Rio.', note: '"Actually" corrige com educação.' },
      { en: 'Anyway, as I was saying...', pt: 'Enfim, como eu estava dizendo...', note: '"Anyway" volta ao assunto principal.' },
      { en: 'By the way, did you call your mother?', pt: 'Aliás, você ligou para a sua mãe?', note: '"By the way" muda de assunto de repente.' },
      { en: "To be honest, I didn't like the film.", pt: 'Para ser sincero, não gostei do filme.', note: '"To be honest" suaviza uma opinião negativa.' },
      { en: "It was cheap. I mean, not really cheap, but OK.", pt: 'Foi barato. Quer dizer, não tão barato, mas OK.', note: '"I mean" corrige ou explica o que você acabou de dizer.' },
    ],
    tips: ['Não exagere: "you know" e "like" demais soam pouco profissionais.', '"Speaking of food, are you hungry?" = falando em comida... Ótimo para emendar assuntos.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Well, actually…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: "___, I'm not sure. Can I tell you tomorrow?", pt: 'Bom, não tenho certeza. Posso te falar amanhã?', options: ['Well', 'By the way', 'Anyway'], answer: 'Well', why: '"Well" ganha tempo para pensar.', wrong: { 'By the way': '"By the way" muda de assunto.', Anyway: '"Anyway" volta ao assunto.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "___, it's not Tuesday. Today is Wednesday.", pt: 'Na verdade, não é terça. Hoje é quarta.', options: ['Actually', 'Basically', 'Anyway'], answer: 'Actually', why: '"Actually" corrige uma informação.', wrong: { Basically: '"Basically" resume.', Anyway: '"Anyway" volta ao assunto.' } }),
      I(1, 3, { type: 'meaning', en: "Well, to be honest, I prefer the blue one.", options: ['Bom, para ser sincero, prefiro o azul.', 'Eu gosto dos dois.', 'O azul é horrível.'], answer: 'Bom, para ser sincero, prefiro o azul.', why: '"Well" + "to be honest" deixam a opinião mais suave.' }),
      I(1, 4, { type: 'build', pt: 'Na verdade, eu moro aqui há dez anos.', answer: "Actually I've lived here for ten years", extra: ['Currently', 'since'], display: "Actually, I've lived here for ten years.", why: '"Actually" = na verdade (e não "atualmente").' }),
      I(1, 5, { type: 'listen', en: "Well, it depends.", options: ['Bom, depende.', 'Tudo bem.', 'Muito bem!'], answer: 'Bom, depende.', why: '"Well, it depends" é uma resposta muito comum.' }),
      I(1, 6, { type: 'match', pairs: [['well', 'bom (pensando)'], ['actually', 'na verdade'], ['anyway', 'enfim'], ['by the way', 'aliás']], why: 'Cada marcador tem uma função na conversa.' }),
    ]),
    L(2, 'Mudar de assunto e voltar', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: "___, did you see the game last night?", pt: 'Aliás, você viu o jogo ontem à noite?', options: ['By the way', 'Actually', 'Well'], answer: 'By the way', why: '"By the way" introduz um assunto novo.', wrong: { Actually: '"Actually" corrige.', Well: '"Well" ganha tempo.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "Sorry, I got distracted. ___, as I was saying, the meeting is at three.", pt: 'Desculpa, me distraí. Enfim, como eu estava dizendo, a reunião é às três.', options: ['Anyway', 'By the way', 'Actually'], answer: 'Anyway', why: '"Anyway" volta ao assunto principal.', wrong: { 'By the way': 'Mudaria de assunto de novo.', Actually: 'Não é uma correção.' } }),
      I(2, 3, { type: 'meaning', en: 'Speaking of holidays, where are you going this year?', options: ['Falando em férias, para onde você vai este ano?', 'Não vou tirar férias este ano.', 'As férias foram ótimas.'], answer: 'Falando em férias, para onde você vai este ano?', why: '"Speaking of" = falando em.' }),
      I(2, 4, { type: 'build', pt: 'Enfim, como eu estava dizendo, precisamos de mais tempo.', answer: 'Anyway as I was saying we need more time', extra: ['By the way', 'said'], display: 'Anyway, as I was saying, we need more time.', why: '"Anyway" + "as I was saying" = voltar ao assunto.' }),
      I(2, 5, { type: 'listen', en: 'By the way, your sister called.', options: ['Aliás, sua irmã ligou.', 'Sua irmã está aqui.', 'Liga para a sua irmã.'], answer: 'Aliás, sua irmã ligou.', why: '"By the way" = aliás, por falar nisso.' }),
      I(2, 6, { type: 'speak', en: 'Anyway, as I was saying...', pt: 'Enfim, como eu estava dizendo...', why: '"Anyway" soa como "É-ni-uei".' }),
    ]),
    L(3, 'Sendo sincero, quer dizer…', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "___, I didn't enjoy the party very much.", pt: 'Para ser sincero, não curti muito a festa.', options: ['To be honest', 'By the way', 'Speaking of'], answer: 'To be honest', why: '"To be honest" suaviza uma opinião negativa.', wrong: { 'By the way': 'Mudaria de assunto.', 'Speaking of': 'Precisa de algo depois: speaking of parties...' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "She's a bit difficult. ___, she's nice, but she complains a lot.", pt: 'Ela é meio difícil. Quer dizer, ela é legal, mas reclama muito.', options: ['I mean', 'Anyway', 'Well'], answer: 'I mean', why: '"I mean" explica ou corrige o que você disse.', wrong: { Anyway: '"Anyway" volta ao assunto.', Well: '"Well" ganha tempo antes.' } }),
      I(3, 3, { type: 'meaning', en: "Basically, we need to start again.", options: ['Basicamente, precisamos começar de novo.', 'Já terminamos.', 'Não vamos fazer mais nada.'], answer: 'Basicamente, precisamos começar de novo.', why: '"Basically" resume a ideia.' }),
      I(3, 4, { type: 'build', pt: 'Para ser sincero, prefiro ficar em casa.', answer: "To be honest I'd rather stay at home", extra: ['Honest', 'staying'], display: "To be honest, I'd rather stay at home.", why: '"To be honest" + opinião.' }),
      I(3, 5, { type: 'listen', en: "It was, you know, a bit strange.", options: ['Foi, sabe, meio estranho.', 'Você sabe que foi estranho.', 'Não foi estranho.'], answer: 'Foi, sabe, meio estranho.', why: '"You know" é só um apoio na fala.' }),
      I(3, 6, { type: 'match', pairs: [['to be honest', 'para ser sincero'], ['I mean', 'quer dizer'], ['you know', 'sabe'], ['basically', 'basicamente']], why: 'Marcadores para suavizar e explicar.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'Did you like my cake?'], ['B', '___']], options: ["Well, to be honest, it was a bit too sweet for me.", 'Honest, too sweet.', 'Is too sweet, to be honest me.'], answer: 'Well, to be honest, it was a bit too sweet for me.', pt: 'Bom, para ser sincero, estava um pouco doce demais para mim.', why: 'Opinião negativa suavizada: well + to be honest + a bit.', wrong: { 'Honest, too sweet.': 'Direto demais e incompleto.', 'Is too sweet, to be honest me.': 'Estrutura errada.' } }),
    ]),
    L(4, 'Prática: conversa natural', [
      I(4, 1, { type: 'choice', prompt: 'Qual responde melhor a "Is your name Ana?" (seu nome é Ana Paula)', en: '___', pt: 'Na verdade, é Ana Paula.', options: ["Actually, it's Ana Paula.", "Currently, it's Ana Paula.", "Anyway, it's Ana Paula."], answer: "Actually, it's Ana Paula.", why: 'Corrigir com educação: actually.', wrong: { "Currently, it's Ana Paula.": '"Currently" = atualmente.', "Anyway, it's Ana Paula.": '"Anyway" volta ao assunto, não corrige.' } }),
      I(4, 2, { type: 'meaning', en: "Speaking of food, I'm starving. Shall we eat?", options: ['Falando em comida, estou morrendo de fome. Vamos comer?', 'Não estou com fome.', 'A comida acabou.'], answer: 'Falando em comida, estou morrendo de fome. Vamos comer?', why: '"Starving" = morrendo de fome.' }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'The trip was great. ___, we got lost twice, but it was fun.', pt: 'A viagem foi ótima. Quer dizer, nos perdemos duas vezes, mas foi divertido.', options: ['I mean', 'By the way', 'Speaking of'], answer: 'I mean', why: '"I mean" acrescenta um detalhe que corrige a ideia.', wrong: { 'By the way': 'Mudaria de assunto.', 'Speaking of': 'Precisa de algo depois.' } }),
      I(4, 4, { type: 'build', pt: 'Aliás, você está livre no sábado?', answer: 'By the way are you free on Saturday', extra: ['Anyway', 'in'], display: 'By the way, are you free on Saturday?', why: '"By the way" + pergunta nova.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', "And then the dog ran away! Oh, sorry, where was I?"], ['B', '___']], options: ['You were telling me about your new job.', 'By the way, the dog.', 'Actually, where?'], answer: 'You were telling me about your new job.', pt: 'Você estava me contando do seu emprego novo.', why: 'Ajudar a pessoa a voltar ao assunto.', wrong: { 'By the way, the dog.': 'Não ajuda a voltar ao assunto.', 'Actually, where?': 'Não responde.' } }),
      I(4, 6, { type: 'listen', en: "Anyway, it doesn't matter now.", options: ['Enfim, isso não importa mais.', 'Isso importa muito.', 'Vamos falar disso depois.'], answer: 'Enfim, isso não importa mais.', why: '"Anyway" encerra um assunto.' }),
      I(4, 7, { type: 'match', pairs: [['as I was saying', 'como eu estava dizendo'], ['speaking of', 'falando em'], ['well', 'bom'], ['I mean', 'quer dizer']], why: 'Conectores para organizar a conversa.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Na verdade, eu não gosto de café.', answer: "Actually, I don't like coffee.", accept: ['Actually, I do not like coffee.'], why: '"Actually" = na verdade.' }),
      I(5, 2, { type: 'type', pt: 'Aliás, você viu minhas chaves?', answer: 'By the way, have you seen my keys?', accept: ['By the way, did you see my keys?'], why: '"By the way" = aliás.' }),
      I(5, 3, { type: 'dictation', en: 'To be honest, I was a bit nervous.', why: '"To be honest" = para ser sincero.' }),
      I(5, 4, { type: 'type', pt: 'Enfim, vamos continuar.', answer: "Anyway, let's continue.", accept: ["Anyway, let's carry on.", 'Anyway, let us continue.'], why: '"Anyway" = enfim.' }),
      I(5, 5, { type: 'dictation', en: 'Well, it depends on the weather.', why: '"It depends on" = depende de.' }),
      I(5, 6, { type: 'type', pt: 'Quer dizer, não foi tão ruim.', answer: "I mean, it wasn't that bad.", accept: ['I mean, it was not that bad.', "I mean, it wasn't so bad."], why: '"I mean" corrige ou suaviza.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "Well, actually, I've changed my mind.", options: ['Bom, na verdade, mudei de ideia.', 'Eu sempre mudo de ideia.', 'Não mudei de ideia.'], answer: 'Bom, na verdade, mudei de ideia.', why: '"Change my mind" = mudar de ideia.' }),
      I(6, 2, { type: 'dictation', en: 'By the way, happy birthday!', why: '"By the way" = aliás.' }),
      I(6, 3, { type: 'listen', en: 'Basically, it was a disaster.', options: ['Basicamente, foi um desastre.', 'Foi um sucesso.', 'Não aconteceu nada.'], answer: 'Basicamente, foi um desastre.', why: '"Basically" resume.' }),
      I(6, 4, { type: 'dictation', en: 'Speaking of music, I bought a guitar.', why: '"Speaking of" = falando em.' }),
      I(6, 5, { type: 'listen', en: "To be honest, I don't remember his name.", options: ['Para ser sincero, não lembro o nome dele.', 'Lembro bem o nome dele.', 'Ele não tem nome.'], answer: 'Para ser sincero, não lembro o nome dele.', why: '"To be honest" = para ser sincero.' }),
      I(6, 6, { type: 'dictation', en: 'Anyway, as I was saying, it was late.', why: '"As I was saying" = como eu estava dizendo.' }),
      I(6, 7, { type: 'speak', en: 'To be honest, I loved it!', pt: 'Para ser sincero, eu adorei!', why: '"Honest" soa como "Ó-nest": o "h" é mudo.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'So, how was your first week at the new job?'], ['B', '___']], options: ["Well, it was busy. I mean, really busy, but I liked it.", "Well busy. Mean busy.", "Actually, by the way, busy."], answer: "Well, it was busy. I mean, really busy, but I liked it.", pt: 'Bom, foi corrida. Quer dizer, muito corrida, mas gostei.', why: 'Well (pensar) + I mean (reforçar) = resposta natural.', wrong: { 'Well busy. Mean busy.': 'Frases incompletas.', 'Actually, by the way, busy.': 'Marcadores sem sentido aqui.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Is your boss nice?'], ['B', '___']], options: ["To be honest, she's a bit strict. But she's fair.", "Honest, strict boss.", "To be honesty, she strict."], answer: "To be honest, she's a bit strict. But she's fair.", pt: 'Para ser sincero, ela é meio rígida. Mas é justa.', why: 'Opinião suavizada com "to be honest" e "a bit".', wrong: { 'Honest, strict boss.': 'Incompleto.', 'To be honesty, she strict.': 'É "to be honest" e falta o verbo.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Oh! By the way, are you coming to the barbecue?'], ['B', '___']], options: ["Of course! Speaking of food, what should I bring?", "Of course! Speaking food, what bring?", "Of course! Anyway food."], answer: 'Of course! Speaking of food, what should I bring?', pt: 'Claro! Falando em comida, o que eu levo?', why: '"Speaking of" emenda um assunto no outro.', wrong: { 'Of course! Speaking food, what bring?': 'Faltam "of" e "should I".', 'Of course! Anyway food.': 'Incompleto.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Just some drinks. Anyway, I have to go. See you!'], ['B', '___']], options: ['OK! See you on Saturday!', 'OK! By the way, see you!', 'OK! Actually see you!'], answer: 'OK! See you on Saturday!', pt: 'Certo! Até sábado!', why: '"Anyway, I have to go" encerra a conversa; responda com uma despedida.', wrong: { 'OK! By the way, see you!': '"By the way" não serve para se despedir.', 'OK! Actually see you!': '"Actually" não faz sentido aqui.' } }),
      I(7, 5, { type: 'speak', en: 'By the way, how was your weekend?', pt: 'Aliás, como foi o seu fim de semana?', why: 'Ótimo jeito de puxar conversa.' }),
      I(7, 6, { type: 'speak', en: "Well, I'm not really sure.", pt: 'Bom, não tenho muita certeza.', why: 'Dá tempo para pensar sem travar.' }),
    ]),
    L(8, 'Lendo: o diário de quem chegou lá', [
      I(8, 1, { type: 'story', why: 'A Julia escreve sobre como foi aprender inglês do zero até conseguir conversar. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Como era a Julia no começo?', options: ['Tinha medo de falar', 'Já falava bem', 'Não gostava de inglês'], answer: 'Tinha medo de falar', why: '"I was afraid to speak."' }),
      I(8, 3, { type: 'quiz', q: 'O que mais ajudou a Julia?', options: ['Praticar um pouco todo dia', 'Estudar só antes da prova', 'Decorar listas'], answer: 'Praticar um pouco todo dia', why: '"What helped me most was practising a little every day."' }),
      I(8, 4, { type: 'quiz', q: 'Qual é o conselho final dela?', options: ['Não ter medo de errar', 'Estudar à noite', 'Falar rápido'], answer: 'Não ter medo de errar', why: '"Don\'t be afraid of making mistakes."' }),
    ], {
      title: 'Do zero à conversa',
      lines: [
        { who: 'Julia', en: "Two years ago, I couldn't say a word in English. To be honest, I was afraid to speak.", pt: 'Há dois anos, eu não conseguia dizer uma palavra em inglês. Para ser sincera, tinha medo de falar.' },
        { who: 'Julia', en: 'What helped me most was practising a little every day, even when I was tired.', pt: 'O que mais me ajudou foi praticar um pouco todo dia, mesmo cansada.' },
        { ask: 'Há quanto tempo a Julia começou?', options: ['Dois anos', 'Dois meses', 'Dez anos'], answer: 'Dois anos', why: '"Two years ago."' },
        { who: 'Julia', en: 'Last month, I had a meeting with a client from London. ___, I was nervous, but I did it!', pt: 'Mês passado, tive uma reunião com um cliente de Londres. Para ser sincera, fiquei nervosa, mas consegui!', gap: { answer: 'Honestly', options: ['Honestly', 'Anyway', 'By the way'] } },
        { who: 'Julia', en: "I still make mistakes, of course. I mean, everybody does. Even native speakers!", pt: 'Ainda erro, claro. Quer dizer, todo mundo erra. Até os nativos!' },
        { who: 'Julia', en: "Anyway, my advice is simple: don't be afraid of making mistakes. Just keep talking.", pt: 'Enfim, meu conselho é simples: não tenha medo de errar. Só continue falando.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: "Sorry for the interruption. ___, where was I?", pt: 'Desculpa a interrupção. Enfim, onde eu estava?', options: ['Anyway', 'Actually', 'Basically'], answer: 'Anyway', why: '"Anyway" volta à conversa depois de uma interrupção.', wrong: { Actually: '"Actually" corrige.', Basically: '"Basically" resume.' } }),
      I(9, 2, { type: 'type', pt: 'Para ser sincero, estou cansado.', answer: "To be honest, I'm tired.", accept: ['To be honest, I am tired.'], why: '"To be honest" + opinião.' }),
      I(9, 3, { type: 'meaning', en: "He's not rude. I mean, he's just very direct.", options: ['Ele não é grosso. Quer dizer, só é muito direto.', 'Ele é muito grosso.', 'Ele nunca fala nada.'], answer: 'Ele não é grosso. Quer dizer, só é muito direto.', why: '"I mean" explica melhor.' }),
      I(9, 4, { type: 'dictation', en: 'Actually, I have a better idea.', why: '"Actually" = na verdade.' }),
      I(9, 5, { type: 'listen', en: 'Speaking of the weekend, are you doing anything?', options: ['Falando no fim de semana, você vai fazer alguma coisa?', 'O fim de semana foi bom.', 'Não tenho fim de semana.'], answer: 'Falando no fim de semana, você vai fazer alguma coisa?', why: '"Speaking of" emenda assuntos.' }),
      I(9, 6, { type: 'build', pt: 'Bom, na verdade, eu prefiro o outro.', answer: 'Well actually I prefer the other one', extra: ['currently', 'anyway'], display: 'Well, actually, I prefer the other one.', why: '"Well, actually" = bom, na verdade.' }),
    ]),
    L(10, 'História: a festa de formatura do curso', [
      I(10, 1, { type: 'story', why: 'A turma comemora o fim do curso de inglês. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que o Pedro achava no começo do curso?', options: ['Que nunca ia conseguir', 'Que era fácil', 'Que já sabia tudo'], answer: 'Que nunca ia conseguir', why: '"I thought I would never be able to do it."' }),
      I(10, 3, { type: 'quiz', q: 'Qual é o plano da Sofia?', options: ['Trabalhar no Canadá', 'Começar o curso de novo', 'Dar aulas de inglês'], answer: 'Trabalhar no Canadá', why: '"I\'m moving to Canada for a new job."' }),
      I(10, 4, { type: 'quiz', q: 'O que a professora pede no fim?', options: ['Que continuem praticando', 'Que façam outra prova', 'Que parem de estudar'], answer: 'Que continuem praticando', why: '"Promise me you\'ll keep practising."' }),
    ], {
      title: 'A festa de formatura do curso',
      lines: [
        { who: 'Sarah', en: "Well, everybody, we did it! This is our last day together.", pt: 'Bom, pessoal, conseguimos! Este é o nosso último dia juntos.' },
        { who: 'Pedro', en: "To be honest, when I started, I thought I would never be able to do it.", pt: 'Para ser sincero, quando comecei, achei que nunca ia conseguir.' },
        { who: 'Sofia', en: "Me too! ___ the way, I have news. I'm moving to Canada for a new job!", pt: 'Eu também! Aliás, tenho uma novidade. Vou me mudar para o Canadá por um emprego novo!', gap: { answer: 'By', options: ['By', 'In', 'On'] } },
        { ask: 'Qual é a novidade da Sofia?', options: ['Vai trabalhar no Canadá', 'Vai se casar', 'Vai fazer outro curso'], answer: 'Vai trabalhar no Canadá', why: '"I\'m moving to Canada for a new job!"' },
        { who: 'Pedro', en: "That's amazing! I mean, we'll miss you, but it's amazing.", pt: 'Que incrível! Quer dizer, vamos sentir sua falta, mas é incrível.' },
        { who: 'Sarah', en: "Anyway, I'm so proud of you all. Promise me you'll keep practising. You speak English now!", pt: 'Enfim, tenho muito orgulho de todos vocês. Me prometam que vão continuar praticando. Vocês falam inglês agora!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u16', level: 'B2', unlock: 'b2-u16', title: 'O último episódio',
  intro: 'No episódio final do curso, a Ana e o Tom se despedem e deixam conselhos para continuar.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the very last episode. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao último episódio. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Well, this is a special day.", pt: 'E eu sou o Tom. Bom, hoje é um dia especial.' },
    { who: 'ana', en: "To be honest, I'm a bit emotional. We started with 'Hello, my name is Ana'!", pt: 'Para ser sincera, estou um pouco emocionada. A gente começou com "Hello, my name is Ana"!' },
    { who: 'tom', en: "And now you can understand a whole podcast in English. That's amazing.", pt: 'E agora vocês entendem um podcast inteiro em inglês. Isso é incrível.' },
    { who: 'ana', en: 'Our advice? Watch series, read, talk to people. And never be afraid of mistakes.', pt: 'Nosso conselho? Vejam séries, leiam, conversem com as pessoas. E nunca tenham medo de errar.' },
    { who: 'tom', en: "By the way, this isn't the end. It's the beginning of your English life!", pt: 'Aliás, isto não é o fim. É o começo da vida de vocês em inglês!' },
    { who: 'ana', en: "Anyway, thank you for listening all this time. We're so proud of you!", pt: 'Enfim, obrigada por ouvirem todo esse tempo. Temos muito orgulho de vocês!' },
    { who: 'tom', en: 'Goodbye, and good luck!', pt: 'Tchau, e boa sorte!' },
  ],
  questions: [
    { q: 'Com que frase o curso começou, segundo a Ana?', options: ['Hello, my name is Ana', 'Good morning', 'How are you?'], answer: 'Hello, my name is Ana', why: '"We started with Hello, my name is Ana!"' },
    { q: 'Qual é o conselho deles?', options: ['Ver séries, ler, conversar e não ter medo de errar', 'Parar de estudar', 'Só fazer provas'], answer: 'Ver séries, ler, conversar e não ter medo de errar', why: '"Watch series, read, talk to people. And never be afraid of mistakes."' },
    { q: 'O que o Tom diz sobre o fim do curso?', options: ['É o começo da vida em inglês', 'É o fim do inglês', 'Precisa recomeçar'], answer: 'É o começo da vida em inglês', why: '"It\'s the beginning of your English life!"' },
  ],
}, 'pod-b2u15');
addScene('b2-u16', 'standing-9', 'hi');
