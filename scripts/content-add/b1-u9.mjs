// Etapa 2 do B1 completo: unidade nova 9 — Faz tempo que… (present perfect continuous).
// Gera src/content/b1/unit-09.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u9.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u9-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u9l${n}-${k}`, ...o });

writeUnit('b1/unit-09.json', {
  id: 'b1-u9', level: 'B1', order: 9,
  title: 'Faz tempo que…',
  subtitle: 'Present perfect continuous: o que você vem fazendo e há quanto tempo.',
  can_do: {
    text: 'Consigo dizer há quanto tempo venho fazendo algo e explicar por que estou cansado, sujo ou atrasado.',
    source: 'CEFR (Conselho da Europa) — Produção oral: descrever experiências e atividades em andamento, nível B1',
  },
  core_inventory: ['Grammar: present perfect continuous (have been + -ing)', 'Grammar: present perfect simple vs continuous', 'Functions: talking about duration (How long have you been...?)', 'Vocabulary: hobbies, training and effort'],
  words: [
    ['have been doing', 'venho fazendo, estou fazendo há'],
    ['how long', 'há quanto tempo'],
    ['lately', 'ultimamente'],
    ['exhausted', 'exausto(a), esgotado(a)'],
    ['training', 'treino, treinamento'],
    ['practise', 'praticar, treinar'],
    ['sweat', 'suar, suor'],
    ['breath', 'fôlego, respiração'],
    ['gardening', 'jardinagem'],
    ['patience', 'paciência'],
    ['nap', 'cochilo, tirar um cochilo'],
    ['paint', 'pintar, tinta'],
  ],
  guide: {
    title: 'Venho fazendo: o present perfect continuous',
    intro: 'Para dizer há quanto tempo uma ação está acontecendo (e ainda continua), o inglês usa "have been + -ing". Em português a gente diz "faz duas horas que eu espero" ou "estou esperando há duas horas".',
    points: [
      { en: "I've been waiting for two hours.", pt: 'Estou esperando há duas horas.', note: 'Have/has + been + verbo com -ing. A ação começou no passado e continua agora.' },
      { en: 'How long have you been learning English?', pt: 'Há quanto tempo você estuda inglês?', note: '"How long have you been + -ing?" = há quanto tempo você...?' },
      { en: "She's been working here since 2020.", pt: 'Ela trabalha aqui desde 2020.', note: '"Since" + ponto de início; "for" + período (for two years).' },
      { en: "You're wet! Have you been running?", pt: 'Você está molhado! Estava correndo?', note: 'Também explica um resultado que dá para ver agora (molhado, cansado, sujo).' },
      { en: "I've read three books this month.", pt: 'Li três livros este mês.', note: 'Para dizer QUANTO você fez (um resultado contado), use o present perfect simples.' },
      { en: "I've been reading a lot lately.", pt: 'Tenho lido muito ultimamente.', note: 'Para a atividade em si, que continua, use o continuous.' },
    ],
    tips: ['Verbos de estado (know, like, want, have no sentido de possuir) não vão no continuous: "I\'ve known her for years" (e não "I\'ve been knowing").', '"Been" soa como "BIN" na fala rápida: "aiv-bin-UÊI-tin".'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Há quanto tempo?', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: "I've been ___ for the bus for twenty minutes.", pt: 'Estou esperando o ônibus há vinte minutos.', options: ['waiting', 'wait', 'waited'], answer: 'waiting', why: 'Have been + verbo com -ing.', wrong: { wait: 'Depois de "been" vem o -ing.', waited: '"Have been waited" é outra estrutura (passiva).' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'How long ___ you been living here?', pt: 'Há quanto tempo você mora aqui?', options: ['have', 'are', 'did'], answer: 'have', why: 'Pergunta: How long + have + you + been + -ing.', wrong: { are: '"Are you been" não existe.', did: '"Did" não forma este tempo.' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'She has been studying ___ three hours.', pt: 'Ela está estudando há três horas.', options: ['for', 'since', 'ago'], answer: 'for', why: '"For" + período: for three hours.', wrong: { since: '"Since" precisa de um ponto: since 9 o\'clock.', ago: '"Ago" vai com o passado simples.' } }),
      I(1, 4, { type: 'meaning', en: "We've been practising since Monday.", options: ['A gente vem treinando desde segunda.', 'A gente treinou na segunda.', 'A gente vai treinar na segunda.'], answer: 'A gente vem treinando desde segunda.', why: '"Since Monday" = desde segunda. A ação continua.' }),
      I(1, 5, { type: 'listen', en: "I've been learning English for a year.", options: ['Estudo inglês há um ano.', 'Estudei inglês por um ano.', 'Vou estudar inglês por um ano.'], answer: 'Estudo inglês há um ano.', why: 'Present perfect continuous: estudo há um ano (e continuo).' }),
      I(1, 6, { type: 'build', pt: 'Há quanto tempo vocês estão esperando?', answer: 'How long have you been waiting', extra: ['are', 'wait'], display: 'How long have you been waiting?', why: 'How long + have + you + been + -ing.' }),
    ]),
    L(2, 'Dá para ver!', [
      I(2, 1, { type: 'match', pairs: [['exhausted', 'exausto'], ['sweat', 'suar'], ['breath', 'fôlego'], ['nap', 'cochilo']], why: '"Out of breath" = sem fôlego. "Take a nap" = tirar um cochilo.' }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "You look exhausted. What have you been ___?", pt: 'Você parece exausto. O que você andou fazendo?', options: ['doing', 'do', 'did'], answer: 'doing', why: 'Explicando um resultado que dá para ver: have been + -ing.', wrong: { do: 'Precisa do -ing.', did: 'Depois de "been", -ing.' } }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: "Sorry, I'm out of breath. I've been ___.", pt: 'Desculpa, estou sem fôlego. Estava correndo.', options: ['running', 'run', 'ran'], answer: 'running', why: 'A causa do cansaço: I\'ve been running.', wrong: { run: 'Precisa do -ing.', ran: '"Been ran" não existe.' } }),
      I(2, 4, { type: 'meaning', en: "Your hands are dirty. Have you been gardening?", options: ['Suas mãos estão sujas. Você estava mexendo no jardim?', 'Suas mãos estão limpas. Você lavou?', 'Você gosta de jardinagem?'], answer: 'Suas mãos estão sujas. Você estava mexendo no jardim?', why: '"Gardening" = jardinagem. A pergunta explica a sujeira.' }),
      I(2, 5, { type: 'build', pt: 'Ela está suando porque esteve treinando.', answer: "She's sweating because she has been training", extra: ['sweat', 'trained'], display: "She's sweating because she has been training.", why: 'O resultado agora (sweating) e a causa (has been training).' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'Why are your clothes covered in paint?'], ['B', '___']], options: ["I've been painting my bedroom.", 'I painted my bedroom next week.', "I'm been painting my bedroom."], answer: "I've been painting my bedroom.", pt: 'Estive pintando meu quarto.', why: 'Atividade recente que explica a tinta na roupa.', wrong: { 'I painted my bedroom next week.': '"Next week" é futuro.', "I'm been painting my bedroom.": 'É "I\'ve been", com have.' } }),
    ]),
    L(3, 'Simples ou contínuo?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: "I've ___ three emails this morning.", pt: 'Escrevi três e-mails hoje de manhã.', options: ['written', 'been writing', 'writing'], answer: 'written', why: 'Quantidade terminada (três e-mails): present perfect simples.', wrong: { 'been writing': 'O continuous não combina com número de coisas prontas.', writing: 'Falta o "been".' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: "I've ___ emails all morning.", pt: 'Passei a manhã toda escrevendo e-mails.', options: ['been writing', 'written', 'wrote'], answer: 'been writing', why: '"All morning" destaca a atividade e o tempo: continuous.', wrong: { written: 'Com "all morning", o natural é o continuous.', wrote: '"Have wrote" não existe.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: "I've ___ her for ten years.", pt: 'Eu a conheço há dez anos.', options: ['known', 'been knowing', 'know'], answer: 'known', why: '"Know" é verbo de estado: não vai no continuous.', wrong: { 'been knowing': 'Verbo de estado não usa -ing aqui.', know: 'Precisa do particípio: known.' } }),
      I(3, 4, { type: 'meaning', en: "I've been reading this book for weeks, but I haven't finished it.", options: ['Estou lendo este livro há semanas, mas não terminei.', 'Li este livro em uma semana.', 'Terminei o livro há semanas.'], answer: 'Estou lendo este livro há semanas, mas não terminei.', why: 'Continuous = a atividade continua. "Haven\'t finished" = não terminei.' }),
      I(3, 5, { type: 'build', pt: 'Tenho dormido mal ultimamente.', answer: "I haven't been sleeping well lately", extra: ['slept', 'recent'], display: "I haven't been sleeping well lately.", why: 'Negativa: haven\'t been + -ing. "Lately" = ultimamente.' }),
      I(3, 6, { type: 'speak', en: "I've been working here since March.", pt: 'Trabalho aqui desde março.', why: '"I\'ve been" soa quase como "ái-vbin".' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'Do you like your new flat?'], ['B', '___']], options: ["Yes! I've been living there for a month and I love it.", "Yes! I'm living there since a month.", 'Yes! I lived there for a month and I love it.'], answer: "Yes! I've been living there for a month and I love it.", pt: 'Sim! Moro lá há um mês e adoro.', why: 'Começou no passado e continua: have been + -ing + for.', wrong: { "Yes! I'm living there since a month.": 'Em inglês "há um mês" não usa o presente: é "I\'ve been living ... for a month".', 'Yes! I lived there for a month and I love it.': '"Lived" diria que você não mora mais lá.' } }),
    ]),
    L(4, 'Prática: paciência!', [
      I(4, 1, { type: 'match', pairs: [['patience', 'paciência'], ['lately', 'ultimamente'], ['training', 'treino'], ['gardening', 'jardinagem']], why: '"Lose patience" = perder a paciência.' }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'It ___ raining since yesterday.', pt: 'Está chovendo desde ontem.', options: ['has been', 'have been', 'is'], answer: 'has been', why: 'Com "it": has been + -ing.', wrong: { 'have been': 'Com "it" é "has".', is: '"It is raining since yesterday" é um erro clássico de brasileiro.' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: "They've been ___ each other for two years.", pt: 'Eles estão namorando há dois anos.', options: ['dating', 'date', 'dated'], answer: 'dating', why: '"Date" = namorar, sair com alguém. Have been + -ing.', wrong: { date: 'Precisa do -ing.', dated: '"Been dated" não forma a ideia.' } }),
      I(4, 4, { type: 'meaning', en: "I'm losing my patience. I've been calling them all day!", options: ['Estou perdendo a paciência. Liguei para eles o dia todo!', 'Tenho muita paciência com eles.', 'Eles me ligaram o dia todo.'], answer: 'Estou perdendo a paciência. Liguei para eles o dia todo!', why: '"All day" + continuous = a ação repetida o dia inteiro.' }),
      I(4, 5, { type: 'build', pt: 'Ele está treinando para a corrida desde janeiro.', answer: 'He has been training for the race since January', extra: ['for January', 'trains'], display: 'He has been training for the race since January.', why: '"Since January" = desde janeiro. "For the race" = para a corrida.' }),
      I(4, 6, { type: 'listen', en: "What have you been doing lately?", options: ['O que você tem feito ultimamente?', 'O que você fez ontem?', 'O que você vai fazer?'], answer: 'O que você tem feito ultimamente?', why: 'Pergunta comum para puxar conversa com alguém que você não vê faz tempo.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'I need a nap. I ___ well this week.', pt: 'Preciso de um cochilo. Não tenho dormido bem esta semana.', options: ["haven't been sleeping", "didn't sleep", "don't sleep"], answer: "haven't been sleeping", why: '"This week" ainda não acabou: present perfect continuous.', wrong: { "didn't sleep": 'Para um período que continua (this week), o natural é o present perfect.', "don't sleep": 'Seria um hábito geral.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Estou esperando há uma hora.', answer: "I've been waiting for an hour.", accept: ['I have been waiting for an hour.'], why: 'Have been + -ing + for.' }),
      I(5, 2, { type: 'type', pt: 'Há quanto tempo você mora aqui?', answer: 'How long have you been living here?', accept: ['How long have you lived here?'], why: 'Com "live" as duas formas funcionam.' }),
      I(5, 3, { type: 'dictation', en: 'It has been raining all day.', why: '"All day" = o dia todo.' }),
      I(5, 4, { type: 'type', pt: 'Ela está estudando desde as oito.', answer: "She's been studying since eight.", accept: ['She has been studying since eight.', "She's been studying since 8.", 'She has been studying since 8.'], why: '"Since" + horário.' }),
      I(5, 5, { type: 'dictation', en: "I've been feeling tired lately.", why: '"Lately" = ultimamente.' }),
      I(5, 6, { type: 'type', pt: 'Eu a conheço há anos.', answer: "I've known her for years.", accept: ['I have known her for years.'], why: '"Know" não vai no continuous.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "Sorry I'm late. Have you been waiting long?", options: ['Desculpa o atraso. Você está esperando há muito tempo?', 'Desculpa. Você vai esperar muito?', 'Você chegou atrasado?'], answer: 'Desculpa o atraso. Você está esperando há muito tempo?', why: '"Have you been waiting long?" = está esperando faz tempo?' }),
      I(6, 2, { type: 'dictation', en: 'We have been training for weeks.', why: '"Training" = treinando.' }),
      I(6, 3, { type: 'listen', en: "He's exhausted. He's been working since six.", options: ['Ele está exausto. Está trabalhando desde as seis.', 'Ele está bem. Começou a trabalhar às seis.', 'Ele vai trabalhar às seis.'], answer: 'Ele está exausto. Está trabalhando desde as seis.', why: '"Exhausted" = exausto.' }),
      I(6, 4, { type: 'dictation', en: 'She has been painting all morning.', why: '"All morning" = a manhã toda.' }),
      I(6, 5, { type: 'listen', en: "I've been trying to call you!", options: ['Estou tentando te ligar!', 'Eu te liguei uma vez.', 'Você me ligou?'], answer: 'Estou tentando te ligar!', why: 'Ação repetida até agora: have been trying.' }),
      I(6, 6, { type: 'dictation', en: 'How long have they been dating?', why: '"Dating" = namorando.' }),
      I(6, 7, { type: 'speak', en: "I've been learning English for two years.", pt: 'Estudo inglês há dois anos.', why: 'Frase ótima para se apresentar numa conversa.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "Hey! I haven't seen you for ages. What have you been doing?"], ['B', '___']], options: ["I've been working a lot. And I've started running!", "I'm working a lot since months.", 'I worked a lot next month.'], answer: "I've been working a lot. And I've started running!", pt: 'Tenho trabalhado muito. E comecei a correr!', why: 'Para contar o que você anda fazendo: have been + -ing.', wrong: { "I'm working a lot since months.": '"Há meses" não usa o presente simples nem "since months".', 'I worked a lot next month.': '"Next month" é futuro.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Running? How long have you been doing that?'], ['B', '___']], options: ['For about three months.', 'Since three months.', 'Three months ago.'], answer: 'For about three months.', pt: 'Há uns três meses.', why: 'Período: for. "About" = mais ou menos.', wrong: { 'Since three months.': '"Since" pede um ponto (since March).', 'Three months ago.': '"Ago" responde "quando começou", não "há quanto tempo".' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'You look great!'], ['B', '___']], options: ["Thanks! I've been eating better too.", "Thanks! I'm eating better since.", 'Thanks! I eat better tomorrow.'], answer: "Thanks! I've been eating better too.", pt: 'Obrigado! Tenho comido melhor também.', why: 'Mudança recente que continua: have been eating.', wrong: { "Thanks! I'm eating better since.": '"Since" sozinho no fim não fecha a ideia.', 'Thanks! I eat better tomorrow.': '"Tomorrow" é futuro.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', "I've been feeling really tired lately."], ['B', '___']], options: ['Maybe you should take a break.', 'Maybe you should taking a break.', 'Maybe you took a break.'], answer: 'Maybe you should take a break.', pt: 'Talvez você devesse dar uma pausa.', why: '"Take a break" = dar uma pausa, descansar.', wrong: { 'Maybe you should taking a break.': 'Depois de "should", verbo normal.', 'Maybe you took a break.': 'Não é um conselho.' } }),
      I(7, 5, { type: 'speak', en: 'What have you been doing lately?', pt: 'O que você tem feito ultimamente?', why: '"Lately" soa como "LÊIT-li".' }),
      I(7, 6, { type: 'speak', en: "I've been waiting for ages!", pt: 'Estou esperando há séculos!', why: '"For ages" = há séculos (exagero comum).' }),
    ]),
    L(8, 'Lendo: o diário da maratona', [
      I(8, 1, { type: 'story', why: 'A Julia escreve no diário enquanto treina para a primeira corrida longa. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Desde quando a Julia treina?', options: ['Desde janeiro', 'Desde o ano passado', 'Há uma semana'], answer: 'Desde janeiro', why: '"I\'ve been training since January."' }),
      I(8, 3, { type: 'quiz', q: 'Quantos quilômetros ela já correu esta semana?', options: ['Trinta', 'Treze', 'Três'], answer: 'Trinta', why: '"I\'ve run thirty kilometres this week."' }),
      I(8, 4, { type: 'quiz', q: 'Por que ela usa "I\'ve run" (simples) com os quilômetros?', options: ['Porque é uma quantidade terminada', 'Porque é futuro', 'Porque ela parou de correr'], answer: 'Porque é uma quantidade terminada', why: 'Para contar quanto você fez, use o present perfect simples.' }),
    ], {
      title: 'O diário da maratona',
      lines: [
        { who: 'Julia', en: "I've been training for my first long race since January.", pt: 'Estou treinando para a minha primeira corrida longa desde janeiro.' },
        { who: 'Julia', en: "I've been getting up at five every day. It hasn't been easy!", pt: 'Tenho acordado às cinco todo dia. Não tem sido fácil!' },
        { ask: 'A que horas a Julia tem acordado?', options: ['Às cinco', 'Às sete', 'Ao meio-dia'], answer: 'Às cinco', why: '"I\'ve been getting up at five every day."' },
        { who: 'Julia', en: "I've ___ thirty kilometres this week, and my legs hurt.", pt: 'Corri trinta quilômetros esta semana, e minhas pernas doem.', gap: { answer: 'run', options: ['run', 'been running', 'ran'] } },
        { who: 'Julia', en: "My coach says I've been improving a lot lately.", pt: 'Meu treinador diz que tenho melhorado muito ultimamente.' },
        { who: 'Julia', en: 'The race is on Sunday. I need patience, a lot of water and a good nap!', pt: 'A corrida é no domingo. Preciso de paciência, muita água e um bom cochilo!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: "I'm tired because I've ___ all day.", pt: 'Estou cansado porque trabalhei o dia todo.', options: ['been working', 'worked all', 'work'], answer: 'been working', why: 'Atividade longa que explica o cansaço: have been working.', wrong: { 'worked all': 'Ficaria "worked all all day".', work: '"Have work" não existe.' } }),
      I(9, 2, { type: 'type', pt: 'Está nevando desde ontem.', answer: "It's been snowing since yesterday.", accept: ['It has been snowing since yesterday.'], why: 'Nunca "It is snowing since...": use has been + -ing.' }),
      I(9, 3, { type: 'meaning', en: "How long have you been waiting? — Not long. Only five minutes.", options: ['Há quanto tempo você espera? — Pouco. Só cinco minutos.', 'Quando você chegou? — Há muito tempo.', 'Você vai esperar? — Sim, cinco minutos.'], answer: 'Há quanto tempo você espera? — Pouco. Só cinco minutos.', why: '"Not long" = pouco tempo.' }),
      I(9, 4, { type: 'dictation', en: 'They have been dating since school.', why: '"Since school" = desde a escola.' }),
      I(9, 5, { type: 'listen', en: "She's been practising the piano for hours.", options: ['Ela está treinando piano há horas.', 'Ela treinou piano uma hora.', 'Ela vai tocar piano daqui a pouco.'], answer: 'Ela está treinando piano há horas.', why: '"For hours" = há horas.' }),
      I(9, 6, { type: 'build', pt: 'Temos tentado economizar dinheiro.', answer: 'We have been trying to save money', extra: ['tried', 'saving'], display: 'We have been trying to save money.', why: 'Have been trying + to + verbo.' }),
    ]),
    L(10, 'História: o reencontro', [
      I(10, 1, { type: 'story', why: 'Dois amigos se encontram por acaso depois de anos. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Há quanto tempo o Tom mora em Lisboa?', options: ['Há dois anos', 'Há dois meses', 'Desde criança'], answer: 'Há dois anos', why: '"I\'ve been living in Lisbon for two years."' }),
      I(10, 3, { type: 'quiz', q: 'O que a Ana tem feito?', options: ['Trabalhando num hospital e estudando à noite', 'Viajando pelo mundo', 'Morando em Lisboa'], answer: 'Trabalhando num hospital e estudando à noite', why: '"I\'ve been working at a hospital and studying at night."' }),
      I(10, 4, { type: 'quiz', q: 'O que eles combinam no fim?', options: ['Tomar um café agora', 'Se ver no ano que vem', 'Ligar amanhã'], answer: 'Tomar um café agora', why: '"Let\'s have a coffee now!"' }),
    ], {
      title: 'O reencontro',
      lines: [
        { who: 'Ana', en: "Tom? Is that you? I haven't seen you for years!", pt: 'Tom? É você? Não te vejo há anos!' },
        { who: 'Tom', en: "Ana! Wow! I've been living in Lisbon for two years. I'm here on holiday.", pt: 'Ana! Uau! Estou morando em Lisboa há dois anos. Estou aqui de férias.' },
        { who: 'Ana', en: "That's amazing! What have you been ___ there?", pt: 'Que incrível! O que você tem feito lá?', gap: { answer: 'doing', options: ['doing', 'do', 'done'] } },
        { who: 'Tom', en: "I've been teaching English at a school. And you?", pt: 'Tenho dado aula de inglês numa escola. E você?' },
        { who: 'Ana', en: "I've been working at a hospital and studying at night. I'm exhausted!", pt: 'Tenho trabalhado num hospital e estudado à noite. Estou exausta!' },
        { ask: 'Por que a Ana está exausta?', options: ['Trabalha e estuda à noite', 'Chegou de viagem', 'Treinou para uma corrida'], answer: 'Trabalha e estuda à noite', why: '"Working at a hospital and studying at night."' },
        { who: 'Tom', en: "You need a break. Let's have a coffee now!", pt: 'Você precisa de uma pausa. Vamos tomar um café agora!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u9', level: 'B1', unlock: 'b1-u9', title: 'O que você tem feito?',
  intro: 'A Ana e o Tom contam o que andam fazendo ultimamente.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Ana, you look tired. What have you been doing?", pt: 'E eu sou o Tom. Ana, você parece cansada. O que você tem feito?' },
    { who: 'ana', en: "I've been learning to play the guitar. I've been practising every night!", pt: 'Estou aprendendo a tocar violão. Tenho treinado toda noite!' },
    { who: 'tom', en: 'How long have you been playing?', pt: 'Há quanto tempo você toca?' },
    { who: 'ana', en: "Only for two months. And you? You look very relaxed.", pt: 'Só há dois meses. E você? Você parece bem relaxado.' },
    { who: 'tom', en: "I've been doing yoga lately. And I've been sleeping much better.", pt: 'Tenho feito ioga ultimamente. E tenho dormido muito melhor.' },
    { who: 'ana', en: 'Maybe I should try it. My neighbours have been complaining about the guitar!', pt: 'Talvez eu devesse tentar. Meus vizinhos têm reclamado do violão!' },
    { who: 'tom', en: "Ha! That's all for today. Thank you for listening!", pt: 'Rá! Por hoje é só. Obrigado por ouvir!' },
    { who: 'ana', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'O que a Ana está aprendendo?', options: ['Violão', 'Ioga', 'Piano'], answer: 'Violão', why: '"I\'ve been learning to play the guitar."' },
    { q: 'Há quanto tempo ela toca?', options: ['Dois meses', 'Dois anos', 'Duas semanas'], answer: 'Dois meses', why: '"Only for two months."' },
    { q: 'Quem tem reclamado?', options: ['Os vizinhos da Ana', 'O Tom', 'A professora de ioga'], answer: 'Os vizinhos da Ana', why: '"My neighbours have been complaining about the guitar!"' },
  ],
}, 'pod-b1u8');
addScene('b1-u9', 'standing-5', 'clock');
