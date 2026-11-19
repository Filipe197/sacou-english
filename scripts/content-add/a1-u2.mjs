// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 2 (Fale sobre você).
// Uso: node scripts/content-add/a1-u2.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-02.json', {
  words: [
    ['job', 'trabalho / profissão'],
    ['actor', 'ator'],
    ['singer', 'cantor(a)'],
    ['driver', 'motorista'],
    ['farmer', 'fazendeiro(a)'],
    ['waiter', 'garçom'],
    ['writer', 'escritor(a)'],
    ['famous', 'famoso(a)'],
  ],
  lessons: [
    { after: 'a1-u2-l3', lesson: {
      id: 'a1-u2-l8', title: 'Mais profissões', items: [
        { id: 'a1u2l8-1', type: 'match', pairs: [['actor', 'ator'], ['singer', 'cantor(a)'], ['driver', 'motorista'], ['farmer', 'fazendeiro(a)']], why: 'Muitas profissões terminam em -er ou -or: quem canta (sing) é "singer", quem dirige (drive) é "driver".' },
        { id: 'a1u2l8-2', type: 'choice', prompt: 'Complete com a ou an:', en: 'She is ___ actor.', pt: 'Ela é atriz.', options: ['an', 'a', 'the'], answer: 'an', why: '"Actor" começa com som de vogal, então usamos "an". Em inglês a profissão sempre leva a/an: she is AN actor.', wrong: { a: '"A" vai antes de som de consoante (a singer). "Actor" começa com vogal.', the: '"The" é "o/a" específico. Para dizer a profissão usamos a/an.' } },
        { id: 'a1u2l8-3', type: 'meaning', en: 'What is your job?', options: ['Qual é a sua profissão?', 'Qual é o seu nome?', 'De onde você é?'], answer: 'Qual é a sua profissão?', why: '"Job" = trabalho, profissão. "What is your job?" é o jeito simples de perguntar o que a pessoa faz.' },
        { id: 'a1u2l8-4', type: 'build', pt: 'Ele é garçom.', answer: 'He is a waiter', extra: ['an', 'she'], display: 'He is a waiter.', why: 'Ele = he, é = is, e a profissão vem com "a": a waiter. Em português não usamos o artigo, em inglês ele é obrigatório.' },
        { id: 'a1u2l8-5', type: 'choice', prompt: 'Complete:', en: 'I ___ a writer.', pt: 'Eu sou escritor.', options: ['am', 'is', 'are'], answer: 'am', why: 'Com "I" o verbo to be é sempre "am": I am a writer.', wrong: { is: '"Is" vai com he, she e it.', are: '"Are" vai com you, we e they.' } },
        { id: 'a1u2l8-6', type: 'dialogue', lines: [['A', "What's your job?"], ['B', '___']], options: ["I'm a singer.", "I'm from Japan.", "I'm fine, thanks."], answer: "I'm a singer.", pt: 'Sou cantora.', why: 'A pergunta é sobre a profissão (job), então a resposta é "I\'m a/an + profissão".', wrong: { "I'm from Japan.": 'Isso responde "Where are you from?".', "I'm fine, thanks.": 'Isso responde "How are you?".' } },
        { id: 'a1u2l8-7', type: 'meaning', en: 'He is a famous actor.', options: ['Ele é um ator famoso.', 'Ele é um cantor famoso.', 'Ele é um motorista jovem.'], answer: 'Ele é um ator famoso.', why: 'Em inglês o adjetivo vem ANTES da palavra: famous actor = ator famoso.' },
      ],
    } },
    { after: 'a1-u2-l4', lesson: {
      id: 'a1-u2-l9', title: 'Ouvindo', items: [
        { id: 'a1u2l9-1', type: 'listen', en: 'I am a farmer.', options: ['Sou fazendeiro.', 'Sou motorista.', 'Sou garçom.'], answer: 'Sou fazendeiro.', why: '"Farmer" soa como "FÁR-mer". Vem de "farm", fazenda.' },
        { id: 'a1u2l9-2', type: 'dictation', en: 'What is your job?', why: '"Job" soa como "djób". Pergunta qual é a profissão da pessoa.' },
        { id: 'a1u2l9-3', type: 'listen', en: 'She is a famous singer.', options: ['Ela é uma cantora famosa.', 'Ela é uma atriz famosa.', 'Ela é uma motorista famosa.'], answer: 'Ela é uma cantora famosa.', why: '"Singer" soa como "SÍN-guer", sem o "g" forte no fim.' },
        { id: 'a1u2l9-4', type: 'dictation', en: 'I speak English.', accept: ['I speak english.'], why: '"Speak" = falar (um idioma). I speak English = eu falo inglês.' },
        { id: 'a1u2l9-5', type: 'listen', en: 'He is a driver from London.', options: ['Ele é motorista de Londres.', 'Ele é médico de Londres.', 'Ele é garçom do Brasil.'], answer: 'Ele é motorista de Londres.', why: '"Driver" = motorista. "From London" = de Londres.' },
        { id: 'a1u2l9-6', type: 'dictation', en: 'She is a writer.', why: '"Writer" soa como "RÁI-ter": o "w" no começo não é pronunciado.' },
        { id: 'a1u2l9-7', type: 'speak', en: 'I am a student from Brazil.', pt: 'Sou estudante do Brasil.', why: 'Fale "ai em a STIU-dent from bra-ZIL", com a força no fim de Brazil.' },
      ],
    } },
    { after: 'a1-u2-l5', lesson: {
      id: 'a1-u2-l10', title: 'Lendo: o perfil do Leo',
      story: {
        title: 'O perfil do Leo',
        lines: [
          { who: 'Leo', en: 'Hello! My name is Leo.', pt: 'Olá! Meu nome é Leo.' },
          { who: 'Leo', en: 'I am from Brazil. I am a student and a waiter.', pt: 'Sou do Brasil. Sou estudante e garçom.' },
          { ask: 'Qual é o trabalho do Leo?', options: ['Garçom', 'Ator', 'Motorista'], answer: 'Garçom', why: '"I am a student and a waiter" = sou estudante e garçom.' },
          { who: 'Leo', en: 'I speak English and I am a good cook.', pt: 'Eu falo inglês e sou um bom cozinheiro.' },
          { who: 'Leo', en: 'My friend Ana is a singer. She is ___ famous!', pt: 'Minha amiga Ana é cantora. Ela é muito famosa!', gap: { answer: 'very', options: ['very', 'an', 'from'] } },
          { ask: 'Quem é cantora?', options: ['A Ana', 'O Leo', 'A mãe do Leo'], answer: 'A Ana', why: '"My friend Ana is a singer" = minha amiga Ana é cantora.' },
          { who: 'Leo', en: 'What is your job? Nice to meet you!', pt: 'Qual é a sua profissão? Prazer em te conhecer!' },
        ],
      },
      items: [
        { id: 'a1u2l10-1', type: 'story', why: 'Leia o perfil com calma. Ouça cada frase e responda às perguntas no caminho.' },
        { id: 'a1u2l10-2', type: 'quiz', q: 'De onde o Leo é?', options: ['Do Brasil', 'De Londres', 'Do Japão'], answer: 'Do Brasil', why: '"I am from Brazil" = sou do Brasil.' },
        { id: 'a1u2l10-3', type: 'quiz', q: 'O que o Leo faz bem?', options: ['Cozinha', 'Canta', 'Dirige'], answer: 'Cozinha', why: '"I am a good cook" = sou um bom cozinheiro.' },
        { id: 'a1u2l10-4', type: 'quiz', q: 'Como é a Ana?', options: ['Muito famosa', 'Muito jovem', 'Muito cansada'], answer: 'Muito famosa', why: '"She is very famous" = ela é muito famosa.' },
      ],
    } },
  ],
});
