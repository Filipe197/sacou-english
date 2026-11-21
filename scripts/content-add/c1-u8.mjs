// C1, etapa 2: unidade 8 — Formal ou informal? (registro em e-mails e mensagens).
// Gera src/content/c1/unit-08.json. Todas as lições levam "added".
// Uso: node scripts/content-add/c1-u8.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `c1-u8-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `c1u8l${n}-${k}`, ...o });

writeUnit('c1/unit-08.json', {
  id: 'c1-u8', level: 'C1', order: 8,
  title: 'Formal ou informal?',
  subtitle: 'Registro: e-mails formais, pedidos educados e mensagens informais.',
  can_do: {
    text: 'Consigo escolher o tom certo para cada situação: um e-mail formal para uma empresa, um pedido educado ao chefe ou uma mensagem informal para um amigo.',
    source: 'CEFR (Conselho da Europa) — Adequação sociolinguística: ajustar o registro à situação e ao interlocutor, nível C1',
  },
  core_inventory: ['Functions: formal email openings and closings', 'Functions: polite requests (I would appreciate it if…, Could you possibly…)', 'Vocabulary: formal vs informal pairs (receive/get, request/ask, assist/help)', 'Functions: informal messages and abbreviations'],
  words: [
    ['I am writing to', 'escrevo para'],
    ['I would appreciate it if', 'eu agradeceria se'],
    ['could you possibly', 'será que você poderia'],
    ['regarding', 'a respeito de'],
    ['enquire', 'pedir informação'],
    ['assist', 'ajudar (formal)'],
    ['request', 'pedido, solicitar'],
    ['kind regards', 'atenciosamente'],
    ['look forward to', 'aguardar com expectativa'],
    ['attached', 'anexo, em anexo'],
  ],
  guide: {
    title: 'O mesmo pedido, dois tons',
    intro: 'Em inglês, o registro muda muito: o vocabulário, o tamanho da frase e até os verbos. Usar o tom errado pode soar grosseiro (informal demais) ou frio e estranho (formal demais com amigos).',
    points: [
      { en: 'I am writing to enquire about the course.', pt: 'Escrevo para pedir informações sobre o curso.', note: 'Formal. Informal seria: "Just wanted to ask about the course".' },
      { en: 'I would appreciate it if you could reply soon.', pt: 'Eu agradeceria se você pudesse responder logo.', note: 'Pedido formal e educado.' },
      { en: 'Could you possibly send me the file?', pt: 'Será que você poderia me mandar o arquivo?', note: '"Possibly" deixa o pedido ainda mais suave.' },
      { en: 'Please find the report attached.', pt: 'Segue o relatório em anexo.', note: 'Típico de e-mail de trabalho.' },
      { en: 'I look forward to hearing from you.', pt: 'Aguardo o seu retorno.', note: 'Fechamento formal. Depois: "Kind regards".' },
      { en: 'Hey! Got your message. Talk later?', pt: 'Oi! Recebi a sua mensagem. Falamos depois?', note: 'Informal: frases curtas, sem sujeito às vezes.' },
    ],
    tips: ['Pares úteis: get → receive, ask → request, help → assist, need → require, buy → purchase.', '"Look forward to" é seguido de -ing: I look forward to meeting you.'],
  },
  extra_vocab: [{ word: 'enquire', reason: 'pedir informação (formal): verbo típico de e-mails formais; aparece com tradução' }],
  lessons: [
    L(1, 'Abrindo um e-mail formal', [
      I(1, 1, { type: 'choice', prompt: 'Qual é o começo mais formal?', en: '___', pt: 'Escrevo para pedir informações sobre a vaga.', options: ['I am writing to enquire about the job.', 'Hey, just wanted to ask about the job.', 'Tell me about the job.'], answer: 'I am writing to enquire about the job.', why: '"I am writing to enquire about" é o começo formal clássico.', wrong: { 'Hey, just wanted to ask about the job.': 'Informal demais para uma empresa.', 'Tell me about the job.': 'Soa como uma ordem.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: "I'm writing ___ your email of 3 May.", pt: 'Escrevo a respeito do seu e-mail de 3 de maio.', options: ['regarding', 'about of', 'for'], answer: 'regarding', why: '"Regarding" = a respeito de (formal).', wrong: { 'about of': 'Não existe "about of".', for: 'Não tem esse sentido aqui.' } }),
      I(1, 3, { type: 'meaning', en: 'Please find the invoice attached.', options: ['Segue a nota fiscal em anexo.', 'Por favor, encontre a nota fiscal.', 'A nota fiscal sumiu.'], answer: 'Segue a nota fiscal em anexo.', why: '"Please find … attached" = segue em anexo.' }),
      I(1, 4, { type: 'build', pt: 'Escrevo para fazer uma reclamação.', answer: 'I am writing to make a complaint', extra: ['do', 'complain'], display: 'I am writing to make a complaint.', why: '"Make a complaint" = fazer uma reclamação.' }),
      I(1, 5, { type: 'listen', en: 'I am writing regarding my order.', options: ['Escrevo a respeito do meu pedido.', 'Quero cancelar tudo.', 'Recebi o pedido.'], answer: 'Escrevo a respeito do meu pedido.', why: '"Regarding" = a respeito de.' }),
      I(1, 6, { type: 'match', pairs: [['regarding', 'a respeito de'], ['enquire', 'pedir informação'], ['attached', 'em anexo'], ['request', 'pedido']], why: 'Palavras de e-mail formal.' }),
    ]),
    L(2, 'Pedidos educados', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'I would appreciate it ___ you could call me back.', pt: 'Eu agradeceria se você pudesse me retornar a ligação.', options: ['if', 'that', 'when'], answer: 'if', why: '"I would appreciate it if…" é a forma fixa.', wrong: { that: 'Não se usa "that" aqui.', when: 'Mudaria o sentido.' } }),
      I(2, 2, { type: 'choice', prompt: 'Qual pedido é mais educado?', en: '___', pt: 'Será que você poderia me ajudar?', options: ['Could you possibly help me?', 'Help me.', 'You help me?'], answer: 'Could you possibly help me?', why: '"Could you possibly" é bem educado.', wrong: { 'Help me.': 'Soa como ordem.', 'You help me?': 'Errado e informal.' } }),
      I(2, 3, { type: 'meaning', en: 'Would you mind sending it again?', options: ['Você se importaria de mandar de novo?', 'Você mandou duas vezes?', 'Não mande de novo.'], answer: 'Você se importaria de mandar de novo?', why: '"Would you mind + -ing" = você se importaria de.' }),
      I(2, 4, { type: 'build', pt: 'Eu agradeceria se você pudesse responder até sexta.', answer: 'I would appreciate it if you could reply by Friday', extra: ['until', 'can'], display: 'I would appreciate it if you could reply by Friday.', why: '"By Friday" = até sexta (prazo).' }),
      I(2, 5, { type: 'listen', en: 'Could you possibly assist me with this?', options: ['Será que você poderia me ajudar com isso?', 'Eu posso te ajudar com isso?', 'Não preciso de ajuda.'], answer: 'Será que você poderia me ajudar com isso?', why: '"Assist" = ajudar (formal).' }),
      I(2, 6, { type: 'speak', en: 'Would you mind closing the door?', pt: 'Você se importaria de fechar a porta?', why: 'Depois de "mind", sempre -ing.' }),
    ]),
    L(3, 'Formal e informal: os pares', [
      I(3, 1, { type: 'choice', prompt: 'Qual é a versão formal de "get"?', en: 'I ___ your letter yesterday.', pt: 'Recebi a sua carta ontem.', options: ['received', 'got', 'grabbed'], answer: 'received', why: 'Formal: receive. Informal: get.', wrong: { got: 'Correto, mas informal.', grabbed: '"Grab" = pegar rápido, muito informal.' } }),
      I(3, 2, { type: 'choice', prompt: 'Qual é a versão formal de "buy"?', en: 'You can ___ tickets online.', pt: 'Você pode adquirir os ingressos online.', options: ['purchase', 'get', 'grab'], answer: 'purchase', why: 'Formal: purchase. Informal: buy, get.', wrong: { get: 'Informal.', grab: 'Muito informal.' } }),
      I(3, 3, { type: 'meaning', en: 'Further information is available on request.', options: ['Mais informações estão disponíveis mediante solicitação.', 'Não temos mais informações.', 'Peça ajuda a um amigo.'], answer: 'Mais informações estão disponíveis mediante solicitação.', why: '"On request" = mediante pedido.' }),
      I(3, 4, { type: 'build', pt: 'Ficaremos felizes em ajudar.', answer: 'We will be happy to assist you', extra: ['assistance', 'helping'], display: 'We will be happy to assist you.', why: '"Assist" = ajudar (formal).' }),
      I(3, 5, { type: 'listen', en: 'Please let us know if you require anything else.', options: ['Por favor, nos avise se precisar de mais alguma coisa.', 'Não precisamos de nada.', 'Precisamos de mais tempo.'], answer: 'Por favor, nos avise se precisar de mais alguma coisa.', why: '"Require" = precisar (formal).' }),
      I(3, 6, { type: 'match', pairs: [['receive', 'get'], ['purchase', 'buy'], ['assist', 'help'], ['require', 'need']], why: 'Formal × informal.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', '(email from a client) Could you send me the price list?'], ['B', '___']], options: ['Of course. Please find the price list attached. Kind regards, Ana.', 'Sure thing! Here you go! Ana', 'Price list. Ana.'], answer: 'Of course. Please find the price list attached. Kind regards, Ana.', pt: 'Claro. Segue a lista de preços em anexo. Atenciosamente, Ana.', why: 'Com cliente, mantenha o tom formal.', wrong: { 'Sure thing! Here you go! Ana': 'Informal demais para um cliente.', 'Price list. Ana.': 'Seco demais.' } }),
    ]),
    L(4, 'Prática: fechando e-mails', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'I look forward to ___ from you.', pt: 'Aguardo o seu retorno.', options: ['hearing', 'hear', 'heard'], answer: 'hearing', why: '"Look forward to" + -ing.', wrong: { hear: 'Aqui o "to" é preposição: pede -ing.', heard: 'Precisa do -ing.' } }),
      I(4, 2, { type: 'choice', prompt: 'Qual fechamento combina com um amigo?', en: '___', pt: 'Beijos, falamos depois!', options: ['Talk soon!', 'Yours truly,', 'Kind regards,'], answer: 'Talk soon!', why: 'Com amigos: Talk soon, Cheers, Love.', wrong: { 'Yours truly,': 'Muito formal (carta para desconhecido).', 'Kind regards,': 'Formal, de trabalho.' } }),
      I(4, 3, { type: 'meaning', en: 'Do not hesitate to contact me.', options: ['Não hesite em entrar em contato.', 'Não entre em contato comigo.', 'Entrei em contato com você.'], answer: 'Não hesite em entrar em contato.', why: 'Fechamento formal muito comum.' }),
      I(4, 4, { type: 'build', pt: 'Aguardo ansiosamente conhecer você.', answer: 'I look forward to meeting you', extra: ['meet', 'see'], display: 'I look forward to meeting you.', why: '"Look forward to" + -ing.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', '(text from a friend) Pizza tonight?'], ['B', '___']], options: ["Yes! Can't wait. See you at 8?", 'Dear friend, I would appreciate it if we had pizza.', 'I am writing to accept your invitation.'], answer: "Yes! Can't wait. See you at 8?", pt: 'Sim! Mal posso esperar. Te vejo às 8?', why: 'Mensagem de amigo pede resposta informal.', wrong: { 'Dear friend, I would appreciate it if we had pizza.': 'Formal demais: soa estranho.', 'I am writing to accept your invitation.': 'Tom de carta oficial.' } }),
      I(4, 6, { type: 'listen', en: 'Thank you for your patience.', options: ['Obrigado pela sua paciência.', 'Você é muito impaciente.', 'Espere mais um pouco.'], answer: 'Obrigado pela sua paciência.', why: 'Frase formal de atendimento.' }),
      I(4, 7, { type: 'speak', en: 'I look forward to hearing from you.', pt: 'Aguardo o seu retorno.', why: 'O fechamento formal mais usado.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Escrevo a respeito do meu pedido.', answer: 'I am writing regarding my order.', accept: ["I'm writing regarding my order.", 'I am writing about my order.'], why: '"Regarding" = a respeito de.' }),
      I(5, 2, { type: 'type', pt: 'Segue o arquivo em anexo.', answer: 'Please find the file attached.', accept: ['Please find attached the file.', 'The file is attached.'], why: '"Please find … attached".' }),
      I(5, 3, { type: 'dictation', en: 'I would appreciate it if you could help.', why: 'Pedido formal: I would appreciate it if…' }),
      I(5, 4, { type: 'type', pt: 'Aguardo o seu retorno.', answer: 'I look forward to hearing from you.', accept: ['I look forward to your reply.'], why: '"Look forward to" + -ing.' }),
      I(5, 5, { type: 'dictation', en: 'Could you possibly send it today?', why: '"Could you possibly" = será que você poderia.' }),
      I(5, 6, { type: 'type', pt: 'Você se importaria de esperar?', answer: 'Would you mind waiting?', accept: ['Would you mind waiting a moment?'], why: '"Would you mind" + -ing.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'I am writing to request a refund.', options: ['Escrevo para solicitar um reembolso.', 'Quero comprar mais.', 'Recebi o reembolso.'], answer: 'Escrevo para solicitar um reembolso.', why: '"Request a refund" = pedir reembolso.' }),
      I(6, 2, { type: 'dictation', en: 'Please find the report attached.', why: '"Please find … attached".' }),
      I(6, 3, { type: 'listen', en: 'Would you mind if I opened the window?', options: ['Você se importa se eu abrir a janela?', 'Feche a janela, por favor.', 'A janela está aberta.'], answer: 'Você se importa se eu abrir a janela?', why: '"Would you mind if I…" = você se importa se eu…' }),
      I(6, 4, { type: 'dictation', en: 'Do not hesitate to contact us.', why: 'Fechamento formal.' }),
      I(6, 5, { type: 'listen', en: 'Hey, got your email. All good!', options: ['Oi, recebi o seu e-mail. Tudo certo!', 'Não recebi o seu e-mail.', 'Escrevo a respeito do seu e-mail.'], answer: 'Oi, recebi o seu e-mail. Tudo certo!', why: 'Informal: "got" no lugar de "received".' }),
      I(6, 6, { type: 'dictation', en: 'We look forward to working with you.', why: '"Look forward to" + -ing.' }),
      I(6, 7, { type: 'speak', en: 'Could you possibly help me?', pt: 'Será que você poderia me ajudar?', why: 'Pedido bem educado.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', '(phone) Good morning, Sunrise Hotel. How may I help you?'], ['B', '___']], options: ["Good morning. I'm calling regarding my booking for next week.", "Hi! Booking stuff, next week.", "Morning. Tell me my booking."], answer: "Good morning. I'm calling regarding my booking for next week.", pt: 'Bom dia. Estou ligando a respeito da minha reserva para a semana que vem.', why: 'Tom formal e claro.', wrong: { 'Hi! Booking stuff, next week.': 'Informal demais.', 'Morning. Tell me my booking.': 'Soa como ordem.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Of course. What can I do for you?'], ['B', '___']], options: ["Would it be possible to change the dates?", "Change the dates now.", "You change dates?"], answer: 'Would it be possible to change the dates?', pt: 'Seria possível mudar as datas?', why: '"Would it be possible to…" = pedido educado.', wrong: { 'Change the dates now.': 'Ordem.', 'You change dates?': 'Errado e seco.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Let me check… Yes, that is possible.'], ['B', '___']], options: ["That's great. I would appreciate it if you could send me a confirmation by email.", "Great. Send email.", "Great. I appreciate if you send."], answer: "That's great. I would appreciate it if you could send me a confirmation by email.", pt: 'Ótimo. Eu agradeceria se você pudesse me mandar uma confirmação por e-mail.', why: '"I would appreciate it if you could…".', wrong: { 'Great. Send email.': 'Seco demais.', 'Great. I appreciate if you send.': 'Falta "it" e "could".' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Certainly. Is there anything else I can assist you with?'], ['B', '___']], options: ["No, that's all. Thank you very much for your help.", "No. Bye.", "Nothing, finish."], answer: "No, that's all. Thank you very much for your help.", pt: 'Não, é só isso. Muito obrigado pela ajuda.', why: 'Feche com educação.', wrong: { 'No. Bye.': 'Seco demais.', 'Nothing, finish.': 'Errado.' } }),
      I(7, 5, { type: 'speak', en: 'Would it be possible to change it?', pt: 'Seria possível mudar?', why: 'Pedido educado para qualquer situação.' }),
      I(7, 6, { type: 'speak', en: 'Thank you very much for your help.', pt: 'Muito obrigado pela ajuda.', why: 'Agradecimento formal.' }),
    ]),
    L(8, 'Lendo: dois e-mails, o mesmo assunto', [
      I(8, 1, { type: 'story', why: 'O Pedro escreve dois e-mails sobre a mesma festa: um para o chefe e um para o melhor amigo. Repare na diferença de tom. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que o Pedro pede ao chefe?', options: ['Um dia de folga', 'Um aumento', 'Uma reunião'], answer: 'Um dia de folga', why: '"I would like to request a day off."' }),
      I(8, 3, { type: 'quiz', q: 'Como ele fecha o e-mail para o chefe?', options: ['Kind regards', 'Cheers', 'Love'], answer: 'Kind regards', why: 'Fechamento formal.' }),
      I(8, 4, { type: 'quiz', q: 'Como é o e-mail para o amigo?', options: ['Curto e informal', 'Longo e formal', 'Igual ao do chefe'], answer: 'Curto e informal', why: '"Hey mate! … Cheers!"' }),
    ], {
      title: 'Dois e-mails, o mesmo assunto',
      lines: [
        { who: 'Pedro', en: 'Dear Mr Brown, I am writing to request a day off on Friday, 12 June.', pt: 'Prezado Sr. Brown, escrevo para solicitar um dia de folga na sexta, 12 de junho.' },
        { who: 'Pedro', en: 'I would appreciate it if you could let me know by Wednesday. Kind regards, Pedro.', pt: 'Eu agradeceria se o senhor pudesse me avisar até quarta. Atenciosamente, Pedro.' },
        { ask: 'Para quando ele pede a resposta?', options: ['Até quarta', 'Até sexta', 'Até segunda'], answer: 'Até quarta', why: '"By Wednesday."' },
        { who: 'Pedro', en: "Hey mate! Asked the boss for Friday ___. Fingers crossed!", pt: 'E aí, cara! Pedi a sexta de folga para o chefe. Torce aí!', gap: { answer: 'off', options: ['off', 'out', 'up'] } },
        { who: 'Pedro', en: "If he says yes, we can leave on Thursday night. Can't wait!", pt: 'Se ele disser sim, a gente pode sair quinta à noite. Mal posso esperar!' },
        { who: 'Pedro', en: 'Cheers, Pedro.', pt: 'Valeu, Pedro.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Qual é o tom certo para um cliente?', en: '___', pt: 'Obrigado pelo seu e-mail.', options: ['Thank you for your email.', 'Thanks for the mail!', 'Got it.'], answer: 'Thank you for your email.', why: 'Com clientes, sempre formal.', wrong: { 'Thanks for the mail!': 'Informal demais para um cliente.', 'Got it.': 'Seco demais.' } }),
      I(9, 2, { type: 'type', pt: 'Eu agradeceria se você pudesse me ligar.', answer: 'I would appreciate it if you could call me.', accept: ["I'd appreciate it if you could call me.", 'I would appreciate it if you could phone me.'], why: '"I would appreciate it if you could…".' }),
      I(9, 3, { type: 'meaning', en: 'I am writing to enquire about prices.', options: ['Escrevo para pedir informações sobre preços.', 'Os preços subiram.', 'Quero baixar os preços.'], answer: 'Escrevo para pedir informações sobre preços.', why: '"Enquire" = pedir informação.' }),
      I(9, 4, { type: 'dictation', en: 'Kind regards, Maria.', why: 'Fechamento formal de e-mail.' }),
      I(9, 5, { type: 'listen', en: 'Would you mind waiting a moment?', options: ['Você se importaria de esperar um momento?', 'Não espere.', 'Esperei muito.'], answer: 'Você se importaria de esperar um momento?', why: '"Would you mind" + -ing.' }),
      I(9, 6, { type: 'build', pt: 'Seria possível mudar o horário?', answer: 'Would it be possible to change the time', extra: ['changing', 'possibly'], display: 'Would it be possible to change the time?', why: '"Would it be possible to" + verbo.' }),
    ]),
    L(10, 'História: o e-mail errado', [
      I(10, 1, { type: 'story', why: 'A Renata manda, sem querer, uma mensagem informal para o diretor da empresa. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Para quem a Renata queria mandar a mensagem?', options: ['Para a amiga', 'Para o diretor', 'Para a mãe'], answer: 'Para a amiga', why: '"It was for my friend Bea!"' }),
      I(10, 3, { type: 'quiz', q: 'O que dizia a mensagem?', options: ['Que a reunião era chata', 'Que ela ia pedir demissão', 'Que estava doente'], answer: 'Que a reunião era chata', why: '"This meeting is sooo boring."' }),
      I(10, 4, { type: 'quiz', q: 'Como o diretor reagiu?', options: ['Com bom humor', 'Ficou furioso', 'Demitiu a Renata'], answer: 'Com bom humor', why: '"He replied: I agree. Let\'s make the next one shorter."' }),
    ], {
      title: 'O e-mail errado',
      lines: [
        { who: 'Renata', en: 'I have to tell you something terrible. I sent a message to the wrong person.', pt: 'Preciso te contar uma coisa terrível. Mandei uma mensagem para a pessoa errada.' },
        { who: 'Bea', en: 'Oh no. Who did you send it to?', pt: 'Ah, não. Para quem você mandou?' },
        { who: 'Renata', en: 'The director! It was for you. It said: "This meeting is so boring!"', pt: 'Para o diretor! Era para você. Dizia: "Esta reunião está muito chata!".' },
        { ask: 'Para quem a mensagem foi?', options: ['Para o diretor', 'Para a Bea', 'Para o cliente'], answer: 'Para o diretor', why: '"The director!"' },
        { who: 'Bea', en: "No way! Did you write a formal apology? Something like \"I am writing ___ apologise\"?", pt: 'Não acredito! Você escreveu um pedido de desculpas formal? Algo como "Escrevo para pedir desculpas"?', gap: { answer: 'to', options: ['to', 'for', 'at'] } },
        { who: 'Renata', en: 'I did. But he replied first: "I agree. Let\'s make the next one shorter."', pt: 'Escrevi. Mas ele respondeu antes: "Concordo. Vamos fazer a próxima mais curta".' },
        { who: 'Bea', en: 'Ha! The best director ever.', pt: 'Rá! O melhor diretor de todos.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-c1u8', level: 'C1', unlock: 'c1-u8', title: 'O tom certo',
  intro: 'A Ana e o Tom explicam por que o mesmo pedido pode soar educado ou grosseiro.',
  lines: [
    { who: 'tom', en: 'Ana, I once got an email from a Brazilian client that just said: "Send me the file."', pt: 'Ana, uma vez recebi um e-mail de um cliente brasileiro que dizia só: "Me manda o arquivo".' },
    { who: 'ana', en: 'In Portuguese, that is totally normal. But in English it sounds like an order.', pt: 'Em português, isso ("me manda") é totalmente normal. Mas em inglês soa como uma ordem.' },
    { who: 'tom', en: 'Exactly. A small change makes a big difference: "Could you possibly send me the file?"', pt: 'Exatamente. Uma mudança pequena faz uma grande diferença: "Será que você poderia me mandar o arquivo?"' },
    { who: 'ana', en: 'And in formal emails, we use different words. Receive instead of get, assist instead of help.', pt: 'E nos e-mails formais usamos outras palavras. Receive em vez de get, assist em vez de help.' },
    { who: 'tom', en: 'But careful: with friends, too formal sounds cold. Nobody says "I look forward to our pizza".', pt: 'Mas cuidado: com amigos, formal demais soa frio. Ninguém diz "aguardo ansiosamente a nossa pizza".' },
    { who: 'ana', en: 'Ha! Exactly. The secret is to think about who will read it.', pt: 'Rá! Exatamente. O segredo é pensar em quem vai ler.' },
    { who: 'tom', en: 'We look forward to hearing from you next week.', pt: 'Aguardamos vocês na semana que vem.' },
    { who: 'ana', en: 'Kind regards, Ana and Tom!', pt: 'Atenciosamente, Ana e Tom!' },
  ],
  questions: [
    { q: 'Por que "Send me the file" soa mal em inglês?', options: ['Soa como uma ordem', 'Está errado gramaticalmente', 'É formal demais'], answer: 'Soa como uma ordem', why: '"In English it sounds like an order."' },
    { q: 'Qual é a versão formal de "help"?', options: ['Assist', 'Grab', 'Get'], answer: 'Assist', why: '"Assist instead of help."' },
    { q: 'Qual é o segredo, segundo a Ana?', options: ['Pensar em quem vai ler', 'Escrever sempre formal', 'Escrever sempre curto'], answer: 'Pensar em quem vai ler', why: '"Think about who will read it."' },
  ],
}, 'pod-c1u7');
addScene('c1-u8', 'standing-11', 'phone');
