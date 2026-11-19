// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 3 (Números e idade).
// Uso: node scripts/content-add/a1-u3.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-03.json', {
  words: [
    ['thirty', 'trinta'],
    ['forty', 'quarenta'],
    ['fifty', 'cinquenta'],
    ['sixty', 'sessenta'],
    ['seventy', 'setenta'],
    ['eighty', 'oitenta'],
    ['ninety', 'noventa'],
    ['one hundred', 'cem'],
    ['age', 'idade'],
    ['young', 'jovem'],
    ['old', 'velho(a) / idoso(a)'],
  ],
  extraVocab: [
    { word: 'hundred', reason: 'Os números até 100 fazem parte do A1 nos livros e no próprio CEFR (números, preços e idades); na CEFR-J "hundred" aparece só no A2.' },
  ],
  lessons: [
    { after: 'a1-u3-l3', lesson: {
      id: 'a1-u3-l8', title: 'De 30 a 100', items: [
        { id: 'a1u3l8-1', type: 'match', pairs: [['thirty', '30'], ['forty', '40'], ['fifty', '50'], ['sixty', '60'], ['seventy', '70']], why: 'As dezenas terminam em -ty: thir-ty, for-ty, fif-ty. Atenção: "forty" não tem "u" (não é "fourty").' },
        { id: 'a1u3l8-2', type: 'match', pairs: [['eighty', '80'], ['ninety', '90'], ['one hundred', '100'], ['twenty-one', '21']], why: 'Depois do 20, juntamos dezena e unidade com hífen: twenty-one (21), thirty-five (35). 100 = one hundred.' },
        { id: 'a1u3l8-3', type: 'choice', prompt: 'Complete a conta:', en: 'Fifty and ten is ___.', pt: 'Cinquenta mais dez é sessenta.', options: ['sixty', 'sixteen', 'six'], answer: 'sixty', why: '-ty é dezena (60) e -teen é de 13 a 19 (16). Na fala, -ty tem a força no começo (SIX-ty) e -teen no fim (six-TEEN).', wrong: { sixteen: '"Sixteen" é 16. Sessenta é "sixty".', six: '"Six" é 6.' } },
        { id: 'a1u3l8-4', type: 'listen', en: 'forty', options: ['40', '14', '4'], answer: '40', why: '"FOR-ty" (40) tem a força no começo; "four-TEEN" (14) tem a força no fim.' },
        { id: 'a1u3l8-5', type: 'listen', en: 'ninety', options: ['90', '19', '9'], answer: '90', why: '"NAIN-ti" = 90. Para 19 você ouviria "nain-TÍIN", com o fim longo.' },
        { id: 'a1u3l8-6', type: 'build', pt: 'Ela tem quarenta anos.', answer: 'She is forty years old', extra: ['has', 'fourteen'], display: 'She is forty years old.', why: 'Em inglês a idade usa o verbo to be: ela É quarenta anos velha. Nunca "she has forty years".' },
        { id: 'a1u3l8-7', type: 'meaning', en: 'My teacher is sixty years old.', options: ['Meu professor tem sessenta anos.', 'Meu professor tem dezesseis anos.', 'Meu professor tem setenta anos.'], answer: 'Meu professor tem sessenta anos.', why: '"Sixty" = 60. Lembre: a idade vem com "is" + número + "years old".' },
      ],
    } },
    { after: 'a1-u3-l4', lesson: {
      id: 'a1-u3-l9', title: 'Ouvindo', items: [
        { id: 'a1u3l9-1', type: 'dictation', en: 'thirty', accept: ['30'], why: '"Thirty" começa com "th", língua entre os dentes: "THÂR-ti".' },
        { id: 'a1u3l9-2', type: 'listen', en: 'He is young.', options: ['Ele é jovem.', 'Ele é velho.', 'Ele é famoso.'], answer: 'Ele é jovem.', why: '"Young" soa como "iâng". O contrário é "old" (velho).' },
        { id: 'a1u3l9-3', type: 'dictation', en: 'My phone number is five four three.', why: 'Telefone em inglês se diz número por número: five, four, three.' },
        { id: 'a1u3l9-4', type: 'listen', en: 'I am eighty years old.', options: ['Tenho 80 anos.', 'Tenho 18 anos.', 'Tenho 8 anos.'], answer: 'Tenho 80 anos.', why: '"EI-ti" = 80, com a força no começo. 18 seria "ei-TÍIN".' },
        { id: 'a1u3l9-5', type: 'dictation', en: 'fifty', accept: ['50'], why: '"Fifty" = 50. Repare: não é "fivety", o "five" muda para "fif".' },
        { id: 'a1u3l9-6', type: 'listen', en: 'How old is she?', options: ['Quantos anos ela tem?', 'De onde ela é?', 'Como ela está?'], answer: 'Quantos anos ela tem?', why: '"How old" = quantos anos (literalmente "quão velho").' },
        { id: 'a1u3l9-7', type: 'speak', en: 'I am thirty years old.', pt: 'Tenho trinta anos.', why: 'Fale "ai em THÂR-ti iírz ôuld". O "th" é com a língua entre os dentes.' },
      ],
    } },
    { after: 'a1-u3-l5', lesson: {
      id: 'a1-u3-l10', title: 'Lendo: a ficha da Sofia',
      story: {
        title: 'A ficha da Sofia',
        lines: [
          { who: 'Sofia', en: 'Name: Sofia. Age: twenty-five.', pt: 'Nome: Sofia. Idade: vinte e cinco.' },
          { who: 'Sofia', en: 'Phone number: nine eight, seven six, five four.', pt: 'Telefone: nove oito, sete seis, cinco quatro.' },
          { ask: 'Quantos anos a Sofia tem?', options: ['25', '52', '15'], answer: '25', why: '"Twenty-five" = 25.' },
          { who: 'Sofia', en: 'My friend Leo is ___. He is very young!', pt: 'Meu amigo Leo tem onze anos. Ele é muito novo!', gap: { answer: 'eleven', options: ['eleven', 'forty', 'ninety'] } },
          { who: 'Sofia', en: 'My teacher is sixty. She is old, but she is fun!', pt: 'Minha professora tem sessenta anos. Ela é idosa, mas é divertida!' },
          { ask: 'Quem é muito jovem?', options: ['O Leo', 'A professora', 'A Sofia'], answer: 'O Leo', why: '"He is very young" fala do Leo, que tem onze anos.' },
        ],
      },
      items: [
        { id: 'a1u3l10-1', type: 'story', why: 'Leia a ficha com calma. Números são fáceis de confundir, então ouça cada um.' },
        { id: 'a1u3l10-2', type: 'quiz', q: 'Qual é o telefone da Sofia?', options: ['98 76 54', '89 67 45', '98 76 45'], answer: '98 76 54', why: '"Nine eight, seven six, five four".' },
        { id: 'a1u3l10-3', type: 'quiz', q: 'Quantos anos tem a professora?', options: ['60', '16', '70'], answer: '60', why: '"My teacher is sixty" = minha professora tem sessenta anos.' },
        { id: 'a1u3l10-4', type: 'quiz', q: 'Como é a professora?', options: ['Divertida', 'Jovem', 'Famosa'], answer: 'Divertida', why: '"She is old, but she is fun" = ela é idosa, mas é divertida.' },
      ],
    } },
  ],
});
