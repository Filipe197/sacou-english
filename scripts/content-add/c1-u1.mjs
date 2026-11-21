// C1, etapa 1: unidade 1 — Nunca na vida eu… (inversão para dar ênfase).
// Gera src/content/c1/unit-01.json. Todas as lições levam "added".
// Uso: node scripts/content-add/c1-u1.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `c1-u1-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `c1u1l${n}-${k}`, ...o });

writeUnit('c1/unit-01.json', {
  id: 'c1-u1', level: 'C1', order: 1,
  title: 'Nunca na vida eu…',
  subtitle: 'Inversão para dar ênfase: Never have I…, Not only…, No sooner…, Little did I know.',
  can_do: {
    text: 'Consigo dar ênfase e drama ao que conto, usando a inversão como os falantes avançados fazem em discursos, textos e histórias.',
    source: 'CEFR (Conselho da Europa) — Produção oral e escrita: variar a estrutura da frase para dar ênfase, nível C1',
  },
  core_inventory: ['Grammar: negative adverbial inversion (Never have I…, Rarely do we…)', 'Grammar: Not only … but also', 'Grammar: No sooner … than / Hardly … when', 'Grammar: Little did I know / Under no circumstances'],
  words: [
    ['never have I', 'nunca na vida eu'],
    ['not only', 'não só'],
    ['no sooner', 'mal (… e já)'],
    ['hardly', 'mal, quase não'],
    ['seldom', 'raramente'],
    ['little did I know', 'mal sabia eu'],
    ['under no circumstances', 'de jeito nenhum, em hipótese alguma'],
    ['only then', 'só então'],
    ['rarely', 'raramente'],
    ['in no way', 'de forma alguma'],
  ],
  guide: {
    title: 'Inversão: o "nunca na vida" do inglês',
    intro: 'Quando a frase começa com uma palavra negativa ou restritiva (never, rarely, not only, little), o inglês inverte a ordem como numa pergunta: o auxiliar vem antes do sujeito. É formal e dramático, e soa muito avançado.',
    points: [
      { en: 'Never have I seen such a beautiful place.', pt: 'Nunca na vida eu vi um lugar tão bonito.', note: 'Never + have + I + particípio. Compare: I have never seen…' },
      { en: 'Not only is she smart, but she is also very kind.', pt: 'Ela não só é inteligente, como também é muito gentil.', note: 'Not only + is + she…, but (she) also…' },
      { en: 'No sooner had we arrived than it started to rain.', pt: 'Mal chegamos e já começou a chover.', note: 'No sooner + had + sujeito + particípio + than.' },
      { en: 'Hardly had I sat down when the phone rang.', pt: 'Mal me sentei e o telefone tocou.', note: 'Hardly + had … when (não "than").' },
      { en: 'Little did I know that my life was about to change.', pt: 'Mal sabia eu que a minha vida estava prestes a mudar.', note: 'Little did + sujeito + verbo: ótimo para histórias.' },
      { en: 'Under no circumstances should you open this door.', pt: 'Em hipótese alguma você deve abrir esta porta.', note: 'Proibição forte, comum em avisos e instruções.' },
    ],
    tips: ['Na conversa do dia a dia, a ordem normal é mais comum: "I have never seen…". A inversão aparece em discursos, textos e quando você quer dramatizar.', 'O auxiliar segue o tempo verbal: presente (do/does), passado (did), perfect (have/had), modais (should, can).'],
  },
  extra_vocab: [],
  lessons: [
    L(1, 'Never have I…', [
      I(1, 1, { type: 'choice', prompt: 'Complete:', en: 'Never ___ such a delicious meal.', pt: 'Nunca na vida eu comi uma refeição tão deliciosa.', options: ['have I eaten', 'I have eaten', 'I ate'], answer: 'have I eaten', why: 'Depois de "Never" no começo, o auxiliar vem antes do sujeito: have I eaten.', wrong: { 'I have eaten': 'Ordem normal: só funciona como "I have never eaten".', 'I ate': 'Precisa da inversão com o auxiliar.' } }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'Rarely ___ to the cinema these days.', pt: 'Raramente vamos ao cinema hoje em dia.', options: ['do we go', 'we go', 'we do go'], answer: 'do we go', why: 'No presente, o auxiliar da inversão é do/does: Rarely do we go.', wrong: { 'we go': 'Sem inversão, a palavra "rarely" teria que ir para o meio: We rarely go.', 'we do go': 'O auxiliar vem antes do sujeito.' } }),
      I(1, 3, { type: 'meaning', en: 'Seldom have I felt so welcome.', options: ['Raramente me senti tão bem recebido.', 'Nunca fui bem recebido.', 'Sempre me sinto bem recebido.'], answer: 'Raramente me senti tão bem recebido.', why: '"Seldom" = raramente. A inversão dá ênfase.' }),
      I(1, 4, { type: 'build', pt: 'Nunca na vida eu ouvi uma história tão estranha.', answer: 'Never have I heard such a strange story', extra: ['I have', 'so'], display: 'Never have I heard such a strange story.', why: 'Never + have + I + particípio. "Such a" + adjetivo + substantivo.' }),
      I(1, 5, { type: 'listen', en: 'Never have I been so nervous.', options: ['Nunca fiquei tão nervoso.', 'Nunca fico nervoso.', 'Sempre fico nervoso.'], answer: 'Nunca fiquei tão nervoso.', why: 'Inversão com "never": nunca na vida.' }),
      I(1, 6, { type: 'match', pairs: [['never have I', 'nunca na vida eu'], ['seldom', 'raramente'], ['only then', 'só então'], ['hardly', 'mal, quase não']], why: 'Palavras negativas no começo da frase pedem inversão.' }),
    ]),
    L(2, 'Not only… but also', [
      I(2, 1, { type: 'choice', prompt: 'Complete:', en: 'Not only ___ late, but he also forgot the tickets.', pt: 'Ele não só chegou atrasado, como também esqueceu os ingressos.', options: ['did he arrive', 'he arrived', 'he did arrive'], answer: 'did he arrive', why: 'Not only + did + sujeito + verbo (passado).', wrong: { 'he arrived': 'Com "Not only" no começo, precisa inverter.', 'he did arrive': 'O auxiliar vem antes do sujeito.' } }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'Not only ___ cheap, but it is also very good.', pt: 'Não só é barato, como também é muito bom.', options: ['is it', 'it is', 'does it'], answer: 'is it', why: 'Com o verbo "be", a inversão é simples: is it.', wrong: { 'it is': 'Falta a inversão.', 'does it': 'Com "be" não se usa "do".' } }),
      I(2, 3, { type: 'meaning', en: 'Not only does she speak English, but she also speaks French.', options: ['Ela não só fala inglês, como também fala francês.', 'Ela fala inglês, mas não fala francês.', 'Ela só fala francês.'], answer: 'Ela não só fala inglês, como também fala francês.', why: 'Not only … but also = não só … como também.' }),
      I(2, 4, { type: 'build', pt: 'Não só o hotel era caro, como também era sujo.', answer: 'Not only was the hotel expensive but it was also dirty', extra: ['the hotel was', 'too'], display: 'Not only was the hotel expensive, but it was also dirty.', why: 'Not only + was + sujeito.' }),
      I(2, 5, { type: 'listen', en: 'Not only did we win, but we also had fun.', options: ['A gente não só ganhou, como também se divertiu.', 'A gente perdeu, mas se divertiu.', 'A gente não se divertiu.'], answer: 'A gente não só ganhou, como também se divertiu.', why: '"Not only did we win" = não só ganhamos.' }),
      I(2, 6, { type: 'speak', en: "Not only is it fast, it's also cheap.", pt: 'Não só é rápido, como também é barato.', why: 'Dê ênfase em "not only" e em "also".' }),
    ]),
    L(3, 'Mal cheguei e…', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'No sooner had I left the house ___ it started to rain.', pt: 'Mal saí de casa e começou a chover.', options: ['than', 'when', 'then'], answer: 'than', why: '"No sooner" sempre combina com "than".', wrong: { when: '"When" combina com "hardly", não com "no sooner".', then: '"Then" = então; aqui é "than".' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'Hardly had she finished her speech ___ everyone started clapping.', pt: 'Mal ela terminou o discurso e todo mundo começou a aplaudir.', options: ['when', 'than', 'that'], answer: 'when', why: '"Hardly … when" = mal … e já.', wrong: { than: '"Than" vai com "no sooner".', that: 'Não combina com "hardly".' } }),
      I(3, 3, { type: 'meaning', en: 'No sooner had he paid than he saw a cheaper price.', options: ['Mal ele pagou e já viu um preço mais barato.', 'Ele esperou para ver um preço mais barato.', 'Ele não pagou porque estava caro.'], answer: 'Mal ele pagou e já viu um preço mais barato.', why: 'No sooner had … than = mal … e já.' }),
      I(3, 4, { type: 'build', pt: 'Mal me deitei e o bebê começou a chorar.', answer: 'Hardly had I gone to bed when the baby started crying', extra: ['than', 'I had'], display: 'Hardly had I gone to bed when the baby started crying.', why: 'Hardly + had + I + particípio + when.' }),
      I(3, 5, { type: 'listen', en: 'No sooner had we sat down than the lights went out.', options: ['Mal nos sentamos e as luzes se apagaram.', 'As luzes se apagaram antes de chegarmos.', 'Nos sentamos e esperamos as luzes.'], answer: 'Mal nos sentamos e as luzes se apagaram.', why: '"Go out" = apagar (luz).' }),
      I(3, 6, { type: 'match', pairs: [['no sooner … than', 'mal … e já'], ['hardly … when', 'mal … quando'], ['only then', 'só então'], ['in no way', 'de forma alguma']], why: 'Cada estrutura tem o seu par fixo.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'How was your first day at the new job?'], ['B', '___']], options: ['Crazy! No sooner had I arrived than they gave me three projects.', 'Crazy! No sooner I arrived when they gave me three projects.', 'Crazy! Hardly I had arrived than three projects.'], answer: 'Crazy! No sooner had I arrived than they gave me three projects.', pt: 'Uma loucura! Mal cheguei e já me deram três projetos.', why: 'No sooner + had I + particípio + than.', wrong: { 'Crazy! No sooner I arrived when they gave me three projects.': 'Falta a inversão e o par certo é "than".', 'Crazy! Hardly I had arrived than three projects.': 'Ordem errada e frase incompleta.' } }),
    ]),
    L(4, 'Prática: mal sabia eu…', [
      I(4, 1, { type: 'choice', prompt: 'Complete:', en: 'Little ___ that she was planning a surprise party.', pt: 'Mal sabia eu que ela estava planejando uma festa surpresa.', options: ['did I know', 'I knew', 'I did know'], answer: 'did I know', why: '"Little did I know" = mal sabia eu.', wrong: { 'I knew': 'Sem inversão muda o sentido: "eu sabia pouco".', 'I did know': 'O auxiliar vem antes do sujeito.' } }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'Under no circumstances ___ your password with anyone.', pt: 'Em hipótese alguma compartilhe sua senha com ninguém.', options: ['should you share', 'you should share', 'share you'], answer: 'should you share', why: 'Under no circumstances + should + you + verbo.', wrong: { 'you should share': 'Falta a inversão.', 'share you': 'Precisa do auxiliar "should".' } }),
      I(4, 3, { type: 'meaning', en: 'Only then did I understand what she meant.', options: ['Só então entendi o que ela quis dizer.', 'Nunca entendi o que ela quis dizer.', 'Entendi na hora o que ela quis dizer.'], answer: 'Só então entendi o que ela quis dizer.', why: '"Only then" + inversão = só então.' }),
      I(4, 4, { type: 'build', pt: 'Mal sabíamos que a viagem ia ser um desastre.', answer: 'Little did we know that the trip would be a disaster', extra: ['we knew', 'will'], display: 'Little did we know that the trip would be a disaster.', why: 'Little did + we + know.' }),
      I(4, 5, { type: 'dialogue', lines: [['A', 'Can I leave the children alone for an hour?'], ['B', '___']], options: ['Under no circumstances should they stay alone.', 'Under no circumstances they should stay alone.', 'In no circumstances stay they alone.'], answer: 'Under no circumstances should they stay alone.', pt: 'Em hipótese alguma eles devem ficar sozinhos.', why: 'Proibição forte com inversão.', wrong: { 'Under no circumstances they should stay alone.': 'Falta inverter: should they.', 'In no circumstances stay they alone.': 'Ordem e expressão erradas.' } }),
      I(4, 6, { type: 'listen', en: 'In no way am I responsible for this.', options: ['De forma alguma eu sou responsável por isso.', 'Eu sou o responsável por isso.', 'Ninguém é responsável por isso.'], answer: 'De forma alguma eu sou responsável por isso.', why: '"In no way" = de forma alguma.' }),
      I(4, 7, { type: 'speak', en: 'Little did I know what was coming.', pt: 'Mal sabia eu o que estava por vir.', why: 'Frase perfeita para começar uma história.' }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Nunca na vida eu vi tanta gente.', answer: 'Never have I seen so many people.', accept: ['Never have I seen so many people'], why: 'Never + have + I + seen.' }),
      I(5, 2, { type: 'type', pt: 'Mal sabia eu que ela estava certa.', answer: 'Little did I know that she was right.', accept: ['Little did I know she was right.'], why: 'Little did I know (that)…' }),
      I(5, 3, { type: 'dictation', en: 'Not only is it cheap, but it is also fast.', why: 'Not only … but also.' }),
      I(5, 4, { type: 'type', pt: 'Raramente vemos neve aqui.', answer: 'Rarely do we see snow here.', accept: ['Seldom do we see snow here.'], why: 'Rarely + do + we + verbo.' }),
      I(5, 5, { type: 'dictation', en: 'Under no circumstances should you be late.', why: 'Under no circumstances + should + you.' }),
      I(5, 6, { type: 'type', pt: 'Só então eu percebi o erro.', answer: 'Only then did I notice the mistake.', accept: ['Only then did I realise the mistake.', 'Only then did I realize the mistake.', 'Only then did I see the mistake.'], why: 'Only then + did + I + verbo.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: 'Seldom do you meet someone so honest.', options: ['Raramente a gente conhece alguém tão honesto.', 'Todo mundo é honesto.', 'Você conhece muita gente honesta.'], answer: 'Raramente a gente conhece alguém tão honesto.', why: '"Seldom" = raramente.' }),
      I(6, 2, { type: 'dictation', en: 'Never have I felt so tired.', why: 'Never + have + I + particípio.' }),
      I(6, 3, { type: 'listen', en: 'No sooner had she left than he called.', options: ['Mal ela saiu e ele ligou.', 'Ele ligou antes de ela sair.', 'Ela saiu porque ele ligou.'], answer: 'Mal ela saiu e ele ligou.', why: 'No sooner … than.' }),
      I(6, 4, { type: 'dictation', en: 'Hardly had we started when it ended.', why: 'Hardly had … when = mal … e já.' }),
      I(6, 5, { type: 'listen', en: 'Not only did he lie, but he also laughed about it.', options: ['Ele não só mentiu, como também riu disso.', 'Ele não mentiu.', 'Ele pediu desculpas.'], answer: 'Ele não só mentiu, como também riu disso.', why: '"Laugh about" = rir de.' }),
      I(6, 6, { type: 'dictation', en: 'Little did they know the truth.', why: 'Little did + sujeito + know.' }),
      I(6, 7, { type: 'speak', en: 'Never have I been so happy.', pt: 'Nunca fui tão feliz.', why: 'A ênfase cai em "never".' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', 'So, how was the concert last night?'], ['B', '___']], options: ['Amazing! Never have I heard such a powerful voice.', 'Amazing! Never I have heard such a powerful voice.', 'Amazing! Never heard I a voice.'], answer: 'Amazing! Never have I heard such a powerful voice.', pt: 'Incrível! Nunca ouvi uma voz tão poderosa.', why: 'Inversão para dar emoção: Never have I heard.', wrong: { 'Amazing! Never I have heard such a powerful voice.': 'A ordem é "have I".', 'Amazing! Never heard I a voice.': 'Falta o auxiliar "have".' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', 'Was the place easy to find?'], ['B', '___']], options: ['Not at all. Not only was it far, but there were also no signs.', 'Not at all. Not only it was far, but no signs.', 'Not at all. Only not far, no signs.'], answer: 'Not at all. Not only was it far, but there were also no signs.', pt: 'Nem um pouco. Não só era longe, como também não tinha placas.', why: 'Not only + was it, but … also.', wrong: { 'Not at all. Not only it was far, but no signs.': 'Falta a inversão e o verbo.', 'Not at all. Only not far, no signs.': 'Estrutura errada.' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'Did you get there on time?'], ['B', '___']], options: ['Just! No sooner had we arrived than the show started.', 'Just! No sooner we arrived then the show started.', 'Just! Hardly we arrived, show started.'], answer: 'Just! No sooner had we arrived than the show started.', pt: 'Por pouco! Mal chegamos e o show começou.', why: 'No sooner had … than.', wrong: { 'Just! No sooner we arrived then the show started.': 'Falta "had" e é "than".', 'Just! Hardly we arrived, show started.': 'Falta inversão e "when".' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'Would you go again?'], ['B', '___']], options: ['Definitely. Little did I know it would be the best night of the year.', 'Definitely. Little I knew it would be the best night.', 'Definitely. Little know I the best night.'], answer: 'Definitely. Little did I know it would be the best night of the year.', pt: 'Com certeza. Mal sabia eu que seria a melhor noite do ano.', why: 'Little did I know + would.', wrong: { 'Definitely. Little I knew it would be the best night.': 'Falta a inversão com "did".', 'Definitely. Little know I the best night.': 'Estrutura errada.' } }),
      I(7, 5, { type: 'speak', en: 'Never have I seen anything like it.', pt: 'Nunca vi nada parecido.', why: 'Frase muito usada para elogiar algo.' }),
      I(7, 6, { type: 'speak', en: 'Not only was it fun, it was cheap too.', pt: 'Não só foi divertido, como também foi barato.', why: 'Treine o ritmo de "not only … but also".' }),
    ]),
    L(8, 'Lendo: o discurso do prêmio', [
      I(8, 1, { type: 'story', why: 'A Carla ganhou um prêmio de jornalismo e faz um discurso cheio de inversões. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que a Carla diz sobre o prêmio?', options: ['Nunca imaginou que ganharia', 'Já esperava ganhar', 'Não queria o prêmio'], answer: 'Nunca imaginou que ganharia', why: '"Never have I imagined…"' }),
      I(8, 3, { type: 'quiz', q: 'O que aconteceu logo depois que ela publicou a matéria?', options: ['O telefone começou a tocar', 'Ela foi demitida', 'Ninguém leu'], answer: 'O telefone começou a tocar', why: '"No sooner had I published it than my phone started ringing."' }),
      I(8, 4, { type: 'quiz', q: 'O que ela pede aos jovens jornalistas?', options: ['Que nunca desistam da verdade', 'Que trabalhem menos', 'Que mudem de profissão'], answer: 'Que nunca desistam da verdade', why: '"Under no circumstances should you give up on the truth."' }),
    ], {
      title: 'O discurso do prêmio',
      lines: [
        { who: 'Carla', en: 'Thank you all so much. Never have I imagined that I would be standing here tonight.', pt: 'Muito obrigada a todos. Nunca imaginei que estaria aqui hoje à noite.' },
        { who: 'Carla', en: 'Three years ago, little did I know that one small story would change my life.', pt: 'Há três anos, mal sabia eu que uma pequena matéria mudaria a minha vida.' },
        { ask: 'Quando a história dela começou?', options: ['Há três anos', 'No ano passado', 'Há dez anos'], answer: 'Há três anos', why: '"Three years ago."' },
        { who: 'Carla', en: 'No sooner had I published it ___ my phone started ringing.', pt: 'Mal publiquei a matéria e o meu telefone começou a tocar.', gap: { answer: 'than', options: ['than', 'when', 'then'] } },
        { who: 'Carla', en: 'Not only did people read it, but they also started asking questions.', pt: 'As pessoas não só leram, como também começaram a fazer perguntas.' },
        { who: 'Carla', en: 'To the young journalists here: under no circumstances should you give up on the truth.', pt: 'Aos jovens jornalistas aqui: em hipótese alguma desistam da verdade.' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'Hardly ___ the door when the alarm went off.', pt: 'Mal abri a porta e o alarme disparou.', options: ['had I opened', 'I had opened', 'did I opened'], answer: 'had I opened', why: 'Hardly + had + I + particípio.', wrong: { 'I had opened': 'Falta a inversão.', 'did I opened': 'Depois de "did", o verbo fica na forma base, e aqui o tempo é past perfect.' } }),
      I(9, 2, { type: 'type', pt: 'Não só ela canta, como também dança.', answer: 'Not only does she sing, but she also dances.', accept: ['Not only does she sing but she also dances.', 'Not only does she sing, she also dances.'], why: 'Not only + does + she + verbo.' }),
      I(9, 3, { type: 'meaning', en: 'Rarely does he say thank you.', options: ['Ele raramente agradece.', 'Ele sempre agradece.', 'Ele nunca fala nada.'], answer: 'Ele raramente agradece.', why: 'Rarely + does + he + verbo.' }),
      I(9, 4, { type: 'dictation', en: 'Only then did we realise the danger.', why: 'Only then + did + we.' }),
      I(9, 5, { type: 'listen', en: 'Under no circumstances should you touch that.', options: ['Em hipótese alguma toque nisso.', 'Pode tocar nisso.', 'Toque nisso com cuidado.'], answer: 'Em hipótese alguma toque nisso.', why: 'Proibição forte.' }),
      I(9, 6, { type: 'build', pt: 'Nunca na vida eu trabalhei tanto.', answer: 'Never have I worked so hard', extra: ['I have', 'much'], display: 'Never have I worked so hard.', why: '"Work hard" = trabalhar muito. Never + have + I.' }),
    ]),
    L(10, 'História: o dia em que tudo deu errado', [
      I(10, 1, { type: 'story', why: 'O Rafael conta para a Júlia o dia mais caótico da vida dele. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'O que aconteceu quando o Rafael saiu de casa?', options: ['Começou a chover', 'O carro quebrou', 'Ele perdeu as chaves'], answer: 'Começou a chover', why: '"No sooner had I left home than it started pouring."' }),
      I(10, 3, { type: 'quiz', q: 'Por que a entrevista foi estranha?', options: ['O entrevistador era o homem com quem ele brigou no ônibus', 'Ele chegou atrasado', 'Ele esqueceu o currículo'], answer: 'O entrevistador era o homem com quem ele brigou no ônibus', why: '"The interviewer was the man from the bus!"' }),
      I(10, 4, { type: 'quiz', q: 'Como terminou a história?', options: ['Ele conseguiu o emprego', 'Ele desistiu da vaga', 'Ele foi embora antes do fim'], answer: 'Ele conseguiu o emprego', why: '"I got the job!"' }),
    ], {
      title: 'O dia em que tudo deu errado',
      lines: [
        { who: 'Rafael', en: 'Never have I had such a crazy day. No sooner had I left home than it started pouring.', pt: 'Nunca tive um dia tão louco. Mal saí de casa e começou a chover forte.' },
        { who: 'Julia', en: 'Oh no! And you had the job interview, right?', pt: 'Ah, não! E você tinha a entrevista de emprego, né?' },
        { who: 'Rafael', en: 'Exactly. Then, on the bus, a man took my seat and we had a big argument.', pt: 'Exatamente. Aí, no ônibus, um homem pegou o meu lugar e a gente discutiu feio.' },
        { ask: 'Onde o Rafael discutiu com o homem?', options: ['No ônibus', 'Na rua', 'No escritório'], answer: 'No ônibus', why: '"On the bus, a man took my seat."' },
        { who: 'Rafael', en: '___ did I know who he was. The interviewer was the man from the bus!', pt: 'Mal sabia eu quem ele era. O entrevistador era o homem do ônibus!', gap: { answer: 'Little', options: ['Little', 'Never', 'Only'] } },
        { who: 'Julia', en: "You're joking! So what happened?", pt: 'Você está brincando! E aí, o que aconteceu?' },
        { who: 'Rafael', en: 'He laughed, and not only did he forgive me, but he also gave me the job!', pt: 'Ele riu, e não só me perdoou, como também me deu o emprego!' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-c1u1', level: 'C1', unlock: 'c1-u1', title: 'Histórias com drama',
  intro: 'A Ana e o Tom começam a temporada avançada falando de como contar uma boa história.',
  lines: [
    { who: 'ana', en: "Welcome to a new season! I'm Ana, and this time we're going further.", pt: 'Bem-vindos a uma nova temporada! Eu sou a Ana, e desta vez vamos mais longe.' },
    { who: 'tom', en: "And I'm Tom. Today: how to tell a story that people remember.", pt: 'E eu sou o Tom. Hoje: como contar uma história de que as pessoas se lembrem.' },
    { who: 'ana', en: 'One trick is changing the word order. Instead of "I have never seen", you say "Never have I seen".', pt: 'Um truque é a inversão. Em vez de "I have never seen", você diz "Never have I seen".' },
    { who: 'tom', en: 'It sounds dramatic. Little did I know, when I was young, how useful it would be.', pt: 'Soa dramático. Mal sabia eu, quando era novo, o quanto isso seria útil.' },
    { who: 'ana', en: 'But be careful: not only is it formal, but it can also sound strange in a casual chat.', pt: 'Mas cuidado: não só é formal, como também pode soar estranho num papo casual.' },
    { who: 'tom', en: 'Right. Use it in speeches, stories and writing, not when ordering a coffee!', pt: 'Isso. Use em discursos, histórias e textos, não na hora de pedir um café!' },
    { who: 'tom', en: 'And practise with your own stories. It works!', pt: 'E pratiquem com as suas próprias histórias. Funciona!' },
    { who: 'ana', en: "Exactly. See you next time, and never stop telling stories!", pt: 'Exatamente. Até a próxima, e nunca parem de contar histórias!' },
  ],
  questions: [
    { q: 'Qual é o assunto do episódio?', options: ['Como contar uma boa história', 'Como pedir um café', 'Como escrever um e-mail'], answer: 'Como contar uma boa história', why: '"How to tell a story that people remember."' },
    { q: 'Qual truque a Ana ensina?', options: ['A inversão', 'Falar mais rápido', 'Usar gírias'], answer: 'A inversão', why: '"One trick is inversion."' },
    { q: 'Onde NÃO é bom usar a inversão, segundo o Tom?', options: ['Ao pedir um café', 'Em discursos', 'Em textos'], answer: 'Ao pedir um café', why: '"Not when ordering a coffee!"' },
  ],
}, 'pod-b2u16');
addScene('c1-u1', 'standing-1', 'mic');
