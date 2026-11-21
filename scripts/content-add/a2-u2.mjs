// Etapa 1 do A2 completo: 3 lições novas na unidade 2 (O que você fez? — passado regular e did).
// Uso: node scripts/content-add/a2-u2.mjs  (pode rodar de novo: substitui as lições novas)
import { addLessons } from './lib.mjs';

addLessons('a2/unit-02.json', {
  words: [
    ['arrived', 'chegou, chegaram (arrive)'],
    ['missed', 'perdeu (o ônibus, o voo) (miss)'],
    ['dropped', 'deixou cair (drop)'],
    ['laughed', 'riu (laugh)'],
    ['shouted', 'gritou (shout)'],
    ['tidied', 'arrumou (tidy)'],
    ['finally', 'finalmente, por fim'],
    ['later', 'mais tarde, depois'],
    ['text', 'mensagem de celular'],
    ['neighbour', 'vizinho(a)'],
  ],
  lessons: [
    { after: 'a2-u2-l3', lesson: {
      id: 'a2-u2-l8', title: 'Um dia daqueles', items: [
        { id: 'a2u2l8-1', type: 'match', pairs: [['arrived', 'chegou'], ['missed', 'perdeu'], ['dropped', 'deixou cair'], ['laughed', 'riu']], why: 'Todos são regulares: verbo + -ed. "Drop" dobra o "p": dropped.' },
        { id: 'a2u2l8-2', type: 'choice', prompt: 'Complete:', en: 'I ___ the bus this morning.', pt: 'Eu perdi o ônibus hoje de manhã.', options: ['missed', 'lost', 'miss'], answer: 'missed', why: '"Perder" o ônibus, o voo ou a aula é "miss". "Lose" é perder uma coisa (a chave).', wrong: { lost: '"Lost" é perder um objeto: I lost my keys.', miss: 'Precisa do passado: missed.' } },
        { id: 'a2u2l8-3', type: 'choice', prompt: 'Complete:', en: 'She ___ her room yesterday.', pt: 'Ela arrumou o quarto dela ontem.', options: ['tidied', 'tidyed', 'tidy'], answer: 'tidied', why: 'Verbo que termina em consoante + y troca o y por i: tidy → tidied, study → studied.', wrong: { tidyed: 'Consoante + y vira -ied: tidied.', tidy: '"Yesterday" pede o passado.' } },
        { id: 'a2u2l8-4', type: 'choice', prompt: 'Complete:', en: 'He ___ arrive late. He was on time.', pt: 'Ele não chegou atrasado. Ele chegou na hora.', options: ["didn't", "doesn't", "wasn't"], answer: "didn't", why: 'Negativa no passado: didn\'t + verbo na forma normal (arrive, sem -ed).', wrong: { "doesn't": '"Doesn\'t" é presente.', "wasn't": '"Wasn\'t" vai com adjetivo ou lugar (wasn\'t late), não com outro verbo.' } },
        { id: 'a2u2l8-5', type: 'build', pt: 'Você mandou mensagem para o seu vizinho?', answer: 'Did you text your neighbour', extra: ['texted', 'do'], display: 'Did you text your neighbour?', why: 'Pergunta no passado: Did + pessoa + verbo normal. O "did" já mostra o passado, então "text" fica sem -ed.' },
        { id: 'a2u2l8-6', type: 'meaning', en: 'We waited for an hour and finally the train arrived.', options: ['Esperamos uma hora e finalmente o trem chegou.', 'Esperamos uma hora e o trem foi embora.', 'Esperamos o trem por um dia inteiro.'], answer: 'Esperamos uma hora e finalmente o trem chegou.', why: '"Finally" = finalmente. "Arrived" = chegou.' },
        { id: 'a2u2l8-7', type: 'dialogue', lines: [['A', 'Did you call your mom?'], ['B', '___']], options: ["No, I didn't. I'll call her later.", "No, I don't. I call her later.", "No, I wasn't. I called her later."], answer: "No, I didn't. I'll call her later.", pt: 'Não liguei. Vou ligar para ela mais tarde.', why: 'Pergunta com "Did you...?" tem resposta curta com did: Yes, I did / No, I didn\'t.', wrong: { "No, I don't. I call her later.": 'A pergunta está no passado (did), não no presente.', "No, I wasn't. I called her later.": '"Wasn\'t" responde perguntas com "Were you...?".' } },
      ],
    } },
    { after: 'a2-u2-l4', lesson: {
      id: 'a2-u2-l9', title: 'Ouvindo', items: [
        { id: 'a2u2l9-1', type: 'listen', en: 'I dropped my phone in the street.', options: ['Eu deixei meu celular cair na rua.', 'Eu perdi meu celular na rua.', 'Eu comprei um celular na rua.'], answer: 'Eu deixei meu celular cair na rua.', why: '"Dropped" = deixou cair. O -ed depois de "p" soa como "t": "DRÓPT".' },
        { id: 'a2u2l9-2', type: 'dictation', en: 'We arrived at ten.', why: '"Arrived" soa como "a-RÁIVD": o -ed depois de "v" soa como "d".' },
        { id: 'a2u2l9-3', type: 'listen', en: 'Everybody laughed at his story.', options: ['Todo mundo riu da história dele.', 'Todo mundo gostou da história dela.', 'Ninguém riu da história dele.'], answer: 'Todo mundo riu da história dele.', why: '"Laughed" soa como "LÉFT". "Laugh at" = rir de.' },
        { id: 'a2u2l9-4', type: 'dictation', en: 'She missed the last train.', why: '"Missed" soa como "MÍST": o -ed depois de "s" vira som de "t".' },
        { id: 'a2u2l9-5', type: 'listen', en: "My neighbour didn't hear me.", options: ['Meu vizinho não me ouviu.', 'Meu vizinho não me viu.', 'Minha vizinha me ouviu.'], answer: 'Meu vizinho não me ouviu.', why: '"Didn\'t hear" = não ouviu. "Neighbour" soa como "NÊI-bor".' },
        { id: 'a2u2l9-6', type: 'dictation', en: 'He shouted my name.', why: '"Shouted" soa como "XÁU-tid": depois de "t", o -ed vira uma sílaba a mais.' },
        { id: 'a2u2l9-7', type: 'speak', en: 'I finally tidied my room.', pt: 'Finalmente arrumei meu quarto.', why: '"Finally" soa como "FÁI-na-li". "Tidied" = "TÁI-did".' },
      ],
    } },
    { after: 'a2-u2-l5', lesson: {
      id: 'a2-u2-l10', title: 'Lendo: a mensagem da Clara',
      story: {
        title: 'A mensagem da Clara',
        lines: [
          { who: 'Clara', en: 'What a day! I missed the bus this morning.', pt: 'Que dia! Eu perdi o ônibus hoje de manhã.' },
          { who: 'Clara', en: 'I walked to work and arrived late.', pt: 'Fui a pé para o trabalho e cheguei atrasada.' },
          { ask: 'Como a Clara foi para o trabalho?', options: ['A pé', 'De ônibus', 'De táxi'], answer: 'A pé', why: '"I walked to work" = fui a pé para o trabalho.' },
          { who: 'Clara', en: 'At lunch I ___ my coffee on my new shirt.', pt: 'No almoço eu derrubei o café na minha camisa nova.', gap: { answer: 'dropped', options: ['dropped', 'cooked', 'played'] } },
          { who: 'Clara', en: 'Later my neighbour called. She wanted help with her computer.', pt: 'Mais tarde minha vizinha ligou. Ela queria ajuda com o computador.' },
          { who: 'Clara', en: 'We fixed it together and we laughed a lot. The day finally ended well!', pt: 'A gente consertou juntas e riu muito. No fim, o dia terminou bem!' },
          { ask: 'Como o dia terminou?', options: ['Bem', 'Mal', 'Com chuva'], answer: 'Bem', why: '"The day finally ended well" = no fim, o dia terminou bem.' },
        ],
      },
      items: [
        { id: 'a2u2l10-1', type: 'story', why: 'A Clara manda uma mensagem contando o dia dela. Leia com calma e ouça cada frase.' },
        { id: 'a2u2l10-2', type: 'quiz', q: 'O que aconteceu de manhã?', options: ['Ela perdeu o ônibus', 'Ela perdeu a chave', 'Ela acordou cedo'], answer: 'Ela perdeu o ônibus', why: '"I missed the bus" = perdi o ônibus.' },
        { id: 'a2u2l10-3', type: 'quiz', q: 'O que a vizinha queria?', options: ['Ajuda com o computador', 'Um café', 'Uma camisa nova'], answer: 'Ajuda com o computador', why: '"She wanted help with her computer."' },
        { id: 'a2u2l10-4', type: 'quiz', q: 'Onde caiu o café?', options: ['Na camisa nova', 'No computador', 'No ônibus'], answer: 'Na camisa nova', why: '"I dropped my coffee on my new shirt."' },
      ],
    } },
  ],
});
