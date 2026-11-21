// Etapa 1 do A2 completo: 3 lições novas na unidade 7 (Fazendo compras — some/any, much/many).
// Uso: node scripts/content-add/a2-u7.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-07.json', {
  words: [
    ['receipt', 'nota fiscal, recibo'],
    ['customer', 'cliente'],
    ['bargain', 'pechincha, preço ótimo'],
    ['change', 'troco'],
    ['slice', 'fatia'],
    ['piece', 'pedaço'],
    ['kilo', 'quilo'],
    ['enough', 'suficiente, o bastante'],
    ['fresh', 'fresco(a)'],
    ['fridge', 'geladeira'],
  ],
  lessons: [
    { after: 'a2-u7-l3', lesson: {
      id: 'a2-u7-l8', title: 'Quanto e quantos?', items: [
        { id: 'a2u7l8-1', type: 'match', pairs: [['receipt', 'nota fiscal'], ['change', 'troco'], ['slice', 'fatia'], ['kilo', 'quilo']], why: '"Receipt" tem um "p" mudo: soa como "ri-SÍIT".' },
        { id: 'a2u7l8-2', type: 'choice', prompt: 'Complete:', en: "There isn't ___ milk in the fridge.", pt: 'Não tem leite suficiente na geladeira.', options: ['enough', 'many', 'a'], answer: 'enough', why: '"Enough" = suficiente. Vem antes da coisa: enough milk, enough money.', wrong: { many: '"Many" é para coisas que se contam (many eggs). Leite não se conta.', a: '"A milk" não existe: leite não se conta.' } },
        { id: 'a2u7l8-3', type: 'choice', prompt: 'Complete:', en: 'How ___ slices of pizza do you want?', pt: 'Quantas fatias de pizza você quer?', options: ['many', 'much', 'any'], answer: 'many', why: 'Fatias se contam (one slice, two slices): how many.', wrong: { much: '"How much" é para o que não se conta (how much water) ou para preço.', any: '"How any" não existe.' } },
        { id: 'a2u7l8-4', type: 'choice', prompt: 'Complete:', en: "Can I have a ___ of cake, please?", pt: 'Pode me dar um pedaço de bolo, por favor?', options: ['piece', 'kilo', 'bottle'], answer: 'piece', why: '"A piece of" = um pedaço de. Muito usado com cake, bread, paper.', wrong: { kilo: 'Ninguém pede um quilo de bolo para comer na hora!', bottle: '"Bottle" = garrafa, para líquidos.' } },
        { id: 'a2u7l8-5', type: 'build', pt: 'Você quer a nota fiscal?', answer: 'Do you want the receipt', extra: ['change', 'wants'], display: 'Do you want the receipt?', why: 'Pergunta no presente: Do you want...? "Receipt" = nota fiscal.' },
        { id: 'a2u7l8-6', type: 'meaning', en: 'These shoes were a bargain!', options: ['Esses sapatos saíram baratíssimos!', 'Esses sapatos eram caros demais!', 'Esses sapatos estavam em falta!'], answer: 'Esses sapatos saíram baratíssimos!', why: '"A bargain" = uma pechincha, uma compra com preço ótimo.' },
        { id: 'a2u7l8-7', type: 'dialogue', lines: [['A', "That's 18 reais."], ['B', 'Here you are. 20.'], ['A', '___']], options: ["Thanks. Here's your change.", "Thanks. Here's your money back.", "Thanks. Here's your receipt back."], answer: "Thanks. Here's your change.", pt: 'Obrigado. Aqui está o seu troco.', why: '"Change" = troco. Também quer dizer "mudança", mas no caixa é troco.', wrong: { "Thanks. Here's your money back.": '"Money back" é devolver o dinheiro todo (reembolso).', "Thanks. Here's your receipt back.": 'A nota não volta: o cliente recebe o troco.' } },
      ],
    } },
    { after: 'a2-u7-l4', lesson: {
      id: 'a2-u7-l9', title: 'Ouvindo', items: [
        { id: 'a2u7l9-1', type: 'listen', en: 'Are these tomatoes fresh?', options: ['Esses tomates estão fresquinhos?', 'Esses tomates são caros?', 'Você tem tomates?'], answer: 'Esses tomates estão fresquinhos?', why: '"Fresh" = fresco, fresquinho.' },
        { id: 'a2u7l9-2', type: 'dictation', en: 'I need a kilo of rice.', why: '"A kilo of" = um quilo de.' },
        { id: 'a2u7l9-3', type: 'listen', en: "We don't have enough chairs for everyone.", options: ['Não temos cadeiras suficientes para todo mundo.', 'Temos cadeiras demais para todo mundo.', 'Não temos mesas para todo mundo.'], answer: 'Não temos cadeiras suficientes para todo mundo.', why: '"Enough" soa como "i-NÂF".' },
        { id: 'a2u7l9-4', type: 'dictation', en: 'Here is your receipt.', why: '"Receipt" soa como "ri-SÍIT": o "p" não é pronunciado.' },
        { id: 'a2u7l9-5', type: 'listen', en: 'The customer wants two slices of cheese.', options: ['O cliente quer duas fatias de queijo.', 'O cliente quer dois pedaços de bolo.', 'O cliente quer um quilo de queijo.'], answer: 'O cliente quer duas fatias de queijo.', why: '"Customer" = cliente. "Slices" = fatias.' },
        { id: 'a2u7l9-6', type: 'dictation', en: 'Put the milk in the fridge.', why: '"Fridge" = geladeira (forma curta de refrigerator).' },
        { id: 'a2u7l9-7', type: 'speak', en: 'Can I have a piece of cake?', pt: 'Pode me dar um pedaço de bolo?', why: '"Piece" soa como "PÍIS", igual a "peace".' },
      ],
    } },
    { after: 'a2-u7-l5', lesson: {
      id: 'a2-u7-l10', title: 'Lendo: na padaria',
      story: {
        title: 'Na padaria',
        lines: [
          { who: 'Sarah', en: 'Good morning! Is the bread fresh today?', pt: 'Bom dia! O pão está fresquinho hoje?' },
          { who: 'Carlos', en: 'Yes, it is! How many do you want?', pt: 'Está, sim! Quantos você quer?' },
          { ask: 'O que a Sarah pergunta primeiro?', options: ['Se o pão está fresquinho', 'Quanto custa o pão', 'Se tem bolo'], answer: 'Se o pão está fresquinho', why: '"Is the bread fresh today?"' },
          { who: 'Sarah', en: "Six, please. And is there ___ chocolate cake?", pt: 'Seis, por favor. E tem bolo de chocolate?', gap: { answer: 'any', options: ['any', 'many', 'a'] } },
          { who: 'Carlos', en: 'Yes. A piece is 8 reais, but the whole cake is a bargain: only 40!', pt: 'Tem. O pedaço é 8 reais, mas o bolo inteiro é uma pechincha: só 40!' },
          { who: 'Sarah', en: "I'll take two pieces. Here's 50. Can I have the receipt, please?", pt: 'Vou levar dois pedaços. Aqui estão 50. Pode me dar a nota, por favor?' },
          { ask: 'O que a Sarah compra além do pão?', options: ['Dois pedaços de bolo', 'O bolo inteiro', 'Nada'], answer: 'Dois pedaços de bolo', why: '"I\'ll take two pieces" = vou levar dois pedaços.' },
        ],
      },
      items: [
        { id: 'a2u7l10-1', type: 'story', why: 'A Sarah faz compras na padaria do Carlos. Leia com calma e ouça cada frase.' },
        { id: 'a2u7l10-2', type: 'quiz', q: 'Quantos pães a Sarah pede?', options: ['Seis', 'Dois', 'Oito'], answer: 'Seis', why: 'Ela diz "Six, please" = seis, por favor.' },
        { id: 'a2u7l10-3', type: 'quiz', q: 'Quanto custa o bolo inteiro?', options: ['40 reais', '8 reais', '50 reais'], answer: '40 reais', why: '"The whole cake is a bargain: only 40!"' },
        { id: 'a2u7l10-4', type: 'quiz', q: 'O que ela pede no final?', options: ['A nota fiscal', 'O troco em moedas', 'Um café'], answer: 'A nota fiscal', why: '"Can I have the receipt, please?"' },
      ],
    } },
  ],
});
