// Etapa 1 do B2 completo: 3 lições novas (prática extra, ouvindo, lendo) nas unidades 5 a 8.
// Uso: node scripts/content-add/b2-u5-8.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

// ---------- Unidade 5: passiva em vários tempos e have/get something done ----------
addLessons('b2/unit-05.json', {
  words: [
    ['get something done', 'mandar fazer algo'],
    ['being', 'sendo (passiva contínua)'],
    ['will be', 'vai ser, será'],
    ['renovate', 'reformar'],
    ['check', 'verificar, revisar'],
    ['cut', 'cortar'],
    ['tooth', 'dente'],
    ['haircut', 'corte de cabelo'],
  ],
  lessons: [
    { after: 'b2-u5-l3', lesson: { id: 'b2-u5-l8', title: 'Está sendo feito', items: [
      { id: 'b2u5l8-1', type: 'match', pairs: [['is being built', 'está sendo construído'], ['will be sent', 'vai ser enviado'], ['has been sold', 'foi vendido'], ['was being repaired', 'estava sendo consertado']], why: 'Passiva = be (no tempo certo) + particípio.' },
      { id: 'b2u5l8-2', type: 'choice', prompt: 'Complete:', en: 'A new bridge is ___ built over the river.', pt: 'Uma ponte nova está sendo construída sobre o rio.', options: ['being', 'been', 'be'], answer: 'being', why: 'Passiva no presente contínuo: is being + particípio.', wrong: { been: '"Is been" não existe.', be: '"Is be" não existe.' } },
      { id: 'b2u5l8-3', type: 'choice', prompt: 'Complete:', en: 'Your order will ___ delivered tomorrow.', pt: 'Seu pedido vai ser entregue amanhã.', options: ['be', 'being', 'been'], answer: 'be', why: 'Passiva no futuro: will be + particípio.', wrong: { being: '"Will being" não existe.', been: '"Will been" não existe.' } },
      { id: 'b2u5l8-4', type: 'meaning', en: 'I had my car checked before the trip.', options: ['Mandei revisar meu carro antes da viagem.', 'Eu mesmo revisei o carro.', 'Meu carro quebrou na viagem.'], answer: 'Mandei revisar meu carro antes da viagem.', why: '"Have something done" = mandar alguém fazer.' },
      { id: 'b2u5l8-5', type: 'build', pt: 'Vou cortar o cabelo amanhã (no cabeleireiro).', answer: "I'm going to get my hair cut tomorrow", extra: ['cutting', 'myself'], display: "I'm going to get my hair cut tomorrow.", why: '"Get my hair cut" = cortar o cabelo (alguém corta para você).' },
      { id: 'b2u5l8-6', type: 'choice', prompt: 'Complete:', en: 'The house has ___ renovated recently.', pt: 'A casa foi reformada recentemente.', options: ['been', 'being', 'be'], answer: 'been', why: 'Passiva no present perfect: has been + particípio.', wrong: { being: '"Has being" não existe.', be: '"Has be" não existe.' } },
      { id: 'b2u5l8-7', type: 'dialogue', lines: [['A', 'Did you fix the roof yourself?'], ['B', '___']], options: ['No, I had it repaired by a professional.', 'No, I repaired by a professional.', 'No, I had repair it.'], answer: 'No, I had it repaired by a professional.', pt: 'Não, mandei um profissional consertar.', why: 'Have + coisa + particípio (+ by quem fez).', wrong: { 'No, I repaired by a professional.': 'Isso diria que você mesmo consertou.', 'No, I had repair it.': 'Ordem: had IT repaired.' } },
    ] } },
    { after: 'b2-u5-l4', lesson: { id: 'b2-u5-l9', title: 'Ouvindo', items: [
      { id: 'b2u5l9-1', type: 'listen', en: 'The road is being repaired, so take another way.', options: ['A rua está sendo consertada, então pegue outro caminho.', 'A rua foi consertada ontem.', 'A rua está fechada para sempre.'], answer: 'A rua está sendo consertada, então pegue outro caminho.', why: '"Is being repaired" = está sendo consertada.' },
      { id: 'b2u5l9-2', type: 'dictation', en: 'I need to get my phone fixed.', why: '"Get something fixed" = mandar consertar.' },
      { id: 'b2u5l9-3', type: 'listen', en: 'The results will be announced on Friday.', options: ['Os resultados vão ser anunciados na sexta.', 'Os resultados saíram na sexta.', 'Ninguém sabe dos resultados.'], answer: 'Os resultados vão ser anunciados na sexta.', why: '"Will be announced" = vão ser anunciados.' },
      { id: 'b2u5l9-4', type: 'dictation', en: 'She had her tooth checked.', why: '"Have something checked" = mandar verificar.' },
      { id: 'b2u5l9-5', type: 'listen', en: 'My wallet was stolen while I was sleeping.', options: ['Minha carteira foi roubada enquanto eu dormia.', 'Eu perdi a carteira dormindo.', 'Roubaram meu celular.'], answer: 'Minha carteira foi roubada enquanto eu dormia.', why: '"Was stolen" = foi roubada.' },
      { id: 'b2u5l9-6', type: 'dictation', en: 'The package has been delivered.', why: '"Has been delivered" = foi entregue.' },
      { id: 'b2u5l9-7', type: 'speak', en: 'I need a haircut.', pt: 'Preciso cortar o cabelo.', why: '"Haircut" = corte de cabelo.' },
    ] } },
    { after: 'b2-u5-l5', lesson: { id: 'b2-u5-l10', title: 'Lendo: a reforma da casa',
      story: { title: 'A reforma da casa', lines: [
        { who: 'Marcos', en: "We bought an old house last year, and it's being renovated now.", pt: 'Compramos uma casa velha no ano passado, e ela está sendo reformada agora.' },
        { who: 'Marcos', en: 'The kitchen has already been finished, and the walls have been painted.', pt: 'A cozinha já foi terminada, e as paredes foram pintadas.' },
        { ask: 'O que já está pronto?', options: ['A cozinha e as paredes', 'O telhado', 'O jardim'], answer: 'A cozinha e as paredes', why: '"The kitchen has already been finished, and the walls have been painted."' },
        { who: 'Marcos', en: "We're having the roof ___ next week. It was damaged in the storm.", pt: 'Vamos mandar consertar o telhado semana que vem. Ele foi danificado na tempestade.', gap: { answer: 'repaired', options: ['repaired', 'repair', 'repairing'] } },
        { who: 'Marcos', en: "We did some work ourselves, but the electricity was installed by a professional.", pt: 'Fizemos parte do trabalho nós mesmos, mas a parte elétrica foi instalada por um profissional.' },
        { who: 'Marcos', en: 'If everything goes well, the house will be finished before Christmas!', pt: 'Se tudo der certo, a casa vai estar pronta antes do Natal!' },
      ] },
      items: [
        { id: 'b2u5l10-1', type: 'story', why: 'O Marcos conta como está a reforma da casa. Repare na voz passiva em vários tempos.' },
        { id: 'b2u5l10-2', type: 'quiz', q: 'Por que o telhado precisa de conserto?', options: ['Foi danificado na tempestade', 'É muito velho', 'Está pequeno'], answer: 'Foi danificado na tempestade', why: '"It was damaged in the storm."' },
        { id: 'b2u5l10-3', type: 'quiz', q: 'Quem instalou a parte elétrica?', options: ['Um profissional', 'O Marcos', 'O vizinho'], answer: 'Um profissional', why: '"Was installed by a professional."' },
        { id: 'b2u5l10-4', type: 'quiz', q: 'Quando a casa deve ficar pronta?', options: ['Antes do Natal', 'Semana que vem', 'No ano que vem'], answer: 'Antes do Natal', why: '"Will be finished before Christmas."' },
      ] } },
  ],
  extraVocab: [{ word: 'electricity', reason: 'parte elétrica da casa; aparece uma vez com tradução' }, { word: 'renovate', reason: 'reformar (casa): palavra central da leitura, sempre com tradução' }, { word: 'christmas', reason: 'nome de data (Natal)' }],
});

// ---------- Unidade 6: gerúndio ou infinitivo ----------
addLessons('b2/unit-06.json', {
  words: [
    ['stop doing / stop to do', 'parar de fazer / parar para fazer'],
    ['remember doing / remember to do', 'lembrar de ter feito / lembrar de fazer'],
    ['try doing / try to do', 'experimentar fazer / tentar fazer'],
    ['regret', 'se arrepender'],
    ['postpone', 'adiar'],
    ['suggest', 'sugerir'],
    ['deserve', 'merecer'],
    ['tend', 'tender, costumar'],
  ],
  lessons: [
    { after: 'b2-u6-l3', lesson: { id: 'b2-u6-l8', title: 'Muda o sentido!', items: [
      { id: 'b2u6l8-1', type: 'choice', prompt: 'Complete:', en: 'I stopped ___ two years ago. I feel much better now.', pt: 'Parei de fumar há dois anos. Me sinto bem melhor agora.', options: ['smoking', 'to smoke', 'smoke'], answer: 'smoking', why: '"Stop + -ing" = parar de fazer.', wrong: { 'to smoke': '"Stop to smoke" = parar (o que fazia) PARA fumar!', smoke: 'Precisa de -ing ou to.' } },
      { id: 'b2u6l8-2', type: 'choice', prompt: 'Complete:', en: 'We stopped ___ coffee on the way.', pt: 'Paramos para tomar um café no caminho.', options: ['to have', 'having', 'have'], answer: 'to have', why: '"Stop + to" = parar para fazer outra coisa.', wrong: { having: '"Stop having" = parar de tomar café.', have: 'Precisa de -ing ou to.' } },
      { id: 'b2u6l8-3', type: 'choice', prompt: 'Complete:', en: 'Remember ___ the door when you leave.', pt: 'Lembre de trancar a porta quando sair.', options: ['to lock', 'locking', 'lock'], answer: 'to lock', why: '"Remember to" = lembrar de fazer (algo no futuro).', wrong: { locking: '"Remember locking" = lembrar de ter trancado (passado).', lock: 'Precisa de "to".' } },
      { id: 'b2u6l8-4', type: 'meaning', en: 'I remember meeting her at a party years ago.', options: ['Eu me lembro de tê-la conhecido numa festa anos atrás.', 'Preciso lembrar de encontrá-la na festa.', 'Vou conhecê-la numa festa.'], answer: 'Eu me lembro de tê-la conhecido numa festa anos atrás.', why: '"Remember + -ing" = lembrar de algo que já aconteceu.' },
      { id: 'b2u6l8-5', type: 'build', pt: 'Tente desligar e ligar de novo.', answer: 'Try turning it off and on again', extra: ['to turning', 'turn'], display: 'Try turning it off and on again.', why: '"Try + -ing" = experimentar fazer (para ver se resolve).' },
      { id: 'b2u6l8-6', type: 'choice', prompt: 'Complete:', en: 'They decided to postpone ___ the house.', pt: 'Eles decidiram adiar a compra da casa.', options: ['buying', 'to buy', 'buy'], answer: 'buying', why: '"Postpone" + -ing.', wrong: { 'to buy': '"Postpone" não aceita "to".', buy: 'Precisa do -ing.' } },
      { id: 'b2u6l8-7', type: 'dialogue', lines: [['A', 'I regret not studying more at school.'], ['B', '___']], options: ["It's never too late. You deserve to try again!", "It's never too late. You deserve trying again!", 'Never late. You deserve try.'], answer: "It's never too late. You deserve to try again!", pt: 'Nunca é tarde. Você merece tentar de novo!', why: '"Deserve" + to + verbo.', wrong: { "It's never too late. You deserve trying again!": '"Deserve" pede "to".', 'Never late. You deserve try.': 'Faltam "it\'s", "too" e "to".' } },
    ] } },
    { after: 'b2-u6-l4', lesson: { id: 'b2-u6-l9', title: 'Ouvindo', items: [
      { id: 'b2u6l9-1', type: 'listen', en: "I'll never forget seeing the sea for the first time.", options: ['Nunca vou esquecer de ter visto o mar pela primeira vez.', 'Esqueci de ver o mar.', 'Vou ver o mar pela primeira vez.'], answer: 'Nunca vou esquecer de ter visto o mar pela primeira vez.', why: '"Forget + -ing" = esquecer algo que já aconteceu.' },
      { id: 'b2u6l9-2', type: 'dictation', en: "Don't forget to call your mother.", why: '"Forget to" = esquecer de fazer.' },
      { id: 'b2u6l9-3', type: 'listen', en: 'She suggested going to the beach.', options: ['Ela sugeriu ir à praia.', 'Ela foi à praia sozinha.', 'Ela não quer ir à praia.'], answer: 'Ela sugeriu ir à praia.', why: '"Suggest" + -ing.' },
      { id: 'b2u6l9-4', type: 'dictation', en: 'I tried to open the window.', why: '"Try to" = tentar (com esforço).' },
      { id: 'b2u6l9-5', type: 'listen', en: 'People tend to spend more in December.', options: ['As pessoas costumam gastar mais em dezembro.', 'As pessoas economizam em dezembro.', 'Dezembro é o mês mais barato.'], answer: 'As pessoas costumam gastar mais em dezembro.', why: '"Tend to" = costumar, ter tendência a.' },
      { id: 'b2u6l9-6', type: 'dictation', en: 'He stopped to answer the phone.', why: '"Stop to" = parar para.' },
      { id: 'b2u6l9-7', type: 'speak', en: 'Remember to lock the door.', pt: 'Lembre de trancar a porta.', why: '"Lock" = trancar.' },
    ] } },
    { after: 'b2-u6-l5', lesson: { id: 'b2-u6-l10', title: 'Lendo: as resoluções de ano-novo',
      story: { title: 'Resoluções de ano-novo', lines: [
        { who: 'Sofia', en: 'Every January I promise to change my life. This year I really want to succeed!', pt: 'Todo janeiro eu prometo mudar de vida. Este ano quero mesmo conseguir!' },
        { who: 'Sofia', en: 'First, I want to stop checking my phone in bed.', pt: 'Primeiro, quero parar de olhar o celular na cama.' },
        { ask: 'Qual é a primeira resolução?', options: ['Parar de olhar o celular na cama', 'Começar a correr', 'Aprender a cozinhar'], answer: 'Parar de olhar o celular na cama', why: '"Stop checking my phone in bed."' },
        { who: 'Sofia', en: 'I tend to postpone ___ exercise, so I joined a gym near my office.', pt: 'Eu costumo adiar os exercícios, então me matriculei numa academia perto do escritório.', gap: { answer: 'doing', options: ['doing', 'to do', 'do'] } },
        { who: 'Sofia', en: 'I also need to remember to drink more water. My doctor suggested having a bottle on my desk.', pt: 'Também preciso lembrar de beber mais água. Minha médica sugeriu deixar uma garrafa na mesa.' },
        { who: 'Sofia', en: "Last year I tried learning the guitar, but I gave up. This time, I won't regret trying!", pt: 'No ano passado experimentei aprender violão, mas desisti. Desta vez, não vou me arrepender de tentar!' },
      ] },
      items: [
        { id: 'b2u6l10-1', type: 'story', why: 'A Sofia conta as resoluções de ano-novo. Repare nos verbos com -ing ou com "to".' },
        { id: 'b2u6l10-2', type: 'quiz', q: 'O que a médica sugeriu?', options: ['Deixar uma garrafa de água na mesa', 'Dormir mais', 'Parar de trabalhar'], answer: 'Deixar uma garrafa de água na mesa', why: '"Suggested having a bottle on my desk."' },
        { id: 'b2u6l10-3', type: 'quiz', q: 'Por que ela entrou numa academia perto do escritório?', options: ['Porque costuma adiar os exercícios', 'Porque é barata', 'Porque o namorado treina lá'], answer: 'Porque costuma adiar os exercícios', why: '"I tend to postpone doing exercise."' },
        { id: 'b2u6l10-4', type: 'quiz', q: 'O que aconteceu com o violão?', options: ['Ela desistiu no ano passado', 'Ela toca muito bem', 'Ela vai começar agora'], answer: 'Ela desistiu no ano passado', why: '"I tried learning the guitar, but I gave up."' },
      ] } },
  ],
});

// ---------- Unidade 7: phrasal verbs ----------
addLessons('b2/unit-07.json', {
  words: [
    ['figure out', 'entender, descobrir'],
    ['carry on', 'continuar'],
    ['bring up', 'mencionar, tocar no assunto; criar (filhos)'],
    ['break down', 'quebrar, enguiçar'],
    ['show up', 'aparecer'],
    ['take off', 'decolar; tirar (roupa)'],
    ['work out', 'malhar; dar certo'],
    ['call off', 'cancelar'],
  ],
  lessons: [
    { after: 'b2-u7-l3', lesson: { id: 'b2-u7-l8', title: 'Mais phrasal verbs', items: [
      { id: 'b2u7l8-1', type: 'match', pairs: [['call off', 'cancelar'], ['show up', 'aparecer'], ['break down', 'enguiçar'], ['carry on', 'continuar']], why: 'Phrasal verb = verbo + partícula, com um sentido novo.' },
      { id: 'b2u7l8-2', type: 'choice', prompt: 'Complete:', en: 'Our car broke ___ on the way to the beach.', pt: 'Nosso carro enguiçou a caminho da praia.', options: ['down', 'up', 'off'], answer: 'down', why: '"Break down" = enguiçar, quebrar (máquina, carro).', wrong: { up: '"Break up" = terminar um namoro.', off: '"Break off" = romper, separar um pedaço.' } },
      { id: 'b2u7l8-3', type: 'choice', prompt: 'Complete:', en: 'The match was called ___ because of the rain.', pt: 'O jogo foi cancelado por causa da chuva.', options: ['off', 'up', 'out'], answer: 'off', why: '"Call off" = cancelar.', wrong: { up: '"Call up" = ligar para alguém.', out: '"Call out" = gritar, chamar em voz alta.' } },
      { id: 'b2u7l8-4', type: 'meaning', en: "I can't figure out how this machine works.", options: ['Não consigo entender como esta máquina funciona.', 'Esta máquina está quebrada.', 'Eu sei consertar máquinas.'], answer: 'Não consigo entender como esta máquina funciona.', why: '"Figure out" = entender, descobrir.' },
      { id: 'b2u7l8-5', type: 'build', pt: 'Ele não apareceu na festa.', answer: "He didn't show up at the party", extra: ['showed', 'in'], display: "He didn't show up at the party.", why: '"Show up" = aparecer. Com "didn\'t", verbo normal.' },
      { id: 'b2u7l8-6', type: 'choice', prompt: 'Complete:', en: "Don't stop! Carry ___ with your story.", pt: 'Não pare! Continue a sua história.', options: ['on', 'off', 'out'], answer: 'on', why: '"Carry on" = continuar.', wrong: { off: '"Carry off" é outra coisa (levar embora).', out: '"Carry out" = realizar, executar.' } },
      { id: 'b2u7l8-7', type: 'dialogue', lines: [['A', 'Why do you look so tired?'], ['B', '___']], options: ['I worked out at the gym for two hours.', 'I worked up at the gym for two hours.', 'I out worked at the gym.'], answer: 'I worked out at the gym for two hours.', pt: 'Malhei na academia por duas horas.', why: '"Work out" = malhar, fazer exercício.', wrong: { 'I worked up at the gym for two hours.': '"Work up" não tem esse sentido.', 'I out worked at the gym.': 'A partícula vem depois do verbo.' } },
    ] } },
    { after: 'b2-u7-l4', lesson: { id: 'b2-u7-l9', title: 'Ouvindo', items: [
      { id: 'b2u7l9-1', type: 'listen', en: 'The plane took off an hour late.', options: ['O avião decolou com uma hora de atraso.', 'O avião pousou cedo.', 'O voo foi cancelado.'], answer: 'O avião decolou com uma hora de atraso.', why: '"Take off" = decolar.' },
      { id: 'b2u7l9-2', type: 'dictation', en: 'Please carry on with your work.', why: '"Carry on" = continuar.' },
      { id: 'b2u7l9-3', type: 'listen', en: 'She was brought up by her grandparents.', options: ['Ela foi criada pelos avós.', 'Ela cuidou dos avós.', 'Ela visitou os avós.'], answer: 'Ela foi criada pelos avós.', why: '"Bring up" = criar (filhos).' },
      { id: 'b2u7l9-4', type: 'dictation', en: "Don't bring up that subject again.", why: '"Bring up" = tocar no assunto.' },
      { id: 'b2u7l9-5', type: 'listen', en: "Don't worry. Everything will work out.", options: ['Não se preocupe. Tudo vai dar certo.', 'Não se preocupe com o trabalho.', 'Vamos malhar juntos.'], answer: 'Não se preocupe. Tudo vai dar certo.', why: '"Work out" também = dar certo.' },
      { id: 'b2u7l9-6', type: 'dictation', en: 'Only three people showed up.', why: '"Show up" = aparecer.' },
      { id: 'b2u7l9-7', type: 'speak', en: 'I finally figured it out!', pt: 'Finalmente entendi!', why: '"Figure it out" = entender, resolver.' },
    ] } },
    { after: 'b2-u7-l5', lesson: { id: 'b2-u7-l10', title: 'Lendo: o casamento quase cancelado',
      story: { title: 'O casamento quase cancelado', lines: [
        { who: 'Julia', en: 'Two days before our wedding, the band called and said they had to call it off.', pt: 'Dois dias antes do nosso casamento, a banda ligou e disse que tinha que cancelar.' },
        { who: 'Julia', en: "Then my brother's car broke down, and he couldn't pick up the cake.", pt: 'Depois o carro do meu irmão enguiçou, e ele não conseguiu buscar o bolo.' },
        { ask: 'O que a banda fez?', options: ['Cancelou', 'Chegou atrasada', 'Pediu mais dinheiro'], answer: 'Cancelou', why: '"They had to call it off."' },
        { who: 'Julia', en: 'I wanted to give up, but my mother said: "Carry ___. We will figure it out."', pt: 'Eu quis desistir, mas minha mãe disse: "Continue. A gente vai resolver."', gap: { answer: 'on', options: ['on', 'off', 'down'] } },
        { who: 'Julia', en: 'My cousin offered to play the guitar, and a neighbour brought the cake in his truck.', pt: 'Meu primo se ofereceu para tocar violão, e um vizinho trouxe o bolo na caminhonete.' },
        { who: 'Julia', en: 'In the end, everyone showed up, and it all worked out perfectly!', pt: 'No fim, todo mundo apareceu, e deu tudo perfeitamente certo!' },
      ] },
      items: [
        { id: 'b2u7l10-1', type: 'story', why: 'A Julia conta como o casamento quase deu errado. Repare nos phrasal verbs.' },
        { id: 'b2u7l10-2', type: 'quiz', q: 'Por que o irmão não buscou o bolo?', options: ['O carro enguiçou', 'Ele esqueceu', 'Estava chovendo'], answer: 'O carro enguiçou', why: '"My brother\'s car broke down."' },
        { id: 'b2u7l10-3', type: 'quiz', q: 'Quem tocou na festa?', options: ['O primo, no violão', 'A banda', 'Ninguém'], answer: 'O primo, no violão', why: '"My cousin offered to play the guitar."' },
        { id: 'b2u7l10-4', type: 'quiz', q: 'Como terminou?', options: ['Deu tudo certo', 'O casamento foi cancelado', 'Ninguém apareceu'], answer: 'Deu tudo certo', why: '"It all worked out perfectly!"' },
      ] } },
  ],
});

// ---------- Unidade 8: argumentar ----------
addLessons('b2/unit-08.json', {
  words: [
    ['on the other hand', 'por outro lado'],
    ['in addition', 'além disso'],
    ['as a result', 'como resultado, por isso'],
    ['in my view', 'na minha visão'],
    ['benefit', 'benefício'],
    ['effect', 'efeito'],
    ['issue', 'questão, problema'],
    ['solution', 'solução'],
  ],
  lessons: [
    { after: 'b2-u8-l3', lesson: { id: 'b2-u8-l8', title: 'Organizando o argumento', items: [
      { id: 'b2u8l8-1', type: 'match', pairs: [['on the other hand', 'por outro lado'], ['in addition', 'além disso'], ['as a result', 'como resultado'], ['therefore', 'portanto']], why: 'Conectores organizam um texto: somar ideias, contrastar e concluir.' },
      { id: 'b2u8l8-2', type: 'choice', prompt: 'Complete:', en: 'Cities offer more jobs. ___, life there is more expensive.', pt: 'As cidades oferecem mais empregos. Por outro lado, a vida lá é mais cara.', options: ['On the other hand', 'In addition', 'As a result'], answer: 'On the other hand', why: '"On the other hand" apresenta o lado oposto.', wrong: { 'In addition': '"In addition" soma uma ideia parecida.', 'As a result': '"As a result" mostra consequência.' } },
      { id: 'b2u8l8-3', type: 'choice', prompt: 'Complete:', en: 'Public transport is cheap. ___, it reduces pollution.', pt: 'O transporte público é barato. Além disso, reduz a poluição.', options: ['In addition', 'Whereas', 'However'], answer: 'In addition', why: '"In addition" = além disso (soma mais um benefício).', wrong: { Whereas: '"Whereas" contrasta duas coisas na mesma frase.', However: '"However" traz uma ideia contrária.' } },
      { id: 'b2u8l8-4', type: 'meaning', en: 'He missed many classes. As a result, he failed the exam.', options: ['Ele faltou a muitas aulas. Por isso, reprovou na prova.', 'Ele foi a todas as aulas e passou.', 'Ele reprovou e depois faltou às aulas.'], answer: 'Ele faltou a muitas aulas. Por isso, reprovou na prova.', why: '"As a result" = como resultado, por isso.' },
      { id: 'b2u8l8-5', type: 'build', pt: 'Na minha visão, o maior benefício é a liberdade.', answer: 'In my view the biggest benefit is freedom', extra: ['on', 'disadvantage'], display: 'In my view, the biggest benefit is freedom.', why: '"In my view" = na minha visão. "Benefit" = benefício.' },
      { id: 'b2u8l8-6', type: 'choice', prompt: 'Complete:', en: 'The main ___ of living alone is feeling lonely.', pt: 'A principal desvantagem de morar sozinho é se sentir solitário.', options: ['disadvantage', 'benefit', 'solution'], answer: 'disadvantage', why: '"Drawback" = desvantagem.', wrong: { benefit: '"Benefit" é o contrário: benefício.', solution: '"Solution" = solução.' } },
      { id: 'b2u8l8-7', type: 'dialogue', lines: [['A', 'Should schools ban phones?'], ['B', '___']], options: ["In my view, yes. On the other hand, they can help with research.", 'In my view, yes. In other hand, they help.', 'My view yes, other hand research.'], answer: "In my view, yes. On the other hand, they can help with research.", pt: 'Na minha visão, sim. Por outro lado, eles podem ajudar na pesquisa.', why: 'Opinião + contraponto: um argumento equilibrado.', wrong: { 'In my view, yes. In other hand, they help.': 'É "ON the other hand".', 'My view yes, other hand research.': 'Frases incompletas.' } },
    ] } },
    { after: 'b2-u8-l4', lesson: { id: 'b2-u8-l9', title: 'Ouvindo', items: [
      { id: 'b2u8l9-1', type: 'listen', en: 'One disadvantage is the cost. On the other hand, it saves time.', options: ['Uma desvantagem é o custo. Por outro lado, economiza tempo.', 'É barato e rápido.', 'Custa caro e demora.'], answer: 'Uma desvantagem é o custo. Por outro lado, economiza tempo.', why: '"Drawback" e "on the other hand".' },
      { id: 'b2u8l9-2', type: 'dictation', en: 'In addition, it is good for your health.', why: '"In addition" = além disso.' },
      { id: 'b2u8l9-3', type: 'listen', en: "There's no easy solution to this issue.", options: ['Não há solução fácil para esta questão.', 'A solução é fácil.', 'Não existe problema nenhum.'], answer: 'Não há solução fácil para esta questão.', why: '"Issue" = questão, problema.' },
      { id: 'b2u8l9-4', type: 'dictation', en: 'Therefore, we need to act now.', why: '"Therefore" = portanto.' },
      { id: 'b2u8l9-5', type: 'listen', en: 'Prices went up. As a result, people bought less.', options: ['Os preços subiram. Por isso, as pessoas compraram menos.', 'Os preços caíram e as pessoas compraram mais.', 'As pessoas compram sempre igual.'], answer: 'Os preços subiram. Por isso, as pessoas compraram menos.', why: '"As a result" = por isso.' },
      { id: 'b2u8l9-6', type: 'dictation', en: 'The benefits are clear.', why: '"Benefits" = benefícios.' },
      { id: 'b2u8l9-7', type: 'speak', en: 'In my view, it is a good idea.', pt: 'Na minha visão, é uma boa ideia.', why: '"In my view" soa como "in-mai-VIÚ".' },
    ] } },
    { after: 'b2-u8-l5', lesson: { id: 'b2-u8-l10', title: 'Lendo: um texto de opinião',
      story: { title: 'Trabalhar quatro dias por semana?', lines: [
        { who: 'Ben', en: 'Some companies are trying a four-day working week. Is it a good idea?', pt: 'Algumas empresas estão testando a semana de quatro dias de trabalho. É uma boa ideia?' },
        { who: 'Ben', en: 'The main benefit is clear: people have more time for their families and hobbies.', pt: 'O principal benefício é claro: as pessoas têm mais tempo para a família e os hobbies.' },
        { ask: 'Qual é o principal benefício, segundo o texto?', options: ['Mais tempo para a família e hobbies', 'Salários maiores', 'Menos trânsito'], answer: 'Mais tempo para a família e hobbies', why: '"More time for their families and hobbies."' },
        { who: 'Ben', en: '___ addition, studies show that rested workers make fewer mistakes.', pt: 'Além disso, estudos mostram que funcionários descansados cometem menos erros.', gap: { answer: 'In', options: ['In', 'On', 'As'] } },
        { who: 'Ben', en: 'On the other hand, some jobs, like hospitals, cannot close for a day. This is a real issue.', pt: 'Por outro lado, alguns trabalhos, como hospitais, não podem fechar um dia. Esta é uma questão real.' },
        { who: 'Ben', en: 'In my view, the benefits are bigger than the disadvantages. Therefore, more companies should try it.', pt: 'Na minha visão, os benefícios são maiores que as desvantagens. Portanto, mais empresas deveriam testar.' },
      ] },
      items: [
        { id: 'b2u8l10-1', type: 'story', why: 'O Ben escreve um texto de opinião. Repare como ele organiza os argumentos com conectores.' },
        { id: 'b2u8l10-2', type: 'quiz', q: 'O que os estudos mostram?', options: ['Funcionários descansados erram menos', 'As pessoas trabalham mais', 'Os salários caem'], answer: 'Funcionários descansados erram menos', why: '"Rested workers make fewer mistakes."' },
        { id: 'b2u8l10-3', type: 'quiz', q: 'Qual é o problema apontado?', options: ['Alguns trabalhos, como hospitais, não podem fechar', 'Ninguém quer trabalhar menos', 'Custa caro demais'], answer: 'Alguns trabalhos, como hospitais, não podem fechar', why: '"Some jobs, like hospitals, cannot close for a day."' },
        { id: 'b2u8l10-4', type: 'quiz', q: 'Qual é a conclusão do Ben?', options: ['Mais empresas deveriam testar', 'A ideia é ruim', 'Só hospitais deveriam testar'], answer: 'Mais empresas deveriam testar', why: '"Therefore, more companies should try it."' },
      ] } },
  ],
});
