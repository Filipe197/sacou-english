// Etapa 3 do B1 completo: unidade nova 13 — Apesar de… (despite, although, even though, however).
// Gera src/content/b1/unit-13.json. Todas as lições levam "added".
// Uso: node scripts/content-add/b1-u13.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `b1-u13-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `b1u13l${n}-${k}`, ...o });

writeUnit('b1/unit-13.json', {
  id: 'b1-u13', level: 'B1', order: 13,
  title: 'Apesar de…',
  subtitle: 'Contrastar ideias: despite, although, even though, however.',
  can_do: {
    text: 'Consigo ligar ideias que se contradizem e falar dos prós e contras de uma decisão.',
    source: 'CEFR (Conselho da Europa) — Produção oral e escrita: ligar ideias com conectores de contraste, nível B1',
  },
  core_inventory: ['Grammar: despite + noun / -ing', 'Grammar: although / even though + clause', 'Grammar: however / nevertheless (new sentence)', 'Functions: talking about pros and cons'],
  words: [
    ['despite', 'apesar de'],
    ['even though', 'mesmo que, embora'],
    ['nevertheless', 'mesmo assim, no entanto'],
    ['stressful', 'estressante'],
    ['career', 'carreira'],
    ['quit', 'largar, pedir demissão'],
    ['freedom', 'liberdade'],
    ['security', 'segurança, estabilidade'],
    ['manage', 'conseguir (fazer), administrar'],
    ['decision', 'decisão'],
    ['risk', 'risco'],
    ['pros and cons', 'prós e contras'],
  ],
  guide: {
    title: 'Apesar de: juntando ideias opostas',
    intro: 'Para dizer que uma coisa aconteceu mesmo com algo contra, o inglês tem vários conectores. O segredo é saber o que vem depois de cada um.',
    points: [
      { en: 'Despite the rain, we went to the beach.', pt: 'Apesar da chuva, fomos à praia.', note: '"Despite" + substantivo (the rain) ou -ing. Nunca + frase com sujeito.' },
      { en: 'Despite being tired, she finished the report.', pt: 'Apesar de estar cansada, ela terminou o relatório.', note: '"Despite" + verbo com -ing.' },
      { en: 'Although it was raining, we went to the beach.', pt: 'Embora estivesse chovendo, fomos à praia.', note: '"Although" + frase completa (sujeito + verbo).' },
      { en: "Even though I'm tired, I'll go to the party.", pt: 'Mesmo cansado, vou à festa.', note: '"Even though" = although, com mais força.' },
      { en: 'The job is stressful. However, the salary is good.', pt: 'O trabalho é estressante. Porém, o salário é bom.', note: '"However" começa uma frase nova, com vírgula depois.' },
      { en: 'It was a risk. Nevertheless, I decided to try.', pt: 'Era um risco. Mesmo assim, decidi tentar.', note: '"Nevertheless" = mesmo assim (mais formal).' },
    ],
    tips: ['Erro comum: "Despite it was raining". Com frase completa, use "although": Although it was raining.', '"In spite of" é igual a "despite" (despite = in spite of, sem o "of" depois de despite).'],
  },
  extra_vocab: [
    { word: 'salary', reason: 'palavra central de trabalho (B2); sempre com tradução' },
    { word: 'cons', reason: 'expressão fixa "pros and cons" (prós e contras)' },
  ],
  lessons: [
    L(1, 'Despite', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: '___ the traffic, we arrived on time.', pt: 'Apesar do trânsito, chegamos na hora.', options: ['Despite', 'Although', 'However'], answer: 'Despite', why: '"Despite" + substantivo (the traffic).', wrong: { Although: '"Although" pede frase completa: although there was traffic.', However: '"However" começa uma frase nova.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'Despite ___ ill, he went to work.', pt: 'Apesar de estar doente, ele foi trabalhar.', options: ['being', 'he was', 'be'], answer: 'being', why: '"Despite" + -ing.', wrong: { 'he was': 'Depois de "despite" não vem frase com sujeito.', be: 'Precisa do -ing.' } }),
      I(1, 3, { type: 'meaning', en: 'Despite the price, the hotel was full.', options: ['Apesar do preço, o hotel estava cheio.', 'Por causa do preço, o hotel estava vazio.', 'O hotel era barato e estava cheio.'], answer: 'Apesar do preço, o hotel estava cheio.', why: '"Despite" = apesar de.' }),
      I(1, 4, { type: 'build', pt: 'Apesar de ser estressante, eu amo meu trabalho.', answer: 'Despite being stressful I love my job', extra: ['although', 'is'], display: 'Despite being stressful, I love my job.', why: '"Despite being" = apesar de ser.' }),
      I(1, 5, { type: 'listen', en: 'Despite the risk, she quit her job.', options: ['Apesar do risco, ela largou o emprego.', 'Por causa do risco, ela ficou no emprego.', 'Ela não gosta de riscos.'], answer: 'Apesar do risco, ela largou o emprego.', why: '"Quit" = largar, pedir demissão.' }),
      I(1, 6, { type: 'match', pairs: [['despite', 'apesar de'], ['quit', 'largar'], ['freedom', 'liberdade'], ['security', 'estabilidade']], why: '"Quit" é igual no presente e no passado: quit.' }),
    ]),
    L(2, 'Although e even though', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: '___ it was cold, they swam in the sea.', pt: 'Embora estivesse frio, eles nadaram no mar.', options: ['Although', 'Despite', 'However'], answer: 'Although', why: '"Although" + frase (it was cold).', wrong: { Despite: '"Despite it was" é um erro clássico.', However: '"However" não liga duas partes assim.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: "I'll go, even ___ I don't really want to.", pt: 'Vou, mesmo não querendo muito.', options: ['though', 'despite', 'although'], answer: 'though', why: '"Even though" = mesmo que.', wrong: { despite: '"Even despite" não existe.', although: '"Even although" não existe.' } }),
      I(2, 3, { type: 'meaning', en: "Even though he's rich, he lives in a small flat.", options: ['Mesmo sendo rico, ele mora num apartamento pequeno.', 'Ele é rico porque mora num apartamento pequeno.', 'Ele quer morar num apartamento grande.'], answer: 'Mesmo sendo rico, ele mora num apartamento pequeno.', why: '"Even though" = mesmo que, embora.' }),
      I(2, 4, { type: 'build', pt: 'Embora o salário seja baixo, eu gosto do trabalho.', answer: 'Although the salary is low I like the job', extra: ['despite', 'being'], display: 'Although the salary is low, I like the job.', why: '"Although" + frase completa.' }),
      I(2, 5, { type: 'listen', en: 'Although I studied, I failed the exam.', options: ['Embora eu tenha estudado, reprovei na prova.', 'Estudei e passei na prova.', 'Não estudei e reprovei.'], answer: 'Embora eu tenha estudado, reprovei na prova.', why: '"Although" = embora.' }),
      I(2, 6, { type: 'speak', en: 'Even though it was late, we stayed.', pt: 'Mesmo sendo tarde, a gente ficou.', why: '"Even though" soa como "Í-ven DÔU".' }),
    ]),
    L(3, 'However e nevertheless', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'The flat is small. ___, it is in a great area.', pt: 'O apartamento é pequeno. Porém, fica num lugar ótimo.', options: ['However', 'Although', 'Despite'], answer: 'However', why: '"However" começa a frase nova, com vírgula.', wrong: { Although: '"Although" fica dentro da mesma frase.', Despite: '"Despite" pede substantivo depois.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'It was a big risk. ___, I decided to do it.', pt: 'Era um risco grande. Mesmo assim, decidi fazer.', options: ['Nevertheless', 'Despite', 'Even'], answer: 'Nevertheless', why: '"Nevertheless" = mesmo assim.', wrong: { Despite: 'Precisa de algo depois de "despite".', Even: '"Even" sozinho não liga as frases.' } }),
      I(3, 3, { type: 'meaning', en: 'The course was expensive. However, it helped my career a lot.', options: ['O curso era caro. Porém, ajudou muito minha carreira.', 'O curso era barato e ajudou minha carreira.', 'O curso não ajudou minha carreira.'], answer: 'O curso era caro. Porém, ajudou muito minha carreira.', why: '"However" = porém. "Career" = carreira.' }),
      I(3, 4, { type: 'match', pairs: [['however', 'porém'], ['nevertheless', 'mesmo assim'], ['even though', 'mesmo que'], ['although', 'embora']], why: 'However e nevertheless começam frase nova; although e even though ficam na mesma frase.' }),
      I(3, 5, { type: 'build', pt: 'O trabalho é estressante. No entanto, eu aprendo muito.', answer: 'The job is stressful. However I learn a lot', extra: ['although', 'despite'], display: 'The job is stressful. However, I learn a lot.', why: '"However" depois do ponto.' }),
      I(3, 6, { type: 'listen', en: 'Nevertheless, we had a great time.', options: ['Mesmo assim, a gente se divertiu muito.', 'Por isso, a gente não se divertiu.', 'A gente nunca se diverte.'], answer: 'Mesmo assim, a gente se divertiu muito.', why: '"Have a great time" = se divertir muito.' }),
      I(3, 7, { type: 'choice', prompt: 'Qual frase está CERTA?', en: '___', pt: 'Apesar de estar chovendo, saímos.', options: ['Although it was raining, we went out.', 'Despite it was raining, we went out.', 'However it was raining, we went out.'], answer: 'Although it was raining, we went out.', why: 'Com frase completa (it was raining), use "although".', wrong: { 'Despite it was raining, we went out.': '"Despite" não aceita frase completa. Seria "Despite the rain".', 'However it was raining, we went out.': '"However" não liga as duas partes assim.' } }),
    ]),
    L(4, 'Prática: prós e contras', [
      I(4, 1, { type: 'match', pairs: [['stressful', 'estressante'], ['career', 'carreira'], ['decision', 'decisão'], ['risk', 'risco']], why: '"Make a decision" = tomar uma decisão. "Take a risk" = correr um risco.' }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'She ___ to finish the report despite the problems.', pt: 'Ela conseguiu terminar o relatório apesar dos problemas.', options: ['managed', 'could', 'succeeded'], answer: 'managed', why: '"Manage to" = conseguir fazer algo difícil.', wrong: { could: '"Could" é para habilidade geral, não para um resultado difícil.', succeeded: '"Succeed" pede "in + -ing".' } }),
      I(4, 3, { type: 'meaning', en: 'Working from home gives you freedom. However, it can be lonely.', options: ['Trabalhar de casa dá liberdade. Porém, pode ser solitário.', 'Trabalhar de casa é sempre ruim.', 'Trabalhar no escritório dá liberdade.'], answer: 'Trabalhar de casa dá liberdade. Porém, pode ser solitário.', why: '"Freedom" = liberdade. "Lonely" = solitário.' }),
      I(4, 4, { type: 'build', pt: 'Apesar da estabilidade, ele largou o emprego.', answer: 'Despite the security he quit his job', extra: ['although', 'quitted'], display: 'Despite the security, he quit his job.', why: '"Despite" + substantivo. Passado de "quit": quit.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Do you like living in the city?'], ['B', '___']], options: ["Yes. Although it's noisy, there's a lot to do.", "Yes. Despite it's noisy, there's a lot to do.", "Yes. However noisy, a lot to do."], answer: "Yes. Although it's noisy, there's a lot to do.", pt: 'Gosto. Embora seja barulhenta, tem muita coisa para fazer.', why: '"Although" + frase.', wrong: { "Yes. Despite it's noisy, there's a lot to do.": '"Despite" + frase completa não funciona.', 'Yes. However noisy, a lot to do.': 'Falta o verbo e a estrutura.' } }),
      I(4, 6, { type: 'listen', en: "Even though it's a risk, I think it's the right decision.", options: ['Mesmo sendo um risco, acho que é a decisão certa.', 'É uma decisão arriscada demais.', 'Não sei qual decisão tomar.'], answer: 'Mesmo sendo um risco, acho que é a decisão certa.', why: '"The right decision" = a decisão certa.' }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'I need to ___ a decision today.', pt: 'Preciso tomar uma decisão hoje.', options: ['make', 'do', 'take'], answer: 'make', why: 'Tomar uma decisão = "make a decision".', wrong: { do: '"Do a decision" não existe.', take: '"Take a decision" existe no inglês britânico, mas "make" é o mais comum.' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Apesar da chuva, fomos à praia.', answer: 'Despite the rain, we went to the beach.', why: '"Despite" + substantivo.' }),
      I(5, 2, { type: 'type', pt: 'Embora eu estivesse cansado, fui à festa.', answer: 'Although I was tired, I went to the party.', accept: ['Even though I was tired, I went to the party.'], why: '"Although" + frase completa.' }),
      I(5, 3, { type: 'dictation', en: 'However, the salary is good.', why: '"However" com vírgula depois.' }),
      I(5, 4, { type: 'type', pt: 'Ela conseguiu terminar a tempo.', answer: 'She managed to finish on time.', why: '"Manage to" = conseguir.' }),
      I(5, 5, { type: 'dictation', en: 'It was a difficult decision.', why: '"Decision" = decisão.' }),
      I(5, 6, { type: 'type', pt: 'Apesar de estar doente, ele trabalhou.', answer: 'Despite being ill, he worked.', accept: ['Despite being sick, he worked.'], why: '"Despite being" + adjetivo.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Despite the noise, I slept well.', options: ['Apesar do barulho, dormi bem.', 'Por causa do barulho, não dormi.', 'Não tinha barulho.'], answer: 'Apesar do barulho, dormi bem.', why: '"Despite" + substantivo.' }),
      I(6, 2, { type: 'dictation', en: 'Although it was expensive, we bought it.', why: '"Although" + frase.' }),
      I(6, 3, { type: 'listen', en: 'I want more freedom in my career.', options: ['Quero mais liberdade na minha carreira.', 'Tenho muita liberdade no trabalho.', 'Minha carreira é estável.'], answer: 'Quero mais liberdade na minha carreira.', why: '"Freedom" = liberdade.' }),
      I(6, 4, { type: 'dictation', en: 'She quit her job last year.', why: '"Quit" no passado é igual.' }),
      I(6, 5, { type: 'listen', en: "It's stressful. Nevertheless, I enjoy it.", options: ['É estressante. Mesmo assim, eu curto.', 'É estressante e eu odeio.', 'É tranquilo e eu curto.'], answer: 'É estressante. Mesmo assim, eu curto.', why: '"Nevertheless" = mesmo assim.' }),
      I(6, 6, { type: 'dictation', en: 'We managed to find a solution.', why: '"Managed to" = conseguimos.' }),
      I(6, 7, { type: 'speak', en: 'Despite everything, I am happy.', pt: 'Apesar de tudo, sou feliz.', why: '"Despite everything" = apesar de tudo.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "I'm thinking about quitting my job to travel."], ['B', '___']], options: ["Really? Although it's a risk, it sounds amazing!", "Really? Despite it's a risk, sounds amazing.", 'Really? However a risk.'], answer: "Really? Although it's a risk, it sounds amazing!", pt: 'Sério? Embora seja um risco, parece incrível!', why: '"Although" + frase.', wrong: { "Really? Despite it's a risk, sounds amazing.": '"Despite" + frase não funciona.', 'Really? However a risk.': 'Frase incompleta.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'But what about money?'], ['B', '___']], options: ["I've saved for two years. However, it might not be enough.", "I've saved for two years. Although, it might not be enough.", 'I saved two years despite.'], answer: "I've saved for two years. However, it might not be enough.", pt: 'Economizei por dois anos. Porém, talvez não seja suficiente.', why: '"However" abre a frase nova.', wrong: { "I've saved for two years. Although, it might not be enough.": '"Although" não começa frase com vírgula assim.', 'I saved two years despite.': '"Despite" sozinho no fim não funciona.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Are your parents OK with it?'], ['B', '___']], options: ['Even though they are worried, they support me.', 'Even they are worried, they support me.', 'Despite they worried, support me.'], answer: 'Even though they are worried, they support me.', pt: 'Mesmo preocupados, eles me apoiam.', why: '"Even though" + frase.', wrong: { 'Even they are worried, they support me.': 'Falta o "though".', 'Despite they worried, support me.': '"Despite" não aceita frase.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Well, it\'s your decision. Good luck!'], ['B', '___']], options: ['Thanks! Despite the risks, I think I have to try.', 'Thanks! Although the risks, I have to try.', 'Thanks! However risks I try.'], answer: 'Thanks! Despite the risks, I think I have to try.', pt: 'Valeu! Apesar dos riscos, acho que tenho que tentar.', why: '"Despite" + substantivo (the risks).', wrong: { 'Thanks! Although the risks, I have to try.': '"Although" pede frase completa.', 'Thanks! However risks I try.': 'Não forma frase.' } }),
      I(7, 5, { type: 'speak', en: 'Although it was difficult, I did it.', pt: 'Embora tenha sido difícil, eu consegui.', why: '"Although" soa como "ól-DÔU".' }),
      I(7, 6, { type: 'speak', en: 'What are the pros and cons?', pt: 'Quais são os prós e contras?', why: '"Pros and cons" soa como "PRÔUZ-en-KÔUNZ".' }),
    ]),
    L(8, 'Lendo: largar tudo?', [
      I(8, 1, { type: 'story', why: 'A Paula conta por que largou um emprego estável. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Como era o antigo emprego da Paula?', options: ['Estável e bem pago, mas estressante', 'Mal pago e tranquilo', 'Divertido e criativo'], answer: 'Estável e bem pago, mas estressante', why: '"Good salary and a lot of security. However, it was very stressful."' }),
      I(8, 3, { type: 'quiz', q: 'O que ela faz agora?', options: ['Tem uma padaria pequena', 'Trabalha num banco', 'Está viajando'], answer: 'Tem uma padaria pequena', why: '"Now I have a small bakery."' }),
      I(8, 4, { type: 'quiz', q: 'Ela se arrepende?', options: ['Não', 'Sim, muito', 'Não sabe'], answer: 'Não', why: '"Despite everything, I don\'t regret it."' }),
    ], {
      title: 'Largar tudo?',
      lines: [
        { who: 'Paula', en: 'Three years ago, I worked in a bank. I had a good salary and a lot of security.', pt: 'Há três anos, eu trabalhava num banco. Tinha um bom salário e muita estabilidade.' },
        { who: 'Paula', en: 'However, it was very stressful, and I had no freedom.', pt: 'Porém, era muito estressante, e eu não tinha liberdade.' },
        { ask: 'Qual era o problema do banco?', options: ['Estresse e falta de liberdade', 'Salário baixo', 'Era longe de casa'], answer: 'Estresse e falta de liberdade', why: '"Very stressful" e "no freedom".' },
        { who: 'Paula', en: '___ my family was worried, I quit and opened a small bakery.', pt: 'Embora minha família estivesse preocupada, larguei tudo e abri uma padaria pequena.', gap: { answer: 'Although', options: ['Although', 'Despite', 'However'] } },
        { who: 'Paula', en: 'Now I earn less money, and I work on Saturdays. Nevertheless, I feel happy every morning.', pt: 'Agora ganho menos e trabalho aos sábados. Mesmo assim, acordo feliz todo dia.' },
        { who: 'Paula', en: "Despite everything, I don't regret it. It was the best decision of my life.", pt: 'Apesar de tudo, não me arrependo. Foi a melhor decisão da minha vida.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: '___ he was nervous, he gave a great speech.', pt: 'Embora estivesse nervoso, ele fez um ótimo discurso.', options: ['Although', 'Despite', 'However'], answer: 'Although', why: 'Frase completa depois: although.', wrong: { Despite: 'Seria "Despite being nervous".', However: 'Não liga as duas partes.' } }),
      I(9, 2, { type: 'type', pt: 'Apesar do frio, saímos.', answer: 'Despite the cold, we went out.', why: '"Despite" + substantivo (the cold).' }),
      I(9, 3, { type: 'meaning', en: 'The test was hard. Nevertheless, everyone passed.', options: ['A prova foi difícil. Mesmo assim, todos passaram.', 'A prova foi fácil e todos passaram.', 'Ninguém passou na prova difícil.'], answer: 'A prova foi difícil. Mesmo assim, todos passaram.', why: '"Nevertheless" = mesmo assim.' }),
      I(9, 4, { type: 'dictation', en: 'Even though I was busy, I helped her.', why: '"Even though" = mesmo que.' }),
      I(9, 5, { type: 'listen', en: 'Despite having little money, they travelled a lot.', options: ['Apesar de ter pouco dinheiro, eles viajavam muito.', 'Eles tinham muito dinheiro e viajavam.', 'Eles não viajavam por falta de dinheiro.'], answer: 'Apesar de ter pouco dinheiro, eles viajavam muito.', why: '"Despite having" = apesar de ter.' }),
      I(9, 6, { type: 'build', pt: 'O hotel era caro. Porém, a vista era incrível.', answer: 'The hotel was expensive. However the view was amazing', extra: ['despite', 'although'], display: 'The hotel was expensive. However, the view was amazing.', why: '"However" abre a frase nova.' }),
    ]),
    L(10, 'História: a escolha do Leo', [
      I(10, 1, { type: 'story', why: 'O Leo recebeu duas propostas de emprego e conversa com a irmã. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Qual é o problema do emprego na capital?', options: ['É longe da família', 'O salário é baixo', 'É muito tranquilo'], answer: 'É longe da família', why: '"It\'s far from our family."' }),
      I(10, 3, { type: 'quiz', q: 'Qual é a vantagem do emprego perto de casa?', options: ['Mais liberdade e tempo livre', 'Salário mais alto', 'Mais viagens'], answer: 'Mais liberdade e tempo livre', why: '"I\'d have more freedom and free time."' }),
      I(10, 4, { type: 'quiz', q: 'O que o Leo decide?', options: ['O emprego perto de casa', 'O emprego em São Paulo', 'Nenhum dos dois'], answer: 'O emprego perto de casa', why: '"Despite the lower salary, I\'ll take the job here."' }),
    ], {
      title: 'A escolha do Leo',
      lines: [
        { who: 'Leo', en: 'I have two job offers, and I need to make a decision this week.', pt: 'Tenho duas propostas de emprego e preciso decidir esta semana.' },
        { who: 'Rita', en: 'What are the pros and cons?', pt: 'Quais são os prós e contras?' },
        { who: 'Leo', en: "The job in the capital has a great salary. However, it's far from our family.", pt: 'O emprego na capital tem um ótimo salário. Porém, é longe da nossa família.' },
        { who: 'Leo', en: "The job here pays less, ___ I'd have more freedom and free time.", pt: 'O emprego daqui paga menos, embora eu tivesse mais liberdade e tempo livre.', gap: { answer: 'although', options: ['although', 'despite', 'however'] } },
        { ask: 'Qual emprego paga mais?', options: ['O da capital', 'O daqui', 'Os dois pagam igual'], answer: 'O da capital', why: '"The job in the capital has a great salary."' },
        { who: 'Rita', en: 'What matters more to you?', pt: 'O que importa mais para você?' },
        { who: 'Leo', en: "Time with you and Mom. Despite the lower salary, I'll take the job here.", pt: 'Tempo com você e com a mãe. Apesar do salário menor, vou ficar com o emprego daqui.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-b1u13', level: 'B1', unlock: 'b1-u13', title: 'Prós e contras',
  intro: 'A Ana e o Tom discutem os prós e contras de trabalhar de casa.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today: working from home. Is it good or bad?", pt: 'E eu sou o Tom. Hoje: trabalhar de casa. É bom ou ruim?' },
    { who: 'ana', en: "I love it. Although I work a lot, I don't waste time in traffic.", pt: 'Eu adoro. Embora eu trabalhe muito, não perco tempo no trânsito.' },
    { who: 'tom', en: "That's true. However, I feel lonely at home.", pt: 'É verdade. Porém, eu me sinto sozinho em casa.' },
    { who: 'ana', en: 'Despite that, you have more freedom, right?', pt: 'Apesar disso, você tem mais liberdade, né?' },
    { who: 'tom', en: "Yes. Even though I miss my friends from work, I like having lunch with my family.", pt: 'Sim. Mesmo sentindo falta dos amigos do trabalho, gosto de almoçar com a família.' },
    { who: 'ana', en: 'So, home or office?', pt: 'Então, casa ou escritório?' },
    { who: 'tom', en: "Both! Two days at home, three in the office. That's all for today!", pt: 'Os dois! Dois dias em casa, três no escritório. Por hoje é só!' },
    { who: 'ana', en: 'Bye! Thank you for listening!', pt: 'Tchau! Obrigada por ouvir!' },
  ],
  questions: [
    { q: 'Qual é a vantagem para a Ana?', options: ['Não perde tempo no trânsito', 'Trabalha menos', 'Ganha mais'], answer: 'Não perde tempo no trânsito', why: '"I don\'t waste time in traffic."' },
    { q: 'Qual é o problema para o Tom?', options: ['Se sente sozinho', 'A internet é lenta', 'A casa é barulhenta'], answer: 'Se sente sozinho', why: '"I feel lonely at home."' },
    { q: 'Qual é a escolha final do Tom?', options: ['Os dois: casa e escritório', 'Só em casa', 'Só no escritório'], answer: 'Os dois: casa e escritório', why: '"Both! Two days at home, three in the office."' },
  ],
}, 'pod-b1u12');
addScene('b1-u13', 'standing-21', 'calendar');
