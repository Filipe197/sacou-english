// Desenho para os cartões do caderno: procura na palavra ou frase em inglês um
// termo que tenha um objeto desenhado do Sacou (src/art/objetos.js).
import { objectSvg } from './objetos.js';

const WORDS = {
  car: ['car', 'cars', 'taxi', 'drive', 'drives', 'driving'],
  apple: ['apple', 'apples', 'fruit'],
  cat: ['cat', 'cats', 'kitten'],
  dog: ['dog', 'dogs', 'puppy', 'pet', 'pets'],
  house: ['house', 'houses', 'home', 'apartment', 'neighbour', 'neighbor', 'neighbours'],
  key: ['key', 'keys'],
  sun: ['sun', 'sunny', 'summer', 'hot'],
  mug: ['coffee', 'tea', 'cup', 'mug', 'breakfast'],
  cake: ['cake', 'birthday', 'party'],
  cupcake: ['cupcake', 'dessert', 'sweet'],
  colors: ['color', 'colour', 'colors', 'colours', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'paint'],
  clock: ['clock', 'time', "o'clock", 'hour', 'hours', 'minute', 'minutes', 'late', 'early'],
  food: ['food', 'eat', 'eats', 'lunch', 'dinner', 'rice', 'fish', 'meat', 'pizza', 'hungry', 'restaurant'],
  city: ['city', 'town', 'street', 'bank', 'hospital', 'office', 'building'],
  beach: ['beach', 'sea', 'swim', 'swimming', 'holiday', 'vacation'],
  popcorn: ['cinema', 'film', 'films', 'movie', 'movies', 'popcorn'],
  suitcase: ['suitcase', 'travel', 'trip', 'airport', 'flight', 'plane', 'hotel'],
  phone: ['phone', 'phones', 'call', 'called', 'text', 'message', 'number'],
  boxes: ['box', 'boxes', 'move', 'moved'],
  calendar: ['calendar', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'week', 'month', 'year', 'date', 'tomorrow', 'yesterday'],
  bags: ['bag', 'bags', 'shop', 'shopping', 'buy', 'bought', 'store'],
  guitar: ['guitar', 'music', 'play', 'band', 'song'],
  camera: ['camera', 'photo', 'photos', 'picture', 'pictures'],
  plant: ['plant', 'plants', 'garden', 'flower', 'flowers', 'tree'],
  book: ['book', 'books', 'read', 'reading', 'study', 'studies', 'school', 'student', 'teacher', 'class', 'homework', 'exam', 'test'],
  rain: ['rain', 'raining', 'umbrella', 'weather', 'cold', 'storm'],
  ball: ['ball', 'football', 'soccer', 'game', 'sport', 'sports', 'volleyball'],
  train: ['train', 'station', 'bus', 'metro', 'subway'],
  news: ['news', 'newspaper', 'report', 'article'],
  headphones: ['listen', 'listening', 'headphones', 'podcast', 'radio'],
  sneaker: ['shoes', 'shoe', 'sneakers', 'run', 'running', 'walk', 'walking'],
  mic: ['sing', 'singer', 'speak', 'speech', 'microphone'],
};
const INDEX = new Map(Object.entries(WORDS).flatMap(([art, ws]) => ws.map(w => [w, art])));

export function cardArt(en) {
  const words = String(en || '').toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean);
  for (const w of words) { const art = INDEX.get(w) || INDEX.get(w.replace(/'s$/, '')); if (art) return objectSvg(art); }
  return '';
}
