// Gerador de QR Code mínimo (só o que a página Apoie precisa): modo byte, versão 6,
// correção de erro nível L (até 134 bytes). Segue o padrão ISO/IEC 18004, no mesmo
// desenho do gerador de referência de Nayuki (domínio público em espírito; reescrito aqui).
const VERSION = 6, SIZE = VERSION * 4 + 17, ECC_LEN = 18, BLOCKS = 2, DATA_PER_BLOCK = 68;
const DATA_LEN = BLOCKS * DATA_PER_BLOCK; // 136 bytes de dados
const ALIGN = [6, 34];
const FORMAT_L = 1; // bits do nível L no campo de formato

function gfMul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z & 0xff;
}
function rsDivisor(degree) {
  const r = new Array(degree).fill(0); r[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < r.length; j++) { r[j] = gfMul(r[j], root); if (j + 1 < r.length) r[j] ^= r[j + 1]; }
    root = gfMul(root, 0x02);
  }
  return r;
}
function rsRemainder(data, div) {
  const r = new Array(div.length).fill(0);
  for (const b of data) {
    const factor = b ^ r.shift(); r.push(0);
    div.forEach((c, i) => { r[i] ^= gfMul(c, factor); });
  }
  return r;
}

function codewords(text) {
  const bytes = [...new TextEncoder().encode(text)];
  if (bytes.length > 134) throw new Error('texto grande demais para o QR (versão 6-L)');
  const bits = [];
  const push = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); };
  push(0b0100, 4); push(bytes.length, 8); bytes.forEach(b => push(b, 8));
  push(0, Math.min(4, DATA_LEN * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));
  for (let p = 0xec; data.length < DATA_LEN; p ^= 0xec ^ 0x11) data.push(p);
  const div = rsDivisor(ECC_LEN);
  const blocks = [], eccs = [];
  for (let b = 0; b < BLOCKS; b++) { const blk = data.slice(b * DATA_PER_BLOCK, (b + 1) * DATA_PER_BLOCK); blocks.push(blk); eccs.push(rsRemainder(blk, div)); }
  const out = [];
  for (let i = 0; i < DATA_PER_BLOCK; i++) for (const blk of blocks) out.push(blk[i]);
  for (let i = 0; i < ECC_LEN; i++) for (const e of eccs) out.push(e[i]);
  return out; // 172 bytes
}

const MASKS = [
  (x, y) => (x + y) % 2 === 0,
  (x, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => (x * y) % 2 + (x * y) % 3 === 0,
  (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0,
  (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0,
];

function base() {
  const m = Array.from({ length: SIZE }, () => new Array(SIZE).fill(false));
  const fn = Array.from({ length: SIZE }, () => new Array(SIZE).fill(false));
  const set = (x, y, dark) => { m[y][x] = dark; fn[y][x] = true; };
  for (let i = 0; i < SIZE; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  for (const [cx, cy] of [[3, 3], [SIZE - 4, 3], [3, SIZE - 4]]) {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
      if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) set(x, y, d !== 2 && d !== 4);
    }
  }
  const last = ALIGN.length - 1;
  ALIGN.forEach((ax, i) => ALIGN.forEach((ay, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  return { m, fn, set };
}

function drawFormat(set, mask) {
  const data = (FORMAT_L << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  const bits = ((data << 10) | rem) ^ 0x5412;
  const bit = (i) => ((bits >>> i) & 1) !== 0;
  for (let i = 0; i <= 5; i++) set(8, i, bit(i));
  set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
  for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
  for (let i = 0; i < 8; i++) set(SIZE - 1 - i, 8, bit(i));
  for (let i = 8; i < 15; i++) set(8, SIZE - 15 + i, bit(i));
  set(8, SIZE - 8, true); // módulo escuro fixo
}

function penalty(m) {
  let p = 0;
  const run = (get) => {
    for (let a = 0; a < SIZE; a++) {
      let len = 1;
      for (let b = 1; b < SIZE; b++) {
        if (get(a, b) === get(a, b - 1)) { len++; if (len === 5) p += 3; else if (len > 5) p++; } else len = 1;
      }
    }
  };
  run((a, b) => m[a][b]); run((a, b) => m[b][a]);
  for (let y = 0; y < SIZE - 1; y++) for (let x = 0; x < SIZE - 1; x++) {
    const c = m[y][x]; if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3;
  }
  const finder = [true, false, true, true, true, false, true];
  for (let a = 0; a < SIZE; a++) for (let b = 0; b + 7 <= SIZE; b++) {
    const row = finder.every((v, k) => m[a][b + k] === v), col = finder.every((v, k) => m[b + k][a] === v);
    if (row) p += 20; if (col) p += 20;
  }
  const dark = m.flat().filter(Boolean).length;
  p += Math.floor(Math.abs(dark * 20 - SIZE * SIZE * 10) / (SIZE * SIZE)) * 10;
  return p;
}

// Matriz SIZE x SIZE (true = módulo escuro), com o melhor dos 8 padrões de máscara
export function qrMatrix(text) {
  const data = codewords(text);
  let best = null;
  for (let mask = 0; mask < 8; mask++) {
    const { m, fn, set } = base();
    drawFormat(set, mask); // reserva a área do formato
    let i = 0;
    for (let right = SIZE - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < SIZE; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j, up = ((right + 1) & 2) === 0, y = up ? SIZE - 1 - vert : vert;
          if (!fn[y][x] && i < data.length * 8) { m[y][x] = ((data[i >>> 3] >>> (7 - (i & 7))) & 1) === 1; i++; }
        }
      }
    }
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!fn[y][x] && MASKS[mask](x, y)) m[y][x] = !m[y][x];
    drawFormat(set, mask);
    const pen = penalty(m);
    if (!best || pen < best.pen) best = { m, pen };
  }
  return best.m;
}
