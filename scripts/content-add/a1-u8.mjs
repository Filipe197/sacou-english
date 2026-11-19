// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 8 (Lugares na cidade).
// Uso: node scripts/content-add/a1-u8.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-08.json', {
  words: [
    ['library', 'biblioteca'],
    ['church', 'igreja'],
    ['airport', 'aeroporto'],
    ['zoo', 'zoológico'],
    ['bridge', 'ponte'],
    ['bus / train', 'ônibus / trem'],
    ['taxi / bike', 'táxi / bicicleta'],
    ['by bus', 'de ônibus'],
    ['turn left / turn right', 'vire à esquerda / à direita'],
    ['straight on', 'em frente'],
    ['corner', 'esquina'],
    ['far', 'longe'],
  ],
  extraVocab: [
    { word: 'far', reason: 'Par de "near" (A1) para pedir e dar direções ("Is it far from here?"), ensinado junto no A1; na CEFR-J "far" aparece só no A2.' },
  ],
  lessons: [
    { after: 'a1-u8-l3', lesson: {
      id: 'a1-u8-l8', title: 'Como chegar', items: [
        { id: 'a1u8l8-1', type: 'match', pairs: [['library', 'biblioteca'], ['church', 'igreja'], ['airport', 'aeroporto'], ['zoo', 'zoológico']], why: 'Cuidado: "library" é biblioteca, não livraria. Livraria é "bookstore".' },
        { id: 'a1u8l8-2', type: 'match', pairs: [['bus', 'ônibus'], ['train', 'trem'], ['taxi', 'táxi'], ['bike', 'bicicleta']], why: '"Bike" é a forma curta e comum de "bicycle".' },
        { id: 'a1u8l8-3', type: 'meaning', en: 'Turn left at the bank.', options: ['Vire à esquerda no banco.', 'Vire à direita no banco.', 'Siga em frente até o banco.'], answer: 'Vire à esquerda no banco.', why: '"Turn" = virar, "left" = esquerda. "At the bank" = no banco (ponto de referência).' },
        { id: 'a1u8l8-4', type: 'choice', prompt: 'Complete a direção:', en: 'Go ___ on. The station is on the right.', pt: 'Siga em frente. A estação fica à direita.', options: ['straight', 'turn', 'left'], answer: 'straight', why: '"Go straight on" = siga em frente. "On the right" = à direita.', wrong: { turn: '"Turn" é virar, não seguir reto.', left: '"Left" é esquerda.' } },
        { id: 'a1u8l8-5', type: 'build', pt: 'Eu vou para o trabalho de ônibus.', answer: 'I go to work by bus', extra: ['in', 'on'], display: 'I go to work by bus.', why: 'Meio de transporte usa "by": by bus, by train, by taxi, by bike. A pé é diferente: "on foot".' },
        { id: 'a1u8l8-6', type: 'choice', prompt: 'Complete:', en: 'The library is on the ___, next to the church.', pt: 'A biblioteca fica na esquina, ao lado da igreja.', options: ['corner', 'left', 'bus'], answer: 'corner', why: '"On the corner" = na esquina.', wrong: { left: '"On the left" seria "à esquerda", mas a frase fala da esquina.', bus: '"Bus" é ônibus.' } },
        { id: 'a1u8l8-7', type: 'dialogue', lines: [['A', 'Excuse me, how do I get to the airport?'], ['B', '___']], options: ["Take a taxi. It's far from here.", "It's my bike.", 'Yes, there is.'], answer: "Take a taxi. It's far from here.", pt: 'Pegue um táxi. É longe daqui.', why: '"How do I get to...?" = como eu chego em...? "Far from here" = longe daqui.', wrong: { "It's my bike.": 'Não responde como chegar.', 'Yes, there is.': 'Responde "Is there...?", não "how".' } },
      ],
    } },
    { after: 'a1-u8-l4', lesson: {
      id: 'a1-u8-l9', title: 'Ouvindo', items: [
        { id: 'a1u8l9-1', type: 'listen', en: 'Turn right at the corner.', options: ['Vire à direita na esquina.', 'Vire à esquerda na esquina.', 'Siga em frente até a esquina.'], answer: 'Vire à direita na esquina.', why: '"Right" soa como "ráit" = direita. Esquerda é "left".' },
        { id: 'a1u8l9-2', type: 'dictation', en: 'I go to school by bike.', why: '"By bike" = de bicicleta. "Bike" soa como "báik".' },
        { id: 'a1u8l9-3', type: 'listen', en: 'The bus station is near the bridge.', options: ['A rodoviária fica perto da ponte.', 'O aeroporto fica perto da ponte.', 'A estação de trem fica longe da ponte.'], answer: 'A rodoviária fica perto da ponte.', why: '"Bus station" = rodoviária. "Bridge" = ponte. "Near" = perto.' },
        { id: 'a1u8l9-4', type: 'dictation', en: 'Where is the library?', why: '"Library" soa como "LÁI-bré-ri". Lembre: é biblioteca.' },
        { id: 'a1u8l9-5', type: 'listen', en: 'Is the zoo far from here?', options: ['O zoológico fica longe daqui?', 'O zoológico fica perto daqui?', 'Onde fica a igreja?'], answer: 'O zoológico fica longe daqui?', why: '"Far" = longe; o contrário é "near" (perto).' },
        { id: 'a1u8l9-6', type: 'dictation', en: 'Take the train to the airport.', why: '"Take the train" = pegue o trem. Para transporte usamos "take".' },
        { id: 'a1u8l9-7', type: 'speak', en: 'Excuse me, where is the bus stop?', pt: 'Com licença, onde fica o ponto de ônibus?', why: '"Bus stop" = ponto de ônibus. Comece com "Excuse me" para ser educado.' },
      ],
    } },
    { after: 'a1-u8-l5', lesson: {
      id: 'a1-u8-l10', title: 'Lendo: o caminho até a casa do Tom',
      story: {
        title: 'O caminho até a casa do Tom',
        lines: [
          { who: 'Tom', en: 'Hi, Ana! Come to my house on Saturday.', pt: 'Oi, Ana! Venha à minha casa no sábado.' },
          { who: 'Tom', en: 'Take the bus to the library.', pt: 'Pegue o ônibus até a biblioteca.' },
          { ask: 'Até onde a Ana vai de ônibus?', options: ['Até a biblioteca', 'Até o aeroporto', 'Até o zoológico'], answer: 'Até a biblioteca', why: '"Take the bus to the library".' },
          { who: 'Tom', en: 'Then go straight on and turn left at the church.', pt: 'Depois siga em frente e vire à esquerda na igreja.' },
          { who: 'Tom', en: 'My house is on the corner, next to a small park.', pt: 'Minha casa fica na esquina, ao lado de um parque pequeno.' },
          { who: 'Tom', en: 'It is ___ white house with a red door.', pt: 'É uma casa branca com uma porta vermelha.', gap: { answer: 'a', options: ['a', 'an', 'on'] } },
          { ask: 'Onde fica a casa do Tom?', options: ['Na esquina, ao lado de um parque', 'Atrás do banco', 'Ao lado do aeroporto'], answer: 'Na esquina, ao lado de um parque', why: '"On the corner, next to a small park".' },
        ],
      },
      items: [
        { id: 'a1u8l10-1', type: 'story', why: 'O Tom explica o caminho até a casa dele. Leia como se você fosse a Ana.' },
        { id: 'a1u8l10-2', type: 'quiz', q: 'Quando a Ana vai à casa do Tom?', options: ['No sábado', 'No domingo', 'Na sexta'], answer: 'No sábado', why: '"Come to my house on Saturday".' },
        { id: 'a1u8l10-3', type: 'quiz', q: 'Onde ela vira à esquerda?', options: ['Na igreja', 'No banco', 'Na biblioteca'], answer: 'Na igreja', why: '"Turn left at the church".' },
        { id: 'a1u8l10-4', type: 'quiz', q: 'Como é a casa do Tom?', options: ['Branca com porta vermelha', 'Vermelha com porta branca', 'Azul com porta branca'], answer: 'Branca com porta vermelha', why: '"A white house with a red door".' },
      ],
    } },
  ],
});
