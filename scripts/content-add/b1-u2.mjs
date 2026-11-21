// Etapa 1 do B1 completo: 3 lições novas na unidade 2 (Desde quando? — for, since, already, yet, just).
// Uso: node scripts/content-add/b1-u2.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-02.json', {
  words: [
    ['so far', 'até agora'],
    ['lately', 'ultimamente'],
    ['century', 'século'],
    ['degree', 'diploma, graduação'],
    ['promotion', 'promoção (no trabalho)'],
    ['engaged', 'noivo(a)'],
    ['journey', 'viagem, jornada'],
    ['progress', 'progresso'],
    ['task', 'tarefa'],
    ['deadline', 'prazo'],
  ],
  lessons: [
    { after: 'b1-u2-l3', lesson: {
      id: 'b1-u2-l8', title: 'Novidades da vida', items: [
        { id: 'b1u2l8-1', type: 'match', pairs: [['engaged', 'noivo'], ['promotion', 'promoção'], ['degree', 'diploma'], ['deadline', 'prazo']], why: '"Get engaged" = ficar noivo. "Get a promotion" = ser promovido.' },
        { id: 'b1u2l8-2', type: 'choice', prompt: 'Complete:', en: "Guess what? We've ___ got engaged!", pt: 'Adivinha? A gente acabou de ficar noivo!', options: ['just', 'yet', 'since'], answer: 'just', why: '"Just" = acabou de. Vai entre "have" e o particípio.', wrong: { yet: '"Yet" vai no fim de perguntas e negativas.', since: '"Since" = desde, precisa de um ponto no tempo.' } },
        { id: 'b1u2l8-3', type: 'choice', prompt: 'Complete:', en: "I haven't finished the task ___.", pt: 'Ainda não terminei a tarefa.', options: ['yet', 'already', 'just'], answer: 'yet', why: 'Na negativa, "yet" no fim = ainda não.', wrong: { already: '"Already" = já, em frases afirmativas.', just: '"Just" não combina com a negativa aqui.' } },
        { id: 'b1u2l8-4', type: 'choice', prompt: 'Complete:', en: 'This house has been here ___ more than a century.', pt: 'Esta casa está aqui há mais de um século.', options: ['for', 'since', 'ago'], answer: 'for', why: '"For" + período (more than a century). "Since" + ponto de início (since 1920).', wrong: { since: '"Since" precisa de um ponto: since 1920.', ago: '"Ago" vai com o passado simples: a century ago.' } },
        { id: 'b1u2l8-5', type: 'build', pt: 'Ela já foi promovida duas vezes este ano.', answer: 'She has already got two promotions this year', extra: ['yet', 'have'], display: 'She has already got two promotions this year.', why: '"Already" entre has e o particípio. "This year" (ainda não acabou) combina com present perfect.' },
        { id: 'b1u2l8-6', type: 'meaning', en: "I haven't seen him lately. Is he OK?", options: ['Não tenho visto ele ultimamente. Ele está bem?', 'Vi ele agora há pouco. Ele está bem.', 'Nunca vi ele. Quem é?'], answer: 'Não tenho visto ele ultimamente. Ele está bem?', why: '"Lately" = ultimamente. Combina com present perfect.' },
        { id: 'b1u2l8-7', type: 'dialogue', lines: [['A', 'How long have you studied English?'], ['B', '___']], options: ["Since 2022. I've made a lot of progress so far.", "For 2022. I made a lot of progress so far.", "Since two years. I make progress."], answer: "Since 2022. I've made a lot of progress so far.", pt: 'Desde 2022. Já progredi bastante até agora.', why: '"Since" + ano. "So far" = até agora, combina com present perfect.', wrong: { "For 2022. I made a lot of progress so far.": '"For" pede um período (for two years); 2022 é um ponto: since.', "Since two years. I make progress.": '"Two years" é período: for two years.' } },
      ],
    } },
    { after: 'b1-u2-l4', lesson: {
      id: 'b1-u2-l9', title: 'Ouvindo', items: [
        { id: 'b1u2l9-1', type: 'listen', en: "Have you finished your degree yet?", options: ['Você já terminou a faculdade?', 'Você começou a faculdade?', 'Quando você vai terminar a faculdade?'], answer: 'Você já terminou a faculdade?', why: 'Na pergunta, "yet" no fim = já.' },
        { id: 'b1u2l9-2', type: 'dictation', en: "We've just arrived at the hotel.", why: '"Just" = acabamos de.' },
        { id: 'b1u2l9-3', type: 'listen', en: "They've known each other since school.", options: ['Eles se conhecem desde a escola.', 'Eles se conheceram ontem na escola.', 'Eles vão para a mesma escola.'], answer: 'Eles se conhecem desde a escola.', why: '"Since school" = desde a escola. "Each other" = um ao outro.' },
        { id: 'b1u2l9-4', type: 'dictation', en: 'The deadline is tomorrow.', why: '"Deadline" = prazo final.' },
        { id: 'b1u2l9-5', type: 'listen', en: "It's been a long journey, but we're almost there.", options: ['Foi uma longa jornada, mas estamos quase lá.', 'A viagem foi curta e já chegamos.', 'Vamos começar uma longa viagem.'], answer: 'Foi uma longa jornada, mas estamos quase lá.', why: '"It\'s been" = it has been. "Almost there" = quase lá.' },
        { id: 'b1u2l9-6', type: 'dictation', en: "I haven't had much time lately.", why: '"Lately" soa como "LÊIT-li".' },
        { id: 'b1u2l9-7', type: 'speak', en: "I've already done my homework.", pt: 'Eu já fiz minha lição de casa.', why: '"Already" soa como "ól-RÉ-di".' },
      ],
    } },
    { after: 'b1-u2-l5', lesson: {
      id: 'b1-u2-l10', title: 'Lendo: a mensagem da Laura',
      story: {
        title: 'A mensagem da Laura',
        lines: [
          { who: 'Laura', en: "Hi Mike! It's been ages since we last talked. A lot has happened!", pt: 'Oi, Mike! Faz séculos que a gente não se fala. Aconteceu muita coisa!' },
          { who: 'Laura', en: "I've finished my degree, and I've just got a job at a big company.", pt: 'Terminei a faculdade e acabei de conseguir um emprego numa empresa grande.' },
          { ask: 'O que a Laura acabou de conseguir?', options: ['Um emprego', 'Um diploma', 'Uma casa'], answer: 'Um emprego', why: '"I\'ve just got a job" = acabei de conseguir um emprego.' },
          { who: 'Laura', en: "And the big news: Ben and I have got ___! The wedding is next year.", pt: 'E a grande novidade: o Ben e eu ficamos noivos! O casamento é no ano que vem.', gap: { answer: 'engaged', options: ['engaged', 'promotion', 'deadline'] } },
          { who: 'Laura', en: "We've lived together since March. We haven't found a bigger flat yet.", pt: 'Moramos juntos desde março. Ainda não achamos um apartamento maior.' },
          { who: 'Laura', en: "What about you? Have you finished that book you were writing?", pt: 'E você? Já terminou aquele livro que estava escrevendo?' },
          { ask: 'Desde quando a Laura e o Ben moram juntos?', options: ['Desde março', 'Desde o ano passado', 'Há dez anos'], answer: 'Desde março', why: '"We\'ve lived together since March."' },
        ],
      },
      items: [
        { id: 'b1u2l10-1', type: 'story', why: 'A Laura manda notícias para um amigo depois de muito tempo. Leia com calma e ouça cada frase.' },
        { id: 'b1u2l10-2', type: 'quiz', q: 'Qual é a grande novidade?', options: ['Ela ficou noiva', 'Ela se mudou para o exterior', 'Ela escreveu um livro'], answer: 'Ela ficou noiva', why: '"Ben and I have got engaged!"' },
        { id: 'b1u2l10-3', type: 'quiz', q: 'O que eles ainda não fizeram?', options: ['Achar um apartamento maior', 'Morar juntos', 'Marcar a data do casamento'], answer: 'Achar um apartamento maior', why: '"We haven\'t found a bigger flat yet."' },
        { id: 'b1u2l10-4', type: 'quiz', q: 'O que quer dizer "It\'s been ages"?', options: ['Faz muito tempo', 'Faz pouco tempo', 'Estamos velhos'], answer: 'Faz muito tempo', why: '"It\'s been ages" = faz séculos, faz muito tempo.' },
      ],
    } },
  ],
});
