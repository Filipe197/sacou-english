// Etapa 1 do A2 completo: 3 lições novas na unidade 4 (Agora mesmo — presente contínuo).
// Uso: node scripts/content-add/a2-u4.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-04.json', {
  words: [
    ['upstairs', 'lá em cima, no andar de cima'],
    ['downstairs', 'lá embaixo, no andar de baixo'],
    ['cooking', 'cozinhando'],
    ['crying', 'chorando (cry)'],
    ['smiling', 'sorrindo (smile)'],
    ['ringing', 'tocando (telefone, campainha) (ring)'],
    ['shining', 'brilhando (o sol) (shine)'],
    ['snowing', 'nevando (snow)'],
    ['hurry', 'pressa'],
    ['mall', 'shopping (o prédio)'],
  ],
  lessons: [
    { after: 'a2-u4-l3', lesson: {
      id: 'a2-u4-l8', title: 'O que está acontecendo?', items: [
        { id: 'a2u4l8-1', type: 'match', pairs: [['crying', 'chorando'], ['smiling', 'sorrindo'], ['ringing', 'tocando'], ['snowing', 'nevando']], why: 'Verbo + -ing. Se termina em "e" mudo, o "e" cai: smile → smiling, shine → shining.' },
        { id: 'a2u4l8-2', type: 'choice', prompt: 'Complete:', en: 'Your phone is ___!', pt: 'Seu celular está tocando!', options: ['ringing', 'ring', 'rings'], answer: 'ringing', why: 'Presente contínuo: is + verbo com -ing. Está acontecendo agora.', wrong: { ring: 'Depois de "is", o verbo vai com -ing.', rings: '"Rings" é para o que acontece sempre, não agora.' } },
        { id: 'a2u4l8-3', type: 'choice', prompt: 'Complete:', en: 'Mom is ___ dinner downstairs.', pt: 'A mãe está fazendo o jantar lá embaixo.', options: ['cooking', 'cook', 'cooks'], answer: 'cooking', why: 'Is + cooking: ação acontecendo agora.', wrong: { cook: 'Falta o -ing depois de "is".', cooks: '"Cooks" é rotina (ela cozinha todo dia).' } },
        { id: 'a2u4l8-4', type: 'choice', prompt: 'Complete:', en: 'Why ___ the baby crying?', pt: 'Por que o bebê está chorando?', options: ['is', 'are', 'does'], answer: 'is', why: 'Pergunta no presente contínuo: Why + is + o bebê + crying?', wrong: { are: '"The baby" é um só: is.', does: '"Does" é para o presente simples (rotina).' } },
        { id: 'a2u4l8-5', type: 'build', pt: 'Não posso falar agora. Estou com pressa.', answer: "I can't talk now. I'm in a hurry", extra: ['have', 'talking'], display: "I can't talk now. I'm in a hurry.", why: '"Estar com pressa" em inglês é "be in a hurry": I\'m in a hurry.' },
        { id: 'a2u4l8-6', type: 'meaning', en: "The sun is shining but it's snowing in the mountains.", options: ['O sol está brilhando, mas está nevando nas montanhas.', 'O sol está forte e está chovendo nas montanhas.', 'Está nevando e o sol foi embora.'], answer: 'O sol está brilhando, mas está nevando nas montanhas.', why: '"Shining" = brilhando. "Snowing" = nevando.' },
        { id: 'a2u4l8-7', type: 'dialogue', lines: [['A', 'Where are the kids?'], ['B', '___']], options: ["They're upstairs. They're playing a game.", "They're upstairs. They play a game.", "They upstairs. They're play a game."], answer: "They're upstairs. They're playing a game.", pt: 'Estão lá em cima. Estão jogando um jogo.', why: 'Para o que está acontecendo agora: they\'re + playing.', wrong: { "They're upstairs. They play a game.": '"They play" é rotina. Agora é "they\'re playing".', "They upstairs. They're play a game.": 'Falta o "are" na primeira frase e o -ing na segunda.' } },
      ],
    } },
    { after: 'a2-u4-l4', lesson: {
      id: 'a2-u4-l9', title: 'Ouvindo', items: [
        { id: 'a2u4l9-1', type: 'listen', en: "I'm at the mall. I'm buying a present.", options: ['Estou no shopping. Estou comprando um presente.', 'Estou no mercado. Estou comprando comida.', 'Estou em casa. Estou fazendo um presente.'], answer: 'Estou no shopping. Estou comprando um presente.', why: '"Mall" = shopping. "Present" = presente (de dar).' },
        { id: 'a2u4l9-2', type: 'dictation', en: 'Someone is ringing the bell.', why: '"Ring the bell" = tocar a campainha.' },
        { id: 'a2u4l9-3', type: 'listen', en: "Is it snowing where you are?", options: ['Está nevando onde você está?', 'Está chovendo onde você está?', 'Você gosta de neve?'], answer: 'Está nevando onde você está?', why: '"Snowing" = nevando. "Raining" seria chovendo.' },
        { id: 'a2u4l9-4', type: 'dictation', en: 'She is smiling at me.', why: '"Smile at" = sorrir para alguém.' },
        { id: 'a2u4l9-5', type: 'listen', en: "Dad's working upstairs.", options: ['O pai está trabalhando lá em cima.', 'O pai está trabalhando lá embaixo.', 'O pai trabalha num prédio alto.'], answer: 'O pai está trabalhando lá em cima.', why: '"Dad\'s" aqui é "Dad is". "Upstairs" = lá em cima.' },
        { id: 'a2u4l9-6', type: 'dictation', en: "Why are you crying?", why: '"Crying" soa como "CRÁI-in".' },
        { id: 'a2u4l9-7', type: 'speak', en: "Sorry, I'm in a hurry right now.", pt: 'Desculpa, estou com pressa agora.', why: '"Hurry" soa como "RÂ-ri", com o h aspirado.' },
      ],
    } },
    { after: 'a2-u4-l5', lesson: {
      id: 'a2-u4-l10', title: 'Lendo: a casa da Nina',
      story: {
        title: 'A casa da Nina no domingo',
        lines: [
          { who: 'Nina', en: "It's Sunday afternoon and everybody is at home.", pt: 'É domingo à tarde e todo mundo está em casa.' },
          { who: 'Nina', en: 'My dad is cooking downstairs. It smells great!', pt: 'Meu pai está cozinhando lá embaixo. Está com um cheiro ótimo!' },
          { ask: 'O que o pai está fazendo?', options: ['Cozinhando', 'Dormindo', 'Trabalhando'], answer: 'Cozinhando', why: '"My dad is cooking downstairs."' },
          { who: 'Nina', en: 'My brother is ___ video games upstairs.', pt: 'Meu irmão está jogando videogame lá em cima.', gap: { answer: 'playing', options: ['playing', 'play', 'plays'] } },
          { who: 'Nina', en: "Outside, the sun is shining, but it's very cold.", pt: 'Lá fora o sol está brilhando, mas está muito frio.' },
          { who: 'Nina', en: "And me? I'm sitting on the sofa and reading. I'm not in a hurry today!", pt: 'E eu? Estou sentada no sofá, lendo. Hoje não estou com pressa!' },
          { ask: 'O que a Nina está fazendo?', options: ['Lendo no sofá', 'Cozinhando', 'Jogando videogame'], answer: 'Lendo no sofá', why: '"I\'m sitting on the sofa and reading."' },
        ],
      },
      items: [
        { id: 'a2u4l10-1', type: 'story', why: 'A Nina conta o que cada um está fazendo agora. Leia com calma e ouça cada frase.' },
        { id: 'a2u4l10-2', type: 'quiz', q: 'Onde está o irmão?', options: ['Lá em cima', 'Lá embaixo', 'Na rua'], answer: 'Lá em cima', why: '"Upstairs" = lá em cima.' },
        { id: 'a2u4l10-3', type: 'quiz', q: 'Como está o tempo?', options: ['Sol, mas muito frio', 'Chovendo e quente', 'Nevando'], answer: 'Sol, mas muito frio', why: '"The sun is shining, but it\'s very cold."' },
        { id: 'a2u4l10-4', type: 'quiz', q: 'A Nina está com pressa?', options: ['Não', 'Sim', 'Não dá para saber'], answer: 'Não', why: '"I\'m not in a hurry today!"' },
      ],
    } },
  ],
});
