// Pix estático (BR Code do Banco Central): o "copia e cola" e o conteúdo do QR Code da página Apoie.
// Sem valor fixo: quem doa escolhe o valor no app do banco.
export const PIX_KEY = '+5581984783222';
const NAME = 'SACOU ENGLISH';
const CITY = 'BRASIL';

const f = (id, v) => id + String(v.length).padStart(2, '0') + v;

function crc16(s) {
  let c = 0xffff;
  for (let i = 0; i < s.length; i++) {
    c ^= s.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) c = c & 0x8000 ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff;
  }
  return c.toString(16).toUpperCase().padStart(4, '0');
}

export function pixPayload(key = PIX_KEY) {
  const body = f('00', '01')
    + f('26', f('00', 'br.gov.bcb.pix') + f('01', key))
    + f('52', '0000') + f('53', '986') + f('58', 'BR')
    + f('59', NAME) + f('60', CITY)
    + f('62', f('05', '***'))
    + '6304';
  return body + crc16(body);
}
