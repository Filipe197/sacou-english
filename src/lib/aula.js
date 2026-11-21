// Aula falada com o Professor Juvenal. Usado no site (tela /aula) e na função do
// servidor (api/aula.js): o navegador manda só o id do tema e o nível, nunca o texto do papel.
export const AULA_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const TOPICS = [
  { id: 'surpresa', title: 'Surpresa', en: "any everyday topic you like (the heat, your noisy neighbour, coffee, the student's day)" },
  { id: 'apresentar', title: 'Se apresentar', en: 'introducing yourself: name, age, city, job' },
  { id: 'comida', title: 'Comida', en: 'food, meals and cooking' },
  { id: 'rotina', title: 'Rotina', en: 'daily routine and free time' },
  { id: 'familia', title: 'Família e amigos', en: 'family and friends' },
  { id: 'viagem', title: 'Viagem', en: 'travel and holidays' },
  { id: 'trabalho', title: 'Trabalho e estudo', en: 'work and study' },
  { id: 'filmes', title: 'Filmes e música', en: 'movies, series and music' },
];
export const topicById = (id) => TOPICS.find(t => t.id === id) || null;

export const TEACHER = { name: 'Juvenal', full: 'Professor Juvenal', tag: 'o professor mais ranzinza do Brasil', who: 'professor' };

// Limites da aula (iguais no site e no servidor)
export const MAX_STEPS = 16;   // vezes que o professor pede algo novo
export const MAX_CHARS = 280;  // tamanho máximo de cada resposta do aluno
export const MAX_TRIES = 3;    // tentativas de repetir antes de seguir em frente

// O comentário do professor sai em português no A1 e A2 e em inglês do B1 em diante.
export const commentInPt = (level) => level === 'A1' || level === 'A2';

// Apresentação do professor (botão "Ouvir o Juvenal"). [pt, en]
export const INTRO = [
  'Eita, mais um aluno! Eu sou o Professor Juvenal. Senta aí, que o meu cafezinho já esfriou e a aula vai começar.',
  "Well, well, another student! I'm Professor Juvenal. Sit down, my coffee is already cold and the lesson is starting.",
];

// Reações prontas quando a repetição não sai (não gastam IA). [pt, en]
// Sem "hmm", "hmph" e afins: a voz lê o texto e não sabe falar esses sons.
export const RETRY = [
  ['Quase! Mas quase não é gol. De novo.', 'Almost! But almost is not a goal. Again.'],
  ['Misericórdia! Até o papagaio da minha vizinha fala melhor. Bora, mais uma.', "My neighbour's parrot speaks better than that. Come on, one more time."],
  ['Calma, criatura. Respira, toma uma água e repete comigo. Eu tenho a tarde toda... infelizmente.', 'Relax. Breathe, drink some water and repeat after me. I have all afternoon... unfortunately.'],
  ['Eita. As palavras em vermelho fugiram que nem gato em dia de banho. Vamos buscar.', "The red words ran away like a cat on bath day. Let's go and get them."],
  ['Meu cafezinho esfriou esperando essa frase. Mais uma vez, sem pressa.', 'My coffee got cold waiting for that sentence. Once more, no rush.'],
  ['Tá de brincadeira comigo? Ouve de novo, devagarinho, e repete.', 'Are you kidding me? Listen again, slowly, and repeat.'],
  ['Foi quase. Escuta mais uma vez e manda ver.', 'Almost there. Listen once more and go for it.'],
  ['Faltou um pouquinho. Devagar, que sai.', 'So close. Slowly, you can do it.'],
  ['Essa frase tá brigando com você, né? Bora de novo.', "This sentence is fighting you, right? Let's try again."],
  ['Ouvi uma parte. A outra fugiu. Mais uma.', 'I heard part of it. The rest ran away. One more.'],
  ['Tá melhorando, eu juro. Mais uma tentativa.', "It's getting better, I promise. One more try."],
  ['Fala sem medo. O pior que pode acontecer é eu reclamar, e isso eu já faço de graça.', 'Say it without fear. The worst that can happen is me complaining, and I do that for free.'],
];
export const GIVE_UP = [
  'Tá bom, tá bom. Vou fingir que não ouvi. Depois a gente volta nisso.',
  "Fine, fine. I'll pretend I didn't hear that. We'll come back to it later.",
];
