// Etapa 1 do B1 completo: 3 lições novas na unidade 3 (Contando histórias — narrar com ordem e emoção).
// Uso: node scripts/content-add/b1-u3.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-03.json', {
  words: [
    ['afterwards', 'depois, em seguida'],
    ['eventually', 'no fim das contas, por fim'],
    ['meanwhile', 'enquanto isso'],
    ['luckily', 'por sorte'],
    ['realise', 'perceber, se dar conta'],
    ['notice', 'notar, reparar'],
    ['escape', 'escapar, fugir'],
    ['rescue', 'resgatar, salvar'],
    ['wallet', 'carteira (de dinheiro)'],
    ['frightened', 'assustado(a)'],
    ['disaster', 'desastre'],
  ],
  lessons: [
    { after: 'b1-u3-l3', lesson: {
      id: 'b1-u3-l8', title: 'Primeiro, depois, no fim', items: [
        { id: 'b1u3l8-1', type: 'match', pairs: [['afterwards', 'depois'], ['meanwhile', 'enquanto isso'], ['eventually', 'no fim das contas'], ['luckily', 'por sorte']], why: 'Cuidado: "eventually" NÃO é "eventualmente". Quer dizer "no fim das contas, depois de um tempo".' },
        { id: 'b1u3l8-2', type: 'choice', prompt: 'Complete:', en: 'We waited for hours. ___, the bus arrived.', pt: 'Esperamos horas. No fim das contas, o ônibus chegou.', options: ['Eventually', 'Meanwhile', 'Suddenly'], answer: 'Eventually', why: '"Eventually" = depois de muito tempo, por fim.', wrong: { Meanwhile: '"Meanwhile" = enquanto isso, ao mesmo tempo.', Suddenly: '"Suddenly" = de repente; não combina com "esperamos horas".' } },
        { id: 'b1u3l8-3', type: 'choice', prompt: 'Complete:', en: 'I was cooking. ___, my husband was cleaning the car.', pt: 'Eu estava cozinhando. Enquanto isso, meu marido lavava o carro.', options: ['Meanwhile', 'Afterwards', 'Eventually'], answer: 'Meanwhile', why: '"Meanwhile" = enquanto isso: duas coisas ao mesmo tempo.', wrong: { Afterwards: '"Afterwards" = depois, uma coisa após a outra.', Eventually: '"Eventually" = no fim das contas.' } },
        { id: 'b1u3l8-4', type: 'meaning', en: "When I got home, I realised I didn't have my wallet.", options: ['Quando cheguei em casa, percebi que estava sem a carteira.', 'Quando cheguei em casa, achei minha carteira.', 'Antes de sair de casa, peguei a carteira.'], answer: 'Quando cheguei em casa, percebi que estava sem a carteira.', why: '"Realise" = perceber, se dar conta. "Wallet" = carteira.' },
        { id: 'b1u3l8-5', type: 'build', pt: 'Por sorte, um vizinho nos resgatou.', answer: 'Luckily a neighbour rescued us', extra: ['lucky', 'we'], display: 'Luckily, a neighbour rescued us.', why: '"Luckily" abre a frase. Depois do verbo: us.' },
        { id: 'b1u3l8-6', type: 'choice', prompt: 'Complete:', en: 'Did you ___ anything strange last night?', pt: 'Você notou alguma coisa estranha ontem à noite?', options: ['notice', 'noticed', 'realise'], answer: 'notice', why: '"Notice" = notar com os olhos ou ouvidos. Com "did", verbo normal.', wrong: { noticed: 'Com "did", o verbo fica sem -ed.', realise: '"Realise" é entender algo na cabeça, não ver.' } },
        { id: 'b1u3l8-7', type: 'dialogue', lines: [['A', 'So what happened next?'], ['B', '___']], options: ['Afterwards, we called the police and waited.', 'Afterwards, we call the police and wait.', 'Afterwards, we were call the police.'], answer: 'Afterwards, we called the police and waited.', pt: 'Depois, ligamos para a polícia e esperamos.', why: 'Na história, as ações em sequência ficam no passado simples.', wrong: { 'Afterwards, we call the police and wait.': 'A história é no passado: called, waited.', 'Afterwards, we were call the police.': '"Were call" não existe.' } },
      ],
    } },
    { after: 'b1-u3-l4', lesson: {
      id: 'b1-u3-l9', title: 'Ouvindo', items: [
        { id: 'b1u3l9-1', type: 'listen', en: 'The dog escaped while we were having lunch.', options: ['O cachorro fugiu enquanto a gente almoçava.', 'O cachorro almoçou com a gente.', 'A gente saiu com o cachorro depois do almoço.'], answer: 'O cachorro fugiu enquanto a gente almoçava.', why: '"Escape" = fugir, escapar.' },
        { id: 'b1u3l9-2', type: 'dictation', en: 'I was really frightened.', why: '"Frightened" soa como "FRÁI-tend".' },
        { id: 'b1u3l9-3', type: 'listen', en: 'Luckily, nobody was hurt.', options: ['Por sorte, ninguém se machucou.', 'Infelizmente, alguém se machucou.', 'Ninguém viu o que aconteceu.'], answer: 'Por sorte, ninguém se machucou.', why: '"Luckily" = por sorte. "Hurt" = machucado.' },
        { id: 'b1u3l9-4', type: 'dictation', en: 'The party was a total disaster.', why: '"Disaster" soa como "di-ZÁS-ter".' },
        { id: 'b1u3l9-5', type: 'listen', en: "I didn't notice that she had a new haircut.", options: ['Não reparei que ela tinha cortado o cabelo.', 'Não gostei do novo corte de cabelo dela.', 'Ela não notou meu cabelo novo.'], answer: 'Não reparei que ela tinha cortado o cabelo.', why: '"Notice" = reparar, notar.' },
        { id: 'b1u3l9-6', type: 'dictation', en: 'Eventually, we found the way home.', why: '"Eventually" = no fim das contas.' },
        { id: 'b1u3l9-7', type: 'speak', en: 'Meanwhile, it started to rain.', pt: 'Enquanto isso, começou a chover.', why: '"Meanwhile" soa como "MÍIN-uail".' },
      ],
    } },
    { after: 'b1-u3-l5', lesson: {
      id: 'b1-u3-l10', title: 'Lendo: o pior dia de férias',
      story: {
        title: 'O pior dia de férias',
        lines: [
          { who: 'Marcos', en: 'Last summer we went camping in the mountains. The first day was perfect.', pt: 'No verão passado fomos acampar nas montanhas. O primeiro dia foi perfeito.' },
          { who: 'Marcos', en: "On the second day, while we were walking, I realised I didn't have my wallet.", pt: 'No segundo dia, enquanto caminhávamos, percebi que estava sem a carteira.' },
          { ask: 'O que o Marcos percebeu?', options: ['Que estava sem a carteira', 'Que estava perdido', 'Que ia chover'], answer: 'Que estava sem a carteira', why: '"I realised I didn\'t have my wallet."' },
          { who: 'Marcos', en: '___, a big storm started, and we got completely lost.', pt: 'Enquanto isso, começou uma tempestade forte e a gente se perdeu completamente.', gap: { answer: 'Meanwhile', options: ['Meanwhile', 'Luckily', 'Eventually'] } },
          { who: 'Marcos', en: 'We were cold and frightened. Luckily, a farmer noticed our lights and rescued us.', pt: 'Estávamos com frio e assustados. Por sorte, um fazendeiro viu nossas luzes e nos resgatou.' },
          { who: 'Marcos', en: 'Afterwards, he gave us hot soup. And eventually, I found my wallet in my sleeping bag!', pt: 'Depois, ele nos deu uma sopa quente. E, no fim, achei minha carteira no meu saco de dormir!' },
          { ask: 'Onde estava a carteira?', options: ['No saco de dormir', 'Na casa do fazendeiro', 'Na montanha'], answer: 'No saco de dormir', why: '"I found my wallet in my sleeping bag!"' },
        ],
      },
      items: [
        { id: 'b1u3l10-1', type: 'story', why: 'O Marcos conta o dia em que tudo deu errado no acampamento. Leia com calma e ouça cada frase.' },
        { id: 'b1u3l10-2', type: 'quiz', q: 'Quem resgatou o grupo?', options: ['Um fazendeiro', 'A polícia', 'Um vizinho'], answer: 'Um fazendeiro', why: '"A farmer noticed our lights and rescued us."' },
        { id: 'b1u3l10-3', type: 'quiz', q: 'Como o fazendeiro os achou?', options: ['Viu as luzes deles', 'Ouviu gritos', 'Recebeu uma ligação'], answer: 'Viu as luzes deles', why: '"Noticed our lights" = viu nossas luzes.' },
        { id: 'b1u3l10-4', type: 'quiz', q: 'O que o fazendeiro deu para eles?', options: ['Sopa quente', 'Dinheiro', 'Uma barraca'], answer: 'Sopa quente', why: '"He gave us hot soup."' },
      ],
    } },
  ],
});
