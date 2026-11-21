// Etapa 2 do B2 completo: unidade nova 9 — Até lá, já terei… (future continuous e future perfect).
// Gera src/content/b2/unit-09.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u9.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u9-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u9l${n}-${k}`, ...o });

writeUnit('b2/unit-09.json', {
  id: 'b2-u9', level: 'B2', order: 9,
  title: 'Até lá, já terei…',
  subtitle: 'Future continuous e future perfect: o que vai estar acontecendo e o que já vai ter acontecido.',
  can_do: {
    text: 'Consigo falar de planos e metas com precisão: o que vou estar fazendo num momento do futuro e o que já terei feito até lá.',
    source: 'CEFR (Conselho da Europa) — Produção oral: falar de planos, metas e previsões com detalhe, nível B2',
  },
  core_inventory: ['Grammar: future continuous (will be + -ing)', 'Grammar: future perfect (will have + past participle)', 'Grammar: by + time expression / by then', 'Functions: talking about goals and long-term plans'],
  words: [
    ['will be doing', 'vou estar fazendo'],
    ['will have done', 'vou ter feito, terei feito'],
    ['by then', 'até lá'],
    ['this time next year', 'nesta época do ano que vem'],
    ['deadline', 'prazo final'],
    ['target', 'meta'],
    ['settle', 'se estabelecer, se fixar'],
    ['promotion', 'promoção (no trabalho)'],
    ['achieve', 'alcançar, conquistar'],
    ['complete', 'completar, concluir'],
    ['savings', 'economias, poupança'],
    ['retire', 'se aposentar'],
  ],
  guide: {
    title: 'Olhando para o futuro com precisão',
    intro: 'O "will" simples diz o que vai acontecer. O B2 pede mais detalhe: o que vai estar EM ANDAMENTO num momento do futuro (will be + -ing) e o que já vai estar PRONTO até um momento (will have + particípio).',
    points: [
      { en: 'This time tomorrow, I will be flying to Lisbon.', pt: 'Amanhã a esta hora, vou estar voando para Lisboa.', note: 'Future continuous: ação em andamento num momento do futuro.' },
      { en: "Don't call at eight. I'll be having dinner.", pt: 'Não ligue às oito. Vou estar jantando.', note: 'Bom para avisar que você vai estar ocupado.' },
      { en: 'By Friday, I will have finished the report.', pt: 'Até sexta, vou ter terminado o relatório.', note: 'Future perfect: algo pronto ANTES de um momento do futuro. "By" = até.' },
      { en: 'By 2030, she will have saved enough money.', pt: 'Até 2030, ela vai ter economizado dinheiro suficiente.', note: 'Will have + particípio (save → saved).' },
      { en: "By then, we'll have been married for ten years.", pt: 'Até lá, vamos estar casados há dez anos.', note: '"By then" = até lá.' },
      { en: 'Will you be using the car tonight?', pt: 'Você vai usar o carro hoje à noite?', note: 'Pergunta educada sobre os planos de alguém.' },
    ],
    tips: ['"By" com tempo = até (no máximo): by Friday, by 2030. "Until" = até (durante todo o tempo).', 'O future perfect quase sempre vem com "by": by the end of the year, by the time you arrive.'],
  },
  extra_vocab: [{ word: 'savings', reason: 'economias (palavra de planos financeiros, B2)' }],
  lessons: [
    L(1, 'Vou estar fazendo', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'This time tomorrow, I ___ on the beach.', pt: 'Amanhã a esta hora, vou estar relaxando na praia.', options: ['will be relaxing', 'will relax', 'am relaxing'], answer: 'will be relaxing', why: 'Ação em andamento num momento do futuro: will be + -ing.', wrong: { 'will relax': '"Will relax" é uma ação simples, não em andamento.', 'am relaxing': 'Presente contínuo seria agora (ou um plano marcado).' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "Don't call me at nine. I'll be ___ a meeting.", pt: 'Não me ligue às nove. Vou estar numa reunião.', options: ['having', 'have', 'had'], answer: 'having', why: 'Will be + -ing: having.', wrong: { have: 'Depois de "will be", -ing.', had: 'Precisa do -ing.' } }),
      I(1, 3, { type: 'meaning', en: "I'll be working late tonight, so don't wait for me.", options: ['Vou estar trabalhando até tarde hoje, então não me espere.', 'Trabalhei até tarde ontem.', 'Não vou trabalhar hoje.'], answer: 'Vou estar trabalhando até tarde hoje, então não me espere.', why: '"Will be working" = vou estar trabalhando.' }),
      I(1, 4, { type: 'build', pt: 'Nesta época do ano que vem, vou estar morando em Londres.', answer: "This time next year I'll be living in London", extra: ['live', 'am'], display: "This time next year, I'll be living in London.", why: '"This time next year" + will be + -ing.' }),
      I(1, 5, { type: 'listen', en: 'Will you be using your car on Saturday?', options: ['Você vai usar seu carro no sábado?', 'Você usou o carro no sábado?', 'Seu carro está quebrado?'], answer: 'Você vai usar seu carro no sábado?', why: 'Pergunta educada sobre os planos de alguém (às vezes para pedir algo emprestado).' }),
      I(1, 6, { type: 'match', pairs: [['by then', 'até lá'], ['deadline', 'prazo final'], ['target', 'meta'], ['savings', 'economias']], why: '"Meet a deadline" = cumprir um prazo.' }),
    ]),
    L(2, 'Até lá, já terei feito', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'By Friday, I ___ the project.', pt: 'Até sexta, vou ter terminado o projeto.', options: ['will have finished', 'will finish', 'will be finishing'], answer: 'will have finished', why: 'Pronto ANTES de um momento do futuro: will have + particípio.', wrong: { 'will finish': '"Will finish" não destaca que vai estar pronto antes de sexta.', 'will be finishing': 'Seria "vou estar terminando" (em andamento).' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'By the time you arrive, we ___ dinner.', pt: 'Quando você chegar, já vamos ter jantado.', options: ['will have eaten', 'will eat', 'eat'], answer: 'will have eaten', why: 'Antes da sua chegada: will have eaten.', wrong: { 'will eat': 'Não mostra que já terá acontecido.', eat: 'É presente.' } }),
      I(2, 3, { type: 'meaning', en: "By 2030, she will have saved enough to buy a house.", options: ['Até 2030, ela vai ter economizado o bastante para comprar uma casa.', 'Ela comprou uma casa em 2030.', 'Ela vai começar a economizar em 2030.'], answer: 'Até 2030, ela vai ter economizado o bastante para comprar uma casa.', why: '"By 2030" = até 2030. "Will have saved" = vai ter economizado.' }),
      I(2, 4, { type: 'build', pt: 'Até o fim do ano, vou ter lido vinte livros.', answer: 'By the end of the year I will have read twenty books', extra: ['until', 'reading'], display: 'By the end of the year, I will have read twenty books.', why: '"By the end of" = até o fim de.' }),
      I(2, 5, { type: 'listen', en: "Don't worry. I'll have finished before the deadline.", options: ['Não se preocupe. Vou ter terminado antes do prazo.', 'Não vou conseguir terminar.', 'O prazo já passou.'], answer: 'Não se preocupe. Vou ter terminado antes do prazo.', why: '"I\'ll have finished" = vou ter terminado.' }),
      I(2, 6, { type: 'speak', en: "By then, I'll have finished my degree.", pt: 'Até lá, vou ter terminado a faculdade.', why: '"I\'ll have" soa como "áil-av".' }),
    ]),
    L(3, 'Contínuo ou perfeito?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'At 10 p.m., I ___ TV. Call me after that.', pt: 'Às 22h vou estar vendo TV. Me ligue depois disso.', options: ['will be watching', 'will have watched', 'watch'], answer: 'will be watching', why: 'Em andamento às 22h: will be watching.', wrong: { 'will have watched': 'Diria que já terminou às 22h.', watch: 'Presente simples não serve aqui.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'By 10 p.m., the film ___.', pt: 'Até as 22h, o filme vai ter acabado.', options: ['will have ended', 'will be ending', 'ends'], answer: 'will have ended', why: 'Terminado antes das 22h: will have ended.', wrong: { 'will be ending': 'Seria "vai estar acabando".', ends: 'Não mostra o "até".' } }),
      I(3, 3, { type: 'match', pairs: [['will be working', 'vou estar trabalhando'], ['will have worked', 'vou ter trabalhado'], ['achieve', 'alcançar'], ['settle', 'se fixar']], why: 'Contínuo = no meio da ação. Perfeito = ação já completa.' }),
      I(3, 4, { type: 'meaning', en: "Next June, we'll have been together for five years.", options: ['Em junho que vem, vamos estar juntos há cinco anos.', 'Ficamos juntos cinco anos e terminamos.', 'Vamos nos conhecer em junho.'], answer: 'Em junho que vem, vamos estar juntos há cinco anos.', why: 'Future perfect com tempo de duração.' }),
      I(3, 5, { type: 'build', pt: 'Até lá, ele vai ter conseguido uma promoção.', answer: 'By then he will have got a promotion', extra: ['until', 'getting'], display: 'By then, he will have got a promotion.', why: 'Will have + particípio (get → got).' }),
      I(3, 6, { type: 'listen', en: "This time next week, we'll be relaxing on a beach in Bahia.", options: ['Semana que vem a esta hora, vamos estar numa praia na Bahia.', 'Fomos à praia semana passada.', 'Vamos para a Bahia daqui a um mês.'], answer: 'Semana que vem a esta hora, vamos estar numa praia na Bahia.', why: '"This time next week" = semana que vem a esta hora.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', "Can we meet at six tomorrow?"], ['B', '___']], options: ["Sorry, I'll be driving home then. How about seven?", "Sorry, I'll have driven home then.", 'Sorry, I drive home then.'], answer: "Sorry, I'll be driving home then. How about seven?", pt: 'Desculpa, vou estar dirigindo para casa nessa hora. Que tal às sete?', why: 'Avisar que vai estar ocupado: will be + -ing.', wrong: { "Sorry, I'll have driven home then.": 'Diria que já terá chegado, então estaria livre.', 'Sorry, I drive home then.': 'Soa como rotina, não como aviso.' } }),
    ]),
    L(4, 'Prática: metas', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "If I keep saving, I'll have ___ my target by December.", pt: 'Se eu continuar economizando, vou ter alcançado minha meta até dezembro.', options: ['reached', 'reach', 'reaching'], answer: 'reached', why: 'Will have + particípio.', wrong: { reach: 'Precisa do particípio.', reaching: 'Sem -ing aqui.' } }),
      I(4, 2, { type: 'meaning', en: "By the time I retire, I'll have worked here for forty years.", options: ['Quando eu me aposentar, vou ter trabalhado aqui por quarenta anos.', 'Me aposentei depois de quarenta anos.', 'Vou começar aqui com quarenta anos.'], answer: 'Quando eu me aposentar, vou ter trabalhado aqui por quarenta anos.', why: '"By the time" + presente (retire), e a outra parte no future perfect.' }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'By the time you ___, the party will have started.', pt: 'Quando você chegar, a festa já vai ter começado.', options: ['arrive', 'will arrive', 'arrived'], answer: 'arrive', why: 'Depois de "by the time" (futuro), use o presente: arrive.', wrong: { 'will arrive': 'Depois de "by the time" não vai "will".', arrived: 'É futuro, não passado.' } }),
      I(4, 4, { type: 'build', pt: 'Nesta hora amanhã, vou estar fazendo a prova.', answer: "This time tomorrow I'll be taking the exam", extra: ['take', 'taken'], display: "This time tomorrow, I'll be taking the exam.", why: '"Take an exam" = fazer uma prova. Will be + -ing.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', "Where do you see yourself in five years?"], ['B', '___']], options: ["I'll have completed my master's, and I'll be working abroad.", "I complete my master's and I work abroad.", "I'll completed my master's."], answer: "I'll have completed my master's, and I'll be working abroad.", pt: 'Vou ter concluído o mestrado e vou estar trabalhando no exterior.', why: 'Perfeito para o que estará pronto; contínuo para o que estará em andamento.', wrong: { "I complete my master's and I work abroad.": 'Presente não fala do futuro aqui.', "I'll completed my master's.": 'Falta o "have".' } }),
      I(4, 6, { type: 'listen', en: "Will you have finished by six?", options: ['Você vai ter terminado até as seis?', 'Você termina às seis?', 'Você terminou às seis?'], answer: 'Você vai ter terminado até as seis?', why: 'Pergunta no future perfect: Will you have + particípio?' }),
      I(4, 7, { type: 'match', pairs: [['complete', 'concluir'], ['retire', 'se aposentar'], ['promotion', 'promoção'], ['this time next year', 'nesta época do ano que vem']], why: '"Get a promotion" = ser promovido.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Até sexta, vou ter terminado.', answer: "By Friday, I'll have finished.", accept: ['By Friday, I will have finished.'], why: 'Will have + particípio.' }),
      I(5, 2, { type: 'type', pt: 'Amanhã a esta hora, vou estar viajando.', answer: "This time tomorrow, I'll be travelling.", accept: ['This time tomorrow, I will be travelling.', "This time tomorrow, I'll be traveling.", 'This time tomorrow, I will be traveling.'], why: 'Will be + -ing.' }),
      I(5, 3, { type: 'dictation', en: 'By then, we will have moved.', why: '"By then" = até lá.' }),
      I(5, 4, { type: 'type', pt: 'Você vai estar em casa hoje à noite?', answer: 'Will you be at home tonight?', why: 'Pergunta no future continuous com "be".' }),
      I(5, 5, { type: 'dictation', en: 'I will be working all weekend.', why: '"All weekend" = o fim de semana todo.' }),
      I(5, 6, { type: 'type', pt: 'Até lá, ela vai ter se aposentado.', answer: "By then, she'll have retired.", accept: ['By then, she will have retired.'], why: 'Will have + retired.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "By the end of the course, you'll have learned a lot.", options: ['No fim do curso, você vai ter aprendido muito.', 'Você aprendeu pouco no curso.', 'O curso vai começar no fim do mês.'], answer: 'No fim do curso, você vai ter aprendido muito.', why: '"By the end of" = até o fim de.' }),
      I(6, 2, { type: 'dictation', en: 'I will be waiting for you at the station.', why: '"Will be waiting" = vou estar esperando.' }),
      I(6, 3, { type: 'listen', en: "We'll have been married for twenty years next month.", options: ['Mês que vem vamos fazer vinte anos de casados.', 'Vamos nos casar mês que vem.', 'Fomos casados por vinte anos.'], answer: 'Mês que vem vamos fazer vinte anos de casados.', why: 'Future perfect para completar um tempo.' }),
      I(6, 4, { type: 'dictation', en: 'Will you be coming to the party?', why: 'Pergunta educada sobre planos.' }),
      I(6, 5, { type: 'listen', en: "She'll be living in Canada by then.", options: ['Até lá ela vai estar morando no Canadá.', 'Ela morou no Canadá.', 'Ela vai visitar o Canadá.'], answer: 'Até lá ela vai estar morando no Canadá.', why: '"Will be living" = vai estar morando.' }),
      I(6, 6, { type: 'dictation', en: 'They will have achieved their target.', why: '"Achieve a target" = alcançar uma meta.' }),
      I(6, 7, { type: 'speak', en: "I'll be thinking of you.", pt: 'Vou estar pensando em você.', why: 'Frase carinhosa para quem vai fazer uma prova ou viajar.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "Can I borrow your laptop tomorrow afternoon?"], ['B', '___']], options: ["Sorry, I'll be using it for work. But I'll have finished by six.", "Sorry, I use it. I finish six.", "Sorry, I'll have using it."], answer: "Sorry, I'll be using it for work. But I'll have finished by six.", pt: 'Desculpa, vou estar usando para o trabalho. Mas vou ter terminado até as seis.', why: 'Contínuo para "ocupado", perfeito para "pronto até".', wrong: { "Sorry, I use it. I finish six.": 'Faltam os tempos e o "by".', "Sorry, I'll have using it.": 'Mistura errada: will be using.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'When will the new office be ready?'], ['B', '___']], options: ["They say they'll have finished by March.", "They say they finish by March.", "They say they'll finishing by March."], answer: "They say they'll have finished by March.", pt: 'Dizem que vão ter terminado até março.', why: 'Will have + particípio + by.', wrong: { 'They say they finish by March.': 'Falta o future perfect.', "They say they'll finishing by March.": 'Mistura errada de tempos.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Good luck with your exam tomorrow!'], ['B', '___']], options: ["Thanks! This time tomorrow, it'll all be over.", 'Thanks! This time tomorrow, it all over.', 'Thanks! Tomorrow it overs.'], answer: "Thanks! This time tomorrow, it'll all be over.", pt: 'Valeu! Amanhã a esta hora, já vai ter acabado tudo.', why: '"Be over" = ter acabado.', wrong: { 'Thanks! This time tomorrow, it all over.': 'Faltou "will be".', 'Thanks! Tomorrow it overs.': 'Não existe.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'What are your plans for retirement?'], ['B', '___']], options: ["By the time I retire, I'll have saved enough to travel.", 'When I will retire, I save to travel.', "By the time I'll retire, I saved."], answer: "By the time I retire, I'll have saved enough to travel.", pt: 'Quando eu me aposentar, vou ter economizado o bastante para viajar.', why: '"By the time" + presente; outra parte no future perfect.', wrong: { 'When I will retire, I save to travel.': 'Depois de "when", presente (retire).', "By the time I'll retire, I saved.": 'Tempos trocados.' } }),
      I(7, 5, { type: 'speak', en: "I'll be working from home tomorrow.", pt: 'Amanhã vou estar trabalhando de casa.', why: '"Work from home" = trabalhar de casa.' }),
      I(7, 6, { type: 'speak', en: "By then, I'll have learned a lot.", pt: 'Até lá, vou ter aprendido muito.', why: '"Learned" soa como "LÂRND".' }),
    ]),
    L(8, 'Lendo: carta para o futuro', [
      I(8, 1, { type: 'story', why: 'A Emma escreve uma carta para ela mesma ler daqui a dez anos. Repare nos tempos do futuro.' }),
      I(8, 2, { type: 'quiz', q: 'Onde a Emma acha que vai estar morando?', options: ['Perto do mar', 'Na capital', 'No exterior, num apartamento'], answer: 'Perto do mar', why: '"You\'ll be living in a house near the sea."' }),
      I(8, 3, { type: 'quiz', q: 'O que ela espera ter terminado?', options: ['O livro que começou a escrever', 'A faculdade', 'A reforma da casa'], answer: 'O livro que começou a escrever', why: '"You\'ll have finished the book you started."' }),
      I(8, 4, { type: 'quiz', q: 'Qual é o último pedido da carta?', options: ['Não esquecer de se divertir', 'Trabalhar mais', 'Economizar tudo'], answer: 'Não esquecer de se divertir', why: '"Don\'t forget to have fun."' }),
    ], {
      title: 'Carta para daqui a dez anos',
      lines: [
        { who: 'Emma', en: 'Dear Emma, when you read this, ten years will have passed.', pt: 'Querida Emma, quando você ler isto, dez anos vão ter se passado.' },
        { who: 'Emma', en: "I hope you'll be living in a house near the sea, like you always wanted.", pt: 'Espero que você esteja morando numa casa perto do mar, como sempre quis.' },
        { ask: 'Daqui a quantos anos a carta vai ser lida?', options: ['Dez', 'Cinco', 'Vinte'], answer: 'Dez', why: '"Ten years will have passed."' },
        { who: 'Emma', en: "By then, you'll ___ finished the book you started last summer.", pt: 'Até lá, você vai ter terminado o livro que começou no verão passado.', gap: { answer: 'have', options: ['have', 'be', 'had'] } },
        { who: 'Emma', en: "Maybe you'll be working for yourself, and you'll have achieved your biggest target: freedom.", pt: 'Talvez você esteja trabalhando por conta própria e tenha alcançado sua maior meta: liberdade.' },
        { who: 'Emma', en: "Whatever happens, don't forget to have fun. Love, Emma (25 years old).", pt: 'Aconteça o que acontecer, não esqueça de se divertir. Com carinho, Emma (25 anos).' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'By next year, they ___ the new hospital.', pt: 'Até o ano que vem, eles vão ter construído o hospital novo.', options: ['will have built', 'will be building', 'build'], answer: 'will have built', why: 'Pronto até um momento: will have + particípio.', wrong: { 'will be building': 'Seria "vão estar construindo".', build: 'Presente não serve.' } }),
      I(9, 2, { type: 'type', pt: 'Às oito vou estar jantando.', answer: "At eight, I'll be having dinner.", accept: ['At eight, I will be having dinner.', "I'll be having dinner at eight.", 'I will be having dinner at eight.'], why: 'Will be + -ing.' }),
      I(9, 3, { type: 'meaning', en: "Will you have finished the report by Monday?", options: ['Você vai ter terminado o relatório até segunda?', 'Você terminou o relatório na segunda?', 'Você começa o relatório na segunda?'], answer: 'Você vai ter terminado o relatório até segunda?', why: 'Future perfect em pergunta.' }),
      I(9, 4, { type: 'dictation', en: 'This time next year, I will be living abroad.', why: '"This time next year" = nesta época do ano que vem.' }),
      I(9, 5, { type: 'listen', en: "By the time we get there, the shop will have closed.", options: ['Quando a gente chegar lá, a loja já vai ter fechado.', 'A loja abre quando a gente chegar.', 'A loja fechou ontem.'], answer: 'Quando a gente chegar lá, a loja já vai ter fechado.', why: '"By the time" + presente (get).' }),
      I(9, 6, { type: 'build', pt: 'Vou estar te esperando no aeroporto.', answer: "I'll be waiting for you at the airport", extra: ['wait', 'have'], display: "I'll be waiting for you at the airport.", why: 'Will be + waiting.' }),
    ]),
    L(10, 'História: o plano de dez anos', [
      I(10, 1, { type: 'story', why: 'O Leo e a Clara conversam sobre o futuro antes de se casar. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Até quando a Clara vai ter terminado o mestrado?', options: ['Até o fim do ano que vem', 'Em dez anos', 'Até o casamento'], answer: 'Até o fim do ano que vem', why: '"By the end of next year, I\'ll have finished my master\'s."' }),
      I(10, 3, { type: 'quiz', q: 'O que o Leo quer estar fazendo daqui a cinco anos?', options: ['Trabalhando na própria empresa', 'Morando fora', 'Aposentado'], answer: 'Trabalhando na própria empresa', why: '"I\'ll be running my own company."' }),
      I(10, 4, { type: 'quiz', q: 'O que eles combinam no fim?', options: ['Abrir uma poupança juntos', 'Adiar o casamento', 'Se mudar já'], answer: 'Abrir uma poupança juntos', why: '"Let\'s open a savings account together."' }),
    ], {
      title: 'O plano de dez anos',
      lines: [
        { who: 'Clara', en: "Leo, where do you think we'll be in ten years?", pt: 'Leo, onde você acha que a gente vai estar daqui a dez anos?' },
        { who: 'Leo', en: "Well, in five years, I'll be running my own company.", pt: 'Bom, daqui a cinco anos, vou estar tocando minha própria empresa.' },
        { who: 'Clara', en: "And by the end of next year, I'll have ___ my master's.", pt: 'E até o fim do ano que vem, vou ter terminado meu mestrado.', gap: { answer: 'finished', options: ['finished', 'finishing', 'finish'] } },
        { ask: 'O que a Clara está estudando?', options: ['Mestrado', 'Inglês', 'Direito, na faculdade'], answer: 'Mestrado', why: '"My master\'s" = meu mestrado.' },
        { who: 'Leo', en: "By then, we'll have saved enough for a house. Maybe near the beach?", pt: 'Até lá, vamos ter economizado o bastante para uma casa. Talvez perto da praia?' },
        { who: 'Clara', en: "I love that plan. Let's open a savings account together.", pt: 'Adoro esse plano. Vamos abrir uma poupança juntos.' },
        { who: 'Leo', en: "Deal! This time in ten years, we'll be having breakfast with a view of the sea.", pt: 'Fechado! Daqui a dez anos, nesta hora, vamos estar tomando café com vista para o mar.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u9', level: 'B2', unlock: 'b2-u9', title: 'Onde você vai estar em 2035?',
  intro: 'A Ana e o Tom imaginam como vai estar a vida deles daqui a dez anos.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: where will we be in ten years?", pt: 'E eu sou o Tom. Hoje: onde vamos estar daqui a dez anos?' },
    { who: 'ana', en: "I hope I'll be living by the sea and working from home.", pt: 'Espero estar morando perto do mar e trabalhando de casa.' },
    { who: 'tom', en: "By then, I'll have written my first book. That's my biggest target.", pt: 'Até lá, vou ter escrito meu primeiro livro. É a minha maior meta.' },
    { who: 'ana', en: "And this podcast? Will we still be recording it?", pt: 'E este podcast? Vamos ainda estar gravando?' },
    { who: 'tom', en: "Of course! By 2035, we'll have recorded more than a thousand episodes.", pt: 'Claro! Até 2035, vamos ter gravado mais de mil episódios.' },
    { who: 'ana', en: "And you'll have become fluent in English!", pt: 'E vocês vão ter ficado fluentes em inglês!' },
    { who: 'tom', en: "That's all for today. Bye!", pt: 'Por hoje é só. Tchau!' },
  ],
  questions: [
    { q: 'Onde a Ana espera estar morando?', options: ['Perto do mar', 'Na capital', 'No exterior'], answer: 'Perto do mar', why: '"I\'ll be living by the sea."' },
    { q: 'Qual é a maior meta do Tom?', options: ['Escrever o primeiro livro', 'Se aposentar', 'Mudar de país'], answer: 'Escrever o primeiro livro', why: '"I\'ll have written my first book."' },
    { q: 'Quantos episódios eles vão ter gravado até 2035?', options: ['Mais de mil', 'Cem', 'Cinquenta'], answer: 'Mais de mil', why: '"More than a thousand episodes."' },
  ],
}, 'pod-b2u8');
addScene('b2-u9', 'standing-21', 'calendar');
