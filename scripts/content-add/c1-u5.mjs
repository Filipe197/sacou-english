// C1, etapa 2: unidade 5 — Mandei fazer (causativa e passivas avançadas).
// Gera src/content/c1/unit-05.json. Todas as lições levam "added".
// Uso: node scripts/content-add/c1-u5.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `c1-u5-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `c1u5l${n}-${k}`, ...o });

writeUnit('c1/unit-05.json', {
  id: 'c1-u5', level: 'C1', order: 5,
  title: 'Mandei fazer',
  subtitle: 'Causativa (have/get something done) e passivas avançadas (should have been done, being done).',
  can_do: {
    text: 'Consigo falar de serviços que pedi a outras pessoas e de coisas que deveriam ter sido feitas, com a precisão de um falante avançado.',
    source: 'CEFR (Conselho da Europa) — Produção oral e escrita: variedade de estruturas gramaticais complexas, nível C1',
  },
  core_inventory: ['Grammar: causative have/get something done', 'Grammar: have someone do / get someone to do', 'Grammar: passive with modals and perfect (should have been done)', 'Grammar: passive -ing (being done) and get passive'],
  words: [
    ['have something done', 'mandar fazer algo'],
    ['get something done', 'conseguir que façam algo'],
    ['get someone to do', 'convencer alguém a fazer'],
    ['should have been', 'deveria ter sido'],
    ['being done', 'sendo feito'],
    ['get fixed', 'ser consertado'],
    ['get stolen', 'ser roubado'],
    ['repair', 'conserto, consertar'],
    ['delivery', 'entrega'],
    ['appointment', 'horário marcado, consulta'],
  ],
  guide: {
    title: 'Quando outra pessoa faz por você',
    intro: 'Em português dizemos "cortei o cabelo" mesmo quando foi o cabeleireiro que cortou. Em inglês, isso fica claro: "I had my hair cut". É a causativa, muito usada no dia a dia.',
    points: [
      { en: 'I had my hair cut yesterday.', pt: 'Cortei o cabelo ontem (no cabeleireiro).', note: 'Have + objeto + particípio. "I cut my hair" = eu mesmo cortei.' },
      { en: "We're getting the kitchen painted next week.", pt: 'Vamos mandar pintar a cozinha semana que vem.', note: '"Get" no lugar de "have" é mais informal.' },
      { en: 'I got my brother to help me.', pt: 'Convenci o meu irmão a me ajudar.', note: 'Get + pessoa + to + verbo.' },
      { en: 'The report should have been sent yesterday.', pt: 'O relatório deveria ter sido enviado ontem.', note: 'Modal + have been + particípio.' },
      { en: 'The road is being repaired.', pt: 'A estrada está sendo consertada.', note: 'Being + particípio = está sendo feito.' },
      { en: 'My phone got stolen on the bus.', pt: 'Meu celular foi roubado no ônibus.', note: '"Get" + particípio: passiva informal, para coisas inesperadas.' },
    ],
    tips: ['Também serve para coisas ruins: "I had my car stolen" = roubaram o meu carro.', '"Have someone do": "I\'ll have my assistant call you" = vou pedir para a minha assistente te ligar.'],
  },
  extra_vocab: [{ word: 'renovated', reason: 'reformado (imóvel): palavra-chave do tema de serviços; aparece com tradução' }],
  lessons: [
    L(1, 'Mandei cortar o cabelo', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ at the new salon last week.', pt: 'Cortei o cabelo no salão novo semana passada.', options: ['had my hair cut', 'cut my hair', 'had cut my hair'], answer: 'had my hair cut', why: 'Foi o cabeleireiro: have + objeto + particípio.', wrong: { 'cut my hair': 'Significaria que você mesmo cortou.', 'had cut my hair': 'É past perfect, outra coisa.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'We need to ___ before the trip.', pt: 'Precisamos mandar revisar o carro antes da viagem.', options: ['get the car checked', 'get checked the car', 'check the car get'], answer: 'get the car checked', why: 'Get + objeto + particípio.', wrong: { 'get checked the car': 'O objeto vem antes do particípio.', 'check the car get': 'Ordem errada.' } }),
      I(1, 3, { type: 'meaning', en: "She's having her house painted.", options: ['Ela está mandando pintar a casa.', 'Ela está pintando a casa sozinha.', 'Ela vendeu a casa.'], answer: 'Ela está mandando pintar a casa.', why: 'Have + objeto + particípio = mandar fazer.' }),
      I(1, 4, { type: 'build', pt: 'Mandei consertar o meu celular.', answer: 'I had my phone repaired', extra: ['repair', 'did'], display: 'I had my phone repaired.', why: 'Have + objeto + particípio (repaired).' }),
      I(1, 5, { type: 'listen', en: 'Where do you get your nails done?', options: ['Onde você faz as unhas?', 'Você roe as unhas?', 'Você pinta as próprias unhas?'], answer: 'Onde você faz as unhas?', why: '"Get your nails done" = fazer as unhas (com alguém).' }),
      I(1, 6, { type: 'match', pairs: [['have something done', 'mandar fazer'], ['repair', 'conserto'], ['delivery', 'entrega'], ['appointment', 'horário marcado']], why: 'Vocabulário de serviços do dia a dia.' }),
    ]),
    L(2, 'Convenci alguém a fazer', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'I finally got my dad ___ a new phone.', pt: 'Finalmente convenci o meu pai a comprar um celular novo.', options: ['to buy', 'buy', 'buying'], answer: 'to buy', why: 'Get + pessoa + TO + verbo.', wrong: { buy: 'Com "get", precisa de "to".', buying: 'Não é -ing aqui.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "I'll have my assistant ___ you the details.", pt: 'Vou pedir para a minha assistente te mandar os detalhes.', options: ['send', 'to send', 'sent'], answer: 'send', why: 'Have + pessoa + verbo (sem "to").', wrong: { 'to send': 'Com "have", não tem "to".', sent: 'O particípio é quando a coisa vem antes da ação.' } }),
      I(2, 3, { type: 'meaning', en: "I couldn't get the kids to go to bed.", options: ['Não consegui fazer as crianças irem para a cama.', 'As crianças dormiram cedo.', 'Coloquei as crianças na cama.'], answer: 'Não consegui fazer as crianças irem para a cama.', why: 'Get + pessoa + to = convencer, conseguir que.' }),
      I(2, 4, { type: 'build', pt: 'Ela convenceu o chefe a dar mais um dia.', answer: 'She got her boss to give her one more day', extra: ['give her to', 'gave'], display: 'She got her boss to give her one more day.', why: 'Get + pessoa + to + verbo.' }),
      I(2, 5, { type: 'listen', en: "I'll have someone call you back.", options: ['Vou pedir para alguém te ligar de volta.', 'Você vai me ligar de volta.', 'Ninguém vai te ligar.'], answer: 'Vou pedir para alguém te ligar de volta.', why: 'Have + pessoa + verbo.' }),
      I(2, 6, { type: 'speak', en: "I'll have someone call you.", pt: 'Vou pedir para alguém te ligar.', why: 'Frase típica de atendimento.' }),
    ]),
    L(3, 'Deveria ter sido feito', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'The package ___ yesterday, but it still has not arrived.', pt: 'O pacote deveria ter sido entregue ontem, mas ainda não chegou.', options: ['should have been delivered', 'should have delivered', 'should be delivered'], answer: 'should have been delivered', why: 'Passiva no passado com modal: should have been + particípio.', wrong: { 'should have delivered': 'Ativa: o pacote não entrega nada.', 'should be delivered': 'Fala do presente ou futuro.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'The bridge ___ at the moment.', pt: 'A ponte está sendo consertada no momento.', options: ['is being repaired', 'is repairing', 'has repaired'], answer: 'is being repaired', why: 'Is being + particípio = está sendo feito.', wrong: { 'is repairing': 'A ponte não conserta nada: precisa da passiva.', 'has repaired': 'Ativa e no perfect.' } }),
      I(3, 3, { type: 'meaning', en: 'This problem could have been avoided.', options: ['Este problema poderia ter sido evitado.', 'Este problema não tem solução.', 'Evitamos o problema.'], answer: 'Este problema poderia ter sido evitado.', why: 'Could have been + particípio = poderia ter sido.' }),
      I(3, 4, { type: 'build', pt: 'O e-mail deveria ter sido enviado antes.', answer: 'The email should have been sent earlier', extra: ['send', 'be'], display: 'The email should have been sent earlier.', why: 'Should have been + particípio.' }),
      I(3, 5, { type: 'listen', en: 'The results are being checked right now.', options: ['Os resultados estão sendo conferidos agora.', 'Os resultados já saíram.', 'Ninguém vai conferir os resultados.'], answer: 'Os resultados estão sendo conferidos agora.', why: 'Being + particípio.' }),
      I(3, 6, { type: 'match', pairs: [['should have been', 'deveria ter sido'], ['being done', 'sendo feito'], ['get fixed', 'ser consertado'], ['get stolen', 'ser roubado']], why: 'Passivas para situações do dia a dia.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'Why is the office so cold?'], ['B', '___']], options: ["The heating is being repaired. It should have been fixed last week.", "The heating is repairing. It should fix last week.", "Heating being. Fix last week."], answer: 'The heating is being repaired. It should have been fixed last week.', pt: 'O aquecimento está sendo consertado. Deveria ter sido arrumado semana passada.', why: 'Being repaired + should have been fixed.', wrong: { 'The heating is repairing. It should fix last week.': 'Faltam as passivas.', 'Heating being. Fix last week.': 'Incompleto.' } }),
    ]),
    L(4, 'Prática: imprevistos', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'My bike ___ outside the supermarket.', pt: 'Minha bicicleta foi roubada na frente do supermercado.', options: ['got stolen', 'got steal', 'stole'], answer: 'got stolen', why: 'Get + particípio = passiva informal.', wrong: { 'got steal': 'Precisa do particípio: stolen.', stole: 'Ativa: a bicicleta não roubou nada.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'We ___ our flight cancelled because of the storm.', pt: 'Tivemos o nosso voo cancelado por causa da tempestade.', options: ['had', 'got to', 'were'], answer: 'had', why: '"Have something done" também serve para coisas ruins que acontecem com você.', wrong: { 'got to': 'Não forma a estrutura.', were: 'Ficaria "we were our flight".' } }),
      I(4, 3, { type: 'meaning', en: 'He got fired for being late every day.', options: ['Ele foi demitido por chegar atrasado todo dia.', 'Ele pediu demissão.', 'Ele foi promovido.'], answer: 'Ele foi demitido por chegar atrasado todo dia.', why: '"Get fired" = ser demitido.' }),
      I(4, 4, { type: 'build', pt: 'Roubaram o carro dele.', answer: 'He had his car stolen', extra: ['stole', 'was'], display: 'He had his car stolen.', why: 'Have + objeto + particípio para algo ruim que aconteceu com ele.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'You look different!'], ['B', '___']], options: ["Thanks! I had my hair dyed yesterday.", "Thanks! I dyed by hair yesterday had.", "Thanks! Hair had dye."], answer: 'Thanks! I had my hair dyed yesterday.', pt: 'Obrigada! Pintei o cabelo ontem (no salão).', why: '"Dye" = tingir. Have + objeto + particípio.', wrong: { 'Thanks! I dyed by hair yesterday had.': 'Ordem errada.', 'Thanks! Hair had dye.': 'Incompleto.' } }),
      I(4, 6, { type: 'listen', en: 'The meeting got cancelled at the last minute.', options: ['A reunião foi cancelada em cima da hora.', 'A reunião durou muito.', 'A reunião começou cedo.'], answer: 'A reunião foi cancelada em cima da hora.', why: '"At the last minute" = em cima da hora.' }),
      I(4, 7, { type: 'speak', en: 'I need to get my laptop fixed.', pt: 'Preciso mandar consertar o meu notebook.', why: '"Get something fixed" = mandar consertar.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Cortei o cabelo ontem (no salão).', answer: 'I had my hair cut yesterday.', accept: ['I got my hair cut yesterday.', 'Yesterday I had my hair cut.'], why: 'Have/get + objeto + particípio.' }),
      I(5, 2, { type: 'type', pt: 'A casa está sendo pintada.', answer: 'The house is being painted.', accept: ['The house is being painted'], why: 'Is being + particípio.' }),
      I(5, 3, { type: 'dictation', en: 'It should have been done last week.', why: 'Should have been + particípio.' }),
      I(5, 4, { type: 'type', pt: 'Convenci a minha irmã a vir.', answer: 'I got my sister to come.', accept: ['I convinced my sister to come.', 'I persuaded my sister to come.'], why: 'Get + pessoa + to + verbo.' }),
      I(5, 5, { type: 'dictation', en: 'My wallet got stolen on the train.', why: 'Get + particípio = passiva informal.' }),
      I(5, 6, { type: 'type', pt: 'Preciso mandar consertar o meu carro.', answer: 'I need to get my car fixed.', accept: ['I need to have my car fixed.', 'I need to get my car repaired.', 'I need to have my car repaired.'], why: 'Get/have + objeto + particípio.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "We're having a new kitchen put in.", options: ['Estamos mandando instalar uma cozinha nova.', 'Estamos cozinhando algo novo.', 'Vendemos a cozinha.'], answer: 'Estamos mandando instalar uma cozinha nova.', why: '"Put in" = instalar.' }),
      I(6, 2, { type: 'dictation', en: 'The order is being prepared.', why: 'Is being + particípio.' }),
      I(6, 3, { type: 'listen', en: 'She got her landlord to fix the window.', options: ['Ela convenceu o proprietário a consertar a janela.', 'Ela consertou a janela sozinha.', 'A janela continua quebrada.'], answer: 'Ela convenceu o proprietário a consertar a janela.', why: '"Landlord" = proprietário do imóvel.' }),
      I(6, 4, { type: 'dictation', en: 'This could have been avoided.', why: 'Could have been + particípio.' }),
      I(6, 5, { type: 'listen', en: 'I had my bag searched at the airport.', options: ['Revistaram a minha bolsa no aeroporto.', 'Perdi a minha bolsa no aeroporto.', 'Comprei uma bolsa no aeroporto.'], answer: 'Revistaram a minha bolsa no aeroporto.', why: '"Search" = revistar.' }),
      I(6, 6, { type: 'dictation', en: 'When will it be delivered?', why: 'Will be + particípio.' }),
      I(6, 7, { type: 'speak', en: 'It should have been sent yesterday.', pt: 'Deveria ter sido enviado ontem.', why: '"Should have been" soa "shúd-of-bin".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Hello, I ordered a sofa three weeks ago and it still has not arrived.'], ['B', '___']], options: ["I'm so sorry. It should have been delivered last week. Let me check.", "I'm so sorry. It should delivered last week.", "Sorry. Deliver last week should."], answer: "I'm so sorry. It should have been delivered last week. Let me check.", pt: 'Sinto muito. Deveria ter sido entregue semana passada. Deixa eu verificar.', why: 'Passiva com modal no passado.', wrong: { "I'm so sorry. It should delivered last week.": 'Falta "have been".', 'Sorry. Deliver last week should.': 'Ordem errada.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Thank you. What happened?'], ['B', '___']], options: ["It seems it's still being prepared at the factory.", "It seems it still preparing at the factory.", "Seems being factory."], answer: "It seems it's still being prepared at the factory.", pt: 'Parece que ainda está sendo preparado na fábrica.', why: 'Is being + particípio.', wrong: { 'It seems it still preparing at the factory.': 'Falta a passiva: is being prepared.', 'Seems being factory.': 'Incompleto.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "That's not good enough. I took a day off to wait for it."], ['B', '___']], options: ["I understand. I'll have our manager call you today.", "I understand. I'll have our manager to call you.", "I understand. Manager call have."], answer: "I understand. I'll have our manager call you today.", pt: 'Entendo. Vou pedir para o nosso gerente te ligar hoje.', why: 'Have + pessoa + verbo (sem "to").', wrong: { "I understand. I'll have our manager to call you.": 'Com "have", sem "to".', 'I understand. Manager call have.': 'Ordem errada.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'OK. And can I get the delivery fee returned?'], ['B', '___']], options: ["Of course. The money will be returned to your card.", "Of course. The money will return your card.", "Course. Money return."], answer: 'Of course. The money will be returned to your card.', pt: 'Claro. O dinheiro vai ser devolvido no seu cartão.', why: 'Will be + particípio.', wrong: { 'Of course. The money will return your card.': 'Falta a passiva.', 'Course. Money return.': 'Incompleto.' } }),
      I(7, 5, { type: 'speak', en: "I'd like to get this fixed, please.", pt: 'Queria mandar consertar isto, por favor.', why: 'Frase útil em lojas e assistências.' }),
      I(7, 6, { type: 'speak', en: "I'll have someone check it.", pt: 'Vou pedir para alguém verificar.', why: 'Have + pessoa + verbo.' }),
    ]),
    L(8, 'Lendo: a reforma do apartamento', [
      I(8, 1, { type: 'story', why: 'A Camila escreve no blog sobre a reforma do apartamento dela. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que a Camila mandou fazer primeiro?', options: ['Pintar as paredes', 'Trocar o piso', 'Instalar uma cozinha'], answer: 'Pintar as paredes', why: '"First, I had the walls painted."' }),
      I(8, 3, { type: 'quiz', q: 'O que deu errado?', options: ['A janela não foi entregue no dia', 'O pintor sumiu', 'Ela ficou sem dinheiro'], answer: 'A janela não foi entregue no dia', why: '"The new window should have been delivered on Monday."' }),
      I(8, 4, { type: 'quiz', q: 'Como ela convenceu a empresa?', options: ['Ligou todos os dias', 'Mandou uma carta', 'Foi até a loja'], answer: 'Ligou todos os dias', why: '"I called them every day until I got them to send it."' }),
    ], {
      title: 'A reforma do apartamento',
      lines: [
        { who: 'Camila', en: 'This month I finally had my old apartment renovated.', pt: 'Este mês eu finalmente mandei reformar o meu apartamento antigo.' },
        { who: 'Camila', en: 'First, I had the walls painted a light green. I love it!', pt: 'Primeiro, mandei pintar as paredes de verde-claro. Amei!' },
        { ask: 'De que cor ficaram as paredes?', options: ['Verde-claro', 'Branco', 'Azul'], answer: 'Verde-claro', why: '"A light green."' },
        { who: 'Camila', en: 'The new window should have ___ delivered on Monday, but nothing came.', pt: 'A janela nova deveria ter sido entregue na segunda, mas nada chegou.', gap: { answer: 'been', options: ['been', 'be', 'being'] } },
        { who: 'Camila', en: 'I called them every day until I got them to send it.', pt: 'Liguei para eles todos os dias até convencê-los a mandar.' },
        { who: 'Camila', en: 'Now the kitchen is being finished. Next week, I will finally move in!', pt: 'Agora a cozinha está sendo finalizada. Semana que vem, finalmente me mudo!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'I ___ my eyes tested every year.', pt: 'Faço exame de vista todo ano.', options: ['have', 'make', 'do'], answer: 'have', why: '"Have my eyes tested" = fazer exame de vista (alguém examina).', wrong: { make: '"Make" não forma a causativa assim.', do: '"Do" não forma a causativa.' } }),
      I(9, 2, { type: 'type', pt: 'O projeto está sendo analisado.', answer: 'The project is being analysed.', accept: ['The project is being analyzed.', 'The project is being reviewed.'], why: 'Is being + particípio.' }),
      I(9, 3, { type: 'meaning', en: "I'll get it done by Friday.", options: ['Vou deixar isso pronto até sexta.', 'Fiz isso na sexta.', 'Não vou fazer isso.'], answer: 'Vou deixar isso pronto até sexta.', why: '"Get it done" = dar conta, deixar pronto.' }),
      I(9, 4, { type: 'dictation', en: 'The tickets should have been booked.', why: 'Should have been + particípio.' }),
      I(9, 5, { type: 'listen', en: 'I got my neighbour to water the plants.', options: ['Pedi para o meu vizinho regar as plantas.', 'Reguei as plantas do vizinho.', 'As plantas morreram.'], answer: 'Pedi para o meu vizinho regar as plantas.', why: 'Get + pessoa + to + verbo.' }),
      I(9, 6, { type: 'build', pt: 'Vamos mandar limpar o tapete.', answer: "We're going to have the carpet cleaned", extra: ['clean', 'make'], display: "We're going to have the carpet cleaned.", why: 'Have + objeto + particípio.' }),
    ]),
    L(10, 'História: o casamento quase perfeito', [
      I(10, 1, { type: 'story', why: 'A noiva conta para a amiga como foi organizar o casamento. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que aconteceu com o vestido?', options: ['Foi ajustado errado', 'Foi roubado', 'Ficou perfeito'], answer: 'Foi ajustado errado', why: '"I had my dress altered, but they made it too short!"' }),
      I(10, 3, { type: 'quiz', q: 'Quem resolveu o problema do vestido?', options: ['A avó da noiva', 'A costureira', 'O noivo'], answer: 'A avó da noiva', why: '"I got my grandmother to fix it."' }),
      I(10, 4, { type: 'quiz', q: 'O que deveria ter sido feito antes?', options: ['Os convites enviados', 'O bolo comprado', 'A igreja reservada'], answer: 'Os convites enviados', why: '"The invitations should have been sent months ago."' }),
    ], {
      title: 'O casamento quase perfeito',
      lines: [
        { who: 'Lia', en: 'Planning a wedding is crazy. I had my dress altered, but they made it too short!', pt: 'Organizar um casamento é uma loucura. Mandei ajustar o vestido, mas deixaram curto demais!' },
        { who: 'Nina', en: 'Oh no! What did you do?', pt: 'Ah, não! E o que você fez?' },
        { who: 'Lia', en: 'I got my grandmother to fix it. She is amazing with a needle.', pt: 'Convenci a minha avó a consertar. Ela é incrível com a agulha.' },
        { ask: 'Quem consertou o vestido?', options: ['A avó', 'A mãe', 'A costureira'], answer: 'A avó', why: '"I got my grandmother to fix it."' },
        { who: 'Nina', en: 'And the invitations? Have they ___ sent?', pt: 'E os convites? Já foram enviados?', gap: { answer: 'been', options: ['been', 'be', 'being'] } },
        { who: 'Lia', en: 'Not yet. They should have been sent months ago. They are being printed now.', pt: 'Ainda não. Deveriam ter sido enviados meses atrás. Estão sendo impressos agora.' },
        { who: 'Nina', en: "Don't worry. I'll get my cousin to deliver them by hand!", pt: 'Não se preocupe. Vou pedir para o meu primo entregar em mãos!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-c1u5', level: 'C1', unlock: 'c1-u5', title: 'Quem fez, afinal?',
  intro: 'A Ana e o Tom explicam por que "cortei o cabelo" confunde os brasileiros em inglês.',
  lines: [
    { who: 'tom', en: 'Ana, your hair looks great. Did you cut it yourself?', pt: 'Ana, o seu cabelo está ótimo. Você mesma cortou?' },
    { who: 'ana', en: 'Ha! No, I had it cut at a salon. And that is exactly today\'s topic.', pt: 'Rá! Não, mandei cortar num salão. E esse é exatamente o tema de hoje.' },
    { who: 'tom', en: 'Right. In Portuguese, people say "I cut my hair" even when someone else did it.', pt: 'Isso. Em português, as pessoas dizem "cortei o cabelo" mesmo quando foi outra pessoa.' },
    { who: 'ana', en: 'But in English, "I cut my hair" means you used the scissors yourself!', pt: 'Mas em inglês, "I cut my hair" quer dizer que você mesma usou a tesoura!' },
    { who: 'tom', en: 'So we say "I had my hair cut" or "I got my hair cut". The same with cars, phones and houses.', pt: 'Então dizemos "I had my hair cut" ou "I got my hair cut". O mesmo vale para carros, celulares e casas.' },
    { who: 'ana', en: 'And it works for bad things too. Last year I had my phone stolen.', pt: 'E também serve para coisas ruins. Ano passado roubaram o meu celular.' },
    { who: 'tom', en: "Oh no. Well, now you can tell that story correctly!", pt: 'Ah, não. Bom, agora você pode contar essa história do jeito certo!' },
    { who: 'ana', en: 'Exactly. See you next week!', pt: 'Exatamente. Até a semana que vem!' },
  ],
  questions: [
    { q: 'Quem cortou o cabelo da Ana?', options: ['Um salão', 'Ela mesma', 'O Tom'], answer: 'Um salão', why: '"I had it cut at a salon."' },
    { q: 'O que "I cut my hair" quer dizer em inglês?', options: ['Que você mesmo cortou', 'Que foi ao salão', 'Que não cortou'], answer: 'Que você mesmo cortou', why: '"It means you used the scissors yourself!"' },
    { q: 'O que aconteceu com a Ana no ano passado?', options: ['Roubaram o celular dela', 'Ela perdeu o cabelo', 'Ela mudou de casa'], answer: 'Roubaram o celular dela', why: '"Last year I had my phone stolen."' },
  ],
}, 'pod-c1u4');
addScene('c1-u5', 'standing-6', 'scissors');
