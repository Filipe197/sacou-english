// Etapa 2 do B1 completo: unidade nova 10 — Você sabe onde…? (perguntas indiretas e pedidos formais).
// Gera src/content/b1/unit-10.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u10.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u10-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u10l${n}-${k}`, ...o });

writeUnit('b1/unit-10.json', {
  id: 'b1-u10', level: 'B1', order: 10,
  title: 'Você sabe onde…?',
  subtitle: 'Perguntas indiretas: pedir informação com educação.',
  can_do: {
    text: 'Consigo pedir informações de forma educada a desconhecidos, em lojas, estações e repartições.',
    source: 'CEFR (Conselho da Europa) — Interação oral: obter informações e serviços, nível B1',
  },
  core_inventory: ['Grammar: indirect questions (Do you know where...? / Could you tell me if...?)', 'Grammar: if / whether', 'Functions: polite requests in services', 'Vocabulary: stations, offices and shops'],
  words: [
    ['Do you know where…?', 'Você sabe onde…?'],
    ['Could you tell me…?', 'Você poderia me dizer…?'],
    ['whether', 'se (se sim ou não)'],
    ['wonder', 'me perguntar, gostaria de saber'],
    ['platform', 'plataforma (de trem)'],
    ['opening hours', 'horário de funcionamento'],
    ['counter', 'balcão, guichê'],
    ['exchange', 'trocar, troca'],
    ['refund', 'reembolso'],
    ['official', 'oficial, funcionário'],
    ['formal', 'formal'],
    ['excuse me', 'com licença'],
    ['lost property', 'achados e perdidos'],
  ],
  guide: {
    title: 'Perguntas indiretas: o jeito educado de perguntar',
    intro: 'Com desconhecidos, em vez de "Where is the station?", o inglês prefere começar com "Do you know...?" ou "Could you tell me...?". O truque: depois disso, a frase volta para a ordem normal (sujeito + verbo), sem do/does/did.',
    points: [
      { en: 'Where is the station? → Do you know where the station is?', pt: 'Onde fica a estação? → Você sabe onde fica a estação?', note: 'Na pergunta indireta, "is" vai para o fim: where the station IS.' },
      { en: 'What time does the bank open? → Could you tell me what time the bank opens?', pt: 'A que horas o banco abre? → Você poderia me dizer a que horas o banco abre?', note: 'Some o "does" e o verbo ganha -s: the bank opens.' },
      { en: 'Is this the right platform? → Do you know if this is the right platform?', pt: 'Esta é a plataforma certa? → Você sabe se esta é a plataforma certa?', note: 'Pergunta de sim ou não vira "if" ou "whether".' },
      { en: 'I wonder whether they have a refund policy.', pt: 'Será que eles devolvem o dinheiro?', note: '"I wonder if/whether..." = será que...? (pergunta educada, quase pensando alto).' },
      { en: "I'd like to know when the train leaves.", pt: 'Eu gostaria de saber quando o trem sai.', note: 'Mais uma abertura formal: I\'d like to know...' },
      { en: 'Excuse me, could you help me?', pt: 'Com licença, você poderia me ajudar?', note: 'Comece com "Excuse me" para chamar a atenção de alguém.' },
    ],
    tips: ['Erro comum: "Do you know where is the bank?". O certo é "where the bank is".', '"If" e "whether" funcionam igual aqui; "whether" é um pouco mais formal.'],
  },
  extra_vocab: [
    { word: 'madam', reason: 'fórmula fixa de e-mail formal ("Dear Sir or Madam")' },
    { word: 'faithfully', reason: 'fórmula fixa de e-mail formal ("Yours faithfully")' },
    { word: 'costa', reason: 'sobrenome de pessoa na leitura' },
  ],
  lessons: [
    L(1, 'Você sabe onde…?', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'Do you know where the station ___?', pt: 'Você sabe onde fica a estação?', options: ['is', 'is it', 'does'], answer: 'is', why: 'Na pergunta indireta, o verbo vem no fim: where the station is.', wrong: { 'is it': 'Sobra o "it".', does: '"Does" não entra aqui.' } }),
      I(1, 2, { type: 'choice', prompt: 'Qual frase está certa?', en: 'Excuse me, ___?', pt: 'Com licença, você sabe onde fica o banheiro?', options: ['do you know where the toilet is', 'do you know where is the toilet', 'you know where is toilet'], answer: 'do you know where the toilet is', why: 'Depois de "Do you know", a ordem é normal: the toilet is.', wrong: { 'do you know where is the toilet': 'Erro clássico: o "is" vai para o fim.', 'you know where is toilet': 'Falta o "do" e a ordem certa.' } }),
      I(1, 3, { type: 'meaning', en: 'Do you know where I can buy a ticket?', options: ['Você sabe onde eu posso comprar uma passagem?', 'Onde você comprou a passagem?', 'Você pode me comprar uma passagem?'], answer: 'Você sabe onde eu posso comprar uma passagem?', why: '"Where I can buy" (e não "where can I buy") depois de "Do you know".' }),
      I(1, 4, { type: 'build', pt: 'Você sabe onde fica a plataforma 3?', answer: 'Do you know where platform 3 is', extra: ['does', 'it'], display: 'Do you know where platform 3 is?', why: 'Do you know + where + coisa + is.' }),
      I(1, 5, { type: 'listen', en: 'Do you know where the nearest bank is?', options: ['Você sabe onde fica o banco mais perto?', 'Onde fica o banco?', 'Você trabalha no banco?'], answer: 'Você sabe onde fica o banco mais perto?', why: '"The nearest" = o mais perto.' }),
      I(1, 6, { type: 'match', pairs: [['platform', 'plataforma'], ['counter', 'guichê'], ['refund', 'reembolso'], ['exchange', 'trocar']], why: '"Ticket counter" = guichê de passagens.' }),
    ]),
    L(2, 'Poderia me dizer…?', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'Could you tell me what time the museum ___?', pt: 'Você poderia me dizer a que horas o museu abre?', options: ['opens', 'does open', 'open'], answer: 'opens', why: 'Sem "does": o verbo volta a ter -s (the museum opens).', wrong: { 'does open': 'O "does" some na pergunta indireta.', open: 'Com "the museum" (it), o verbo leva -s.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Could you tell me how much this ___?', pt: 'Você poderia me dizer quanto custa isto?', options: ['costs', 'does cost', 'cost'], answer: 'costs', why: 'How much this costs (ordem normal, com -s).', wrong: { 'does cost': 'Sem "does".', cost: 'Com "this", o verbo leva -s.' } }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: 'Could you tell me when the train ___?', pt: 'Você poderia me dizer quando o trem saiu?', options: ['left', 'did leave', 'leaves did'], answer: 'left', why: 'Sem "did": o verbo vai para o passado (left).', wrong: { 'did leave': 'O "did" some na pergunta indireta.', 'leaves did': 'Não existe.' } }),
      I(2, 4, { type: 'meaning', en: 'Could you tell me what the opening hours are?', options: ['Você poderia me dizer qual é o horário de funcionamento?', 'Que horas são?', 'A loja está aberta agora?'], answer: 'Você poderia me dizer qual é o horário de funcionamento?', why: '"Opening hours" = horário de funcionamento.' }),
      I(2, 5, { type: 'build', pt: 'Você poderia me dizer quanto custa a passagem?', answer: 'Could you tell me how much the ticket costs', extra: ['does', 'cost'], display: 'Could you tell me how much the ticket costs?', why: 'Ordem normal: the ticket costs.' }),
      I(2, 6, { type: 'speak', en: 'Could you tell me where the toilet is?', pt: 'Você poderia me dizer onde fica o banheiro?', why: 'Frase educada para qualquer lugar.' }),
    ]),
    L(3, 'Se… (if / whether)', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'Do you know ___ the bank is open today?', pt: 'Você sabe se o banco está aberto hoje?', options: ['if', 'that', 'what'], answer: 'if', why: 'Pergunta de sim ou não vira "if" (se).', wrong: { that: '"That" não faz pergunta.', what: '"What" pede outra informação (o quê).' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'I wonder ___ they will come.', pt: 'Será que eles vão vir?', options: ['whether', 'what', 'where'], answer: 'whether', why: '"I wonder whether/if" = será que.', wrong: { what: 'Pediria "o que".', where: 'Pediria "onde".' } }),
      I(3, 3, { type: 'meaning', en: 'Could you tell me whether this train stops in Rio?', options: ['Você poderia me dizer se este trem para no Rio?', 'Você poderia me dizer onde para o trem?', 'Este trem vai para o Rio?'], answer: 'Você poderia me dizer se este trem para no Rio?', why: '"Whether" = se. Ordem normal: this train stops.' }),
      I(3, 4, { type: 'build', pt: 'Você sabe se eles aceitam cartão?', answer: 'Do you know if they accept cards', extra: ['do', 'accepts'], display: 'Do you know if they accept cards?', why: '"If" + ordem normal: they accept.' }),
      I(3, 5, { type: 'listen', en: 'I wonder if it will rain tomorrow.', options: ['Será que vai chover amanhã?', 'Vai chover amanhã.', 'Choveu ontem?'], answer: 'Será que vai chover amanhã?', why: '"I wonder if" = será que.' }),
      I(3, 6, { type: 'choice', prompt: 'Qual frase está certa?', en: 'Could you tell me ___?', pt: 'Você poderia me dizer se o voo está atrasado?', options: ['if the flight is delayed', 'is the flight delayed', 'if is the flight delayed'], answer: 'if the flight is delayed', why: 'If + sujeito + verbo.', wrong: { 'is the flight delayed': 'Falta o "if" e a ordem é de pergunta direta.', 'if is the flight delayed': 'Depois de "if", sujeito antes do verbo.' } }),
      I(3, 7, { type: 'match', pairs: [['whether', 'se'], ['wonder', 'me perguntar'], ['official', 'oficial'], ['formal', 'formal']], why: '"Whether" soa igual a "weather" (tempo): "UÉ-der".' }),
    ]),
    L(4, 'Prática: no guichê', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: "I'd like to know why my bag ___ arrived.", pt: 'Eu gostaria de saber por que minha mala não chegou.', options: ["hasn't", "hasn't it", "didn't it"], answer: "hasn't", why: 'Ordem normal: my bag hasn\'t arrived.', wrong: { "hasn't it": 'Sobra o "it".', "didn't it": 'Sobra o "it" e o tempo não combina.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'Excuse me, where is the lost property ___?', pt: 'Com licença, onde fica o guichê de achados e perdidos?', options: ['office', 'counter', 'platform'], answer: 'office', why: '"Lost property office" = setor de achados e perdidos.', wrong: { counter: '"Counter" é o balcão; o nome do setor é "office".', platform: '"Platform" é a plataforma do trem.' } }),
      I(4, 3, { type: 'meaning', en: 'Can I exchange this shirt for a bigger size?', options: ['Posso trocar esta camisa por um tamanho maior?', 'Posso devolver esta camisa?', 'Você tem esta camisa em outra cor?'], answer: 'Posso trocar esta camisa por um tamanho maior?', why: '"Exchange ... for" = trocar ... por.' }),
      I(4, 4, { type: 'dialogue', lines: [['A', 'How can I help you?'], ['B', '___']], options: ["I'd like to know if I can get a refund.", 'I want know if can I get a refund.', "I'd like knowing can I get refund."], answer: "I'd like to know if I can get a refund.", pt: 'Eu gostaria de saber se posso receber um reembolso.', why: '"I\'d like to know if" + ordem normal: I can get.', wrong: { 'I want know if can I get a refund.': 'Faltou "to" e a ordem: if I can.', "I'd like knowing can I get refund.": 'É "I\'d like to know if I can".' } }),
      I(4, 5, { type: 'build', pt: 'Você poderia me dizer onde fica o guichê de passagens?', answer: 'Could you tell me where the ticket counter is', extra: ['is the', 'does'], display: 'Could you tell me where the ticket counter is?', why: 'O "is" vai para o fim.' }),
      I(4, 6, { type: 'listen', en: 'I wonder whether this is the right platform.', options: ['Será que esta é a plataforma certa?', 'Esta é a plataforma certa.', 'Onde fica a plataforma?'], answer: 'Será que esta é a plataforma certa?', why: '"I wonder whether" = será que.' }),
      I(4, 7, { type: 'choice', prompt: 'Qual é a mais formal?', en: '___ the manager is in today?', pt: 'Você poderia me dizer se o gerente está hoje?', options: ['Could you tell me whether', 'Is', 'You know if'], answer: 'Could you tell me whether', why: '"Could you tell me whether..." é bem formal e educado.', wrong: { Is: '"Is the manager in today?" é direto, menos formal.', 'You know if': 'Informal e sem o "do".' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Você sabe onde fica a estação?', answer: 'Do you know where the station is?', why: 'O "is" vai para o fim.' }),
      I(5, 2, { type: 'type', pt: 'Você poderia me dizer que horas são?', answer: 'Could you tell me what time it is?', why: 'What time it is (e não "what time is it").' }),
      I(5, 3, { type: 'dictation', en: 'Do you know if the shop is open?', why: '"If" = se. Depois dele, ordem normal: the shop is.' }),
      I(5, 4, { type: 'type', pt: 'Será que ele vem?', answer: 'I wonder if he will come.', accept: ['I wonder whether he will come.', "I wonder if he'll come.", "I wonder whether he'll come."], why: '"I wonder if/whether" = será que.' }),
      I(5, 5, { type: 'dictation', en: 'Could you tell me where the platform is?', why: '"Platform" = plataforma.' }),
      I(5, 6, { type: 'type', pt: 'Eu gostaria de saber quanto custa.', answer: "I'd like to know how much it costs.", accept: ['I would like to know how much it costs.'], why: 'How much it costs (ordem normal).' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Could you tell me what time the last train leaves?', options: ['Você poderia me dizer a que horas sai o último trem?', 'O último trem já saiu?', 'Que horas são agora?'], answer: 'Você poderia me dizer a que horas sai o último trem?', why: '"The last train" = o último trem.' }),
      I(6, 2, { type: 'dictation', en: 'I would like to exchange this.', why: '"Exchange" = trocar.' }),
      I(6, 3, { type: 'listen', en: "Do you know whether they've found my bag?", options: ['Você sabe se acharam minha mala?', 'Onde está minha mala?', 'Eu achei uma mala.'], answer: 'Você sabe se acharam minha mala?', why: '"Whether they\'ve found" = se eles acharam.' }),
      I(6, 4, { type: 'dictation', en: 'What are the opening hours?', why: '"Opening hours" = horário de funcionamento.' }),
      I(6, 5, { type: 'listen', en: 'Please go to counter number four.', options: ['Por favor, vá ao guichê número quatro.', 'Por favor, espere quatro minutos.', 'O guichê quatro está fechado.'], answer: 'Por favor, vá ao guichê número quatro.', why: '"Counter" = guichê, balcão.' }),
      I(6, 6, { type: 'dictation', en: 'Excuse me, could you help me?', why: '"Excuse me" = com licença.' }),
      I(6, 7, { type: 'speak', en: 'Do you know where I can find a taxi?', pt: 'Você sabe onde eu posso encontrar um táxi?', why: '"Where I can find" (ordem normal).' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'Excuse me. Do you know where the post office is?'], ['B', '___']], options: ["Sorry, I'm not from here. Maybe that man knows.", "Sorry, I don't know where is it.", 'Sorry, is where the post office?'], answer: "Sorry, I'm not from here. Maybe that man knows.", pt: 'Desculpe, não sou daqui. Talvez aquele homem saiba.', why: 'Resposta natural quando você não sabe.', wrong: { "Sorry, I don't know where is it.": 'O certo é "where it is".', 'Sorry, is where the post office?': 'Ordem confusa.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Could you tell me if this bus goes to the airport?'], ['B', '___']], options: ['Yes, it does. It leaves every twenty minutes.', 'Yes, it goes airport.', 'Yes, does it.'], answer: 'Yes, it does. It leaves every twenty minutes.', pt: 'Vai, sim. Ele sai a cada vinte minutos.', why: 'A resposta curta é para a pergunta escondida: Does this bus go...? Yes, it does.', wrong: { 'Yes, it goes airport.': 'Faltou "to the".', 'Yes, does it.': 'Ordem invertida.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', "I'm sorry, we don't do refunds."], ['B', '___']], options: ['Could I exchange it for something else, then?', 'Could I exchanging it, then?', 'I exchange it something.'], answer: 'Could I exchange it for something else, then?', pt: 'Então eu poderia trocar por outra coisa?', why: '"Exchange it for" = trocar por.', wrong: { 'Could I exchanging it, then?': 'Depois de "could", verbo normal.', 'I exchange it something.': 'Faltam "for" e um pedido educado.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'The office closes at five.'], ['B', '___']], options: ['Thank you. Do you know if it opens on Saturdays?', 'Thank you. Do you know if does it open on Saturdays?', 'Thank you. It opens Saturdays?'], answer: 'Thank you. Do you know if it opens on Saturdays?', pt: 'Obrigado. Você sabe se abre aos sábados?', why: '"If it opens" (sem does).', wrong: { 'Thank you. Do you know if does it open on Saturdays?': 'Sem "does" depois de "if".', 'Thank you. It opens Saturdays?': 'Pergunta direta e falta "on".' } }),
      I(7, 5, { type: 'speak', en: "I'd like to know about refunds.", pt: 'Eu gostaria de saber sobre reembolsos.', why: '"Refund" soa como "RÍI-fand".' }),
      I(7, 6, { type: 'speak', en: 'Could you tell me what time it is?', pt: 'Você poderia me dizer que horas são?', why: 'Repare: "what time it is", com o "is" no fim.' }),
    ]),
    L(8, 'Lendo: o e-mail para a escola de idiomas', [
      I(8, 1, { type: 'story', why: 'O Pedro escreve um e-mail formal para uma escola de inglês em Londres. Repare nas perguntas indiretas.' }),
      I(8, 2, { type: 'quiz', q: 'O que o Pedro quer saber primeiro?', options: ['Se tem vagas em julho', 'Onde fica a escola', 'Quanto custa o almoço'], answer: 'Se tem vagas em julho', why: '"I would like to know whether there are places in July."' }),
      I(8, 3, { type: 'quiz', q: 'O que mais ele pergunta?', options: ['Quanto custa o curso e se tem casa de família', 'Se pode levar o cachorro', 'Quando o curso termina'], answer: 'Quanto custa o curso e se tem casa de família', why: '"How much the course costs" e "if you can help me find a family".' }),
      I(8, 4, { type: 'quiz', q: 'Por que ele escreve "how much the course costs" e não "how much does the course cost"?', options: ['Porque é uma pergunta indireta', 'Porque é passado', 'Porque é um erro'], answer: 'Porque é uma pergunta indireta', why: 'Dentro de "Could you tell me...", a ordem é normal e o "does" some.' }),
    ], {
      title: 'E-mail para a escola de idiomas',
      lines: [
        { who: 'Pedro', en: "Dear Sir or Madam, I'm interested in your English course for adults.", pt: 'Prezados, tenho interesse no curso de inglês para adultos.' },
        { who: 'Pedro', en: 'I would like to know whether there are places in July.', pt: 'Eu gostaria de saber se há vagas em julho.' },
        { ask: 'Em que mês o Pedro quer estudar?', options: ['Julho', 'Junho', 'Janeiro'], answer: 'Julho', why: '"Places in July" = vagas em julho.' },
        { who: 'Pedro', en: 'Could you also tell me how much the course ___?', pt: 'Vocês poderiam também me dizer quanto custa o curso?', gap: { answer: 'costs', options: ['costs', 'does cost', 'cost'] } },
        { who: 'Pedro', en: 'Finally, I wonder if you can help me find a family to stay with.', pt: 'Por fim, gostaria de saber se vocês podem me ajudar a achar uma família para ficar.' },
        { who: 'Pedro', en: 'I look forward to hearing from you. Yours faithfully, Pedro Costa.', pt: 'Aguardo o retorno de vocês. Atenciosamente, Pedro Costa.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'Do you know what this word ___?', pt: 'Você sabe o que esta palavra significa?', options: ['means', 'does mean', 'mean'], answer: 'means', why: 'Ordem normal com -s: this word means.', wrong: { 'does mean': 'Sem "does".', mean: 'Com "this word" (it), leva -s.' } }),
      I(9, 2, { type: 'type', pt: 'Você sabe se ela está em casa?', answer: 'Do you know if she is at home?', accept: ["Do you know if she's at home?", 'Do you know whether she is at home?', "Do you know whether she's at home?"], why: '"If/whether" + ordem normal.' }),
      I(9, 3, { type: 'meaning', en: "I wonder why he didn't call me.", options: ['Fico me perguntando por que ele não me ligou.', 'Por que você não me ligou?', 'Ele me ligou para perguntar.'], answer: 'Fico me perguntando por que ele não me ligou.', why: '"I wonder why" = fico me perguntando por quê.' }),
      I(9, 4, { type: 'dictation', en: 'Could you tell me where the bank is?', why: 'O "is" fica no fim.' }),
      I(9, 5, { type: 'listen', en: "I'd like to know when the office opens.", options: ['Eu gostaria de saber quando o escritório abre.', 'O escritório abre agora.', 'Quando você chega no escritório?'], answer: 'Eu gostaria de saber quando o escritório abre.', why: '"When the office opens" (ordem normal).' }),
      I(9, 6, { type: 'build', pt: 'Você poderia me dizer onde eu posso trocar dinheiro?', answer: 'Could you tell me where I can exchange money', extra: ['can I', 'does'], display: 'Could you tell me where I can exchange money?', why: '"Where I can" (e não "where can I").' }),
    ]),
    L(10, 'História: a mala perdida', [
      I(10, 1, { type: 'story', why: 'A Emma chega ao aeroporto e a mala dela não aparece. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Onde a Emma vai reclamar da mala?', options: ['No setor de achados e perdidos', 'Na polícia', 'No hotel'], answer: 'No setor de achados e perdidos', why: '"The lost property office".' }),
      I(10, 3, { type: 'quiz', q: 'Quando a mala deve chegar?', options: ['No próximo voo, à noite', 'Amanhã de manhã', 'Daqui a uma semana'], answer: 'No próximo voo, à noite', why: '"It will arrive on the next flight, tonight."' }),
      I(10, 4, { type: 'quiz', q: 'O que a funcionária vai fazer?', options: ['Mandar a mala para o hotel', 'Devolver o dinheiro', 'Dar uma mala nova'], answer: 'Mandar a mala para o hotel', why: '"We\'ll send it to your hotel."' }),
    ], {
      title: 'A mala perdida',
      lines: [
        { who: 'Emma', en: "Excuse me. My suitcase hasn't arrived. Do you know where I should go?", pt: 'Com licença. Minha mala não chegou. Você sabe aonde eu devo ir?' },
        { who: 'Ben', en: 'You need the lost property office. It is next to counter six.', pt: 'Você precisa do setor de achados e perdidos. Fica ao lado do guichê seis.' },
        { who: 'Emma', en: "Hello. Could you tell me ___ my suitcase is? I came from Lisbon.", pt: 'Olá. Você poderia me dizer onde está minha mala? Vim de Lisboa.', gap: { answer: 'where', options: ['where', 'whether', 'when'] } },
        { who: 'Sarah', en: 'Let me check. It is still in Lisbon. It will arrive on the next flight, tonight.', pt: 'Deixa eu ver. Ainda está em Lisboa. Vai chegar no próximo voo, hoje à noite.' },
        { ask: 'Onde está a mala?', options: ['Ainda em Lisboa', 'No hotel', 'No guichê seis'], answer: 'Ainda em Lisboa', why: '"It is still in Lisbon."' },
        { who: 'Emma', en: "I wonder if you could send it to my hotel. I don't have a car.", pt: 'Será que vocês poderiam mandar para o meu hotel? Não tenho carro.' },
        { who: 'Sarah', en: "Of course. We'll send it to your hotel tomorrow morning.", pt: 'Claro. Vamos mandar para o seu hotel amanhã de manhã.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u10', level: 'B1', unlock: 'b1-u10', title: 'Como perguntar sem parecer grosso',
  intro: 'A Ana e o Tom mostram o jeito educado de pedir informação na rua.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: how to ask questions politely.", pt: 'E eu sou o Tom. Hoje: como fazer perguntas com educação.' },
    { who: 'ana', en: "Tom, imagine you're in London. You need the station. What do you say?", pt: 'Tom, imagina que você está em Londres. Precisa da estação. O que você diz?' },
    { who: 'tom', en: 'I say: "Excuse me, do you know where the station is?"', pt: 'Eu digo: "Com licença, você sabe onde fica a estação?"' },
    { who: 'ana', en: 'Perfect! Not "where is the station". The verb goes to the end.', pt: 'Perfeito! Não "where is the station". O verbo vai para o fim.' },
    { who: 'tom', en: 'And in a shop: "Could you tell me how much this costs?"', pt: 'E numa loja: "Você poderia me dizer quanto custa isto?"' },
    { who: 'ana', en: 'Great. No "does" in the middle!', pt: 'Ótimo. Nada de "does" no meio!' },
    { who: 'tom', en: "I wonder if you are practising now. That's all for today!", pt: 'Será que vocês estão praticando agora? Por hoje é só!' },
    { who: 'ana', en: 'Bye! Thank you for listening!', pt: 'Tchau! Obrigada por ouvir!' },
  ],
  questions: [
    { q: 'Como o Tom pergunta pela estação?', options: ['Do you know where the station is?', 'Where is station?', 'Station where?'], answer: 'Do you know where the station is?', why: 'É a pergunta indireta, educada.' },
    { q: 'O que a Ana diz sobre o verbo?', options: ['Vai para o fim', 'Vai para o começo', 'Não muda'], answer: 'Vai para o fim', why: '"The verb goes to the end."' },
    { q: 'O que não deve aparecer no meio da pergunta indireta?', options: ['"Does"', '"Where"', '"Excuse me"'], answer: '"Does"', why: '"No \'does\' in the middle!"' },
  ],
}, 'pod-b1u9');
addScene('b1-u10', 'standing-22', 'city');
