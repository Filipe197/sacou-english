// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 1.
// Prática extra, Ouvindo e Lendo. Marcadas com "added" para não travar quem já passou daqui.
// Uso: node scripts/content-add/a1-u1.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-01.json', {
  words: [
    ['nice to meet you', 'muito prazer'],
    ['welcome', 'bem-vindo(a)'],
    ['see you later', 'até mais tarde'],
    ['see you tomorrow', 'até amanhã'],
    ['not bad', 'nada mal'],
  ],
  lessons: [
    { after: 'a1-u1-l3', lesson: {
      id: 'a1-u1-l8', title: 'Muito prazer e até amanhã', items: [
        { id: 'a1u1l8-1', type: 'meaning', en: 'Nice to meet you!', options: ['Muito prazer!', 'Até logo!', 'Bem-vindo!'], answer: 'Muito prazer!', why: '"Nice to meet you" é o que dizemos quando conhecemos alguém. Literalmente: "bom te conhecer".' },
        { id: 'a1u1l8-2', type: 'meaning', en: 'Welcome!', options: ['Bem-vindo!', 'De nada!', 'Com licença!'], answer: 'Bem-vindo!', why: '"Welcome" = bem-vindo(a). Cuidado: "you\'re welcome" é outra coisa, quer dizer "de nada".' },
        { id: 'a1u1l8-3', type: 'match', pairs: [['see you later', 'até mais tarde'], ['see you tomorrow', 'até amanhã'], ['nice to meet you', 'muito prazer'], ['welcome', 'bem-vindo']], why: '"See you" + quando: "later" (mais tarde), "tomorrow" (amanhã). São as despedidas mais comuns.' },
        { id: 'a1u1l8-4', type: 'choice', prompt: 'Alguém diz "Nice to meet you!". Você responde:', en: 'Nice to meet you, ___!', pt: 'Muito prazer também!', options: ['too', 'please', 'sorry'], answer: 'too', why: '"Too" no fim da frase = também. "Nice to meet you, too!" é a resposta educada.', wrong: { please: '"Please" é para pedir algo.', sorry: '"Sorry" é para pedir desculpas.' } },
        { id: 'a1u1l8-5', type: 'dialogue', lines: [['A', "Hi! I'm Pedro."], ['B', '___']], options: ['Hi, Pedro! Nice to meet you.', 'Good night, Pedro.', "You're welcome, Pedro."], answer: 'Hi, Pedro! Nice to meet you.', pt: 'Oi, Pedro! Muito prazer.', why: 'Quando alguém se apresenta, cumprimente e diga "Nice to meet you".', wrong: { 'Good night, Pedro.': '"Good night" é despedida.', "You're welcome, Pedro.": '"You\'re welcome" é "de nada".' } },
        { id: 'a1u1l8-6', type: 'build', pt: 'Até amanhã!', answer: 'See you tomorrow', extra: ['later', 'hello'], display: 'See you tomorrow!', why: '"See you" (até) + "tomorrow" (amanhã). Igual ao português: até + quando.' },
        { id: 'a1u1l8-7', type: 'dialogue', lines: [['A', 'How are you?'], ['B', '___']], options: ['Not bad, thanks.', 'Nice to meet you.', "You're welcome."], answer: 'Not bad, thanks.', pt: 'Nada mal, valeu.', why: '"Not bad" = nada mal. É outra resposta comum para "How are you?", além de "I\'m fine".' },
      ],
    } },
    { after: 'a1-u1-l4', lesson: {
      id: 'a1-u1-l9', title: 'Ouvindo', items: [
        { id: 'a1u1l9-1', type: 'listen', en: 'Nice to meet you!', options: ['Muito prazer!', 'Muito obrigado!', 'Até mais!'], answer: 'Muito prazer!', why: 'Na fala rápida, "meet you" vira quase "mítchu". Por isso vale ouvir várias vezes.' },
        { id: 'a1u1l9-2', type: 'listen', en: 'See you tomorrow!', options: ['Até amanhã!', 'Até mais tarde!', 'Boa noite!'], answer: 'Até amanhã!', why: '"Tomorrow" soa como "tu-MÓ-rou", com a força no meio.' },
        { id: 'a1u1l9-3', type: 'dictation', en: 'Good evening!', why: '"Evening" soa como "ÍV-ning". É o "boa noite" de quando você chega.' },
        { id: 'a1u1l9-4', type: 'listen', en: "You're welcome!", options: ['De nada!', 'Bem-vindo!', 'Com licença!'], answer: 'De nada!', why: '"You\'re welcome" = de nada. Soa como "iór UÉL-com".' },
        { id: 'a1u1l9-5', type: 'dictation', en: 'See you later!', why: '"Later" soa como "LÊI-ter" (no inglês americano o "t" fica parecido com um "r" rápido).' },
        { id: 'a1u1l9-6', type: 'dictation', en: 'Excuse me, please.', accept: ['Excuse me please.'], why: '"Excuse me" = com licença. Com "please" fica ainda mais educado.' },
        { id: 'a1u1l9-7', type: 'speak', en: 'Nice to meet you!', pt: 'Muito prazer!', why: 'Fale ligando as palavras: "náis tu MÍ-tchu".' },
      ],
    } },
    { after: 'a1-u1-l5', lesson: {
      id: 'a1-u1-l10', title: 'Lendo: mensagem da Julia',
      story: {
        title: 'Mensagem da Julia',
        lines: [
          { who: 'Julia', en: 'Hi, Pedro! Good morning!', pt: 'Oi, Pedro! Bom dia!' },
          { who: 'Julia', en: 'Welcome to the school! Nice to meet you.', pt: 'Bem-vindo à escola! Muito prazer.' },
          { ask: 'Onde o Pedro está começando?', options: ['Na escola', 'No escritório', 'No restaurante'], answer: 'Na escola', why: '"Welcome to the school" = bem-vindo à escola.' },
          { who: 'Pedro', en: 'Thank you, Julia! Nice to meet you, ___.', pt: 'Obrigado, Julia! Muito prazer também.', gap: { answer: 'too', options: ['too', 'sorry', 'please'] } },
          { who: 'Julia', en: 'See you in class tomorrow!', pt: 'Até amanhã na aula!' },
          { ask: 'Quando eles se veem de novo?', options: ['Amanhã', 'Hoje à noite', 'Mais tarde'], answer: 'Amanhã', why: '"Tomorrow" = amanhã.' },
          { who: 'Pedro', en: 'OK! See you tomorrow. Bye!', pt: 'Tá bom! Até amanhã. Tchau!' },
        ],
      },
      items: [
        { id: 'a1u1l10-1', type: 'story', why: 'Leia a mensagem com calma, frase por frase. Ouça cada fala e responda às perguntas no caminho.' },
        { id: 'a1u1l10-2', type: 'quiz', q: 'Quem dá as boas-vindas?', options: ['A Julia', 'O Pedro', 'O professor'], answer: 'A Julia', why: 'A Julia escreve "Welcome to the school!".' },
        { id: 'a1u1l10-3', type: 'quiz', q: 'O que o Pedro responde para "Nice to meet you"?', options: ['Nice to meet you, too.', "You're welcome.", 'Good night.'], answer: 'Nice to meet you, too.', why: 'Ele devolve o cumprimento com "too" (também).' },
        { id: 'a1u1l10-4', type: 'quiz', q: 'Como o Pedro se despede?', options: ['See you tomorrow. Bye!', 'Good morning!', 'Excuse me.'], answer: 'See you tomorrow. Bye!', why: '"See you tomorrow" = até amanhã.' },
      ],
    } },
  ],
});
