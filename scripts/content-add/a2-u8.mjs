// Etapa 1 do A2 completo: 3 lições novas na unidade 8 (Posso? Preciso? — can, could, have to).
// Uso: node scripts/content-add/a2-u8.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-08.json', {
  words: [
    ['must', 'precisar, ter que (regra, obrigação forte)'],
    ["mustn't", 'não pode (é proibido)'],
    ['lend', 'emprestar (para alguém)'],
    ['polite', 'educado(a)'],
    ['rule', 'regra'],
    ['licence', 'carteira, licença (de motorista)'],
    ['fail', 'não passar, reprovar'],
    ['lesson', 'aula'],
    ['allowed', 'permitido'],
  ],
  lessons: [
    { after: 'a2-u8-l3', lesson: {
      id: 'a2-u8-l8', title: 'Regras e favores', items: [
        { id: 'a2u8l8-1', type: 'match', pairs: [['rule', 'regra'], ['lend', 'emprestar'], ['polite', 'educado'], ['fail', 'reprovar']], why: '"Lend" é emprestar PARA alguém; "borrow" é pegar emprestado DE alguém.' },
        { id: 'a2u8l8-2', type: 'choice', prompt: 'Complete:', en: 'Could you ___ me your pen?', pt: 'Você poderia me emprestar sua caneta?', options: ['lend', 'borrow', 'lent'], answer: 'lend', why: 'Quem empresta é o outro: "lend me" = me empresta.', wrong: { borrow: '"Borrow" é pegar emprestado: Can I borrow your pen?', lent: 'Depois de "could you" o verbo fica normal: lend.' } },
        { id: 'a2u8l8-3', type: 'choice', prompt: 'Complete:', en: 'You ___ use your phone in the exam. It is a rule.', pt: 'Você não pode usar o celular na prova. É uma regra.', options: ["mustn't", "don't have to", 'must'], answer: "mustn't", why: '"Mustn\'t" = é proibido. "Don\'t have to" = não é preciso (mas pode).', wrong: { "don't have to": '"Don\'t have to" quer dizer "não precisa", não "é proibido".', must: '"Must" é o contrário: é obrigatório.' } },
        { id: 'a2u8l8-4', type: 'choice', prompt: 'Complete:', en: 'Pets are not ___ in this hotel.', pt: 'Animais de estimação não são permitidos neste hotel.', options: ['allowed', 'allow', 'polite'], answer: 'allowed', why: '"Be allowed" = ser permitido. Muito comum em placas e regras.', wrong: { allow: 'Depois de "are not" precisa de "allowed".', polite: '"Polite" = educado. Não faz sentido aqui.' } },
        { id: 'a2u8l8-5', type: 'build', pt: 'Você tem que ter carteira para dirigir.', answer: 'You must have a licence to drive', extra: ['mustn\'t', 'can'], display: 'You must have a licence to drive.', why: '"Must" + verbo normal = obrigação, regra. "Licence" = carteira de motorista.' },
        { id: 'a2u8l8-6', type: 'meaning', en: "It isn't polite to talk with your mouth full.", options: ['Não é educado falar de boca cheia.', 'Não é permitido falar alto.', 'Não é fácil falar de boca cheia.'], answer: 'Não é educado falar de boca cheia.', why: '"Polite" = educado. "With your mouth full" = de boca cheia.' },
        { id: 'a2u8l8-7', type: 'dialogue', lines: [['A', 'I failed my driving test again.'], ['B', '___']], options: ["Oh no! You can try again next month.", 'Oh no! You could try again last month.', 'Oh no! You must to try again next month.'], answer: 'Oh no! You can try again next month.', pt: 'Ah, não! Você pode tentar de novo no mês que vem.', why: '"Fail" = reprovar. "Can" para dizer que é possível.', wrong: { 'Oh no! You could try again last month.': '"Last month" é passado; a nova chance é no futuro.', 'Oh no! You must to try again next month.': 'Depois de "must" não vai "to".' } },
      ],
    } },
    { after: 'a2-u8-l4', lesson: {
      id: 'a2-u8-l9', title: 'Ouvindo', items: [
        { id: 'a2u8l9-1', type: 'listen', en: "You mustn't park here.", options: ['Você não pode estacionar aqui.', 'Você não precisa estacionar aqui.', 'Você deve estacionar aqui.'], answer: 'Você não pode estacionar aqui.', why: '"Mustn\'t" soa como "MÂ-sant": o primeiro "t" some.' },
        { id: 'a2u8l9-2', type: 'dictation', en: 'Could you lend me ten reais?', why: '"Lend me" = me empresta.' },
        { id: 'a2u8l9-3', type: 'listen', en: "Is smoking allowed here?", options: ['É permitido fumar aqui?', 'É proibido comer aqui?', 'Você fuma aqui?'], answer: 'É permitido fumar aqui?', why: '"Allowed" soa como "a-LÁUD".' },
        { id: 'a2u8l9-4', type: 'dictation', en: 'He has a driving lesson today.', why: '"Driving lesson" = aula de direção.' },
        { id: 'a2u8l9-5', type: 'listen', en: "She didn't fail. She passed!", options: ['Ela não reprovou. Ela passou!', 'Ela reprovou de novo.', 'Ela não fez a prova.'], answer: 'Ela não reprovou. Ela passou!', why: '"Fail" = reprovar. "Pass" = passar.' },
        { id: 'a2u8l9-6', type: 'dictation', en: 'Every school has rules.', why: '"Rules" = regras. Soa como "RÚULZ".' },
        { id: 'a2u8l9-7', type: 'speak', en: 'Could you help me, please?', pt: 'Você poderia me ajudar, por favor?', why: '"Could you" soa quase como "KÚ-djiu". É o jeito educado de pedir.' },
      ],
    } },
    { after: 'a2-u8-l5', lesson: {
      id: 'a2-u8-l10', title: 'Lendo: as regras do prédio',
      story: {
        title: 'As regras do prédio',
        lines: [
          { who: 'Ben', en: 'Welcome to our building! Here are some rules.', pt: 'Bem-vindo ao nosso prédio! Aqui vão algumas regras.' },
          { who: 'Ben', en: "You mustn't make noise after ten at night.", pt: 'Não pode fazer barulho depois das dez da noite.' },
          { ask: 'Até que horas pode fazer barulho?', options: ['Até as dez da noite', 'Até a meia-noite', 'Pode a qualquer hora'], answer: 'Até as dez da noite', why: '"You mustn\'t make noise after ten at night."' },
          { who: 'Ben', en: 'Dogs are ___, but they must stay on the lead.', pt: 'Cachorros são permitidos, mas precisam ficar na coleira.', gap: { answer: 'allowed', options: ['allowed', 'polite', 'enough'] } },
          { who: 'Ben', en: "You don't have to use the stairs. We have an elevator!", pt: 'Você não precisa usar a escada. Temos elevador!' },
          { who: 'Ben', en: 'And please be polite to your neighbours. Could you say hello?', pt: 'E, por favor, seja educado com os vizinhos. Pode dizer oi?' },
          { ask: 'Precisa subir de escada?', options: ['Não, tem elevador', 'Sim, sempre', 'Só depois das dez'], answer: 'Não, tem elevador', why: '"You don\'t have to use the stairs. We have an elevator!"' },
        ],
      },
      items: [
        { id: 'a2u8l10-1', type: 'story', why: 'O Ben explica as regras do prédio para um morador novo. Leia com calma e ouça cada frase.' },
        { id: 'a2u8l10-2', type: 'quiz', q: 'Pode ter cachorro no prédio?', options: ['Sim, na coleira', 'Não, é proibido', 'Só gatos'], answer: 'Sim, na coleira', why: '"Dogs are allowed, but they must stay on the lead."' },
        { id: 'a2u8l10-3', type: 'quiz', q: 'O que "elevator" quer dizer?', options: ['Elevador', 'Escada', 'Coleira'], answer: 'Elevador', why: '"Elevator" = elevador. No inglês britânico também se diz "lift".' },
        { id: 'a2u8l10-4', type: 'quiz', q: 'Como o Ben pede para tratar os vizinhos?', options: ['Com educação', 'Sem falar com eles', 'Só depois das dez'], answer: 'Com educação', why: '"Please be polite to your neighbours."' },
      ],
    } },
  ],
});
