// Etapa 1 do B1 completo: 3 lições novas na unidade 8 (Na minha opinião — relativas e opinião).
// Uso: node scripts/content-add/b1-u8.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-08.json', {
  words: [
    ['argue', 'discutir, argumentar'],
    ['argument', 'discussão, argumento'],
    ['point of view', 'ponto de vista'],
    ['unfair', 'injusto(a)'],
    ['convince', 'convencer'],
    ['fact', 'fato'],
    ['totally', 'totalmente'],
    ['absolutely', 'com certeza, absolutamente'],
    ['depend', 'depender'],
    ['suppose', 'supor, achar'],
    ['reasonable', 'razoável, sensato(a)'],
    ['ridiculous', 'ridículo(a), absurdo(a)'],
  ],
  lessons: [
    { after: 'b1-u8-l3', lesson: {
      id: 'b1-u8-l8', title: 'Concordar e discordar', items: [
        { id: 'b1u8l8-1', type: 'match', pairs: [['unfair', 'injusto'], ['reasonable', 'razoável'], ['ridiculous', 'ridículo'], ['fact', 'fato']], why: '"Argument" é discussão (briga) ou argumento. "Discussion" é uma conversa mais calma.' },
        { id: 'b1u8l8-2', type: 'choice', prompt: 'Complete:', en: 'I ___ agree with you. It was unfair.', pt: 'Concordo totalmente com você. Foi injusto.', options: ['totally', 'total', 'very'], answer: 'totally', why: '"Totally agree" = concordar totalmente.', wrong: { total: '"Total" é adjetivo; antes do verbo, use "totally".', very: '"Very agree" não existe.' } },
        { id: 'b1u8l8-3', type: 'choice', prompt: 'Complete:', en: 'Is it expensive? — It ___ on where you buy it.', pt: 'É caro? — Depende de onde você compra.', options: ['depends', 'depend', 'is depend'], answer: 'depends', why: '"It depends on" = depende de. "On", não "of".', wrong: { depend: 'Com "it", o verbo leva -s.', 'is depend': 'Não existe.' } },
        { id: 'b1u8l8-4', type: 'meaning', en: "From my point of view, that idea is ridiculous.", options: ['Do meu ponto de vista, essa ideia é absurda.', 'Eu vejo essa ideia de longe.', 'Essa ideia é ótima, na minha opinião.'], answer: 'Do meu ponto de vista, essa ideia é absurda.', why: '"Point of view" = ponto de vista. "Ridiculous" = ridículo, absurdo.' },
        { id: 'b1u8l8-5', type: 'build', pt: 'Ela tentou me convencer, mas eu não mudei de ideia.', answer: "She tried to convince me but I didn't change my mind", extra: ['convinced', 'mine'], display: "She tried to convince me, but I didn't change my mind.", why: '"Change my mind" = mudar de ideia.' },
        { id: 'b1u8l8-6', type: 'choice', prompt: 'Complete:', en: "I ___ you're right, but I'm not sure.", pt: 'Acho que você tem razão, mas não tenho certeza.', options: ['suppose', 'agree', 'convince'], answer: 'suppose', why: '"I suppose" = acho que, suponho (sem muita certeza).', wrong: { agree: '"I agree" é concordar com certeza; não combina com "not sure".', convince: '"Convince" = convencer.' } },
        { id: 'b1u8l8-7', type: 'dialogue', lines: [['A', 'I think everyone should work from home.'], ['B', '___']], options: ["I see your point, but I don't agree. It depends on the job.", "I see your point, but I'm not agree.", 'I am agree. It depends of the job.'], answer: "I see your point, but I don't agree. It depends on the job.", pt: 'Entendo seu ponto, mas não concordo. Depende do trabalho.', why: 'Discordar com educação: "I see your point, but...". E "I don\'t agree" (nunca "I\'m not agree").', wrong: { "I see your point, but I'm not agree.": '"Agree" é verbo: I don\'t agree.', 'I am agree. It depends of the job.': '"I agree" sem "am", e "depends on".' } },
      ],
    } },
    { after: 'b1-u8-l4', lesson: {
      id: 'b1-u8-l9', title: 'Ouvindo', items: [
        { id: 'b1u8l9-1', type: 'listen', en: "That's a fair point.", options: ['Esse é um bom argumento.', 'Isso não é justo.', 'Esse ponto é longe.'], answer: 'Esse é um bom argumento.', why: '"A fair point" = um argumento válido, justo.' },
        { id: 'b1u8l9-2', type: 'dictation', en: 'I absolutely agree with you.', why: '"Absolutely" soa como "ab-so-LÚUT-li".' },
        { id: 'b1u8l9-3', type: 'listen', en: "We had an argument about money.", options: ['A gente discutiu por causa de dinheiro.', 'A gente concordou sobre o dinheiro.', 'A gente ganhou dinheiro.'], answer: 'A gente discutiu por causa de dinheiro.', why: '"Have an argument" = discutir, brigar.' },
        { id: 'b1u8l9-4', type: 'dictation', en: 'It depends on the price.', why: '"Depends on" = depende de.' },
        { id: 'b1u8l9-5', type: 'listen', en: "That's not a fact. It's just your opinion.", options: ['Isso não é um fato. É só a sua opinião.', 'Isso é um fato e uma opinião.', 'Você tem razão, é um fato.'], answer: 'Isso não é um fato. É só a sua opinião.', why: '"Fact" = fato. "Opinion" = opinião.' },
        { id: 'b1u8l9-6', type: 'dictation', en: 'The price is very reasonable.', why: '"Reasonable" = razoável, justo.' },
        { id: 'b1u8l9-7', type: 'speak', en: "I see your point, but I don't agree.", pt: 'Entendo seu ponto, mas não concordo.', why: 'Jeito educado de discordar.' },
      ],
    } },
    { after: 'b1-u8-l5', lesson: {
      id: 'b1-u8-l10', title: 'Lendo: o debate na escola',
      story: {
        title: 'O debate na escola',
        lines: [
          { who: 'Ben', en: 'Today the topic is: should phones be allowed in schools?', pt: 'Hoje o tema é: os celulares deveriam ser permitidos nas escolas?' },
          { who: 'Nina', en: 'In my opinion, students who use phones in class learn less. It is a fact.', pt: 'Na minha opinião, alunos que usam celular na aula aprendem menos. É um fato.' },
          { ask: 'O que a Nina acha?', options: ['Celular na aula atrapalha', 'Celular ajuda a aprender', 'Tanto faz'], answer: 'Celular na aula atrapalha', why: '"Students who use phones in class learn less."' },
          { who: 'Leo', en: "I see your point, but I don't totally ___. Phones can help us find information.", pt: 'Entendo seu ponto, mas não concordo totalmente. O celular pode ajudar a achar informação.', gap: { answer: 'agree', options: ['agree', 'argue', 'depend'] } },
          { who: 'Nina', en: 'I suppose that is true. Maybe it depends on how we use them.', pt: 'Acho que isso é verdade. Talvez dependa de como a gente usa.' },
          { who: 'Ben', en: 'That sounds reasonable. So, phones are allowed, but only for class work!', pt: 'Isso parece razoável. Então, celular é permitido, mas só para atividades da aula!' },
          { ask: 'Qual foi a conclusão?', options: ['Celular só para atividades da aula', 'Celular proibido', 'Celular liberado sempre'], answer: 'Celular só para atividades da aula', why: '"Phones are allowed, but only for class work!"' },
        ],
      },
      items: [
        { id: 'b1u8l10-1', type: 'story', why: 'Dois alunos debatem se o celular deve ser permitido na escola. Repare como eles concordam e discordam com educação.' },
        { id: 'b1u8l10-2', type: 'quiz', q: 'Qual argumento o Leo usa?', options: ['O celular ajuda a achar informação', 'O celular é caro', 'Todo mundo tem celular'], answer: 'O celular ajuda a achar informação', why: '"Phones can help us find information."' },
        { id: 'b1u8l10-3', type: 'quiz', q: 'A Nina muda de ideia?', options: ['Um pouco: "depende de como usamos"', 'Não, de jeito nenhum', 'Sim, totalmente'], answer: 'Um pouco: "depende de como usamos"', why: '"Maybe it depends on how we use them."' },
        { id: 'b1u8l10-4', type: 'quiz', q: 'Na frase "students who use phones", o que "who" faz?', options: ['Diz quais alunos', 'Faz uma pergunta', 'Mostra o dono'], answer: 'Diz quais alunos', why: '"Who" aqui liga a frase e especifica: os alunos QUE usam celular.' },
      ],
    } },
  ],
});
