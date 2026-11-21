// Etapa 2 do A2 completo: unidade nova 9 — Saúde e conselhos (should / shouldn't).
// Gera src/content/a2/unit-09.json. Todas as lições levam "added": para quem já passou do A2
// elas aparecem como NOVAS (opcionais) e não travam a trilha.
// Uso: node scripts/content-add/a2-u9.mjs  (pode rodar de novo: reescreve a unidade)
import { writeUnit, addPodcast, addScene } from './lib.mjs';

const L = (n, title, items, story) => ({ id: `a2-u9-l${n}`, title, ...(story ? { story } : {}), items });
const I = (n, k, o) => ({ id: `a2u9l${n}-${k}`, ...o });

writeUnit('a2/unit-09.json', {
  id: 'a2-u9', level: 'A2', order: 9,
  title: 'Saúde e conselhos',
  subtitle: 'Dizer o que você está sentindo e dar conselhos com should.',
  can_do: {
    text: 'Consigo dizer o que estou sentindo, marcar uma consulta e dar ou pedir conselhos simples.',
    source: 'CEFR (Conselho da Europa) — Interação oral: transações simples (médico, farmácia) e dar conselhos, nível A2',
  },
  core_inventory: ['Topics: health and the body', 'Grammar: should / shouldn\'t (advice)', 'Functions: saying how you feel (I have a headache, I feel ill)', 'Functions: making an appointment'],
  words: [
    ['headache', 'dor de cabeça'],
    ['stomachache', 'dor de barriga, dor de estômago'],
    ['toothache', 'dor de dente'],
    ['fever', 'febre'],
    ['temperature', 'temperatura, febre'],
    ['medicine', 'remédio'],
    ['pill', 'comprimido'],
    ['dentist', 'dentista'],
    ['appointment', 'consulta, horário marcado'],
    ['advice', 'conselho(s)'],
    ['should', 'deveria (conselho)'],
    ["shouldn't", 'não deveria'],
    ['hurt', 'doer, machucar'],
    ['ill / sick', 'doente / doente, enjoado'],
    ['better / worse', 'melhor / pior'],
    ['accident', 'acidente'],
  ],
  guide: {
    title: 'Saúde: o que você sente e o que deveria fazer',
    intro: 'Para falar de saúde em inglês, quase tudo começa com "I have a..." (eu estou com...) ou "My ... hurts" (meu ... dói). Para dar conselho, usamos "should": é o nosso "você deveria".',
    points: [
      { en: 'I have a headache.', pt: 'Estou com dor de cabeça.', note: 'Dor em inglês é "have a ...ache": headache, stomachache, toothache. Repare no "a".' },
      { en: 'My back hurts.', pt: 'Minhas costas doem.', note: '"Hurt" = doer. Com uma parte do corpo (it), é "hurts".' },
      { en: 'You should see a doctor.', pt: 'Você deveria ir ao médico.', note: '"Should" + verbo normal = conselho. Não leva "to": should see, e nunca "should to see".' },
      { en: "You shouldn't eat so much sugar.", pt: 'Você não deveria comer tanto açúcar.', note: '"Shouldn\'t" = should not. O "l" é mudo: "XÚ-dant".' },
      { en: 'What should I do?', pt: 'O que eu deveria fazer?', note: 'Na pergunta, "should" vem antes da pessoa.' },
      { en: "I'd like to make an appointment.", pt: 'Eu gostaria de marcar uma consulta.', note: '"Make an appointment" = marcar consulta ou horário.' },
    ],
    tips: ['"I feel ill" e "I feel sick" valem para "estou doente". "Sick" também pode ser enjoado (vontade de vomitar).', '"Have a temperature" = estar com febre (no inglês britânico). "Have a fever" também vale.'],
  },
  extra_vocab: [{ word: 'pharmacy', reason: 'lugar essencial em situação de saúde (B1); aparece poucas vezes, sempre com tradução' }],
  lessons: [
    L(1, 'O que você tem?', [
      I(1, 1, { type: 'match', pairs: [['headache', 'dor de cabeça'], ['stomachache', 'dor de barriga'], ['toothache', 'dor de dente'], ['fever', 'febre']], why: 'Head (cabeça) + ache (dor) = headache. Stomach + ache, tooth + ache: a mesma ideia.' }),
      I(1, 2, { type: 'choice', prompt: 'Complete:', en: 'I ___ a headache.', pt: 'Estou com dor de cabeça.', options: ['have', 'am', 'feel'], answer: 'have', why: 'Em inglês a dor a gente "tem": I have a headache.', wrong: { am: '"I am a headache" diria que você É uma dor de cabeça!', feel: '"Feel" vai com adjetivo: I feel ill.' } }),
      I(1, 3, { type: 'meaning', en: 'My son is ill. He has a temperature.', options: ['Meu filho está doente. Ele está com febre.', 'Meu filho está cansado. Ele está com frio.', 'Meu filho está bem. Ele está na escola.'], answer: 'Meu filho está doente. Ele está com febre.', why: '"Ill" = doente. "Have a temperature" = estar com febre.' }),
      I(1, 4, { type: 'listen', en: 'I have a toothache.', options: ['Estou com dor de dente.', 'Estou com dor de cabeça.', 'Estou com dor de barriga.'], answer: 'Estou com dor de dente.', why: '"Tooth" = dente. "Toothache" soa como "TÚUTH-êik".' }),
      I(1, 5, { type: 'build', pt: 'Ela está com dor de barriga.', answer: 'She has a stomachache', extra: ['have', 'is'], display: 'She has a stomachache.', why: 'Com she é "has". "Stomachache" soa como "STÂ-mak-êik".' }),
      I(1, 6, { type: 'choice', prompt: 'Complete:', en: "I don't feel well. I think I'm ___.", pt: 'Não estou me sentindo bem. Acho que estou doente.', options: ['sick', 'happy', 'hungry'], answer: 'sick', why: '"Sick" ou "ill" = doente.', wrong: { happy: 'Quem não se sente bem não está "happy" (feliz).', hungry: '"Hungry" é com fome.' } }),
    ]),
    L(2, 'Dói aqui', [
      I(2, 1, { type: 'match', pairs: [['hurt', 'doer'], ['medicine', 'remédio'], ['pill', 'comprimido'], ['accident', 'acidente']], why: '"Hurt" é irregular, mas fácil: o passado também é "hurt".' }),
      I(2, 2, { type: 'choice', prompt: 'Complete:', en: 'My leg ___.', pt: 'Minha perna dói.', options: ['hurts', 'hurt', 'is hurt'], answer: 'hurts', why: '"My leg" = it, então o verbo leva -s: hurts.', wrong: { hurt: 'Com it (my leg) precisa do -s: hurts.', 'is hurt': 'Para dor agora, o natural é "my leg hurts".' } }),
      I(2, 3, { type: 'choice', prompt: 'Complete:', en: 'My eyes ___.', pt: 'Meus olhos estão doendo.', options: ['hurt', 'hurts', 'hurting'], answer: 'hurt', why: '"My eyes" é plural (they): hurt, sem -s.', wrong: { hurts: 'Plural não leva -s no verbo.', hurting: 'Sozinho, "hurting" não forma frase. Seria "are hurting".' } }),
      I(2, 4, { type: 'meaning', en: 'Take one pill after lunch.', options: ['Tome um comprimido depois do almoço.', 'Tome um remédio antes do almoço.', 'Não almoce depois do comprimido.'], answer: 'Tome um comprimido depois do almoço.', why: '"Take a pill" = tomar um comprimido. "After" = depois.' }),
      I(2, 5, { type: 'dialogue', lines: [['A', 'Where does it hurt?'], ['B', '___']], options: ['Here, in my back.', 'Yes, it hurts.', 'I hurt yesterday.'], answer: 'Here, in my back.', pt: 'Aqui, nas costas.', why: '"Where" pergunta o lugar. Mostre onde: Here, in my back.', wrong: { 'Yes, it hurts.': '"Where" não se responde com sim ou não.', 'I hurt yesterday.': 'Não diz onde dói.' } }),
      I(2, 6, { type: 'build', pt: 'Ele teve um acidente de bicicleta.', answer: 'He had an accident on his bike', extra: ['has', 'with'], display: 'He had an accident on his bike.', why: '"Have an accident" = sofrer um acidente. No passado: had. "On his bike" = de bicicleta.' }),
    ]),
    L(3, 'Você deveria...', [
      I(3, 1, { type: 'choice', prompt: 'Complete:', en: 'You have a fever. You ___ see a doctor.', pt: 'Você está com febre. Você deveria ir ao médico.', options: ['should', "shouldn't", 'should to'], answer: 'should', why: '"Should" + verbo = conselho: você deveria.', wrong: { "shouldn't": 'Com febre, ir ao médico é o conselho certo, não o contrário.', 'should to': 'Depois de "should" não vai "to".' } }),
      I(3, 2, { type: 'choice', prompt: 'Complete:', en: 'You ___ go to work today. You are ill.', pt: 'Você não deveria ir trabalhar hoje. Você está doente.', options: ["shouldn't", 'should', "don't should"], answer: "shouldn't", why: '"Shouldn\'t" = não deveria.', wrong: { should: 'Doente, o conselho é ficar em casa: shouldn\'t go.', "don't should": 'Não existe. A negativa é "shouldn\'t".' } }),
      I(3, 3, { type: 'meaning', en: 'You should drink a lot of water.', options: ['Você deveria beber bastante água.', 'Você bebe muita água.', 'Você não deveria beber água.'], answer: 'Você deveria beber bastante água.', why: '"Should drink" = deveria beber. "A lot of" = bastante.' }),
      I(3, 4, { type: 'build', pt: 'O que eu deveria fazer?', answer: 'What should I do', extra: ['does', 'to'], display: 'What should I do?', why: 'Pergunta: What + should + I + verbo. Depois de "should" o verbo fica normal: do.' }),
      I(3, 5, { type: 'choice', prompt: 'Qual é o melhor conselho para dor de dente?', en: 'You should ___.', pt: 'Você deveria ir ao dentista.', options: ['see a dentist', 'eat more sweets', 'go to the beach'], answer: 'see a dentist', why: '"See a dentist" = ir ao dentista (literalmente, ver um dentista).', wrong: { 'eat more sweets': 'Doce é o que você NÃO deveria comer!', 'go to the beach': 'Não resolve a dor de dente.' } }),
      I(3, 6, { type: 'speak', en: 'You should go to bed early.', pt: 'Você deveria ir dormir cedo.', why: '"Should" soa como "XÚD": o "l" é mudo.' }),
      I(3, 7, { type: 'dialogue', lines: [['A', 'I always feel tired.'], ['B', '___']], options: ['Maybe you should sleep more.', 'Maybe you should to sleep more.', 'Maybe you sleep should more.'], answer: 'Maybe you should sleep more.', pt: 'Talvez você devesse dormir mais.', why: '"Maybe you should..." é um jeito gentil de dar conselho.', wrong: { 'Maybe you should to sleep more.': 'Sem "to" depois de should.', 'Maybe you sleep should more.': '"Should" vem antes do verbo.' } }),
    ]),
    L(4, 'Prática: melhor ou pior?', [
      I(4, 1, { type: 'match', pairs: [['better', 'melhor'], ['worse', 'pior'], ['advice', 'conselho'], ['appointment', 'consulta']], why: '"Advice" não tem plural: some advice (alguns conselhos), nunca "advices".' }),
      I(4, 2, { type: 'choice', prompt: 'Complete:', en: 'I took the medicine and now I feel ___.', pt: 'Tomei o remédio e agora me sinto melhor.', options: ['better', 'worse', 'good'], answer: 'better', why: '"Feel better" = sentir-se melhor. É o comparativo de "good/well".', wrong: { worse: 'Depois do remédio, a gente espera melhorar, não piorar.', good: 'Comparando com antes, o certo é "better".' } }),
      I(4, 3, { type: 'choice', prompt: 'Complete:', en: 'Can you give me some ___?', pt: 'Você pode me dar um conselho?', options: ['advice', 'advices', 'an advice'], answer: 'advice', why: '"Advice" não se conta: some advice. Para "um conselho", diga "a piece of advice".', wrong: { advices: '"Advice" não tem plural.', 'an advice': 'Não se usa "an" com advice.' } }),
      I(4, 4, { type: 'meaning', en: 'My cold is getting worse.', options: ['Meu resfriado está piorando.', 'Meu resfriado está melhorando.', 'Estou com frio na rua.'], answer: 'Meu resfriado está piorando.', why: '"A cold" = um resfriado. "Getting worse" = ficando pior.' }),
      I(4, 5, { type: 'build', pt: 'Você não deveria comer tanto açúcar.', answer: "You shouldn't eat so much sugar", extra: ['many', 'should'], display: "You shouldn't eat so much sugar.", why: '"So much" = tanto (para o que não se conta, como açúcar).' }),
      I(4, 6, { type: 'dialogue', lines: [['A', 'How are you today?'], ['B', '___']], options: ["Much better, thanks!", 'Much good, thanks!', 'More better, thanks!'], answer: 'Much better, thanks!', pt: 'Bem melhor, obrigado!', why: '"Much better" = bem melhor. "Much" reforça o comparativo.', wrong: { 'Much good, thanks!': 'Faltou o comparativo: better.', 'More better, thanks!': '"Better" já é comparativo; não leva "more".' } }),
      I(4, 7, { type: 'choice', prompt: 'Complete:', en: 'You ___ smoke. It is bad for you.', pt: 'Você não deveria fumar. Faz mal para você.', options: ["shouldn't", 'should', 'can'], answer: "shouldn't", why: 'Conselho negativo: shouldn\'t. "Bad for you" = faz mal para você.', wrong: { should: 'Fumar faz mal: o conselho é não fumar.', can: '"Can" seria "você pode fumar".' } }),
    ]),
    L(5, 'Escrevendo', [
      I(5, 1, { type: 'type', pt: 'Estou com dor de cabeça.', answer: 'I have a headache.', why: 'Dor = "have a ...ache". Não esqueça o "a".' }),
      I(5, 2, { type: 'type', pt: 'Você deveria descansar.', answer: 'You should relax.', accept: ['You should take a break.'], why: '"Should" + verbo normal. "Relax" = descansar, relaxar.' }),
      I(5, 3, { type: 'dictation', en: 'My stomach hurts.', why: '"Stomach" soa como "STÂ-mak". "Hurts" com -s porque é "it".' }),
      I(5, 4, { type: 'type', pt: 'Ela está doente hoje.', answer: 'She is ill today.', accept: ['She is sick today.', "She's ill today.", "She's sick today."], why: '"Ill" ou "sick" = doente.' }),
      I(5, 5, { type: 'dictation', en: 'You should see a dentist.', why: '"See a dentist" = ir ao dentista.' }),
      I(5, 6, { type: 'type', pt: 'Eu me sinto melhor agora.', answer: 'I feel better now.', why: '"Feel better" = sentir-se melhor.' }),
    ]),
    L(6, 'Ouvindo', [
      I(6, 1, { type: 'listen', en: "You shouldn't go out with a fever.", options: ['Você não deveria sair com febre.', 'Você deveria sair, mesmo com febre.', 'Você está com febre hoje?'], answer: 'Você não deveria sair com febre.', why: '"Shouldn\'t" soa como "XÚ-dant". "Go out" = sair.' }),
      I(6, 2, { type: 'dictation', en: 'Take this medicine twice a day.', why: '"Twice a day" = duas vezes por dia.' }),
      I(6, 3, { type: 'listen', en: 'I have an appointment at three.', options: ['Tenho uma consulta às três.', 'Tenho três consultas hoje.', 'Tenho uma reunião às dez.'], answer: 'Tenho uma consulta às três.', why: '"Appointment" = consulta, horário marcado.' }),
      I(6, 4, { type: 'dictation', en: 'My head hurts a lot.', why: '"Head" = cabeça. "A lot" = muito.' }),
      I(6, 5, { type: 'listen', en: 'Is it getting better or worse?', options: ['Está melhorando ou piorando?', 'Está bom ou ruim?', 'Você está melhor hoje?'], answer: 'Está melhorando ou piorando?', why: '"Getting better" = melhorando. "Getting worse" = piorando.' }),
      I(6, 6, { type: 'dictation', en: 'He had an accident at work.', why: '"Had an accident" = sofreu um acidente.' }),
      I(6, 7, { type: 'speak', en: 'I think you should see a doctor.', pt: 'Acho que você deveria ir ao médico.', why: '"I think you should..." deixa o conselho mais gentil.' }),
    ]),
    L(7, 'Conversa de verdade', [
      I(7, 1, { type: 'dialogue', lines: [['A', "Doctor's office. Can I help you?"], ['B', '___']], options: ["I'd like to make an appointment, please.", 'I want a doctor now.', 'I make an appointment.'], answer: "I'd like to make an appointment, please.", pt: 'Eu gostaria de marcar uma consulta, por favor.', why: '"I\'d like to" é o jeito educado de pedir. "Make an appointment" = marcar consulta.', wrong: { 'I want a doctor now.': 'Fica grosseiro. Prefira "I\'d like to...".', 'I make an appointment.': 'Isso descreve um hábito, não é um pedido.' } }),
      I(7, 2, { type: 'dialogue', lines: [['A', "What's the matter?"], ['B', '___']], options: ['I have a terrible headache.', "It's three o'clock.", "I'm fine, thank you."], answer: 'I have a terrible headache.', pt: 'Estou com uma dor de cabeça terrível.', why: '"What\'s the matter?" = qual é o problema? (no médico: o que você está sentindo?).', wrong: { "It's three o'clock.": 'Isso responde as horas.', "I'm fine, thank you.": 'Quem está no médico normalmente não está bem!' } }),
      I(7, 3, { type: 'dialogue', lines: [['A', 'How long have you felt like this?'], ['B', '___']], options: ['Since Monday.', 'On Monday.', 'Next Monday.'], answer: 'Since Monday.', pt: 'Desde segunda.', why: '"Since" = desde. Responde "há quanto tempo".', wrong: { 'On Monday.': 'Diz só um dia, não desde quando.', 'Next Monday.': 'É futuro: segunda que vem.' } }),
      I(7, 4, { type: 'dialogue', lines: [['A', 'You should stay in bed for two days.'], ['B', '___']], options: ['OK. Should I take any medicine?', 'OK. Should I to take any medicine?', 'OK. I should take medicine yesterday?'], answer: 'OK. Should I take any medicine?', pt: 'Certo. Eu deveria tomar algum remédio?', why: 'Pergunta com should: Should + I + verbo?', wrong: { 'OK. Should I to take any medicine?': 'Sem "to" depois de should.', 'OK. I should take medicine yesterday?': '"Yesterday" não combina com um conselho para agora.' } }),
      I(7, 5, { type: 'speak', en: "I'd like to make an appointment.", pt: 'Eu gostaria de marcar uma consulta.', why: '"Appointment" soa como "a-PÓINT-ment".' }),
      I(7, 6, { type: 'speak', en: 'My back hurts.', pt: 'Minhas costas doem.', why: '"Hurts" soa como "RÂRTS", com o h aspirado.' }),
    ]),
    L(8, 'Lendo: o recado da Rita', [
      I(8, 1, { type: 'story', why: 'A Rita deixa um recado com conselhos para o irmão, que está doente. Leia com calma e ouça cada frase.' }),
      I(8, 2, { type: 'quiz', q: 'O que o Leo está sentindo?', options: ['Febre e dor de cabeça', 'Dor de dente', 'Dor nas costas'], answer: 'Febre e dor de cabeça', why: '"You have a fever and a headache."' }),
      I(8, 3, { type: 'quiz', q: 'Quando ele deve tomar o comprimido?', options: ['Depois do almoço', 'Antes de dormir', 'Agora mesmo'], answer: 'Depois do almoço', why: '"Take one pill after lunch."' }),
      I(8, 4, { type: 'quiz', q: 'Se ele piorar, o que deve fazer?', options: ['Ligar para a Rita', 'Ir trabalhar', 'Comer doce'], answer: 'Ligar para a Rita', why: '"If you feel worse, call me."' }),
    ], {
      title: 'O recado da Rita',
      lines: [
        { who: 'Rita', en: 'Leo, I went to work. Here is some advice for you.', pt: 'Leo, fui trabalhar. Aqui vão uns conselhos para você.' },
        { who: 'Rita', en: 'You have a fever and a headache, so you should stay in bed.', pt: 'Você está com febre e dor de cabeça, então deveria ficar na cama.' },
        { ask: 'Por que o Leo deve ficar na cama?', options: ['Está com febre e dor de cabeça', 'Está de férias', 'Está cansado do trabalho'], answer: 'Está com febre e dor de cabeça', why: '"You have a fever and a headache."' },
        { who: 'Rita', en: 'Take one pill after lunch. The medicine is in the kitchen.', pt: 'Tome um comprimido depois do almoço. O remédio está na cozinha.' },
        { who: 'Rita', en: 'You ___ watch TV all day. Try to sleep!', pt: 'Você não deveria ver TV o dia todo. Tente dormir!', gap: { answer: "shouldn't", options: ["shouldn't", 'should', 'can'] } },
        { who: 'Rita', en: 'If you feel worse, call me. I hope you feel better soon!', pt: 'Se você piorar, me liga. Espero que você melhore logo!' },
      ],
    }),
    L(9, 'Desafio da unidade', [
      I(9, 1, { type: 'choice', prompt: 'Complete:', en: 'She has a toothache. She ___ see a dentist.', pt: 'Ela está com dor de dente. Ela deveria ir ao dentista.', options: ['should', 'should to', 'shoulds'], answer: 'should', why: '"Should" é igual para todas as pessoas: she should (sem -s).', wrong: { 'should to': 'Sem "to".', shoulds: '"Should" nunca leva -s.' } }),
      I(9, 2, { type: 'type', pt: 'Meu braço dói.', answer: 'My arm hurts.', why: '"My arm" = it, então "hurts" com -s.' }),
      I(9, 3, { type: 'meaning', en: "You shouldn't carry heavy bags with a bad back.", options: ['Você não deveria carregar sacolas pesadas com dor nas costas.', 'Você deveria carregar sacolas leves.', 'Suas costas estão melhores hoje.'], answer: 'Você não deveria carregar sacolas pesadas com dor nas costas.', why: '"Carry" = carregar. "A bad back" = problema nas costas.' }),
      I(9, 4, { type: 'dictation', en: 'Should I take a pill?', why: 'Pergunta: Should + I + verbo.' }),
      I(9, 5, { type: 'listen', en: 'I feel much better today.', options: ['Eu me sinto bem melhor hoje.', 'Eu me sinto muito mal hoje.', 'Eu me sinto como ontem.'], answer: 'Eu me sinto bem melhor hoje.', why: '"Much better" = bem melhor.' }),
      I(9, 6, { type: 'build', pt: 'Eu gostaria de marcar uma consulta para amanhã.', answer: "I'd like to make an appointment for tomorrow", extra: ['do', 'want'], display: "I'd like to make an appointment for tomorrow.", why: 'Com "appointment" o verbo é "make", não "do".' }),
    ]),
    L(10, 'História: no consultório', [
      I(10, 1, { type: 'story', why: 'O Marcos vai ao médico. Ouça cada fala e responda às perguntas no caminho.' }),
      I(10, 2, { type: 'quiz', q: 'Desde quando o Marcos se sente mal?', options: ['Desde sábado', 'Desde ontem', 'Há um mês'], answer: 'Desde sábado', why: '"Since Saturday" = desde sábado.' }),
      I(10, 3, { type: 'quiz', q: 'O que a médica diz que ele não deveria fazer?', options: ['Ir trabalhar por dois dias', 'Beber água', 'Dormir muito'], answer: 'Ir trabalhar por dois dias', why: '"You shouldn\'t go to work for two days."' }),
      I(10, 4, { type: 'quiz', q: 'O que ele deve beber?', options: ['Bastante água', 'Café', 'Nada'], answer: 'Bastante água', why: '"Drink a lot of water."' }),
    ], {
      title: 'No consultório',
      lines: [
        { who: 'Sarah', en: 'Good morning, Marcos. What seems to be the problem?', pt: 'Bom dia, Marcos. Qual parece ser o problema?' },
        { who: 'Marcos', en: "I feel awful. I have a bad headache and my back hurts.", pt: 'Estou péssimo. Estou com uma dor de cabeça forte e minhas costas doem.' },
        { who: 'Sarah', en: 'How long have you felt like this?', pt: 'Há quanto tempo você se sente assim?' },
        { who: 'Marcos', en: '___ Saturday.', pt: 'Desde sábado.', gap: { answer: 'Since', options: ['Since', 'On', 'Next'] } },
        { who: 'Sarah', en: 'You have a temperature. You should stay at home and relax.', pt: 'Você está com febre. Você deveria ficar em casa descansando.' },
        { ask: 'O que a médica descobre?', options: ['Ele está com febre', 'Ele quebrou o braço', 'Ele está ótimo'], answer: 'Ele está com febre', why: '"You have a temperature" = você está com febre.' },
        { who: 'Sarah', en: "You shouldn't go to work for two days. And drink a lot of water.", pt: 'Você não deveria ir trabalhar por dois dias. E beba bastante água.' },
        { who: 'Marcos', en: 'Thank you, doctor. Should I take any medicine?', pt: 'Obrigado, doutora. Devo tomar algum remédio?' },
        { who: 'Sarah', en: 'Yes. Take one pill every eight hours.', pt: 'Sim. Tome um comprimido a cada oito horas.' },
      ],
    }),
  ],
});

addPodcast({
  id: 'pod-a2u9', level: 'A2', unlock: 'a2-u9', title: 'Conselhos para uma vida saudável',
  intro: 'A Ana e o Tom trocam conselhos simples para ficar com saúde.',
  lines: [
    { who: 'ana', en: "Hi everyone! Welcome to the podcast. I'm Ana.", pt: 'Oi, pessoal! Bem-vindos ao podcast. Eu sou a Ana.' },
    { who: 'tom', en: "And I'm Tom. Today we're talking about health.", pt: 'E eu sou o Tom. Hoje vamos falar de saúde.' },
    { who: 'ana', en: 'Tom, you look tired. Are you OK?', pt: 'Tom, você parece cansado. Está tudo bem?' },
    { who: 'tom', en: "I have a headache. I didn't sleep well last night.", pt: 'Estou com dor de cabeça. Não dormi bem ontem à noite.' },
    { who: 'ana', en: "You shouldn't look at your phone before bed.", pt: 'Você não deveria olhar o celular antes de dormir.' },
    { who: 'tom', en: "You're right. What else should I do?", pt: 'Você tem razão. O que mais eu deveria fazer?' },
    { who: 'ana', en: 'You should drink more water and walk every day.', pt: 'Você deveria beber mais água e caminhar todo dia.' },
    { who: 'tom', en: 'Good advice! And you should eat less chocolate, Ana!', pt: 'Bom conselho! E você deveria comer menos chocolate, Ana!' },
    { who: 'ana', en: "Ha! Maybe. That's all for today. Thank you for listening!", pt: 'Rá! Talvez. Por hoje é só. Obrigada por ouvir!' },
    { who: 'tom', en: 'Bye! Take care!', pt: 'Tchau! Se cuidem!' },
  ],
  questions: [
    { q: 'Por que o Tom está com dor de cabeça?', options: ['Não dormiu bem', 'Comeu demais', 'Teve um acidente'], answer: 'Não dormiu bem', why: '"I didn\'t sleep well last night."' },
    { q: 'O que a Ana diz que ele não deveria fazer?', options: ['Olhar o celular antes de dormir', 'Beber água', 'Caminhar'], answer: 'Olhar o celular antes de dormir', why: '"You shouldn\'t look at your phone before bed."' },
    { q: 'Qual conselho o Tom dá para a Ana?', options: ['Comer menos chocolate', 'Dormir mais', 'Ir ao médico'], answer: 'Comer menos chocolate', why: '"You should eat less chocolate, Ana!"' },
  ],
}, 'pod-a2u8');
addScene('a2-u9', 'sitting-5', 'mug');
