// Etapa 1 do A1 completo (docs/plano-expansao-a1.md): 3 lições novas na unidade 6 (Minha rotina).
// Uso: node scripts/content-add/a1-u6.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a1/unit-06.json', {
  words: [
    ['always', 'sempre'],
    ['often', 'frequentemente / muitas vezes'],
    ['sometimes', 'às vezes'],
    ['never', 'nunca'],
    ['Tuesday / Wednesday / Thursday', 'terça-feira / quarta-feira / quinta-feira'],
    ['week', 'semana'],
    ['take a shower', 'tomar banho'],
    ['dinner', 'jantar'],
    ['half past seven', 'sete e meia'],
    ['walk', 'caminhar / ir a pé'],
    ['start / finish', 'começar / terminar'],
    ['busy', 'ocupado(a) / corrido(a)'],
    ['late', 'tarde / atrasado(a)'],
  ],
  extraVocab: [
    { word: 'sometimes', reason: 'Os advérbios de frequência (always, often, sometimes, never) são ensinados juntos no A1 com o presente simples; na CEFR-J "sometimes" aparece só no A2.' },
  ],
  lessons: [
    { after: 'a1-u6-l3', lesson: {
      id: 'a1-u6-l8', title: 'Sempre, às vezes, nunca', items: [
        { id: 'a1u6l8-1', type: 'match', pairs: [['always', 'sempre'], ['often', 'frequentemente'], ['sometimes', 'às vezes'], ['never', 'nunca']], why: 'Da mais frequente para a menos: always (100%) → often → sometimes → never (0%).' },
        { id: 'a1u6l8-2', type: 'match', pairs: [['Tuesday', 'terça-feira'], ['Wednesday', 'quarta-feira'], ['Thursday', 'quinta-feira'], ['week', 'semana']], why: 'Em inglês os dias da semana sempre começam com letra maiúscula. "Wednesday" se fala "UÉNZ-dei": o primeiro "d" é mudo.' },
        { id: 'a1u6l8-3', type: 'choice', prompt: 'Complete:', en: "I ___ drink coffee. I don't like it.", pt: 'Eu nunca bebo café. Eu não gosto.', options: ['never', 'always', 'often'], answer: 'never', why: '"Never" = nunca. Faz sentido com "I don\'t like it" (não gosto).', wrong: { always: '"Always" é sempre: não combina com "não gosto".', often: '"Often" é com frequência.' } },
        { id: 'a1u6l8-4', type: 'meaning', en: 'She always takes a shower in the morning.', options: ['Ela sempre toma banho de manhã.', 'Ela nunca toma banho de manhã.', 'Ela às vezes toma café de manhã.'], answer: 'Ela sempre toma banho de manhã.', why: '"Take a shower" = tomar banho. O "always" vem antes do verbo: she ALWAYS takes.' },
        { id: 'a1u6l8-5', type: 'build', pt: 'Eu nunca levanto tarde.', answer: 'I never get up late', extra: ['always', 'early'], display: 'I never get up late.', why: 'A palavra de frequência vem antes do verbo: I never get up. "Late" = tarde; o contrário é "early" (cedo).' },
        { id: 'a1u6l8-6', type: 'choice', prompt: 'Complete:', en: 'He is ___ late for work.', pt: 'Ele nunca chega atrasado ao trabalho.', options: ['never', "doesn't", 'not never'], answer: 'never', why: 'Com o verbo to be (is, am, are), a frequência vem DEPOIS dele: he is never late.', wrong: { "doesn't": 'Com "is" não usamos "doesn\'t".', 'not never': 'Em inglês não se usa negação dupla: só "never".' } },
        { id: 'a1u6l8-7', type: 'meaning', en: 'We have dinner at half past seven.', options: ['Jantamos às sete e meia.', 'Almoçamos às sete e meia.', 'Jantamos às seis e meia.'], answer: 'Jantamos às sete e meia.', why: '"Half past seven" = sete e meia (meia hora depois das sete). "Dinner" = jantar.' },
      ],
    } },
    { after: 'a1-u6-l4', lesson: {
      id: 'a1-u6-l9', title: 'Ouvindo', items: [
        { id: 'a1u6l9-1', type: 'listen', en: 'I often walk to work.', options: ['Eu muitas vezes vou a pé para o trabalho.', 'Eu nunca vou a pé para o trabalho.', 'Eu sempre vou de carro para o trabalho.'], answer: 'Eu muitas vezes vou a pé para o trabalho.', why: '"Walk" = caminhar, ir a pé. O "l" de walk é mudo: "uók".' },
        { id: 'a1u6l9-2', type: 'dictation', en: 'She never watches TV.', why: 'Com she, o verbo ganha -es: watch → watches.' },
        { id: 'a1u6l9-3', type: 'listen', en: 'On Wednesday I finish work at five.', options: ['Na quarta eu termino o trabalho às cinco.', 'Na quinta eu começo o trabalho às cinco.', 'Na terça eu termino o trabalho às seis.'], answer: 'Na quarta eu termino o trabalho às cinco.', why: '"Finish" = terminar. "On Wednesday" = na quarta-feira.' },
        { id: 'a1u6l9-4', type: 'dictation', en: 'I take a shower every morning.', why: '"Take a shower" = tomar banho. "Every morning" = toda manhã.' },
        { id: 'a1u6l9-5', type: 'listen', en: 'He starts work at half past eight.', options: ['Ele começa a trabalhar às oito e meia.', 'Ele termina o trabalho às oito e meia.', 'Ele começa a trabalhar às oito horas.'], answer: 'Ele começa a trabalhar às oito e meia.', why: '"Start" = começar. "Half past eight" = oito e meia.' },
        { id: 'a1u6l9-6', type: 'dictation', en: 'We cook dinner together.', why: '"Together" = juntos. Soa como "tu-GUÉ-der".' },
        { id: 'a1u6l9-7', type: 'speak', en: 'I always have breakfast at home.', pt: 'Eu sempre tomo café da manhã em casa.', why: '"Always" soa como "ÓL-ueiz". "Breakfast" = "BRÉK-fâst".' },
      ],
    } },
    { after: 'a1-u6-l5', lesson: {
      id: 'a1-u6-l10', title: 'Lendo: a semana do Mike',
      story: {
        title: 'A semana do Mike',
        lines: [
          { who: 'Mike', en: 'I am a doctor, so my week is very busy.', pt: 'Sou médico, então minha semana é muito corrida.' },
          { who: 'Mike', en: 'On Monday, Tuesday and Wednesday, I start work at seven.', pt: 'Na segunda, terça e quarta, começo a trabalhar às sete.' },
          { ask: 'Em que dias o Mike começa às sete?', options: ['Segunda, terça e quarta', 'Quinta e sexta', 'Todos os dias'], answer: 'Segunda, terça e quarta', why: '"On Monday, Tuesday and Wednesday, I start work at seven".' },
          { who: 'Mike', en: 'On Thursday I finish early and I walk in the park.', pt: 'Na quinta eu termino cedo e caminho no parque.' },
          { who: 'Mike', en: 'On Friday night I ___ cook. I go to a restaurant with my wife.', pt: 'Na sexta à noite eu nunca cozinho. Vou a um restaurante com minha esposa.', gap: { answer: 'never', options: ['never', 'always', 'often'] } },
          { who: 'Mike', en: 'On Sunday I sleep late. I love Sundays!', pt: 'No domingo eu durmo até tarde. Eu amo domingos!' },
          { ask: 'O que o Mike faz na sexta à noite?', options: ['Vai a um restaurante', 'Cozinha em casa', 'Trabalha até tarde'], answer: 'Vai a um restaurante', why: '"I go to a restaurant with my wife".' },
        ],
      },
      items: [
        { id: 'a1u6l10-1', type: 'story', why: 'O Mike conta como é a semana dele. Repare nos dias e nas palavras de frequência.' },
        { id: 'a1u6l10-2', type: 'quiz', q: 'Como é a semana do Mike?', options: ['Muito corrida', 'Muito tranquila', 'Muito chata'], answer: 'Muito corrida', why: '"My week is very busy" = minha semana é muito corrida.' },
        { id: 'a1u6l10-3', type: 'quiz', q: 'Quando ele caminha no parque?', options: ['Na quinta', 'Na segunda', 'No domingo'], answer: 'Na quinta', why: '"On Thursday I finish early and I walk in the park".' },
        { id: 'a1u6l10-4', type: 'quiz', q: 'O que ele faz no domingo?', options: ['Dorme até tarde', 'Começa cedo', 'Vai ao médico'], answer: 'Dorme até tarde', why: '"On Sunday I sleep late".' },
      ],
    } },
  ],
});
