// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 7 (Comida e bebida).
// Uso: node scripts/content-add/a1-u7.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-07.json', {
  words: [
    ['potato / tomato', 'batata / tomate'],
    ['grape', 'uva'],
    ['vegetable', 'legume / verdura'],
    ['fruit', 'fruta'],
    ['cake', 'bolo'],
    ['ice cream', 'sorvete'],
    ['cookie', 'biscoito / cookie'],
    ['soup', 'sopa'],
    ['butter', 'manteiga'],
    ['sugar', 'açúcar'],
    ['hot / cold', 'quente / frio'],
    ['delicious', 'delicioso(a)'],
    ['a glass of', 'um copo de'],
    ['price', 'preço'],
    ['need', 'precisar'],
  ],
  lessons: [
    { after: 'a1-u7-l3', lesson: {
      id: 'a1-u7-l8', title: 'Frutas, legumes e doces', items: [
        { id: 'a1u7l8-1', type: 'match', pairs: [['potato', 'batata'], ['tomato', 'tomate'], ['grape', 'uva'], ['vegetable', 'legume / verdura']], why: 'Plural de potato e tomato leva -es: potatoes, tomatoes.' },
        { id: 'a1u7l8-2', type: 'match', pairs: [['cake', 'bolo'], ['ice cream', 'sorvete'], ['cookie', 'biscoito'], ['soup', 'sopa']], why: '"Ice cream" é literalmente "creme gelado". "Cookie" é o biscoito doce.' },
        { id: 'a1u7l8-3', type: 'choice', prompt: 'Complete:', en: 'This soup is very ___. Careful!', pt: 'Esta sopa está muito quente. Cuidado!', options: ['hot', 'cold', 'sweet'], answer: 'hot', why: '"Hot" = quente (temperatura). Por isso o "cuidado!" (careful!).', wrong: { cold: '"Cold" é frio: não precisaria de cuidado.', sweet: '"Sweet" é doce.' } },
        { id: 'a1u7l8-4', type: 'meaning', en: 'The cake is delicious!', options: ['O bolo está delicioso!', 'O bolo está quente!', 'A sopa está deliciosa!'], answer: 'O bolo está delicioso!', why: '"Delicious" soa como "di-LÍ-shâs" = delicioso.' },
        { id: 'a1u7l8-5', type: 'build', pt: 'Eu gosto de sorvete de chocolate.', answer: 'I like chocolate ice cream', extra: ['cake', "don't"], display: 'I like chocolate ice cream.', why: 'O sabor vem ANTES: chocolate ice cream = sorvete de chocolate. Igual a "orange juice" (suco de laranja).' },
        { id: 'a1u7l8-6', type: 'choice', prompt: 'No restaurante:', en: 'Can I have a ___ of water, please?', pt: 'Pode me dar um copo de água, por favor?', options: ['glass', 'piece', 'box'], answer: 'glass', why: '"A glass of water" = um copo de água. "Glass" é o copo de vidro.', wrong: { piece: '"A piece of" é um pedaço (a piece of cake).', box: '"A box of" é uma caixa.' } },
        { id: 'a1u7l8-7', type: 'dialogue', lines: [['A', 'Would you like some cake?'], ['B', '___']], options: ['Yes, please! I love cake.', 'Yes, I am.', "I'm fine, thanks."], answer: 'Yes, please! I love cake.', pt: 'Sim, por favor! Eu amo bolo.', why: 'Para aceitar uma oferta (Would you like...?), responda "Yes, please". Para recusar: "No, thank you".', wrong: { 'Yes, I am.': '"I am" responde "Are you...?".', "I'm fine, thanks.": 'Isso responde "How are you?".' } },
      ],
    } },
    { after: 'a1-u7-l4', lesson: {
      id: 'a1-u7-l9', title: 'Ouvindo', items: [
        { id: 'a1u7l9-1', type: 'listen', en: "I'd like a cup of tea.", options: ['Eu queria uma xícara de chá.', 'Eu queria um copo de suco.', 'Eu gosto de chá.'], answer: 'Eu queria uma xícara de chá.', why: '"I\'d like" = eu queria (pedido educado). "A cup of" = uma xícara de.' },
        { id: 'a1u7l9-2', type: 'dictation', en: 'The soup is hot.', why: '"Soup" soa como "súp". "Hot" = quente.' },
        { id: 'a1u7l9-3', type: 'listen', en: 'We need potatoes and tomatoes.', options: ['Precisamos de batatas e tomates.', 'Precisamos de bananas e uvas.', 'Gostamos de batatas e tomates.'], answer: 'Precisamos de batatas e tomates.', why: '"Need" = precisar. "Potatoes" e "tomatoes" são plurais com -es.' },
        { id: 'a1u7l9-4', type: 'dictation', en: "I don't eat sugar.", why: '"Sugar" soa como "SHÚ-gar": o "s" tem som de "x".' },
        { id: 'a1u7l9-5', type: 'listen', en: 'How much is the cake?', options: ['Quanto custa o bolo?', 'De quem é o bolo?', 'Você gosta de bolo?'], answer: 'Quanto custa o bolo?', why: '"How much is...?" = quanto custa...? Muito útil em lojas e cafés.' },
        { id: 'a1u7l9-6', type: 'dictation', en: 'Fruit is good for you.', why: '"Fruit" (fruta) soa como "frút": o "i" não se pronuncia.' },
        { id: 'a1u7l9-7', type: 'speak', en: 'Can I have some water, please?', pt: 'Pode me dar um pouco de água, por favor?', why: '"Can I have...?" é o jeito mais simples e educado de pedir algo.' },
      ],
    } },
    { after: 'a1-u7-l5', lesson: {
      id: 'a1-u7-l10', title: 'Lendo: o cardápio',
      story: {
        title: 'O cardápio do café',
        lines: [
          { who: 'Julia', en: 'Breakfast: bread with butter, eggs and fruit.', pt: 'Café da manhã: pão com manteiga, ovos e fruta.' },
          { who: 'Julia', en: 'Lunch: chicken soup or fish with potatoes.', pt: 'Almoço: sopa de frango ou peixe com batatas.' },
          { ask: 'O que tem no almoço?', options: ['Sopa de frango ou peixe com batatas', 'Pão com manteiga', 'Bolo de chocolate'], answer: 'Sopa de frango ou peixe com batatas', why: '"Lunch: chicken soup or fish with potatoes".' },
          { who: 'Julia', en: 'Sweet things: chocolate cake and ice cream.', pt: 'Doces: bolo de chocolate e sorvete.' },
          { who: 'Julia', en: 'Drinks: coffee, tea and orange juice. The juice is very ___!', pt: 'Bebidas: café, chá e suco de laranja. O suco é bem gelado!', gap: { answer: 'cold', options: ['cold', 'hot', 'old'] } },
          { ask: 'Que doces tem?', options: ['Bolo de chocolate e sorvete', 'Bolo de banana', 'Biscoitos'], answer: 'Bolo de chocolate e sorvete', why: '"Sweet things: chocolate cake and ice cream".' },
          { who: 'Julia', en: 'Everything is delicious, and the prices are good!', pt: 'Tudo é delicioso, e os preços são bons!' },
        ],
      },
      items: [
        { id: 'a1u7l10-1', type: 'story', why: 'Um cardápio de café. Leia como se fosse pedir: o que você escolheria?' },
        { id: 'a1u7l10-2', type: 'quiz', q: 'O que vem com o pão no café da manhã?', options: ['Manteiga', 'Queijo', 'Sopa'], answer: 'Manteiga', why: '"Bread with butter" = pão com manteiga.' },
        { id: 'a1u7l10-3', type: 'quiz', q: 'Como é o suco?', options: ['Bem gelado', 'Quente', 'Doce demais'], answer: 'Bem gelado', why: '"The juice is very cold".' },
        { id: 'a1u7l10-4', type: 'quiz', q: 'Como são os preços?', options: ['Bons', 'Caros', 'Altos'], answer: 'Bons', why: '"The prices are good" = os preços são bons.' },
      ],
    } },
  ],
});
