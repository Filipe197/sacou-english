// Etapa 1 do B1 completo: 3 lições novas na unidade 4 (Se isso acontecer… — first conditional).
// Uso: node scripts/content-add/b1-u4.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-04.json', {
  words: [
    ['warn', 'avisar, alertar'],
    ['risk', 'risco'],
    ['chance', 'chance'],
    ['likely / unlikely', 'provável / improvável'],
    ['forecast', 'previsão (do tempo)'],
    ['promise', 'prometer, promessa'],
    ['complain', 'reclamar'],
    ['refund', 'reembolso'],
    ['deliver', 'entregar'],
    ['otherwise', 'senão, caso contrário'],
  ],
  lessons: [
    { after: 'b1-u4-l3', lesson: {
      id: 'b1-u4-l8', title: 'Avisos e promessas', items: [
        { id: 'b1u4l8-1', type: 'match', pairs: [['warn', 'avisar'], ['promise', 'prometer'], ['complain', 'reclamar'], ['deliver', 'entregar']], why: '"Complain" leva "about": complain about the noise.' },
        { id: 'b1u4l8-2', type: 'choice', prompt: 'Complete:', en: "If the package doesn't arrive today, I ___ complain.", pt: 'Se o pacote não chegar hoje, vou reclamar.', options: ['will', 'would', 'am'], answer: 'will', why: 'First conditional: If + presente, will + verbo.', wrong: { would: '"Would" é do second conditional (situação imaginária).', am: '"I am complain" não existe.' } },
        { id: 'b1u4l8-3', type: 'choice', prompt: 'Complete:', en: 'Hurry up, ___ we will miss the train.', pt: 'Anda logo, senão vamos perder o trem.', options: ['otherwise', 'unless', 'if'], answer: 'otherwise', why: '"Otherwise" = senão, caso contrário.', wrong: { unless: '"Unless" = a não ser que; não encaixa depois de uma ordem.', if: '"If we will miss" não forma a ideia de "senão".' } },
        { id: 'b1u4l8-4', type: 'meaning', en: 'The forecast says it is likely to rain tomorrow.', options: ['A previsão diz que provavelmente vai chover amanhã.', 'A previsão diz que não vai chover amanhã.', 'Choveu muito ontem, segundo a previsão.'], answer: 'A previsão diz que provavelmente vai chover amanhã.', why: '"Likely to" = provável que. "Forecast" = previsão.' },
        { id: 'b1u4l8-5', type: 'build', pt: 'Prometo que vou ligar assim que chegar.', answer: "I promise I'll call as soon as I arrive", extra: ['will arrive', 'when'], display: "I promise I'll call as soon as I arrive.", why: 'Depois de "as soon as" o verbo fica no presente (arrive), mesmo falando do futuro.' },
        { id: 'b1u4l8-6', type: 'choice', prompt: 'Complete:', en: "If they don't deliver it by Friday, you ___ get a refund.", pt: 'Se não entregarem até sexta, você vai receber um reembolso.', options: ['will', "won't", 'would'], answer: 'will', why: 'Condição real no futuro: will.', wrong: { "won't": 'Não faria sentido: se não entregarem, o reembolso é garantido.', would: '"Would" é para situação imaginária.' } },
        { id: 'b1u4l8-7', type: 'dialogue', lines: [['A', 'Should I take an umbrella?'], ['B', '___']], options: ["Yes. If you don't, you'll get wet.", "Yes. If you won't, you get wet.", "Yes. If you didn't, you would get wet."], answer: "Yes. If you don't, you'll get wet.", pt: 'Sim. Se não levar, vai se molhar.', why: 'First conditional: if + presente (don\'t), will na outra parte.', wrong: { "Yes. If you won't, you get wet.": 'O "will" fica fora da parte do "if".', "Yes. If you didn't, you would get wet.": 'Isso é second conditional (imaginário).' } },
      ],
    } },
    { after: 'b1-u4-l4', lesson: {
      id: 'b1-u4-l9', title: 'Ouvindo', items: [
        { id: 'b1u4l9-1', type: 'listen', en: "It's unlikely that we'll finish today.", options: ['É improvável que a gente termine hoje.', 'Com certeza vamos terminar hoje.', 'A gente terminou hoje cedo.'], answer: 'É improvável que a gente termine hoje.', why: '"Unlikely" = improvável.' },
        { id: 'b1u4l9-2', type: 'dictation', en: 'I promise I will be careful.', why: '"Promise" soa como "PRÓ-mis".' },
        { id: 'b1u4l9-3', type: 'listen', en: "If you don't take the risk, you'll never know.", options: ['Se você não arriscar, nunca vai saber.', 'Se você arriscar, vai perder.', 'Você nunca arrisca.'], answer: 'Se você não arriscar, nunca vai saber.', why: '"Take a risk" = arriscar.' },
        { id: 'b1u4l9-4', type: 'dictation', en: 'They warned us about the storm.', why: '"Warn about" = avisar sobre. O "w" de warned soa como "u": "UÓRND".' },
        { id: 'b1u4l9-5', type: 'listen', en: "There's a good chance they'll win.", options: ['Tem uma boa chance de eles ganharem.', 'Eles não têm chance nenhuma.', 'Eles ganharam por sorte.'], answer: 'Tem uma boa chance de eles ganharem.', why: '"A good chance" = uma boa chance.' },
        { id: 'b1u4l9-6', type: 'dictation', en: 'If it is broken, ask for a refund.', why: '"Refund" = reembolso.' },
        { id: 'b1u4l9-7', type: 'speak', en: "I'll call you as soon as I arrive.", pt: 'Te ligo assim que eu chegar.', why: '"As soon as" soa como "az-SÚUN-az".' },
      ],
    } },
    { after: 'b1-u4-l5', lesson: {
      id: 'b1-u4-l10', title: 'Lendo: o e-mail de reclamação',
      story: {
        title: 'O e-mail de reclamação',
        lines: [
          { who: 'Clara', en: 'Dear Sir or Madam, I am writing to complain about my order.', pt: 'Prezados, escrevo para reclamar do meu pedido.' },
          { who: 'Clara', en: 'You promised to deliver the sofa on Monday, but it has not arrived.', pt: 'Vocês prometeram entregar o sofá na segunda, mas ele não chegou.' },
          { ask: 'Qual é o problema da Clara?', options: ['O sofá não chegou', 'O sofá chegou quebrado', 'O sofá é feio'], answer: 'O sofá não chegou', why: '"It has not arrived."' },
          { who: 'Clara', en: 'If it does not arrive by Friday, I will ask for a full ___.', pt: 'Se não chegar até sexta, vou pedir o reembolso total.', gap: { answer: 'refund', options: ['refund', 'forecast', 'risk'] } },
          { who: 'Clara', en: 'Please reply as soon as possible. Otherwise, I will write to the newspaper.', pt: 'Por favor, respondam o quanto antes. Caso contrário, vou escrever para o jornal.' },
          { who: 'Clara', en: 'Yours faithfully, Clara Lima.', pt: 'Atenciosamente, Clara Lima.' },
          { ask: 'O que ela vai fazer se não responderem?', options: ['Escrever para o jornal', 'Comprar outro sofá', 'Nada'], answer: 'Escrever para o jornal', why: '"Otherwise, I will write to the newspaper."' },
        ],
      },
      items: [
        { id: 'b1u4l10-1', type: 'story', why: 'A Clara escreve um e-mail formal de reclamação. Repare no começo e no fim formais. Leia com calma e ouça cada frase.' },
        { id: 'b1u4l10-2', type: 'quiz', q: 'Quando o sofá deveria ter chegado?', options: ['Na segunda', 'Na sexta', 'No sábado'], answer: 'Na segunda', why: '"You promised to deliver the sofa on Monday."' },
        { id: 'b1u4l10-3', type: 'quiz', q: 'Até quando o sofá precisa chegar?', options: ['Até sexta', 'Até amanhã', 'Até o mês que vem'], answer: 'Até sexta', why: '"If it does not arrive by Friday..."' },
        { id: 'b1u4l10-4', type: 'quiz', q: 'Como se começa um e-mail formal para alguém que você não conhece?', options: ['Dear Sir or Madam', 'Hi guys', 'Hello friend'], answer: 'Dear Sir or Madam', why: '"Dear Sir or Madam" = prezados senhores. Termina com "Yours faithfully".' },
      ],
    } },
  ],
  extraVocab: [
    { word: 'madam', reason: 'fórmula fixa de e-mail formal ("Dear Sir or Madam")' },
    { word: 'faithfully', reason: 'fórmula fixa de e-mail formal ("Yours faithfully")' },
    { word: 'lima', reason: 'sobrenome de pessoa na leitura' },
  ],
});
