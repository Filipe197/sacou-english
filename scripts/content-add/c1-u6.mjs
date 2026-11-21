// C1, etapa 2: unidade 6 — Tendo terminado… (orações com particípio).
// Gera src/content/c1/unit-06.json. Todas as lições levam "added".
// Uso: node scripts/content-add/c1-u6.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `c1-u6-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `c1u6l${n}-${k}`, ...o });

writeUnit('c1/unit-06.json', {
  id: 'c1-u6', level: 'C1', order: 6,
  title: 'Tendo terminado…',
  subtitle: 'Orações com particípio: Having finished…, Not knowing…, Given that…, Considering…',
  can_do: {
    text: 'Consigo juntar ideias em frases mais curtas e elegantes, como nos textos, relatórios e notícias em inglês.',
    source: 'CEFR (Conselho da Europa) — Produção escrita: textos claros e bem estruturados, com conectores variados, nível C1',
  },
  core_inventory: ['Grammar: present participle clauses (Walking home, I saw…)', 'Grammar: perfect participle (Having finished…)', 'Grammar: negative participle (Not knowing…)', 'Linkers: given that, considering, provided that'],
  words: [
    ['having finished', 'depois de terminar, tendo terminado'],
    ['not knowing', 'sem saber'],
    ['given that', 'visto que, dado que'],
    ['considering', 'considerando, levando em conta'],
    ['provided that', 'contanto que'],
    ['while', 'enquanto'],
    ['once', 'assim que, uma vez que'],
    ['realise', 'perceber'],
    ['assume', 'supor, presumir'],
    ['despite', 'apesar de'],
  ],
  guide: {
    title: 'Frases mais curtas e mais elegantes',
    intro: 'Quando duas ações têm o mesmo sujeito, dá para juntar tudo usando o particípio (-ing ou having + particípio). É o jeito como jornais, livros e relatórios escrevem.',
    points: [
      { en: 'Walking home, I saw an old friend.', pt: 'Voltando para casa, vi um velho amigo.', note: '= While I was walking home… O sujeito (I) é o mesmo.' },
      { en: 'Having finished the report, she went home.', pt: 'Depois de terminar o relatório, ela foi para casa.', note: 'Having + particípio: uma ação antes da outra.' },
      { en: 'Not knowing what to say, I smiled.', pt: 'Sem saber o que dizer, sorri.', note: 'Negativa: "not" vem antes.' },
      { en: 'Given that it was late, we took a taxi.', pt: 'Visto que era tarde, pegamos um táxi.', note: '"Given that" = dado que, visto que.' },
      { en: 'Considering the price, the hotel was good.', pt: 'Considerando o preço, o hotel era bom.', note: '"Considering" = levando em conta.' },
      { en: "You can borrow it, provided that you bring it back.", pt: 'Pode pegar emprestado, contanto que devolva.', note: '"Provided that" = contanto que.' },
    ],
    tips: ['Cuidado com o sujeito: "Walking home, the rain started" está errado, porque a chuva não estava andando.', 'Na fala do dia a dia, essas formas são menos comuns; são ótimas para escrever.'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Voltando para casa…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: '___ the street, she dropped her keys.', pt: 'Atravessando a rua, ela deixou cair as chaves.', options: ['Crossing', 'Crossed', 'To cross'], answer: 'Crossing', why: '-ing = ação acontecendo ao mesmo tempo.', wrong: { Crossed: 'O particípio passado aqui daria sentido de passiva.', 'To cross': 'Indicaria finalidade.' } }),
      I(1, 2, { type: 'choice', prompt: 'Qual frase está correta?', en: '___', pt: 'Andando no parque, vi um cachorro enorme.', options: ['Walking in the park, I saw a huge dog.', 'Walking in the park, a huge dog saw me.', 'Walked in the park, I saw a huge dog.'], answer: 'Walking in the park, I saw a huge dog.', why: 'Quem estava andando era "I".', wrong: { 'Walking in the park, a huge dog saw me.': 'Daria a entender que o cachorro estava andando.', 'Walked in the park, I saw a huge dog.': 'Precisa do -ing.' } }),
      I(1, 3, { type: 'meaning', en: 'Looking out of the window, he saw the storm coming.', options: ['Olhando pela janela, ele viu a tempestade chegando.', 'Ele fechou a janela por causa da tempestade.', 'A tempestade quebrou a janela.'], answer: 'Olhando pela janela, ele viu a tempestade chegando.', why: '"Looking" = enquanto olhava.' }),
      I(1, 4, { type: 'build', pt: 'Esperando o ônibus, li um livro inteiro.', answer: 'Waiting for the bus I read a whole book', extra: ['Waited', 'all'], display: 'Waiting for the bus, I read a whole book.', why: '-ing para ação simultânea.' }),
      I(1, 5, { type: 'listen', en: 'Feeling tired, I went to bed early.', options: ['Me sentindo cansado, fui dormir cedo.', 'Fui dormir tarde.', 'Não estava cansado.'], answer: 'Me sentindo cansado, fui dormir cedo.', why: '-ing também explica o motivo.' }),
      I(1, 6, { type: 'match', pairs: [['while', 'enquanto'], ['once', 'assim que'], ['realise', 'perceber'], ['assume', 'supor']], why: 'Palavras que aparecem muito nessas frases.' }),
    ]),
    L(2, 'Tendo terminado…', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: '___ dinner, we went for a walk.', pt: 'Depois de jantar, fomos dar uma volta.', options: ['Having had', 'Having', 'Had'], answer: 'Having had', why: 'Having + particípio = uma ação depois da outra.', wrong: { Having: 'Daria a ideia de ao mesmo tempo.', Had: 'Não forma a oração.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Having ___ in London for years, she speaks perfect English.', pt: 'Tendo morado em Londres por anos, ela fala inglês perfeito.', options: ['lived', 'living', 'live'], answer: 'lived', why: 'Having + particípio passado.', wrong: { living: 'Depois de "having" vem o particípio.', live: 'Precisa do particípio.' } }),
      I(2, 3, { type: 'meaning', en: 'Having read the reviews, I decided not to buy it.', options: ['Depois de ler as avaliações, decidi não comprar.', 'Comprei sem ler as avaliações.', 'Vou ler as avaliações depois.'], answer: 'Depois de ler as avaliações, decidi não comprar.', why: 'Having read = depois de ter lido.' }),
      I(2, 4, { type: 'build', pt: 'Depois de terminar o trabalho, ele saiu.', answer: 'Having finished the work he left', extra: ['Finishing', 'leaved'], display: 'Having finished the work, he left.', why: 'Having + particípio.' }),
      I(2, 5, { type: 'listen', en: 'Having seen the film, I can tell you it is great.', options: ['Como já vi o filme, posso te dizer que é ótimo.', 'Ainda não vi o filme.', 'O filme é ruim.'], answer: 'Como já vi o filme, posso te dizer que é ótimo.', why: 'Having seen = como já vi.' }),
      I(2, 6, { type: 'speak', en: 'Having finished, I went home.', pt: 'Depois de terminar, fui para casa.', why: 'Curto e bem escrito.' }),
    ]),
    L(3, 'Sem saber…', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: '___ what to do, I called my mother.', pt: 'Sem saber o que fazer, liguei para a minha mãe.', options: ['Not knowing', 'Knowing not', "Don't knowing"], answer: 'Not knowing', why: 'Negativa: "not" antes do -ing.', wrong: { 'Knowing not': 'Ordem errada.', "Don't knowing": 'Não se usa "don\'t" aqui.' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'Not ___ the email, he missed the meeting.', pt: 'Como não tinha lido o e-mail, ele perdeu a reunião.', options: ['having read', 'read', 'reads'], answer: 'having read', why: 'Not having + particípio = como não tinha…', wrong: { read: 'Falta "having".', reads: 'Não forma a oração.' } }),
      I(3, 3, { type: 'meaning', en: 'Not wanting to wake the baby, she whispered.', options: ['Sem querer acordar o bebê, ela sussurrou.', 'Ela acordou o bebê.', 'O bebê estava chorando.'], answer: 'Sem querer acordar o bebê, ela sussurrou.', why: '"Whisper" = sussurrar.' }),
      I(3, 4, { type: 'build', pt: 'Sem conhecer ninguém, me senti sozinho.', answer: 'Not knowing anyone I felt lonely', extra: ['Knowing', 'nobody'], display: 'Not knowing anyone, I felt lonely.', why: 'Negativa: not + -ing (sem saber, sem querer).' }),
      I(3, 5, { type: 'listen', en: 'Not having a car, I take the bus every day.', options: ['Como não tenho carro, pego ônibus todo dia.', 'Vou de carro todo dia.', 'Vendi o meu carro ontem.'], answer: 'Como não tenho carro, pego ônibus todo dia.', why: 'Not having = como não tenho.' }),
      I(3, 6, { type: 'match', pairs: [['not knowing', 'sem saber'], ['having finished', 'depois de terminar'], ['despite', 'apesar de'], ['realise', 'perceber']], why: 'Formas que encurtam frases.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'Why did you leave the party so early?'], ['B', '___']], options: ["Not knowing anyone there, I felt a bit out of place.", "Not know anyone, I felt out place.", "Knowing not anyone, felt."], answer: 'Not knowing anyone there, I felt a bit out of place.', pt: 'Sem conhecer ninguém lá, me senti meio deslocado.', why: '"Out of place" = deslocado.', wrong: { 'Not know anyone, I felt out place.': 'Falta o -ing e "of".', 'Knowing not anyone, felt.': 'Ordem errada.' } }),
    ]),
    L(4, 'Prática: visto que, contanto que', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: '___ the weather, the trip was quite good.', pt: 'Considerando o tempo, a viagem foi bem boa.', options: ['Considering', 'Provided that', 'Unless'], answer: 'Considering', why: '"Considering" + substantivo = considerando.', wrong: { 'Provided that': 'Pede uma frase com verbo depois.', Unless: '"Unless" = a não ser que.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: "You can stay, ___ you don't make noise.", pt: 'Você pode ficar, contanto que não faça barulho.', options: ['provided that', 'given that', 'despite'], answer: 'provided that', why: '"Provided that" = contanto que.', wrong: { 'given that': '"Given that" = visto que.', despite: '"Despite" vem antes de substantivo.' } }),
      I(4, 3, { type: 'meaning', en: 'Given that he is new, he did a great job.', options: ['Visto que ele é novo, fez um ótimo trabalho.', 'Ele é novo e fez tudo errado.', 'Ele trabalha aqui há anos.'], answer: 'Visto que ele é novo, fez um ótimo trabalho.', why: '"Given that" = visto que.' }),
      I(4, 4, { type: 'build', pt: 'Apesar da chuva, o jogo continuou.', answer: 'Despite the rain the game continued', extra: ['Despite of', 'although'], display: 'Despite the rain, the game continued.', why: '"Despite" + substantivo (sem "of").' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Can I work from home tomorrow?'], ['B', '___']], options: ["Sure, provided that you join the meeting online.", "Sure, provide you join the meeting.", "Sure, given join meeting."], answer: 'Sure, provided that you join the meeting online.', pt: 'Claro, contanto que você entre na reunião online.', why: '"Provided that" = contanto que.', wrong: { 'Sure, provide you join the meeting.': 'É "provided".', 'Sure, given join meeting.': 'Incompleto.' } }),
      I(4, 6, { type: 'listen', en: 'Once you understand the rule, it is easy.', options: ['Assim que você entende a regra, fica fácil.', 'A regra é muito difícil.', 'Ninguém entende a regra.'], answer: 'Assim que você entende a regra, fica fácil.', why: '"Once" = assim que, uma vez que.' }),
      I(4, 7, { type: 'speak', en: 'Considering the price, it was great.', pt: 'Considerando o preço, foi ótimo.', why: '"Considering" = levando em conta.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Depois de terminar o livro, fui dormir.', answer: 'Having finished the book, I went to sleep.', accept: ['Having finished the book, I went to bed.', 'After finishing the book, I went to sleep.'], why: 'Having + particípio.' }),
      I(5, 2, { type: 'type', pt: 'Sem saber o caminho, pedi ajuda.', answer: 'Not knowing the way, I asked for help.', accept: ['Not knowing the way I asked for help.'], why: 'Negativa: not + -ing (sem saber, sem querer).' }),
      I(5, 3, { type: 'dictation', en: 'Given that it was late, we went home.', why: '"Given that" = visto que.' }),
      I(5, 4, { type: 'type', pt: 'Apesar do frio, saímos.', answer: 'Despite the cold, we went out.', accept: ['Despite the cold we went out.'], why: '"Despite" + substantivo.' }),
      I(5, 5, { type: 'dictation', en: 'Walking to work, I listen to music.', why: '-ing para ação simultânea.' }),
      I(5, 6, { type: 'type', pt: 'Pode ir, contanto que volte cedo.', answer: 'You can go, provided that you come back early.', accept: ['You can go provided that you come back early.', 'You can go, provided you come back early.'], why: '"Provided that" = contanto que.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Having lost my keys, I had to wait outside.', options: ['Como perdi as chaves, tive que esperar do lado de fora.', 'Achei as minhas chaves.', 'Entrei em casa sem problemas.'], answer: 'Como perdi as chaves, tive que esperar do lado de fora.', why: 'Having lost = como perdi (antes).' }),
      I(6, 2, { type: 'dictation', en: 'Not wanting to be late, I ran.', why: 'Negativa: not + -ing (sem saber, sem querer).' }),
      I(6, 3, { type: 'listen', en: 'Considering everything, it was a good year.', options: ['Considerando tudo, foi um bom ano.', 'Foi um ano horrível.', 'O ano ainda não acabou.'], answer: 'Considerando tudo, foi um bom ano.', why: '"Considering everything" = considerando tudo.' }),
      I(6, 4, { type: 'dictation', en: 'Having said that, I still like him.', why: '"Having said that" = dito isso.' }),
      I(6, 5, { type: 'listen', en: 'Despite being tired, she finished the race.', options: ['Apesar de estar cansada, ela terminou a corrida.', 'Ela desistiu da corrida.', 'Ela não estava cansada.'], answer: 'Apesar de estar cansada, ela terminou a corrida.', why: '"Despite" + -ing.' }),
      I(6, 6, { type: 'dictation', en: 'Once you start, you cannot stop.', why: '"Once" = assim que.' }),
      I(6, 7, { type: 'speak', en: 'Having said that, I agree.', pt: 'Dito isso, eu concordo.', why: 'Conector muito usado em debates.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'How was your first week in Canada?'], ['B', '___']], options: ["Hard at first. Not knowing anyone, I spent the first days alone.", "Hard. Not know anyone, alone days.", "Hard. Knowing not, alone."], answer: 'Hard at first. Not knowing anyone, I spent the first days alone.', pt: 'Difícil no começo. Sem conhecer ninguém, passei os primeiros dias sozinho.', why: 'Negativa: not + -ing (sem saber, sem querer).', wrong: { 'Hard. Not know anyone, alone days.': 'Falta o -ing e verbo.', 'Hard. Knowing not, alone.': 'Ordem errada.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'And now?'], ['B', '___']], options: ["Much better. Having joined a running club, I made lots of friends.", "Much better. Join a running club, friends.", "Better. Having join club."], answer: 'Much better. Having joined a running club, I made lots of friends.', pt: 'Bem melhor. Depois de entrar num clube de corrida, fiz muitos amigos.', why: 'Having + particípio.', wrong: { 'Much better. Join a running club, friends.': 'Frase incompleta.', 'Better. Having join club.': 'Precisa do particípio: joined.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Is it expensive to live there?'], ['B', '___']], options: ["Very. But given that salaries are higher, it's OK.", "Very. But give salaries higher, OK.", "Very. Given salaries."], answer: "Very. But given that salaries are higher, it's OK.", pt: 'Muito. Mas, visto que os salários são mais altos, dá para levar.', why: '"Given that" = visto que.', wrong: { 'Very. But give salaries higher, OK.': 'É "given that" e falta verbo.', 'Very. Given salaries.': 'Incompleto.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Would you recommend it?'], ['B', '___']], options: ["Yes, provided that you don't mind the cold!", "Yes, provide you not mind cold.", "Yes, despite mind cold."], answer: "Yes, provided that you don't mind the cold!", pt: 'Sim, contanto que você não se importe com o frio!', why: '"Provided that" = contanto que.', wrong: { 'Yes, provide you not mind cold.': 'Forma errada.', 'Yes, despite mind cold.': '"Despite" não combina aqui.' } }),
      I(7, 5, { type: 'speak', en: "Given that it's late, let's go.", pt: 'Visto que é tarde, vamos.', why: '"Given that" = visto que.' }),
      I(7, 6, { type: 'speak', en: 'Not knowing the city, I got lost.', pt: 'Sem conhecer a cidade, me perdi.', why: 'Negativa: not + -ing (sem saber, sem querer).' }),
    ]),
    L(8, 'Lendo: a notícia do resgate', [
      I(8, 1, { type: 'story', why: 'Uma notícia conta como um cachorro foi salvo numa trilha. Repare como as notícias usam orações com particípio. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'Onde o cachorro foi encontrado?', options: ['Numa trilha na montanha', 'Num rio', 'Num prédio'], answer: 'Numa trilha na montanha', why: '"Walking on a mountain trail…"' }),
      I(8, 3, { type: 'quiz', q: 'O que o casal fez primeiro?', options: ['Chamou os bombeiros', 'Levou o cachorro para casa', 'Postou nas redes sociais'], answer: 'Chamou os bombeiros', why: '"Not knowing what to do, they called the fire service."' }),
      I(8, 4, { type: 'quiz', q: 'Como o cachorro está agora?', options: ['Bem, com a família', 'Ainda no hospital', 'Perdido de novo'], answer: 'Bem, com a família', why: '"Having been checked by a vet, he is now back with his family."' }),
    ], {
      title: 'Cachorro resgatado na montanha',
      lines: [
        { who: 'Notícia', en: 'Walking on a mountain trail last Sunday, a young couple heard a strange noise.', pt: 'Caminhando por uma trilha na montanha no último domingo, um jovem casal ouviu um barulho estranho.' },
        { who: 'Notícia', en: 'Looking down, they saw a small dog stuck between two rocks.', pt: 'Olhando para baixo, viram um cachorrinho preso entre duas pedras.' },
        { ask: 'Onde estava o cachorro?', options: ['Preso entre pedras', 'Num lago', 'Numa árvore'], answer: 'Preso entre pedras', why: '"Stuck between two rocks."' },
        { who: 'Notícia', en: 'Not ___ what to do, they called the fire service.', pt: 'Sem saber o que fazer, eles chamaram os bombeiros.', gap: { answer: 'knowing', options: ['knowing', 'known', 'know'] } },
        { who: 'Notícia', en: 'Given that the area was difficult to reach, the rescue took three hours.', pt: 'Visto que a área era de difícil acesso, o resgate levou três horas.' },
        { who: 'Notícia', en: 'Having been checked by a vet, the dog is now back with his family.', pt: 'Depois de ser examinado por um veterinário, o cachorro está de volta com a família.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: '___ the instructions, I started the machine.', pt: 'Depois de ler as instruções, liguei a máquina.', options: ['Having read', 'Reading being', 'Read having'], answer: 'Having read', why: 'Having + particípio = depois de.', wrong: { 'Reading being': 'Não existe.', 'Read having': 'Ordem errada.' } }),
      I(9, 2, { type: 'type', pt: 'Sem querer incomodar, saí em silêncio.', answer: 'Not wanting to bother anyone, I left quietly.', accept: ['Not wanting to disturb anyone, I left quietly.', 'Not wanting to bother anyone, I left in silence.'], why: 'Negativa: not + -ing (sem saber, sem querer).' }),
      I(9, 3, { type: 'meaning', en: 'Considering his age, he is very fit.', options: ['Considerando a idade, ele está em ótima forma.', 'Ele é jovem e está fora de forma.', 'Ele não faz exercício.'], answer: 'Considerando a idade, ele está em ótima forma.', why: '"Fit" = em forma.' }),
      I(9, 4, { type: 'dictation', en: 'Despite the traffic, we arrived on time.', why: '"Despite" + substantivo.' }),
      I(9, 5, { type: 'listen', en: 'Provided that it does not rain, we will have a barbecue.', options: ['Contanto que não chova, vamos fazer churrasco.', 'Vai chover no churrasco.', 'Cancelamos o churrasco.'], answer: 'Contanto que não chova, vamos fazer churrasco.', why: '"Provided that" = contanto que.' }),
      I(9, 6, { type: 'build', pt: 'Sentindo fome, ele abriu a geladeira.', answer: 'Feeling hungry he opened the fridge', extra: ['Felt', 'opens'], display: 'Feeling hungry, he opened the fridge.', why: '-ing explica o motivo.' }),
    ]),
    L(10, 'História: o voo perdido', [
      I(10, 1, { type: 'story', why: 'O Gustavo conta como perdeu o voo e acabou tendo um dia inesquecível. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Por que o Gustavo perdeu o voo?', options: ['Dormiu no aeroporto', 'Esqueceu o passaporte', 'O trânsito estava ruim'], answer: 'Dormiu no aeroporto', why: '"Waiting at the gate, I fell asleep."' }),
      I(10, 3, { type: 'quiz', q: 'Quem ele conheceu?', options: ['Uma brasileira que também perdeu o voo', 'Um piloto', 'Um antigo colega'], answer: 'Uma brasileira que também perdeu o voo', why: '"Another Brazilian who had also missed the flight."' }),
      I(10, 4, { type: 'quiz', q: 'Como terminou a história?', options: ['Eles estão namorando', 'Ele nunca mais viajou', 'Ele perdeu outro voo'], answer: 'Eles estão namorando', why: '"We have been together for a year now."' }),
    ], {
      title: 'O voo perdido',
      lines: [
        { who: 'Gustavo', en: 'Having arrived at the airport three hours early, I felt very relaxed.', pt: 'Tendo chegado ao aeroporto três horas antes, eu estava bem tranquilo.' },
        { who: 'Gustavo', en: 'Waiting at the gate, I fell asleep. When I woke up, the plane had gone!', pt: 'Esperando no portão, peguei no sono. Quando acordei, o avião tinha ido embora!' },
        { who: 'Marta', en: 'Oh no! What did you do?', pt: 'Ah, não! E o que você fez?' },
        { ask: 'O que aconteceu com o avião?', options: ['Partiu sem ele', 'Atrasou', 'Foi cancelado'], answer: 'Partiu sem ele', why: '"The plane had gone!"' },
        { who: 'Gustavo', en: 'Not ___ what to do, I went to the desk. There I met another Brazilian who had also missed the flight.', pt: 'Sem saber o que fazer, fui ao balcão. Lá conheci outra brasileira que também tinha perdido o voo.', gap: { answer: 'knowing', options: ['knowing', 'known', 'knew'] } },
        { who: 'Marta', en: "And given that you're smiling, I guess the story ends well?", pt: 'E, visto que você está sorrindo, imagino que a história termina bem?' },
        { who: 'Gustavo', en: "Very well. We have been together for a year now!", pt: 'Muito bem. Estamos juntos há um ano!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-c1u6', level: 'C1', unlock: 'c1-u6', title: 'Escrevendo como jornalista',
  intro: 'A Ana e o Tom mostram um truque que deixa os textos em inglês muito mais elegantes.',
  lines: [
    { who: 'ana', en: 'Tom, have you noticed how news stories in English start?', pt: 'Tom, você já reparou como as notícias em inglês começam?' },
    { who: 'tom', en: 'Yes! Things like "Walking home last night, a man found a bag of money".', pt: 'Sim! Coisas como "Voltando para casa ontem à noite, um homem achou uma bolsa de dinheiro".' },
    { who: 'ana', en: 'Exactly. Using this verb form, you join two ideas in one short sentence.', pt: 'Exatamente. Usando essa forma do verbo (-ing), você junta duas ideias numa frase curta.' },
    { who: 'tom', en: 'And "having" shows that one thing happened first. Having finished, he left.', pt: 'E "having" mostra que uma coisa aconteceu primeiro. Tendo terminado, ele saiu.' },
    { who: 'ana', en: 'But be careful with the subject. "Walking home, the rain started" is wrong.', pt: 'Mas cuidado com o sujeito. "Walking home, the rain started" está errado.' },
    { who: 'tom', en: "Because the rain wasn't walking home! I love that example.", pt: 'Porque a chuva não estava voltando para casa! Adoro esse exemplo.' },
    { who: 'ana', en: 'Given that this is a writing tool, try it in your next email.', pt: 'Visto que é uma ferramenta de escrita, testem no próximo e-mail.' },
    { who: 'tom', en: 'Having said that, our time is up. Bye!', pt: 'Dito isso, o nosso tempo acabou. Tchau!' },
  ],
  questions: [
    { q: 'O que a forma -ing permite fazer?', options: ['Juntar duas ideias numa frase curta', 'Falar do futuro', 'Fazer perguntas'], answer: 'Juntar duas ideias numa frase curta', why: '"You join two ideas in one short sentence."' },
    { q: 'O que "having" mostra?', options: ['Que uma coisa aconteceu primeiro', 'Que é uma pergunta', 'Que é no futuro'], answer: 'Que uma coisa aconteceu primeiro', why: '"Having shows that one thing happened first."' },
    { q: 'Por que "Walking home, the rain started" está errado?', options: ['A chuva não estava voltando para casa', 'Falta um verbo', 'Está no tempo errado'], answer: 'A chuva não estava voltando para casa', why: '"The rain wasn\'t walking home!"' },
  ],
}, 'pod-c1u5');
addScene('c1-u6', 'standing-2', 'news');
