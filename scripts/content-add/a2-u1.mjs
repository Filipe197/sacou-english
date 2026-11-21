// Etapa 1 do A2 completo: 3 lições novas na unidade 1 (Onde você estava? — was/were).
// Uso: node scripts/content-add/a2-u1.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-01.json', {
  words: [
    ['bored', 'entediado(a)'],
    ['nervous', 'nervoso(a)'],
    ['worried', 'preocupado(a)'],
    ['crowded', 'lotado(a), cheio(a) de gente'],
    ['noisy', 'barulhento(a)'],
    ['awful', 'horrível, péssimo(a)'],
    ['museum', 'museu'],
    ['wedding', 'casamento (a festa)'],
    ['during', 'durante'],
    ['windy', 'com vento, ventando'],
  ],
  lessons: [
    { after: 'a2-u1-l3', lesson: {
      id: 'a2-u1-l8', title: 'Como foi?', items: [
        { id: 'a2u1l8-1', type: 'match', pairs: [['bored', 'entediado'], ['nervous', 'nervoso'], ['worried', 'preocupado'], ['awful', 'horrível']], why: '"Bored" é como você fica quando nada acontece. Cuidado: "boring" é a coisa chata; "bored" é a pessoa entediada.' },
        { id: 'a2u1l8-2', type: 'choice', prompt: 'Complete:', en: 'The museum ___ very crowded yesterday.', pt: 'O museu estava muito lotado ontem.', options: ['was', 'were', 'is'], answer: 'was', why: '"The museum" é uma coisa só (it), então o passado é "was".', wrong: { were: '"Were" é para you, we, they ou plural.', is: '"Is" é presente; "yesterday" pede passado.' } },
        { id: 'a2u1l8-3', type: 'choice', prompt: 'Complete:', en: 'We ___ nervous before the test.', pt: 'Nós estávamos nervosos antes da prova.', options: ['were', 'was', 'are'], answer: 'were', why: 'Com "we" o passado de to be é "were".', wrong: { was: '"Was" é para I, he, she e it.', are: '"Are" é presente.' } },
        { id: 'a2u1l8-4', type: 'meaning', en: 'The party was noisy and I was bored.', options: ['A festa estava barulhenta e eu estava entediado.', 'A festa estava lotada e eu estava cansado.', 'A festa era chata e eu estava nervoso.'], answer: 'A festa estava barulhenta e eu estava entediado.', why: '"Noisy" = barulhento. "Bored" = entediado.' },
        { id: 'a2u1l8-5', type: 'build', pt: 'Onde você estava durante o casamento?', answer: 'Where were you during the wedding', extra: ['was', 'when'], display: 'Where were you during the wedding?', why: 'Pergunta com "were": Where + were + you. "During" = durante, vem antes de um evento: during the wedding.' },
        { id: 'a2u1l8-6', type: 'choice', prompt: 'Complete:', en: 'It was cold and ___ at the beach.', pt: 'Estava frio e ventando na praia.', options: ['windy', 'wind', 'winds'], answer: 'windy', why: '"Windy" é o adjetivo (ventando). Igual a sunny, rainy, cloudy.', wrong: { wind: '"Wind" é o vento (substantivo). Depois de "was" e com "cold and", precisa do adjetivo.', winds: '"Winds" é plural de vento.' } },
        { id: 'a2u1l8-7', type: 'dialogue', lines: [['A', 'How was the trip?'], ['B', '___']], options: ['It was awful. It rained all day.', 'It is awful. It rains all day.', 'They were awful. It rain all day.'], answer: 'It was awful. It rained all day.', pt: 'Foi péssima. Choveu o dia todo.', why: 'A pergunta está no passado (How was...?), então a resposta também: It was... It rained...', wrong: { 'It is awful. It rains all day.': 'Está no presente, mas a viagem já aconteceu.', 'They were awful. It rain all day.': '"The trip" é uma coisa só: it was. E "rain" no passado é "rained".' } },
      ],
    } },
    { after: 'a2-u1-l4', lesson: {
      id: 'a2-u1-l9', title: 'Ouvindo', items: [
        { id: 'a2u1l9-1', type: 'listen', en: 'I was worried about you last night.', options: ['Eu estava preocupado com você ontem à noite.', 'Eu estava com você ontem à noite.', 'Eu estava cansado ontem à noite.'], answer: 'Eu estava preocupado com você ontem à noite.', why: '"Worried about" = preocupado com. Soa como "UÂR-id".' },
        { id: 'a2u1l9-2', type: 'dictation', en: 'The museum was crowded.', why: '"Crowded" soa como "CRÁU-did": o -ed depois de "d" vira uma sílaba a mais.' },
        { id: 'a2u1l9-3', type: 'listen', en: 'Were they at the wedding?', options: ['Eles estavam no casamento?', 'Eles estão no casamento?', 'Ela estava no casamento?'], answer: 'Eles estavam no casamento?', why: 'Pergunta no passado: "Were they...?" = eles estavam...?' },
        { id: 'a2u1l9-4', type: 'dictation', en: 'It was windy yesterday.', why: '"Windy" = ventando. "Yesterday" = ontem.' },
        { id: 'a2u1l9-5', type: 'listen', en: "We weren't bored at all.", options: ['A gente não ficou nada entediado.', 'A gente ficou muito entediado.', 'A gente não estava em casa.'], answer: 'A gente não ficou nada entediado.', why: '"Weren\'t" = were not. "Not at all" = nem um pouco.' },
        { id: 'a2u1l9-6', type: 'dictation', en: 'She was nervous during the test.', why: '"Nervous" soa como "NÂR-vas". "During" = durante.' },
        { id: 'a2u1l9-7', type: 'speak', en: 'The concert was noisy but great.', pt: 'O show estava barulhento, mas foi ótimo.', why: '"Noisy" soa como "NÓI-zi", com som de z.' },
      ],
    } },
    { after: 'a2-u1-l5', lesson: {
      id: 'a2-u1-l10', title: 'Lendo: o sábado do Bruno',
      story: {
        title: 'O sábado do Bruno',
        lines: [
          { who: 'Bruno', en: 'Last Saturday was my sister\'s wedding.', pt: 'Sábado passado foi o casamento da minha irmã.' },
          { who: 'Bruno', en: 'In the morning I was very nervous. I was the photographer!', pt: 'De manhã eu estava muito nervoso. Eu era o fotógrafo!' },
          { ask: 'Por que o Bruno estava nervoso?', options: ['Ele era o fotógrafo do casamento', 'Ele estava atrasado', 'Ele estava doente'], answer: 'Ele era o fotógrafo do casamento', why: '"I was the photographer!" = eu era o fotógrafo!' },
          { who: 'Bruno', en: 'The weather was awful. It was cold and ___.', pt: 'O tempo estava péssimo. Estava frio e ventando.', gap: { answer: 'windy', options: ['windy', 'sunny', 'hot'] } },
          { who: 'Bruno', en: 'But the party was great. The room was crowded and noisy.', pt: 'Mas a festa foi ótima. O salão estava lotado e barulhento.' },
          { who: 'Bruno', en: 'During the party, nobody was bored. We were all very happy.', pt: 'Durante a festa, ninguém ficou entediado. Estávamos todos muito felizes.' },
          { ask: 'Como estava a festa?', options: ['Lotada, barulhenta e ótima', 'Vazia e silenciosa', 'Chata e fria'], answer: 'Lotada, barulhenta e ótima', why: '"Crowded and noisy" e "the party was great".' },
        ],
      },
      items: [
        { id: 'a2u1l10-1', type: 'story', why: 'O Bruno conta como foi o casamento da irmã. Leia com calma e ouça cada frase.' },
        { id: 'a2u1l10-2', type: 'quiz', q: 'Quando foi o casamento?', options: ['Sábado passado', 'Ontem à noite', 'Semana que vem'], answer: 'Sábado passado', why: '"Last Saturday" = sábado passado.' },
        { id: 'a2u1l10-3', type: 'quiz', q: 'Como estava o tempo?', options: ['Frio e com vento', 'Quente e com sol', 'Chuvoso e quente'], answer: 'Frio e com vento', why: '"It was cold and windy."' },
        { id: 'a2u1l10-4', type: 'quiz', q: 'Alguém ficou entediado na festa?', options: ['Não, ninguém', 'Sim, o Bruno', 'Sim, a irmã'], answer: 'Não, ninguém', why: '"Nobody was bored" = ninguém ficou entediado.' },
      ],
    } },
  ],
});
