// Etapa 1 do B1 completo: 3 lições novas na unidade 5 (E se…? — second conditional).
// Uso: node scripts/content-add/b1-u5.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-05.json', {
  words: [
    ['imagine', 'imaginar'],
    ['volunteer', 'voluntário(a), ser voluntário'],
    ['charity', 'instituição de caridade'],
    ['afford', 'ter dinheiro para, poder pagar'],
    ['honest', 'honesto(a), sincero(a)'],
    ['lie', 'mentir, mentira'],
    ['truth', 'verdade'],
    ['decision', 'decisão'],
    ['regret', 'se arrepender'],
    ['powerful', 'poderoso(a)'],
  ],
  lessons: [
    { after: 'b1-u5-l3', lesson: {
      id: 'b1-u5-l8', title: 'Dilemas', items: [
        { id: 'b1u5l8-1', type: 'match', pairs: [['truth', 'verdade'], ['lie', 'mentira'], ['decision', 'decisão'], ['regret', 'se arrepender']], why: '"Tell the truth" = falar a verdade. "Tell a lie" = contar uma mentira.' },
        { id: 'b1u5l8-2', type: 'choice', prompt: 'Complete:', en: 'If I found a wallet in the street, I ___ take it to the police.', pt: 'Se eu achasse uma carteira na rua, eu levaria para a polícia.', options: ['would', 'will', 'am'], answer: 'would', why: 'Situação imaginária: If + passado, would + verbo.', wrong: { will: '"Will" é para situação real e provável.', am: '"I am take" não existe.' } },
        { id: 'b1u5l8-3', type: 'choice', prompt: 'Complete:', en: "I'd buy a house by the beach if I ___ afford it.", pt: 'Eu compraria uma casa na praia se pudesse pagar.', options: ['could', 'can', 'will'], answer: 'could', why: 'Na parte do "if" imaginário, use o passado: could (pudesse).', wrong: { can: 'Com "would" na outra parte, o "if" pede passado: could.', will: '"Will" não entra na parte do "if".' } },
        { id: 'b1u5l8-4', type: 'meaning', en: 'If you were honest with her, she would understand.', options: ['Se você fosse sincero com ela, ela entenderia.', 'Você foi sincero e ela entendeu.', 'Se você mentir, ela vai descobrir.'], answer: 'Se você fosse sincero com ela, ela entenderia.', why: '"If you were... she would" = se você fosse... ela iria.' },
        { id: 'b1u5l8-5', type: 'build', pt: 'O que você faria se fosse um pássaro por um dia?', answer: 'What would you do if you were a bird for a day', extra: ['will', 'are'], display: 'What would you do if you were a bird for a day?', why: 'Pergunta imaginária: What would you do if you were...?' },
        { id: 'b1u5l8-6', type: 'choice', prompt: 'Complete:', en: 'If I had more free time, I ___ volunteer at a charity.', pt: 'Se eu tivesse mais tempo livre, eu seria voluntário numa instituição.', options: ['would', 'will', 'had'], answer: 'would', why: '"If I had..." (imaginário) + "I would...".', wrong: { will: 'Com "if I had" (passado), a outra parte leva "would".', had: '"I had volunteer" não existe.' } },
        { id: 'b1u5l8-7', type: 'dialogue', lines: [['A', 'Would you tell a lie to protect a friend?'], ['B', '___']], options: ["I don't think so. I'd tell the truth.", "I don't think so. I will tell the truth yesterday.", 'No, I would told the truth.'], answer: "I don't think so. I'd tell the truth.", pt: 'Acho que não. Eu falaria a verdade.', why: '"I\'d" = I would. Depois, verbo normal: tell.', wrong: { "I don't think so. I will tell the truth yesterday.": '"Will" e "yesterday" não combinam.', 'No, I would told the truth.': 'Depois de "would", verbo normal: tell.' } },
      ],
    } },
    { after: 'b1-u5-l4', lesson: {
      id: 'b1-u5-l9', title: 'Ouvindo', items: [
        { id: 'b1u5l9-1', type: 'listen', en: "If I were rich, I'd help my family.", options: ['Se eu fosse rico, ajudaria minha família.', 'Eu sou rico e ajudo minha família.', 'Quando eu for rico, vou ajudar minha família.'], answer: 'Se eu fosse rico, ajudaria minha família.', why: '"If I were" = se eu fosse. "I\'d" = eu iria / eu -ria.' },
        { id: 'b1u5l9-2', type: 'dictation', en: 'I would never lie to you.', why: '"Lie" = mentir. Soa como "LÁI".' },
        { id: 'b1u5l9-3', type: 'listen', en: "We can't afford a new car this year.", options: ['Não temos dinheiro para um carro novo este ano.', 'Não queremos um carro novo este ano.', 'Compramos um carro novo este ano.'], answer: 'Não temos dinheiro para um carro novo este ano.', why: '"Can\'t afford" = não ter dinheiro para pagar.' },
        { id: 'b1u5l9-4', type: 'dictation', en: 'It was a difficult decision.', why: '"Decision" soa como "di-SÍ-jon".' },
        { id: 'b1u5l9-5', type: 'listen', en: "Imagine you were the most powerful person in the world.", options: ['Imagine que você fosse a pessoa mais poderosa do mundo.', 'Você é a pessoa mais poderosa do mundo.', 'Imagine conhecer a pessoa mais poderosa do mundo.'], answer: 'Imagine que você fosse a pessoa mais poderosa do mundo.', why: '"Imagine you were..." abre uma situação imaginária.' },
        { id: 'b1u5l9-6', type: 'dictation', en: "If I were you, I'd tell the truth.", why: '"If I were you" = se eu fosse você (conselho).' },
        { id: 'b1u5l9-7', type: 'speak', en: 'What would you do in my place?', pt: 'O que você faria no meu lugar?', why: '"What would you" soa quase como "uót-UÚ-dju".' },
      ],
    } },
    { after: 'b1-u5-l5', lesson: {
      id: 'b1-u5-l10', title: 'Lendo: o que você faria?',
      story: {
        title: 'O que você faria?',
        lines: [
          { who: 'Tom', en: 'This week our question is: what would you do if you won a million reais?', pt: 'Nesta semana a pergunta é: o que você faria se ganhasse um milhão de reais?' },
          { who: 'Julia', en: "I'd buy a house for my parents. They've worked hard all their lives.", pt: 'Eu compraria uma casa para os meus pais. Eles trabalharam muito a vida toda.' },
          { ask: 'O que a Julia faria com o dinheiro?', options: ['Compraria uma casa para os pais', 'Viajaria pelo mundo', 'Pararia de trabalhar'], answer: 'Compraria uma casa para os pais', why: '"I\'d buy a house for my parents."' },
          { who: 'Leo', en: "If I had that money, I ___ give half of it to a charity for children.", pt: 'Se eu tivesse esse dinheiro, daria metade para uma instituição que ajuda crianças.', gap: { answer: 'would', options: ['would', 'will', 'did'] } },
          { who: 'Rita', en: "Honestly? I'd travel around the world. I wouldn't regret it!", pt: 'Sinceramente? Eu viajaria pelo mundo. Não me arrependeria!' },
          { who: 'Tom', en: 'Great answers! And you, what would you do?', pt: 'Ótimas respostas! E você, o que faria?' },
          { ask: 'Quem doaria parte do dinheiro?', options: ['O Leo', 'A Rita', 'O Tom'], answer: 'O Leo', why: '"I would give half of it to a charity."' },
        ],
      },
      items: [
        { id: 'b1u5l10-1', type: 'story', why: 'Num programa de rádio, as pessoas respondem uma pergunta imaginária. Leia com calma e ouça cada frase.' },
        { id: 'b1u5l10-2', type: 'quiz', q: 'Quanto do dinheiro o Leo daria?', options: ['Metade', 'Tudo', 'Nada'], answer: 'Metade', why: '"Half of it" = metade.' },
        { id: 'b1u5l10-3', type: 'quiz', q: 'O que a Rita faria?', options: ['Viajaria pelo mundo', 'Compraria uma casa', 'Abriria uma empresa'], answer: 'Viajaria pelo mundo', why: '"I\'d travel around the world."' },
        { id: 'b1u5l10-4', type: 'quiz', q: 'Por que o tempo verbal é "would" e não "will"?', options: ['Porque é uma situação imaginária', 'Porque já aconteceu', 'Porque é certo que vai acontecer'], answer: 'Porque é uma situação imaginária', why: 'Ganhar um milhão é improvável: second conditional, com would.' },
      ],
    } },
  ],
});
