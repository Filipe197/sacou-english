// Etapa 2 do B2 completo: unidade nova 10 — Se eu tivesse… agora seria (condicionais mistas).
// Gera src/content/b2/unit-10.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u10.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u10-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u10l${n}-${k}`, ...o });

writeUnit('b2/unit-10.json', {
  id: 'b2-u10', level: 'B2', order: 10,
  title: 'Se eu tivesse… agora seria',
  subtitle: 'Condicionais mistas: o passado mudando o presente (e o contrário).',
  can_do: {
    text: 'Consigo imaginar como minha vida seria hoje se algo do passado tivesse sido diferente, e explicar escolhas.',
    source: 'CEFR (Conselho da Europa) — Produção oral: especular sobre causas e consequências, nível B2',
  },
  core_inventory: ['Grammar: mixed conditional (if + past perfect, would + verb now)', 'Grammar: mixed conditional (if + past simple, would have + participle)', 'Review: second and third conditionals', 'Vocabulary: personality and life choices'],
  words: [
    ['if I had…, I would be…', 'se eu tivesse…, eu seria/estaria…'],
    ['fluent', 'fluente'],
    ['confident', 'confiante'],
    ['shy', 'tímido(a)'],
    ['brave', 'corajoso(a)'],
    ['ambitious', 'ambicioso(a)'],
    ['allergic', 'alérgico(a)'],
    ['otherwise', 'senão, caso contrário'],
    ['choice', 'escolha'],
    ['path', 'caminho'],
  ],
  guide: {
    title: 'Condicionais mistas',
    intro: 'Às vezes o passado e o presente se misturam: uma coisa que (não) aconteceu ANTES muda como as coisas são AGORA. É a condicional mista.',
    points: [
      { en: "If I had studied medicine, I would be a doctor now.", pt: 'Se eu tivesse estudado medicina, eu seria médico agora.', note: 'Passado (had studied) → presente (would be now).' },
      { en: "If she hadn't moved to London, she wouldn't speak English so well.", pt: 'Se ela não tivesse se mudado para Londres, não falaria inglês tão bem.', note: 'A mudança no passado explica o inglês dela hoje.' },
      { en: "If I weren't so shy, I would have spoken to her.", pt: 'Se eu não fosse tão tímido, teria falado com ela.', note: 'O contrário: presente (weren\'t shy, sempre) → passado (would have spoken).' },
      { en: "If he were more confident, he would have got the job.", pt: 'Se ele fosse mais confiante, teria conseguido o emprego.', note: 'Uma característica permanente explica algo do passado.' },
      { en: "If I'd taken that job, I'd be living in Japan now.", pt: 'Se eu tivesse aceitado aquele emprego, estaria morando no Japão agora.', note: '"I\'d" pode ser "I had" (na parte do if) ou "I would" (na outra).' },
      { en: "I'm glad I came. Otherwise, I wouldn't have met you.", pt: 'Que bom que vim. Senão, não teria te conhecido.', note: '"Otherwise" = senão.' },
    ],
    tips: ['Repare nas palavras de tempo: "now" ou "today" puxam o "would + verbo"; "yesterday" ou "last year" puxam o "would have + particípio".', 'Na fala, "I\'d" aparece nas duas partes. O que vem depois decide: "I\'d taken" (had), "I\'d be" (would).'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'O passado muda o agora', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'If I had learned Spanish as a child, I ___ fluent now.', pt: 'Se eu tivesse aprendido espanhol criança, seria fluente agora.', options: ['would be', 'would have been', 'will be'], answer: 'would be', why: 'Resultado AGORA (now): would + verbo.', wrong: { 'would have been': 'Seria um resultado no passado; a frase diz "now".', 'will be': '"Will" não entra em situação imaginária.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "If she ___ the train, she wouldn't be here now.", pt: 'Se ela tivesse perdido o trem, não estaria aqui agora.', options: ['had missed', 'missed', 'would miss'], answer: 'had missed', why: 'A condição é no passado: had + particípio.', wrong: { missed: 'Com "now" na outra parte e algo que aconteceu antes, use had missed.', 'would miss': '"Would" não entra na parte do "if".' } }),
      I(1, 3, { type: 'meaning', en: "If we hadn't bought this house, we'd be living with my parents.", options: ['Se não tivéssemos comprado esta casa, estaríamos morando com meus pais.', 'Compramos a casa dos meus pais.', 'Vamos morar com meus pais.'], answer: 'Se não tivéssemos comprado esta casa, estaríamos morando com meus pais.', why: 'Passado (hadn\'t bought) → presente (we\'d be living).' }),
      I(1, 4, { type: 'build', pt: 'Se eu tivesse estudado medicina, seria médico agora.', answer: 'If I had studied medicine I would be a doctor now', extra: ['will', 'have been'], display: 'If I had studied medicine, I would be a doctor now.', why: 'If + had + particípio, would + verbo + now.' }),
      I(1, 5, { type: 'listen', en: "If I'd taken that job, I'd be rich now.", options: ['Se eu tivesse aceitado aquele emprego, estaria rico agora.', 'Aceitei o emprego e fiquei rico.', 'Vou aceitar o emprego.'], answer: 'Se eu tivesse aceitado aquele emprego, estaria rico agora.', why: '"I\'d taken" = I had taken; "I\'d be" = I would be.' }),
      I(1, 6, { type: 'match', pairs: [['fluent', 'fluente'], ['confident', 'confiante'], ['shy', 'tímido'], ['brave', 'corajoso']], why: 'Adjetivos de personalidade aparecem muito nas condicionais mistas.' }),
    ]),
    L(2, 'O jeito de ser muda o passado', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: "If I weren't so shy, I ___ to her at the party.", pt: 'Se eu não fosse tão tímido, teria falado com ela na festa.', options: ['would have spoken', 'would speak', 'had spoken'], answer: 'would have spoken', why: 'Característica permanente (presente) → resultado no passado: would have + particípio.', wrong: { 'would speak': 'A festa já passou: would have spoken.', 'had spoken': '"Had" vai na parte do if, não na do resultado.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'If he ___ allergic to cats, he would have stayed at our house.', pt: 'Se ele não fosse alérgico a gatos, teria ficado na nossa casa.', options: ["weren't", "hadn't been", "isn't"], answer: "weren't", why: 'A alergia é permanente (presente): weren\'t.', wrong: { "hadn't been": 'A alergia não é só do passado; continua.', "isn't": 'Situação imaginária: weren\'t.' } }),
      I(2, 3, { type: 'meaning', en: "If she were more ambitious, she would have applied for the promotion.", options: ['Se ela fosse mais ambiciosa, teria se candidatado à promoção.', 'Ela é ambiciosa e foi promovida.', 'Ela vai se candidatar amanhã.'], answer: 'Se ela fosse mais ambiciosa, teria se candidatado à promoção.', why: 'Presente (were) → passado (would have applied).' }),
      I(2, 4, { type: 'build', pt: 'Se eu fosse mais corajoso, teria pulado.', answer: 'If I were braver I would have jumped', extra: ['will', 'had'], display: 'If I were braver, I would have jumped.', why: 'If + were (sempre), would have + particípio (naquela vez).' }),
      I(2, 5, { type: 'listen', en: "If you weren't so lazy, you'd have finished by now.", options: ['Se você não fosse tão preguiçoso, já teria terminado.', 'Você já terminou.', 'Você vai terminar amanhã.'], answer: 'Se você não fosse tão preguiçoso, já teria terminado.', why: '"You\'d have finished" = you would have finished.' }),
      I(2, 6, { type: 'speak', en: "If I weren't so shy, I'd have said something.", pt: 'Se eu não fosse tão tímido, teria dito alguma coisa.', why: '"I\'d have" soa como "ái-dav".' }),
    ]),
    L(3, 'Qual condicional?', [
      I(3, 1, { type: 'choice', prompt: 'Qual frase fala do PASSADO mudando o PRESENTE?', en: '___', pt: 'Escolha a condicional mista.', options: ["If I had saved money, I'd have a car now.", 'If I save money, I will buy a car.', "If I had saved money, I'd have bought a car."], answer: "If I had saved money, I'd have a car now.", why: 'Had saved (passado) + would have... now (presente).', wrong: { 'If I save money, I will buy a car.': 'É a condicional real (first conditional).', "If I had saved money, I'd have bought a car.": 'É a third conditional: passado com passado.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "I'm so glad you called. ___, I would have missed the meeting.", pt: 'Que bom que você ligou. Senão, eu teria perdido a reunião.', options: ['Otherwise', 'However', 'Unless'], answer: 'Otherwise', why: '"Otherwise" = senão, se não fosse isso.', wrong: { However: '"However" = porém.', Unless: '"Unless" = a não ser que, precisa de frase depois.' } }),
      I(3, 3, { type: 'meaning', en: "If I hadn't met you, my life would be very different.", options: ['Se eu não tivesse te conhecido, minha vida seria muito diferente.', 'Minha vida mudou antes de te conhecer.', 'Vou te conhecer e minha vida vai mudar.'], answer: 'Se eu não tivesse te conhecido, minha vida seria muito diferente.', why: 'Passado (hadn\'t met) → presente (would be).' }),
      I(3, 4, { type: 'build', pt: 'Foi a melhor escolha. Senão, eu não estaria aqui.', answer: "It was the best choice. Otherwise I wouldn't be here", extra: ['however', 'unless'], display: "It was the best choice. Otherwise, I wouldn't be here.", why: '"Otherwise" + would + verbo.' }),
      I(3, 5, { type: 'match', pairs: [['otherwise', 'senão'], ['choice', 'escolha'], ['path', 'caminho'], ['ambitious', 'ambicioso']], why: '"Choose a different path" = escolher outro caminho.' }),
      I(3, 6, { type: 'listen', en: "If he were taller, he would have played basketball.", options: ['Se ele fosse mais alto, teria jogado basquete.', 'Ele joga basquete porque é alto.', 'Ele vai jogar basquete.'], answer: 'Se ele fosse mais alto, teria jogado basquete.', why: 'Presente (were taller) → passado (would have played).' }),
      I(3, 7, { type: 'dialogue', lines: [['A', "You're lucky you speak English so well."], ['B', '___']], options: ["If I hadn't lived in Canada, I wouldn't speak it like this.", "If I didn't live in Canada, I wouldn't have spoken.", 'If I live in Canada, I speak.'], answer: "If I hadn't lived in Canada, I wouldn't speak it like this.", pt: 'Se eu não tivesse morado no Canadá, não falaria assim.', why: 'Passado (hadn\'t lived) → presente (wouldn\'t speak).', wrong: { "If I didn't live in Canada, I wouldn't have spoken.": 'Tempos invertidos.', 'If I live in Canada, I speak.': 'Não é condicional imaginária.' } }),
    ]),
    L(4, 'Prática: escolhas da vida', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "If I had chosen a different path, I ___ in an office today.", pt: 'Se eu tivesse escolhido outro caminho, estaria trabalhando num escritório hoje.', options: ['would be working', 'would have worked', 'will work'], answer: 'would be working', why: 'Resultado hoje, em andamento: would be + -ing.', wrong: { 'would have worked': 'Seria um resultado passado; a frase diz "today".', 'will work': '"Will" não entra aqui.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: "If she ___ more confident, she would have won the competition.", pt: 'Se ela fosse mais confiante, teria ganhado a competição.', options: ['were', 'had been', 'is'], answer: 'were', why: 'Confiança é característica permanente: were.', wrong: { 'had been': 'Possível em outro contexto, mas aqui fala do jeito dela (sempre).', is: 'Situação imaginária: were.' } }),
      I(4, 3, { type: 'meaning', en: "If I hadn't broken my leg, I'd be playing in the final today.", options: ['Se eu não tivesse quebrado a perna, estaria jogando a final hoje.', 'Quebrei a perna na final.', 'Vou jogar a final com a perna quebrada.'], answer: 'Se eu não tivesse quebrado a perna, estaria jogando a final hoje.', why: 'Passado → presente em andamento.' }),
      I(4, 4, { type: 'build', pt: 'Se ela não fosse alérgica, teria comido o bolo.', answer: "If she weren't allergic she would have eaten the cake", extra: ['will', 'had'], display: "If she weren't allergic, she would have eaten the cake.", why: 'Presente (weren\'t) → passado (would have eaten).' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Do you regret not going to university?'], ['B', '___']], options: ["Sometimes. If I'd gone, I'd probably have a better job now.", "Sometimes. If I went, I had a better job.", "Sometimes. If I'd go, I'd have had a job."], answer: "Sometimes. If I'd gone, I'd probably have a better job now.", pt: 'Às vezes. Se eu tivesse ido, provavelmente teria um emprego melhor agora.', why: 'Passado (I\'d gone) → presente (I\'d have ... now).', wrong: { "Sometimes. If I went, I had a better job.": 'Tempos errados.', "Sometimes. If I'd go, I'd have had a job.": '"If I\'d go" não se usa.' } }),
      I(4, 6, { type: 'listen', en: "If you were more careful, you wouldn't have lost your keys.", options: ['Se você fosse mais cuidadoso, não teria perdido as chaves.', 'Você perdeu as chaves de novo hoje.', 'Cuidado com as chaves.'], answer: 'Se você fosse mais cuidadoso, não teria perdido as chaves.', why: 'Jeito de ser (presente) → resultado passado.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: "If we'd left earlier, we ___ stuck in traffic now.", pt: 'Se tivéssemos saído mais cedo, não estaríamos presos no trânsito agora.', options: ["wouldn't be", "wouldn't have been", "won't be"], answer: "wouldn't be", why: 'Resultado agora: wouldn\'t be.', wrong: { "wouldn't have been": 'Com "now", use would + verbo.', "won't be": '"Will" não entra aqui.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Se eu tivesse estudado mais, seria fluente agora.', answer: 'If I had studied more, I would be fluent now.', accept: ["If I'd studied more, I'd be fluent now."], why: 'Passado → presente.' }),
      I(5, 2, { type: 'type', pt: 'Se eu não fosse tímido, teria falado.', answer: "If I weren't shy, I would have spoken.", accept: ["If I wasn't shy, I would have spoken.", "If I weren't shy, I'd have spoken.", "If I wasn't shy, I'd have spoken."], why: 'Presente → passado.' }),
      I(5, 3, { type: 'dictation', en: 'Otherwise, I would have missed it.', why: '"Otherwise" = senão.' }),
      I(5, 4, { type: 'type', pt: 'Foi uma escolha difícil.', answer: 'It was a difficult choice.', accept: ['It was a hard choice.'], why: '"Choice" = escolha.' }),
      I(5, 5, { type: 'dictation', en: 'She is very ambitious.', why: '"Ambitious" = ambiciosa.' }),
      I(5, 6, { type: 'type', pt: 'Se ele fosse mais corajoso, teria tentado.', answer: 'If he were braver, he would have tried.', accept: ['If he was braver, he would have tried.', "If he were braver, he'd have tried."], why: 'Were + would have tried.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "If I hadn't missed the bus, I'd be at home now.", options: ['Se eu não tivesse perdido o ônibus, estaria em casa agora.', 'Perdi o ônibus e fui a pé.', 'Estou em casa agora.'], answer: 'Se eu não tivesse perdido o ônibus, estaria em casa agora.', why: 'Passado → presente.' }),
      I(6, 2, { type: 'dictation', en: 'If I were you, I would have said no.', why: '"If I were you" = se eu fosse você.' }),
      I(6, 3, { type: 'listen', en: "She'd be the manager now if she hadn't left the company.", options: ['Ela seria a gerente agora se não tivesse saído da empresa.', 'Ela é a gerente.', 'Ela vai sair da empresa.'], answer: 'Ela seria a gerente agora se não tivesse saído da empresa.', why: 'O "if" pode vir no fim da frase.' }),
      I(6, 4, { type: 'dictation', en: 'He is too shy to dance.', why: '"Too shy to" = tímido demais para.' }),
      I(6, 5, { type: 'listen', en: "If they were more organised, they would have finished on time.", options: ['Se eles fossem mais organizados, teriam terminado a tempo.', 'Eles terminaram a tempo.', 'Eles são muito organizados.'], answer: 'Se eles fossem mais organizados, teriam terminado a tempo.', why: 'Presente → passado.' }),
      I(6, 6, { type: 'dictation', en: 'I chose a different path.', why: '"Path" = caminho.' }),
      I(6, 7, { type: 'speak', en: "If I hadn't met you, I'd be lost.", pt: 'Se eu não tivesse te conhecido, estaria perdido.', why: 'Frase carinhosa com condicional mista.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Why did you become a teacher?'], ['B', '___']], options: ["If I hadn't had an amazing teacher at school, I wouldn't be here today.", "If I didn't have a teacher, I wasn't here.", "If I had a teacher, I'm here."], answer: "If I hadn't had an amazing teacher at school, I wouldn't be here today.", pt: 'Se eu não tivesse tido uma professora incrível na escola, não estaria aqui hoje.', why: 'Passado (hadn\'t had) → hoje (wouldn\'t be).', wrong: { "If I didn't have a teacher, I wasn't here.": 'Tempos errados.', "If I had a teacher, I'm here.": 'Não é condicional mista.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', "You didn't come to the party!"], ['B', '___']], options: ["I know. If I weren't so tired, I would have come.", "I know. If I'm not tired, I come.", "I know. If I hadn't tired, I'd come."], answer: "I know. If I weren't so tired, I would have come.", pt: 'Eu sei. Se eu não estivesse tão cansado, teria ido.', why: 'Estado atual (weren\'t tired) → passado (would have come).', wrong: { "I know. If I'm not tired, I come.": 'Não é condicional imaginária.', "I know. If I hadn't tired, I'd come.": 'Estrutura errada.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Do you ever think about what could have been?'], ['B', '___']], options: ["Sometimes. If I'd stayed in Rio, I'd be married now.", "Sometimes. If I stay in Rio, I marry.", "Sometimes. If I'd stayed, I'd have be married."], answer: "Sometimes. If I'd stayed in Rio, I'd be married now.", pt: 'Às vezes. Se eu tivesse ficado no Rio, estaria casado agora.', why: 'Passado → presente.', wrong: { 'Sometimes. If I stay in Rio, I marry.': 'Não é imaginário.', "Sometimes. If I'd stayed, I'd have be married.": '"Have be" não existe.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', "I'm glad I listened to your advice."], ['B', '___']], options: ["Me too! Otherwise, you'd be in trouble now.", 'Me too! However, you are in trouble.', 'Me too! Unless trouble.'], answer: "Me too! Otherwise, you'd be in trouble now.", pt: 'Eu também! Senão, você estaria encrencado agora.', why: '"Otherwise" = senão.', wrong: { 'Me too! However, you are in trouble.': '"However" não faz sentido aqui.', 'Me too! Unless trouble.': 'Frase incompleta.' } }),
      I(7, 5, { type: 'speak', en: "If I were braver, I'd have tried.", pt: 'Se eu fosse mais corajoso, teria tentado.', why: '"Braver" = mais corajoso.' }),
      I(7, 6, { type: 'speak', en: 'Otherwise, I would be lost.', pt: 'Senão, eu estaria perdido.', why: '"Otherwise" soa como "Â-der-uaiz".' }),
    ]),
    L(8, 'Lendo: e se eu tivesse ficado?', [
      I(8, 1, { type: 'story', why: 'O Pedro imagina como seria a vida dele se não tivesse se mudado. Repare nas condicionais mistas.' }),
      I(8, 2, { type: 'quiz', q: 'Para onde o Pedro se mudou?', options: ['Para Londres', 'Para Lisboa', 'Para o Rio'], answer: 'Para Londres', why: '"I moved to London ten years ago."' }),
      I(8, 3, { type: 'quiz', q: 'O que ele seria se tivesse ficado?', options: ['Advogado, como o pai', 'Professor', 'Médico'], answer: 'Advogado, como o pai', why: '"I would be a lawyer, like my father."' }),
      I(8, 4, { type: 'quiz', q: 'Ele se arrepende?', options: ['Não', 'Sim', 'Às vezes'], answer: 'Não', why: '"I don\'t regret my choice."' }),
    ], {
      title: 'E se eu tivesse ficado?',
      lines: [
        { who: 'Pedro', en: 'I moved to London ten years ago. Sometimes I think about my other life.', pt: 'Me mudei para Londres há dez anos. Às vezes penso na minha outra vida.' },
        { who: 'Pedro', en: "If I had stayed in Brazil, I would be a lawyer now, like my father.", pt: 'Se eu tivesse ficado no Brasil, seria advogado agora, como meu pai.' },
        { ask: 'Há quanto tempo o Pedro mora em Londres?', options: ['Dez anos', 'Dois anos', 'Vinte anos'], answer: 'Dez anos', why: '"Ten years ago."' },
        { who: 'Pedro', en: "I probably wouldn't speak English so well if I ___ lived here.", pt: 'Provavelmente não falaria inglês tão bem se não tivesse morado aqui.', gap: { answer: "hadn't", options: ["hadn't", "didn't", "wouldn't"] } },
        { who: 'Pedro', en: "And if I weren't so stubborn, I would have gone back after the first winter!", pt: 'E se eu não fosse tão teimoso, teria voltado depois do primeiro inverno!' },
        { who: 'Pedro', en: "But I don't regret my choice. Otherwise, I wouldn't have met my wife.", pt: 'Mas não me arrependo da minha escolha. Senão, não teria conhecido minha esposa.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: "If I had saved more, I ___ worried about money now.", pt: 'Se eu tivesse economizado mais, não estaria preocupado com dinheiro agora.', options: ["wouldn't be", "wouldn't have been", "won't be"], answer: "wouldn't be", why: 'Resultado agora: wouldn\'t be.', wrong: { "wouldn't have been": 'Com "now", would + verbo.', "won't be": 'Não é real.' } }),
      I(9, 2, { type: 'type', pt: 'Se ela fosse mais confiante, teria falado.', answer: 'If she were more confident, she would have spoken.', accept: ['If she was more confident, she would have spoken.', "If she were more confident, she'd have spoken."], why: 'Presente → passado.' }),
      I(9, 3, { type: 'meaning', en: "If he hadn't eaten so much, he wouldn't feel sick now.", options: ['Se ele não tivesse comido tanto, não estaria passando mal agora.', 'Ele comeu pouco e está bem.', 'Ele vai comer muito.'], answer: 'Se ele não tivesse comido tanto, não estaria passando mal agora.', why: 'Passado → presente.' }),
      I(9, 4, { type: 'dictation', en: 'If I were you, I would have taken it.', why: '"Taken" = aceitado, pegado.' }),
      I(9, 5, { type: 'listen', en: "We'd be in Paris now if the flight hadn't been cancelled.", options: ['Estaríamos em Paris agora se o voo não tivesse sido cancelado.', 'Estamos em Paris agora.', 'Vamos para Paris amanhã.'], answer: 'Estaríamos em Paris agora se o voo não tivesse sido cancelado.', why: 'O "if" no fim, com passado (hadn\'t been cancelled).' }),
      I(9, 6, { type: 'build', pt: 'Se eu fosse mais organizado, não teria esquecido.', answer: "If I were more organised I wouldn't have forgotten", extra: ['will', 'had'], display: "If I were more organised, I wouldn't have forgotten.", why: 'Presente (were) → passado (wouldn\'t have forgotten).' }),
    ]),
    L(10, 'História: o encontro no aeroporto', [
      I(10, 1, { type: 'story', why: 'Duas pessoas se conhecem num voo atrasado e pensam no acaso. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde a Sofia estaria agora se o voo não tivesse atrasado?', options: ['Em Paris', 'Em casa', 'No escritório'], answer: 'Em Paris', why: '"I\'d be in Paris now."' }),
      I(10, 3, { type: 'quiz', q: 'Por que o Mike quase não falou com ela?', options: ['Ele é tímido', 'Ele estava dormindo', 'Ele não fala inglês'], answer: 'Ele é tímido', why: '"If I weren\'t so shy, I\'d have said hello an hour ago."' }),
      I(10, 4, { type: 'quiz', q: 'O que eles decidem fazer?', options: ['Tomar um café enquanto esperam', 'Pegar outro voo', 'Voltar para casa'], answer: 'Tomar um café enquanto esperam', why: '"Let\'s have a coffee while we wait."' }),
    ], {
      title: 'O encontro no aeroporto',
      lines: [
        { who: 'Sofia', en: "This delay is terrible. If the flight hadn't been delayed, I'd be in Paris now.", pt: 'Este atraso é terrível. Se o voo não tivesse atrasado, eu estaria em Paris agora.' },
        { who: 'Mike', en: "I know. I've been here for three hours. If I weren't so shy, I'd have said hello an hour ago.", pt: 'Eu sei. Estou aqui há três horas. Se eu não fosse tão tímido, teria dito oi há uma hora.' },
        { who: 'Sofia', en: "Ha! Well, you said it now. I'm Sofia. If I ___ been so bored, I wouldn't be talking to strangers!", pt: 'Rá! Bom, agora você disse. Sou a Sofia. Se eu não estivesse tão entediada, não estaria falando com desconhecidos!', gap: { answer: "hadn't", options: ["hadn't", "didn't", "wouldn't"] } },
        { ask: 'Há quanto tempo o Mike está no aeroporto?', options: ['Três horas', 'Uma hora', 'Meia hora'], answer: 'Três horas', why: '"I\'ve been here for three hours."' },
        { who: 'Mike', en: "I'm Mike. Maybe this delay was lucky. Otherwise, we wouldn't have met.", pt: 'Sou o Mike. Talvez esse atraso tenha sido sorte. Senão, não teríamos nos conhecido.' },
        { who: 'Sofia', en: "Maybe! Let's have a coffee while we wait.", pt: 'Talvez! Vamos tomar um café enquanto esperamos.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u10', level: 'B2', unlock: 'b2-u10', title: 'Portas que se fecharam',
  intro: 'A Ana e o Tom falam de escolhas que mudaram a vida deles.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: choices that changed our lives.", pt: 'E eu sou o Tom. Hoje: escolhas que mudaram a nossa vida.' },
    { who: 'ana', en: "When I was eighteen, I almost studied engineering. If I had, I'd be building bridges now!", pt: 'Aos dezoito anos, quase estudei engenharia. Se tivesse estudado, estaria construindo pontes agora!' },
    { who: 'tom', en: "And I almost stayed in England. If I hadn't come to Brazil, I wouldn't be doing this podcast.", pt: 'E eu quase fiquei na Inglaterra. Se não tivesse vindo para o Brasil, não estaria fazendo este podcast.' },
    { who: 'ana', en: "Do you regret anything?", pt: 'Você se arrepende de alguma coisa?' },
    { who: 'tom', en: "Only one thing. If I weren't so lazy, I would have learned Portuguese faster!", pt: 'Só de uma coisa. Se eu não fosse tão preguiçoso, teria aprendido português mais rápido!' },
    { who: 'ana', en: "Ha! That's all for today. Thank you for listening!", pt: 'Rá! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye!', pt: 'Tchau!' },
  ],
  questions: [
    { q: 'O que a Ana quase estudou?', options: ['Engenharia', 'Medicina', 'Direito'], answer: 'Engenharia', why: '"I almost studied engineering."' },
    { q: 'O que aconteceria se o Tom não tivesse vindo ao Brasil?', options: ['Não estaria fazendo o podcast', 'Seria engenheiro', 'Falaria português melhor'], answer: 'Não estaria fazendo o podcast', why: '"I wouldn\'t be doing this podcast."' },
    { q: 'Do que o Tom se arrepende?', options: ['De não ter aprendido português mais rápido', 'De ter vindo ao Brasil', 'De não ter estudado engenharia'], answer: 'De não ter aprendido português mais rápido', why: '"I would have learned Portuguese faster!"' },
  ],
}, 'pod-b2u9');
addScene('b2-u10', 'sitting-1', 'thought');
