// Etapa 1 do A2 completo: 3 lições novas na unidade 6 (Planos para o futuro — going to e will).
// Uso: node scripts/content-add/a2-u6.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-06.json', {
  words: [
    ['hope', 'esperar (ter esperança), torcer'],
    ['dream', 'sonho, sonhar'],
    ['future', 'futuro'],
    ['soon', 'logo, em breve'],
    ['someday', 'algum dia'],
    ['abroad', 'no exterior, fora do país'],
    ['university', 'universidade, faculdade'],
    ['retire', 'se aposentar'],
    ['exam', 'prova, exame'],
    ['pass', 'passar (numa prova)'],
  ],
  lessons: [
    { after: 'a2-u6-l3', lesson: {
      id: 'a2-u6-l8', title: 'Sonhos e planos', items: [
        { id: 'a2u6l8-1', type: 'match', pairs: [['dream', 'sonho'], ['future', 'futuro'], ['soon', 'em breve'], ['abroad', 'no exterior']], why: '"Abroad" = fora do país. Não precisa de "to": I want to live abroad.' },
        { id: 'a2u6l8-2', type: 'choice', prompt: 'Complete:', en: "I'm going to ___ abroad next year.", pt: 'Vou morar fora do país no ano que vem.', options: ['live', 'living', 'lived'], answer: 'live', why: 'Going to + verbo na forma normal: going to live.', wrong: { living: 'Depois de "going to" vem o verbo normal, sem -ing.', lived: 'É um plano para o futuro, não passado.' } },
        { id: 'a2u6l8-3', type: 'choice', prompt: 'Complete:', en: 'I hope I ___ pass the exam.', pt: 'Espero passar na prova.', options: ['will', 'am', 'going'], answer: 'will', why: 'Depois de "I hope" é comum usar will para o futuro: I hope I will pass (ou I hope I pass).', wrong: { am: '"I am pass" não existe.', going: 'Faltaria "am ... to": I\'m going to pass.' } },
        { id: 'a2u6l8-4', type: 'choice', prompt: 'Complete:', en: 'She ___ going to study at university.', pt: 'Ela vai estudar na faculdade.', options: ['is', 'are', 'will'], answer: 'is', why: 'She + is + going to.', wrong: { are: 'Com "she" é "is".', will: '"Will going to" não existe. Ou "she will study" ou "she is going to study".' } },
        { id: 'a2u6l8-5', type: 'build', pt: 'Algum dia eu vou visitar o Japão.', answer: "Someday I'm going to visit Japan", extra: ['go', 'will'], display: "Someday I'm going to visit Japan.", why: '"Someday" = algum dia. Plano: I\'m going to + verbo.' },
        { id: 'a2u6l8-6', type: 'meaning', en: "My grandpa is going to retire soon.", options: ['Meu avô vai se aposentar em breve.', 'Meu avô se aposentou faz pouco tempo.', 'Meu avô vai viajar em breve.'], answer: 'Meu avô vai se aposentar em breve.', why: '"Retire" = se aposentar. "Soon" = em breve.' },
        { id: 'a2u6l8-7', type: 'dialogue', lines: [['A', "What's your dream?"], ['B', '___']], options: ["I'd like to open a restaurant someday.", 'I like open a restaurant someday.', "I'm open a restaurant someday."], answer: "I'd like to open a restaurant someday.", pt: 'Eu gostaria de abrir um restaurante algum dia.', why: '"I\'d like to" = eu gostaria de. Ótimo para falar de sonhos.', wrong: { 'I like open a restaurant someday.': '"I like" é eu gosto; e faltaria o "to".', "I'm open a restaurant someday.": 'Faltaria "going to": I\'m going to open...' } },
      ],
    } },
    { after: 'a2-u6-l4', lesson: {
      id: 'a2-u6-l9', title: 'Ouvindo', items: [
        { id: 'a2u6l9-1', type: 'listen', en: "We're going to move soon.", options: ['A gente vai se mudar em breve.', 'A gente se mudou faz pouco tempo.', 'A gente quer viajar em breve.'], answer: 'A gente vai se mudar em breve.', why: '"Move" = se mudar (de casa). "Soon" = em breve.' },
        { id: 'a2u6l9-2', type: 'dictation', en: 'I hope you pass the exam.', why: '"Hope" soa como "RÔUP", com o h aspirado.' },
        { id: 'a2u6l9-3', type: 'listen', en: "She'll study at a university abroad.", options: ['Ela vai estudar numa faculdade no exterior.', 'Ela estudou numa faculdade no exterior.', 'Ela estuda numa faculdade aqui perto.'], answer: 'Ela vai estudar numa faculdade no exterior.', why: '"She\'ll" = she will. "Abroad" = fora do país.' },
        { id: 'a2u6l9-4', type: 'dictation', en: 'My dream is to travel.', why: '"Dream" soa como "DRÍIM".' },
        { id: 'a2u6l9-5', type: 'listen', en: "Is your dad going to retire next year?", options: ['Seu pai vai se aposentar ano que vem?', 'Seu pai se aposentou ano passado?', 'Seu pai vai trabalhar ano que vem?'], answer: 'Seu pai vai se aposentar ano que vem?', why: 'Pergunta com going to: Is + pessoa + going to...?' },
        { id: 'a2u6l9-6', type: 'dictation', en: "I'll see you soon.", why: '"I\'ll" soa como "ÁIL". "See you soon" = até logo.' },
        { id: 'a2u6l9-7', type: 'speak', en: "Someday I'm going to live abroad.", pt: 'Algum dia eu vou morar fora do país.', why: '"Abroad" soa como "a-BRÓD".' },
      ],
    } },
    { after: 'a2-u6-l5', lesson: {
      id: 'a2-u6-l10', title: 'Lendo: os planos da Julia',
      story: {
        title: 'Os planos da Julia',
        lines: [
          { who: 'Julia', en: "I'm eighteen and I have big plans for the future.", pt: 'Tenho dezoito anos e tenho grandes planos para o futuro.' },
          { who: 'Julia', en: "Next month I'm going to take a very important exam.", pt: 'No mês que vem vou fazer uma prova muito importante.' },
          { ask: 'O que a Julia vai fazer no mês que vem?', options: ['Uma prova importante', 'Uma viagem', 'Uma festa'], answer: 'Uma prova importante', why: '"Next month I\'m going to take a very important exam."' },
          { who: 'Julia', en: 'I hope I will ___ it! Then I want to study at university.', pt: 'Espero passar! Depois quero estudar na faculdade.', gap: { answer: 'pass', options: ['pass', 'retire', 'lose'] } },
          { who: 'Julia', en: 'My dream is to work abroad, maybe in Canada.', pt: 'Meu sonho é trabalhar no exterior, talvez no Canadá.' },
          { who: 'Julia', en: "My mom says I'll miss her food. She's probably right!", pt: 'Minha mãe diz que vou sentir falta da comida dela. Ela provavelmente tem razão!' },
          { ask: 'Do que a Julia vai sentir falta?', options: ['Da comida da mãe', 'Da faculdade', 'Do Canadá'], answer: 'Da comida da mãe', why: '"I\'ll miss her food" = vou sentir falta da comida dela.' },
        ],
      },
      items: [
        { id: 'a2u6l10-1', type: 'story', why: 'A Julia conta os planos e sonhos dela. Leia com calma e ouça cada frase.' },
        { id: 'a2u6l10-2', type: 'quiz', q: 'Quantos anos tem a Julia?', options: ['18', '80', '28'], answer: '18', why: '"I\'m eighteen" = tenho dezoito anos.' },
        { id: 'a2u6l10-3', type: 'quiz', q: 'Qual é o sonho dela?', options: ['Trabalhar no exterior', 'Abrir um restaurante', 'Se aposentar cedo'], answer: 'Trabalhar no exterior', why: '"My dream is to work abroad."' },
        { id: 'a2u6l10-4', type: 'quiz', q: 'Em qual país, talvez?', options: ['Canadá', 'Japão', 'Portugal'], answer: 'Canadá', why: '"Maybe in Canada" = talvez no Canadá.' },
      ],
    } },
  ],
});
