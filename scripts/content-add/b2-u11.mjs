// Etapa 2 do B2 completo: unidade nova 11 — O meu vizinho, que… (relativas com vírgula, whose, which).
// Gera src/content/b2/unit-11.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b2-u11.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b2-u11-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b2u11l${n}-${k}`, ...o });

writeUnit('b2/unit-11.json', {
  id: 'b2-u11', level: 'B2', order: 11,
  title: 'O meu vizinho, que…',
  subtitle: 'Orações relativas com vírgula: dar informação extra com who, which, whose e where.',
  can_do: {
    text: 'Consigo descrever pessoas, lugares e coisas acrescentando detalhes numa mesma frase, como num texto mais elaborado.',
    source: 'CEFR (Conselho da Europa) — Produção escrita: textos claros e detalhados com orações subordinadas, nível B2',
  },
  core_inventory: ['Grammar: non-defining relative clauses (with commas)', 'Grammar: whose (possession)', 'Grammar: which referring to a whole sentence', 'Vocabulary: famous places and people'],
  words: [
    ['whose', 'cujo(a), de quem'],
    ['which', 'que, o qual (coisas)'],
    ['whom', 'quem (formal, depois de preposição)'],
    ['architect', 'arquiteto(a)'],
    ['author', 'autor(a)'],
    ['palace', 'palácio'],
    ['tower', 'torre'],
    ['statue', 'estátua'],
    ['designed', 'projetado(a)'],
    ['built', 'construído(a)'],
  ],
  guide: {
    title: 'Informação extra entre vírgulas',
    intro: 'No B1 você aprendeu "who, which, that" para dizer QUAL pessoa ou coisa. No B2 entra a informação EXTRA, entre vírgulas: ela não é necessária para entender a frase, só acrescenta um detalhe.',
    points: [
      { en: 'My neighbour, who is a doctor, helped me.', pt: 'Meu vizinho, que é médico, me ajudou.', note: 'Entre vírgulas: informação extra. Para pessoas: who.' },
      { en: 'Lisbon, which is the capital of Portugal, is beautiful.', pt: 'Lisboa, que é a capital de Portugal, é linda.', note: 'Para coisas e lugares: which. Com vírgulas NUNCA se usa "that".' },
      { en: 'Maria, whose son is my friend, lives next door.', pt: 'A Maria, cujo filho é meu amigo, mora ao lado.', note: '"Whose" = cujo, de quem (posse).' },
      { en: 'Rio, where I was born, is famous for its beaches.', pt: 'O Rio, onde eu nasci, é famoso pelas praias.', note: '"Where" para lugares.' },
      { en: 'He passed the exam, which surprised everyone.', pt: 'Ele passou na prova, o que surpreendeu todo mundo.', note: '"Which" pode se referir à frase inteira: o que.' },
      { en: 'The author, whom I met last year, wrote a new book.', pt: 'O autor, que eu conheci ano passado, escreveu um livro novo.', note: '"Whom" é formal; no dia a dia, "who" também serve.' },
    ],
    tips: ['Com vírgula, nunca use "that": "My car, which is red..." (e não "that is red").', '"Whose" (cujo) e "who\'s" (who is) soam igual, mas são diferentes.'],
  },
  extra_vocab: [
    { word: 'born', reason: '"be born" (nascer); a CEFR-J lista só o verbo "bear"' },
    { word: 'rome', reason: 'nome de cidade (Roma)' },
    { word: 'colosseum', reason: 'nome de monumento (Coliseu)' },
    { word: 'alfama', reason: 'nome de bairro de Lisboa' },
    { word: 'monks', reason: 'monges (história do pastel de Belém); aparece uma vez com tradução' },
    { word: 'custard', reason: 'creme ("custard tart" = pastel de nata); aparece uma vez com tradução' },
  ],
  lessons: [
    L(1, 'Who e which com vírgula', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'My sister, ___ lives in Canada, is visiting us.', pt: 'Minha irmã, que mora no Canadá, está nos visitando.', options: ['who', 'which', 'that'], answer: 'who', why: 'Pessoa + informação extra entre vírgulas: who.', wrong: { which: '"Which" é para coisas.', that: 'Com vírgulas, nunca "that".' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'The museum, ___ opened in 2010, is very popular.', pt: 'O museu, que abriu em 2010, é muito popular.', options: ['which', 'who', 'that'], answer: 'which', why: 'Coisa/lugar + vírgulas: which.', wrong: { who: '"Who" é para pessoas.', that: 'Com vírgulas, nunca "that".' } }),
      I(1, 3, { type: 'meaning', en: 'My boss, who is usually very calm, was angry today.', options: ['Meu chefe, que normalmente é muito calmo, estava bravo hoje.', 'Meu chefe está sempre bravo.', 'Meu chefe calmo foi embora.'], answer: 'Meu chefe, que normalmente é muito calmo, estava bravo hoje.', why: 'A parte entre vírgulas é só um detalhe extra.' }),
      I(1, 4, { type: 'build', pt: 'O Rio, que é famoso pelas praias, recebe muitos turistas.', answer: 'Rio which is famous for its beaches gets many tourists', extra: ['that', 'who'], display: 'Rio, which is famous for its beaches, gets many tourists.', why: 'Lugar + which, entre vírgulas.' }),
      I(1, 5, { type: 'listen', en: 'My grandmother, who is ninety, still drives.', options: ['Minha avó, que tem noventa anos, ainda dirige.', 'Minha avó parou de dirigir aos noventa.', 'Minha avó dirige muito mal.'], answer: 'Minha avó, que tem noventa anos, ainda dirige.', why: '"Who is ninety" = que tem noventa anos.' }),
      I(1, 6, { type: 'match', pairs: [['palace', 'palácio'], ['tower', 'torre'], ['statue', 'estátua'], ['architect', 'arquiteto']], why: '"Architect" soa como "ÁR-ki-tekt".' }),
    ]),
    L(2, 'Whose e where', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'Paulo, ___ car was stolen, called the police.', pt: 'O Paulo, cujo carro foi roubado, chamou a polícia.', options: ['whose', "who's", 'who'], answer: 'whose', why: '"Whose" = cujo (o carro DO Paulo).', wrong: { "who's": '"Who\'s" = who is.', who: 'Faltaria a ideia de posse.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Salvador, ___ my parents live, is very hot.', pt: 'Salvador, onde meus pais moram, é muito quente.', options: ['where', 'which', 'whose'], answer: 'where', why: 'Lugar onde algo acontece: where.', wrong: { which: '"Which" pediria "in which my parents live".', whose: '"Whose" é posse.' } }),
      I(2, 3, { type: 'meaning', en: 'The writer, whose books are famous, lives in a small village.', options: ['O escritor, cujos livros são famosos, mora numa vilazinha.', 'O escritor famoso mora na capital.', 'Os livros dele são de uma vila.'], answer: 'O escritor, cujos livros são famosos, mora numa vilazinha.', why: '"Whose books" = cujos livros.' }),
      I(2, 4, { type: 'build', pt: 'Minha amiga, cujo pai é piloto, viaja muito.', answer: 'My friend whose father is a pilot travels a lot', extra: ["who's", 'which'], display: 'My friend, whose father is a pilot, travels a lot.', why: '"Whose father" = cujo pai.' }),
      I(2, 5, { type: 'listen', en: 'The hotel, where we stayed last year, has closed.', options: ['O hotel, onde ficamos ano passado, fechou.', 'Vamos ficar no hotel ano que vem.', 'O hotel abriu ano passado.'], answer: 'O hotel, onde ficamos ano passado, fechou.', why: '"Where we stayed" = onde ficamos.' }),
      I(2, 6, { type: 'speak', en: 'My neighbour, whose dog is huge, is very nice.', pt: 'Meu vizinho, cujo cachorro é enorme, é muito legal.', why: '"Whose" soa como "RÚUZ".' }),
    ]),
    L(3, '…o que surpreendeu todo mundo', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'She arrived two hours late, ___ made everyone angry.', pt: 'Ela chegou duas horas atrasada, o que deixou todo mundo bravo.', options: ['which', 'what', 'that'], answer: 'which', why: '"Which" pode se referir à frase toda: o que.', wrong: { what: '"What" não funciona aqui.', that: 'Com vírgula, nunca "that".' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'He won the lottery, ___ changed his life.', pt: 'Ele ganhou na loteria, o que mudou a vida dele.', options: ['which', 'who', 'where'], answer: 'which', why: 'Ganhar a loteria (a frase toda) mudou a vida: which.', wrong: { who: '"Who" é para pessoas.', where: '"Where" é lugar.' } }),
      I(3, 3, { type: 'meaning', en: "It rained all weekend, which was a shame.", options: ['Choveu o fim de semana inteiro, o que foi uma pena.', 'Que pena que não choveu.', 'Vai chover no fim de semana.'], answer: 'Choveu o fim de semana inteiro, o que foi uma pena.', why: '"Which was a shame" = o que foi uma pena.' }),
      I(3, 4, { type: 'build', pt: 'O trem atrasou, o que foi irritante.', answer: 'The train was late which was annoying', extra: ['what', 'that'], display: 'The train was late, which was annoying.', why: 'Vírgula + which = o que.' }),
      I(3, 5, { type: 'match', pairs: [['whose', 'cujo'], ['which', 'o qual'], ['where', 'onde'], ['whom', 'quem (formal)']], why: 'Com vírgulas: who, whom, whose, which, where. Nunca that.' }),
      I(3, 6, { type: 'listen', en: 'My team lost again, which was no surprise.', options: ['Meu time perdeu de novo, o que não foi surpresa.', 'Meu time ganhou, que surpresa!', 'Meu time não jogou.'], answer: 'Meu time perdeu de novo, o que não foi surpresa.', why: '"Which was no surprise" = o que não foi surpresa.' }),
      I(3, 7, { type: 'choice', prompt: 'Qual frase está CERTA?', en: '___', pt: 'Meu carro, que é vermelho, está na garagem.', options: ['My car, which is red, is in the garage.', 'My car, that is red, is in the garage.', 'My car, who is red, is in the garage.'], answer: 'My car, which is red, is in the garage.', why: 'Coisa + vírgulas: which.', wrong: { 'My car, that is red, is in the garage.': 'Com vírgulas, nunca "that".', 'My car, who is red, is in the garage.': '"Who" é para pessoas.' } }),
    ]),
    L(4, 'Prática: lugares famosos', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'The tower, ___ was built in 1889, is the symbol of Paris.', pt: 'A torre, que foi construída em 1889, é o símbolo de Paris.', options: ['which', 'who', 'whose'], answer: 'which', why: 'Coisa + informação extra: which.', wrong: { who: '"Who" é para pessoas.', whose: '"Whose" é posse.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'The architect, ___ designed the palace, was only thirty.', pt: 'O arquiteto, que projetou o palácio, tinha só trinta anos.', options: ['who', 'which', 'where'], answer: 'who', why: 'Pessoa + informação extra: who.', wrong: { which: '"Which" é para coisas.', where: '"Where" é lugar.' } }),
      I(4, 3, { type: 'meaning', en: 'The statue, which is in the main square, is two hundred years old.', options: ['A estátua, que fica na praça principal, tem duzentos anos.', 'A estátua foi feita há vinte anos.', 'A praça não tem estátuas.'], answer: 'A estátua, que fica na praça principal, tem duzentos anos.', why: 'Which + informação extra.' }),
      I(4, 4, { type: 'build', pt: 'Lisboa, onde morei dois anos, é minha cidade favorita.', answer: 'Lisbon where I lived for two years is my favourite city', extra: ['which', 'that'], display: 'Lisbon, where I lived for two years, is my favourite city.', why: 'Lugar onde algo aconteceu: where.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Who is that woman?'], ['B', '___']], options: ["That's Clara, whose husband is the new manager.", "That's Clara, who's husband is the new manager.", "That's Clara, which husband is the manager."], answer: "That's Clara, whose husband is the new manager.", pt: 'É a Clara, cujo marido é o novo gerente.', why: 'Posse (o marido DELA): whose.', wrong: { "That's Clara, who's husband is the new manager.": '"Who\'s" = who is.', "That's Clara, which husband is the manager.": '"Which" não indica posse.' } }),
      I(4, 6, { type: 'listen', en: 'The palace, which the king built for his wife, is open to visitors.', options: ['O palácio, que o rei construiu para a esposa, está aberto a visitantes.', 'O palácio é fechado ao público.', 'A rainha construiu o palácio.'], answer: 'O palácio, que o rei construiu para a esposa, está aberto a visitantes.', why: '"Open to visitors" = aberto a visitantes.' }),
      I(4, 7, { type: 'match', pairs: [['designed', 'projetado'], ['built', 'construído'], ['author', 'autor'], ['whom', 'quem (formal)']], why: '"Designed by" e "built by" aparecem muito em textos sobre lugares famosos.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Minha mãe, que é professora, adora ler.', answer: 'My mother, who is a teacher, loves reading.', accept: ['My mother, who is a teacher, loves to read.'], why: 'Pessoa + vírgulas: who.' }),
      I(5, 2, { type: 'type', pt: 'Ele chegou tarde, o que me irritou.', answer: 'He arrived late, which annoyed me.', why: '"Which" para a frase toda.' }),
      I(5, 3, { type: 'dictation', en: 'Rome, which I visited last year, is amazing.', why: 'Which + informação extra.' }),
      I(5, 4, { type: 'type', pt: 'A Ana, cujo irmão mora em Londres, fala inglês muito bem.', answer: 'Ana, whose brother lives in London, speaks English very well.', why: '"Whose brother" = cujo irmão.' }),
      I(5, 5, { type: 'dictation', en: 'The beach, where we met, is beautiful.', why: '"Where we met" = onde nos conhecemos.' }),
      I(5, 6, { type: 'type', pt: 'O livro, que tem 500 páginas, é ótimo.', answer: 'The book, which has 500 pages, is great.', why: 'Coisa + informação extra: which.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'My uncle, who used to be a pilot, has visited fifty countries.', options: ['Meu tio, que era piloto, já visitou cinquenta países.', 'Meu tio quer ser piloto.', 'Meu tio nunca viajou.'], answer: 'Meu tio, que era piloto, já visitou cinquenta países.', why: '"Used to be" = era (antes).' }),
      I(6, 2, { type: 'dictation', en: 'She failed the test, which was strange.', why: '"Which was strange" = o que foi estranho.' }),
      I(6, 3, { type: 'listen', en: 'The singer, whose new album is a hit, will play here tonight.', options: ['O cantor, cujo álbum novo é um sucesso, vai tocar aqui hoje.', 'O cantor lançou um álbum ruim.', 'O show foi ontem.'], answer: 'O cantor, cujo álbum novo é um sucesso, vai tocar aqui hoje.', why: '"Whose new album" = cujo álbum novo.' }),
      I(6, 4, { type: 'dictation', en: 'My friend, who lives in Japan, called me.', why: 'Who + informação extra.' }),
      I(6, 5, { type: 'listen', en: 'Our capital, which was built in 1960, is a planned city.', options: ['Nossa capital, que foi construída em 1960, é uma cidade planejada.', 'Nossa capital é a cidade mais antiga do país.', 'Nossa capital não foi planejada.'], answer: 'Nossa capital, que foi construída em 1960, é uma cidade planejada.', why: '"Was built" = foi construída.' }),
      I(6, 6, { type: 'dictation', en: 'The man whose bag I found thanked me.', why: '"Whose bag" = cuja bolsa.' }),
      I(6, 7, { type: 'speak', en: 'It rained all day, which was a shame.', pt: 'Choveu o dia todo, o que foi uma pena.', why: '"Shame" = pena.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Have you met my cousin Laura?'], ['B', '___']], options: ["Yes! Laura, who works at the bank, right?", "Yes! Laura, that works at the bank, right?", "Yes! Laura, which works at the bank?"], answer: "Yes! Laura, who works at the bank, right?", pt: 'Sim! A Laura que trabalha no banco, né?', why: 'Pessoa + vírgula: who.', wrong: { "Yes! Laura, that works at the bank, right?": 'Com vírgula, nunca "that".', "Yes! Laura, which works at the bank?": '"Which" é para coisas.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'How was your trip to Rome?'], ['B', '___']], options: ["Amazing! We saw the Colosseum, which is even bigger than I thought.", "Amazing! We saw the Colosseum, that is bigger.", "Amazing! We saw the Colosseum, who is big."], answer: "Amazing! We saw the Colosseum, which is even bigger than I thought.", pt: 'Incrível! Vimos o Coliseu, que é ainda maior do que eu imaginava.', why: 'Lugar + informação extra: which.', wrong: { "Amazing! We saw the Colosseum, that is bigger.": 'Com vírgula, nunca "that".', "Amazing! We saw the Colosseum, who is big.": '"Who" é para pessoas.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "I heard Ben lost his job."], ['B', '___']], options: ["Yes, which is a shame. He loved that job.", 'Yes, what is a shame.', 'Yes, that is shame.'], answer: 'Yes, which is a shame. He loved that job.', pt: 'Sim, o que é uma pena. Ele amava aquele emprego.', why: '"Which" para a ideia inteira.', wrong: { 'Yes, what is a shame.': '"What" não funciona aqui.', 'Yes, that is shame.': 'Faltou "a" e a estrutura.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Whose house is that?'], ['B', '___']], options: ["It belongs to Mr Smith, whose family has lived here for years.", "It's Mr Smith, who's family lives here.", "It's Mr Smith, which family."], answer: "It belongs to Mr Smith, whose family has lived here for years.", pt: 'É do Sr. Smith, cuja família mora aqui há anos.', why: '"Whose family" = cuja família.', wrong: { "It's Mr Smith, who's family lives here.": '"Who\'s" = who is.', "It's Mr Smith, which family.": 'Não forma frase.' } }),
      I(7, 5, { type: 'speak', en: 'My sister, who lives abroad, is coming.', pt: 'Minha irmã, que mora fora, está vindo.', why: 'Faça uma pausinha nas vírgulas ao falar.' }),
      I(7, 6, { type: 'speak', en: 'He passed, which surprised everyone.', pt: 'Ele passou, o que surpreendeu todo mundo.', why: '"Surprised" soa como "sur-PRÁIZD".' }),
    ]),
    L(8, 'Lendo: um guia de Lisboa', [
      I(8, 1, { type: 'story', why: 'Um guia de viagem apresenta Lisboa. Repare nas informações extras entre vírgulas.' }),
      I(8, 2, { type: 'quiz', q: 'Em que bairro ficam as ruas estreitas e o fado?', options: ['Alfama', 'Belém', 'Centro'], answer: 'Alfama', why: '"Alfama, which is the oldest area..."' }),
      I(8, 3, { type: 'quiz', q: 'Quem criou a receita dos pastéis de nata?', options: ['Monges', 'Um chef famoso', 'Um rei'], answer: 'Monges', why: '"The recipe was created by monks."' }),
      I(8, 4, { type: 'quiz', q: 'Para que serve o elétrico 28?', options: ['Para passar pelos pontos mais famosos', 'Para ir ao aeroporto', 'Para ir à praia'], answer: 'Para passar pelos pontos mais famosos', why: '"Passes the most famous places."' }),
    ], {
      title: 'Lisboa em um dia',
      lines: [
        { who: 'Sofia', en: 'Lisbon, which is one of the oldest cities in Europe, is built on seven hills.', pt: 'Lisboa, que é uma das cidades mais antigas da Europa, é construída sobre sete colinas.' },
        { who: 'Sofia', en: 'Start in Alfama, which is the oldest area. Its narrow streets are full of music.', pt: 'Comece em Alfama, que é o bairro mais antigo. As ruas estreitas são cheias de música.' },
        { ask: 'Sobre quantas colinas Lisboa é construída?', options: ['Sete', 'Três', 'Dez'], answer: 'Sete', why: '"Built on seven hills."' },
        { who: 'Sofia', en: 'Then take tram 28, ___ passes the most famous places in the city.', pt: 'Depois pegue o elétrico 28, que passa pelos lugares mais famosos da cidade.', gap: { answer: 'which', options: ['which', 'who', 'whose'] } },
        { who: 'Sofia', en: 'Finish near the river, where you can try the famous custard cakes. The recipe was created by monks.', pt: 'Termine perto do rio, onde você pode provar os famosos pastéis de nata. A receita foi criada por monges.' },
        { who: 'Sofia', en: 'The cakes, whose recipe is still a secret, are best eaten warm!', pt: 'Os pastéis, cuja receita ainda é segredo, são melhores quentinhos!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'My phone, ___ I bought last month, is already broken.', pt: 'Meu celular, que comprei mês passado, já quebrou.', options: ['which', 'who', 'that'], answer: 'which', why: 'Coisa + vírgulas: which.', wrong: { who: '"Who" é para pessoas.', that: 'Com vírgulas, nunca "that".' } }),
      I(9, 2, { type: 'type', pt: 'O Pedro, cuja irmã é atriz, mora aqui.', answer: 'Pedro, whose sister is an actress, lives here.', why: '"Whose sister" = cuja irmã.' }),
      I(9, 3, { type: 'meaning', en: 'They cancelled the concert, which disappointed many fans.', options: ['Cancelaram o show, o que decepcionou muitos fãs.', 'O show foi ótimo para os fãs.', 'Os fãs cancelaram o show.'], answer: 'Cancelaram o show, o que decepcionou muitos fãs.', why: '"Which" para a frase toda.' }),
      I(9, 4, { type: 'dictation', en: 'Paris, where my sister lives, is expensive.', why: '"Where my sister lives" = onde minha irmã mora.' }),
      I(9, 5, { type: 'listen', en: 'The author, whom I admire a lot, is coming to our school.', options: ['O autor, que eu admiro muito, vem à nossa escola.', 'Eu sou o autor do livro.', 'O autor não vem mais.'], answer: 'O autor, que eu admiro muito, vem à nossa escola.', why: '"Whom" é a forma formal de "who" como objeto.' }),
      I(9, 6, { type: 'build', pt: 'Meu avô, que tem noventa anos, ainda nada todo dia.', answer: 'My grandfather who is ninety still swims every day', extra: ['which', 'that'], display: 'My grandfather, who is ninety, still swims every day.', why: 'Pessoa + who, entre vírgulas.' }),
    ]),
    L(10, 'História: o tour pela cidade', [
      I(10, 1, { type: 'story', why: 'A guia Rita mostra a cidade para um grupo de turistas. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Quem projetou o teatro?', options: ['Uma arquiteta italiana', 'O prefeito', 'Um artista local'], answer: 'Uma arquiteta italiana', why: '"Designed by an Italian architect."' }),
      I(10, 3, { type: 'quiz', q: 'Por que a estátua é famosa?', options: ['Dizem que dá sorte tocar no pé dela', 'É a maior do mundo', 'É de ouro'], answer: 'Dizem que dá sorte tocar no pé dela', why: '"Touching its foot brings good luck."' }),
      I(10, 4, { type: 'quiz', q: 'Onde termina o tour?', options: ['Num café cujo dono é o avô da Rita', 'No teatro', 'No hotel'], answer: 'Num café cujo dono é o avô da Rita', why: '"A coffee shop whose owner is my grandfather."' }),
    ], {
      title: 'O tour pela cidade',
      lines: [
        { who: 'Rita', en: 'Welcome! This is the City Theatre, which was designed by an Italian architect.', pt: 'Bem-vindos! Este é o Teatro Municipal, que foi projetado por uma arquiteta italiana.' },
        { who: 'Ben', en: 'It looks amazing. When was it built?', pt: 'Parece incrível. Quando foi construído?' },
        { who: 'Rita', en: 'In 1910. Now, look at this statue, ___ is the most famous in the city.', pt: 'Em 1910. Agora, olhem esta estátua, que é a mais famosa da cidade.', gap: { answer: 'which', options: ['which', 'who', 'whose'] } },
        { who: 'Rita', en: 'People say that touching its foot brings good luck, which is why it is so shiny!', pt: 'Dizem que tocar no pé dela dá sorte, e é por isso que ele brilha tanto!' },
        { ask: 'Por que o pé da estátua brilha?', options: ['Muita gente toca nele', 'É pintado de ouro', 'Foi limpo ontem'], answer: 'Muita gente toca nele', why: '"Touching its foot brings good luck, which is why it is so shiny."' },
        { who: 'Rita', en: 'And our last stop is a coffee shop whose owner is my grandfather. He makes the best cake in town!', pt: 'E a última parada é uma cafeteria cujo dono é o meu avô. Ele faz o melhor bolo da cidade!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b2u11', level: 'B2', unlock: 'b2-u11', title: 'Pessoas que marcaram a gente',
  intro: 'A Ana e o Tom falam de pessoas importantes na vida deles.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: people who changed our lives.", pt: 'E eu sou o Tom. Hoje: pessoas que mudaram a nossa vida.' },
    { who: 'ana', en: 'My grandmother, who was a teacher, taught me to read when I was four.', pt: 'Minha avó, que era professora, me ensinou a ler quando eu tinha quatro anos.' },
    { who: 'tom', en: "For me, it was my first boss, whose advice I still follow today.", pt: 'Para mim, foi o meu primeiro chefe, cujos conselhos eu sigo até hoje.' },
    { who: 'ana', en: "What did he say?", pt: 'O que ele dizia?' },
    { who: 'tom', en: '"Always listen more than you speak," which is great advice for a podcast!', pt: '"Sempre escute mais do que fala", o que é um ótimo conselho para um podcast!' },
    { who: 'ana', en: "Ha! That's all for today. Thank you for listening!", pt: 'Rá! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye!', pt: 'Tchau!' },
  ],
  questions: [
    { q: 'Quem ensinou a Ana a ler?', options: ['A avó, que era professora', 'A mãe', 'O primeiro chefe'], answer: 'A avó, que era professora', why: '"My grandmother, who was a teacher, taught me to read."' },
    { q: 'Quem marcou a vida do Tom?', options: ['O primeiro chefe', 'O pai', 'Um professor'], answer: 'O primeiro chefe', why: '"My first boss, whose advice I still follow."' },
    { q: 'Qual era o conselho?', options: ['Escutar mais do que falar', 'Trabalhar muito', 'Viajar sempre'], answer: 'Escutar mais do que falar', why: '"Always listen more than you speak."' },
  ],
}, 'pod-b2u10');
addScene('b2-u11', 'standing-22', 'city');
