// Etapa 1 do A2 completo: 3 lições novas na unidade 5 (Comparando coisas — comparativo e superlativo).
// Uso: node scripts/content-add/a2-u5.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-05.json', {
  words: [
    ['heavy / light', 'pesado / leve'],
    ['safe', 'seguro(a)'],
    ['dangerous', 'perigoso(a)'],
    ['comfortable', 'confortável'],
    ['modern', 'moderno(a)'],
    ['popular', 'popular, famoso(a) entre as pessoas'],
    ['wide', 'largo(a)'],
    ['healthy', 'saudável'],
    ['as ... as', 'tão ... quanto'],
  ],
  lessons: [
    { after: 'a2-u5-l3', lesson: {
      id: 'a2-u5-l8', title: 'Tão bom quanto', items: [
        { id: 'a2u5l8-1', type: 'match', pairs: [['safe', 'seguro'], ['dangerous', 'perigoso'], ['comfortable', 'confortável'], ['healthy', 'saudável']], why: 'Palavras longas (3 sílabas ou mais) fazem o comparativo com "more": more dangerous, more comfortable.' },
        { id: 'a2u5l8-2', type: 'choice', prompt: 'Complete:', en: 'This sofa is ___ than the old one.', pt: 'Este sofá é mais confortável que o antigo.', options: ['more comfortable', 'comfortabler', 'most comfortable'], answer: 'more comfortable', why: '"Comfortable" é longa: more comfortable than.', wrong: { comfortabler: 'Palavra longa não leva -er: more comfortable.', 'most comfortable': '"The most" é superlativo (o mais confortável de todos).' } },
        { id: 'a2u5l8-3', type: 'choice', prompt: 'Complete:', en: 'My bag is ___ than yours.', pt: 'Minha bolsa é mais pesada que a sua.', options: ['heavier', 'more heavy', 'heavyer'], answer: 'heavier', why: 'Termina em consoante + y: o y vira i e entra -er. heavy → heavier, easy → easier.', wrong: { 'more heavy': 'Palavra curta com -y faz -ier: heavier.', heavyer: 'O y vira i: heavier.' } },
        { id: 'a2u5l8-4', type: 'choice', prompt: 'Complete:', en: 'Rio is as ___ as Salvador for tourists.', pt: 'O Rio é tão popular quanto Salvador para os turistas.', options: ['popular', 'more popular', 'popularer'], answer: 'popular', why: '"As ... as" = tão ... quanto. No meio vai o adjetivo normal, sem -er e sem more.', wrong: { 'more popular': 'Com "as ... as" o adjetivo fica normal.', popularer: 'Não existe. E com "as ... as" fica "popular".' } },
        { id: 'a2u5l8-5', type: 'build', pt: 'Esta rua não é tão segura quanto a outra.', answer: "This street isn't as safe as the other one", extra: ['than', 'safer'], display: "This street isn't as safe as the other one.", why: 'Na negativa: not as ... as = não tão ... quanto. "The other one" = a outra.' },
        { id: 'a2u5l8-6', type: 'meaning', en: 'The new phone is lighter and more modern.', options: ['O celular novo é mais leve e mais moderno.', 'O celular novo é mais pesado e mais caro.', 'O celular velho é mais leve e mais moderno.'], answer: 'O celular novo é mais leve e mais moderno.', why: '"Light" = leve → lighter. "Modern" leva more: more modern.' },
        { id: 'a2u5l8-7', type: 'dialogue', lines: [['A', 'Is walking healthier than driving?'], ['B', '___']], options: ['Yes, and it is cheaper too.', 'Yes, and it is more cheap too.', 'Yes, and it is the cheaper too.'], answer: 'Yes, and it is cheaper too.', pt: 'Sim, e é mais barato também.', why: '"Cheap" é curta: cheaper. "Too" no fim = também.', wrong: { 'Yes, and it is more cheap too.': 'Palavra curta leva -er: cheaper.', 'Yes, and it is the cheaper too.': '"The" vai com o superlativo (the cheapest), não com o comparativo.' } },
      ],
    } },
    { after: 'a2-u5-l4', lesson: {
      id: 'a2-u5-l9', title: 'Ouvindo', items: [
        { id: 'a2u5l9-1', type: 'listen', en: 'The bridge is wider than the road.', options: ['A ponte é mais larga que a estrada.', 'A ponte é mais longa que a estrada.', 'A estrada é mais larga que a ponte.'], answer: 'A ponte é mais larga que a estrada.', why: '"Wide" = largo → wider. "Long" seria comprido.' },
        { id: 'a2u5l9-2', type: 'dictation', en: 'This city is very safe.', why: '"Safe" soa como "SÊIF".' },
        { id: 'a2u5l9-3', type: 'listen', en: "It's the most dangerous road in the country.", options: ['É a estrada mais perigosa do país.', 'É uma estrada perigosa da cidade.', 'É a estrada mais segura do país.'], answer: 'É a estrada mais perigosa do país.', why: '"The most dangerous" = a mais perigosa (de todas).' },
        { id: 'a2u5l9-4', type: 'dictation', en: 'Fruit is healthier than cake.', why: '"Healthy" → "healthier" (o y vira i).' },
        { id: 'a2u5l9-5', type: 'listen', en: 'My new chair is as comfortable as my bed.', options: ['Minha cadeira nova é tão confortável quanto a minha cama.', 'Minha cadeira nova é mais confortável que a minha cama.', 'Minha cama nova é muito confortável.'], answer: 'Minha cadeira nova é tão confortável quanto a minha cama.', why: '"As comfortable as" = tão confortável quanto.' },
        { id: 'a2u5l9-6', type: 'dictation', en: 'Her bag is lighter than mine.', why: '"Lighter" soa como "LÁI-ter": o "gh" é mudo.' },
        { id: 'a2u5l9-7', type: 'speak', en: 'This hotel is more modern than that one.', pt: 'Este hotel é mais moderno que aquele.', why: '"Modern" soa como "MÓ-dern", com a força no começo.' },
      ],
    } },
    { after: 'a2-u5-l5', lesson: {
      id: 'a2-u5-l10', title: 'Lendo: qual celular comprar?',
      story: {
        title: 'Qual celular comprar?',
        lines: [
          { who: 'Marcos', en: 'I need a new phone. I found two in the shop.', pt: 'Preciso de um celular novo. Achei dois na loja.' },
          { who: 'Marcos', en: 'The black phone is cheaper, but the white phone is lighter and more modern.', pt: 'O celular preto é mais barato, mas o branco é mais leve e mais moderno.' },
          { ask: 'Qual celular é mais barato?', options: ['O preto', 'O branco', 'Os dois custam igual'], answer: 'O preto', why: '"The black phone is cheaper" = o preto é mais barato.' },
          { who: 'Marcos', en: 'The camera on the black phone is as good ___ the camera on the white one.', pt: 'A câmera do preto é tão boa quanto a do branco.', gap: { answer: 'as', options: ['as', 'than', 'more'] } },
          { who: 'Marcos', en: 'The white phone is the most popular phone this year, but it is very expensive.', pt: 'O branco é o celular mais popular deste ano, mas é muito caro.' },
          { who: 'Marcos', en: 'I think I will buy the black one. The money is more important for me!', pt: 'Acho que vou comprar o preto. O dinheiro é mais importante para mim!' },
          { ask: 'Qual o Marcos vai comprar?', options: ['O preto', 'O branco', 'Nenhum'], answer: 'O preto', why: '"I will buy the black one" = vou comprar o preto.' },
        ],
      },
      items: [
        { id: 'a2u5l10-1', type: 'story', why: 'O Marcos compara dois celulares antes de comprar. Leia com calma e ouça cada frase.' },
        { id: 'a2u5l10-2', type: 'quiz', q: 'O que o celular branco tem de melhor?', options: ['É mais leve e mais moderno', 'É mais barato', 'Tem a câmera muito melhor'], answer: 'É mais leve e mais moderno', why: '"The white phone is lighter and more modern."' },
        { id: 'a2u5l10-3', type: 'quiz', q: 'Como são as câmeras?', options: ['Iguais', 'A do preto é melhor', 'A do branco é melhor'], answer: 'Iguais', why: '"As good as" = tão boa quanto.' },
        { id: 'a2u5l10-4', type: 'quiz', q: 'Por que ele escolhe o preto?', options: ['Por causa do dinheiro', 'Por causa da câmera', 'Porque é mais popular'], answer: 'Por causa do dinheiro', why: '"The money is more important for me."' },
      ],
    } },
  ],
});
