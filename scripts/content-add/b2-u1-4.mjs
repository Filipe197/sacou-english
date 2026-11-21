// Etapa 1 do B2 completo: 3 lições novas (prática extra, ouvindo, lendo) nas unidades 1 a 4.
// Uso: node scripts/content-add/b2-u1-4.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

// ---------- Unidade 1: past perfect ----------
addLessons('b2/unit-01.json', {
  words: [
    ['by the time', 'quando, até o momento em que'],
    ['already', 'já'],
    ['discover', 'descobrir'],
    ['blame', 'culpar'],
    ['apparently', 'pelo jeito, aparentemente'],
    ['consequence', 'consequência'],
    ['reveal', 'revelar'],
    ['realise', 'perceber, se dar conta'],
  ],
  lessons: [
    { after: 'b2-u1-l3', lesson: { id: 'b2-u1-l8', title: 'Quando cheguei, já tinha…', items: [
      { id: 'b2u1l8-1', type: 'match', pairs: [['by the time', 'quando (até o momento)'], ['discover', 'descobrir'], ['blame', 'culpar'], ['reveal', 'revelar']], why: '"By the time" puxa o past perfect: by the time I arrived, the film had started.' },
      { id: 'b2u1l8-2', type: 'choice', prompt: 'Complete:', en: 'By the time we got to the cinema, the film ___.', pt: 'Quando chegamos ao cinema, o filme já tinha começado.', options: ['had started', 'started', 'has started'], answer: 'had started', why: 'Uma ação aconteceu antes da outra no passado: had + particípio.', wrong: { started: 'Com "by the time", a ação anterior vai no past perfect.', 'has started': '"Has started" é present perfect, ligado ao agora.' } },
      { id: 'b2u1l8-3', type: 'choice', prompt: 'Complete:', en: 'She realised she ___ her keys at the office.', pt: 'Ela percebeu que tinha deixado as chaves no escritório.', options: ['had left', 'left', 'has left'], answer: 'had left', why: 'Deixar as chaves aconteceu antes de perceber: had left.', wrong: { left: 'Sem o "had", parece que as duas coisas aconteceram juntas.', 'has left': 'Não combina com "realised" (passado).' } },
      { id: 'b2u1l8-4', type: 'meaning', en: "Apparently, he had never seen the sea before that trip.", options: ['Pelo jeito, ele nunca tinha visto o mar antes daquela viagem.', 'Ele vê o mar todo ano.', 'Ele vai ver o mar pela primeira vez.'], answer: 'Pelo jeito, ele nunca tinha visto o mar antes daquela viagem.', why: '"Apparently" = pelo jeito. "Had never seen" = nunca tinha visto.' },
      { id: 'b2u1l8-5', type: 'build', pt: 'Quando a polícia chegou, o ladrão já tinha fugido.', answer: 'By the time the police arrived the thief had already escaped', extra: ['has', 'escape'], display: 'By the time the police arrived, the thief had already escaped.', why: '"Already" fica entre "had" e o particípio.' },
      { id: 'b2u1l8-6', type: 'choice', prompt: 'Complete:', en: 'They blamed me, but I ___ anything wrong.', pt: 'Eles me culparam, mas eu não tinha feito nada de errado.', options: ["hadn't done", "didn't did", "haven't done"], answer: "hadn't done", why: 'Negativa do past perfect: hadn\'t + particípio.', wrong: { "didn't did": 'Não existe.', "haven't done": 'Present perfect não combina com "blamed".' } },
      { id: 'b2u1l8-7', type: 'dialogue', lines: [['A', 'Why were you so nervous on the plane?'], ['B', '___']], options: ["I'd never flown before!", "I've never flown before!", 'I never had fly before!'], answer: "I'd never flown before!", pt: 'Eu nunca tinha voado antes!', why: '"I\'d" = I had. Experiência anterior a um momento do passado.', wrong: { "I've never flown before!": 'Seria "nunca voei até hoje", mas você já voou naquele dia.', 'I never had fly before!': 'Ordem e particípio errados: had never flown.' } },
    ] } },
    { after: 'b2-u1-l4', lesson: { id: 'b2-u1-l9', title: 'Ouvindo', items: [
      { id: 'b2u1l9-1', type: 'listen', en: 'When I got home, everyone had gone to bed.', options: ['Quando cheguei em casa, todo mundo já tinha ido dormir.', 'Cheguei e fui dormir com todo mundo.', 'Todo mundo me esperou acordado.'], answer: 'Quando cheguei em casa, todo mundo já tinha ido dormir.', why: '"Had gone" = já tinham ido.' },
      { id: 'b2u1l9-2', type: 'dictation', en: 'I had already eaten when she called.', why: '"Had already eaten" = já tinha comido.' },
      { id: 'b2u1l9-3', type: 'listen', en: 'They discovered that someone had stolen the painting.', options: ['Eles descobriram que alguém tinha roubado o quadro.', 'Eles roubaram um quadro.', 'O quadro foi vendido.'], answer: 'Eles descobriram que alguém tinha roubado o quadro.', why: '"Had stolen" = tinha roubado (antes de descobrirem).' },
      { id: 'b2u1l9-4', type: 'dictation', en: 'She had never been abroad before.', why: '"Abroad" = no exterior.' },
      { id: 'b2u1l9-5', type: 'listen', en: "He didn't recognise me because I'd changed a lot.", options: ['Ele não me reconheceu porque eu tinha mudado muito.', 'Ele mudou muito e eu não o reconheci.', 'Nós nos reconhecemos na hora.'], answer: 'Ele não me reconheceu porque eu tinha mudado muito.', why: '"I\'d changed" = I had changed.' },
      { id: 'b2u1l9-6', type: 'dictation', en: 'The consequences were serious.', why: '"Consequences" = consequências.' },
      { id: 'b2u1l9-7', type: 'speak', en: 'I realised I had made a mistake.', pt: 'Percebi que tinha cometido um erro.', why: '"Make a mistake" = cometer um erro.' },
    ] } },
    { after: 'b2-u1-l5', lesson: { id: 'b2-u1-l10', title: 'Lendo: o dia em que tudo deu errado',
      story: { title: 'O dia em que tudo deu errado', lines: [
        { who: 'Carlos', en: 'Last Monday was a disaster. My alarm had not gone off, so I woke up late.', pt: 'Segunda passada foi um desastre. Meu despertador não tinha tocado, então acordei atrasado.' },
        { who: 'Carlos', en: 'By the time I got to the station, the train had already left.', pt: 'Quando cheguei à estação, o trem já tinha saído.' },
        { ask: 'Por que o Carlos acordou tarde?', options: ['O despertador não tocou', 'Ele estava doente', 'Ele foi dormir tarde'], answer: 'O despertador não tocou', why: '"My alarm had not gone off."' },
        { who: 'Carlos', en: 'When I finally arrived at work, I realised I had ___ my laptop at home.', pt: 'Quando finalmente cheguei ao trabalho, percebi que tinha esquecido meu notebook em casa.', gap: { answer: 'forgotten', options: ['forgotten', 'forgot', 'forget'] } },
        { who: 'Carlos', en: 'My boss blamed me for the late report, although I had sent it the night before.', pt: 'Meu chefe me culpou pelo relatório atrasado, embora eu o tivesse mandado na noite anterior.' },
        { who: 'Carlos', en: 'Apparently, the email had gone to his spam folder. What a day!', pt: 'Pelo jeito, o e-mail tinha ido para a pasta de spam dele. Que dia!' },
      ] },
      items: [
        { id: 'b2u1l10-1', type: 'story', why: 'O Carlos conta uma segunda-feira em que tudo deu errado. Repare no past perfect. Leia com calma e ouça cada frase.' },
        { id: 'b2u1l10-2', type: 'quiz', q: 'O que ele esqueceu em casa?', options: ['O notebook', 'A carteira', 'O celular'], answer: 'O notebook', why: '"I had forgotten my laptop at home."' },
        { id: 'b2u1l10-3', type: 'quiz', q: 'Por que o chefe não recebeu o relatório?', options: ['O e-mail foi para o spam', 'O Carlos não mandou', 'O chefe apagou'], answer: 'O e-mail foi para o spam', why: '"The email had gone to his spam folder."' },
        { id: 'b2u1l10-4', type: 'quiz', q: 'Quando ele tinha mandado o relatório?', options: ['Na noite anterior', 'Na segunda de manhã', 'Nunca mandou'], answer: 'Na noite anterior', why: '"I had sent it the night before."' },
      ] } },
  ],
  extraVocab: [{ word: 'laptop', reason: 'palavra do dia a dia (notebook); não está na CEFR-J' }, { word: 'spam', reason: 'palavra do dia a dia (e-mail indesejado)' }, { word: 'folder', reason: 'pasta (de e-mail); aparece uma vez com tradução' }],
});

// ---------- Unidade 2: third conditional, wish, if only ----------
addLessons('b2/unit-02.json', {
  words: [
    ['should have', 'deveria ter'],
    ['could have', 'poderia ter'],
    ['would have', 'teria'],
    ['mistake', 'erro'],
    ['lesson', 'lição (de vida)'],
    ['admit', 'admitir'],
    ['outcome', 'resultado'],
    ['differently', 'de outro jeito'],
  ],
  lessons: [
    { after: 'b2-u2-l3', lesson: { id: 'b2-u2-l8', title: 'Deveria ter…', items: [
      { id: 'b2u2l8-1', type: 'match', pairs: [['should have', 'deveria ter'], ['could have', 'poderia ter'], ['would have', 'teria'], ['outcome', 'resultado']], why: 'Todos seguidos de particípio: should have gone, could have won, would have helped.' },
      { id: 'b2u2l8-2', type: 'choice', prompt: 'Complete:', en: 'You should have ___ me. I would have helped you.', pt: 'Você deveria ter me ligado. Eu teria te ajudado.', options: ['called', 'call', 'calling'], answer: 'called', why: '"Should have" + particípio = crítica ou arrependimento sobre o passado.', wrong: { call: 'Precisa do particípio: called.', calling: 'Não usa -ing aqui.' } },
      { id: 'b2u2l8-3', type: 'choice', prompt: 'Complete:', en: 'We could have ___ the match if we had trained more.', pt: 'Poderíamos ter ganhado o jogo se tivéssemos treinado mais.', options: ['won', 'win', 'winning'], answer: 'won', why: '"Could have" + particípio (win → won).', wrong: { win: 'Precisa do particípio.', winning: 'Sem -ing.' } },
      { id: 'b2u2l8-4', type: 'meaning', en: "I shouldn't have said that. It was a big mistake.", options: ['Eu não deveria ter dito aquilo. Foi um erro grande.', 'Eu deveria ter falado mais.', 'Eu não disse nada de errado.'], answer: 'Eu não deveria ter dito aquilo. Foi um erro grande.', why: '"Shouldn\'t have said" = não deveria ter dito.' },
      { id: 'b2u2l8-5', type: 'build', pt: 'Se eu tivesse estudado, teria passado.', answer: 'If I had studied I would have passed', extra: ['will', 'studied had'], display: 'If I had studied, I would have passed.', why: 'Third conditional: If + had + particípio, would have + particípio.' },
      { id: 'b2u2l8-6', type: 'choice', prompt: 'Complete:', en: 'I admit I ___ have done it differently.', pt: 'Admito que poderia ter feito de outro jeito.', options: ['could', 'can', 'will'], answer: 'could', why: '"Could have done" = poderia ter feito.', wrong: { can: '"Can have done" não é usado assim.', will: '"Will have done" é outro tempo (futuro perfeito).' } },
      { id: 'b2u2l8-7', type: 'dialogue', lines: [['A', 'I missed the flight by five minutes.'], ['B', '___']], options: ['Oh no! You should have left earlier.', 'Oh no! You should left earlier.', 'Oh no! You should have leave earlier.'], answer: 'Oh no! You should have left earlier.', pt: 'Ah, não! Você deveria ter saído mais cedo.', why: 'Should have + particípio (leave → left).', wrong: { 'Oh no! You should left earlier.': 'Falta o "have".', 'Oh no! You should have leave earlier.': 'Precisa do particípio: left.' } },
    ] } },
    { after: 'b2-u2-l4', lesson: { id: 'b2-u2-l9', title: 'Ouvindo', items: [
      { id: 'b2u2l9-1', type: 'listen', en: 'If you had told me, I would have come.', options: ['Se você tivesse me contado, eu teria vindo.', 'Você me contou e eu vim.', 'Se você me contar, eu venho.'], answer: 'Se você tivesse me contado, eu teria vindo.', why: 'Third conditional: situação que não aconteceu.' },
      { id: 'b2u2l9-2', type: 'dictation', en: 'I should have listened to you.', why: '"Should have listened" = deveria ter ouvido.' },
      { id: 'b2u2l9-3', type: 'listen', en: "The outcome would have been different if we'd waited.", options: ['O resultado teria sido diferente se tivéssemos esperado.', 'Esperamos e deu certo.', 'O resultado foi o mesmo.'], answer: 'O resultado teria sido diferente se tivéssemos esperado.', why: '"We\'d waited" = we had waited.' },
      { id: 'b2u2l9-4', type: 'dictation', en: 'It was a lesson I will never forget.', why: '"A lesson" = uma lição (de vida).' },
      { id: 'b2u2l9-5', type: 'listen', en: "She wishes she hadn't sold her car.", options: ['Ela queria não ter vendido o carro.', 'Ela quer vender o carro.', 'Ela comprou um carro novo.'], answer: 'Ela queria não ter vendido o carro.', why: '"Wish + had + particípio" = arrependimento sobre o passado.' },
      { id: 'b2u2l9-6', type: 'dictation', en: 'We could have done it differently.', why: '"Differently" = de outro jeito.' },
      { id: 'b2u2l9-7', type: 'speak', en: "I shouldn't have eaten so much.", pt: 'Eu não deveria ter comido tanto.', why: '"Shouldn\'t have" soa como "XÚ-dent-av".' },
    ] } },
    { after: 'b2-u2-l5', lesson: { id: 'b2-u2-l10', title: 'Lendo: a carta para o meu eu de 18 anos',
      story: { title: 'Carta para o meu eu de 18 anos', lines: [
        { who: 'Laura', en: 'Dear 18-year-old me, I know you think you know everything. You don\'t!', pt: 'Querida eu de 18 anos, sei que você acha que sabe tudo. Não sabe!' },
        { who: 'Laura', en: "I wish I had travelled more when I was young. I always said I didn't have time.", pt: 'Queria ter viajado mais quando era jovem. Eu sempre dizia que não tinha tempo.' },
        { ask: 'Do que a Laura se arrepende primeiro?', options: ['De não ter viajado mais', 'De ter estudado demais', 'De ter se mudado'], answer: 'De não ter viajado mais', why: '"I wish I had travelled more."' },
        { who: 'Laura', en: "If I had learned English earlier, I would ___ got that job in London.", pt: 'Se eu tivesse aprendido inglês antes, teria conseguido aquele emprego em Londres.', gap: { answer: 'have', options: ['have', 'had', 'has'] } },
        { who: 'Laura', en: "I should have called Grandma more often. She had so many stories.", pt: 'Eu deveria ter ligado mais para a vovó. Ela tinha tantas histórias.' },
        { who: 'Laura', en: "But don't worry too much. Every mistake taught me a lesson.", pt: 'Mas não se preocupe demais. Cada erro me ensinou uma lição.' },
      ] },
      items: [
        { id: 'b2u2l10-1', type: 'story', why: 'A Laura escreve uma carta para ela mesma aos 18 anos. Repare nos arrependimentos. Leia com calma e ouça cada frase.' },
        { id: 'b2u2l10-2', type: 'quiz', q: 'Que emprego ela teria conseguido?', options: ['Um emprego em Londres', 'Um emprego no banco', 'Um emprego de professora'], answer: 'Um emprego em Londres', why: '"I would have got that job in London."' },
        { id: 'b2u2l10-3', type: 'quiz', q: 'Para quem ela deveria ter ligado mais?', options: ['Para a avó', 'Para a mãe', 'Para os amigos'], answer: 'Para a avó', why: '"I should have called Grandma more often."' },
        { id: 'b2u2l10-4', type: 'quiz', q: 'Qual é a mensagem final?', options: ['Cada erro ensina uma lição', 'Nunca cometa erros', 'Não viaje'], answer: 'Cada erro ensina uma lição', why: '"Every mistake taught me a lesson."' },
      ] } },
  ],
});

// ---------- Unidade 3: reported speech ----------
addLessons('b2/unit-03.json', {
  words: [
    ['claim', 'afirmar, alegar'],
    ['deny', 'negar'],
    ['announce', 'anunciar'],
    ['insist', 'insistir'],
    ['warn', 'avisar, alertar'],
    ['refuse', 'se recusar'],
    ['according to', 'segundo, de acordo com'],
    ['rumour', 'boato'],
  ],
  lessons: [
    { after: 'b2-u3-l3', lesson: { id: 'b2-u3-l8', title: 'Verbos para contar', items: [
      { id: 'b2u3l8-1', type: 'match', pairs: [['claim', 'afirmar'], ['deny', 'negar'], ['announce', 'anunciar'], ['insist', 'insistir']], why: 'Em vez de repetir "said", use verbos mais precisos: claimed, denied, announced.' },
      { id: 'b2u3l8-2', type: 'choice', prompt: 'Complete:', en: 'He denied ___ the money.', pt: 'Ele negou ter pegado o dinheiro.', options: ['taking', 'to take', 'take'], answer: 'taking', why: '"Deny" + verbo com -ing: denied taking.', wrong: { 'to take': '"Deny" não aceita "to".', take: 'Precisa do -ing.' } },
      { id: 'b2u3l8-3', type: 'choice', prompt: 'Complete:', en: 'She refused ___ the contract.', pt: 'Ela se recusou a assinar o contrato.', options: ['to sign', 'signing', 'sign'], answer: 'to sign', why: '"Refuse" + to + verbo.', wrong: { signing: '"Refuse" pede "to".', sign: 'Falta o "to".' } },
      { id: 'b2u3l8-4', type: 'meaning', en: 'According to the news, the president will announce new rules tomorrow.', options: ['Segundo o jornal, o presidente vai anunciar novas regras amanhã.', 'O presidente anunciou novas regras ontem.', 'O jornal criticou as regras.'], answer: 'Segundo o jornal, o presidente vai anunciar novas regras amanhã.', why: '"According to" = segundo.' },
      { id: 'b2u3l8-5', type: 'build', pt: 'Ele me avisou para não chegar atrasado.', answer: 'He warned me not to be late', extra: ['to not', 'said'], display: 'He warned me not to be late.', why: '"Warn someone not to" = avisar alguém para não.' },
      { id: 'b2u3l8-6', type: 'choice', prompt: 'Complete:', en: 'The company claimed that the product ___ safe.', pt: 'A empresa afirmou que o produto era seguro.', options: ['was', 'is being', 'were'], answer: 'was', why: 'No discurso indireto, o tempo "volta" um passo: is → was.', wrong: { 'is being': 'Não combina com "claimed".', were: 'Com "the product" (singular): was.' } },
      { id: 'b2u3l8-7', type: 'dialogue', lines: [['A', 'Did Tom say he was leaving the company?'], ['B', '___']], options: ["No, he denied it. But there's a rumour.", 'No, he denied to leave.', 'No, he said me no.'], answer: "No, he denied it. But there's a rumour.", pt: 'Não, ele negou. Mas tem um boato.', why: '"Deny it" = negar. "Rumour" = boato.', wrong: { 'No, he denied to leave.': '"Deny" + -ing, não "to".', 'No, he said me no.': '"Say" não leva a pessoa direto: "he told me no".' } },
    ] } },
    { after: 'b2-u3-l4', lesson: { id: 'b2-u3-l9', title: 'Ouvindo', items: [
      { id: 'b2u3l9-1', type: 'listen', en: 'She told me she had found a new job.', options: ['Ela me contou que tinha arrumado um emprego novo.', 'Ela vai procurar um emprego novo.', 'Ela perdeu o emprego.'], answer: 'Ela me contou que tinha arrumado um emprego novo.', why: '"Told me" + "had found".' },
      { id: 'b2u3l9-2', type: 'dictation', en: 'He insisted on paying the bill.', why: '"Insist on" + -ing.' },
      { id: 'b2u3l9-3', type: 'listen', en: 'They asked us whether we wanted to stay.', options: ['Eles nos perguntaram se a gente queria ficar.', 'Eles queriam ficar.', 'A gente perguntou se eles iam ficar.'], answer: 'Eles nos perguntaram se a gente queria ficar.', why: 'Pergunta indireta: asked whether.' },
      { id: 'b2u3l9-4', type: 'dictation', en: 'According to my teacher, it is correct.', why: '"According to" = segundo.' },
      { id: 'b2u3l9-5', type: 'listen', en: "The manager announced that the shop would close.", options: ['O gerente anunciou que a loja ia fechar.', 'A loja abriu hoje.', 'O gerente vai abrir uma loja.'], answer: 'O gerente anunciou que a loja ia fechar.', why: 'will → would no discurso indireto.' },
      { id: 'b2u3l9-6', type: 'dictation', en: 'She refused to answer.', why: '"Refuse to" = se recusar a.' },
      { id: 'b2u3l9-7', type: 'speak', en: 'He said he would call me later.', pt: 'Ele disse que me ligaria mais tarde.', why: '"Would" no discurso indireto.' },
    ] } },
    { after: 'b2-u3-l5', lesson: { id: 'b2-u3-l10', title: 'Lendo: o boato do escritório',
      story: { title: 'O boato do escritório', lines: [
        { who: 'Nina', en: 'There was a rumour in the office that our boss was leaving.', pt: 'Tinha um boato no escritório de que o nosso chefe ia sair.' },
        { who: 'Nina', en: 'Ben claimed he had heard the boss on the phone with another company.', pt: 'O Ben afirmou que tinha ouvido o chefe ao telefone com outra empresa.' },
        { ask: 'O que o Ben disse ter ouvido?', options: ['O chefe falando com outra empresa', 'O chefe pedindo demissão', 'Uma reunião secreta'], answer: 'O chefe falando com outra empresa', why: '"He had heard the boss on the phone with another company."' },
        { who: 'Nina', en: 'When I asked the boss, he ___ it. He said he was just talking to a friend.', pt: 'Quando perguntei ao chefe, ele negou. Disse que só estava falando com um amigo.', gap: { answer: 'denied', options: ['denied', 'announced', 'insisted'] } },
        { who: 'Nina', en: "But on Friday, he announced that he would move to Lisbon next month!", pt: 'Mas na sexta, ele anunciou que ia se mudar para Lisboa no mês seguinte!' },
        { who: 'Nina', en: 'So, according to Ben, rumours are always true. I am not so sure!', pt: 'Então, segundo o Ben, boatos são sempre verdade. Eu não tenho tanta certeza!' },
      ] },
      items: [
        { id: 'b2u3l10-1', type: 'story', why: 'A Nina conta como um boato se espalhou no trabalho. Repare nos verbos de discurso indireto. Leia com calma e ouça cada frase.' },
        { id: 'b2u3l10-2', type: 'quiz', q: 'Para onde o chefe vai se mudar?', options: ['Lisboa', 'Londres', 'Salvador'], answer: 'Lisboa', why: '"He would move to Lisbon next month."' },
        { id: 'b2u3l10-3', type: 'quiz', q: 'O boato era verdade?', options: ['Sim, no fim era', 'Não', 'Ninguém soube'], answer: 'Sim, no fim era', why: 'O chefe anunciou que ia se mudar.' },
        { id: 'b2u3l10-4', type: 'quiz', q: 'O que o chefe disse no começo?', options: ['Que estava falando com um amigo', 'Que ia sair', 'Que não usava telefone'], answer: 'Que estava falando com um amigo', why: '"He said he was just talking to a friend."' },
      ] } },
  ],
  extraVocab: [{ word: 'according', reason: '"according to" (segundo, de acordo com) é essencial para relatar o que outros disseram' }],
});

// ---------- Unidade 4: deduction in the past (must have, can't have) ----------
addLessons('b2/unit-04.json', {
  words: [
    ['must have', 'deve ter (dedução sobre o passado)'],
    ["can't have", 'não pode ter'],
    ['might have', 'pode ter, talvez tenha'],
    ['assume', 'supor, presumir'],
    ['conclude', 'concluir'],
    ['guilty', 'culpado(a)'],
    ['innocent', 'inocente'],
    ['responsible', 'responsável'],
  ],
  lessons: [
    { after: 'b2-u4-l3', lesson: { id: 'b2-u4-l8', title: 'Deve ter sido…', items: [
      { id: 'b2u4l8-1', type: 'match', pairs: [['must have', 'deve ter'], ["can't have", 'não pode ter'], ['might have', 'pode ter'], ['guilty', 'culpado']], why: 'Sobre o passado: modal + have + particípio.' },
      { id: 'b2u4l8-2', type: 'choice', prompt: 'Complete:', en: 'The ground is wet. It must have ___ last night.', pt: 'O chão está molhado. Deve ter chovido ontem à noite.', options: ['rained', 'rain', 'raining'], answer: 'rained', why: 'Dedução sobre o passado: must have + particípio.', wrong: { rain: 'Precisa do particípio.', raining: 'Sem -ing aqui.' } },
      { id: 'b2u4l8-3', type: 'choice', prompt: 'Complete:', en: "She ___ have seen us. She didn't say hello.", pt: 'Ela não pode ter visto a gente. Não deu oi.', options: ["can't", "mustn't", 'should'], answer: "can't", why: 'Certeza de que não aconteceu: can\'t have.', wrong: { "mustn't": '"Mustn\'t have" não se usa para dedução.', should: '"Should have seen" seria "deveria ter visto".' } },
      { id: 'b2u4l8-4', type: 'meaning', en: "He might have missed the bus. Let's wait a bit.", options: ['Ele pode ter perdido o ônibus. Vamos esperar um pouco.', 'Ele perdeu o ônibus com certeza.', 'Ele não vem mais.'], answer: 'Ele pode ter perdido o ônibus. Vamos esperar um pouco.', why: '"Might have" = talvez tenha.' },
      { id: 'b2u4l8-5', type: 'build', pt: 'Alguém deve ter deixado a porta aberta.', answer: 'Someone must have left the door open', extra: ['mustn\'t', 'leave'], display: 'Someone must have left the door open.', why: 'Must have + particípio (leave → left).' },
      { id: 'b2u4l8-6', type: 'choice', prompt: 'Complete:', en: 'We assumed he was guilty, but he was ___.', pt: 'Achamos que ele era culpado, mas era inocente.', options: ['innocent', 'responsible', 'certain'], answer: 'innocent', why: '"Innocent" = inocente, o contrário de "guilty".', wrong: { responsible: '"Responsible" = responsável.', certain: '"Certain" = certo.' } },
      { id: 'b2u4l8-7', type: 'dialogue', lines: [['A', "Mike hasn't arrived. The meeting started an hour ago."], ['B', '___']], options: ['He must have forgotten about it.', 'He must forgotten about it.', 'He must have forget about it.'], answer: 'He must have forgotten about it.', pt: 'Ele deve ter esquecido.', why: 'Must have + particípio.', wrong: { 'He must forgotten about it.': 'Falta o "have".', 'He must have forget about it.': 'Precisa do particípio: forgotten.' } },
    ] } },
    { after: 'b2-u4-l4', lesson: { id: 'b2-u4-l9', title: 'Ouvindo', items: [
      { id: 'b2u4l9-1', type: 'listen', en: 'You must have been very tired after the trip.', options: ['Você deve ter ficado muito cansado depois da viagem.', 'Você está cansado agora.', 'Você não viajou.'], answer: 'Você deve ter ficado muito cansado depois da viagem.', why: '"Must have been" = deve ter ficado.' },
      { id: 'b2u4l9-2', type: 'dictation', en: "He can't have done it alone.", why: '"Can\'t have done" = não pode ter feito.' },
      { id: 'b2u4l9-3', type: 'listen', en: 'Who is responsible for this mess?', options: ['Quem é o responsável por esta bagunça?', 'Quem limpou a casa?', 'Onde está a bagunça?'], answer: 'Quem é o responsável por esta bagunça?', why: '"Mess" = bagunça.' },
      { id: 'b2u4l9-4', type: 'dictation', en: 'She might have taken the wrong train.', why: '"Might have taken" = pode ter pegado.' },
      { id: 'b2u4l9-5', type: 'listen', en: 'The police concluded that the driver was guilty.', options: ['A polícia concluiu que o motorista era culpado.', 'O motorista era inocente.', 'A polícia não sabia de nada.'], answer: 'A polícia concluiu que o motorista era culpado.', why: '"Conclude" = concluir.' },
      { id: 'b2u4l9-6', type: 'dictation', en: 'Someone must have called the police.', why: '"Someone" = alguém.' },
      { id: 'b2u4l9-7', type: 'speak', en: 'It must have been a mistake.', pt: 'Deve ter sido um engano.', why: '"Must have been" soa como "MÂST-av-bin".' },
    ] } },
    { after: 'b2-u4-l5', lesson: { id: 'b2-u4-l10', title: 'Lendo: quem comeu o queijo?',
      story: { title: 'Quem comeu o queijo?', lines: [
        { who: 'Paula', en: 'This morning, the cheese in the fridge had disappeared. Who could it have been?', pt: 'Hoje de manhã, o queijo da geladeira tinha sumido. Quem poderia ter sido?' },
        { who: 'Paula', en: "It can't have been my husband. He has been on a diet for weeks.", pt: 'Não pode ter sido meu marido. Ele está de dieta há semanas.' },
        { ask: 'Por que não pode ter sido o marido?', options: ['Ele está de dieta', 'Ele estava viajando', 'Ele não gosta de queijo'], answer: 'Ele está de dieta', why: '"He has been on a diet for weeks."' },
        { who: 'Paula', en: 'My son might have eaten it, but he was sleeping at his friend\'s ___.', pt: 'Meu filho pode ter comido, mas estava dormindo na casa do amigo.', gap: { answer: 'house', options: ['house', 'guilty', 'conclude'] } },
        { who: 'Paula', en: 'Then I noticed that the window was open and there was a small footprint on the floor.', pt: 'Então reparei que a janela estava aberta e tinha uma pegadinha no chão.' },
        { who: 'Paula', en: "I concluded that the neighbour's cat must have come in. Guilty!", pt: 'Concluí que o gato do vizinho deve ter entrado. Culpado!' },
      ] },
      items: [
        { id: 'b2u4l10-1', type: 'story', why: 'A Paula investiga o sumiço do queijo. Repare nas deduções sobre o passado. Leia com calma e ouça cada frase.' },
        { id: 'b2u4l10-2', type: 'quiz', q: 'Onde estava o filho?', options: ['Na casa do amigo', 'No quarto', 'Na escola'], answer: 'Na casa do amigo', why: '"He was sleeping at his friend\'s house."' },
        { id: 'b2u4l10-3', type: 'quiz', q: 'Que pistas a Paula encontrou?', options: ['Janela aberta e uma pegadinha', 'Um bilhete', 'Migalhas na cama'], answer: 'Janela aberta e uma pegadinha', why: '"The window was open and there was a small footprint."' },
        { id: 'b2u4l10-4', type: 'quiz', q: 'Quem foi o culpado?', options: ['O gato do vizinho', 'O marido', 'O filho'], answer: 'O gato do vizinho', why: '"The neighbour\'s cat must have come in."' },
      ] } },
  ],
  extraVocab: [{ word: 'footprint', reason: 'pegada (pista na história); aparece uma vez com tradução' }],
});
