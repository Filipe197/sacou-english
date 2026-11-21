// Etapa 3 do A2 completo: unidade nova 13 — Casa e tarefas (pronomes objeto e possessivos).
// Gera src/content/a2/unit-13.json. Todas as lições levam "added".
// Uso: node scripts/content-add/a2-u13.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u13-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u13l${n}-${k}`, ...o });

writeUnit('a2/unit-13.json', {
  id: 'a2-u13', level: 'A2', order: 13,
  title: 'Casa e tarefas',
  subtitle: 'Dividir as tarefas de casa e dizer de quem é cada coisa.',
  can_do: {
    text: 'Consigo combinar as tarefas de casa com outras pessoas e dizer de quem são as coisas.',
    source: 'CEFR (Conselho da Europa) — Interação oral: combinar o que fazer e dividir tarefas, nível A2',
  },
  core_inventory: ['Topics: home and housework', 'Grammar: object pronouns (me, him, her, us, them)', 'Grammar: possessive pronouns (mine, yours, his, hers, ours, theirs)', 'Grammar: Whose...?'],
  words: [
    ['do the dishes', 'lavar a louça'],
    ['make the bed', 'arrumar a cama'],
    ['take out the garbage', 'tirar o lixo'],
    ['tidy', 'arrumar, organizar'],
    ['share', 'dividir, compartilhar'],
    ['turn', 'vez (é a sua vez)'],
    ['fair', 'justo(a)'],
    ['lazy', 'preguiçoso(a)'],
    ['mine / yours', 'meu, minha / seu, sua (sem a coisa depois)'],
    ['his / hers', 'dele / dela (sem a coisa depois)'],
    ['ours / theirs', 'nosso(a) / deles, delas (sem a coisa depois)'],
    ['whose', 'de quem'],
    ['them', 'eles, elas, os, as (depois do verbo)'],
    ['us', 'nos, a gente (depois do verbo)'],
  ],
  guide: {
    title: 'Tarefas de casa: de quem é a vez?',
    intro: 'Para dividir as tarefas, você vai usar os pronomes que vêm DEPOIS do verbo (me, him, her, us, them) e os que substituem a coisa (mine, yours, his, hers...). Eles evitam repetir palavras.',
    points: [
      { en: 'Can you help me?', pt: 'Você pode me ajudar?', note: 'Depois do verbo: me, you, him, her, it, us, them. Nunca "help I".' },
      { en: 'I called them yesterday.', pt: 'Liguei para eles ontem.', note: '"Them" = eles, elas, os, as, depois do verbo.' },
      { en: 'This bag is mine.', pt: 'Esta bolsa é minha.', note: '"Mine" substitui "my bag". Não vem nada depois: mine (e não "mine bag").' },
      { en: 'Is this phone yours or his?', pt: 'Este celular é seu ou dele?', note: 'mine, yours, his, hers, ours, theirs: os possessivos "sozinhos".' },
      { en: 'Whose turn is it?', pt: 'De quem é a vez?', note: '"Whose" = de quem. "Turn" = vez.' },
      { en: "It's your turn to do the dishes.", pt: 'É a sua vez de lavar a louça.', note: '"Do the dishes" = lavar a louça.' },
    ],
    tips: ['"My" e "your" vêm antes da coisa (my bag); "mine" e "yours" ficam no lugar dela (it\'s mine).', '"Its" (dele, de uma coisa) não tem apóstrofo. "It\'s" é "it is".'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'As tarefas', [
      I(1, 1, { type: 'match', pairs: [['do the dishes', 'lavar a louça'], ['make the bed', 'arrumar a cama'], ['take out the garbage', 'tirar o lixo'], ['cook dinner', 'fazer o jantar']], why: 'Em inglês a louça a gente "faz" (do the dishes) e a cama a gente "faz" (make the bed).' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'I always ___ my bed in the morning.', pt: 'Eu sempre arrumo minha cama de manhã.', options: ['make', 'do', 'clean'], answer: 'make', why: 'Arrumar a cama = make the bed.', wrong: { do: '"Do the bed" não existe.', clean: '"Clean" é limpar, não arrumar a cama.' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'Who is going to ___ the dishes?', pt: 'Quem vai lavar a louça?', options: ['do', 'make', 'wash up'], answer: 'do', why: 'Lavar a louça = do the dishes.', wrong: { make: '"Make the dishes" seria fazer os pratos (de cerâmica)!', 'wash up': '"Wash up" existe, mas sem "the dishes" depois.' } }),
      I(1, 4, { type: 'meaning', en: 'My brother never tidies his room. He is so lazy!', options: ['Meu irmão nunca arruma o quarto dele. Ele é muito preguiçoso!', 'Meu irmão sempre arruma o quarto. Ele é muito organizado!', 'Meu irmão divide o quarto comigo.'], answer: 'Meu irmão nunca arruma o quarto dele. Ele é muito preguiçoso!', why: '"Tidy" = arrumar. "Lazy" = preguiçoso.' }),
      I(1, 5, { type: 'listen', en: 'Can you take out the garbage?', options: ['Você pode tirar o lixo?', 'Você pode lavar a louça?', 'Você pode limpar o jardim?'], answer: 'Você pode tirar o lixo?', why: '"Take out the garbage" = tirar o lixo. No Reino Unido: "take out the rubbish".' }),
      I(1, 6, { type: 'build', pt: 'A gente divide as tarefas de casa.', answer: 'We share the jobs in the house', extra: ['shares', 'at'], display: 'We share the jobs in the house.', why: '"Share" = dividir. "Jobs in the house" = tarefas de casa.' }),
    ]),
    L(2, 'Me ajuda?', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'Can you help ___ with the dishes?', pt: 'Você pode me ajudar com a louça?', options: ['me', 'I', 'my'], answer: 'me', why: 'Depois do verbo (help), use "me".', wrong: { I: '"I" vem antes do verbo (quem faz).', my: '"My" vem antes de uma coisa (my bag).' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Where are my keys? I can\'t find ___.', pt: 'Cadê minhas chaves? Não consigo achá-las.', options: ['them', 'they', 'it'], answer: 'them', why: '"Keys" é plural; depois do verbo: them.', wrong: { they: '"They" vem antes do verbo.', it: '"It" é para uma coisa só.' } }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: 'Julia is very nice. I like ___ a lot.', pt: 'A Julia é muito legal. Gosto muito dela.', options: ['her', 'she', 'hers'], answer: 'her', why: 'Depois do verbo, "ela" vira "her".', wrong: { she: '"She" vem antes do verbo.', hers: '"Hers" = dela (de quem é).' } }),
      I(2, 4, { type: 'match', pairs: [['me', 'me, mim'], ['him', 'o, ele (depois do verbo)'], ['us', 'nos, a gente'], ['them', 'os, as, eles']], why: 'I → me, he → him, we → us, they → them. You e it não mudam.' }),
      I(2, 5, { type: 'build', pt: 'Minha mãe ligou para nós ontem.', answer: 'My mom called us yesterday', extra: ['we', 'our'], display: 'My mom called us yesterday.', why: 'Depois do verbo, "nós" vira "us".' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'Where is Tom?'], ['B', '___']], options: ["I don't know. I didn't see him.", "I don't know. I didn't see he.", "I don't know. I didn't see his."], answer: "I don't know. I didn't see him.", pt: 'Não sei. Não o vi.', why: 'Depois do verbo, "ele" vira "him".', wrong: { "I don't know. I didn't see he.": '"He" vem antes do verbo.', "I don't know. I didn't see his.": '"His" = dele (posse).' } }),
    ]),
    L(3, 'De quem é?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "That isn't your cup. It's ___.", pt: 'Essa não é a sua xícara. É a minha.', options: ['mine', 'my', 'me'], answer: 'mine', why: '"Mine" fica no lugar de "my cup".', wrong: { my: '"My" precisa de algo depois: my cup.', me: '"Me" vem depois do verbo (help me).' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: '___ jacket is this?', pt: 'De quem é esta jaqueta?', options: ['Whose', 'Who', "Who's"], answer: 'Whose', why: '"Whose" = de quem.', wrong: { Who: '"Who" = quem (sem posse).', "Who's": '"Who\'s" = who is. Soa igual, mas é outra coisa.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: 'Is this bag Ana\'s? — Yes, it\'s ___.', pt: 'Esta bolsa é da Ana? — É, é dela.', options: ['hers', 'her', 'his'], answer: 'hers', why: 'De uma mulher, sem nada depois: hers.', wrong: { her: '"Her" precisa de algo depois: her bag.', his: '"His" é de um homem.' } }),
      I(3, 4, { type: 'match', pairs: [['mine', 'meu'], ['yours', 'seu'], ['ours', 'nosso'], ['theirs', 'deles']], why: 'Quase todos terminam em -s (yours, hers, ours, theirs). A exceção é "mine".' }),
      I(3, 5, { type: 'meaning', en: 'The blue car is ours, and the red one is theirs.', options: ['O carro azul é nosso, e o vermelho é deles.', 'O carro azul é deles, e o vermelho é nosso.', 'Os dois carros são nossos.'], answer: 'O carro azul é nosso, e o vermelho é deles.', why: '"Ours" = nosso. "Theirs" = deles.' }),
      I(3, 6, { type: 'build', pt: 'Este celular é seu ou dele?', answer: 'Is this phone yours or his', extra: ['your', 'him'], display: 'Is this phone yours or his?', why: 'Possessivos sozinhos no fim: yours, his.' }),
      I(3, 7, { type: 'speak', en: "Whose turn is it?", pt: 'De quem é a vez?', why: '"Whose" soa como "RÚUZ", igual a "who\'s".' }),
    ]),
    L(4, 'Prática: é justo?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "It's your ___ to cook dinner.", pt: 'É a sua vez de fazer o jantar.', options: ['turn', 'time', 'fair'], answer: 'turn', why: '"Your turn" = sua vez.', wrong: { time: '"It\'s time to cook" = está na hora de cozinhar.', fair: '"Fair" = justo.' } }),
      I(4, 2, { type: 'meaning', en: "That's not fair! I did it yesterday.", options: ['Não é justo! Eu fiz ontem.', 'Que legal! Eu fiz ontem.', 'Não está pronto! Eu faço amanhã.'], answer: 'Não é justo! Eu fiz ontem.', why: '"Fair" = justo. "That\'s not fair!" = não é justo!' }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'These books are not ___. They are my sister\'s.', pt: 'Estes livros não são meus. São da minha irmã.', options: ['mine', 'my', 'I'], answer: 'mine', why: 'Sem nada depois: mine.', wrong: { my: 'Precisaria de algo depois: my books.', I: '"I" é quem faz.' } }),
      I(4, 4, { type: 'dialogue', lines: [['A', 'Whose shoes are these?'], ['B', '___']], options: ["They're Pedro's.", "They're Pedro.", "It's Pedro."], answer: "They're Pedro's.", pt: 'São do Pedro.', why: '"\'s" depois do nome mostra o dono: Pedro\'s = do Pedro. "Shoes" é plural: they\'re.', wrong: { "They're Pedro.": 'Sem o \'s, diria que os sapatos SÃO o Pedro.', "It's Pedro.": 'Sapatos são plural, e falta o \'s.' } }),
      I(4, 5, { type: 'build', pt: 'Você pode lavar a louça hoje? Eu vou tirar o lixo.', answer: "Can you do the dishes today? I'll take out the garbage", extra: ['make', 'him'], display: "Can you do the dishes today? I'll take out the garbage.", why: 'Dividindo tarefas: "Can you...?" e "I\'ll..." (eu vou, decidindo na hora).' }),
      I(4, 6, { type: 'listen', en: 'Our neighbours are nice. We visit them on Sundays.', options: ['Nossos vizinhos são legais. A gente visita eles aos domingos.', 'Nossos vizinhos visitam a gente aos domingos.', 'A gente não conhece os vizinhos.'], answer: 'Nossos vizinhos são legais. A gente visita eles aos domingos.', why: '"Visit them" = visitar eles.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'We cleaned the house, so the dinner is on ___!', pt: 'A gente limpou a casa, então o jantar é por conta de vocês!', options: ['you', 'your', 'yours'], answer: 'you', why: '"It\'s on you" = é por sua conta (você paga ou faz). Depois de preposição: you.', wrong: { your: '"Your" precisa de algo depois.', yours: 'Não se usa aqui.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Você pode me ajudar?', answer: 'Can you help me?', why: 'Depois do verbo: me.' }),
      I(5, 2, { type: 'type', pt: 'Esta bolsa é minha.', answer: 'This bag is mine.', why: '"Mine" no lugar de "my bag".' }),
      I(5, 3, { type: 'dictation', en: 'It is your turn.', why: '"Your turn" = a sua vez. "Turn" soa como "TÂRN".' }),
      I(5, 4, { type: 'type', pt: 'De quem é este carro?', answer: 'Whose car is this?', why: '"Whose" + coisa + is this?' }),
      I(5, 5, { type: 'dictation', en: 'I always make my bed.', why: '"Make the bed" = arrumar a cama.' }),
      I(5, 6, { type: 'type', pt: 'Eu lavo a louça todos os dias.', answer: 'I do the dishes every day.', why: '"Do the dishes" = lavar a louça.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "That's not mine. It's hers.", options: ['Isso não é meu. É dela.', 'Isso é meu, não dela.', 'Isso não é dela. É dele.'], answer: 'Isso não é meu. É dela.', why: '"Mine" = meu. "Hers" = dela.' }),
      I(6, 2, { type: 'dictation', en: 'Can you help us?', why: '"Us" = nos, a gente.' }),
      I(6, 3, { type: 'listen', en: "Whose turn is it to take out the garbage?", options: ['De quem é a vez de tirar o lixo?', 'Quem tirou o lixo ontem?', 'Onde fica o lixo?'], answer: 'De quem é a vez de tirar o lixo?', why: '"Whose turn" = de quem é a vez.' }),
      I(6, 4, { type: 'dictation', en: "I can't find them.", why: '"Them" = eles, elas, os, as.' }),
      I(6, 5, { type: 'listen', en: 'My sister and I share a room.', options: ['Eu e minha irmã dividimos um quarto.', 'Minha irmã tem um quarto grande.', 'Eu e minha irmã limpamos o quarto.'], answer: 'Eu e minha irmã dividimos um quarto.', why: '"Share" = dividir.' }),
      I(6, 6, { type: 'dictation', en: 'The red car is theirs.', why: '"Theirs" soa como "DÉRZ".' }),
      I(6, 7, { type: 'speak', en: "It's your turn to do the dishes.", pt: 'É a sua vez de lavar a louça.', why: '"Dishes" soa como "DÍ-xiz".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Can you do the dishes tonight?'], ['B', '___']], options: ['Sure. Can you take out the garbage?', 'Sure. Can you take out the garbage me?', 'Sure. I can do they.'], answer: 'Sure. Can you take out the garbage?', pt: 'Claro. Você pode tirar o lixo?', why: 'Aceite e divida: "Sure. Can you...?"', wrong: { 'Sure. Can you take out the garbage me?': '"Me" sobrando no fim.', 'Sure. I can do they.': '"They" não vem depois do verbo; seria "them".' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Is this your phone?'], ['B', '___']], options: ["No, it isn't mine. Maybe it's Leo's.", "No, it isn't my. Maybe it's Leo.", "No, it isn't me. Maybe it's Leo's."], answer: "No, it isn't mine. Maybe it's Leo's.", pt: 'Não, não é meu. Talvez seja do Leo.', why: '"Mine" sozinho; "Leo\'s" = do Leo.', wrong: { "No, it isn't my. Maybe it's Leo.": '"My" precisa de algo depois, e falta o \'s no Leo.', "No, it isn't me. Maybe it's Leo's.": '"It isn\'t me" = não sou eu.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "I cooked yesterday and the day before. It's not fair!"], ['B', '___']], options: ["You're right. I'll cook today.", "You're right. I cooked today yesterday.", 'You right. Me cook today.'], answer: "You're right. I'll cook today.", pt: 'Você tem razão. Eu cozinho hoje.', why: '"You\'re right" = você tem razão. "I\'ll" = decisão na hora.', wrong: { "You're right. I cooked today yesterday.": 'Não faz sentido.', 'You right. Me cook today.': 'Falta "are" e "me" não começa frase.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Whose jacket is this?'], ['B', '___']], options: ["It's Sofia's. I'll give it to her.", "It's Sofia. I'll give it to she.", "It's Sofia's. I'll give her to it."], answer: "It's Sofia's. I'll give it to her.", pt: 'É da Sofia. Vou entregar para ela.', why: '"Give it to her" = entregar (isso) para ela.', wrong: { "It's Sofia. I'll give it to she.": 'Falta o \'s e "she" não vem depois de "to".', "It's Sofia's. I'll give her to it.": 'Ordem trocada: give IT to HER.' } }),
      I(7, 5, { type: 'speak', en: 'Can you help me, please?', pt: 'Você pode me ajudar, por favor?', why: '"Help me" soa quase junto: "RÉL-pmi".' }),
      I(7, 6, { type: 'speak', en: "That's not fair!", pt: 'Não é justo!', why: '"Fair" soa como "FÉR".' }),
    ]),
    L(8, 'Lendo: o quadro de tarefas', [
      I(8, 1, { type: 'story', why: 'A família do Lucas tem um quadro com as tarefas da semana. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Quem lava a louça durante a semana?', options: ['O pai', 'A mãe', 'O Lucas'], answer: 'O pai', why: '"Dad does the dishes from Monday to Friday."' }),
      I(8, 3, { type: 'quiz', q: 'Qual é a tarefa do Lucas?', options: ['Tirar o lixo e arrumar o quarto', 'Cozinhar', 'Lavar a louça'], answer: 'Tirar o lixo e arrumar o quarto', why: '"Lucas takes out the garbage and tidies his room."' }),
      I(8, 4, { type: 'quiz', q: 'O que acontece no domingo?', options: ['Todos limpam a casa juntos', 'Ninguém faz nada', 'Eles comem fora'], answer: 'Todos limpam a casa juntos', why: '"On Sundays we all clean the house together."' }),
    ], {
      title: 'O quadro de tarefas',
      lines: [
        { who: 'Lucas', en: 'In our house, we share the jobs. Mom made a list for us.', pt: 'Na nossa casa, a gente divide as tarefas. A mãe fez uma lista para nós.' },
        { who: 'Lucas', en: 'Dad does the dishes from Monday to Friday.', pt: 'O pai lava a louça de segunda a sexta.' },
        { ask: 'Quem fez a lista?', options: ['A mãe', 'O pai', 'O Lucas'], answer: 'A mãe', why: '"Mom made a list for us."' },
        { who: 'Lucas', en: 'Mom cooks dinner. My sister makes the beds, ___ and mine.', pt: 'A mãe faz o jantar. Minha irmã arruma as camas, a dela e a minha.', gap: { answer: 'hers', options: ['hers', 'her', 'she'] } },
        { who: 'Lucas', en: 'I take out the garbage and tidy my room. It is fair!', pt: 'Eu tiro o lixo e arrumo meu quarto. É justo!' },
        { who: 'Lucas', en: 'On Sundays we all clean the house together. Then Dad takes us out for pizza!', pt: 'Aos domingos todo mundo limpa a casa junto. Depois o pai leva a gente para comer pizza!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'These are my parents. I love ___.', pt: 'Estes são meus pais. Eu os amo.', options: ['them', 'they', 'their'], answer: 'them', why: 'Depois do verbo: them.', wrong: { they: '"They" vem antes do verbo.', their: '"Their" precisa de algo depois.' } }),
      I(9, 2, { type: 'type', pt: 'Este livro é seu?', answer: 'Is this book yours?', why: '"Yours" no fim, sozinho.' }),
      I(9, 3, { type: 'meaning', en: "Our house is smaller than theirs, but ours has a garden.", options: ['Nossa casa é menor que a deles, mas a nossa tem jardim.', 'A casa deles é menor que a nossa.', 'As duas casas têm jardim.'], answer: 'Nossa casa é menor que a deles, mas a nossa tem jardim.', why: '"Theirs" = a deles. "Ours" = a nossa.' }),
      I(9, 4, { type: 'dictation', en: 'Whose keys are these?', why: '"Whose" = de quem.' }),
      I(9, 5, { type: 'listen', en: "Don't be lazy. Make your bed!", options: ['Não seja preguiçoso. Arrume sua cama!', 'Não esteja cansado. Vá para a cama!', 'Não faça sua cama.'], answer: 'Não seja preguiçoso. Arrume sua cama!', why: '"Lazy" = preguiçoso. "Make your bed" = arrume sua cama.' }),
      I(9, 6, { type: 'build', pt: 'Ela sempre nos ajuda com a casa.', answer: 'She always helps us with the house', extra: ['we', 'our'], display: 'She always helps us with the house.', why: 'Depois do verbo: us.' }),
    ]),
    L(10, 'História: a casa nova da Sofia', [
      I(10, 1, { type: 'story', why: 'A Sofia e a Clara acabaram de dividir um apartamento. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'De quem é a caneca azul?', options: ['Da Clara', 'Da Sofia', 'Da mãe da Sofia'], answer: 'Da Clara', why: '"Is this blue cup yours?" — "Yes, it\'s mine."' }),
      I(10, 3, { type: 'quiz', q: 'Como elas vão dividir a louça?', options: ['Cada uma lava num dia', 'A Sofia lava sempre', 'Ninguém lava'], answer: 'Cada uma lava num dia', why: '"You do the dishes today and I do them tomorrow."' }),
      I(10, 4, { type: 'quiz', q: 'O que a Clara vai fazer agora?', options: ['Tirar o lixo', 'Cozinhar', 'Arrumar a cama'], answer: 'Tirar o lixo', why: '"I\'ll take out the garbage now."' }),
    ], {
      title: 'A casa nova da Sofia',
      lines: [
        { who: 'Sofia', en: 'OK, Clara. We have a lot of boxes. Is this blue cup yours?', pt: 'Bom, Clara. Temos muitas caixas. Esta caneca azul é sua?' },
        { who: 'Clara', en: "Yes, it's ___. And the big plates are my mom's.", pt: 'É, é minha. E os pratos grandes são da minha mãe.', gap: { answer: 'mine', options: ['mine', 'my', 'me'] } },
        { who: 'Sofia', en: "Let's talk about the jobs in the house. It's important to be fair.", pt: 'Vamos falar das tarefas de casa. É importante ser justo.' },
        { who: 'Clara', en: 'Good idea. You do the dishes today and I do them tomorrow.', pt: 'Boa ideia. Você lava a louça hoje e eu lavo amanhã.' },
        { ask: 'O que elas querem que a divisão seja?', options: ['Justa', 'Rápida', 'Engraçada'], answer: 'Justa', why: '"It\'s important to be fair."' },
        { who: 'Sofia', en: "Perfect. And whose turn is it to take out the garbage?", pt: 'Perfeito. E de quem é a vez de tirar o lixo?' },
        { who: 'Clara', en: "Mine! I'll take out the garbage now.", pt: 'Minha! Vou tirar o lixo agora.' },
        { who: 'Sofia', en: "Thank you! I think we're going to be great flat friends!", pt: 'Obrigada! Acho que a gente vai ser ótima dividindo o apê!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u13', level: 'A2', unlock: 'a2-u13', title: 'Quem lava a louça?',
  intro: 'A Ana e o Tom contam como dividem as tarefas de casa.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're talking about jobs in the house.", pt: 'E eu sou o Tom. Hoje vamos falar das tarefas de casa.' },
    { who: 'ana', en: 'Tom, do you share the jobs with your family?', pt: 'Tom, você divide as tarefas com a sua família?' },
    { who: 'tom', en: 'Yes. My wife cooks, and I do the dishes. It is fair.', pt: 'Sim. Minha esposa cozinha e eu lavo a louça. É justo.' },
    { who: 'ana', en: "I live with my sister. She's very tidy, but I'm a bit lazy.", pt: 'Eu moro com a minha irmã. Ela é muito organizada, mas eu sou meio preguiçosa.' },
    { who: 'tom', en: 'Ha! Does she help you?', pt: 'Rá! Ela te ajuda?' },
    { who: 'ana', en: "Yes, but she always says: 'Ana, it's your turn!'", pt: 'Ajuda, mas ela sempre diz: "Ana, é a sua vez!"' },
    { who: 'tom', en: 'And whose turn is it today?', pt: 'E de quem é a vez hoje?' },
    { who: 'ana', en: "Mine. I have to take out the garbage! That's all for today.", pt: 'Minha. Tenho que tirar o lixo! Por hoje é só.' },
    { who: 'tom', en: 'Bye! Thank you for listening!', pt: 'Tchau! Obrigado por ouvir!' },
  ],
  questions: [
    { q: 'O que o Tom faz em casa?', options: ['Lava a louça', 'Cozinha', 'Tira o lixo'], answer: 'Lava a louça', why: '"I do the dishes."' },
    { q: 'Como é a irmã da Ana?', options: ['Muito organizada', 'Preguiçosa', 'Bagunceira'], answer: 'Muito organizada', why: '"She\'s very tidy."' },
    { q: 'O que a Ana precisa fazer hoje?', options: ['Tirar o lixo', 'Lavar a louça', 'Cozinhar'], answer: 'Tirar o lixo', why: '"I have to take out the garbage!"' },
  ],
}, 'pod-a2u12');
addScene('a2-u13', 'standing-14', 'house');
