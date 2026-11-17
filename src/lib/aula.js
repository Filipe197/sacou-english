// Aula falada com o Professor Rabugento. Usado no site (tela /aula) e na função do
// servidor (api/aula.js): o navegador manda só o id do tema e o nível, nunca o texto do papel.
export const AULA_LEVELS = ['A1', 'A2', 'B1', 'B2'];

export const TOPICS = [
  { id: 'surpresa', title: 'Surpresa', en: 'any everyday topic you like (the weather, tea, your cat Winston, the student\'s day)' },
  { id: 'apresentar', title: 'Se apresentar', en: 'introducing yourself: name, age, city, job' },
  { id: 'comida', title: 'Comida', en: 'food, meals and cooking' },
  { id: 'rotina', title: 'Rotina', en: 'daily routine and free time' },
  { id: 'familia', title: 'Família e amigos', en: 'family and friends' },
  { id: 'viagem', title: 'Viagem', en: 'travel and holidays' },
  { id: 'trabalho', title: 'Trabalho e estudo', en: 'work and study' },
  { id: 'filmes', title: 'Filmes e música', en: 'movies, series and music' },
];
export const topicById = (id) => TOPICS.find(t => t.id === id) || null;

export const TEACHER = { name: 'Mr. Crabtree', nick: 'Professor Rabugento', who: 'professor' };

// Limites da aula (iguais no site e no servidor)
export const MAX_STEPS = 16;   // vezes que o professor pede algo novo
export const MAX_CHARS = 280;  // tamanho máximo de cada resposta do aluno
export const MAX_TRIES = 3;    // tentativas de repetir antes de seguir em frente

// O comentário do professor sai em português no A1 e A2 e em inglês no B1 e B2.
export const commentInPt = (level) => level === 'A1' || level === 'A2';

// Reações prontas quando a repetição não sai (não gastam IA). [pt, en]
export const RETRY = [
  ['Hmph. Quase. Meu gato Winston fala melhor, e ele só mia. De novo.', 'Hmph. Almost. My cat Winston speaks better, and he only says meow. Again.'],
  ['Não, não, não. Ouça de novo, com calma. Eu tenho o dia todo... infelizmente.', 'No, no, no. Listen again, slowly. I have all day... unfortunately.'],
  ['Perto. Mas perto só vale em jogo de bocha. Mais uma vez.', 'Close. But close only counts in horseshoes. Once more.'],
  ['Oh dear. As palavras em vermelho fugiram. Vamos buscar elas. De novo.', 'Oh dear. The red words ran away. Let\'s go and get them. Again.'],
  ['Meu chá esfriou esperando essa frase. Tente de novo, sem pressa.', 'My tea went cold waiting for that sentence. Try again, no rush.'],
];
export const GIVE_UP = [
  'Tá bom, tá bom. Vou fingir que não ouvi. A gente volta nisso depois.',
  'Fine, fine. I\'ll pretend I didn\'t hear that. We\'ll come back to it later.',
];
