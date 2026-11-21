// Etapa 2 do A2 completo: unidade nova 12 — Enquanto isso… (passado contínuo com when / while).
// Gera src/content/a2/unit-12.json. Todas as lições levam "added".
// Uso: node scripts/content-add/a2-u12.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u12-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u12l${n}-${k}`, ...o });

writeUnit('a2/unit-12.json', {
  id: 'a2-u12', level: 'A2', order: 12,
  title: 'Enquanto isso…',
  subtitle: 'Passado contínuo: o que estava acontecendo quando algo aconteceu.',
  can_do: {
    text: 'Consigo contar um imprevisto: o que eu estava fazendo quando algo aconteceu.',
    source: 'CEFR (Conselho da Europa) — Produção oral: contar uma história ou acontecimento simples, nível A2',
  },
  core_inventory: ['Grammar: past continuous (was / were + -ing)', 'Grammar: past continuous + past simple with when / while', 'Functions: telling a short story', 'Vocabulary: small accidents and surprises'],
  words: [
    ['wet', 'molhado(a)'],
    ['while', 'enquanto'],
    ['happen', 'acontecer'],
    ['knock', 'bater (na porta)'],
    ['fall', 'cair'],
    ['storm', 'tempestade'],
    ['steal', 'roubar'],
    ['thief', 'ladrão, ladra'],
    ['police', 'polícia'],
    ['strange', 'estranho(a)'],
    ['noise', 'barulho'],
    ['dark', 'escuro(a)'],
    ['power', 'energia, luz (elétrica)'],
    ['shower', 'chuveiro, banho de chuveiro'],
  ],
  guide: {
    title: 'O que você estava fazendo?',
    intro: 'O passado contínuo mostra uma ação que estava em andamento no passado. Ele quase sempre aparece junto com o passado simples: uma ação longa (estava fazendo) é interrompida por uma curta (aconteceu).',
    points: [
      { en: 'I was watching TV at nine.', pt: 'Eu estava vendo TV às nove.', note: 'Was/were + verbo com -ing. "Was" com I, he, she, it; "were" com you, we, they.' },
      { en: 'They were playing football.', pt: 'Eles estavam jogando futebol.', note: 'Plural: were.' },
      { en: 'I was cooking when the phone rang.', pt: 'Eu estava cozinhando quando o telefone tocou.', note: 'A ação longa (was cooking) + "when" + a curta no passado simples (rang).' },
      { en: 'While I was sleeping, someone knocked on the door.', pt: 'Enquanto eu dormia, alguém bateu na porta.', note: '"While" = enquanto. Vai com a ação longa.' },
      { en: "We weren't listening.", pt: 'A gente não estava prestando atenção.', note: 'Negativa: wasn\'t / weren\'t + -ing.' },
      { en: 'What were you doing?', pt: 'O que você estava fazendo?', note: 'Pergunta: was/were antes da pessoa.' },
    ],
    tips: ['Em português às vezes dizemos "eu dormia" no lugar de "eu estava dormindo": em inglês os dois viram "I was sleeping".', '"When" costuma ir com a ação curta; "while", com a longa.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Eu estava fazendo', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ reading at ten last night.', pt: 'Eu estava lendo às dez ontem à noite.', options: ['was', 'were', 'am'], answer: 'was', why: 'Com "I" é "was" + -ing.', wrong: { were: '"Were" é para you, we, they.', am: '"Am" é presente; "last night" é passado.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'We ___ having dinner at eight.', pt: 'A gente estava jantando às oito.', options: ['were', 'was', 'are'], answer: 'were', why: 'Com "we" é "were" + -ing.', wrong: { was: '"Was" é para I, he, she, it.', are: 'É presente.' } }),
      I(1, 3, { type: 'meaning', en: 'She was working all day yesterday.', options: ['Ela estava trabalhando o dia todo ontem.', 'Ela trabalha o dia todo.', 'Ela vai trabalhar o dia todo amanhã.'], answer: 'Ela estava trabalhando o dia todo ontem.', why: '"Was working" = estava trabalhando.' }),
      I(1, 4, { type: 'listen', en: 'They were sleeping.', options: ['Eles estavam dormindo.', 'Eles estão dormindo.', 'Eles dormiram bem.'], answer: 'Eles estavam dormindo.', why: '"Were sleeping" = estavam dormindo.' }),
      I(1, 5, { type: 'build', pt: 'O que você estava fazendo às nove?', answer: 'What were you doing at nine', extra: ['was', 'did'], display: 'What were you doing at nine?', why: 'Pergunta: What + were + you + -ing.' }),
      I(1, 6, { type: 'choice', prompt: 'Complete:', en: 'It was ___ all morning.', pt: 'Ficou chovendo a manhã toda.', options: ['raining', 'rain', 'rained'], answer: 'raining', why: 'Was + -ing: estava chovendo.', wrong: { rain: 'Precisa do -ing depois de "was".', rained: '"Was rained" não existe.' } }),
    ]),
    L(2, 'Quando aconteceu', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'I was taking a shower when the phone ___.', pt: 'Eu estava tomando banho quando o telefone tocou.', options: ['rang', 'was ringing', 'rings'], answer: 'rang', why: 'A ação curta, que interrompe, vai no passado simples: rang (ring).', wrong: { 'was ringing': 'O telefone tocar é a ação curta: rang.', rings: 'É presente.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'He ___ when he fell.', pt: 'Ele estava correndo quando caiu.', options: ['was running', 'ran', 'runs'], answer: 'was running', why: 'Ação longa, em andamento: was running.', wrong: { ran: 'Fica estranho: correr é a ação longa, que estava acontecendo.', runs: 'É presente.' } }),
      I(2, 3, { type: 'match', pairs: [['happen', 'acontecer'], ['knock', 'bater'], ['fall', 'cair'], ['steal', 'roubar']], why: 'Passado: happened (regular), knocked (regular), fell e stole (irregulares).' }),
      I(2, 4, { type: 'meaning', en: 'We were walking home when it started to rain.', options: ['A gente estava voltando a pé para casa quando começou a chover.', 'A gente andou até em casa depois da chuva.', 'Começou a chover e a gente ficou em casa.'], answer: 'A gente estava voltando a pé para casa quando começou a chover.', why: '"Were walking" (longa) + "when it started" (curta).' }),
      I(2, 5, { type: 'build', pt: 'Eu estava dormindo quando você ligou.', answer: 'I was sleeping when you called', extra: ['slept', 'were'], display: 'I was sleeping when you called.', why: 'Longa (was sleeping) + when + curta (called).' }),
      I(2, 6, { type: 'dialogue', lines: [['A', 'Why are you wet?'], ['B', '___']], options: ['I was walking home when the storm started.', 'I walk home when the storm starts.', 'I was walk home when the storm was start.'], answer: 'I was walking home when the storm started.', pt: 'Eu estava voltando a pé quando começou a tempestade.', why: '"Wet" = molhado. Longa + when + curta.', wrong: { 'I walk home when the storm starts.': 'É presente, mas aconteceu agora há pouco.', 'I was walk home when the storm was start.': 'Faltam o -ing e o passado simples: was walking, started.' } }),
    ]),
    L(3, 'Enquanto isso', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: '___ I was cooking, my brother was watching TV.', pt: 'Enquanto eu cozinhava, meu irmão via TV.', options: ['While', 'When', 'Because'], answer: 'While', why: 'Duas ações longas ao mesmo tempo: while.', wrong: { When: '"When" vai melhor com a ação curta.', Because: '"Because" = porque.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'A thief stole my bag while I ___ coffee.', pt: 'Um ladrão roubou minha bolsa enquanto eu tomava café.', options: ['was drinking', 'drank', 'drink'], answer: 'was drinking', why: 'Depois de "while", a ação longa: was drinking.', wrong: { drank: 'Com "while", use o passado contínuo.', drink: 'É presente.' } }),
      I(3, 3, { type: 'meaning', en: 'While we were sleeping, the power went off.', options: ['Enquanto a gente dormia, a luz acabou.', 'A gente foi dormir porque a luz acabou.', 'A luz voltou enquanto a gente dormia.'], answer: 'Enquanto a gente dormia, a luz acabou.', why: '"Power" = energia elétrica. "Went off" = desligou, acabou.' }),
      I(3, 4, { type: 'listen', en: 'Someone knocked on the door while I was eating.', options: ['Alguém bateu na porta enquanto eu comia.', 'Eu bati na porta enquanto comia.', 'Ninguém bateu na porta.'], answer: 'Alguém bateu na porta enquanto eu comia.', why: '"Knock on the door" = bater na porta.' }),
      I(3, 5, { type: 'build', pt: 'Enquanto ela estudava, o gato estava dormindo.', answer: 'While she was studying the cat was sleeping', extra: ['when', 'were'], display: 'While she was studying, the cat was sleeping.', why: 'Duas ações longas ao mesmo tempo, ligadas por "while".' }),
      I(3, 6, { type: 'speak', en: 'I was cooking when the lights went off.', pt: 'Eu estava cozinhando quando a luz acabou.', why: '"Went off" = apagou, desligou.' }),
      I(3, 7, { type: 'match', pairs: [['storm', 'tempestade'], ['thief', 'ladrão'], ['police', 'polícia'], ['noise', 'barulho']], why: '"Thief" soa como "THÍIF", com a língua entre os dentes no "th".' }),
    ]),
    L(4, 'Prática: não estava, estava?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "Sorry, I ___ listening. Can you repeat?", pt: 'Desculpa, eu não estava prestando atenção. Pode repetir?', options: ["wasn't", "weren't", "didn't"], answer: "wasn't", why: 'Negativa com I: wasn\'t + -ing.', wrong: { "weren't": '"Weren\'t" é para you, we, they.', "didn't": '"Didn\'t" vai com o verbo normal: didn\'t listen.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: '___ you sleeping when I called?', pt: 'Você estava dormindo quando eu liguei?', options: ['Were', 'Was', 'Did'], answer: 'Were', why: 'Pergunta com "you": Were you + -ing?', wrong: { Was: 'Com "you" é "were".', Did: '"Did you sleeping" não existe.' } }),
      I(4, 3, { type: 'dialogue', lines: [['A', 'Were they playing outside?'], ['B', '___']], options: ["No, they weren't. It was raining.", "No, they wasn't. It was raining.", "No, they didn't. It rain."], answer: "No, they weren't. It was raining.", pt: 'Não, não estavam. Estava chovendo.', why: 'Resposta curta repete o verbo da pergunta: were → weren\'t.', wrong: { "No, they wasn't. It was raining.": 'Com "they" é "weren\'t".', "No, they didn't. It rain.": 'A pergunta usa "were"; e "rain" no passado contínuo é "was raining".' } }),
      I(4, 4, { type: 'meaning', en: 'I heard a strange noise. It was dark and I was alone.', options: ['Ouvi um barulho estranho. Estava escuro e eu estava sozinho.', 'Fiz um barulho estranho no escuro.', 'Estava claro e eu estava com amigos.'], answer: 'Ouvi um barulho estranho. Estava escuro e eu estava sozinho.', why: '"Strange" = estranho. "Dark" = escuro. "Alone" = sozinho.' }),
      I(4, 5, { type: 'build', pt: 'A gente não estava vendo o jogo.', answer: "We weren't watching the game", extra: ['wasn\'t', 'watched'], display: "We weren't watching the game.", why: 'Com "we": weren\'t + -ing.' }),
      I(4, 6, { type: 'choice', prompt: 'Complete:', en: 'What ___ when you saw the thief?', pt: 'O que estava acontecendo quando você viu o ladrão?', options: ['was happening', 'were happening', 'happened was'], answer: 'was happening', why: '"What" como sujeito pede "was": What was happening?', wrong: { 'were happening': 'Com "what" (uma coisa) é "was".', 'happened was': 'Ordem errada.' } }),
      I(4, 7, { type: 'listen', en: 'The police arrived while we were talking.', options: ['A polícia chegou enquanto a gente conversava.', 'A gente chamou a polícia.', 'A polícia estava conversando com a gente.'], answer: 'A polícia chegou enquanto a gente conversava.', why: '"Police" soa como "po-LÍIS".' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Eu estava estudando às oito.', answer: 'I was studying at eight.', why: 'Was + -ing. Horário com "at".' }),
      I(5, 2, { type: 'type', pt: 'Eles estavam jogando futebol.', answer: 'They were playing football.', accept: ['They were playing soccer.'], why: 'Com "they": were + -ing.' }),
      I(5, 3, { type: 'dictation', en: 'It was raining when we left.', why: '"Left" é o passado de "leave" (sair).' }),
      I(5, 4, { type: 'type', pt: 'O que você estava fazendo?', answer: 'What were you doing?', why: 'Pergunta: What + were + you + doing.' }),
      I(5, 5, { type: 'dictation', en: 'She fell while she was running.', why: '"Fell" é o passado de "fall" (cair).' }),
      I(5, 6, { type: 'type', pt: 'Eu não estava dormindo.', answer: "I wasn't sleeping.", accept: ['I was not sleeping.'], why: 'Negativa: wasn\'t + -ing.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'I was waiting for the bus when I saw her.', options: ['Eu estava esperando o ônibus quando a vi.', 'Eu esperei o ônibus com ela.', 'Ela estava esperando o ônibus.'], answer: 'Eu estava esperando o ônibus quando a vi.', why: '"Wait for" = esperar. "Saw" = vi (see).' }),
      I(6, 2, { type: 'dictation', en: 'We were having lunch.', why: '"Have lunch" = almoçar.' }),
      I(6, 3, { type: 'listen', en: 'Somebody stole his phone on the train.', options: ['Alguém roubou o celular dele no trem.', 'Ele perdeu o celular no ônibus.', 'Ele roubou um celular no trem.'], answer: 'Alguém roubou o celular dele no trem.', why: '"Stole" é o passado de "steal" (roubar).' }),
      I(6, 4, { type: 'dictation', en: 'There was a big storm last night.', why: '"Storm" = tempestade.' }),
      I(6, 5, { type: 'listen', en: "We weren't at home when it happened.", options: ['A gente não estava em casa quando aconteceu.', 'A gente estava em casa quando aconteceu.', 'Não aconteceu nada em casa.'], answer: 'A gente não estava em casa quando aconteceu.', why: '"Happen" = acontecer. "Weren\'t" = não estávamos.' }),
      I(6, 6, { type: 'dictation', en: 'The lights went off.', why: '"Went off" = apagaram.' }),
      I(6, 7, { type: 'speak', en: 'I was taking a shower.', pt: 'Eu estava tomando banho.', why: '"Take a shower" = tomar banho (de chuveiro).' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'I called you at ten. Where were you?'], ['B', '___']], options: ['Sorry, I was driving.', 'Sorry, I drive.', 'Sorry, I am driving yesterday.'], answer: 'Sorry, I was driving.', pt: 'Desculpa, eu estava dirigindo.', why: 'Explica o que você estava fazendo naquela hora: was driving.', wrong: { 'Sorry, I drive.': 'É presente.', 'Sorry, I am driving yesterday.': '"Am" é presente e "yesterday" é passado.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'What happened to your arm?'], ['B', '___']], options: ['I fell while I was playing tennis.', 'I fall while I play tennis.', 'I was fall when I played tennis.'], answer: 'I fell while I was playing tennis.', pt: 'Caí enquanto jogava tênis.', why: 'Curta no passado simples (fell) + while + longa (was playing).', wrong: { 'I fall while I play tennis.': 'Aconteceu no passado.', 'I was fall when I played tennis.': 'Trocou as formas: fell (curta) e was playing (longa).' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Did you hear the storm last night?'], ['B', '___']], options: ['No, I was sleeping!', 'No, I sleep!', 'No, I was sleep!'], answer: 'No, I was sleeping!', pt: 'Não, eu estava dormindo!', why: '"Was sleeping" = estava dormindo.', wrong: { 'No, I sleep!': 'É presente.', 'No, I was sleep!': 'Falta o -ing.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'A thief stole my bag!'], ['B', '___']], options: ['Oh no! What were you doing?', 'Oh no! What did you doing?', 'Oh no! What you were do?'], answer: 'Oh no! What were you doing?', pt: 'Ah, não! O que você estava fazendo?', why: 'Pergunta no passado contínuo: What + were + you + doing?', wrong: { 'Oh no! What did you doing?': '"Did" não combina com -ing.', 'Oh no! What you were do?': 'Ordem e forma erradas.' } }),
      I(7, 5, { type: 'speak', en: 'What were you doing when it happened?', pt: 'O que você estava fazendo quando aconteceu?', why: '"Happened" soa como "RÉ-pend".' }),
      I(7, 6, { type: 'speak', en: "Sorry, I wasn't listening.", pt: 'Desculpa, eu não estava prestando atenção.', why: '"Listening": o "t" é mudo: "LÍ-se-nin".' }),
    ]),
    L(8, 'Lendo: quando a luz acabou', [
      I(8, 1, { type: 'story', why: 'O Pedro conta o que aconteceu numa noite de tempestade. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que o Pedro estava fazendo quando a luz acabou?', options: ['Vendo um filme', 'Dormindo', 'Cozinhando'], answer: 'Vendo um filme', why: '"I was watching a film when the power went off."' }),
      I(8, 3, { type: 'quiz', q: 'Quem bateu na porta?', options: ['O vizinho', 'A polícia', 'Um ladrão'], answer: 'O vizinho', why: '"It was my neighbour!"' }),
      I(8, 4, { type: 'quiz', q: 'O que o vizinho trouxe?', options: ['Uma lanterna', 'Comida', 'Um guarda-chuva'], answer: 'Uma lanterna', why: '"He brought a lamp" = ele trouxe uma lanterna (uma luz).' }),
    ], {
      title: 'Quando a luz acabou',
      lines: [
        { who: 'Pedro', en: 'Last night there was a big storm. It was raining a lot.', pt: 'Ontem à noite teve uma tempestade forte. Estava chovendo muito.' },
        { who: 'Pedro', en: 'I was watching a film when the power went off. Everything was dark!', pt: 'Eu estava vendo um filme quando a luz acabou. Ficou tudo escuro!' },
        { ask: 'O que aconteceu durante o filme?', options: ['A luz acabou', 'O telefone tocou', 'A TV quebrou'], answer: 'A luz acabou', why: '"The power went off" = a luz acabou.' },
        { who: 'Pedro', en: '___ I was looking for my phone, I heard a strange noise.', pt: 'Enquanto eu procurava meu celular, ouvi um barulho estranho.', gap: { answer: 'While', options: ['While', 'Because', 'Ago'] } },
        { who: 'Pedro', en: 'Someone was knocking on the door. I was a little afraid.', pt: 'Alguém estava batendo na porta. Fiquei com um pouco de medo.' },
        { who: 'Pedro', en: 'It was my neighbour! He brought a lamp. What a nice man!', pt: 'Era o meu vizinho! Ele trouxe uma lanterna. Que homem gentil!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'They ___ dinner when we arrived.', pt: 'Eles estavam jantando quando a gente chegou.', options: ['were having', 'was having', 'had having'], answer: 'were having', why: 'Com "they": were + -ing.', wrong: { 'was having': 'Com "they" é "were".', 'had having': 'Não existe.' } }),
      I(9, 2, { type: 'type', pt: 'Ela estava dormindo quando eu liguei.', answer: 'She was sleeping when I called.', why: 'Longa (was sleeping) + when + curta (called).' }),
      I(9, 3, { type: 'meaning', en: 'While I was waiting, I read a book.', options: ['Enquanto eu esperava, li um livro.', 'Eu esperei porque estava lendo.', 'Eu li um livro sobre espera.'], answer: 'Enquanto eu esperava, li um livro.', why: '"While" + ação longa.' }),
      I(9, 4, { type: 'dictation', en: 'What were you doing at midnight?', why: '"Midnight" = meia-noite.' }),
      I(9, 5, { type: 'listen', en: 'The thief was running when the police stopped him.', options: ['O ladrão estava correndo quando a polícia o parou.', 'A polícia estava correndo atrás do ladrão.', 'O ladrão parou de correr sozinho.'], answer: 'O ladrão estava correndo quando a polícia o parou.', why: '"Was running" (longa) + "stopped" (curta).' }),
      I(9, 6, { type: 'build', pt: 'Eu estava andando no parque quando começou a chover.', answer: 'I was walking in the park when it started to rain', extra: ['walked', 'while'], display: 'I was walking in the park when it started to rain.', why: 'Longa + when + curta.' }),
    ]),
    L(10, 'História: o celular perdido', [
      I(10, 1, { type: 'story', why: 'A Laura acha que roubaram o celular dela. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde a Laura estava?', options: ['Num café', 'No trem', 'Em casa'], answer: 'Num café', why: '"I was having coffee at the coffee shop."' }),
      I(10, 3, { type: 'quiz', q: 'O que ela estava fazendo quando percebeu?', options: ['Lendo um livro', 'Falando ao telefone', 'Pagando a conta'], answer: 'Lendo um livro', why: '"I was reading a book."' }),
      I(10, 4, { type: 'quiz', q: 'Onde estava o celular?', options: ['Embaixo do livro', 'Com um ladrão', 'No carro'], answer: 'Embaixo do livro', why: '"It was under your book!"' }),
    ], {
      title: 'O celular perdido',
      lines: [
        { who: 'Laura', en: 'Ben, I think someone stole my phone!', pt: 'Ben, acho que roubaram meu celular!' },
        { who: 'Ben', en: 'Oh no! What were you doing?', pt: 'Ah, não! O que você estava fazendo?' },
        { who: 'Laura', en: 'I was having coffee at the coffee shop. I was ___ a book.', pt: 'Eu estava tomando café na cafeteria. Estava lendo um livro.', gap: { answer: 'reading', options: ['reading', 'read', 'reads'] } },
        { who: 'Ben', en: 'Did you see anybody strange?', pt: 'Você viu alguém estranho?' },
        { who: 'Laura', en: 'No. A man was sitting near me, but he was talking on the phone.', pt: 'Não. Um homem estava sentado perto de mim, mas estava falando ao telefone.' },
        { ask: 'O que o homem perto dela estava fazendo?', options: ['Falando ao telefone', 'Lendo um livro', 'Dormindo'], answer: 'Falando ao telefone', why: '"He was talking on the phone."' },
        { who: 'Ben', en: "Wait. Look! It's here. It was under your book!", pt: 'Espera. Olha! Está aqui. Estava embaixo do seu livro!' },
        { who: 'Laura', en: "Oh, thank you! I'm so happy. And I feel a bit silly!", pt: 'Ai, obrigada! Estou tão feliz. E me sinto meio boba!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u12', level: 'A2', unlock: 'a2-u12', title: 'Onde você estava quando…?',
  intro: 'A Ana e o Tom contam o que estavam fazendo quando uma coisa engraçada aconteceu.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're telling funny stories.", pt: 'E eu sou o Tom. Hoje vamos contar histórias engraçadas.' },
    { who: 'ana', en: 'Tom, what happened last week?', pt: 'Tom, o que aconteceu na semana passada?' },
    { who: 'tom', en: 'I was singing in the shower when my mother called.', pt: 'Eu estava cantando no chuveiro quando minha mãe ligou.' },
    { who: 'ana', en: 'And?', pt: 'E aí?' },
    { who: 'tom', en: 'I answered the phone and dropped it in the water!', pt: 'Atendi o telefone e deixei cair na água!' },
    { who: 'ana', en: "Oh no! My story: I was walking my dog while I was eating an ice cream.", pt: 'Ah, não! Minha história: eu estava passeando com meu cachorro enquanto tomava um sorvete.' },
    { who: 'tom', en: 'Let me guess. The dog ate it?', pt: 'Deixa eu adivinhar. O cachorro comeu?' },
    { who: 'ana', en: "Yes! That's all for today. Thank you for listening!", pt: 'Isso! Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye! See you soon!', pt: 'Tchau! Até logo!' },
  ],
  questions: [
    { q: 'O que o Tom estava fazendo quando a mãe ligou?', options: ['Cantando no chuveiro', 'Dirigindo', 'Dormindo'], answer: 'Cantando no chuveiro', why: '"I was singing in the shower."' },
    { q: 'O que aconteceu com o celular do Tom?', options: ['Caiu na água', 'Foi roubado', 'Quebrou no chão'], answer: 'Caiu na água', why: '"I dropped it in the water!"' },
    { q: 'O que o cachorro da Ana fez?', options: ['Comeu o sorvete', 'Fugiu', 'Latiu muito'], answer: 'Comeu o sorvete', why: '"The dog ate it?" — "Yes!"' },
  ],
}, 'pod-a2u11');
addScene('a2-u12', 'standing-17', 'rain');
