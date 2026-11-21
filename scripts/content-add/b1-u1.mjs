// Etapa 1 do B1 completo: 3 lições novas na unidade 1 (Você já…? — present perfect de experiência).
// Uso: node scripts/content-add/b1-u1.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-01.json', {
  words: [
    ['amazing', 'incrível'],
    ['incredible', 'inacreditável, incrível'],
    ['adventure', 'aventura'],
    ['extreme', 'radical, extremo(a)'],
    ['opportunity', 'oportunidade'],
    ['achieve', 'conquistar, alcançar'],
    ['culture', 'cultura'],
    ['tradition', 'tradição'],
    ['sunrise / sunset', 'nascer do sol / pôr do sol'],
    ['tent', 'barraca'],
    ['passport', 'passaporte'],
  ],
  lessons: [
    { after: 'b1-u1-l3', lesson: {
      id: 'b1-u1-l8', title: 'Experiências incríveis', items: [
        { id: 'b1u1l8-1', type: 'match', pairs: [['adventure', 'aventura'], ['opportunity', 'oportunidade'], ['tradition', 'tradição'], ['sunrise', 'nascer do sol']], why: '"Sunrise" (o sol sobe) e "sunset" (o sol se põe): fácil de lembrar pelo "rise" e "set".' },
        { id: 'b1u1l8-2', type: 'choice', prompt: 'Complete:', en: 'Have you ever ___ in a tent?', pt: 'Você já dormiu numa barraca?', options: ['slept', 'sleep', 'sleeped'], answer: 'slept', why: 'Present perfect = have + particípio. "Sleep" → slept.', wrong: { sleep: 'Depois de "have" vem o particípio: slept.', sleeped: '"Sleep" é irregular: slept.' } },
        { id: 'b1u1l8-3', type: 'choice', prompt: 'Complete:', en: "It's the most amazing place I've ever ___.", pt: 'É o lugar mais incrível que eu já vi.', options: ['seen', 'saw', 'see'], answer: 'seen', why: 'Superlativo + "I\'ve ever" + particípio = o mais... que já vi.', wrong: { saw: '"Saw" é passado simples; aqui precisa do particípio: seen.', see: 'Depois de "have" (\'ve), particípio: seen.' } },
        { id: 'b1u1l8-4', type: 'meaning', en: "I've never had the opportunity to travel abroad.", options: ['Nunca tive a oportunidade de viajar para o exterior.', 'Tive muitas oportunidades de viajar.', 'Nunca quis viajar para o exterior.'], answer: 'Nunca tive a oportunidade de viajar para o exterior.', why: '"I\'ve never had" = nunca tive. "Opportunity" = oportunidade.' },
        { id: 'b1u1l8-5', type: 'build', pt: 'Ela já viu o pôr do sol na praia?', answer: 'Has she ever seen the sunset on the beach', extra: ['saw', 'have'], display: 'Has she ever seen the sunset on the beach?', why: 'Pergunta: Has + she + ever + particípio.' },
        { id: 'b1u1l8-6', type: 'choice', prompt: 'Complete:', en: 'He has ___ a lot in his career.', pt: 'Ele conquistou muita coisa na carreira.', options: ['achieved', 'achieve', 'achieving'], answer: 'achieved', why: '"Achieve" = conquistar. Particípio: achieved.', wrong: { achieve: 'Depois de "has", particípio.', achieving: 'Seria "has been achieving", outro tempo.' } },
        { id: 'b1u1l8-7', type: 'dialogue', lines: [['A', "Have you ever tried an extreme sport?"], ['B', '___']], options: ["Yes, I have. I went surfing in Bahia last year.", "Yes, I have. I have gone surfing in Bahia last year.", "Yes, I did. I go surfing in Bahia."], answer: "Yes, I have. I went surfing in Bahia last year.", pt: 'Já. Fui surfar na Bahia no ano passado.', why: 'Responda a experiência com present perfect (I have) e o detalhe com quando no passado simples (went ... last year).', wrong: { "Yes, I have. I have gone surfing in Bahia last year.": 'Com "last year" (quando), use o passado simples: went.', "Yes, I did. I go surfing in Bahia.": 'A pergunta é "Have you...?", a resposta curta é "I have".' } },
      ],
    } },
    { after: 'b1-u1-l4', lesson: {
      id: 'b1-u1-l9', title: 'Ouvindo', items: [
        { id: 'b1u1l9-1', type: 'listen', en: "I've never seen anything so beautiful.", options: ['Nunca vi nada tão bonito.', 'Nunca vi isso antes.', 'Vi uma coisa muito bonita ontem.'], answer: 'Nunca vi nada tão bonito.', why: '"Never... anything" = nunca... nada. Em inglês só um negativo por frase.' },
        { id: 'b1u1l9-2', type: 'dictation', en: 'Have you ever been to Japan?', why: '"Have you ever been to...?" = você já foi a...?' },
        { id: 'b1u1l9-3', type: 'listen', en: "She's lost her passport twice.", options: ['Ela já perdeu o passaporte duas vezes.', 'Ela perdeu o passaporte ontem.', 'Ela nunca perdeu o passaporte.'], answer: 'Ela já perdeu o passaporte duas vezes.', why: '"She\'s lost" = she has lost. "Twice" = duas vezes.' },
        { id: 'b1u1l9-4', type: 'dictation', en: 'It was an incredible adventure.', why: '"Incredible" soa como "in-KRÉ-di-bol".' },
        { id: 'b1u1l9-5', type: 'listen', en: 'Have they ever tried Brazilian food?', options: ['Eles já provaram comida brasileira?', 'Eles gostam de comida brasileira?', 'Eles cozinharam comida brasileira ontem?'], answer: 'Eles já provaram comida brasileira?', why: '"Try" = provar (comida). Particípio: tried.' },
        { id: 'b1u1l9-6', type: 'dictation', en: "I've learned a lot about their culture.", why: '"Culture" soa como "KÂL-tcher".' },
        { id: 'b1u1l9-7', type: 'speak', en: "It's the best trip I've ever had.", pt: 'É a melhor viagem que eu já fiz.', why: '"I\'ve ever" soa quase junto: "ái-VÉ-ver".' },
      ],
    } },
    { after: 'b1-u1-l5', lesson: {
      id: 'b1-u1-l10', title: 'Lendo: o blog de viagem da Emma',
      story: {
        title: 'O blog de viagem da Emma',
        lines: [
          { who: 'Emma', en: "I've traveled to twelve countries, but Peru has been my favorite adventure so far.", pt: 'Já viajei para doze países, mas o Peru foi minha aventura favorita até agora.' },
          { who: 'Emma', en: "I've climbed mountains, I've slept in a tent and I've tried food I didn't know.", pt: 'Já subi montanhas, já dormi em barraca e já provei comidas que eu não conhecia.' },
          { ask: 'Para quantos países a Emma já viajou?', options: ['Doze', 'Dois', 'Vinte'], answer: 'Doze', why: '"I\'ve traveled to twelve countries."' },
          { who: 'Emma', en: "Last week I watched the ___ over the mountains at five in the morning.", pt: 'Semana passada eu vi o nascer do sol sobre as montanhas às cinco da manhã.', gap: { answer: 'sunrise', options: ['sunrise', 'sunset', 'passport'] } },
          { who: 'Emma', en: "It was the most amazing thing I've ever seen.", pt: 'Foi a coisa mais incrível que eu já vi.' },
          { who: 'Emma', en: "I've never had an opportunity like this. Travel is the best way to learn about other cultures.", pt: 'Nunca tive uma oportunidade como esta. Viajar é o melhor jeito de conhecer outras culturas.' },
          { ask: 'Para a Emma, viajar é o melhor jeito de quê?', options: ['Conhecer outras culturas', 'Ganhar dinheiro', 'Descansar'], answer: 'Conhecer outras culturas', why: '"The best way to learn about other cultures."' },
        ],
      },
      items: [
        { id: 'b1u1l10-1', type: 'story', why: 'A Emma escreve no blog sobre as viagens dela. Leia com calma e ouça cada frase.' },
        { id: 'b1u1l10-2', type: 'quiz', q: 'Qual foi a aventura favorita dela até agora?', options: ['O Peru', 'O Japão', 'A Bahia'], answer: 'O Peru', why: '"Peru has been my favorite adventure so far."' },
        { id: 'b1u1l10-3', type: 'quiz', q: 'Por que ela usa "last week" com "watched"?', options: ['Porque diz quando aconteceu', 'Porque é uma experiência sem data', 'Porque é futuro'], answer: 'Porque diz quando aconteceu', why: 'Com tempo definido (last week), usa-se o passado simples, não o present perfect.' },
        { id: 'b1u1l10-4', type: 'quiz', q: 'A que horas ela viu o nascer do sol?', options: ['Às cinco da manhã', 'Ao meio-dia', 'Às cinco da tarde'], answer: 'Às cinco da manhã', why: '"At five in the morning."' },
      ],
    } },
  ],
});
