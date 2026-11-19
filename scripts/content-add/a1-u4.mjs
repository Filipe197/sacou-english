// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 4 (Família).
// Uso: node scripts/content-add/a1-u4.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-04.json', {
  words: [
    ['aunt', 'tia'],
    ['uncle', 'tio'],
    ['grandma / grandpa', 'vovó / vovô'],
    ['boy / girl', 'menino / menina'],
    ['man / woman', 'homem / mulher'],
    ['boyfriend / girlfriend', 'namorado / namorada'],
    ['our', 'nosso(a)'],
    ['tall', 'alto(a)'],
    ['cute', 'fofo(a)'],
    ['funny', 'engraçado(a)'],
    ['photo', 'foto'],
  ],
  lessons: [
    { after: 'a1-u4-l3', lesson: {
      id: 'a1-u4-l8', title: 'Tios, avós e mais', items: [
        { id: 'a1u4l8-1', type: 'match', pairs: [['aunt', 'tia'], ['uncle', 'tio'], ['grandma', 'vovó'], ['grandpa', 'vovô']], why: '"Grandma" e "grandpa" são as formas carinhosas de "grandmother" e "grandfather".' },
        { id: 'a1u4l8-2', type: 'match', pairs: [['boy', 'menino'], ['girl', 'menina'], ['man', 'homem'], ['woman', 'mulher']], why: 'Plurais irregulares: man → men, woman → women (o "o" de women soa como "i": "UÍ-min").' },
        { id: 'a1u4l8-3', type: 'choice', prompt: 'Complete:', en: 'This is ___ house.', pt: 'Esta é a nossa casa.', options: ['our', 'we', 'us'], answer: 'our', why: '"Our" = nosso(a). Igual a my, your, his e her, ele vem antes da coisa: our house.', wrong: { we: '"We" = nós (quem faz). "Nossa" casa é "our".', us: '"Us" = nos/a gente (depois do verbo).' } },
        { id: 'a1u4l8-4', type: 'meaning', en: 'My aunt has a cute baby.', options: ['Minha tia tem um bebê fofo.', 'Meu tio tem um bebê fofo.', 'Minha avó tem um gato fofo.'], answer: 'Minha tia tem um bebê fofo.', why: '"Aunt" = tia e "cute" = fofo. O adjetivo vem antes: cute baby.' },
        { id: 'a1u4l8-5', type: 'build', pt: 'O tio dele é alto.', answer: 'His uncle is tall', extra: ['her', 'short'], display: 'His uncle is tall.', why: '"Dele" = his (o dono é homem). "Tall" = alto; o contrário é "short".' },
        { id: 'a1u4l8-6', type: 'choice', prompt: 'Ana é a irmã da sua mãe. Ela é sua...', en: 'Ana is my ___.', pt: 'A Ana é minha tia.', options: ['aunt', 'uncle', 'grandma'], answer: 'aunt', why: 'A irmã da mãe ou do pai é a tia: aunt.', wrong: { uncle: '"Uncle" é tio, homem.', grandma: '"Grandma" é avó.' } },
        { id: 'a1u4l8-7', type: 'dialogue', lines: [['A', 'Is she your girlfriend?'], ['B', '___']], options: ['Yes, she is.', 'Yes, he is.', 'Yes, I am.'], answer: 'Yes, she is.', pt: 'Sim, ela é.', why: 'Na resposta curta repetimos quem e o verbo da pergunta: Is SHE...? → Yes, SHE IS.', wrong: { 'Yes, he is.': 'A pergunta é sobre "she" (ela).', 'Yes, I am.': '"I am" responde perguntas sobre você (Are you...?).' } },
      ],
    } },
    { after: 'a1-u4-l4', lesson: {
      id: 'a1-u4-l9', title: 'Ouvindo', items: [
        { id: 'a1u4l9-1', type: 'listen', en: 'This is our grandpa.', options: ['Este é o nosso avô.', 'Este é o meu tio.', 'Esta é a nossa avó.'], answer: 'Este é o nosso avô.', why: '"Our" soa como "áuer". "Grandpa" = vovô.' },
        { id: 'a1u4l9-2', type: 'dictation', en: 'My uncle is a farmer.', why: '"Uncle" soa como "ÂN-col". "Farmer" = fazendeiro.' },
        { id: 'a1u4l9-3', type: 'listen', en: 'She has a boyfriend.', options: ['Ela tem namorado.', 'Ela tem um filho.', 'Ela tem marido.'], answer: 'Ela tem namorado.', why: '"Boyfriend" = namorado. Marido é "husband".' },
        { id: 'a1u4l9-4', type: 'dictation', en: 'Our family is big.', why: '"Our family" = nossa família. "Big" = grande.' },
        { id: 'a1u4l9-5', type: 'listen', en: 'Her grandma is ninety.', options: ['A avó dela tem noventa anos.', 'A avó dele tem noventa anos.', 'A tia dela tem dezenove anos.'], answer: 'A avó dela tem noventa anos.', why: '"Her" = dela. "Ninety" = 90 (a força no começo: NAIN-ti).' },
        { id: 'a1u4l9-6', type: 'dictation', en: 'The baby is a girl.', why: '"Girl" soa como "gârl", com o "r" no meio.' },
        { id: 'a1u4l9-7', type: 'speak', en: 'This is my aunt and my uncle.', pt: 'Esta é minha tia e este é meu tio.', why: '"Aunt" soa como "ént" (americano) e "uncle" como "ÂN-col".' },
      ],
    } },
    { after: 'a1-u4-l5', lesson: {
      id: 'a1-u4-l10', title: 'Lendo: a foto do Lucas',
      story: {
        title: 'A foto do Lucas',
        lines: [
          { who: 'Lucas', en: 'Look at this photo! This is my family.', pt: 'Olha esta foto! Esta é a minha família.' },
          { who: 'Lucas', en: 'This tall man is my father, and this woman is my mother.', pt: 'Este homem alto é meu pai, e esta mulher é minha mãe.' },
          { ask: 'Quem é o homem alto?', options: ['O pai do Lucas', 'O tio do Lucas', 'O avô do Lucas'], answer: 'O pai do Lucas', why: '"This tall man is my father" = este homem alto é meu pai.' },
          { who: 'Lucas', en: 'This is our grandma. She is eighty and very ___.', pt: 'Esta é a nossa avó. Ela tem oitenta anos e é muito engraçada.', gap: { answer: 'funny', options: ['funny', 'tall', 'young'] } },
          { who: 'Lucas', en: 'My uncle and my aunt are on the left.', pt: 'Meu tio e minha tia estão à esquerda.' },
          { who: 'Lucas', en: 'And this cute baby? That is me!', pt: 'E este bebê fofo? Sou eu!' },
          { ask: 'Quem é o bebê fofo?', options: ['O Lucas', 'A irmã do Lucas', 'O tio do Lucas'], answer: 'O Lucas', why: '"That is me!" = sou eu!' },
        ],
      },
      items: [
        { id: 'a1u4l10-1', type: 'story', why: 'O Lucas mostra uma foto de família. Leia com calma e ouça cada frase.' },
        { id: 'a1u4l10-2', type: 'quiz', q: 'Quantos anos tem a avó?', options: ['80', '18', '90'], answer: '80', why: '"She is eighty" = ela tem oitenta anos.' },
        { id: 'a1u4l10-3', type: 'quiz', q: 'Onde estão os tios na foto?', options: ['À esquerda', 'À direita', 'No meio'], answer: 'À esquerda', why: '"On the left" = à esquerda.' },
        { id: 'a1u4l10-4', type: 'quiz', q: 'Como é a avó?', options: ['Engraçada', 'Alta', 'Jovem'], answer: 'Engraçada', why: '"Very funny" = muito engraçada.' },
      ],
    } },
  ],
});
