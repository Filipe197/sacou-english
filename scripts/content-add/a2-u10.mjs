// Etapa 2 do A2 completo: unidade nova 10 — No trabalho (verbo + -ing / verbo + to).
// Gera src/content/a2/unit-10.json. Todas as lições levam "added".
// Uso: node scripts/content-add/a2-u10.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u10-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u10l${n}-${k}`, ...o });

writeUnit('a2/unit-10.json', {
  id: 'a2-u10', level: 'A2', order: 10,
  title: 'No trabalho',
  subtitle: 'Falar do seu trabalho, do que você gosta de fazer e do que quer fazer.',
  can_do: {
    text: 'Consigo falar do meu trabalho, do que gosto e não gosto de fazer nele e responder perguntas simples numa entrevista.',
    source: 'CEFR (Conselho da Europa) — Produção oral: descrever o trabalho e as atividades do dia a dia, nível A2',
  },
  core_inventory: ['Topics: jobs and the workplace', 'Grammar: like / love / enjoy / hate + -ing', 'Grammar: want / need / would like + to', 'Grammar: good at + -ing'],
  words: [
    ['boss', 'chefe'],
    ['manager', 'gerente'],
    ['company', 'empresa'],
    ['customer', 'cliente'],
    ['earn', 'ganhar (dinheiro, salário)'],
    ['enjoy', 'curtir, gostar de'],
    ['prefer', 'preferir'],
    ['good at', 'bom em'],
    ['experience', 'experiência'],
    ['interview', 'entrevista'],
    ['uniform', 'uniforme'],
    ['receptionist', 'recepcionista'],
    ['lawyer', 'advogado(a)'],
    ['chef', 'chef de cozinha, cozinheiro(a)'],
    ['pilot', 'piloto'],
    ['report', 'relatório'],
  ],
  guide: {
    title: 'Trabalho: gostar de fazer, querer fazer',
    intro: 'Em português a gente diz "gosto de trabalhar" e "quero trabalhar" do mesmo jeito. Em inglês, depende do primeiro verbo: alguns pedem o segundo com -ing, outros com "to".',
    points: [
      { en: 'I enjoy working with people.', pt: 'Eu curto trabalhar com pessoas.', note: '"Enjoy" sempre pede -ing: enjoy working (nunca "enjoy to work").' },
      { en: 'She loves cooking, but she hates washing the dishes.', pt: 'Ela adora cozinhar, mas odeia lavar a louça.', note: '"Like", "love" e "hate" + -ing para falar do que você gosta ou não.' },
      { en: 'I want to change my job.', pt: 'Quero mudar de emprego.', note: '"Want", "need" e "would like" pedem "to" + verbo.' },
      { en: "I'd like to work abroad.", pt: 'Eu gostaria de trabalhar no exterior.', note: '"I\'d like to" = eu gostaria de. Diferente de "I like" (eu gosto).' },
      { en: "He's good at fixing computers.", pt: 'Ele é bom em consertar computadores.', note: 'Depois de "at" (e de outras preposições) o verbo vai com -ing.' },
      { en: 'What do you do?', pt: 'O que você faz? (qual é a sua profissão?)', note: 'A pergunta clássica sobre trabalho. Resposta: I\'m a nurse / I work in a bank.' },
    ],
    tips: ['"Work" = trabalho (não se conta): I have a lot of work. "Job" = emprego, vaga: I have a new job.', '"Earn money" = ganhar dinheiro trabalhando. "Win" é ganhar um jogo ou prêmio.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Profissões', [
      I(1, 1, { type: 'match', pairs: [['lawyer', 'advogado'], ['receptionist', 'recepcionista'], ['pilot', 'piloto'], ['chef', 'cozinheiro']], why: '"Chef" se fala "XÉF", com som de x, porque vem do francês.' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'What do you ___?', pt: 'O que você faz? (qual é a sua profissão?)', options: ['do', 'work', 'make'], answer: 'do', why: '"What do you do?" é a pergunta natural sobre profissão.', wrong: { work: '"What do you work?" não é natural. Diga "Where do you work?" (onde você trabalha?).', make: '"Make" é fabricar, preparar.' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: "I'm ___ lawyer.", pt: 'Sou advogada.', options: ['a', 'an', 'the'], answer: 'a', why: 'Profissão em inglês leva "a" ou "an": I\'m a lawyer, she\'s an engineer.', wrong: { an: '"An" vem antes de som de vogal. "Lawyer" começa com som de L.', the: '"The" seria "a advogada" (uma específica).' } }),
      I(1, 4, { type: 'meaning', en: 'My sister works for a big company.', options: ['Minha irmã trabalha numa empresa grande.', 'Minha irmã tem uma empresa grande.', 'Minha irmã procura emprego numa empresa.'], answer: 'Minha irmã trabalha numa empresa grande.', why: '"Work for a company" = trabalhar numa empresa (para uma empresa).' }),
      I(1, 5, { type: 'listen', en: 'He is a pilot.', options: ['Ele é piloto.', 'Ele é policial.', 'Ele é professor.'], answer: 'Ele é piloto.', why: '"Pilot" soa como "PÁI-lot".' }),
      I(1, 6, { type: 'build', pt: 'Onde você trabalha?', answer: 'Where do you work', extra: ['does', 'are'], display: 'Where do you work?', why: 'Pergunta no presente: Where + do + you + verbo.' }),
    ]),
    L(2, 'Gosto de fazer', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'I enjoy ___ with customers.', pt: 'Eu curto falar com os clientes.', options: ['talking', 'to talk', 'talk'], answer: 'talking', why: '"Enjoy" + verbo com -ing.', wrong: { 'to talk': '"Enjoy" nunca vem com "to".', talk: 'Depois de "enjoy", o verbo precisa do -ing.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'She hates ___ up early.', pt: 'Ela odeia acordar cedo.', options: ['getting', 'get', 'gets'], answer: 'getting', why: '"Hate" + -ing: hates getting up.', wrong: { get: 'Precisa do -ing depois de "hates".', gets: 'Só o primeiro verbo leva -s (hates).' } }),
      I(2, 3, { type: 'match', pairs: [['enjoy', 'curtir'], ['prefer', 'preferir'], ['earn', 'ganhar'], ['boss', 'chefe']], why: '"Earn" é ganhar dinheiro com trabalho. Ganhar um jogo é "win".' }),
      I(2, 4, { type: 'meaning', en: "My boss loves having meetings.", options: ['Meu chefe adora fazer reuniões.', 'Meu chefe odeia reuniões.', 'Meu chefe está numa reunião.'], answer: 'Meu chefe adora fazer reuniões.', why: '"Love + -ing" = adorar fazer algo. "Have a meeting" = fazer uma reunião.' }),
      I(2, 5, { type: 'build', pt: 'Eu não gosto de trabalhar nos fins de semana.', answer: "I don't like working at weekends", extra: ['to', 'doesn\'t'], display: "I don't like working at weekends.", why: '"Like + -ing". "At weekends" = nos fins de semana (inglês britânico).' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'Do you like your job?'], ['B', '___']], options: ['Yes, I love helping people.', 'Yes, I love help people.', 'Yes, I love to helping people.'], answer: 'Yes, I love helping people.', pt: 'Sim, adoro ajudar as pessoas.', why: '"Love + -ing": love helping.', wrong: { 'Yes, I love help people.': 'Falta o -ing: helping.', 'Yes, I love to helping people.': 'Ou "love to help" ou "love helping", nunca os dois juntos.' } }),
    ]),
    L(3, 'Quero fazer', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'I want ___ more money.', pt: 'Quero ganhar mais dinheiro.', options: ['to earn', 'earning', 'earn'], answer: 'to earn', why: '"Want" + to + verbo.', wrong: { earning: '"Want" não aceita -ing.', earn: 'Falta o "to": want to earn.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'We need ___ the report today.', pt: 'Precisamos terminar o relatório hoje.', options: ['to finish', 'finishing', 'finish'], answer: 'to finish', why: '"Need" + to + verbo.', wrong: { finishing: '"Need" pede "to".', finish: 'Falta o "to".' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: "I'd like ___ a chef.", pt: 'Eu gostaria de ser chef.', options: ['to be', 'being', 'be'], answer: 'to be', why: '"Would like" (I\'d like) + to + verbo.', wrong: { being: '"I\'d like" pede "to".', be: 'Falta o "to".' } }),
      I(3, 4, { type: 'meaning', en: "I like cooking, and I'd like to open a restaurant.", options: ['Gosto de cozinhar e gostaria de abrir um restaurante.', 'Gosto de restaurantes e queria cozinhar mais.', 'Eu cozinho num restaurante aberto.'], answer: 'Gosto de cozinhar e gostaria de abrir um restaurante.', why: '"I like cooking" = gosto (sempre). "I\'d like to open" = gostaria (desejo).' }),
      I(3, 5, { type: 'build', pt: 'Ele quer mudar de emprego.', answer: 'He wants to change his job', extra: ['changing', 'want'], display: 'He wants to change his job.', why: '"Want" + to. Com he, "wants" leva -s.' }),
      I(3, 6, { type: 'speak', en: "I'd like to work abroad.", pt: 'Eu gostaria de trabalhar no exterior.', why: '"I\'d like" soa como "áid láik".' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'What would you like to do next year?'], ['B', '___']], options: ["I'd like to study English abroad.", 'I like studying English abroad.', "I'd like studying English abroad."], answer: "I'd like to study English abroad.", pt: 'Eu gostaria de estudar inglês no exterior.', why: 'A pergunta é sobre desejo (would like): responda com "I\'d like to".', wrong: { 'I like studying English abroad.': '"I like" fala do que você já gosta, não de um plano.', "I'd like studying English abroad.": '"I\'d like" pede "to": to study.' } }),
    ]),
    L(4, 'Prática: bom em quê?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "He's good at ___ computers.", pt: 'Ele é bom em consertar computadores.', options: ['fixing', 'to fix', 'fix'], answer: 'fixing', why: 'Depois de "at" o verbo vai com -ing.', wrong: { 'to fix': 'Depois de preposição (at) não vai "to".', fix: 'Precisa do -ing.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: "I'm not very good ___ math.", pt: 'Não sou muito bom em matemática.', options: ['at', 'in', 'on'], answer: 'at', why: '"Good at" = bom em. Preposição fixa.', wrong: { in: 'Em português é "bom em", mas em inglês é "good at".', on: 'Não combina com "good".' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'I prefer ___ alone.', pt: 'Prefiro trabalhar sozinho.', options: ['working', 'work', 'works'], answer: 'working', why: '"Prefer" aceita -ing (ou "to work"). Aqui, a opção certa é "working".', wrong: { work: 'Precisa de -ing ou de "to".', works: 'Só o primeiro verbo muda.' } }),
      I(4, 4, { type: 'match', pairs: [['experience', 'experiência'], ['interview', 'entrevista'], ['uniform', 'uniforme'], ['report', 'relatório']], why: '"Interview" soa como "ÍN-ter-viu", com a força no começo.' }),
      I(4, 5, { type: 'meaning', en: "She's good at talking to customers.", options: ['Ela é boa em falar com os clientes.', 'Ela gosta de falar com o chefe.', 'Ela fala muito com os clientes.'], answer: 'Ela é boa em falar com os clientes.', why: '"Good at + -ing" = bom em fazer algo.' }),
      I(4, 6, { type: 'build', pt: 'Você é bom em resolver problemas?', answer: 'Are you good at solving problems', extra: ['to', 'do'], display: 'Are you good at solving problems?', why: 'Pergunta com to be: Are you...? Depois de "at", -ing.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'Do you have any ___ in sales?', pt: 'Você tem alguma experiência em vendas?', options: ['experience', 'experiences', 'an experience'], answer: 'experience', why: 'No sentido de "experiência profissional", "experience" não se conta: any experience.', wrong: { experiences: 'No plural seria "vivências" (coisas que aconteceram).', 'an experience': 'Para experiência profissional, sem "an".' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Eu trabalho numa empresa grande.', answer: 'I work for a big company.', accept: ['I work in a big company.', 'I work at a big company.'], why: '"Work for/in/at a company" são aceitos. O adjetivo vem antes: big company.' }),
      I(5, 2, { type: 'type', pt: 'Eu curto trabalhar com pessoas.', answer: 'I enjoy working with people.', why: '"Enjoy" + -ing.' }),
      I(5, 3, { type: 'dictation', en: 'My boss is very nice.', why: '"Boss" = chefe. "Nice" = legal, gentil.' }),
      I(5, 4, { type: 'type', pt: 'Quero ganhar mais dinheiro.', answer: 'I want to earn more money.', why: '"Want to" + verbo. "Earn" = ganhar com trabalho.' }),
      I(5, 5, { type: 'dictation', en: 'She is good at selling.', why: '"Good at selling" = boa em vender.' }),
      I(5, 6, { type: 'type', pt: 'Ele é recepcionista.', answer: 'He is a receptionist.', accept: ["He's a receptionist."], why: 'Profissão leva "a": a receptionist.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'I have a job interview tomorrow.', options: ['Tenho uma entrevista de emprego amanhã.', 'Tenho um emprego novo amanhã.', 'Tive uma entrevista ontem.'], answer: 'Tenho uma entrevista de emprego amanhã.', why: '"Job interview" = entrevista de emprego.' }),
      I(6, 2, { type: 'dictation', en: 'He works in a hotel.', why: '"Works" com -s porque é "he".' }),
      I(6, 3, { type: 'listen', en: "She doesn't enjoy working at night.", options: ['Ela não curte trabalhar à noite.', 'Ela gosta de trabalhar à noite.', 'Ela não trabalha à noite.'], answer: 'Ela não curte trabalhar à noite.', why: '"Doesn\'t enjoy" = não curte.' }),
      I(6, 4, { type: 'dictation', en: 'We need to wear a uniform.', why: '"Wear" = usar (roupa). "Uniform" soa como "IÚ-ni-form".' }),
      I(6, 5, { type: 'listen', en: 'The manager wants to see you.', options: ['O gerente quer ver você.', 'O gerente quer sair.', 'Você quer ver o gerente.'], answer: 'O gerente quer ver você.', why: '"Manager" soa como "MÉ-ni-djer".' }),
      I(6, 6, { type: 'dictation', en: "I'd like to be a pilot.", why: '"I\'d like to be" = gostaria de ser.' }),
      I(6, 7, { type: 'speak', en: 'I enjoy working with customers.', pt: 'Eu curto trabalhar com os clientes.', why: '"Customers" soa como "KÂS-to-merz".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'So, tell me about yourself.'], ['B', '___']], options: ["I'm a receptionist. I work in a hotel.", "I'm receptionist. I work hotel.", 'I am working receptionist in a hotel.'], answer: "I'm a receptionist. I work in a hotel.", pt: 'Sou recepcionista. Trabalho num hotel.', why: 'Na entrevista, comece pela profissão (com "a") e onde trabalha.', wrong: { "I'm receptionist. I work hotel.": 'Falta "a" antes da profissão e "in a" antes de hotel.', 'I am working receptionist in a hotel.': 'Profissão: I\'m a receptionist.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'What are you good at?'], ['B', '___']], options: ["I'm good at solving problems.", "I'm good in solve problems.", 'I good at solving problems.'], answer: "I'm good at solving problems.", pt: 'Sou bom em resolver problemas.', why: '"Good at + -ing".', wrong: { "I'm good in solve problems.": '"Good at" e verbo com -ing.', 'I good at solving problems.': 'Falta o verbo to be: I\'m.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Why do you want to work here?'], ['B', '___']], options: ['Because I enjoy working in a team.', 'Because I enjoy to work in a team.', 'Because I want working in a team.'], answer: 'Because I enjoy working in a team.', pt: 'Porque curto trabalhar em equipe.', why: '"Enjoy + -ing". "In a team" = em equipe.', wrong: { 'Because I enjoy to work in a team.': '"Enjoy" não aceita "to".', 'Because I want working in a team.': '"Want" pede "to".' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Can you start on Monday?'], ['B', '___']], options: ['Yes, of course! Thank you!', 'Yes, I can starting.', 'Yes, I start yesterday.'], answer: 'Yes, of course! Thank you!', pt: 'Sim, claro! Obrigado!', why: '"Of course" = claro. Resposta positiva e educada.', wrong: { 'Yes, I can starting.': 'Depois de "can", verbo normal: I can start.', 'Yes, I start yesterday.': '"Yesterday" é passado.' } }),
      I(7, 5, { type: 'speak', en: "I'm good at working in a team.", pt: 'Sou bom em trabalhar em equipe.', why: '"Team" soa como "TÍIM".' }),
      I(7, 6, { type: 'speak', en: 'What do you do?', pt: 'O que você faz?', why: 'Na fala rápida soa como "uó-dju-DU".' }),
    ]),
    L(8, 'Lendo: um anúncio de emprego', [
      I(8, 1, { type: 'story', why: 'Um hotel procura um recepcionista. Leia o anúncio com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Que vaga o hotel oferece?', options: ['Recepcionista', 'Cozinheiro', 'Gerente'], answer: 'Recepcionista', why: '"We need a receptionist."' }),
      I(8, 3, { type: 'quiz', q: 'Quais idiomas a pessoa precisa falar?', options: ['Inglês e português', 'Só inglês', 'Espanhol e inglês'], answer: 'Inglês e português', why: '"You need to speak English and Portuguese."' }),
      I(8, 4, { type: 'quiz', q: 'Como se candidatar?', options: ['Mandando um e-mail para a gerente', 'Ligando para o hotel', 'Indo ao hotel no domingo'], answer: 'Mandando um e-mail para a gerente', why: '"Send an email to our manager, Laura."' }),
    ], {
      title: 'Vaga: recepcionista',
      lines: [
        { who: 'Laura', en: 'Sun Hotel, Salvador. We need a receptionist!', pt: 'Hotel Sun, Salvador. Precisamos de um recepcionista!' },
        { who: 'Laura', en: 'Do you enjoy talking to people? Are you good at solving problems?', pt: 'Você curte conversar com pessoas? É bom em resolver problemas?' },
        { ask: 'Que tipo de pessoa o hotel procura?', options: ['Que goste de conversar e resolva problemas', 'Que cozinhe bem', 'Que trabalhe sozinha'], answer: 'Que goste de conversar e resolva problemas', why: '"Do you enjoy talking to people? Are you good at solving problems?"' },
        { who: 'Laura', en: 'You need ___ speak English and Portuguese.', pt: 'Você precisa falar inglês e português.', gap: { answer: 'to', options: ['to', 'at', 'for'] } },
        { who: 'Laura', en: 'Experience is good, but it is not necessary. We wear a uniform.', pt: 'Experiência é bom, mas não é necessário. Usamos uniforme.' },
        { who: 'Laura', en: 'Would you like to work with us? Send an email to our manager, Laura.', pt: 'Gostaria de trabalhar com a gente? Mande um e-mail para a nossa gerente, Laura.' },
        { ask: 'Precisa ter experiência?', options: ['Não é necessário', 'Sim, muita', 'Sim, dois anos'], answer: 'Não é necessário', why: '"Experience is good, but it is not necessary."' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'They enjoy ___ together.', pt: 'Eles curtem trabalhar juntos.', options: ['working', 'to work', 'work'], answer: 'working', why: '"Enjoy" + -ing.', wrong: { 'to work': '"Enjoy" não aceita "to".', work: 'Precisa do -ing.' } }),
      I(9, 2, { type: 'type', pt: 'Eu gostaria de ser advogado.', answer: "I'd like to be a lawyer.", accept: ['I would like to be a lawyer.'], why: '"I\'d like to be" + profissão com "a".' }),
      I(9, 3, { type: 'meaning', en: "He's good at cooking, but he hates washing the dishes.", options: ['Ele é bom em cozinhar, mas odeia lavar a louça.', 'Ele cozinha mal e odeia lavar a louça.', 'Ele adora cozinhar e lavar a louça.'], answer: 'Ele é bom em cozinhar, mas odeia lavar a louça.', why: '"Good at cooking" e "hates washing": dois usos do -ing.' }),
      I(9, 4, { type: 'dictation', en: 'We need to finish this report.', why: '"Need to" + verbo. "Report" = relatório.' }),
      I(9, 5, { type: 'listen', en: 'Do you prefer working alone or in a team?', options: ['Você prefere trabalhar sozinho ou em equipe?', 'Você trabalha sozinho ou em equipe?', 'Você gosta da sua equipe?'], answer: 'Você prefere trabalhar sozinho ou em equipe?', why: '"Prefer" = preferir. "Alone" = sozinho.' }),
      I(9, 6, { type: 'build', pt: 'Ela quer trabalhar numa empresa grande.', answer: 'She wants to work for a big company', extra: ['working', 'enjoys'], display: 'She wants to work for a big company.', why: '"Want" + to + verbo.' }),
    ]),
    L(10, 'História: a entrevista do Bruno', [
      I(10, 1, { type: 'story', why: 'O Bruno faz uma entrevista de emprego num restaurante. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde o Bruno trabalha hoje?', options: ['Numa cafeteria pequena', 'Num hotel', 'Num banco'], answer: 'Numa cafeteria pequena', why: '"I work in a small coffee shop."' }),
      I(10, 3, { type: 'quiz', q: 'Por que ele quer mudar de emprego?', options: ['Quer aprender mais', 'Não gosta de cozinhar', 'O chefe é chato'], answer: 'Quer aprender mais', why: '"I want to learn more."' }),
      I(10, 4, { type: 'quiz', q: 'Quando ele começa?', options: ['Na segunda', 'Amanhã', 'No mês que vem'], answer: 'Na segunda', why: '"Can you start on Monday?" — "Of course!"' }),
    ], {
      title: 'A entrevista do Bruno',
      lines: [
        { who: 'Paula', en: 'Hello, Bruno. Please sit down. So, what do you do?', pt: 'Olá, Bruno. Sente-se, por favor. Então, o que você faz?' },
        { who: 'Bruno', en: "I'm a cook. I work in a small coffee shop.", pt: 'Sou cozinheiro. Trabalho numa cafeteria pequena.' },
        { who: 'Paula', en: 'Why do you want to work in our restaurant?', pt: 'Por que você quer trabalhar no nosso restaurante?' },
        { who: 'Bruno', en: 'I love cooking, and I want ___ learn more.', pt: 'Adoro cozinhar e quero aprender mais.', gap: { answer: 'to', options: ['to', 'at', 'for'] } },
        { ask: 'O que o Bruno adora fazer?', options: ['Cozinhar', 'Lavar a louça', 'Falar com clientes'], answer: 'Cozinhar', why: '"I love cooking."' },
        { who: 'Paula', en: 'What are you good at?', pt: 'Em que você é bom?' },
        { who: 'Bruno', en: "I'm good at making fish. And I enjoy working in a team.", pt: 'Sou bom em fazer peixe. E curto trabalhar em equipe.' },
        { who: 'Paula', en: 'Great! Can you start on Monday?', pt: 'Ótimo! Você pode começar na segunda?' },
        { who: 'Bruno', en: 'Of course! Thank you very much!', pt: 'Claro! Muito obrigado!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u10', level: 'A2', unlock: 'a2-u10', title: 'O trabalho dos sonhos',
  intro: 'A Ana e o Tom contam do que gostam no trabalho e o que gostariam de fazer.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: work!", pt: 'E eu sou o Tom. Hoje: trabalho!' },
    { who: 'ana', en: 'Tom, do you enjoy your job?', pt: 'Tom, você curte seu trabalho?' },
    { who: 'tom', en: 'Yes! I love teaching. But I hate getting up at six.', pt: 'Sim! Adoro dar aula. Mas odeio acordar às seis.' },
    { who: 'ana', en: "I work in an office. I'm good at using computers, but I don't like sitting all day.", pt: 'Eu trabalho num escritório. Sou boa com computador, mas não gosto de ficar sentada o dia todo.' },
    { who: 'tom', en: "What's your dream job?", pt: 'Qual é o seu trabalho dos sonhos?' },
    { who: 'ana', en: "I'd like to be a pilot. I want to see the world!", pt: 'Eu gostaria de ser piloto. Quero conhecer o mundo!' },
    { who: 'tom', en: "And I'd like to have a small restaurant by the beach.", pt: 'E eu gostaria de ter um restaurantezinho na praia.' },
    { who: 'ana', en: "Nice! That's all for today. Thank you for listening!", pt: 'Que legal! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'O que o Tom odeia no trabalho?', options: ['Acordar às seis', 'Dar aula', 'Usar computador'], answer: 'Acordar às seis', why: '"I hate getting up at six."' },
    { q: 'Qual é o trabalho dos sonhos da Ana?', options: ['Piloto', 'Professora', 'Cozinheira'], answer: 'Piloto', why: '"I\'d like to be a pilot."' },
    { q: 'O que o Tom gostaria de ter?', options: ['Um restaurante na praia', 'Um avião', 'Um escritório novo'], answer: 'Um restaurante na praia', why: '"A small restaurant by the beach."' },
  ],
}, 'pod-a2u9');
addScene('a2-u10', 'standing-20', 'talk');
