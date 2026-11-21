// Etapa 3 do A2 completo: unidade nova 14 — Hotel e aeroporto (Could you...?, too / enough).
// Gera src/content/a2/unit-14.json. Todas as lições levam "added".
// Uso: node scripts/content-add/a2-u14.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u14-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u14l${n}-${k}`, ...o });

writeUnit('a2/unit-14.json', {
  id: 'a2-u14', level: 'A2', order: 14,
  title: 'Hotel e aeroporto',
  subtitle: 'Fazer check-in, pedir coisas com educação e resolver problemas na viagem.',
  can_do: {
    text: 'Consigo fazer check-in no hotel e no aeroporto, pedir coisas com educação e reclamar de um problema simples.',
    source: 'CEFR (Conselho da Europa) — Interação oral: transações em viagem (hotel, aeroporto), nível A2',
  },
  core_inventory: ['Topics: hotels and airports', 'Functions: polite requests (Could you...? / Could I...?)', 'Grammar: too + adjective / adjective + enough', 'Functions: simple complaints'],
  words: [
    ['single / double', 'de solteiro / de casal (quarto)'],
    ['key', 'chave'],
    ['floor', 'andar'],
    ['elevator', 'elevador'],
    ['towel', 'toalha'],
    ['flight', 'voo'],
    ['gate', 'portão (de embarque)'],
    ['delay', 'atraso, atrasar'],
    ['suitcase', 'mala'],
    ['seat', 'assento, lugar'],
    ['window', 'janela'],
    ['aisle', 'corredor (no avião)'],
    ['too', 'demais'],
    ['enough', 'suficiente, o bastante'],
    ['could you', 'você poderia'],
  ],
  guide: {
    title: 'Hotel e aeroporto: pedir e reclamar com educação',
    intro: 'Em viagem, quase tudo começa com um pedido. "Could you...?" e "Could I...?" são os jeitos mais educados de pedir. E para reclamar, "too" (demais) e "not ... enough" (não ... o suficiente) resolvem quase tudo.',
    points: [
      { en: 'Could you help me with my suitcase?', pt: 'Você poderia me ajudar com a mala?', note: '"Could you + verbo?" = você poderia...? Mais gentil que "can you".' },
      { en: 'Could I have a window seat, please?', pt: 'Eu poderia ficar na janela, por favor?', note: '"Could I have...?" = eu poderia ter / receber...?' },
      { en: 'The room is too noisy.', pt: 'O quarto é barulhento demais.', note: '"Too" + adjetivo = demais (é um problema).' },
      { en: "The bed isn't big enough.", pt: 'A cama não é grande o suficiente.', note: '"Enough" vem DEPOIS do adjetivo: big enough.' },
      { en: "We don't have enough towels.", pt: 'Não temos toalhas suficientes.', note: 'Com uma coisa, "enough" vem ANTES: enough towels.' },
      { en: 'Our flight has a two-hour delay.', pt: 'Nosso voo está com duas horas de atraso.', note: '"Delay" = atraso. "Delayed" = atrasado.' },
    ],
    tips: ['"Too" e "very" não são iguais: "very hot" é só muito quente; "too hot" é quente demais (não dá).', 'No avião: "window seat" (janela) ou "aisle seat" (corredor). "Aisle" soa como "ÁIL": o "s" é mudo.'],
  },
  extra_vocab: [
    { word: 'aisle', reason: 'palavra essencial no avião (B1); sempre com tradução' },
    { word: 'passport', reason: 'documento essencial em viagem (B1); sempre com tradução' },
    { word: 'reception', reason: 'a recepção do hotel (B1); essencial na unidade, sempre com tradução' },
  ],
  lessons: [
    L(1, 'No hotel', [
      I(1, 1, { type: 'match', pairs: [['key', 'chave'], ['towel', 'toalha'], ['floor', 'andar'], ['elevator', 'elevador']], why: '"Floor" também é chão; no hotel, é o andar: the third floor (o terceiro andar).' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "I'd like a ___ room for two people.", pt: 'Eu gostaria de um quarto de casal para duas pessoas.', options: ['double', 'single', 'two'], answer: 'double', why: '"Double room" = quarto com cama de casal.', wrong: { single: '"Single" é para uma pessoa.', two: '"Two room" não existe.' } }),
      I(1, 3, { type: 'meaning', en: 'Your room is on the third floor. Here is your key.', options: ['Seu quarto fica no terceiro andar. Aqui está sua chave.', 'Seu quarto tem cinco camas. Aqui está sua toalha.', 'Seu quarto fica perto do elevador.'], answer: 'Seu quarto fica no terceiro andar. Aqui está sua chave.', why: '"Third floor" = terceiro andar. "Key" = chave.' }),
      I(1, 4, { type: 'listen', en: 'Is breakfast included?', options: ['O café da manhã está incluído?', 'A que horas é o café da manhã?', 'Onde é o café da manhã?'], answer: 'O café da manhã está incluído?', why: '"Included" = incluído. Pergunta importante no check-in!' }),
      I(1, 5, { type: 'build', pt: 'Eu tenho um quarto reservado em nome de Sarah Brown.', answer: 'I have a room booked for Sarah Brown', extra: ['has', 'in'], display: 'I have a room booked for Sarah Brown.', why: '"I have a room booked for..." = tenho um quarto reservado em nome de...' }),
      I(1, 6, { type: 'choice', prompt: 'Complete:', en: 'The elevator is ___ the left.', pt: 'O elevador fica à esquerda.', options: ['on', 'in', 'at'], answer: 'on', why: '"On the left / on the right" = à esquerda / à direita.', wrong: { in: 'Com left e right, a preposição é "on".', at: 'Com left e right, a preposição é "on".' } }),
    ]),
    L(2, 'Você poderia...?', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: '___ you help me with my bags, please?', pt: 'Você poderia me ajudar com as malas, por favor?', options: ['Could', 'Do', 'Are'], answer: 'Could', why: '"Could you + verbo?" = pedido educado.', wrong: { Do: '"Do you help me?" pergunta se você costuma ajudar.', Are: '"Are you help" não existe.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Could I ___ two more towels, please?', pt: 'Eu poderia receber mais duas toalhas, por favor?', options: ['have', 'having', 'to have'], answer: 'have', why: '"Could I have...?" com o verbo normal.', wrong: { having: 'Depois de "could", sem -ing.', 'to have': 'Depois de "could", sem "to".' } }),
      I(2, 3, { type: 'meaning', en: 'Could you call a taxi for me?', options: ['Você poderia chamar um táxi para mim?', 'Você chamou um táxi para mim?', 'Eu posso chamar um táxi?'], answer: 'Você poderia chamar um táxi para mim?', why: '"Could you...?" = você poderia...?' }),
      I(2, 4, { type: 'build', pt: 'Você poderia me acordar às seis?', answer: 'Could you wake me up at six', extra: ['I', 'waking'], display: 'Could you wake me up at six?', why: '"Wake me up" = me acordar. Depois do verbo: me.' }),
      I(2, 5, { type: 'dialogue', lines: [['A', 'Could I see your passport, please?'], ['B', '___']], options: ['Of course. Here you are.', 'Yes, I could.', 'No, you see.'], answer: 'Of course. Here you are.', pt: 'Claro. Aqui está.', why: '"Here you are" = aqui está (entregando algo).', wrong: { 'Yes, I could.': 'Não responde a um pedido.', 'No, you see.': 'Não faz sentido.' } }),
      I(2, 6, { type: 'speak', en: 'Could I have a window seat?', pt: 'Eu poderia ficar na janela?', why: '"Could I" soa quase como "KÚ-dai".' }),
    ]),
    L(3, 'No aeroporto', [
      I(3, 1, { type: 'match', pairs: [['flight', 'voo'], ['gate', 'portão'], ['seat', 'assento'], ['delay', 'atraso']], why: '"Gate" é o portão de embarque: gate 12.' }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'Our flight is ___. It leaves at ten now.', pt: 'Nosso voo está atrasado. Agora sai às dez.', options: ['delayed', 'delay', 'late flight'], answer: 'delayed', why: '"Delayed" = atrasado.', wrong: { delay: '"Delay" é o atraso (substantivo).', 'late flight': 'Não forma frase depois de "is".' } }),
      I(3, 3, { type: 'meaning', en: 'Please go to gate fourteen. The plane is boarding now.', options: ['Por favor, vá ao portão catorze. O embarque está acontecendo agora.', 'Por favor, espere catorze minutos. O avião está atrasado.', 'O voo catorze foi cancelado.'], answer: 'Por favor, vá ao portão catorze. O embarque está acontecendo agora.', why: '"Boarding" = embarcando, embarque.' }),
      I(3, 4, { type: 'choice', prompt: 'Complete:', en: 'Would you like a window or an ___ seat?', pt: 'Você quer janela ou corredor?', options: ['aisle', 'door', 'floor'], answer: 'aisle', why: '"Aisle seat" = assento do corredor.', wrong: { door: 'Não existe "door seat".', floor: '"Floor" é chão ou andar.' } }),
      I(3, 5, { type: 'listen', en: 'How many suitcases do you have?', options: ['Quantas malas você tem?', 'Quanto custa a mala?', 'Sua mala é grande?'], answer: 'Quantas malas você tem?', why: '"How many" = quantos(as).' }),
      I(3, 6, { type: 'build', pt: 'A que horas sai o voo?', answer: 'What time does the flight leave', extra: ['do', 'is'], display: 'What time does the flight leave?', why: 'Presente simples: What time + does + the flight + leave.' }),
    ]),
    L(4, 'Prática: demais ou suficiente?', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "I can't sleep. The room is ___ hot.", pt: 'Não consigo dormir. O quarto está quente demais.', options: ['too', 'enough', 'very enough'], answer: 'too', why: '"Too + adjetivo" = demais (é um problema).', wrong: { enough: '"Enough" vem depois do adjetivo e quer dizer suficiente.', 'very enough': 'Não existe.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: "The bed isn't ___ for two people.", pt: 'A cama não é grande o suficiente para duas pessoas.', options: ['big enough', 'enough big', 'too big'], answer: 'big enough', why: 'Adjetivo + enough: big enough.', wrong: { 'enough big': 'Com adjetivo, "enough" vem depois.', 'too big': 'Cama grande demais não seria problema para duas pessoas!' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: "We don't have ___ towels.", pt: 'Não temos toalhas suficientes.', options: ['enough', 'too', 'too many'], answer: 'enough', why: 'Com uma coisa, "enough" vem antes: enough towels.', wrong: { too: '"Too towels" não existe.', 'too many': '"Too many towels" seria toalhas demais.' } }),
      I(4, 4, { type: 'meaning', en: 'This suitcase is too heavy. You have to pay more.', options: ['Esta mala está pesada demais. Você tem que pagar mais.', 'Esta mala é leve o suficiente.', 'Você pode levar outra mala.'], answer: 'Esta mala está pesada demais. Você tem que pagar mais.', why: '"Too heavy" = pesada demais.' }),
      I(4, 5, { type: 'build', pt: 'O quarto não é limpo o suficiente.', answer: "The room isn't clean enough", extra: ['too', 'enough clean'], display: "The room isn't clean enough.", why: 'Adjetivo + enough.' }),
      I(4, 6, { type: 'dialogue', lines: [['A', 'Is everything OK with your room?'], ['B', '___']], options: ["Not really. It's too noisy. Could I change rooms?", "Not really. It's noisy enough. I change room.", "Not really. It's too much noisy."], answer: "Not really. It's too noisy. Could I change rooms?", pt: 'Não muito. Está barulhento demais. Eu poderia trocar de quarto?', why: 'Reclame (too noisy) e peça com educação (Could I...?).', wrong: { "Not really. It's noisy enough. I change room.": '"Noisy enough" seria barulhento o suficiente, como se fosse bom.', "Not really. It's too much noisy.": 'Sem "much": too noisy.' } }),
      I(4, 7, { type: 'speak', en: "The room is too small.", pt: 'O quarto é pequeno demais.', why: '"Too" soa como "TÚU".' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Você poderia me ajudar?', answer: 'Could you help me?', why: '"Could you + verbo?" = pedido educado.' }),
      I(5, 2, { type: 'type', pt: 'O quarto está quente demais.', answer: 'The room is too hot.', why: '"Too + adjetivo".' }),
      I(5, 3, { type: 'dictation', en: 'My flight is delayed.', why: '"Delayed" = atrasado.' }),
      I(5, 4, { type: 'type', pt: 'Eu gostaria de um quarto de casal.', answer: "I'd like a double room.", accept: ['I would like a double room.'], why: '"Double room" = quarto de casal.' }),
      I(5, 5, { type: 'dictation', en: 'Here is your key.', why: '"Key" = chave. Soa como "KÍI".' }),
      I(5, 6, { type: 'type', pt: 'Eu poderia ficar no corredor?', answer: 'Could I have an aisle seat?', why: '"Aisle seat" = assento do corredor.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Flight two-four-five to Lisbon is now boarding at gate nine.', options: ['O voo 245 para Lisboa está embarcando no portão 9.', 'O voo 245 para Lisboa está atrasado.', 'O voo 9 para Lisboa foi cancelado.'], answer: 'O voo 245 para Lisboa está embarcando no portão 9.', why: 'Números de voo são ditos um a um: two-four-five.' }),
      I(6, 2, { type: 'dictation', en: 'Could I have a towel, please?', why: '"Towel" soa como "TÁU-el".' }),
      I(6, 3, { type: 'listen', en: "The coffee isn't hot enough.", options: ['O café não está quente o suficiente.', 'O café está quente demais.', 'Não tem café suficiente.'], answer: 'O café não está quente o suficiente.', why: '"Hot enough" = quente o suficiente.' }),
      I(6, 4, { type: 'dictation', en: 'The elevator is on the right.', why: '"On the right" = à direita.' }),
      I(6, 5, { type: 'listen', en: 'Your room is on the second floor.', options: ['Seu quarto fica no segundo andar.', 'Seu quarto tem duas camas.', 'Seu quarto é o número dois.'], answer: 'Seu quarto fica no segundo andar.', why: '"Second floor" = segundo andar.' }),
      I(6, 6, { type: 'dictation', en: 'This bag is too heavy.', why: '"Too heavy" = pesada demais.' }),
      I(6, 7, { type: 'speak', en: 'Is breakfast included?', pt: 'O café da manhã está incluído?', why: '"Included" soa como "in-KLÚ-did".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Good evening. How can I help you?'], ['B', '___']], options: ['Hi. I have a room booked for two nights.', 'Hi. I booking a room two nights.', 'Hi. You have room?'], answer: 'Hi. I have a room booked for two nights.', pt: 'Oi. Tenho um quarto reservado para duas noites.', why: '"I have a room booked" = tenho um quarto reservado.', wrong: { 'Hi. I booking a room two nights.': 'Falta o "am" e o "for".', 'Hi. You have room?': 'Pergunta sem "do" e sem "a": Do you have a room?' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Could I see your passport?'], ['B', '___']], options: ['Sure, here you are.', 'Sure, here you is.', 'Sure, you are here.'], answer: 'Sure, here you are.', pt: 'Claro, aqui está.', why: '"Here you are" = aqui está.', wrong: { 'Sure, here you is.': 'Com "you", sempre "are".', 'Sure, you are here.': 'Isso diz "você está aqui".' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "Here's your key. Room 305."], ['B', '___']], options: ['Thank you. What time is breakfast?', 'Thank you. What time breakfast is?', 'Thank you. Breakfast what time?'], answer: 'Thank you. What time is breakfast?', pt: 'Obrigado. A que horas é o café da manhã?', why: 'Pergunta: What time + is + breakfast?', wrong: { 'Thank you. What time breakfast is?': 'Na pergunta, "is" vem antes.', 'Thank you. Breakfast what time?': 'Falta o verbo.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Reception. Can I help you?'], ['B', '___']], options: ["Yes. The shower isn't hot enough. Could you send someone?", "Yes. The shower is enough hot. Send someone.", "Yes. The shower too cold enough."], answer: "Yes. The shower isn't hot enough. Could you send someone?", pt: 'Sim. O chuveiro não está quente o suficiente. Vocês poderiam mandar alguém?', why: 'Reclamação + pedido educado.', wrong: { "Yes. The shower is enough hot. Send someone.": 'Ordem: hot enough. E "Send someone" sozinho soa grosseiro.', "Yes. The shower too cold enough.": 'Não faz sentido.' } }),
      I(7, 5, { type: 'speak', en: 'Could you call a taxi for me?', pt: 'Você poderia chamar um táxi para mim?', why: '"Taxi" soa como "TÉK-si".' }),
      I(7, 6, { type: 'speak', en: 'I have a room booked.', pt: 'Tenho um quarto reservado.', why: '"Booked" soa como "BÚKT".' }),
    ]),
    L(8, 'Lendo: a avaliação do hotel', [
      I(8, 1, { type: 'story', why: 'A Paula escreve uma avaliação do hotel na internet. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que a Paula achou da vista?', options: ['Linda', 'Feia', 'Não tinha vista'], answer: 'Linda', why: '"The view from our room was beautiful."' }),
      I(8, 3, { type: 'quiz', q: 'Qual era o problema do quarto?', options: ['Pequeno demais para três pessoas', 'Sujo', 'Sem chuveiro'], answer: 'Pequeno demais para três pessoas', why: '"It was too small for three people."' }),
      I(8, 4, { type: 'quiz', q: 'Como o funcionário ajudou?', options: ['Levou mais toalhas', 'Trocou o quarto', 'Deu desconto'], answer: 'Levou mais toalhas', why: '"He brought us more towels."' }),
    ], {
      title: 'Avaliação: Hotel Mar Azul',
      lines: [
        { who: 'Paula', en: 'We stayed at this hotel for three nights. The view from our room was beautiful!', pt: 'Ficamos neste hotel por três noites. A vista do nosso quarto era linda!' },
        { who: 'Paula', en: 'The breakfast was included, and it was very good.', pt: 'O café da manhã estava incluído e era muito bom.' },
        { ask: 'O café da manhã estava incluído?', options: ['Sim', 'Não', 'Só no domingo'], answer: 'Sim', why: '"The breakfast was included."' },
        { who: 'Paula', en: 'But the room was ___ small for three people.', pt: 'Mas o quarto era pequeno demais para três pessoas.', gap: { answer: 'too', options: ['too', 'enough', 'very enough'] } },
        { who: 'Paula', en: "And we didn't have enough towels. I called reception and Mike helped us.", pt: 'E não tínhamos toalhas suficientes. Liguei para a recepção e o Mike nos ajudou.' },
        { who: 'Paula', en: 'He brought us more towels in five minutes. Very nice staff!', pt: 'Ele trouxe mais toalhas para nós em cinco minutos. Equipe muito simpática!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'Could you ___ the window, please?', pt: 'Você poderia abrir a janela, por favor?', options: ['open', 'opening', 'to open'], answer: 'open', why: '"Could you" + verbo normal.', wrong: { opening: 'Sem -ing.', 'to open': 'Sem "to".' } }),
      I(9, 2, { type: 'type', pt: 'A mala está pesada demais.', answer: 'The suitcase is too heavy.', why: '"Too heavy" = pesada demais.' }),
      I(9, 3, { type: 'meaning', en: "Sorry, we don't have enough seats on this flight.", options: ['Desculpe, não temos assentos suficientes neste voo.', 'Desculpe, este voo está atrasado.', 'Desculpe, os assentos são pequenos demais.'], answer: 'Desculpe, não temos assentos suficientes neste voo.', why: '"Enough seats" = assentos suficientes.' }),
      I(9, 4, { type: 'dictation', en: 'Our flight has a long delay.', why: '"Delay" = atraso.' }),
      I(9, 5, { type: 'listen', en: 'Could I change rooms? This one is too noisy.', options: ['Eu poderia trocar de quarto? Este é barulhento demais.', 'Eu posso ficar neste quarto? É silencioso.', 'Este quarto é grande demais.'], answer: 'Eu poderia trocar de quarto? Este é barulhento demais.', why: '"Change rooms" = trocar de quarto.' }),
      I(9, 6, { type: 'build', pt: 'O quarto não é grande o suficiente para nós.', answer: "The room isn't big enough for us", extra: ['too', 'we'], display: "The room isn't big enough for us.", why: 'Adjetivo + enough. Depois de "for": us.' }),
    ]),
    L(10, 'História: o voo atrasado', [
      I(10, 1, { type: 'story', why: 'O Carlos tem um problema no aeroporto. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Quanto tempo o voo vai atrasar?', options: ['Três horas', 'Meia hora', 'Um dia'], answer: 'Três horas', why: '"There is a three-hour delay."' }),
      I(10, 3, { type: 'quiz', q: 'O que a funcionária oferece?', options: ['Uma refeição grátis', 'Um hotel', 'Outro voo'], answer: 'Uma refeição grátis', why: '"You can have a free meal" = você pode fazer uma refeição grátis.' }),
      I(10, 4, { type: 'quiz', q: 'Que assento o Carlos pede?', options: ['Corredor', 'Janela', 'Qualquer um'], answer: 'Corredor', why: '"Could I have an aisle seat?"' }),
    ], {
      title: 'O voo atrasado',
      lines: [
        { who: 'Carlos', en: "Excuse me. My flight to London isn't on the board. Is it delayed?", pt: 'Com licença. Meu voo para Londres não está no painel. Está atrasado?' },
        { who: 'Sarah', en: "Let me check. Yes, I'm sorry. There is a three-hour ___.", pt: 'Deixe-me ver. Sim, sinto muito. Tem um atraso de três horas.', gap: { answer: 'delay', options: ['delay', 'gate', 'seat'] } },
        { who: 'Carlos', en: 'Three hours? Oh no! I have a meeting in London tonight.', pt: 'Três horas? Ah, não! Tenho uma reunião em Londres hoje à noite.' },
        { ask: 'Por que o Carlos fica preocupado?', options: ['Tem uma reunião hoje à noite', 'Perdeu a mala', 'Esqueceu o passaporte'], answer: 'Tem uma reunião hoje à noite', why: '"I have a meeting in London tonight."' },
        { who: 'Sarah', en: "I understand. You can have a free meal at any restaurant here.", pt: 'Entendo. Você pode fazer uma refeição grátis em qualquer restaurante aqui.' },
        { who: 'Carlos', en: 'Thank you. Could I have an aisle seat, please? My legs are too long!', pt: 'Obrigado. Eu poderia ficar no corredor, por favor? Minhas pernas são compridas demais!' },
        { who: 'Sarah', en: "Of course. Seat fourteen. Your gate is number eight.", pt: 'Claro. Assento catorze. Seu portão é o número oito.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u14', level: 'A2', unlock: 'a2-u14', title: 'Viajar sem estresse',
  intro: 'A Ana e o Tom contam como foi a última viagem e dão dicas para o hotel e o aeroporto.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're talking about hotels and airports.", pt: 'E eu sou o Tom. Hoje vamos falar de hotéis e aeroportos.' },
    { who: 'ana', en: 'Tom, how was your last trip?', pt: 'Tom, como foi sua última viagem?' },
    { who: 'tom', en: 'Not great. My flight had a four-hour delay!', pt: 'Nada boa. Meu voo atrasou quatro horas!' },
    { who: 'ana', en: 'Oh no! And the hotel?', pt: 'Ah, não! E o hotel?' },
    { who: 'tom', en: "The room was too small, and the bed wasn't big enough for me.", pt: 'O quarto era pequeno demais e a cama não era grande o suficiente para mim.' },
    { who: 'ana', en: "My tip: be polite. Say 'Could you help me, please?' People help you more.", pt: 'Minha dica: seja educado. Diga "Could you help me, please?". As pessoas ajudam mais.' },
    { who: 'tom', en: 'Good tip! And always ask for a window seat. The view is beautiful.', pt: 'Boa dica! E sempre peça janela. A vista é linda.' },
    { who: 'ana', en: "That's all for today. Have a good trip!", pt: 'Por hoje é só. Boa viagem!' },
    { who: 'tom', en: 'Bye! Thank you for listening!', pt: 'Tchau! Obrigado por ouvir!' },
  ],
  questions: [
    { q: 'Quanto tempo o voo do Tom atrasou?', options: ['Quatro horas', 'Duas horas', 'Um dia'], answer: 'Quatro horas', why: '"A four-hour delay."' },
    { q: 'Qual era o problema da cama?', options: ['Pequena demais para ele', 'Dura demais', 'Suja'], answer: 'Pequena demais para ele', why: '"The bed wasn\'t big enough for me."' },
    { q: 'Qual é a dica da Ana?', options: ['Ser educado ao pedir', 'Viajar à noite', 'Levar pouca mala'], answer: 'Ser educado ao pedir', why: '"Be polite. Say \'Could you help me, please?\'"' },
  ],
}, 'pod-a2u13');
addScene('a2-u14', 'standing-18', 'suitcase');
