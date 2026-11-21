// Etapa 2 do B2 completo: unidade nova 12 — Uma palavra, várias formas (prefixos e sufixos).
// Gera src/content/b2/unit-12.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u12.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u12-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u12l${n}-${k}`, ...o });

writeUnit('b2/unit-12.json', {
  id: 'b2-u12', level: 'B2', order: 12,
  title: 'Uma palavra, várias formas',
  subtitle: 'Prefixos e sufixos: multiplicar o vocabulário a partir de uma palavra.',
  can_do: {
    text: 'Consigo entender e formar palavras novas com prefixos e sufixos comuns, e escolher a forma certa (verbo, substantivo, adjetivo) numa frase.',
    source: 'CEFR (Conselho da Europa) — Amplitude de vocabulário e formação de palavras, nível B2',
  },
  core_inventory: ['Vocabulary: negative prefixes (un-, dis-, im-, in-)', 'Vocabulary: adjective suffixes (-ful, -less, -able)', 'Vocabulary: noun suffixes (-ness, -ment, -tion)', 'Grammar: word class in context (noun, verb, adjective, adverb)'],
  words: [
    ['unhappy', 'infeliz'],
    ['dishonest', 'desonesto(a)'],
    ['impossible', 'impossível'],
    ['careful / careless', 'cuidadoso / descuidado'],
    ['helpful / useless', 'prestativo, útil / inútil'],
    ['happiness', 'felicidade'],
    ['kindness', 'gentileza, bondade'],
    ['friendship', 'amizade'],
    ['development', 'desenvolvimento'],
    ['education', 'educação, ensino'],
    ['unbelievable', 'inacreditável'],
    ['employment', 'emprego, trabalho'],
  ],
  guide: {
    title: 'Prefixos e sufixos: o mesmo tijolo, várias construções',
    intro: 'Muitas palavras inglesas são uma raiz + um pedaço no começo (prefixo) ou no fim (sufixo). Conhecendo esses pedaços, você entende palavras que nunca viu e escolhe a forma certa na frase.',
    points: [
      { en: 'happy → unhappy, honest → dishonest, possible → impossible', pt: 'feliz → infeliz, honesto → desonesto, possível → impossível', note: 'Prefixos negativos: un-, dis-, im- (antes de p e m), in-.' },
      { en: 'care → careful / careless', pt: 'cuidado → cuidadoso / descuidado', note: '-ful = cheio de; -less = sem.' },
      { en: 'happy → happiness, kind → kindness', pt: 'feliz → felicidade, gentil → gentileza', note: '-ness transforma adjetivo em substantivo.' },
      { en: 'develop → development, educate → education', pt: 'desenvolver → desenvolvimento, educar → educação', note: '-ment e -tion transformam verbo em substantivo.' },
      { en: 'believe → unbelievable', pt: 'acreditar → inacreditável', note: '-able = que pode ser. Un- + believe + -able: que não dá para acreditar.' },
      { en: 'friend → friendship', pt: 'amigo → amizade', note: '-ship forma substantivos de relação: friendship, relationship.' },
    ],
    tips: ['Antes de escolher a forma, pergunte: depois de "the/a" vem substantivo; depois de "very/so" vem adjetivo; depois do verbo, muitas vezes, advérbio (-ly).', '"Useless" (inútil) existe, mas "useful" é útil. Nem toda palavra aceita os dois.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Prefixos negativos', [
      I(1, 1, { type: 'match', pairs: [['unhappy', 'infeliz'], ['dishonest', 'desonesto'], ['impossible', 'impossível'], ['unusual', 'incomum']], why: 'Un-, dis-, im- deixam a palavra com o sentido contrário.' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "It's ___ to finish this in one day.", pt: 'É impossível terminar isto em um dia.', options: ['impossible', 'possible', 'possibly'], answer: 'impossible', why: 'Antes de "p", o prefixo negativo é "im-": impossible. (Cuidado: "unpossible" não existe!)', wrong: { possible: '"Possible" é o contrário: possível.', possibly: '"Possibly" é advérbio (possivelmente).' } }),
      I(1, 3, { type: 'choice', prompt: 'Complete:', en: 'He lied to us. He was very ___.', pt: 'Ele mentiu para nós. Foi muito desonesto.', options: ['dishonest', 'honest', 'honesty'], answer: 'dishonest', why: 'O contrário de "honest" é "dishonest" (e não "unhonest").', wrong: { honest: '"Honest" = honesto, o contrário.', honesty: '"Honesty" é o substantivo (honestidade).' } }),
      I(1, 4, { type: 'meaning', en: "She looked unhappy, so I asked if she was OK.", options: ['Ela parecia triste, então perguntei se estava bem.', 'Ela estava muito feliz.', 'Ela me perguntou se eu estava bem.'], answer: 'Ela parecia triste, então perguntei se estava bem.', why: '"Unhappy" = infeliz, triste.' }),
      I(1, 5, { type: 'build', pt: 'Foi uma história inacreditável.', answer: 'It was an unbelievable story', extra: ['a', 'believe'], display: 'It was an unbelievable story.', why: 'Un- + believe + -able. Antes de vogal: "an".' }),
      I(1, 6, { type: 'listen', en: "Don't be impatient. The bus is coming.", options: ['Não seja impaciente. O ônibus está chegando.', 'Seja paciente com o ônibus atrasado.', 'O ônibus não vem.'], answer: 'Não seja impaciente. O ônibus está chegando.', why: '"Impatient" = impaciente (im- + patient).' }),
    ]),
    L(2, 'Com e sem: -ful e -less', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'Be ___ with that glass. It might break.', pt: 'Cuidado com esse copo. Pode quebrar.', options: ['careful', 'careless', 'care'], answer: 'careful', why: '-ful = cheio de: cheio de cuidado.', wrong: { careless: '"Careless" = descuidado, o contrário.', care: '"Care" é substantivo ou verbo; depois de "be", adjetivo.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "This old phone is ___. It doesn't even turn on.", pt: 'Este celular velho é inútil. Nem liga.', options: ['useless', 'useful', 'use'], answer: 'useless', why: '-less = sem: sem uso, inútil.', wrong: { useful: '"Useful" = útil, o contrário.', use: '"Use" é verbo ou substantivo.' } }),
      I(2, 3, { type: 'meaning', en: 'The staff were very helpful.', options: ['A equipe foi muito prestativa.', 'A equipe precisava de ajuda.', 'A equipe não ajudou.'], answer: 'A equipe foi muito prestativa.', why: '"Helpful" = que ajuda, prestativo.' }),
      I(2, 4, { type: 'build', pt: 'Foi um erro descuidado.', answer: 'It was a careless mistake', extra: ['careful', 'an'], display: 'It was a careless mistake.', why: '"Careless" = descuidado.' }),
      I(2, 5, { type: 'match', pairs: [['careful', 'cuidadoso'], ['careless', 'descuidado'], ['helpful', 'prestativo'], ['useless', 'inútil']], why: '-ful = com, -less = sem.' }),
      I(2, 6, { type: 'speak', en: 'Thank you, you were very helpful.', pt: 'Obrigado, você foi muito prestativo.', why: 'Ótima frase para agradecer um atendimento.' }),
    ]),
    L(3, 'Substantivos: -ness, -ment, -tion, -ship', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'Money does not always bring ___.', pt: 'Dinheiro nem sempre traz felicidade.', options: ['happiness', 'happy', 'happily'], answer: 'happiness', why: 'Depois de "bring", precisa de substantivo: happiness.', wrong: { happy: '"Happy" é adjetivo.', happily: '"Happily" é advérbio.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'Good ___ is the key to success.', pt: 'Uma boa educação é a chave do sucesso.', options: ['education', 'educate', 'educated'], answer: 'education', why: 'Substantivo depois de "good": education (-tion).', wrong: { educate: '"Educate" é verbo.', educated: '"Educated" é adjetivo (instruído).' } }),
      I(3, 3, { type: 'meaning', en: 'Our friendship started at school.', options: ['Nossa amizade começou na escola.', 'Meu amigo estuda na escola.', 'A escola é nossa amiga.'], answer: 'Nossa amizade começou na escola.', why: '"Friendship" = amizade (-ship).' }),
      I(3, 4, { type: 'build', pt: 'Obrigado pela sua gentileza.', answer: 'Thank you for your kindness', extra: ['kind', 'kindly'], display: 'Thank you for your kindness.', why: 'Substantivo depois de "your": kindness.' }),
      I(3, 5, { type: 'listen', en: 'The development of the city was very fast.', options: ['O desenvolvimento da cidade foi muito rápido.', 'A cidade é muito desenvolvida.', 'A cidade vai crescer devagar.'], answer: 'O desenvolvimento da cidade foi muito rápido.', why: '"Development" = desenvolvimento (develop + -ment).' }),
      I(3, 6, { type: 'match', pairs: [['happiness', 'felicidade'], ['kindness', 'gentileza'], ['friendship', 'amizade'], ['development', 'desenvolvimento']], why: '-ness, -ship e -ment viram substantivos.' }),
      I(3, 7, { type: 'choice', prompt: 'Complete:', en: 'Unemployment is a serious problem. Many people are looking for ___.', pt: 'O desemprego é um problema sério. Muita gente está procurando emprego.', options: ['employment', 'employ', 'employed'], answer: 'employment', why: 'Substantivo depois de "for": employment.', wrong: { employ: '"Employ" é verbo.', employed: '"Employed" é adjetivo.' } }),
    ]),
    L(4, 'Prática: qual forma?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'She sings ___.', pt: 'Ela canta lindamente.', options: ['beautifully', 'beautiful', 'beauty'], answer: 'beautifully', why: 'Depois do verbo (sings), advérbio: beautifully.', wrong: { beautiful: '"Beautiful" é adjetivo.', beauty: '"Beauty" é substantivo.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: "What's the ___ between these two words?", pt: 'Qual é a diferença entre estas duas palavras?', options: ['difference', 'different', 'differently'], answer: 'difference', why: 'Depois de "the", substantivo: difference.', wrong: { different: '"Different" é adjetivo.', differently: '"Differently" é advérbio.' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'The film was so ___ that I watched it twice.', pt: 'O filme foi tão emocionante que assisti duas vezes.', options: ['exciting', 'excitement', 'excited'], answer: 'exciting', why: 'Depois de "so", adjetivo. O filme (a coisa) é "exciting".', wrong: { excitement: '"Excitement" é substantivo.', excited: '"Excited" é a pessoa (animada), não o filme.' } }),
      I(4, 4, { type: 'meaning', en: 'It was a careless mistake, but nobody was hurt.', options: ['Foi um erro descuidado, mas ninguém se machucou.', 'Ninguém cometeu erros.', 'O erro machucou todo mundo.'], answer: 'Foi um erro descuidado, mas ninguém se machucou.', why: '"Careless" = descuidado.' }),
      I(4, 5, { type: 'build', pt: 'Ele é infeliz no trabalho atual.', answer: 'He is unhappy in his current job', extra: ['happiness', 'happily'], display: 'He is unhappy in his current job.', why: 'Depois de "is", adjetivo: unhappy.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', 'How was the hotel staff?'], ['B', '___']], options: ['Really helpful. They solved every problem.', 'Really help. They solved every problem.', 'Really helping.'], answer: 'Really helpful. They solved every problem.', pt: 'Muito prestativos. Resolveram todos os problemas.', why: 'Adjetivo para descrever pessoas: helpful.', wrong: { 'Really help. They solved every problem.': '"Help" é verbo ou substantivo.', 'Really helping.': 'Para descrever pessoas, use o adjetivo: helpful.' } }),
      I(4, 7, { type: 'listen', en: 'Her kindness made a big difference.', options: ['A gentileza dela fez uma grande diferença.', 'Ela é gentil com todo mundo.', 'A diferença foi pequena.'], answer: 'A gentileza dela fez uma grande diferença.', why: '"Make a difference" = fazer diferença.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Isso é impossível!', answer: "That's impossible!", accept: ['That is impossible!', "It's impossible!", 'It is impossible!'], why: 'Im- + possible.' }),
      I(5, 2, { type: 'type', pt: 'Tenha cuidado!', answer: 'Be careful!', why: '"Careful" = cuidadoso.' }),
      I(5, 3, { type: 'dictation', en: 'Our friendship is very important to me.', why: '"Friendship" = amizade.' }),
      I(5, 4, { type: 'type', pt: 'Ele foi muito desonesto.', answer: 'He was very dishonest.', why: 'Dis- + honest = desonesto.' }),
      I(5, 5, { type: 'dictation', en: 'Education is the key to development.', why: '-tion e -ment: substantivos.' }),
      I(5, 6, { type: 'type', pt: 'Obrigado pela sua gentileza.', answer: 'Thank you for your kindness.', accept: ['Thanks for your kindness.'], why: 'Kind + -ness = gentileza.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "It's unbelievable how fast children learn.", options: ['É inacreditável como as crianças aprendem rápido.', 'As crianças aprendem devagar.', 'Ninguém acredita nas crianças.'], answer: 'É inacreditável como as crianças aprendem rápido.', why: '"Unbelievable" = inacreditável.' }),
      I(6, 2, { type: 'dictation', en: 'This map is useless.', why: '"Useless" = inútil.' }),
      I(6, 3, { type: 'listen', en: 'Happiness is more important than money.', options: ['A felicidade é mais importante que o dinheiro.', 'O dinheiro traz felicidade.', 'Ele é feliz com dinheiro.'], answer: 'A felicidade é mais importante que o dinheiro.', why: '"Happiness" = felicidade.' }),
      I(6, 4, { type: 'dictation', en: 'Please be careful on the stairs.', why: '"Careful" = cuidadoso.' }),
      I(6, 5, { type: 'listen', en: 'The government wants to improve education.', options: ['O governo quer melhorar a educação.', 'A educação está ótima.', 'O governo fechou escolas.'], answer: 'O governo quer melhorar a educação.', why: '"Government" = governo (govern + -ment).' }),
      I(6, 6, { type: 'dictation', en: 'She is an unusual person.', why: '"Unusual" = incomum. "An" antes de vogal.' }),
      I(6, 7, { type: 'speak', en: 'Nothing is impossible.', pt: 'Nada é impossível.', why: '"Impossible" soa como "im-PÓ-si-bol".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "I left my wallet in the taxi again!"], ['B', '___']], options: ["That's so careless! You need to be more careful.", "That's so careful! You need to be careless.", 'That is care!'], answer: "That's so careless! You need to be more careful.", pt: 'Que descuido! Você precisa ser mais cuidadoso.', why: 'Careless (descuidado) e careful (cuidadoso).', wrong: { "That's so careful! You need to be careless.": 'Trocou os sentidos.', 'That is care!': '"Care" é substantivo ou verbo.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'What makes you happy?'], ['B', '___']], options: ['For me, happiness is time with my family.', 'For me, happy is time with my family.', 'For me, happily is time.'], answer: 'For me, happiness is time with my family.', pt: 'Para mim, felicidade é tempo com a família.', why: 'Como sujeito da frase, substantivo: happiness.', wrong: { 'For me, happy is time with my family.': '"Happy" é adjetivo.', 'For me, happily is time.': '"Happily" é advérbio.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'He told the boss a lie to get the promotion.'], ['B', '___']], options: ["That's so dishonest!", "That's so honest!", "That's so dishonesty!"], answer: "That's so dishonest!", pt: 'Que desonesto!', why: 'O contrário de honest: dishonest. Depois de "so", adjetivo.', wrong: { "That's so honest!": '"Honest" é o contrário: honesto.', "That's so dishonesty!": '"Dishonesty" é o substantivo.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Thanks for helping me move!'], ['B', '___']], options: ["No problem. That's what friendship is for!", "No problem. That's what friend is for!", 'No problem. Friendly is for that.'], answer: "No problem. That's what friendship is for!", pt: 'Imagina. Amizade é para isso!', why: '"Friendship" = amizade.', wrong: { "No problem. That's what friend is for!": 'Seria "friends are for".', 'No problem. Friendly is for that.': '"Friendly" é adjetivo.' } }),
      I(7, 5, { type: 'speak', en: "That's unbelievable!", pt: 'Que inacreditável!', why: '"Unbelievable" soa como "ân-bi-LÍ-va-bol".' }),
      I(7, 6, { type: 'speak', en: 'Thank you for your kindness.', pt: 'Obrigado pela sua gentileza.', why: '"Kindness" soa como "KÁIND-nis".' }),
    ]),
    L(8, 'Lendo: o segredo da felicidade', [
      I(8, 1, { type: 'story', why: 'Um artigo fala de uma pesquisa sobre felicidade. Repare nas palavras com prefixos e sufixos.' }),
      I(8, 2, { type: 'quiz', q: 'Quanto tempo durou a pesquisa?', options: ['Oitenta anos', 'Oito anos', 'Oito meses'], answer: 'Oitenta anos', why: '"A study that lasted eighty years."' }),
      I(8, 3, { type: 'quiz', q: 'O que a pesquisa descobriu?', options: ['Boas relações trazem felicidade', 'Dinheiro traz felicidade', 'Fama traz felicidade'], answer: 'Boas relações trazem felicidade', why: '"Good relationships are the real key to happiness."' }),
      I(8, 4, { type: 'quiz', q: 'Como eram as pessoas sem amigos próximos?', options: ['Mais infelizes', 'Mais ricas', 'Mais saudáveis'], answer: 'Mais infelizes', why: '"People without close friends were more unhappy."' }),
    ], {
      title: 'O segredo da felicidade',
      lines: [
        { who: 'Sarah', en: 'What makes people happy? Researchers followed hundreds of people in a study that lasted eighty years.', pt: 'O que deixa as pessoas felizes? Pesquisadores acompanharam centenas de pessoas num estudo que durou oitenta anos.' },
        { who: 'Sarah', en: 'The results were surprising. Money and success were not the most important things.', pt: 'Os resultados foram surpreendentes. Dinheiro e sucesso não eram as coisas mais importantes.' },
        { ask: 'Dinheiro foi a coisa mais importante?', options: ['Não', 'Sim', 'Só para os jovens'], answer: 'Não', why: '"Money and success were not the most important things."' },
        { who: 'Sarah', en: 'Good relationships, like friendship and family, were the real key to ___.', pt: 'Boas relações, como amizade e família, eram a verdadeira chave da felicidade.', gap: { answer: 'happiness', options: ['happiness', 'happy', 'happily'] } },
        { who: 'Sarah', en: 'People without close friends were more unhappy, and their health was worse.', pt: 'Pessoas sem amigos próximos eram mais infelizes, e a saúde delas era pior.' },
        { who: 'Sarah', en: 'So, the message is simple: be kind. A little kindness makes a big difference.', pt: 'Então, a mensagem é simples: seja gentil. Um pouco de gentileza faz uma grande diferença.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'He drove ___ and had an accident.', pt: 'Ele dirigiu de forma descuidada e sofreu um acidente.', options: ['carelessly', 'careless', 'careful'], answer: 'carelessly', why: 'Depois do verbo (drove), advérbio: carelessly.', wrong: { careless: 'Adjetivo; aqui precisa de advérbio.', careful: 'Sentido oposto e forma errada.' } }),
      I(9, 2, { type: 'type', pt: 'A amizade é muito importante.', answer: 'Friendship is very important.', why: '"Friendship" = amizade.' }),
      I(9, 3, { type: 'meaning', en: 'Thanks for your help. It was really useful.', options: ['Obrigado pela ajuda. Foi muito útil.', 'Sua ajuda foi inútil.', 'Preciso de ajuda.'], answer: 'Obrigado pela ajuda. Foi muito útil.', why: '"Useful" = útil.' }),
      I(9, 4, { type: 'dictation', en: 'It is impossible to please everyone.', why: '"Please everyone" = agradar a todos.' }),
      I(9, 5, { type: 'listen', en: 'The new development will create thousands of jobs.', options: ['O novo empreendimento vai criar milhares de empregos.', 'Milhares de pessoas perderam o emprego.', 'Não há empregos novos.'], answer: 'O novo empreendimento vai criar milhares de empregos.', why: '"Development" também pode ser um empreendimento.' }),
      I(9, 6, { type: 'build', pt: 'A gentileza dela me deixou feliz.', answer: 'Her kindness made me happy', extra: ['kind', 'happiness'], display: 'Her kindness made me happy.', why: 'Substantivo (kindness) como sujeito; adjetivo (happy) depois de "made me".' }),
    ]),
    L(10, 'História: a entrevista de bolsa', [
      I(10, 1, { type: 'story', why: 'A Nina faz uma entrevista para uma bolsa de estudos. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que a Nina quer estudar?', options: ['Educação', 'Medicina', 'Direito'], answer: 'Educação', why: '"I want to study education."' }),
      I(10, 3, { type: 'quiz', q: 'Qual é a maior qualidade dela, segundo ela?', options: ['É paciente e prestativa', 'É muito ambiciosa', 'É famosa'], answer: 'É paciente e prestativa', why: '"I\'m patient and helpful."' }),
      I(10, 4, { type: 'quiz', q: 'Qual é a fraqueza que ela admite?', options: ['Às vezes é impaciente consigo mesma', 'É desonesta', 'É preguiçosa'], answer: 'Às vezes é impaciente consigo mesma', why: '"I\'m sometimes impatient with myself."' }),
    ], {
      title: 'A entrevista de bolsa',
      lines: [
        { who: 'Tom', en: 'Good morning, Nina. Why do you want this scholarship?', pt: 'Bom dia, Nina. Por que você quer esta bolsa?' },
        { who: 'Nina', en: 'I want to study education. I believe good teachers can change lives.', pt: 'Quero estudar educação. Acredito que bons professores podem mudar vidas.' },
        { who: 'Tom', en: 'What is your biggest strength?', pt: 'Qual é a sua maior qualidade?' },
        { who: 'Nina', en: "I'm patient and ___. I love explaining things to children.", pt: 'Sou paciente e prestativa. Adoro explicar coisas para crianças.', gap: { answer: 'helpful', options: ['helpful', 'helpless', 'help'] } },
        { ask: 'Do que a Nina gosta?', options: ['De explicar coisas para crianças', 'De viajar', 'De trabalhar sozinha'], answer: 'De explicar coisas para crianças', why: '"I love explaining things to children."' },
        { who: 'Tom', en: 'And your weakness?', pt: 'E a sua fraqueza?' },
        { who: 'Nina', en: "I'm sometimes impatient with myself. But I'm working on it!", pt: 'Às vezes sou impaciente comigo mesma. Mas estou trabalhando nisso!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u12', level: 'B2', unlock: 'b2-u12', title: 'Uma palavra vira dez',
  intro: 'A Ana e o Tom mostram como prefixos e sufixos multiplicam o vocabulário.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: one word, many forms.", pt: 'E eu sou o Tom. Hoje: uma palavra, várias formas.' },
    { who: 'ana', en: 'Take the word "help". Helpful, helpless, helper, unhelpful...', pt: 'Pegue a palavra "help". Helpful, helpless, helper, unhelpful...' },
    { who: 'tom', en: "That's amazing. Learn one word and you understand five!", pt: 'Isso é incrível. Aprenda uma palavra e você entende cinco!' },
    { who: 'ana', en: 'My favourite is "unbelievable". It has three pieces!', pt: 'Minha favorita é "unbelievable". Tem três pedaços: un, believe, able!' },
    { who: 'tom', en: 'And remember: after "very", use the adjective. Very careful, not very care.', pt: 'E lembrem: depois de "very", use o adjetivo. Very careful, não very care.' },
    { who: 'ana', en: "Great tip! That's all for today. Thank you for listening!", pt: 'Ótima dica! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye!', pt: 'Tchau!' },
  ],
  questions: [
    { q: 'Qual palavra a Ana usa como exemplo primeiro?', options: ['Help', 'Happy', 'Care'], answer: 'Help', why: '"Take the word help."' },
    { q: 'Qual é a palavra favorita da Ana?', options: ['Unbelievable', 'Helpful', 'Careful'], answer: 'Unbelievable', why: '"My favourite is unbelievable."' },
    { q: 'Qual é a dica do Tom?', options: ['Depois de "very", use o adjetivo', 'Nunca use prefixos', 'Decore todas as palavras'], answer: 'Depois de "very", use o adjetivo', why: '"After very, use the adjective."' },
  ],
}, 'pod-b2u11');
addScene('b2-u12', 'sitting-5', 'book');
