// Etapa 3 do A2 completo: unidade nova 16 — Minha história (biografia no passado; advérbios de modo).
// Gera src/content/a2/unit-16.json. Todas as lições levam "added". Fecha o A2.
// Uso: node scripts/content-add/a2-u16.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u16-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u16l${n}-${k}`, ...o });

writeUnit('a2/unit-16.json', {
  id: 'a2-u16', level: 'A2', order: 16,
  title: 'Minha história',
  subtitle: 'Contar a sua vida: onde nasceu, cresceu, estudou e o que mudou.',
  can_do: {
    text: 'Consigo contar a minha história de vida em frases simples e dizer como faço as coisas (rápido, bem, com cuidado).',
    source: 'CEFR (Conselho da Europa) — Produção oral: descrever experiências e fatos da própria vida, nível A2',
  },
  core_inventory: ['Grammar: past simple for life events (was born, grew up, moved, met, got married)', 'Grammar: adverbs of manner (quickly, slowly, carefully, well, badly)', 'Functions: talking about your life story', 'Vocabulary: life events'],
  words: [
    ['was born', 'nasceu, nasci'],
    ['grew up (grow up)', 'cresceu, cresci'],
    ['moved (move)', 'se mudou, me mudei'],
    ['got married (get married)', 'se casou, me casei'],
    ['became (become)', 'se tornou, virou'],
    ['childhood', 'infância'],
    ['university', 'universidade, faculdade'],
    ['graduate', 'se formar'],
    ['retired', 'aposentado(a)'],
    ['quickly / slowly', 'rápido / devagar'],
    ['carefully', 'com cuidado'],
    ['well / badly', 'bem / mal'],
    ['easily', 'facilmente'],
    ['hard', 'muito, com esforço (trabalhar, estudar)'],
  ],
  guide: {
    title: 'Minha história: a vida no passado',
    intro: 'Para contar a sua vida você usa o passado simples, com alguns verbos que aparecem em toda biografia. E para dizer COMO você faz as coisas, entram os advérbios: quase sempre o adjetivo + -ly.',
    points: [
      { en: 'I was born in Bahia in 1995.', pt: 'Eu nasci na Bahia em 1995.', note: '"Nascer" em inglês é "be born": I was born. Nunca "I born".' },
      { en: 'I grew up in a small town.', pt: 'Eu cresci numa cidade pequena.', note: '"Grow up" = crescer (de criança a adulto). Passado: grew up.' },
      { en: 'We moved to Rio when I was ten.', pt: 'A gente se mudou para o Rio quando eu tinha dez anos.', note: '"Move" = se mudar. Idade no passado: when I was ten.' },
      { en: 'She drives carefully.', pt: 'Ela dirige com cuidado.', note: 'Advérbio = adjetivo + -ly: careful → carefully, quick → quickly.' },
      { en: 'He speaks English well.', pt: 'Ele fala inglês bem.', note: 'Exceções: good → well; hard → hard; fast → fast.' },
      { en: 'They got married in 2010.', pt: 'Eles se casaram em 2010.', note: '"Get married" = casar-se. Passado: got married.' },
    ],
    tips: ['O advérbio vem depois do verbo e da coisa: "She speaks English well" (nunca "speaks well English").', '"Hard" também é advérbio: work hard = trabalhar muito. "Hardly" quer dizer outra coisa (quase nada).'],
  },
  extra_vocab: [{ word: 'born', reason: '"be born" (nascer): a CEFR-J lista só o verbo "bear" (B1), mas "I was born" é básico em qualquer apresentação' }],
  lessons: [
    L(1, 'Onde tudo começou', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ born in Rio.', pt: 'Eu nasci no Rio.', options: ['was', 'am', 'did'], answer: 'was', why: '"Nascer" = be born. No passado: I was born.', wrong: { am: '"I am born" não existe. Nascer é passado: was born.', did: '"I did born" não existe.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'Where ___ you born?', pt: 'Onde você nasceu?', options: ['were', 'did', 'was'], answer: 'were', why: 'Com "you": were. Pergunta: Where were you born?', wrong: { did: '"Where did you born" é um erro clássico. É "were you born".', was: 'Com "you" é "were".' } }),
      I(1, 3, { type: 'match', pairs: [['grew up', 'cresceu'], ['moved', 'se mudou'], ['became', 'se tornou'], ['got married', 'se casou']], why: '"Grow" → grew, "become" → became, "get" → got: irregulares. "Move" é regular: moved.' }),
      I(1, 4, { type: 'meaning', en: 'I grew up on a farm, but now I live in the city.', options: ['Eu cresci num sítio, mas agora moro na cidade.', 'Eu nasci na cidade e me mudei para um sítio.', 'Eu trabalho num sítio na cidade.'], answer: 'Eu cresci num sítio, mas agora moro na cidade.', why: '"Grew up" = cresci.' }),
      I(1, 5, { type: 'listen', en: 'She was born in nineteen ninety.', options: ['Ela nasceu em 1990.', 'Ela nasceu em 1919.', 'Ela tem noventa anos.'], answer: 'Ela nasceu em 1990.', why: 'Anos se leem em dois pedaços: nineteen ninety = 1990.' }),
      I(1, 6, { type: 'build', pt: 'Nós nos mudamos para Lisboa em 2015.', answer: 'We moved to Lisbon in 2015', extra: ['move', 'on'], display: 'We moved to Lisbon in 2015.', why: '"Move to" = mudar-se para. Ano com "in".' }),
    ]),
    L(2, 'Escola, faculdade, trabalho', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'He ___ from university in 2018.', pt: 'Ele se formou na faculdade em 2018.', options: ['graduated', 'graduate', 'graduating'], answer: 'graduated', why: '"Graduate" = se formar. Passado: graduated.', wrong: { graduate: 'É passado: graduated.', graduating: 'Sem "was", o -ing não forma frase.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'After school, she ___ a nurse.', pt: 'Depois da escola, ela se tornou enfermeira.', options: ['became', 'becomed', 'become'], answer: 'became', why: '"Become" é irregular: became.', wrong: { becomed: 'Não existe.', become: 'Precisa do passado.' } }),
      I(2, 3, { type: 'meaning', en: 'My grandpa worked hard all his life. Now he is retired.', options: ['Meu avô trabalhou muito a vida toda. Agora ele é aposentado.', 'Meu avô nunca trabalhou. Agora ele é aposentado.', 'Meu avô trabalha muito até hoje.'], answer: 'Meu avô trabalhou muito a vida toda. Agora ele é aposentado.', why: '"Work hard" = trabalhar muito. "Retired" = aposentado.' }),
      I(2, 4, { type: 'match', pairs: [['childhood', 'infância'], ['university', 'faculdade'], ['graduate', 'se formar'], ['retired', 'aposentado']], why: '"Childhood" vem de "child" (criança).' }),
      I(2, 5, { type: 'build', pt: 'Eu conheci minha esposa na faculdade.', answer: 'I met my wife at university', extra: ['meet', 'knew'], display: 'I met my wife at university.', why: '"Meet" (conhecer alguém pela primeira vez) → met. "Know" é conhecer há tempos.' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'What did you do after school?'], ['B', '___']], options: ['I went to university and studied law.', 'I go to university and study law.', 'I was go to university.'], answer: 'I went to university and studied law.', pt: 'Fui para a faculdade e estudei direito.', why: 'A pergunta está no passado (did): went, studied.', wrong: { 'I go to university and study law.': 'Presente, mas a pergunta é sobre o passado.', 'I was go to university.': '"Was go" não existe.' } }),
    ]),
    L(3, 'Como você faz?', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'Please drive ___. The road is dangerous.', pt: 'Por favor, dirija com cuidado. A estrada é perigosa.', options: ['carefully', 'careful', 'care'], answer: 'carefully', why: 'Como você dirige? Advérbio: carefully.', wrong: { careful: '"Careful" é adjetivo: a careful driver.', care: '"Care" é cuidado (substantivo).' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'She speaks English very ___.', pt: 'Ela fala inglês muito bem.', options: ['well', 'good', 'nice'], answer: 'well', why: 'O advérbio de "good" é "well".', wrong: { good: '"Good" é adjetivo: her English is good.', nice: '"Nice" é adjetivo (legal), não diz como ela fala.' } }),
      I(3, 3, { type: 'choice', prompt: 'Complete:', en: 'Can you speak more ___, please?', pt: 'Pode falar mais devagar, por favor?', options: ['slowly', 'slow', 'slowlier'], answer: 'slowly', why: 'Como você fala? Advérbio: slowly.', wrong: { slow: '"Slow" é adjetivo.', slowlier: 'Não existe. Comparativo de advérbio com -ly usa "more".' } }),
      I(3, 4, { type: 'match', pairs: [['quickly', 'rápido'], ['slowly', 'devagar'], ['easily', 'facilmente'], ['badly', 'mal']], why: 'Quase todos: adjetivo + -ly. Se termina em y, vira -ily: easy → easily.' }),
      I(3, 5, { type: 'meaning', en: 'He learns languages easily.', options: ['Ele aprende idiomas com facilidade.', 'Ele aprende idiomas devagar.', 'Ele acha idiomas difíceis.'], answer: 'Ele aprende idiomas com facilidade.', why: '"Easily" = facilmente, com facilidade.' }),
      I(3, 6, { type: 'build', pt: 'Eu fiz a prova rápido.', answer: 'I did the test quickly', extra: ['quick', 'does'], display: 'I did the test quickly.', why: 'Advérbio no fim: quickly. Cuidado: o advérbio de "fast" é "fast" mesmo (nunca "fastly").' }),
      I(3, 7, { type: 'speak', en: 'She sings very well.', pt: 'Ela canta muito bem.', why: '"Well" soa como "UÉL".' }),
    ]),
    L(4, 'Prática: contando a vida', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'When I was a child, I ___ in a village.', pt: 'Quando eu era criança, eu morava numa vila.', options: ['lived', 'live', 'was live'], answer: 'lived', why: 'Passado simples: lived.', wrong: { live: 'É presente.', 'was live': 'Não existe.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'They ___ married in 2012.', pt: 'Eles se casaram em 2012.', options: ['got', 'get', 'were get'], answer: 'got', why: '"Get married" no passado: got married.', wrong: { get: 'Precisa do passado.', 'were get': 'Não existe.' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'He worked ___ and bought a house.', pt: 'Ele trabalhou muito e comprou uma casa.', options: ['hard', 'hardly', 'heavy'], answer: 'hard', why: '"Work hard" = trabalhar muito. "Hard" não muda.', wrong: { hardly: '"Hardly" = quase nada. Muda o sentido!', heavy: '"Heavy" = pesado.' } }),
      I(4, 4, { type: 'meaning', en: 'I had a happy childhood. I played outside all day.', options: ['Tive uma infância feliz. Eu brincava lá fora o dia todo.', 'Minha infância foi triste e eu ficava em casa.', 'Hoje eu brinco lá fora o dia todo.'], answer: 'Tive uma infância feliz. Eu brincava lá fora o dia todo.', why: '"Childhood" = infância. "Played" pode ser brincava/brinquei.' }),
      I(4, 5, { type: 'build', pt: 'Ela nasceu em Portugal e cresceu no Brasil.', answer: 'She was born in Portugal and grew up in Brazil', extra: ['is', 'grow'], display: 'She was born in Portugal and grew up in Brazil.', why: '"Was born" + "grew up": dois verbos de biografia.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', 'How long did you live in London?'], ['B', '___']], options: ['For five years. Then I moved back to Brazil.', 'Since five years. Then I move back.', 'Five years ago I live there.'], answer: 'For five years. Then I moved back to Brazil.', pt: 'Por cinco anos. Depois voltei para o Brasil.', why: '"For" + tempo = durante. "Move back" = voltar a morar.', wrong: { 'Since five years. Then I move back.': '"Since" é desde; com período, use "for". E falta o passado.', 'Five years ago I live there.': 'Falta o passado: lived.' } }),
      I(4, 7, { type: 'listen', en: 'My father taught me to swim when I was six.', options: ['Meu pai me ensinou a nadar quando eu tinha seis anos.', 'Meu pai nada desde os seis anos.', 'Eu ensinei meu pai a nadar.'], answer: 'Meu pai me ensinou a nadar quando eu tinha seis anos.', why: '"Taught" é o passado de "teach" (ensinar).' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Eu nasci em 2000.', answer: 'I was born in 2000.', why: '"I was born" + ano com "in".' }),
      I(5, 2, { type: 'type', pt: 'Eu cresci em Salvador.', answer: 'I grew up in Salvador.', why: '"Grow up" → grew up.' }),
      I(5, 3, { type: 'dictation', en: 'She drives very carefully.', why: '"Carefully" = com cuidado.' }),
      I(5, 4, { type: 'type', pt: 'Ele fala inglês bem.', answer: 'He speaks English well.', why: '"Well" no fim, depois de "English".' }),
      I(5, 5, { type: 'dictation', en: 'We moved to a new city.', why: '"Moved" soa como "MÚUVD".' }),
      I(5, 6, { type: 'type', pt: 'Onde você nasceu?', answer: 'Where were you born?', why: '"Where were you born?" (e nunca "Where did you born?").' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'I was born in a small town in the south.', options: ['Eu nasci numa cidadezinha no sul.', 'Eu moro numa cidadezinha no sul.', 'Eu nasci numa cidade grande no norte.'], answer: 'Eu nasci numa cidadezinha no sul.', why: '"South" = sul. "Small town" = cidadezinha.' }),
      I(6, 2, { type: 'dictation', en: 'They got married last year.', why: '"Got married" = se casaram.' }),
      I(6, 3, { type: 'listen', en: 'He became a doctor when he was thirty.', options: ['Ele se tornou médico aos trinta anos.', 'Ele foi ao médico aos trinta anos.', 'Ele tem trinta anos e é médico.'], answer: 'Ele se tornou médico aos trinta anos.', why: '"Became" = se tornou.' }),
      I(6, 4, { type: 'dictation', en: 'Please read the question carefully.', why: '"Carefully" = com atenção, com cuidado.' }),
      I(6, 5, { type: 'listen', en: 'My mom retired last month.', options: ['Minha mãe se aposentou no mês passado.', 'Minha mãe voltou no mês passado.', 'Minha mãe trabalhou muito no mês passado.'], answer: 'Minha mãe se aposentou no mês passado.', why: '"Retire" = se aposentar. Passado: retired.' }),
      I(6, 6, { type: 'dictation', en: 'I learned to read quickly.', why: '"Quickly" = rápido.' }),
      I(6, 7, { type: 'speak', en: 'I grew up in a small town.', pt: 'Eu cresci numa cidadezinha.', why: '"Grew" soa como "GRÚU".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Tell me about yourself. Where were you born?'], ['B', '___']], options: ['I was born in Bahia, but I grew up in Rio.', 'I born in Bahia, but I grow up in Rio.', 'I am born in Bahia.'], answer: 'I was born in Bahia, but I grew up in Rio.', pt: 'Nasci na Bahia, mas cresci no Rio.', why: '"Was born" e "grew up".', wrong: { 'I born in Bahia, but I grow up in Rio.': 'Falta "was" e o passado de grow.', 'I am born in Bahia.': 'Nascer é passado: was born.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'When did you move here?'], ['B', '___']], options: ['Three years ago. I got a new job.', 'Three years ago. I get a new job.', 'Since three years. I got a job.'], answer: 'Three years ago. I got a new job.', pt: 'Há três anos. Arrumei um emprego novo.', why: '"Ago" = atrás, há. "Got a job" = arrumei um emprego.', wrong: { 'Three years ago. I get a new job.': 'Falta o passado: got.', 'Since three years. I got a job.': '"Since" não funciona com período; e a pergunta é "when".' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Your English is very good!'], ['B', '___']], options: ['Thank you! I studied hard.', 'Thank you! I studied hardly.', 'Thank you! I study good.'], answer: 'Thank you! I studied hard.', pt: 'Obrigado! Estudei muito.', why: '"Study hard" = estudar muito.', wrong: { 'Thank you! I studied hardly.': '"Hardly" = quase não. Seria "quase não estudei"!', 'Thank you! I study good.': 'Advérbio: well. E foi no passado.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Are your grandparents still working?'], ['B', '___']], options: ["No, they're retired. They travel a lot.", "No, they retired. They're travel a lot.", 'No, they are retire.'], answer: "No, they're retired. They travel a lot.", pt: 'Não, eles são aposentados. Viajam muito.', why: '"Be retired" = ser aposentado.', wrong: { "No, they retired. They're travel a lot.": '"They\'re travel" não existe.', 'No, they are retire.': 'Falta o -d: retired.' } }),
      I(7, 5, { type: 'speak', en: 'I was born in Brazil.', pt: 'Eu nasci no Brasil.', why: '"Born" soa como "BÓRN".' }),
      I(7, 6, { type: 'speak', en: 'Could you speak more slowly?', pt: 'Você poderia falar mais devagar?', why: '"Slowly" soa como "SLÔU-li".' }),
    ]),
    L(8, 'Lendo: a vida da vovó Maria', [
      I(8, 1, { type: 'story', why: 'A Julia conta a história de vida da avó para um trabalho da escola. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Onde a vovó Maria nasceu?', options: ['Numa fazenda na Bahia', 'No Rio', 'Em Portugal'], answer: 'Numa fazenda na Bahia', why: '"She was born on a farm in Bahia."' }),
      I(8, 3, { type: 'quiz', q: 'Qual era a profissão dela?', options: ['Professora', 'Enfermeira', 'Médica'], answer: 'Professora', why: '"She became a teacher."' }),
      I(8, 4, { type: 'quiz', q: 'O que ela faz agora?', options: ['Aprende a tocar piano', 'Dá aula', 'Trabalha na fazenda'], answer: 'Aprende a tocar piano', why: '"Now she is retired, and she is learning the piano!"' }),
    ], {
      title: 'A vida da vovó Maria',
      lines: [
        { who: 'Julia', en: 'My grandma Maria was born on a farm in Bahia in 1950.', pt: 'Minha avó Maria nasceu numa fazenda na Bahia em 1950.' },
        { who: 'Julia', en: 'She grew up with nine brothers and sisters. Her childhood was hard but happy.', pt: 'Ela cresceu com nove irmãos. A infância dela foi difícil, mas feliz.' },
        { ask: 'Quantos irmãos a vovó tinha?', options: ['Nove', 'Dois', 'Dezenove'], answer: 'Nove', why: '"Nine brothers and sisters."' },
        { who: 'Julia', en: 'When she was eighteen, she ___ to Rio.', pt: 'Quando tinha dezoito anos, ela se mudou para o Rio.', gap: { answer: 'moved', options: ['moved', 'born', 'grew'] } },
        { who: 'Julia', en: 'She studied hard and became a teacher. She taught for forty years.', pt: 'Ela estudou muito e se tornou professora. Deu aula por quarenta anos.' },
        { who: 'Julia', en: 'Now she is retired, and she is learning the piano! She plays slowly, but very well.', pt: 'Agora ela é aposentada e está aprendendo piano! Toca devagar, mas muito bem.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'Where ___ your parents born?', pt: 'Onde seus pais nasceram?', options: ['were', 'was', 'did'], answer: 'were', why: '"Your parents" = they: were.', wrong: { was: 'Plural: were.', did: '"Did ... born" não existe.' } }),
      I(9, 2, { type: 'type', pt: 'Ela dirige rápido demais.', answer: 'She drives too fast.', accept: ['She drives too quickly.'], why: '"Fast" é adjetivo e advérbio. "Too fast" = rápido demais.' }),
      I(9, 3, { type: 'meaning', en: 'He grew up in Japan, so he speaks Japanese well.', options: ['Ele cresceu no Japão, então fala japonês bem.', 'Ele nasceu no Japão, mas não fala japonês.', 'Ele quer morar no Japão.'], answer: 'Ele cresceu no Japão, então fala japonês bem.', why: '"Grew up" = cresceu. "Well" = bem.' }),
      I(9, 4, { type: 'dictation', en: 'I graduated in 2020.', why: '"Graduated" = me formei.' }),
      I(9, 5, { type: 'listen', en: 'We met at a party and got married two years later.', options: ['A gente se conheceu numa festa e se casou dois anos depois.', 'A gente se casou numa festa.', 'A gente se conhece há dois anos.'], answer: 'A gente se conheceu numa festa e se casou dois anos depois.', why: '"Met" = se conheceram. "Later" = depois.' }),
      I(9, 6, { type: 'build', pt: 'Eu trabalhei muito e me tornei gerente.', answer: 'I worked hard and became a manager', extra: ['hardly', 'become'], display: 'I worked hard and became a manager.', why: '"Work hard" e "become" → became.' }),
    ]),
    L(10, 'História: a festa de formatura', [
      I(10, 1, { type: 'story', why: 'Na festa de formatura, o Pedro conversa com o pai da amiga. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde o pai da Emma cresceu?', options: ['Em Londres', 'No Brasil', 'Num sítio'], answer: 'Em Londres', why: '"I grew up in London."' }),
      I(10, 3, { type: 'quiz', q: 'Como ele aprendeu português?', options: ['Rápido, trabalhando no Brasil', 'Na escola em Londres', 'Ele não fala português'], answer: 'Rápido, trabalhando no Brasil', why: '"I learned it quickly. I worked here for ten years."' }),
      I(10, 4, { type: 'quiz', q: 'O que o Pedro quer fazer agora?', options: ['Trabalhar no exterior', 'Voltar a estudar', 'Se aposentar'], answer: 'Trabalhar no exterior', why: '"I\'d like to work abroad."' }),
    ], {
      title: 'A festa de formatura',
      lines: [
        { who: 'Pedro', en: 'Emma did very well! You must be very happy.', pt: 'A Emma foi muito bem! O senhor deve estar muito feliz.' },
        { who: 'Tom', en: 'Thank you! She studied very hard. Are you her friend from university?', pt: 'Obrigado! Ela estudou muito. Você é amigo dela da faculdade?' },
        { who: 'Pedro', en: "Yes. We ___ in the first year. You speak Portuguese very well!", pt: 'Sou. A gente se conheceu no primeiro ano. O senhor fala português muito bem!', gap: { answer: 'met', options: ['met', 'meet', 'knew'] } },
        { who: 'Tom', en: 'Thanks! I was born and grew up in London, but I moved here when I was twenty-five.', pt: 'Obrigado! Eu nasci e cresci em Londres, mas me mudei para cá com vinte e cinco anos.' },
        { ask: 'Com quantos anos o Tom se mudou?', options: ['Vinte e cinco', 'Dez', 'Cinquenta'], answer: 'Vinte e cinco', why: '"When I was twenty-five."' },
        { who: 'Tom', en: 'I learned it quickly. I worked here for ten years. And you? What now?', pt: 'Aprendi rápido. Trabalhei aqui por dez anos. E você? E agora?' },
        { who: 'Pedro', en: "I'd like to work abroad. Maybe in London!", pt: 'Eu gostaria de trabalhar no exterior. Talvez em Londres!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u16', level: 'A2', unlock: 'a2-u16', title: 'A nossa história',
  intro: 'No último episódio do A2, a Ana e o Tom contam um pouco da própria vida.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the last podcast of this level. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao último podcast do A2. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're telling our life stories.", pt: 'E eu sou o Tom. Hoje vamos contar a nossa história de vida.' },
    { who: 'ana', en: "I'm from Bahia, but I grew up in Rio.", pt: 'Eu sou da Bahia, mas cresci no Rio.' },
    { who: 'tom', en: "I'm from England. I moved to Brazil ten years ago.", pt: 'Eu sou da Inglaterra. Me mudei para o Brasil há dez anos.' },
    { who: 'ana', en: 'Why did you come here?', pt: 'Por que você veio para cá?' },
    { who: 'tom', en: 'I got a job as a teacher. And then I met my wife!', pt: 'Arrumei um emprego de professor. E aí conheci minha esposa!' },
    { who: 'ana', en: 'And you learned Portuguese very quickly.', pt: 'E você aprendeu português muito rápido.' },
    { who: 'tom', en: "Not quickly! I studied hard. Like you, listening to this podcast!", pt: 'Rápido, não! Estudei muito. Igual a vocês, ouvindo este podcast!' },
    { who: 'ana', en: "Well done! You finished this level! That's all for today.", pt: 'Muito bem! Vocês terminaram este nível! Por hoje é só.' },
    { who: 'tom', en: 'See you in the next level! Bye!', pt: 'Até o próximo nível! Tchau!' },
  ],
  questions: [
    { q: 'Onde a Ana cresceu?', options: ['No Rio', 'Na Bahia', 'Na Inglaterra'], answer: 'No Rio', why: '"I grew up in Rio."' },
    { q: 'Por que o Tom veio para o Brasil?', options: ['Arrumou um emprego de professor', 'Para estudar', 'Para se aposentar'], answer: 'Arrumou um emprego de professor', why: '"I got a job as a teacher."' },
    { q: 'Como o Tom aprendeu português?', options: ['Estudando muito', 'Muito rápido, sem estudar', 'Na escola na Inglaterra'], answer: 'Estudando muito', why: '"Not quickly! I studied hard."' },
  ],
}, 'pod-a2u15');
addScene('a2-u16', 'sitting-5', 'book');
