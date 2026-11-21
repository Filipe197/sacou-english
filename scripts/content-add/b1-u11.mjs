// Etapa 2 do B1 completo: unidade nova 11 — Deve ser… (dedução no presente: must, might, can't).
// Gera src/content/b1/unit-11.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u11.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u11-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u11l${n}-${k}`, ...o });

writeUnit('b1/unit-11.json', {
  id: 'b1-u11', level: 'B1', order: 11,
  title: 'Deve ser…',
  subtitle: 'Must, might e can\'t: tirar conclusões e fazer suposições.',
  can_do: {
    text: 'Consigo fazer suposições e tirar conclusões sobre o que está acontecendo, com mais ou menos certeza.',
    source: 'CEFR (Conselho da Europa) — Interação oral: especular e expressar certeza ou dúvida, nível B1',
  },
  core_inventory: ['Grammar: modals of deduction — must / might / may / could / can\'t (present)', 'Functions: speculating and drawing conclusions', 'Vocabulary: certainty (certain, probably, obviously)', 'Vocabulary: clues and mysteries'],
  words: [
    ['must be', 'deve ser, deve estar (quase certeza)'],
    ['might / may be', 'pode ser, talvez seja'],
    ["can't be", 'não pode ser (certeza de que não)'],
    ['certain', 'certo(a), com certeza'],
    ['obviously', 'obviamente'],
    ['probably', 'provavelmente'],
    ['possibly', 'possivelmente'],
    ['clue', 'pista'],
    ['mystery', 'mistério'],
    ['detective', 'detetive'],
    ['evidence', 'prova(s), evidência(s)'],
    ['suspect', 'suspeito(a), suspeitar'],
    ['explanation', 'explicação'],
    ['unusual', 'incomum, estranho(a)'],
  ],
  guide: {
    title: 'Deve ser, pode ser, não pode ser',
    intro: 'Quando a gente não tem certeza, mas tem pistas, o inglês usa modal + verbo para mostrar o quanto acredita em algo. É como um "termômetro de certeza".',
    points: [
      { en: "The lights are on. They must be at home.", pt: 'As luzes estão acesas. Eles devem estar em casa.', note: '"Must be" = quase certeza de que SIM (90%).' },
      { en: 'She might be in the garden.', pt: 'Ela pode estar no jardim.', note: '"Might/may/could be" = talvez (50%).' },
      { en: "He can't be hungry. He just ate.", pt: 'Ele não pode estar com fome. Acabou de comer.', note: '"Can\'t be" = quase certeza de que NÃO.' },
      { en: 'You must be tired after the trip.', pt: 'Você deve estar cansado depois da viagem.', note: 'Muito usado para mostrar empatia.' },
      { en: 'It might rain later.', pt: 'Pode chover mais tarde.', note: 'Modal + verbo normal, sem "to".' },
      { en: "It can't be true!", pt: 'Não pode ser verdade!', note: 'O contrário de "must be" é "can\'t be" (e não "mustn\'t be").' },
    ],
    tips: ['"Mustn\'t" é proibição (você não pode). Para dedução negativa, use "can\'t".', 'Depois do modal, verbo sem "to": must be, might know, can\'t be.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Deve ser', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: "He's wearing a uniform. He ___ be a pilot.", pt: 'Ele está de uniforme. Deve ser piloto.', options: ['must', 'can\'t', 'mustn\'t'], answer: 'must', why: 'Pista forte (uniforme): quase certeza = must.', wrong: { "can't": '"Can\'t" seria certeza de que NÃO é.', "mustn't": '"Mustn\'t" é proibição, não dedução.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "You ___ be tired. You worked all day.", pt: 'Você deve estar cansado. Trabalhou o dia todo.', options: ['must', 'might', 'can\'t'], answer: 'must', why: 'Com um bom motivo, use "must": quase certeza.', wrong: { might: '"Might" é dúvida; aqui a razão é forte.', "can't": 'Seria o contrário.' } }),
      I(1, 3, { type: 'meaning', en: "The phone is ringing. It must be my mom.", options: ['O telefone está tocando. Deve ser minha mãe.', 'O telefone tocou. Era minha mãe.', 'Minha mãe precisa ligar.'], answer: 'O telefone está tocando. Deve ser minha mãe.', why: '"Must be" = deve ser (quase certeza).' }),
      I(1, 4, { type: 'listen', en: 'You must be hungry.', options: ['Você deve estar com fome.', 'Você precisa comer.', 'Você não pode estar com fome.'], answer: 'Você deve estar com fome.', why: 'Aqui "must" é dedução, não obrigação.' }),
      I(1, 5, { type: 'build', pt: 'Eles devem estar em casa. As luzes estão acesas.', answer: 'They must be at home. The lights are on', extra: ['mustn\'t', 'is'], display: 'They must be at home. The lights are on.', why: '"Must be" + pista que justifica.' }),
      I(1, 6, { type: 'match', pairs: [['must be', 'deve ser'], ['might be', 'pode ser'], ["can't be", 'não pode ser'], ['clue', 'pista']], why: 'O "termômetro": must (sim, quase certo), might (talvez), can\'t (não, quase certo).' }),
    ]),
    L(2, 'Pode ser', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: "I'm not sure where Leo is. He ___ be at the gym.", pt: 'Não sei onde o Leo está. Ele pode estar na academia.', options: ['might', 'must', "can't"], answer: 'might', why: '"Not sure" = dúvida: might.', wrong: { must: '"Must" é quase certeza; a frase diz "not sure".', "can't": 'Seria certeza de que não está lá.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Take an umbrella. It ___ rain later.', pt: 'Leve um guarda-chuva. Pode chover mais tarde.', options: ['might', 'must', 'should to'], answer: 'might', why: 'Possibilidade: might + verbo.', wrong: { must: 'Ninguém tem certeza da chuva.', 'should to': 'Não existe "should to".' } }),
      I(2, 3, { type: 'meaning', en: "I don't know the answer. It could be the red one.", options: ['Não sei a resposta. Pode ser a vermelha.', 'A resposta é a vermelha.', 'Não pode ser a vermelha.'], answer: 'Não sei a resposta. Pode ser a vermelha.', why: '"Could be" = pode ser (como "might be").' }),
      I(2, 4, { type: 'build', pt: 'Ela talvez saiba o número dele.', answer: 'She might know his number', extra: ['knows', 'to'], display: 'She might know his number.', why: 'Might + verbo normal (know, sem -s).' }),
      I(2, 5, { type: 'listen', en: 'It may be a good idea.', options: ['Pode ser uma boa ideia.', 'É uma ótima ideia.', 'Não é uma boa ideia.'], answer: 'Pode ser uma boa ideia.', why: '"May be" (separado) = pode ser. "Maybe" (junto) = talvez.' }),
      I(2, 6, { type: 'match', pairs: [['probably', 'provavelmente'], ['possibly', 'possivelmente'], ['certain', 'certo'], ['obviously', 'obviamente']], why: 'Do mais certo ao menos certo: obviously, certainly, probably, possibly.' }),
    ]),
    L(3, 'Não pode ser!', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "That ___ be Tom. He's in Japan this week.", pt: 'Esse não pode ser o Tom. Ele está no Japão esta semana.', options: ["can't", "mustn't", 'might'], answer: "can't", why: 'Certeza de que NÃO: can\'t be.', wrong: { "mustn't": '"Mustn\'t" é proibição.', might: '"Might" é talvez; a pista (Japão) dá certeza.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "She ___ be hungry. She's just had lunch.", pt: 'Ela não pode estar com fome. Acabou de almoçar.', options: ["can't", 'must', 'might'], answer: "can't", why: 'A pista mostra que não: can\'t.', wrong: { must: 'Seria o contrário.', might: 'A pista é forte demais para "talvez".' } }),
      I(3, 3, { type: 'meaning', en: "This can't be the right address. It's a park!", options: ['Este não pode ser o endereço certo. É um parque!', 'Este deve ser o endereço certo.', 'O parque tem um endereço.'], answer: 'Este não pode ser o endereço certo. É um parque!', why: '"Can\'t be" = não pode ser.' }),
      I(3, 4, { type: 'build', pt: 'Não pode ser verdade!', answer: "It can't be true", extra: ["mustn't", 'is'], display: "It can't be true!", why: 'Dedução negativa: can\'t be.' }),
      I(3, 5, { type: 'listen', en: "You can't be serious!", options: ['Você não pode estar falando sério!', 'Você precisa falar sério.', 'Você está muito sério.'], answer: 'Você não pode estar falando sério!', why: 'Expressão muito comum de surpresa.' }),
      I(3, 6, { type: 'speak', en: "It can't be true!", pt: 'Não pode ser verdade!', why: '"Can\'t" soa como "KÉNT" (americano) ou "KÁNT" (britânico).' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'Is that man the new teacher?'], ['B', '___']], options: ["He can't be. He looks about fifteen!", "He mustn't be. He looks fifteen.", 'He must not to be.'], answer: "He can't be. He looks about fifteen!", pt: 'Não pode ser. Ele parece ter uns quinze anos!', why: 'Dedução negativa: can\'t be.', wrong: { "He mustn't be. He looks fifteen.": '"Mustn\'t" é proibição.', 'He must not to be.': 'Sem "to" e não é a forma de dedução.' } }),
    ]),
    L(4, 'Prática: o termômetro', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "The car isn't here. They ___ have left already.", pt: 'O carro não está aqui. Eles devem ter saído.', options: ['must', "can't", 'mustn\'t'], answer: 'must', why: 'Deduzir algo que já aconteceu: must have + particípio.', wrong: { "can't": 'A pista (sem carro) indica que saíram.', "mustn't": 'Proibição, não dedução.' } }),
      I(4, 2, { type: 'meaning', en: 'She speaks perfect Portuguese. She must be Brazilian.', options: ['Ela fala português perfeito. Deve ser brasileira.', 'Ela precisa ser brasileira para falar português.', 'Ela não pode ser brasileira.'], answer: 'Ela fala português perfeito. Deve ser brasileira.', why: 'Pista + must = conclusão.' }),
      I(4, 3, { type: 'choice', prompt: 'Qual frase tem MENOS certeza?', en: 'He ___ be at work.', pt: 'Ele talvez esteja no trabalho.', options: ['might', 'must', "can't"], answer: 'might', why: '"Might" = talvez, 50%.', wrong: { must: '"Must" = quase certeza de que sim.', "can't": '"Can\'t" = quase certeza de que não.' } }),
      I(4, 4, { type: 'match', pairs: [['mystery', 'mistério'], ['detective', 'detetive'], ['evidence', 'provas'], ['suspect', 'suspeito']], why: '"Evidence" não tem plural: some evidence.' }),
      I(4, 5, { type: 'build', pt: 'Pode ter uma explicação simples.', answer: 'There might be a simple explanation', extra: ['must', 'explain'], display: 'There might be a simple explanation.', why: '"There might be" = pode haver.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', "Whose bag is this? It's very expensive."], ['B', '___']], options: ["It must be Sofia's. She loves expensive things.", "It must Sofia's.", "It's must be Sofia."], answer: "It must be Sofia's. She loves expensive things.", pt: 'Deve ser da Sofia. Ela adora coisas caras.', why: 'Must be + dono (\'s) + a pista.', wrong: { "It must Sofia's.": 'Falta o "be".', "It's must be Sofia.": 'Sobra o "\'s" do it e falta o \'s da Sofia.' } }),
      I(4, 7, { type: 'listen', en: 'Obviously, the detective found the evidence.', options: ['Obviamente, o detetive encontrou as provas.', 'O detetive não achou nada.', 'O detetive é suspeito.'], answer: 'Obviamente, o detetive encontrou as provas.', why: '"Obviously" = obviamente.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Você deve estar cansado.', answer: 'You must be tired.', why: 'Must be = deve estar (dedução).' }),
      I(5, 2, { type: 'type', pt: 'Pode chover amanhã.', answer: 'It might rain tomorrow.', accept: ['It may rain tomorrow.', 'It could rain tomorrow.'], why: 'Might/may/could + verbo.' }),
      I(5, 3, { type: 'dictation', en: "That can't be right.", why: '"That can\'t be right" = isso não pode estar certo.' }),
      I(5, 4, { type: 'type', pt: 'Ele não pode estar em casa.', answer: "He can't be at home.", accept: ['He cannot be at home.'], why: 'Dedução negativa: can\'t be.' }),
      I(5, 5, { type: 'dictation', en: 'There must be a mistake.', why: '"Mistake" = erro.' }),
      I(5, 6, { type: 'type', pt: 'Ela talvez saiba.', answer: 'She might know.', accept: ['She may know.'], why: 'Might + know (sem -s).' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "Someone's at the door. It might be the delivery.", options: ['Tem alguém na porta. Pode ser a entrega.', 'Ninguém está na porta.', 'A entrega chegou ontem.'], answer: 'Tem alguém na porta. Pode ser a entrega.', why: '"Delivery" = entrega.' }),
      I(6, 2, { type: 'dictation', en: 'They must be on holiday.', why: '"On holiday" = de férias.' }),
      I(6, 3, { type: 'listen', en: "This can't be your size. It's too small.", options: ['Este não pode ser o seu tamanho. É pequeno demais.', 'Este é o seu tamanho.', 'Este tamanho é grande demais.'], answer: 'Este não pode ser o seu tamanho. É pequeno demais.', why: '"Too small" = pequeno demais.' }),
      I(6, 4, { type: 'dictation', en: 'It is probably in the car.', why: '"Probably" = provavelmente.' }),
      I(6, 5, { type: 'listen', en: 'There must be an explanation.', options: ['Deve haver uma explicação.', 'Não tem explicação.', 'Precisa explicar.'], answer: 'Deve haver uma explicação.', why: '"There must be" = deve haver.' }),
      I(6, 6, { type: 'dictation', en: 'That is very unusual.', why: '"Unusual" = incomum.' }),
      I(6, 7, { type: 'speak', en: 'You must be joking!', pt: 'Você deve estar brincando!', why: 'Expressão de surpresa muito comum.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "I've just run ten kilometres!"], ['B', '___']], options: ['Wow! You must be exhausted.', "Wow! You can't be tired.", 'Wow! You must to rest.'], answer: 'Wow! You must be exhausted.', pt: 'Uau! Você deve estar exausto.', why: 'Mostrar empatia com uma dedução: must be.', wrong: { "Wow! You can't be tired.": 'Depois de 10 km, faz sentido estar cansado.', 'Wow! You must to rest.': 'Sem "to" depois de must.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', "Where's my phone? I can't find it."], ['B', '___']], options: ['It might be in your bag.', 'It must to be in your bag.', 'It can be in your bag yesterday.'], answer: 'It might be in your bag.', pt: 'Pode estar na sua bolsa.', why: 'Sugestão com dúvida: might be.', wrong: { 'It must to be in your bag.': 'Sem "to".', 'It can be in your bag yesterday.': '"Yesterday" não combina.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'They said the trip costs only 50 reais.'], ['B', '___']], options: ["That can't be right. It's too cheap!", "That mustn't be right.", 'That must be not right.'], answer: "That can't be right. It's too cheap!", pt: 'Isso não pode estar certo. É barato demais!', why: 'Desconfiança: can\'t be right.', wrong: { "That mustn't be right.": '"Mustn\'t" é proibição.', 'That must be not right.': 'Não se forma assim.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Ana isn\'t answering her phone.'], ['B', '___']], options: ['She might be in a meeting.', 'She might is in a meeting.', 'She might being in a meeting.'], answer: 'She might be in a meeting.', pt: 'Ela pode estar numa reunião.', why: 'Might + be (verbo normal).', wrong: { 'She might is in a meeting.': 'Depois de might, "be".', 'She might being in a meeting.': 'Sem -ing.' } }),
      I(7, 5, { type: 'speak', en: 'You must be tired after the trip.', pt: 'Você deve estar cansado depois da viagem.', why: 'Frase gentil para quem chegou de viagem.' }),
      I(7, 6, { type: 'speak', en: 'It might be a good idea.', pt: 'Pode ser uma boa ideia.', why: '"Might" soa como "MÁIT".' }),
    ]),
    L(8, 'Lendo: o mistério do bolo', [
      I(8, 1, { type: 'story', why: 'Alguém comeu o bolo de aniversário! A Laura faz de detetive em casa. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Por que não pode ter sido o pai?', options: ['Ele está viajando', 'Ele não gosta de bolo', 'Ele estava dormindo'], answer: 'Ele está viajando', why: '"It can\'t be Dad. He\'s been away all week."' }),
      I(8, 3, { type: 'quiz', q: 'Qual foi a pista principal?', options: ['Chocolate no nariz do cachorro', 'Uma pegada na cozinha', 'Um prato sujo no quarto'], answer: 'Chocolate no nariz do cachorro', why: '"There is chocolate on Max\'s nose!"' }),
      I(8, 4, { type: 'quiz', q: 'Quem comeu o bolo?', options: ['O cachorro, Max', 'O irmão da Laura', 'A mãe'], answer: 'O cachorro, Max', why: '"It must be Max!"' }),
    ], {
      title: 'O mistério do bolo',
      lines: [
        { who: 'Laura', en: "Mom's birthday cake has disappeared from the kitchen! Who could it be?", pt: 'O bolo de aniversário da mamãe sumiu da cozinha! Quem poderia ser?' },
        { who: 'Laura', en: "It can't be Dad. He's been away all week.", pt: 'Não pode ser o papai. Ele está viajando a semana toda.' },
        { who: 'Laura', en: 'It ___ be my brother. He loves chocolate, but he was at school.', pt: 'Pode ser meu irmão. Ele adora chocolate, mas estava na escola.', gap: { answer: 'might', options: ['might', 'must', "can't"] } },
        { ask: 'Por que o irmão é suspeito?', options: ['Ele adora chocolate', 'Ele estava em casa', 'Ele tem a chave'], answer: 'Ele adora chocolate', why: '"He loves chocolate."' },
        { who: 'Laura', en: "Wait! There's chocolate on Max's nose, and he looks very happy.", pt: 'Espera! Tem chocolate no nariz do Max, e ele parece muito feliz.' },
        { who: 'Laura', en: "Mystery solved. It must be Max! Bad dog!", pt: 'Mistério resolvido. Deve ter sido o Max! Cachorro feio!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: "Sofia ___ be at the beach. It's raining a lot.", pt: 'A Sofia não pode estar na praia. Está chovendo muito.', options: ["can't", 'must', 'might'], answer: "can't", why: 'A chuva forte dá certeza de que não: can\'t.', wrong: { must: 'Seria o contrário.', might: 'A pista é forte demais para talvez.' } }),
      I(9, 2, { type: 'type', pt: 'Deve haver um erro.', answer: 'There must be a mistake.', why: '"There must be" = deve haver.' }),
      I(9, 3, { type: 'meaning', en: 'He might not come. He has a lot of work.', options: ['Ele talvez não venha. Tem muito trabalho.', 'Ele não pode vir de jeito nenhum.', 'Ele vem com certeza.'], answer: 'Ele talvez não venha. Tem muito trabalho.', why: '"Might not" = talvez não.' }),
      I(9, 4, { type: 'dictation', en: 'You must be very proud.', why: '"Proud" = orgulhoso.' }),
      I(9, 5, { type: 'listen', en: "That can't be the detective. He's too young.", options: ['Esse não pode ser o detetive. Ele é novo demais.', 'Esse deve ser o detetive.', 'O detetive é jovem.'], answer: 'Esse não pode ser o detetive. Ele é novo demais.', why: '"Can\'t be" + pista.' }),
      I(9, 6, { type: 'build', pt: 'Eles talvez estejam atrasados por causa do trânsito.', answer: 'They might be late because of the traffic', extra: ['must', 'to'], display: 'They might be late because of the traffic.', why: '"Because of" = por causa de.' }),
    ]),
    L(10, 'História: o barulho no sótão', [
      I(10, 1, { type: 'story', why: 'O Pedro e a Clara ouvem um barulho estranho em casa à noite. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Por que não pode ser um ladrão, segundo a Clara?', options: ['As portas estão trancadas', 'Eles têm um cachorro', 'A polícia está lá fora'], answer: 'As portas estão trancadas', why: '"All the doors are locked."' }),
      I(10, 3, { type: 'quiz', q: 'Qual é a primeira hipótese do Pedro?', options: ['O vento', 'Um fantasma', 'O vizinho'], answer: 'O vento', why: '"It might be the wind."' }),
      I(10, 4, { type: 'quiz', q: 'O que era o barulho?', options: ['Um gato', 'O vento', 'Um ladrão'], answer: 'Um gato', why: '"It\'s a cat! It must be the neighbour\'s."' }),
    ], {
      title: 'O barulho no sótão',
      lines: [
        { who: 'Clara', en: 'Pedro, did you hear that? There is a strange noise upstairs.', pt: 'Pedro, você ouviu isso? Tem um barulho estranho lá em cima.' },
        { who: 'Pedro', en: "It might be the wind. It's very windy tonight.", pt: 'Pode ser o vento. Está ventando muito hoje.' },
        { who: 'Clara', en: "It ___ be a thief. All the doors are locked.", pt: 'Não pode ser um ladrão. Todas as portas estão trancadas.', gap: { answer: "can't", options: ["can't", 'must', "mustn't"] } },
        { who: 'Pedro', en: "Listen! It sounds like something walking. It must be an animal.", pt: 'Escuta! Parece alguma coisa andando. Deve ser um bicho.' },
        { ask: 'Do que o Pedro desconfia depois?', options: ['De um bicho', 'Da chuva', 'De uma pessoa'], answer: 'De um bicho', why: '"It must be an animal."' },
        { who: 'Clara', en: "Look! It's a cat! It must be the neighbour's. It came in through the window.", pt: 'Olha! É um gato! Deve ser do vizinho. Entrou pela janela.' },
        { who: 'Pedro', en: 'Mystery solved! I told you there was a simple explanation.', pt: 'Mistério resolvido! Eu disse que tinha uma explicação simples.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u11', level: 'B1', unlock: 'b1-u11', title: 'O jogo do detetive',
  intro: 'A Ana descreve uma pessoa misteriosa e o Tom tenta adivinhar quem é.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're playing a detective game!", pt: 'E eu sou o Tom. Hoje vamos jogar um jogo de detetive!' },
    { who: 'ana', en: "I'm thinking of a person. She wears a white coat and works in a hospital.", pt: 'Estou pensando numa pessoa. Ela usa jaleco branco e trabalha num hospital.' },
    { who: 'tom', en: 'She must be a doctor. Or she might be a nurse.', pt: 'Deve ser médica. Ou pode ser enfermeira.' },
    { who: 'ana', en: "Good! She also has a lot of animals in her office.", pt: 'Boa! Ela também tem muitos animais no consultório.' },
    { who: 'tom', en: "Animals? Then she can't be a normal doctor. She must be a vet!", pt: 'Animais? Então não pode ser uma médica normal. Deve ser veterinária!' },
    { who: 'ana', en: "Correct! You're a great detective.", pt: 'Acertou! Você é um ótimo detetive.' },
    { who: 'tom', en: "Ha! That's all for today. Try this game with your friends!", pt: 'Rá! Por hoje é só. Tentem esse jogo com os amigos!' },
    { who: 'ana', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'Qual foi o primeiro palpite do Tom?', options: ['Médica ou enfermeira', 'Professora', 'Detetive'], answer: 'Médica ou enfermeira', why: '"She must be a doctor. Or she might be a nurse."' },
    { q: 'Qual pista mudou o palpite?', options: ['Os animais no consultório', 'O jaleco branco', 'O hospital'], answer: 'Os animais no consultório', why: '"She also has a lot of animals in her office."' },
    { q: 'Qual era a profissão?', options: ['Veterinária', 'Enfermeira', 'Médica de hospital'], answer: 'Veterinária', why: '"She must be a vet!" — "Correct!"' },
  ],
}, 'pod-b1u10');
addScene('b1-u11', 'standing-8', 'magnifier');
