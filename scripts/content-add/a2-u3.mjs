// Etapa 1 do A2 completo: 3 lições novas na unidade 3 (Fim de semana e viagens — passado irregular).
// Uso: node scripts/content-add/a2-u3.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-03.json', {
  words: [
    ['flew (fly)', 'voou, foi de avião'],
    ['drove (drive)', 'dirigiu, foi de carro'],
    ['slept (sleep)', 'dormiu'],
    ['spent (spend)', 'passou (o tempo), gastou (dinheiro)'],
    ['forgot (forget)', 'esqueceu'],
    ['brought (bring)', 'trouxe'],
    ['village', 'vila, cidadezinha'],
    ['lake', 'lago'],
    ['suitcase', 'mala'],
    ['view', 'vista'],
    ['camping', 'acampar, acampamento'],
  ],
  lessons: [
    { after: 'a2-u3-l3', lesson: {
      id: 'a2-u3-l8', title: 'Mais verbos irregulares', items: [
        { id: 'a2u3l8-1', type: 'match', pairs: [['flew', 'voou'], ['drove', 'dirigiu'], ['slept', 'dormiu'], ['forgot', 'esqueceu']], why: 'Irregulares não levam -ed: fly → flew, drive → drove, sleep → slept, forget → forgot. Esses a gente decora.' },
        { id: 'a2u3l8-2', type: 'choice', prompt: 'Complete:', en: 'We ___ to Lisbon last summer.', pt: 'Nós fomos de avião para Lisboa no verão passado.', options: ['flew', 'flied', 'fly'], answer: 'flew', why: '"Fly" é irregular: o passado é "flew".', wrong: { flied: '"Flied" não existe. O passado de fly é flew.', fly: '"Last summer" pede o passado.' } },
        { id: 'a2u3l8-3', type: 'choice', prompt: 'Complete:', en: 'I ___ my suitcase at home!', pt: 'Eu esqueci minha mala em casa!', options: ['forgot', 'forgetted', 'forget'], answer: 'forgot', why: '"Forget" é irregular: forgot.', wrong: { forgetted: 'Não existe. O passado de forget é forgot.', forget: 'A história já aconteceu: precisa do passado.' } },
        { id: 'a2u3l8-4', type: 'choice', prompt: 'Complete:', en: 'They ___ three days in a small village.', pt: 'Eles passaram três dias numa vilazinha.', options: ['spent', 'spended', 'passed'], answer: 'spent', why: '"Passar" tempo em algum lugar é "spend", e o passado é "spent".', wrong: { spended: 'Spend é irregular: spent.', passed: '"Pass" é passar por um lugar ou passar numa prova, não passar tempo.' } },
        { id: 'a2u3l8-5', type: 'build', pt: 'Nós dormimos num hotelzinho perto do lago.', answer: 'We slept in a small hotel near the lake', extra: ['sleeped', 'on'], display: 'We slept in a small hotel near the lake.', why: '"Sleep" vira "slept" no passado. "Near the lake" = perto do lago.' },
        { id: 'a2u3l8-6', type: 'meaning', en: 'My dad drove and my mom brought the food.', options: ['Meu pai dirigiu e minha mãe trouxe a comida.', 'Meu pai trouxe a comida e minha mãe dirigiu.', 'Meu pai comprou a comida e minha mãe cozinhou.'], answer: 'Meu pai dirigiu e minha mãe trouxe a comida.', why: '"Drove" = dirigiu (drive). "Brought" = trouxe (bring).' },
        { id: 'a2u3l8-7', type: 'dialogue', lines: [['A', 'Did you fly to Salvador?'], ['B', '___']], options: ['No, we drove. It took ten hours.', 'No, we drived. It taked ten hours.', 'No, we drive. It takes ten hours.'], answer: 'No, we drove. It took ten hours.', pt: 'Não, fomos de carro. Levou dez horas.', why: 'Passado irregular: drive → drove, take → took.', wrong: { 'No, we drived. It taked ten hours.': '"Drived" e "taked" não existem: drove e took.', 'No, we drive. It takes ten hours.': 'A viagem já aconteceu: passado.' } },
      ],
    } },
    { after: 'a2-u3-l4', lesson: {
      id: 'a2-u3-l9', title: 'Ouvindo', items: [
        { id: 'a2u3l9-1', type: 'listen', en: 'The view from the hotel was beautiful.', options: ['A vista do hotel era linda.', 'O hotel era muito caro.', 'A viagem para o hotel foi longa.'], answer: 'A vista do hotel era linda.', why: '"View" = vista. Soa como "VIÚ".' },
        { id: 'a2u3l9-2', type: 'dictation', en: 'We went camping by the lake.', why: '"Go camping" = ir acampar. "By the lake" = à beira do lago.' },
        { id: 'a2u3l9-3', type: 'listen', en: 'I spent all my money on the trip.', options: ['Gastei todo o meu dinheiro na viagem.', 'Ganhei muito dinheiro na viagem.', 'Esqueci meu dinheiro na viagem.'], answer: 'Gastei todo o meu dinheiro na viagem.', why: '"Spend money" = gastar dinheiro. "Spent" é o passado.' },
        { id: 'a2u3l9-4', type: 'dictation', en: 'She slept on the plane.', why: '"Slept" soa como "SLÉPT". "On the plane" = no avião.' },
        { id: 'a2u3l9-5', type: 'listen', en: 'Did you bring your camera?', options: ['Você trouxe sua câmera?', 'Você comprou uma câmera?', 'Você esqueceu sua câmera?'], answer: 'Você trouxe sua câmera?', why: 'Com "did", o verbo fica normal: bring (e não brought).' },
        { id: 'a2u3l9-6', type: 'dictation', en: 'They flew to New York.', why: '"Flew" soa como "FLU", igual a "flu" (gripe).' },
        { id: 'a2u3l9-7', type: 'speak', en: 'We drove to a small village.', pt: 'Fomos de carro para uma vilazinha.', why: '"Drove" soa como "DRÔUV". "Village" = "VI-lidj".' },
      ],
    } },
    { after: 'a2-u3-l5', lesson: {
      id: 'a2-u3-l10', title: 'Lendo: o cartão-postal do Leo',
      story: {
        title: 'O cartão-postal do Leo',
        lines: [
          { who: 'Leo', en: 'Hi Paula! We are in the mountains. We drove here on Friday.', pt: 'Oi, Paula! Estamos nas montanhas. Viemos de carro na sexta.' },
          { who: 'Leo', en: 'On the first night we went camping near a big lake.', pt: 'Na primeira noite a gente foi acampar perto de um lago grande.' },
          { ask: 'Onde eles acamparam?', options: ['Perto de um lago', 'Na praia', 'Num hotel'], answer: 'Perto de um lago', why: '"Near a big lake" = perto de um lago grande.' },
          { who: 'Leo', en: 'It was cold, and I ___ my jacket at home!', pt: 'Estava frio, e eu esqueci minha jaqueta em casa!', gap: { answer: 'forgot', options: ['forgot', 'brought', 'bought'] } },
          { who: 'Leo', en: 'Yesterday we visited a little village. The view was beautiful.', pt: 'Ontem visitamos uma vilazinha. A vista era linda.' },
          { who: 'Leo', en: 'I spent too much money on souvenirs, but I bought one for you!', pt: 'Gastei dinheiro demais com lembrancinhas, mas comprei uma para você!' },
          { ask: 'O que o Leo comprou para a Paula?', options: ['Uma lembrancinha', 'Uma jaqueta', 'Uma câmera'], answer: 'Uma lembrancinha', why: '"I bought one for you" = comprei uma (lembrancinha) para você.' },
        ],
      },
      items: [
        { id: 'a2u3l10-1', type: 'story', why: 'O Leo manda um cartão-postal das férias. Leia com calma e ouça cada frase.' },
        { id: 'a2u3l10-2', type: 'quiz', q: 'Como eles chegaram às montanhas?', options: ['De carro', 'De avião', 'De ônibus'], answer: 'De carro', why: '"We drove here" = viemos de carro.' },
        { id: 'a2u3l10-3', type: 'quiz', q: 'O que o Leo esqueceu?', options: ['A jaqueta', 'A mala', 'O dinheiro'], answer: 'A jaqueta', why: '"I forgot my jacket at home."' },
        { id: 'a2u3l10-4', type: 'quiz', q: 'Como era a vista da vilazinha?', options: ['Linda', 'Feia', 'Escura'], answer: 'Linda', why: '"The view was beautiful" = a vista era linda.' },
      ],
    } },
  ],
  extraVocab: [{ word: 'souvenir', reason: 'palavra comum de viagem (B1), aparece uma vez com tradução na leitura' }],
});
