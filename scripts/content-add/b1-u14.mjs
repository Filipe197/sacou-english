// Etapa 3 do B1 completo: unidade nova 14 — Tão bom que… (so / such … that; adjetivos fortes).
// Gera src/content/b1/unit-14.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u14.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u14-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u14l${n}-${k}`, ...o });

writeUnit('b1/unit-14.json', {
  id: 'b1-u14', level: 'B1', order: 14,
  title: 'Tão bom que…',
  subtitle: 'So, such e adjetivos fortes para descrever experiências.',
  can_do: {
    text: 'Consigo descrever com emoção um filme, um restaurante ou uma viagem, e escrever uma avaliação simples.',
    source: 'CEFR (Conselho da Europa) — Produção escrita: descrever experiências e reações, nível B1',
  },
  core_inventory: ['Grammar: so + adjective / such + (a) + adjective + noun', 'Grammar: so / such ... that (result)', 'Vocabulary: strong adjectives (amazing, awful, brilliant)', 'Vocabulary: intensifiers (absolutely, extremely, really)'],
  words: [
    ['so', 'tão'],
    ['such', 'tão, tamanho(a) (antes de substantivo)'],
    ['absolutely', 'absolutamente, totalmente'],
    ['extremely', 'extremamente'],
    ['incredibly', 'incrivelmente'],
    ['terribly', 'terrivelmente, muito'],
    ['brilliant', 'genial, excelente'],
    ['impressive', 'impressionante'],
    ['disappointing', 'decepcionante'],
    ['disappointed', 'decepcionado(a)'],
    ['recommend', 'recomendar'],
    ['review', 'avaliação, resenha'],
  ],
  guide: {
    title: 'So, such e adjetivos fortes',
    intro: 'Para dar emoção a uma descrição, o inglês usa "so" e "such" (tão) e adjetivos fortes. E com "that" você mostra a consequência: tão bom QUE...',
    points: [
      { en: 'The film was so good!', pt: 'O filme foi tão bom!', note: '"So" + adjetivo sozinho.' },
      { en: 'It was such a good film!', pt: 'Foi um filme tão bom!', note: '"Such a" + adjetivo + substantivo.' },
      { en: 'The food was so spicy that I cried.', pt: 'A comida estava tão apimentada que eu chorei.', note: 'So + adjetivo + that + consequência.' },
      { en: 'It was such a long trip that we slept on the bus.', pt: 'Foi uma viagem tão longa que dormimos no ônibus.', note: 'Such + a + adjetivo + substantivo + that.' },
      { en: 'The view was absolutely amazing.', pt: 'A vista era absolutamente incrível.', note: 'Com adjetivo forte (amazing, awful), use "absolutely", não "very".' },
      { en: "I'd really recommend it.", pt: 'Eu recomendo muito.', note: '"Recommend" = recomendar. Um "c" e dois "m".' },
    ],
    tips: ['"Very amazing" soa estranho. Com adjetivos fortes, prefira "absolutely" ou "really": absolutely amazing.', '"Disappointed" é a pessoa (decepcionada); "disappointing" é a coisa (decepcionante). Igual a bored / boring.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'So e such', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'The weather was ___ hot!', pt: 'O tempo estava tão quente!', options: ['so', 'such', 'such a'], answer: 'so', why: '"So" + adjetivo sozinho.', wrong: { such: '"Such" precisa de substantivo: such hot weather.', 'such a': '"Such a" + adjetivo + substantivo.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'It was ___ beautiful day!', pt: 'Foi um dia tão bonito!', options: ['such a', 'so', 'so a'], answer: 'such a', why: 'Com "a day" (substantivo), use "such a".', wrong: { so: '"So beautiful day" fica sem o "a" e com a palavra errada.', 'so a': 'Não existe "so a".' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'They are ___ nice people.', pt: 'Eles são pessoas tão legais.', options: ['such', 'so', 'such a'], answer: 'such', why: 'Plural (people): such, sem "a".', wrong: { so: '"So nice people" está errado; com substantivo, use such.', 'such a': 'Sem "a" no plural.' } }),
      I(1, 4, { type: 'meaning', en: "I'm so tired!", options: ['Estou tão cansado!', 'Estou um pouco cansado.', 'Não estou cansado.'], answer: 'Estou tão cansado!', why: '"So" + adjetivo = tão.' }),
      I(1, 5, { type: 'build', pt: 'Foi uma festa tão divertida!', answer: 'It was such a fun party', extra: ['so', 'an'], display: 'It was such a fun party!', why: 'Such a + adjetivo + substantivo.' }),
      I(1, 6, { type: 'listen', en: 'She is such a good friend.', options: ['Ela é uma amiga tão boa.', 'Ela é minha melhor amiga.', 'Ela é boa em tudo.'], answer: 'Ela é uma amiga tão boa.', why: '"Such a good friend" = uma amiga tão boa.' }),
    ]),
    L(2, 'Tão… que…', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'The film was so boring ___ I fell asleep.', pt: 'O filme estava tão chato que eu dormi.', options: ['that', 'than', 'what'], answer: 'that', why: 'So + adjetivo + THAT + consequência.', wrong: { than: '"Than" é de comparação.', what: '"What" não liga a consequência.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'It was ___ a long queue that we went home.', pt: 'Era uma fila tão longa que fomos para casa.', options: ['such', 'so', 'very'], answer: 'such', why: 'Com "a long queue": such.', wrong: { so: '"So a long" não existe.', very: '"Very a long" não existe.' } }),
      I(2, 3, { type: 'meaning', en: 'The music was so loud that we couldn\'t talk.', options: ['A música estava tão alta que não dava para conversar.', 'A música estava baixa e conversamos.', 'Não tinha música.'], answer: 'A música estava tão alta que não dava para conversar.', why: '"So loud that" = tão alta que.' }),
      I(2, 4, { type: 'build', pt: 'Estava tão frio que ficamos em casa.', answer: 'It was so cold that we stayed at home', extra: ['such', 'than'], display: 'It was so cold that we stayed at home.', why: 'So + adjetivo + that.' }),
      I(2, 5, { type: 'listen', en: 'He was so nervous that he forgot his speech.', options: ['Ele estava tão nervoso que esqueceu o discurso.', 'Ele fez um ótimo discurso.', 'Ele não ficou nervoso.'], answer: 'Ele estava tão nervoso que esqueceu o discurso.', why: '"Speech" = discurso.' }),
      I(2, 6, { type: 'speak', en: 'It was such a great day!', pt: 'Foi um dia tão bom!', why: '"Such a" soa quase como "SÂ-tcha".' }),
    ]),
    L(3, 'Adjetivos fortes', [
      I(3, 1, { type: 'match', pairs: [['brilliant', 'genial'], ['impressive', 'impressionante'], ['disappointing', 'decepcionante'], ['awful', 'horrível']], why: '"Brilliant" no inglês britânico também quer dizer "ótimo".' }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'The view from the top was ___ amazing.', pt: 'A vista lá de cima era absolutamente incrível.', options: ['absolutely', 'very', 'a bit'], answer: 'absolutely', why: 'Com adjetivo forte (amazing), use "absolutely".', wrong: { very: '"Very amazing" soa estranho.', 'a bit': '"A bit amazing" não combina.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: 'I was really ___ with the hotel. It was dirty.', pt: 'Fiquei muito decepcionado com o hotel. Estava sujo.', options: ['disappointed', 'disappointing', 'disappoint'], answer: 'disappointed', why: 'A pessoa fica "disappointed".', wrong: { disappointing: '"Disappointing" é a coisa (o hotel).', disappoint: 'É o verbo.' } }),
      I(3, 4, { type: 'meaning', en: 'The concert was extremely impressive.', options: ['O show foi extremamente impressionante.', 'O show foi decepcionante.', 'O show foi curto.'], answer: 'O show foi extremamente impressionante.', why: '"Extremely" = extremamente.' }),
      I(3, 5, { type: 'build', pt: 'A comida estava incrivelmente boa.', answer: 'The food was incredibly good', extra: ['incredible', 'such'], display: 'The food was incredibly good.', why: 'Advérbio antes do adjetivo: incredibly good.' }),
      I(3, 6, { type: 'listen', en: "I'm terribly sorry.", options: ['Sinto muitíssimo.', 'Estou com muito medo.', 'Que coisa terrível.'], answer: 'Sinto muitíssimo.', why: '"Terribly sorry" = sinto muito (bem formal).' }),
      I(3, 7, { type: 'choice', prompt: 'Complete:', en: 'The ending of the film was ___. I expected more.', pt: 'O final do filme foi decepcionante. Eu esperava mais.', options: ['disappointing', 'disappointed', 'brilliant'], answer: 'disappointing', why: 'A coisa (o final) é "disappointing".', wrong: { disappointed: 'É a pessoa que fica "disappointed".', brilliant: 'Não combina com "esperava mais".' } }),
    ]),
    L(4, 'Prática: escrevendo uma avaliação', [
      I(4, 1, { type: 'match', pairs: [['review', 'avaliação'], ['recommend', 'recomendar'], ['extremely', 'extremamente'], ['absolutely', 'totalmente']], why: '"Write a review" = escrever uma avaliação.' }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'I would definitely ___ this restaurant.', pt: 'Eu com certeza recomendaria este restaurante.', options: ['recommend', 'recommends', 'recommending'], answer: 'recommend', why: 'Depois de "would", verbo normal.', wrong: { recommends: 'Depois de would, sem -s.', recommending: 'Sem -ing depois de would.' } }),
      I(4, 3, { type: 'meaning', en: 'The staff were so kind that we felt at home.', options: ['A equipe era tão simpática que nos sentimos em casa.', 'A equipe não foi simpática.', 'Ficamos em casa.'], answer: 'A equipe era tão simpática que nos sentimos em casa.', why: '"Feel at home" = se sentir em casa.' }),
      I(4, 4, { type: 'build', pt: 'Foi uma noite tão boa que voltamos no dia seguinte.', answer: 'It was such a good night that we came back the next day', extra: ['so', 'than'], display: 'It was such a good night that we came back the next day.', why: 'Such a + adjetivo + substantivo + that.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'How was the hotel?'], ['B', '___']], options: ['Absolutely awful! The room was so small.', 'Very awful! The room was such small.', 'So awful hotel!'], answer: 'Absolutely awful! The room was so small.', pt: 'Horrível! O quarto era tão pequeno.', why: 'Absolutely + adjetivo forte; "so small" (adjetivo sozinho).', wrong: { 'Very awful! The room was such small.': '"Very awful" soa estranho e "such small" está errado.', 'So awful hotel!': 'Com substantivo, seria "such an awful hotel".' } }),
      I(4, 6, { type: 'listen', en: "It wasn't as good as the reviews said.", options: ['Não foi tão bom quanto as avaliações diziam.', 'Foi melhor do que as avaliações diziam.', 'Não li as avaliações.'], answer: 'Não foi tão bom quanto as avaliações diziam.', why: '"Not as good as" = não tão bom quanto.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'Five stars! The service was ___.', pt: 'Cinco estrelas! O atendimento foi genial.', options: ['brilliant', 'disappointing', 'awful'], answer: 'brilliant', why: '"Brilliant" = genial, ótimo.', wrong: { disappointing: 'Não combina com cinco estrelas.', awful: 'Seria uma estrela!' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'O filme foi tão bom!', answer: 'The film was so good!', accept: ['The movie was so good!'], why: '"So" + adjetivo.' }),
      I(5, 2, { type: 'type', pt: 'Foi um dia tão longo!', answer: 'It was such a long day!', why: '"Such a" + adjetivo + substantivo.' }),
      I(5, 3, { type: 'dictation', en: 'I was so tired that I went to bed early.', why: 'So + adjetivo + that = tão... que.' }),
      I(5, 4, { type: 'type', pt: 'Eu recomendo este livro.', answer: 'I recommend this book.', why: '"Recommend" = recomendar.' }),
      I(5, 5, { type: 'dictation', en: 'The view was absolutely amazing.', why: '"Absolutely amazing" = absolutamente incrível.' }),
      I(5, 6, { type: 'type', pt: 'Fiquei decepcionado com o show.', answer: 'I was disappointed with the concert.', accept: ['I was disappointed with the show.'], why: 'A pessoa: disappointed.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'It was such a disappointing trip.', options: ['Foi uma viagem tão decepcionante.', 'Foi uma viagem incrível.', 'A viagem foi longa.'], answer: 'Foi uma viagem tão decepcionante.', why: '"Disappointing" = decepcionante.' }),
      I(6, 2, { type: 'dictation', en: 'The cake was so delicious!', why: '"Delicious" = delicioso.' }),
      I(6, 3, { type: 'listen', en: 'The museum was incredibly impressive.', options: ['O museu era incrivelmente impressionante.', 'O museu estava fechado.', 'O museu era pequeno.'], answer: 'O museu era incrivelmente impressionante.', why: '"Impressive" = impressionante.' }),
      I(6, 4, { type: 'dictation', en: 'I read the reviews online.', why: '"Reviews" = avaliações.' }),
      I(6, 5, { type: 'listen', en: 'The test was so easy that everyone finished early.', options: ['A prova estava tão fácil que todos terminaram cedo.', 'A prova estava difícil.', 'Ninguém terminou a prova.'], answer: 'A prova estava tão fácil que todos terminaram cedo.', why: 'So easy that = tão fácil que.' }),
      I(6, 6, { type: 'dictation', en: 'They are such kind people.', why: 'Plural: such, sem "a".' }),
      I(6, 7, { type: 'speak', en: 'I would really recommend it.', pt: 'Eu recomendaria muito.', why: '"Recommend" soa como "ré-ko-MÉND".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Did you like the new restaurant?'], ['B', '___']], options: ['Yes! The food was so good that I want to go back.', 'Yes! The food was such good that I want to go back.', 'Yes! So good food.'], answer: 'Yes! The food was so good that I want to go back.', pt: 'Sim! A comida estava tão boa que quero voltar.', why: 'So + adjetivo + that.', wrong: { 'Yes! The food was such good that I want to go back.': '"Such good" sem substantivo está errado.', 'Yes! So good food.': 'Seria "such good food".' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'How was the film?'], ['B', '___']], options: ['Honestly, it was a bit disappointing.', 'Honestly, I was a bit disappointing.', 'Honestly, it was disappointed.'], answer: 'Honestly, it was a bit disappointing.', pt: 'Sinceramente, foi meio decepcionante.', why: 'O filme é "disappointing".', wrong: { 'Honestly, I was a bit disappointing.': 'Isso diria que VOCÊ é decepcionante.', 'Honestly, it was disappointed.': 'O filme não sente nada: disappointing.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Would you recommend the hotel?'], ['B', '___']], options: ['Absolutely! It was such a lovely place.', 'Absolutely! It was so a lovely place.', 'Absolutely! It was very lovely place.'], answer: 'Absolutely! It was such a lovely place.', pt: 'Com certeza! Era um lugar tão agradável.', why: '"Absolutely!" sozinho = com certeza. "Such a lovely place".', wrong: { 'Absolutely! It was so a lovely place.': 'Não existe "so a".', 'Absolutely! It was very lovely place.': 'Faltou o "a".' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'The concert was amazing!'], ['B', '___']], options: ['I know! It was so loud that my ears still hurt.', 'I know! It was such loud that my ears hurt.', 'I know! So loud ears.'], answer: 'I know! It was so loud that my ears still hurt.', pt: 'Pois é! Estava tão alto que meus ouvidos ainda doem.', why: 'So + adjetivo + that.', wrong: { 'I know! It was such loud that my ears hurt.': '"Such loud" está errado.', 'I know! So loud ears.': 'Não forma frase.' } }),
      I(7, 5, { type: 'speak', en: 'It was absolutely brilliant!', pt: 'Foi absolutamente genial!', why: '"Brilliant" soa como "BRÍ-lian-t".' }),
      I(7, 6, { type: 'speak', en: 'It was so good that I went twice.', pt: 'Foi tão bom que fui duas vezes.', why: '"Twice" = duas vezes.' }),
    ]),
    L(8, 'Lendo: avaliações de um restaurante', [
      I(8, 1, { type: 'story', why: 'Três pessoas escrevem avaliações do mesmo restaurante. Repare nos adjetivos fortes. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que a Julia achou da comida?', options: ['Tão boa que pediu sobremesa duas vezes', 'Fria e sem graça', 'Apimentada demais'], answer: 'Tão boa que pediu sobremesa duas vezes', why: '"So good that I ordered dessert twice."' }),
      I(8, 3, { type: 'quiz', q: 'Qual foi o problema do Mike?', options: ['A espera longa', 'A comida fria', 'O preço'], answer: 'A espera longa', why: '"We waited such a long time for our table."' }),
      I(8, 4, { type: 'quiz', q: 'O Carlos recomenda o restaurante?', options: ['Sim, absolutamente', 'Não', 'Só no almoço'], answer: 'Sim, absolutamente', why: '"I\'d absolutely recommend it."' }),
    ], {
      title: 'Avaliações: Restaurante Sabor',
      lines: [
        { who: 'Julia', en: 'Five stars! The food was so good that I ordered dessert twice.', pt: 'Cinco estrelas! A comida estava tão boa que pedi sobremesa duas vezes.' },
        { who: 'Mike', en: 'Three stars. The food was brilliant, but we waited such a long time for our table.', pt: 'Três estrelas. A comida era ótima, mas esperamos tanto tempo pela mesa.' },
        { ask: 'Quantas estrelas o Mike deu?', options: ['Três', 'Cinco', 'Uma'], answer: 'Três', why: '"Three stars."' },
        { who: 'Carlos', en: 'The staff were ___ kind, and the view of the sea was absolutely amazing.', pt: 'A equipe era extremamente simpática, e a vista do mar era absolutamente incrível.', gap: { answer: 'extremely', options: ['extremely', 'such', 'disappointed'] } },
        { who: 'Carlos', en: "It isn't cheap, but I'd absolutely recommend it.", pt: 'Não é barato, mas eu recomendo totalmente.' },
        { who: 'Julia', en: 'The only disappointing thing? They had no chocolate cake left!', pt: 'A única coisa decepcionante? Não tinha mais bolo de chocolate!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'It was ___ an easy test!', pt: 'Foi uma prova tão fácil!', options: ['such', 'so', 'very'], answer: 'such', why: 'Com "an easy test": such.', wrong: { so: '"So an easy" não existe.', very: '"Very an easy" não existe.' } }),
      I(9, 2, { type: 'type', pt: 'Estava tão quente que fomos à praia.', answer: 'It was so hot that we went to the beach.', why: 'So + adjetivo + that.' }),
      I(9, 3, { type: 'meaning', en: 'I was so disappointed with the ending.', options: ['Fiquei tão decepcionado com o final.', 'O final foi ótimo.', 'Não vi o final.'], answer: 'Fiquei tão decepcionado com o final.', why: '"Disappointed" = decepcionado (a pessoa).' }),
      I(9, 4, { type: 'dictation', en: 'The hotel was absolutely awful.', why: '"Absolutely awful" = horrível.' }),
      I(9, 5, { type: 'listen', en: 'It was such a long film that I fell asleep.', options: ['Era um filme tão longo que eu dormi.', 'O filme era curto e bom.', 'Eu dormi antes do filme.'], answer: 'Era um filme tão longo que eu dormi.', why: 'Such a + adjetivo + substantivo + that.' }),
      I(9, 6, { type: 'build', pt: 'Eles são pessoas tão simpáticas.', answer: 'They are such nice people', extra: ['so', 'a'], display: 'They are such nice people.', why: 'Plural: such (sem "a").' }),
    ]),
    L(10, 'História: a crítica de cinema', [
      I(10, 1, { type: 'story', why: 'A Nina e o Ben saem do cinema com opiniões bem diferentes. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que a Nina achou do filme?', options: ['Genial', 'Chato', 'Normal'], answer: 'Genial', why: '"That was absolutely brilliant!"' }),
      I(10, 3, { type: 'quiz', q: 'Por que o Ben não gostou?', options: ['Achou o filme longo e decepcionante', 'Não entendeu o inglês', 'Estava com fome'], answer: 'Achou o filme longo e decepcionante', why: '"It was so long" e "disappointing".' }),
      I(10, 4, { type: 'quiz', q: 'O que eles combinam no fim?', options: ['Ele escolhe o próximo filme', 'Nunca mais ir ao cinema', 'Ver o mesmo filme de novo'], answer: 'Ele escolhe o próximo filme', why: '"Next time, I choose the film!"' }),
    ], {
      title: 'A crítica de cinema',
      lines: [
        { who: 'Nina', en: 'That was absolutely brilliant! The ending was so surprising!', pt: 'Foi absolutamente genial! O final foi tão surpreendente!' },
        { who: 'Ben', en: "Really? I thought it was such a disappointing film.", pt: 'Sério? Achei um filme tão decepcionante.' },
        { who: 'Nina', en: "Disappointing? The actors were extremely good!", pt: 'Decepcionante? Os atores eram extremamente bons!' },
        { who: 'Ben', en: 'Maybe. But it was ___ long that I almost fell asleep.', pt: 'Talvez. Mas foi tão longo que eu quase dormi.', gap: { answer: 'so', options: ['so', 'such', 'very'] } },
        { ask: 'O que quase aconteceu com o Ben?', options: ['Quase dormiu', 'Quase chorou', 'Quase saiu'], answer: 'Quase dormiu', why: '"I almost fell asleep."' },
        { who: 'Nina', en: "You're impossible! I'll write a five-star review.", pt: 'Você é impossível! Vou escrever uma avaliação de cinco estrelas.' },
        { who: 'Ben', en: 'And I\'ll write a two-star one. Next time, I choose the film!', pt: 'E eu vou escrever uma de duas estrelas. Da próxima vez, eu escolho o filme!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u14', level: 'B1', unlock: 'b1-u14', title: 'O melhor e o pior',
  intro: 'A Ana e o Tom contam a melhor e a pior experiência de viagem.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: our best and worst trips.", pt: 'E eu sou o Tom. Hoje: nossas melhores e piores viagens.' },
    { who: 'ana', en: 'My best trip was to Bahia. The beaches were absolutely amazing.', pt: 'Minha melhor viagem foi para a Bahia. As praias eram absolutamente incríveis.' },
    { who: 'tom', en: "My worst was a weekend in the mountains. It rained so much that we didn't leave the hotel.", pt: 'A pior foi um fim de semana nas montanhas. Choveu tanto que nem saímos do hotel.' },
    { who: 'ana', en: 'Oh no! Was the hotel nice, at least?', pt: 'Ah, não! O hotel pelo menos era bom?' },
    { who: 'tom', en: 'No! It was such a cold place. I was so disappointed.', pt: 'Não! Era um lugar tão frio. Fiquei tão decepcionado.' },
    { who: 'ana', en: 'Would you recommend it?', pt: 'Você recomendaria?' },
    { who: 'tom', en: "Absolutely not! That's all for today.", pt: 'De jeito nenhum! Por hoje é só.' },
    { who: 'ana', en: 'Bye! Thank you for listening!', pt: 'Tchau! Obrigada por ouvir!' },
  ],
  questions: [
    { q: 'Qual foi a melhor viagem da Ana?', options: ['Bahia', 'As montanhas', 'Londres'], answer: 'Bahia', why: '"My best trip was to Bahia."' },
    { q: 'O que aconteceu nas montanhas?', options: ['Choveu tanto que não saíram do hotel', 'Fez muito calor', 'Perderam o voo'], answer: 'Choveu tanto que não saíram do hotel', why: '"It rained so much that we didn\'t leave the hotel."' },
    { q: 'O Tom recomendaria o lugar?', options: ['De jeito nenhum', 'Sim, com certeza', 'Talvez no verão'], answer: 'De jeito nenhum', why: '"Absolutely not!"' },
  ],
}, 'pod-b1u13');
addScene('b1-u14', 'sitting-2', 'popcorn');
