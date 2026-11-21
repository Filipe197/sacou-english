// Etapa 1 do B1 completo: 3 lições novas na unidade 6 (Como era antes — used to).
// Uso: node scripts/content-add/b1-u6.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('b1/unit-06.json', {
  words: [
    ['technology', 'tecnologia'],
    ['generation', 'geração'],
    ['memory', 'memória, lembrança'],
    ['toy', 'brinquedo'],
    ['cartoon', 'desenho animado'],
    ['stamp', 'selo'],
    ['record', 'disco (de música)'],
    ['photograph', 'fotografia'],
    ['cassette', 'fita cassete'],
  ],
  lessons: [
    { after: 'b1-u6-l3', lesson: {
      id: 'b1-u6-l8', title: 'No tempo dos meus avós', items: [
        { id: 'b1u6l8-1', type: 'match', pairs: [['toy', 'brinquedo'], ['cartoon', 'desenho animado'], ['stamp', 'selo'], ['memory', 'lembrança']], why: '"Memory" é a memória e também uma lembrança: happy memories.' },
        { id: 'b1u6l8-2', type: 'choice', prompt: 'Complete:', en: 'People ___ to send letters with stamps.', pt: 'As pessoas costumavam mandar cartas com selo.', options: ['used', 'use', 'were used'], answer: 'used', why: 'Hábito antigo: used to + verbo.', wrong: { use: 'Na afirmativa é "used to".', 'were used': '"Were used to" quer dizer outra coisa (estar acostumado).' } },
        { id: 'b1u6l8-3', type: 'choice', prompt: 'Complete:', en: "We didn't ___ to have a smartphone.", pt: 'A gente não tinha celular antes.', options: ['use', 'used', 'using'], answer: 'use', why: 'Na negativa e na pergunta, com "did", fica "use to" (sem -d).', wrong: { used: 'Com "didn\'t", sem o -d: didn\'t use to.', using: 'Não existe "didn\'t using to".' } },
        { id: 'b1u6l8-4', type: 'meaning', en: 'My grandpa used to listen to records every Sunday.', options: ['Meu avô costumava ouvir discos todo domingo.', 'Meu avô ouve discos todo domingo.', 'Meu avô gravou discos num domingo.'], answer: 'Meu avô costumava ouvir discos todo domingo.', why: '"Used to" = costumava. "Records" = discos.' },
        { id: 'b1u6l8-5', type: 'build', pt: 'Você costumava ver desenho animado de manhã?', answer: 'Did you use to watch cartoons in the morning', extra: ['used', 'do'], display: 'Did you use to watch cartoons in the morning?', why: 'Pergunta: Did + you + use to + verbo.' },
        { id: 'b1u6l8-6', type: 'choice', prompt: 'Complete:', en: 'Technology has changed a lot. Every generation ___ different habits.', pt: 'A tecnologia mudou muito. Cada geração tem hábitos diferentes.', options: ['has', 'have', 'used to'], answer: 'has', why: '"Every generation" = cada (uma): has.', wrong: { have: '"Every" pede singular: has.', 'used to': 'A frase fala de algo que vale hoje, não de um hábito do passado.' } },
        { id: 'b1u6l8-7', type: 'dialogue', lines: [['A', 'Do you still play video games?'], ['B', '___']], options: ["Not any more. I used to play every day as a kid.", "Not any more. I use to play every day as a kid.", "Not any more. I was used to play every day."], answer: "Not any more. I used to play every day as a kid.", pt: 'Não mais. Eu jogava todo dia quando era criança.', why: '"Not any more" = não mais. "Used to" = hábito antigo.', wrong: { "Not any more. I use to play every day as a kid.": 'Na afirmativa: used to.', "Not any more. I was used to play every day.": '"Be used to" é estar acostumado, e pediria -ing.' } },
      ],
    } },
    { after: 'b1-u6-l4', lesson: {
      id: 'b1-u6-l9', title: 'Ouvindo', items: [
        { id: 'b1u6l9-1', type: 'listen', en: 'We used to record songs from the radio on cassettes.', options: ['A gente gravava músicas do rádio em fitas cassete.', 'A gente ouve músicas no rádio.', 'A gente comprava fitas no mercado.'], answer: 'A gente gravava músicas do rádio em fitas cassete.', why: '"Record" como verbo = gravar.' },
        { id: 'b1u6l9-2', type: 'dictation', en: 'I have happy memories of my childhood.', why: '"Memories" = lembranças.' },
        { id: 'b1u6l9-3', type: 'listen', en: "My parents didn't use to have a TV.", options: ['Meus pais não tinham TV antigamente.', 'Meus pais não gostam de TV.', 'Meus pais compraram uma TV.'], answer: 'Meus pais não tinham TV antigamente.', why: '"Didn\'t use to have" = não tinham (antes).' },
        { id: 'b1u6l9-4', type: 'dictation', en: 'This photograph is very old.', why: '"Photograph" soa como "FÔU-to-graf". Também se diz "photo".' },
        { id: 'b1u6l9-5', type: 'listen', en: 'Did you use to have a favorite toy?', options: ['Você tinha um brinquedo favorito?', 'Qual é o seu brinquedo favorito?', 'Você ainda tem seus brinquedos?'], answer: 'Você tinha um brinquedo favorito?', why: 'Pergunta com "did you use to" = você costumava / tinha?' },
        { id: 'b1u6l9-6', type: 'dictation', en: 'Each generation is different.', why: '"Generation" soa como "djé-ne-RÊI-xon".' },
        { id: 'b1u6l9-7', type: 'speak', en: 'I used to live near the sea.', pt: 'Eu morava perto do mar.', why: '"Used to" soa como "IÚS-tu", com som de s.' },
      ],
    } },
    { after: 'b1-u6-l5', lesson: {
      id: 'b1-u6-l10', title: 'Lendo: a vovó e a tecnologia',
      story: {
        title: 'A vovó e a tecnologia',
        lines: [
          { who: 'Paula', en: "My grandma is eighty, and she loves telling me how things used to be.", pt: 'Minha avó tem oitenta anos e adora me contar como as coisas eram.' },
          { who: 'Paula', en: "She used to write letters to her sister in Portugal. A letter took a month to arrive!", pt: 'Ela escrevia cartas para a irmã em Portugal. Uma carta levava um mês para chegar!' },
          { ask: 'Quanto tempo uma carta levava?', options: ['Um mês', 'Uma semana', 'Um dia'], answer: 'Um mês', why: '"A letter took a month to arrive!"' },
          { who: 'Paula', en: "They didn't ___ to have a phone at home. They used the one at the bakery.", pt: 'Eles não tinham telefone em casa. Usavam o da padaria.', gap: { answer: 'use', options: ['use', 'used', 'using'] } },
          { who: 'Paula', en: 'Now she has a smartphone, and she sends me photos every day.', pt: 'Agora ela tem um celular e me manda fotos todo dia.' },
          { who: 'Paula', en: '"Technology is wonderful," she says, "but I miss the stamps!"', pt: '"A tecnologia é maravilhosa", ela diz, "mas sinto falta dos selos!"' },
          { ask: 'Do que a avó sente falta?', options: ['Dos selos', 'Da padaria', 'Do telefone antigo'], answer: 'Dos selos', why: '"I miss the stamps!"' },
        ],
      },
      items: [
        { id: 'b1u6l10-1', type: 'story', why: 'A Paula conta como a avó vivia antes da tecnologia. Leia com calma e ouça cada frase.' },
        { id: 'b1u6l10-2', type: 'quiz', q: 'Para quem a avó escrevia cartas?', options: ['Para a irmã em Portugal', 'Para a Paula', 'Para o marido'], answer: 'Para a irmã em Portugal', why: '"She used to write letters to her sister in Portugal."' },
        { id: 'b1u6l10-3', type: 'quiz', q: 'Onde ficava o telefone que eles usavam?', options: ['Na padaria', 'Em casa', 'Na escola'], answer: 'Na padaria', why: '"They used the one at the bakery."' },
        { id: 'b1u6l10-4', type: 'quiz', q: 'O que a avó faz hoje?', options: ['Manda fotos todo dia', 'Escreve cartas', 'Não usa celular'], answer: 'Manda fotos todo dia', why: '"She sends me photos every day."' },
      ],
    } },
  ],
  extraVocab: [
    { word: 'smartphone', reason: 'palavra do dia a dia (não está na CEFR-J por ser recente)' },
  ],
});
