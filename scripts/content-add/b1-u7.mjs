// Etapa 1 do B1 completo: 3 lições novas na unidade 7 (Feito no Brasil — voz passiva).
// Uso: node scripts/content-add/b1-u7.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-07.json', {
  words: [
    ['discover', 'descobrir'],
    ['design', 'projetar, criar, desenhar'],
    ['product', 'produto'],
    ['material', 'material'],
    ['plastic', 'plástico'],
    ['wood', 'madeira'],
    ['cotton', 'algodão'],
    ['harvest', 'colheita, colher'],
    ['translate', 'traduzir'],
    ['publish', 'publicar'],
    ['author', 'autor(a)'],
    ['ancient', 'antigo(a), muito antigo'],
  ],
  lessons: [
    { after: 'b1-u7-l3', lesson: {
      id: 'b1-u7-l8', title: 'Do que é feito?', items: [
        { id: 'b1u7l8-1', type: 'match', pairs: [['wood', 'madeira'], ['cotton', 'algodão'], ['plastic', 'plástico'], ['glass', 'vidro']], why: '"Made of" + material: made of wood, made of glass.' },
        { id: 'b1u7l8-2', type: 'choice', prompt: 'Complete:', en: 'This shirt is made ___ cotton.', pt: 'Esta camisa é feita de algodão.', options: ['of', 'by', 'from'], answer: 'of', why: '"Made of" = feito de (o material ainda aparece).', wrong: { by: '"By" diz quem fez: made by my mom.', from: '"Made from" é quando o material muda (paper is made from wood). Aqui o algodão continua algodão.' } },
        { id: 'b1u7l8-3', type: 'choice', prompt: 'Complete:', en: 'The coffee ___ by hand on small farms.', pt: 'O café é colhido à mão em sítios pequenos.', options: ['is harvested', 'harvests', 'is harvest'], answer: 'is harvested', why: 'Passiva no presente: is + particípio (harvested).', wrong: { harvests: 'Isso diria que o café colhe alguma coisa.', 'is harvest': 'Falta o -ed do particípio.' } },
        { id: 'b1u7l8-4', type: 'meaning', en: 'Her book was translated into ten languages.', options: ['O livro dela foi traduzido para dez idiomas.', 'Ela traduziu dez livros.', 'Ela fala dez idiomas.'], answer: 'O livro dela foi traduzido para dez idiomas.', why: 'Passiva no passado: was + translated. "Into" = para (outra língua).' },
        { id: 'b1u7l8-5', type: 'build', pt: 'Esta ponte foi projetada por um arquiteto famoso.', answer: 'This bridge was designed by a famous architect', extra: ['is', 'of'], display: 'This bridge was designed by a famous architect.', why: 'Passiva no passado: was designed. Quem fez entra com "by".' },
        { id: 'b1u7l8-6', type: 'choice', prompt: 'Complete:', en: 'These ancient objects ___ in 1950.', pt: 'Estes objetos antigos foram descobertos em 1950.', options: ['were discovered', 'was discovered', 'discovered'], answer: 'were discovered', why: '"Objects" é plural: were + particípio.', wrong: { 'was discovered': 'Plural pede "were".', discovered: 'Sem "were", diria que os objetos descobriram alguma coisa.' } },
        { id: 'b1u7l8-7', type: 'dialogue', lines: [['A', 'Who wrote this book?'], ['B', '___']], options: ['It was written by a Brazilian author.', 'It was wrote by a Brazilian author.', 'It wrote by a Brazilian author.'], answer: 'It was written by a Brazilian author.', pt: 'Foi escrito por um autor brasileiro.', why: 'Passiva: was + particípio (write → written).', wrong: { 'It was wrote by a Brazilian author.': '"Wrote" é passado simples; a passiva usa o particípio: written.', 'It wrote by a Brazilian author.': 'Falta o "was".' } },
      ],
    } },
    { after: 'b1-u7-l4', lesson: {
      id: 'b1-u7-l9', title: 'Ouvindo', items: [
        { id: 'b1u7l9-1', type: 'listen', en: 'This product is made in Brazil.', options: ['Este produto é feito no Brasil.', 'Este produto é vendido no Brasil.', 'Este produto foi inventado no Brasil.'], answer: 'Este produto é feito no Brasil.', why: '"Made in" + lugar = fabricado em.' },
        { id: 'b1u7l9-2', type: 'dictation', en: 'The table is made of wood.', why: '"Wood" soa como "UÚD".' },
        { id: 'b1u7l9-3', type: 'listen', en: 'The novel was published last year.', options: ['O romance foi publicado no ano passado.', 'O romance vai ser publicado ano que vem.', 'Ela escreveu um romance no ano passado.'], answer: 'O romance foi publicado no ano passado.', why: '"Novel" = romance (livro). "Published" = publicado.' },
        { id: 'b1u7l9-4', type: 'dictation', en: 'It was designed in Italy.', why: '"Designed" soa como "di-ZÁIND".' },
        { id: 'b1u7l9-5', type: 'listen', en: 'Most of these bags are made of plastic.', options: ['A maioria dessas sacolas é feita de plástico.', 'Essas sacolas não têm plástico.', 'As sacolas de plástico são proibidas.'], answer: 'A maioria dessas sacolas é feita de plástico.', why: '"Most of" = a maioria de.' },
        { id: 'b1u7l9-6', type: 'dictation', en: 'The letters were translated into English.', why: '"Translated into" = traduzidas para.' },
        { id: 'b1u7l9-7', type: 'speak', en: 'This song was written by my father.', pt: 'Esta música foi escrita pelo meu pai.', why: '"Written" soa como "RÍ-ten": o "w" é mudo.' },
      ],
    } },
    { after: 'b1-u7-l5', lesson: {
      id: 'b1-u7-l10', title: 'Lendo: a história do açaí',
      story: {
        title: 'A história do açaí',
        lines: [
          { who: 'Sofia', en: "Açaí is a small purple fruit. It is grown in the north of Brazil.", pt: 'O açaí é uma frutinha roxa. Ele é cultivado no norte do Brasil.' },
          { who: 'Sofia', en: 'For centuries, it was eaten by local people as part of their daily food.', pt: 'Por séculos, ele foi comido pelas pessoas da região como parte da comida do dia a dia.' },
          { ask: 'Onde o açaí é cultivado?', options: ['No norte do Brasil', 'No sul do Brasil', 'Em Portugal'], answer: 'No norte do Brasil', why: '"It is grown in the north of Brazil."' },
          { who: 'Sofia', en: 'The fruit is ___ by hand from very tall trees.', pt: 'A fruta é colhida à mão de árvores muito altas.', gap: { answer: 'harvested', options: ['harvested', 'translated', 'published'] } },
          { who: 'Sofia', en: 'Today, açaí is sold all over the world, and it is often eaten with fruit and honey.', pt: 'Hoje, o açaí é vendido no mundo inteiro e muitas vezes é comido com frutas e mel.' },
          { who: 'Sofia', en: 'But in the north, it is still eaten in the traditional way: with fish!', pt: 'Mas no norte ele ainda é comido do jeito tradicional: com peixe!' },
          { ask: 'Como o açaí é comido no norte, do jeito tradicional?', options: ['Com peixe', 'Com mel', 'Com sorvete'], answer: 'Com peixe', why: '"In the traditional way: with fish!"' },
        ],
      },
      items: [
        { id: 'b1u7l10-1', type: 'story', why: 'A Sofia conta a história do açaí usando a voz passiva. Leia com calma e ouça cada frase.' },
        { id: 'b1u7l10-2', type: 'quiz', q: 'Como o açaí é colhido?', options: ['À mão, de árvores altas', 'Com máquinas', 'Do chão'], answer: 'À mão, de árvores altas', why: '"Harvested by hand from very tall trees."' },
        { id: 'b1u7l10-3', type: 'quiz', q: 'Onde o açaí é vendido hoje?', options: ['No mundo inteiro', 'Só no Brasil', 'Só no norte'], answer: 'No mundo inteiro', why: '"Açaí is sold all over the world."' },
        { id: 'b1u7l10-4', type: 'quiz', q: 'Por que o texto usa "is grown" e "is sold"?', options: ['O importante é o açaí, não quem planta ou vende', 'Porque é passado', 'Porque é uma pergunta'], answer: 'O importante é o açaí, não quem planta ou vende', why: 'A voz passiva põe o foco na coisa (o açaí), não em quem faz a ação.' },
      ],
    } },
  ],
  extraVocab: [
    { word: 'açaí', reason: 'nome de fruta brasileira (nome próprio do tema)' },
    { word: 'architect', reason: 'profissão ligada a "designed" (B2); aparece uma vez, com tradução' },
  ],
});
