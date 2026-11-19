// Cena ao lado do caminho da trilha: um personagem (Humaaans, de Pablo Stanley, CC0,
// com as cores do Sacou) e um objeto desenhado para o tema da unidade.
import { objectSvg } from '../art/objetos.js';

// unidade: [personagem, objeto, personagem pequeno (opcional)]
const SCENES = {
  'a1-u1': ['standing-1', 'hi'], 'a1-u2': ['standing-11', 'nametag'], 'a1-u3': ['standing-13', 'party'],
  'a1-u4': ['standing-19', 'dog', 'standing-12'], 'a1-u5': ['standing-3', 'colors'], 'a1-u6': ['standing-5', 'clock'],
  'a1-u7': ['standing-16', 'food'], 'a1-u8': ['standing-22', 'city'],
  'a1-u9': ['standing-14', 'house'], 'a1-u10': ['sitting-5', 'mug'], 'a1-u11': ['standing-10', 'bags'],
  'a1-u12': ['standing-7', 'guitar'],
  'a2-u1': ['standing-9', 'beach'], 'a2-u2': ['sitting-2', 'popcorn'], 'a2-u3': ['standing-18', 'suitcase'],
  'a2-u4': ['sitting-4', 'phone'], 'a2-u5': ['standing-2', 'boxes'], 'a2-u6': ['standing-21', 'calendar'],
  'a2-u7': ['standing-6', 'bags'], 'a2-u8': ['sitting-3', 'guitar'],
  'b1-u1': ['standing-15', 'camera'], 'b1-u2': ['standing-7', 'plant'], 'b1-u3': ['sitting-5', 'book'],
  'b1-u4': ['standing-17', 'rain'], 'b1-u5': ['standing-10', 'palm'], 'b1-u6': ['standing-23', 'ball'],
  'b1-u7': ['sitting-6', 'sack'], 'b1-u8': ['standing-20', 'talk'],
  'b2-u1': ['standing-4', 'train'], 'b2-u2': ['sitting-1', 'thought'], 'b2-u3': ['standing-8', 'news'],
  'b2-u4': ['standing-14', 'magnifier'], 'b2-u5': ['sitting-8', 'scissors'], 'b2-u6': ['sitting-7', 'headphones'],
  'b2-u7': ['standing-24', 'sneaker'], 'b2-u8': ['standing-1', 'mic'],
};

export default function TrailScene({ unitId, side = 'left', off = false, top = 0 }) {
  const s = SCENES[unitId];
  if (!s) return null;
  const [fig, obj, kid] = s;
  return (
    <div className={`tr-scene ${side}${off ? ' off' : ''}`} style={{ top }} aria-hidden="true">
      <span className="tr-fig"><img src={`/art/pessoas/${fig}.svg`} alt="" loading="lazy" decoding="async" /></span>
      {kid && <span className="tr-fig kid"><img src={`/art/pessoas/${kid}.svg`} alt="" loading="lazy" decoding="async" /></span>}
      <span className="tr-obj"><svg viewBox="0 0 140 140" width="120" height="120" dangerouslySetInnerHTML={{ __html: objectSvg(obj) }} /></span>
    </div>
  );
}
