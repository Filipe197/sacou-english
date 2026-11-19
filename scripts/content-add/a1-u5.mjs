// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 5 (Objetos e cores).
// Uso: node scripts/content-add/a1-u5.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-05.json', {
  words: [
    ['computer', 'computador'],
    ['pencil', 'lápis'],
    ['notebook', 'caderno'],
    ['box', 'caixa'],
    ['cup', 'xícara / copo'],
    ['door / window', 'porta / janela'],
    ['brown / pink', 'marrom / rosa'],
    ['purple / gray', 'roxo / cinza'],
    ['mine / yours', 'meu / seu (sem a coisa depois)'],
    ['heavy', 'pesado(a)'],
    ['broken', 'quebrado(a)'],
    ['open / closed', 'aberto / fechado'],
    ['expensive', 'caro(a)'],
  ],
  lessons: [
    { after: 'a1-u5-l3', lesson: {
      id: 'a1-u5-l8', title: 'Mais objetos e cores', items: [
        { id: 'a1u5l8-1', type: 'match', pairs: [['computer', 'computador'], ['pencil', 'lápis'], ['notebook', 'caderno'], ['box', 'caixa']], why: 'Plural de "box" é "boxes": palavras que terminam em x, s, ch e sh ganham -es.' },
        { id: 'a1u5l8-2', type: 'match', pairs: [['brown', 'marrom'], ['pink', 'rosa'], ['purple', 'roxo'], ['gray', 'cinza']], why: 'Mais quatro cores. "Gray" também se escreve "grey" no inglês britânico.' },
        { id: 'a1u5l8-3', type: 'choice', prompt: 'Complete:', en: 'This pencil is ___.', pt: 'Este lápis é meu.', options: ['mine', 'my', 'me'], answer: 'mine', why: 'Quando a coisa não vem depois, "meu" é "mine": this is MY pencil = this pencil is MINE.', wrong: { my: '"My" precisa da coisa depois: my pencil.', me: '"Me" = me/mim, não indica dono.' } },
        { id: 'a1u5l8-4', type: 'meaning', en: 'The window is open.', options: ['A janela está aberta.', 'A porta está fechada.', 'A janela está quebrada.'], answer: 'A janela está aberta.', why: '"Window" = janela e "open" = aberta. O contrário de open é "closed" (fechado).' },
        { id: 'a1u5l8-5', type: 'build', pt: 'A caixa é pesada.', answer: 'The box is heavy', extra: ['light', 'these'], display: 'The box is heavy.', why: '"Heavy" = pesado. O contrário é "light" (leve).' },
        { id: 'a1u5l8-6', type: 'dialogue', lines: [['A', 'Whose computer is this?'], ['B', '___']], options: ["It's my brother's.", "It's brown.", "It's on the table."], answer: "It's my brother's.", pt: 'É do meu irmão.', why: '"Whose" = de quem. A resposta diz o dono: my brother\'s (do meu irmão).', wrong: { "It's brown.": 'Isso diz a cor, não o dono.', "It's on the table.": 'Isso diz onde está, não de quem é.' } },
        { id: 'a1u5l8-7', type: 'meaning', en: 'My old phone is broken.', options: ['Meu celular velho está quebrado.', 'Meu celular novo é caro.', 'Meu computador velho está fechado.'], answer: 'Meu celular velho está quebrado.', why: '"Old" = velho e "broken" = quebrado.' },
      ],
    } },
    { after: 'a1-u5-l4', lesson: {
      id: 'a1-u5-l9', title: 'Ouvindo', items: [
        { id: 'a1u5l9-1', type: 'listen', en: 'The door is closed.', options: ['A porta está fechada.', 'A janela está aberta.', 'A porta está quebrada.'], answer: 'A porta está fechada.', why: '"Closed" soa como "clôuzd", quase uma sílaba só.' },
        { id: 'a1u5l9-2', type: 'dictation', en: 'I have a purple notebook.', why: '"Purple" soa como "PÂR-pol". "Notebook" = caderno.' },
        { id: 'a1u5l9-3', type: 'listen', en: 'This cup is yours.', options: ['Esta xícara é sua.', 'Esta xícara é minha.', 'Esta caixa é sua.'], answer: 'Esta xícara é sua.', why: '"Yours" = seu/sua, quando a coisa não vem depois.' },
        { id: 'a1u5l9-4', type: 'dictation', en: 'The computer is expensive.', why: '"Expensive" = caro. Força no meio: "eks-PÉN-siv".' },
        { id: 'a1u5l9-5', type: 'listen', en: 'Where is my pencil?', options: ['Onde está meu lápis?', 'Onde está minha caneta?', 'De quem é este lápis?'], answer: 'Onde está meu lápis?', why: '"Pencil" = lápis. Caneta é "pen".' },
        { id: 'a1u5l9-6', type: 'dictation', en: 'The box is brown.', why: '"Brown" soa como "bráun".' },
        { id: 'a1u5l9-7', type: 'speak', en: 'This pencil is mine.', pt: 'Este lápis é meu.', why: '"Mine" soa como "máin".' },
      ],
    } },
    { after: 'a1-u5-l5', lesson: {
      id: 'a1-u5-l10', title: 'Lendo: achados e perdidos',
      story: {
        title: 'Achados e perdidos',
        lines: [
          { who: 'Laura', en: 'Is this yours? Please look at this list.', pt: 'Isto é seu? Por favor, olhem esta lista.' },
          { who: 'Laura', en: 'A brown bag with two pencils.', pt: 'Uma mochila marrom com dois lápis.' },
          { who: 'Laura', en: 'A pink phone. It is broken.', pt: 'Um celular rosa. Ele está quebrado.' },
          { ask: 'Qual é a cor do celular?', options: ['Rosa', 'Marrom', 'Roxo'], answer: 'Rosa', why: '"A pink phone" = um celular rosa.' },
          { who: 'Laura', en: 'A gray computer. It is new and very ___.', pt: 'Um computador cinza. Ele é novo e muito caro.', gap: { answer: 'expensive', options: ['expensive', 'cute', 'young'] } },
          { who: 'Laura', en: 'Come to room ten, please.', pt: 'Venha à sala dez, por favor.' },
          { ask: 'Onde a pessoa busca as coisas?', options: ['Na sala dez', 'Na sala dois', 'No escritório'], answer: 'Na sala dez', why: '"Come to room ten" = venha à sala dez.' },
        ],
      },
      items: [
        { id: 'a1u5l10-1', type: 'story', why: 'Um aviso de achados e perdidos. Leia com calma e repare nas cores.' },
        { id: 'a1u5l10-2', type: 'quiz', q: 'O que tem na mochila marrom?', options: ['Dois lápis', 'Um caderno', 'Duas canetas'], answer: 'Dois lápis', why: '"A brown bag with two pencils" = uma mochila marrom com dois lápis.' },
        { id: 'a1u5l10-3', type: 'quiz', q: 'Como está o celular rosa?', options: ['Quebrado', 'Novo', 'Aberto'], answer: 'Quebrado', why: '"It is broken" = está quebrado.' },
        { id: 'a1u5l10-4', type: 'quiz', q: 'Como é o computador?', options: ['Novo e caro', 'Velho e barato', 'Quebrado'], answer: 'Novo e caro', why: '"It is new and very expensive" = é novo e muito caro.' },
      ],
    } },
  ],
});
