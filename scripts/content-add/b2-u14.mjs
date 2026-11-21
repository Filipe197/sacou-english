// Etapa 3 do B2 completo: unidade nova 14 — O que eu mais amo é… (frases de ênfase / cleft sentences).
// Gera src/content/b2/unit-14.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u14.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u14-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u14l${n}-${k}`, ...o });

writeUnit('b2/unit-14.json', {
  id: 'b2-u14', level: 'B2', order: 14,
  title: 'O que eu mais amo é…',
  subtitle: 'Frases de ênfase: destacar o que importa com "What…" e "It was… that…".',
  can_do: {
    text: 'Consigo dar ênfase ao que é mais importante numa frase, corrigir mal-entendidos e falar com mais expressão.',
    source: 'CEFR (Conselho da Europa) — Produção oral: destacar pontos importantes e ideias principais, nível B2',
  },
  core_inventory: ['Grammar: cleft sentences with What (What I need is...)', 'Grammar: cleft sentences with It (It was X that/who...)', 'Grammar: emphatic do / does / did', 'Functions: correcting misunderstandings'],
  words: [
    ['what I need is', 'o que eu preciso é'],
    ['it was … that', 'foi … que'],
    ['the thing is', 'o negócio é que, a questão é que'],
    ['the reason why', 'o motivo pelo qual'],
    ['all I want is', 'tudo o que eu quero é'],
    ['I do like', 'eu gosto sim, gosto muito (ênfase)'],
    ['annoy', 'irritar'],
    ['surprise', 'surpreender, surpresa'],
    ['matter', 'importar'],
    ['actually', 'na verdade'],
  ],
  guide: {
    title: 'Dando ênfase',
    intro: 'Em português a gente muda a ordem ou a entonação para destacar algo ("Foi a Ana que ligou!"). Em inglês existem estruturas fixas para isso, chamadas frases de ênfase.',
    points: [
      { en: 'What I need is a long holiday.', pt: 'O que eu preciso é de umas férias longas.', note: '"What + sujeito + verbo + is" destaca o que vem no fim.' },
      { en: 'What annoys me is the noise.', pt: 'O que me irrita é o barulho.', note: '"What" também pode ser o sujeito: What annoys me...' },
      { en: 'It was Ana who called, not Julia.', pt: 'Foi a Ana que ligou, não a Julia.', note: '"It was ... who/that" destaca uma parte e corrige alguém.' },
      { en: "It wasn't the price that surprised me. It was the size.", pt: 'Não foi o preço que me surpreendeu. Foi o tamanho.', note: 'Ótimo para corrigir um mal-entendido.' },
      { en: 'I did lock the door! I promise.', pt: 'Eu tranquei a porta, sim! Juro.', note: '"Do/does/did" antes do verbo dá força: de fato, sim.' },
      { en: 'All I want is some peace and quiet.', pt: 'Tudo o que eu quero é um pouco de paz e sossego.', note: '"All I want is" = tudo o que eu quero é.' },
    ],
    tips: ['Na fala, a palavra destacada recebe mais força: "It was ANA who called."', '"The thing is..." é ótimo para começar uma explicação ou um problema.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'O que eu preciso é…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: '___ I need is a cup of coffee.', pt: 'O que eu preciso é de um café.', options: ['What', 'That', 'Which'], answer: 'What', why: '"What I need is" = o que eu preciso é.', wrong: { That: '"That I need" não forma a ênfase.', Which: '"Which" não começa esta estrutura.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'What I love about this city ___ the people.', pt: 'O que eu amo nesta cidade são as pessoas.', options: ['is', 'are', 'be'], answer: 'is', why: 'Depois de "What ...", o verbo é "is" (mesmo com plural depois).', wrong: { are: 'Com a estrutura "What...", o mais comum é "is".', be: 'Falta conjugar.' } }),
      I(1, 3, { type: 'meaning', en: 'What annoys me is people who talk during films.', options: ['O que me irrita são pessoas que falam durante os filmes.', 'Eu falo durante os filmes.', 'Filmes me irritam.'], answer: 'O que me irrita são pessoas que falam durante os filmes.', why: '"What annoys me" = o que me irrita.' }),
      I(1, 4, { type: 'build', pt: 'O que eu quero é viajar mais.', answer: 'What I want is to travel more', extra: ['That', 'are'], display: 'What I want is to travel more.', why: 'What + I + want + is + to + verbo.' }),
      I(1, 5, { type: 'listen', en: 'All I want is a good night\'s sleep.', options: ['Tudo o que eu quero é uma boa noite de sono.', 'Eu dormi muito bem.', 'Não quero dormir.'], answer: 'Tudo o que eu quero é uma boa noite de sono.', why: '"All I want is" = tudo o que eu quero é.' }),
      I(1, 6, { type: 'match', pairs: [['what I need is', 'o que eu preciso é'], ['all I want is', 'tudo o que eu quero é'], ['the thing is', 'a questão é que'], ['annoy', 'irritar']], why: 'Três aberturas que dão destaque ao que vem depois.' }),
    ]),
    L(2, 'Foi… que…', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'It was my brother ___ broke the window, not me!', pt: 'Foi meu irmão que quebrou a janela, não eu!', options: ['who', 'what', 'which'], answer: 'who', why: '"It was + pessoa + who" destaca quem fez.', wrong: { what: '"What" não funciona aqui.', which: '"Which" é para coisas.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'It was in Paris ___ they first met.', pt: 'Foi em Paris que eles se conheceram.', options: ['that', 'what', 'who'], answer: 'that', why: '"It was + lugar/tempo + that".', wrong: { what: '"What" não funciona aqui.', who: '"Who" é para pessoas.' } }),
      I(2, 3, { type: 'meaning', en: "It wasn't the food that I didn't like. It was the service.", options: ['Não foi a comida que eu não gostei. Foi o atendimento.', 'Não gostei da comida nem do atendimento.', 'Gostei do atendimento.'], answer: 'Não foi a comida que eu não gostei. Foi o atendimento.', why: 'Corrigindo: não foi X, foi Y.' }),
      I(2, 4, { type: 'build', pt: 'Foi a Ana que me contou.', answer: 'It was Ana who told me', extra: ['what', 'is'], display: 'It was Ana who told me.', why: 'It was + pessoa + who.' }),
      I(2, 5, { type: 'listen', en: 'It was only last year that I started running.', options: ['Foi só no ano passado que comecei a correr.', 'Corro desde criança.', 'Vou começar a correr ano que vem.'], answer: 'Foi só no ano passado que comecei a correr.', why: 'It was + tempo + that.' }),
      I(2, 6, { type: 'speak', en: 'It was Tom who called, not Ben.', pt: 'Foi o Tom que ligou, não o Ben.', why: 'Dê força ao nome destacado: "It was TOM".' }),
    ]),
    L(3, 'Ênfase com do / did', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ lock the door! I remember doing it.', pt: 'Eu tranquei a porta, sim! Lembro de ter trancado.', options: ['did', 'do', 'was'], answer: 'did', why: '"Did" + verbo normal dá ênfase no passado.', wrong: { do: 'A ação foi no passado: did.', was: '"Was lock" não existe.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'She ___ look tired today.', pt: 'Ela parece cansada mesmo hoje.', options: ['does', 'is', 'do'], answer: 'does', why: 'Ênfase no presente com she: does + verbo normal.', wrong: { is: '"Is look" não existe.', do: 'Com "she": does.' } }),
      I(3, 3, { type: 'meaning', en: 'I do like your new haircut!', options: ['Eu gostei muito do seu corte de cabelo novo!', 'Eu não gostei do seu cabelo.', 'Corte meu cabelo, por favor.'], answer: 'Eu gostei muito do seu corte de cabelo novo!', why: '"I do like" = gosto mesmo, gosto muito.' }),
      I(3, 4, { type: 'build', pt: 'Eu estudei, sim! Só fiquei nervoso.', answer: 'I did study! I was just nervous', extra: ['studied', 'do'], display: 'I did study! I was just nervous.', why: '"Did" + study (verbo normal).' }),
      I(3, 5, { type: 'listen', en: "You do know that the shop closes at six, don't you?", options: ['Você sabe, né, que a loja fecha às seis?', 'A loja abre às seis.', 'Você não sabia da loja.'], answer: 'Você sabe, né, que a loja fecha às seis?', why: '"You do know" = você sabe sim.' }),
      I(3, 6, { type: 'match', pairs: [['surprise', 'surpreender'], ['matter', 'importar'], ['the reason why', 'o motivo pelo qual'], ['actually', 'na verdade']], why: '"It doesn\'t matter" = não importa.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', "You never call me!"], ['B', '___']], options: ['That\'s not true. I did call you last week!', 'That\'s not true. I did called you!', 'That\'s not true. I do called you!'], answer: "That's not true. I did call you last week!", pt: 'Não é verdade. Eu te liguei, sim, semana passada!', why: 'Did + verbo normal (call).', wrong: { "That's not true. I did called you!": 'Depois de "did", sem -ed.', "That's not true. I do called you!": 'Mistura errada.' } }),
    ]),
    L(4, 'Prática: corrigindo mal-entendidos', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "It wasn't the money ___ mattered. It was the experience.", pt: 'Não foi o dinheiro que importou. Foi a experiência.', options: ['that', 'what', 'who'], answer: 'that', why: 'It wasn\'t + coisa + that.', wrong: { what: 'Não funciona aqui.', who: '"Who" é para pessoas.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: '___ surprised me most was the price.', pt: 'O que mais me surpreendeu foi o preço.', options: ['What', 'It', 'That'], answer: 'What', why: '"What" como sujeito: What surprised me...', wrong: { It: '"It surprised me most was" não funciona.', That: '"That" não começa esta estrutura.' } }),
      I(4, 3, { type: 'meaning', en: "The thing is, I don't have time this week.", options: ['O negócio é que eu não tenho tempo esta semana.', 'Eu tenho bastante tempo.', 'A coisa está ali.'], answer: 'O negócio é que eu não tenho tempo esta semana.', why: '"The thing is" apresenta o problema.' }),
      I(4, 4, { type: 'build', pt: 'O motivo pelo qual eu liguei é para pedir desculpas.', answer: 'The reason why I called is to apologise', extra: ['what', 'because'], display: 'The reason why I called is to apologise.', why: '"The reason why" = o motivo pelo qual.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'So you went to Rio on holiday?'], ['B', '___']], options: ["No, it was Salvador that I visited.", "No, it was Salvador what I visited.", "No, Salvador was who I visited."], answer: 'No, it was Salvador that I visited.', pt: 'Não, foi Salvador que eu visitei.', why: 'Corrigindo: it was + lugar + that.', wrong: { 'No, it was Salvador what I visited.': 'É "that", não "what".', 'No, Salvador was who I visited.': '"Who" é para pessoas.' } }),
      I(4, 6, { type: 'listen', en: "What matters is that you're safe.", options: ['O que importa é que você está bem.', 'Você não está seguro.', 'Não importa nada.'], answer: 'O que importa é que você está bem.', why: '"What matters is" = o que importa é.' }),
      I(4, 7, { type: 'choice', prompt: 'Qual frase dá ÊNFASE a "the weather"?', en: '___', pt: 'O que estragou a viagem foi o tempo.', options: ['What ruined the trip was the weather.', 'The weather ruined the trip.', 'The trip was ruined.'], answer: 'What ruined the trip was the weather.', why: 'A estrutura "What... was" joga o destaque para o fim.', wrong: { 'The weather ruined the trip.': 'Correta, mas sem ênfase especial.', 'The trip was ruined.': 'Nem diz o que estragou.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'O que eu preciso é dormir.', answer: 'What I need is to sleep.', accept: ['What I need is sleep.'], why: 'What I need is...' }),
      I(5, 2, { type: 'type', pt: 'Foi a Julia que ligou.', answer: 'It was Julia who called.', accept: ['It was Julia that called.'], why: 'It was + pessoa + who.' }),
      I(5, 3, { type: 'dictation', en: 'What annoys me is the traffic.', why: '"What annoys me" = o que me irrita.' }),
      I(5, 4, { type: 'type', pt: 'Eu gosto mesmo de você!', answer: 'I do like you!', why: '"Do" dá ênfase.' }),
      I(5, 5, { type: 'dictation', en: 'The thing is, I forgot.', why: '"The thing is" = o negócio é que.' }),
      I(5, 6, { type: 'type', pt: 'Tudo o que eu quero é paz.', answer: 'All I want is peace.', why: '"All I want is" = tudo o que eu quero é.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'What I really enjoy is cooking for friends.', options: ['O que eu curto de verdade é cozinhar para os amigos.', 'Eu não gosto de cozinhar.', 'Meus amigos cozinham para mim.'], answer: 'O que eu curto de verdade é cozinhar para os amigos.', why: '"What I really enjoy is" + -ing.' }),
      I(6, 2, { type: 'dictation', en: 'It was here that we met.', why: 'It was + lugar + that.' }),
      I(6, 3, { type: 'listen', en: "I did tell you about the meeting. You forgot!", options: ['Eu te avisei, sim, da reunião. Você esqueceu!', 'Eu esqueci de te avisar.', 'Não teve reunião.'], answer: 'Eu te avisei, sim, da reunião. Você esqueceu!', why: '"I did tell you" = eu te contei, sim.' }),
      I(6, 4, { type: 'dictation', en: "It doesn't matter.", why: '"It doesn\'t matter" = não importa.' }),
      I(6, 5, { type: 'listen', en: "It wasn't me who ate the cake!", options: ['Não fui eu que comi o bolo!', 'Eu comi o bolo.', 'Ninguém comeu o bolo.'], answer: 'Não fui eu que comi o bolo!', why: 'It wasn\'t + pessoa + who.' }),
      I(6, 6, { type: 'dictation', en: 'What surprised me was the size.', why: '"What surprised me" = o que me surpreendeu.' }),
      I(6, 7, { type: 'speak', en: 'What matters is that you tried.', pt: 'O que importa é que você tentou.', why: 'Frase gentil para consolar alguém.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Why are you so stressed?'], ['B', '___']], options: ['The thing is, I have three deadlines this week.', 'The thing are, I have deadlines.', 'Thing is have deadlines.'], answer: 'The thing is, I have three deadlines this week.', pt: 'O negócio é que tenho três prazos esta semana.', why: '"The thing is" apresenta o problema.', wrong: { 'The thing are, I have deadlines.': 'É "the thing IS".', 'Thing is have deadlines.': 'Faltam partes.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Did Laura make this cake?'], ['B', '___']], options: ['No, it was her husband who made it.', 'No, was her husband what made it.', 'No, her husband who made.'], answer: 'No, it was her husband who made it.', pt: 'Não, foi o marido dela que fez.', why: 'Corrigindo: it was + pessoa + who.', wrong: { 'No, was her husband what made it.': 'Falta "it" e é "who".', 'No, her husband who made.': 'Frase incompleta.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "You didn't even try the soup."], ['B', '___']], options: ['I did try it! I just didn\'t like it.', 'I did tried it!', 'I tried did it!'], answer: "I did try it! I just didn't like it.", pt: 'Eu provei, sim! Só não gostei.', why: 'Did + verbo normal.', wrong: { 'I did tried it!': 'Depois de "did", sem -ed.', 'I tried did it!': 'Ordem errada.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'What do you miss most about Brazil?'], ['B', '___']], options: ['What I miss most is my mother\'s food.', 'What I miss most are my mother food.', 'I miss most is food.'], answer: "What I miss most is my mother's food.", pt: 'O que eu mais sinto falta é da comida da minha mãe.', why: 'What + I + miss most + is.', wrong: { 'What I miss most are my mother food.': 'Falta o \'s e o verbo é "is".', 'I miss most is food.': 'Falta o "What".' } }),
      I(7, 5, { type: 'speak', en: 'What I need is a holiday.', pt: 'O que eu preciso é de férias.', why: 'Dê força à última parte: "a HOLIDAY".' }),
      I(7, 6, { type: 'speak', en: 'I did lock the door!', pt: 'Eu tranquei a porta, sim!', why: 'Dê força ao "did".' }),
    ]),
    L(8, 'Lendo: o que eu aprendi viajando', [
      I(8, 1, { type: 'story', why: 'O Marcos escreve sobre o que aprendeu em um ano viajando. Repare nas frases de ênfase.' }),
      I(8, 2, { type: 'quiz', q: 'O que mais surpreendeu o Marcos?', options: ['A gentileza dos desconhecidos', 'O preço das coisas', 'A comida'], answer: 'A gentileza dos desconhecidos', why: '"What surprised me most was the kindness of strangers."' }),
      I(8, 3, { type: 'quiz', q: 'Onde ele aprendeu a cozinhar?', options: ['No Japão', 'Em Portugal', 'Na Itália'], answer: 'No Japão', why: '"It was in Japan that I learned to cook."' }),
      I(8, 4, { type: 'quiz', q: 'O que, segundo ele, mais importa?', options: ['As pessoas que você conhece', 'Os lugares que você vê', 'As fotos'], answer: 'As pessoas que você conhece', why: '"What really matters is the people you meet."' }),
    ], {
      title: 'O que eu aprendi viajando',
      lines: [
        { who: 'Marcos', en: 'Last year I travelled for twelve months with just one bag.', pt: 'No ano passado viajei por doze meses com uma mochila só.' },
        { who: 'Marcos', en: 'What surprised me most was the kindness of strangers.', pt: 'O que mais me surpreendeu foi a gentileza dos desconhecidos.' },
        { ask: 'Quanto tempo o Marcos viajou?', options: ['Doze meses', 'Doze dias', 'Dois anos'], answer: 'Doze meses', why: '"I travelled for twelve months."' },
        { who: 'Marcos', en: 'It was in Japan ___ I learned to cook. A family invited me to stay for a week.', pt: 'Foi no Japão que aprendi a cozinhar. Uma família me convidou para ficar uma semana.', gap: { answer: 'that', options: ['that', 'what', 'who'] } },
        { who: 'Marcos', en: "I did miss home sometimes, of course. But I never felt alone.", pt: 'Senti falta de casa, sim, às vezes, claro. Mas nunca me senti sozinho.' },
        { who: 'Marcos', en: "What really matters is not the places you see. It's the people you meet.", pt: 'O que importa de verdade não são os lugares que você vê. São as pessoas que você conhece.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'It was the music ___ made the party great.', pt: 'Foi a música que fez a festa ser ótima.', options: ['that', 'who', 'what'], answer: 'that', why: 'It was + coisa + that.', wrong: { who: '"Who" é para pessoas.', what: 'Não funciona aqui.' } }),
      I(9, 2, { type: 'type', pt: 'O que me irrita é o barulho.', answer: 'What annoys me is the noise.', why: 'What + annoys me + is.' }),
      I(9, 3, { type: 'meaning', en: 'It was only when I lost my job that I realised what I wanted.', options: ['Foi só quando perdi o emprego que percebi o que eu queria.', 'Perdi o emprego porque não sabia o que queria.', 'Ainda tenho meu emprego.'], answer: 'Foi só quando perdi o emprego que percebi o que eu queria.', why: 'It was only when ... that = foi só quando ... que.' }),
      I(9, 4, { type: 'dictation', en: 'I do understand how you feel.', why: '"I do understand" = eu entendo, sim.' }),
      I(9, 5, { type: 'listen', en: "What I don't understand is why he left.", options: ['O que eu não entendo é por que ele foi embora.', 'Eu sei por que ele saiu.', 'Ele vai voltar.'], answer: 'O que eu não entendo é por que ele foi embora.', why: 'What + I don\'t understand + is.' }),
      I(9, 6, { type: 'build', pt: 'Não foi o preço que me incomodou.', answer: "It wasn't the price that annoyed me", extra: ['what', 'who'], display: "It wasn't the price that annoyed me.", why: 'It wasn\'t + coisa + that.' }),
    ]),
    L(10, 'História: o mal-entendido', [
      I(10, 1, { type: 'story', why: 'A Sofia acha que o Ben esqueceu o aniversário dela. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Por que a Sofia está chateada?', options: ['Acha que o Ben esqueceu o aniversário', 'O Ben chegou atrasado', 'O presente era feio'], answer: 'Acha que o Ben esqueceu o aniversário', why: '"You forgot my birthday!"' }),
      I(10, 3, { type: 'quiz', q: 'Quem mandou as flores?', options: ['O Ben', 'O irmão da Sofia', 'Uma amiga'], answer: 'O Ben', why: '"It was me who sent the flowers."' }),
      I(10, 4, { type: 'quiz', q: 'Por que a Sofia não viu o cartão?', options: ['Estava embaixo das flores', 'O Ben esqueceu o cartão', 'Ela jogou fora'], answer: 'Estava embaixo das flores', why: '"The card was under the flowers."' }),
    ], {
      title: 'O mal-entendido',
      lines: [
        { who: 'Sofia', en: "Ben, I can't believe it. You forgot my birthday!", pt: 'Ben, não acredito. Você esqueceu meu aniversário!' },
        { who: 'Ben', en: "I didn't forget! I did remember. Didn't you get the flowers this morning?", pt: 'Eu não esqueci! Eu lembrei, sim. Você não recebeu as flores hoje de manhã?' },
        { who: 'Sofia', en: "The flowers? I thought they were from my brother.", pt: 'As flores? Achei que eram do meu irmão.' },
        { who: 'Ben', en: "No! It was me ___ sent the flowers. There was a card too.", pt: 'Não! Fui eu que mandei as flores. Tinha um cartão também.', gap: { answer: 'who', options: ['who', 'what', 'which'] } },
        { ask: 'O que vinha junto com as flores?', options: ['Um cartão', 'Um bolo', 'Um livro'], answer: 'Um cartão', why: '"There was a card too."' },
        { who: 'Sofia', en: "Oh! The card was under the flowers. What I need now is to say sorry.", pt: 'Ah! O cartão estava embaixo das flores. O que eu preciso agora é pedir desculpas.' },
        { who: 'Ben', en: "What matters is that you liked them. Happy birthday!", pt: 'O que importa é que você gostou. Feliz aniversário!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u14', level: 'B2', unlock: 'b2-u14', title: 'O que mais importa',
  intro: 'A Ana e o Tom falam do que realmente importa para eles.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: what really matters to us?", pt: 'E eu sou o Tom. Hoje: o que realmente importa para nós?' },
    { who: 'ana', en: 'What matters most to me is having time for my family.', pt: 'O que mais importa para mim é ter tempo para a minha família.' },
    { who: 'tom', en: "For me, what I value is freedom. I'd hate a job with a fixed schedule.", pt: 'Para mim, o que eu valorizo é a liberdade. Eu odiaria um emprego com horário fixo.' },
    { who: 'ana', en: 'And what annoys you most?', pt: 'E o que mais te irrita?' },
    { who: 'tom', en: "What annoys me is people who are always on their phones. I do try not to be like that!", pt: 'O que me irrita são pessoas que estão sempre no celular. Eu tento, sim, não ser assim!' },
    { who: 'ana', en: "Ha! That's all for today. Thank you for listening!", pt: 'Rá! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye!', pt: 'Tchau!' },
  ],
  questions: [
    { q: 'O que mais importa para a Ana?', options: ['Ter tempo para a família', 'Ganhar dinheiro', 'Viajar'], answer: 'Ter tempo para a família', why: '"Having time for my family."' },
    { q: 'O que o Tom valoriza?', options: ['Liberdade', 'Estabilidade', 'Fama'], answer: 'Liberdade', why: '"What I value is freedom."' },
    { q: 'O que irrita o Tom?', options: ['Pessoas sempre no celular', 'Trânsito', 'Barulho'], answer: 'Pessoas sempre no celular', why: '"People who are always on their phones."' },
  ],
}, 'pod-b2u13');
addScene('b2-u14', 'standing-12', 'talk');
