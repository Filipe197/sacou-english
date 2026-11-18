// Objetos ilustrados (SVG) que acompanham os personagens da trilha, um tema por unidade.
// Cada função desenha com o "chão" em y; tudo cabe num quadro de 140 × 140.
const V = '#5B3DF5', VD = '#3A22B8', L = '#C6F02E', LD = '#A6CC14', O = '#FF8A1F', OD = '#E2701A', P = '#FF4F6D', Y = '#FFC23D',
  B = '#2FB8FF', G = '#52D16B', GD = '#2E9E4A', D = '#1B1E35', W = '#FFFFFF', LT = '#E3E4EF', BR = '#C47A3C', BRD = '#8A5428';
const F = 'font-family="Space Grotesk,Inter,sans-serif" font-weight="800" text-anchor="middle"';

export const sh = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .18}" fill="rgba(11,13,26,.12)"/>`;

const hi = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-46" y="-118" width="92" height="56" rx="20" fill="${V}"/><path d="M-14 -64 L-26 -44 L2 -63Z" fill="${V}"/>
  <text x="0" y="-79" ${F} font-size="30" fill="${W}">Hi!</text></g>`;

const nametag = (x, y) => `<g transform="translate(${x} ${y}) rotate(-6)">
  <rect x="-44" y="-112" width="88" height="64" rx="12" fill="${P}"/>
  <text x="0" y="-92" ${F} font-size="14" fill="${W}" letter-spacing="1.5">HELLO</text>
  <rect x="-36" y="-84" width="72" height="28" rx="6" fill="${W}"/>
  <path d="M-26 -68 q8 -10 14 0 t14 0 t14 -2 t10 0" stroke="${V}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;

const cake = (x, y) => sh(x, y, 44) + `<g transform="translate(${x} ${y})">
  <rect x="-42" y="-8" width="84" height="8" rx="4" fill="${LT}"/>
  <rect x="-34" y="-46" width="68" height="40" rx="10" fill="#FFB3C7"/>
  <path d="M-34 -36 Q-26 -26 -18 -36 Q-10 -26 -2 -36 Q6 -26 14 -36 Q22 -26 34 -36 V-40 Q34 -50 24 -50 H-24 Q-34 -50 -34 -40Z" fill="#FFF4F7"/>
  <circle cx="-20" cy="-18" r="3" fill="${P}"/><circle cx="0" cy="-16" r="3" fill="${Y}"/><circle cx="20" cy="-18" r="3" fill="${B}"/>
  ${[-14, 0, 14].map((cx, i) => `<rect x="${cx - 3}" y="-70" width="6" height="22" rx="3" fill="${[B, G, P][i]}"/><path d="M${cx} -82 Q${cx + 6} -74 ${cx} -70 Q${cx - 6} -74 ${cx} -82Z" fill="${Y}"/>`).join('')}</g>`;

const balloon = (x, y, c, n, hx, hy) => `<g transform="translate(${x} ${y})"><path d="M0 0 Q${hx / 2 + 6} ${hy / 2} ${hx} ${hy}" stroke="#9A9DB8" stroke-width="2" fill="none"/>
  <ellipse cx="0" cy="-22" rx="20" ry="24" fill="${c}"/><path d="M-4 3 L0 -2 L4 3Z" fill="${c}"/><ellipse cx="-7" cy="-31" rx="4.5" ry="7" fill="#fff" opacity=".35"/>
  <text x="0" y="-13" ${F} font-size="24" fill="#fff">${n}</text></g>`;

const party = (x, y) => balloon(x - 34, y - 64, V, '2', 12, 64) + balloon(x - 8, y - 78, O, '5', -6, 78) + cake(x + 20, y);

const dog = (x, y) => sh(x, y + 2, 36) + `<g transform="translate(${x} ${y})">
  <path d="M30 -30 Q46 -46 40 -24" stroke="#C98B4A" stroke-width="8" stroke-linecap="round" fill="none"/>
  <ellipse cx="6" cy="-22" rx="32" ry="20" fill="#E3A15E"/>
  <rect x="-18" y="-14" width="11" height="16" rx="5" fill="#E3A15E"/><rect x="18" y="-14" width="11" height="16" rx="5" fill="#E3A15E"/>
  <circle cx="-22" cy="-46" r="20" fill="#E3A15E"/><ellipse cx="-30" cy="-38" rx="11" ry="8" fill="#FFF1DE"/>
  <path d="M-38 -58 Q-48 -40 -36 -34 Q-32 -48 -38 -58Z" fill="#9B5E2A"/><path d="M-8 -60 Q2 -44 -8 -36 Q-14 -50 -8 -60Z" fill="#9B5E2A"/>
  <circle cx="-26" cy="-50" r="3.4" fill="${D}"/><circle cx="-14" cy="-50" r="3.4" fill="${D}"/><ellipse cx="-34" cy="-41" rx="4.5" ry="3.5" fill="${D}"/>
  <rect x="-8" y="-32" width="16" height="5" rx="2.5" fill="${P}"/></g>`;

const palette = (x, y) => `<g transform="translate(${x} ${y}) rotate(-12)">
  <path d="M-30 -4 Q-34 -26 -4 -28 Q30 -30 32 -6 Q34 14 10 18 Q2 19 4 10 Q6 2 -4 4 Q-14 6 -14 14 Q-16 22 -26 14 Q-30 10 -30 -4Z" fill="#F6D7A0"/>
  <circle cx="-16" cy="-12" r="6" fill="${P}"/><circle cx="0" cy="-18" r="6" fill="${Y}"/><circle cx="16" cy="-12" r="6" fill="${B}"/><circle cx="20" cy="4" r="6" fill="${G}"/></g>`;

const cubes = (x, y) => sh(x, y + 2, 40) + `<g transform="translate(${x} ${y})">
  <rect x="-38" y="-34" width="34" height="34" rx="7" fill="${P}"/><rect x="2" y="-34" width="34" height="34" rx="7" fill="${B}"/>
  <rect x="-18" y="-70" width="34" height="34" rx="7" fill="${Y}"/>
  <text x="-21" y="-10" ${F} font-size="20" fill="#fff">A</text><text x="19" y="-10" ${F} font-size="20" fill="#fff">B</text><text x="-1" y="-46" ${F} font-size="20" fill="#fff">C</text></g>`;

const colors = (x, y) => palette(x - 30, y - 92) + cubes(x + 14, y);

const clock = (x, y) => sh(x, y, 30) + `<g transform="translate(${x} ${y})">
  <path d="M-20 -6 L-26 0 M20 -6 L26 0" stroke="${D}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="-22" cy="-66" r="10" fill="${Y}"/><circle cx="22" cy="-66" r="10" fill="${Y}"/>
  <circle cx="0" cy="-38" r="32" fill="${P}"/><circle cx="0" cy="-38" r="25" fill="${W}"/>
  <path d="M0 -38 V-54 M0 -38 L11 -32" stroke="${D}" stroke-width="4" stroke-linecap="round"/><circle cx="0" cy="-38" r="3" fill="${D}"/>
  <rect x="-4" y="-76" width="8" height="8" rx="2" fill="${D}"/></g>`;

const mug = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-6 -44 Q-12 -54 -4 -62 M6 -46 Q0 -56 8 -64" stroke="#C9CBE0" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M16 -30 Q32 -30 30 -16 Q28 -4 14 -6" stroke="${OD}" stroke-width="7" fill="none"/>
  <path d="M-20 -38 H18 L14 0 Q14 6 8 6 H-10 Q-16 6 -16 0Z" fill="${O}"/><path d="M4 -36 H16 L12 2 Q10 5 6 5Z" fill="${OD}"/>
  <path d="M-20 -38 H18 L17 -30 H-19Z" fill="#7A4A26"/>
  <path d="M-6 -22 Q-11 -27 -6 -30 Q-2 -32 -1 -27 Q0 -32 4 -30 Q9 -27 4 -22 L-1 -16Z" fill="#fff"/></g>`;

const cupcake = (x, y) => sh(x, y + 2, 30) + `<g transform="translate(${x} ${y})">
  <path d="M-24 -34 L-18 0 H18 L24 -34Z" fill="${B}"/><path d="M-12 -34 L-10 0 M0 -34 V0 M12 -34 L10 0" stroke="#1E95D6" stroke-width="3"/>
  <circle cx="-14" cy="-42" r="13" fill="#FFF4F7"/><circle cx="14" cy="-42" r="13" fill="#FFF4F7"/><circle cx="0" cy="-51" r="16" fill="#FFF4F7"/><rect x="-26" y="-44" width="52" height="12" rx="6" fill="#FFF4F7"/>
  <circle cx="2" cy="-70" r="8" fill="${P}"/><path d="M2 -77 Q8 -87 14 -83" stroke="#3E9B4F" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;

const food = (x, y) => mug(x - 22, y - 70) + cupcake(x + 24, y);

const city = (x, y) => sh(x, y + 2, 56) + `<g transform="translate(${x} ${y})">
  <rect x="-48" y="-104" width="50" height="104" rx="6" fill="${V}"/>
  ${[0, 1, 2, 3].map(r => [0, 1].map(c => `<rect x="${-40 + c * 22}" y="${-94 + r * 22}" width="12" height="14" rx="2" fill="${r % 2 ? L : '#D9D1FF'}"/>`).join('')).join('')}
  <rect x="-30" y="-16" width="14" height="16" rx="2" fill="${VD}"/>
  <rect x="2" y="-66" width="34" height="66" rx="5" fill="${O}"/><rect x="10" y="-56" width="8" height="10" rx="2" fill="#FFE2C4"/><rect x="22" y="-56" width="8" height="10" rx="2" fill="#FFE2C4"/><rect x="10" y="-38" width="8" height="10" rx="2" fill="#FFE2C4"/><rect x="22" y="-38" width="8" height="10" rx="2" fill="#FFE2C4"/>
  <rect x="44" y="-30" width="5" height="30" fill="${BR}"/><circle cx="46" cy="-40" r="15" fill="${G}"/><circle cx="40" cy="-46" r="8" fill="#7BE08F"/></g>`;

const beach = (x, y) => sh(x, y + 2, 50) + `<g transform="translate(${x} ${y})">
  <path d="M-46 0 Q0 -16 46 0Z" fill="#FFE2A8"/>
  <path d="M-8 0 L4 -92" stroke="${D}" stroke-width="4" stroke-linecap="round"/>
  <path d="M-44 -78 Q2 -128 50 -86 Z" fill="${P}"/><path d="M-14 -96 Q4 -122 20 -100 L22 -88 Q4 -102 -16 -86Z" fill="${W}"/>
  <circle cx="32" cy="-12" r="12" fill="${W}"/><path d="M32 -12 L32 -24 A12 12 0 0 1 43.4 -15.7Z M32 -12 L39 -2.3 A12 12 0 0 1 25 -2.3Z M32 -12 L20.6 -15.7 A12 12 0 0 1 32 -24Z" fill="${P}"/><circle cx="32" cy="-12" r="12" fill="none" stroke="${LT}" stroke-width="1.5"/></g>`;

const popcorn = (x, y) => sh(x, y + 2, 30) + `<g transform="translate(${x} ${y})">
  ${[[-16, -70], [-4, -78], [10, -74], [20, -66], [-22, -60], [4, -64], [-8, -62]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" fill="#FFF6D6"/>`).join('')}
  <path d="M-28 -58 L-20 0 H20 L28 -58Z" fill="${W}"/>
  <path d="M-21 -58 L-15 0 H-5 L-9 -58Z M7 -58 L4 0 H14 L21 -58Z" fill="${P}"/>
  <rect x="-30" y="-62" width="60" height="8" rx="3" fill="${P}"/></g>`;

const suitcase = (x, y) => sh(x, y + 2, 40) + `<g transform="translate(${x} ${y})">
  <path d="M-12 -70 V-80 Q-12 -86 -6 -86 H6 Q12 -86 12 -80 V-70" stroke="${D}" stroke-width="6" fill="none"/>
  <rect x="-38" y="-72" width="76" height="66" rx="12" fill="${O}"/><rect x="-38" y="-72" width="76" height="12" rx="6" fill="#fff" opacity=".2"/>
  <rect x="-22" y="-72" width="8" height="66" fill="${OD}"/><rect x="14" y="-72" width="8" height="66" fill="${OD}"/>
  <circle cx="-2" cy="-34" r="10" fill="${L}"/><rect x="-28" y="-30" width="18" height="12" rx="3" fill="${W}" transform="rotate(-12 -19 -24)"/>
  <circle cx="-26" cy="-2" r="5" fill="${D}"/><circle cx="26" cy="-2" r="5" fill="${D}"/>
  <path d="M10 -112 L38 -102 L50 -110 Q56 -112 54 -106 L44 -96 L48 -78 L42 -80 L34 -94 L18 -90 L16 -84 L12 -86 L12 -96 L4 -102Z" fill="${B}"/></g>`;

const phone = (x, y) => `<g transform="translate(${x} ${y}) rotate(8)">
  <rect x="-26" y="-116" width="52" height="92" rx="12" fill="${D}"/><rect x="-21" y="-108" width="42" height="74" rx="6" fill="#F2EFFF"/>
  <rect x="-16" y="-100" width="26" height="12" rx="6" fill="${V}"/><rect x="-8" y="-82" width="24" height="12" rx="6" fill="${L}"/><rect x="-16" y="-64" width="20" height="12" rx="6" fill="${V}"/>
  <circle cx="0" cy="-29" r="2.5" fill="#5A5E7A"/></g>
  <g transform="translate(${x + 30} ${y - 112})"><circle r="10" fill="${P}"/><text y="5" ${F} font-size="13" fill="#fff">3</text></g>`;

const boxes = (x, y) => sh(x, y + 2, 50) + `<g transform="translate(${x} ${y})">
  <rect x="-48" y="-62" width="62" height="62" rx="6" fill="${V}"/><rect x="-21" y="-62" width="8" height="62" fill="${L}"/><rect x="-48" y="-36" width="62" height="8" fill="${L}"/>
  <path d="M-17 -62 Q-34 -84 -22 -84 Q-14 -84 -17 -62 Q-8 -84 2 -82 Q8 -76 -17 -62Z" fill="${L}"/>
  <rect x="20" y="-28" width="28" height="28" rx="4" fill="${O}"/><rect x="31" y="-28" width="6" height="28" fill="${Y}"/>
  <text x="-17" y="-92" ${F} font-size="14" fill="${V}">big</text><text x="34" y="-36" ${F} font-size="12" fill="${OD}">small</text></g>`;

const calendar = (x, y) => `<g transform="translate(${x} ${y}) rotate(-4)">
  <rect x="-40" y="-118" width="80" height="82" rx="10" fill="${W}" stroke="${LT}" stroke-width="3"/>
  <path d="M-40 -108 Q-40 -118 -30 -118 H30 Q40 -118 40 -108 V-96 H-40Z" fill="${V}"/>
  <rect x="-24" y="-126" width="6" height="16" rx="3" fill="${D}"/><rect x="18" y="-126" width="6" height="16" rx="3" fill="${D}"/>
  ${[0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c => `<circle cx="${-28 + c * 14}" cy="${-82 + r * 16}" r="3.5" fill="#C9CBE0"/>`).join('')).join('')}
  <circle cx="14" cy="-66" r="9" fill="none" stroke="${P}" stroke-width="3.5"/><circle cx="14" cy="-66" r="3.5" fill="${P}"/></g>`;

const bags = (x, y) => sh(x, y + 2, 46) + `<g transform="translate(${x} ${y})">
  <path d="M-34 -62 Q-34 -84 -20 -84 Q-6 -84 -6 -62" stroke="${VD}" stroke-width="4" fill="none"/>
  <path d="M-46 -64 H6 L2 0 H-42Z" fill="${V}"/><circle cx="-20" cy="-36" r="9" fill="${L}"/>
  <path d="M14 -46 Q14 -64 26 -64 Q38 -64 38 -46" stroke="#C93A57" stroke-width="4" fill="none"/>
  <path d="M4 -48 H48 L44 0 H8Z" fill="${P}"/><path d="M18 -26 h16" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>`;

const guitar = (x, y) => sh(x, y + 2, 26) + `<g transform="translate(${x} ${y}) rotate(14)">
  <rect x="-4" y="-120" width="8" height="70" rx="3" fill="${BRD}"/><rect x="-7" y="-130" width="14" height="16" rx="4" fill="${D}"/>
  <circle cx="0" cy="-48" r="20" fill="${O}"/><circle cx="0" cy="-20" r="26" fill="${O}"/><path d="M14 -60 Q30 -40 20 -6 Q14 4 0 6 Q20 -10 14 -60Z" fill="${OD}" opacity=".6"/>
  <circle cx="0" cy="-36" r="8" fill="${D}"/><rect x="-10" y="-14" width="20" height="5" rx="2" fill="${D}"/></g>`;

const camera = (x, y) => `<g transform="translate(${x} ${y}) rotate(-6)">
  <rect x="-16" y="-110" width="20" height="10" rx="3" fill="${D}"/>
  <rect x="-40" y="-102" width="80" height="54" rx="12" fill="${D}"/><rect x="-40" y="-90" width="80" height="10" fill="#33375A"/>
  <circle cx="0" cy="-75" r="20" fill="#C9CBE0"/><circle cx="0" cy="-75" r="14" fill="${V}"/><circle cx="-5" cy="-80" r="4" fill="#fff" opacity=".6"/>
  <rect x="22" y="-98" width="12" height="7" rx="2" fill="${Y}"/></g>`;

const plant = (x, y) => sh(x, y + 2, 30) + `<g transform="translate(${x} ${y})">
  <path d="M0 -40 Q-30 -60 -26 -96 Q-4 -78 0 -40Z" fill="${G}"/><path d="M0 -40 Q28 -66 24 -100 Q2 -84 0 -40Z" fill="${GD}"/><path d="M0 -40 Q-6 -82 4 -118 Q16 -82 0 -40Z" fill="#7BE08F"/>
  <path d="M-26 -42 H26 L20 0 H-20Z" fill="${O}"/><rect x="-30" y="-46" width="60" height="10" rx="4" fill="${OD}"/></g>`;

const book = (x, y) => `<g transform="translate(${x} ${y}) rotate(-6)">
  <path d="M-52 -66 Q-26 -78 0 -66 Q26 -78 52 -66 V-12 Q26 -22 0 -12 Q-26 -22 -52 -12Z" fill="${V}"/>
  <path d="M-48 -70 Q-24 -82 -2 -70 V-18 Q-24 -28 -48 -18Z" fill="${W}"/><path d="M48 -70 Q24 -82 2 -70 V-18 Q24 -28 48 -18Z" fill="#F2EFFF"/>
  ${[0, 1, 2, 3].map(i => `<path d="M-40 ${-62 + i * 10} Q-24 ${-68 + i * 10} -10 ${-62 + i * 10}M10 ${-62 + i * 10} Q24 ${-68 + i * 10} 40 ${-62 + i * 10}" stroke="#C9CBE0" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>`;

const rain = (x, y) => `<g transform="translate(${x} ${y})">
  <circle cx="-20" cy="-96" r="18" fill="#C9D6E6"/><circle cx="4" cy="-106" r="24" fill="#C9D6E6"/><circle cx="26" cy="-94" r="17" fill="#C9D6E6"/><rect x="-36" y="-96" width="78" height="20" rx="10" fill="#C9D6E6"/>
  ${[[-20, -66], [0, -60], [20, -66], [-10, -44], [12, -40]].map(([a, b]) => `<path d="M${a} ${b} q-3 6 0 9 q3 -3 0 -9Z" fill="${B}" stroke="${B}" stroke-width="3" stroke-linejoin="round"/>`).join('')}</g>`
  + sh(x + 4, y + 2, 34) + `<g transform="translate(${x + 4} ${y})"><path d="M0 -6 V-34" stroke="${D}" stroke-width="3.5"/><path d="M0 -6 q0 6 6 6 q6 0 6 -6" stroke="${D}" stroke-width="3.5" fill="none"/><path d="M-30 -32 Q0 -66 30 -32Z" fill="${Y}"/></g>`;

const palm = (x, y) => sh(x, y + 2, 46) + `<g transform="translate(${x} ${y})">
  <path d="M-44 0 Q0 -18 44 0Z" fill="#FFE2A8"/>
  <path d="M-4 -4 Q-2 -60 14 -104" stroke="${BR}" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M14 -104 Q-20 -124 -46 -98 Q-14 -110 14 -104Z" fill="${G}"/><path d="M14 -104 Q44 -126 62 -96 Q36 -110 14 -104Z" fill="${GD}"/>
  <path d="M14 -104 Q-10 -96 -22 -66 Q2 -88 14 -104Z" fill="${GD}"/><path d="M14 -104 Q40 -96 48 -66 Q30 -88 14 -104Z" fill="${G}"/>
  <circle cx="8" cy="-98" r="6" fill="${BRD}"/><circle cx="18" cy="-96" r="6" fill="${BRD}"/></g>`;

const ball = (x, y) => sh(x, y + 2, 28) + `<g transform="translate(${x} ${y - 28})">
  <circle r="28" fill="${W}" stroke="${LT}" stroke-width="2"/><path d="M0 -10 L10 -3 L6 9 H-6 L-10 -3Z" fill="${D}"/>
  <path d="M0 -10 V-26 M10 -3 L25 -9 M6 9 L14 22 M-6 9 L-14 22 M-10 -3 L-25 -9" stroke="${D}" stroke-width="2.5"/>
  <path d="M-12 -24 L0 -27 L12 -24 L8 -16 L-8 -16Z M24 -2 L27 10 L20 18 L16 10Z M-24 -2 L-27 10 L-20 18 L-16 10Z" fill="${D}"/></g>`;

const sack = (x, y) => sh(x, y + 2, 38) + `<g transform="translate(${x} ${y})">
  <path d="M-34 0 Q-42 -40 -24 -72 L-14 -82 H14 L24 -72 Q42 -40 34 0Z" fill="#D9B07A"/><path d="M-18 -82 Q0 -74 18 -82 L16 -90 Q0 -84 -16 -90Z" fill="#B88A50"/>
  <rect x="-26" y="-50" width="52" height="22" rx="4" fill="${G}"/><text x="0" y="-34" ${F} font-size="12" fill="#fff">BRASIL</text>
  <ellipse cx="-12" cy="-12" rx="6" ry="4" fill="#6B3E1F"/><ellipse cx="6" cy="-14" rx="6" ry="4" fill="#6B3E1F"/><ellipse cx="-2" cy="-62" rx="6" ry="4" fill="#6B3E1F"/></g>`;

const talk = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="-50" y="-120" width="62" height="46" rx="16" fill="${V}"/><path d="M-34 -76 L-40 -60 L-20 -76Z" fill="${V}"/><text x="-19" y="-88" ${F} font-size="26" fill="#fff">?</text>
  <rect x="-6" y="-80" width="58" height="44" rx="16" fill="${L}"/><path d="M36 -38 L42 -22 L22 -38Z" fill="${L}"/><text x="23" y="-49" ${F} font-size="26" fill="${D}">!</text></g>`;

const train = (x, y) => sh(x, y + 2, 40) + `<g transform="translate(${x} ${y})">
  <rect x="-36" y="-104" width="72" height="96" rx="18" fill="${V}"/><rect x="-28" y="-94" width="56" height="34" rx="8" fill="#D9F2FF"/>
  <rect x="-36" y="-50" width="72" height="10" fill="${L}"/><circle cx="-20" cy="-26" r="7" fill="${Y}"/><circle cx="20" cy="-26" r="7" fill="${Y}"/>
  <rect x="-10" y="-30" width="20" height="8" rx="3" fill="${VD}"/><path d="M-26 -8 L-34 2 M26 -8 L34 2" stroke="${D}" stroke-width="5" stroke-linecap="round"/></g>`;

const thought = (x, y) => `<g transform="translate(${x} ${y})">
  <circle cx="-30" cy="-22" r="5" fill="#D9D1FF"/><circle cx="-18" cy="-40" r="8" fill="#D9D1FF"/>
  <circle cx="-14" cy="-80" r="22" fill="#F2EFFF"/><circle cx="14" cy="-92" r="26" fill="#F2EFFF"/><circle cx="36" cy="-76" r="18" fill="#F2EFFF"/><rect x="-30" y="-80" width="78" height="26" rx="13" fill="#F2EFFF"/>
  <text x="10" y="-66" ${F} font-size="30" fill="${V}">?</text></g>`;

const news = (x, y) => `<g transform="translate(${x} ${y}) rotate(-8)">
  <rect x="-44" y="-116" width="88" height="88" rx="6" fill="${W}" stroke="${LT}" stroke-width="3"/>
  <text x="0" y="-92" ${F} font-size="16" fill="${D}">NEWS</text><rect x="-36" y="-84" width="72" height="3" fill="${D}"/>
  <rect x="-36" y="-76" width="32" height="28" rx="3" fill="${L}"/>
  ${[0, 1, 2].map(i => `<rect x="2" y="${-76 + i * 10}" width="34" height="4" rx="2" fill="#C9CBE0"/>`).join('')}
  ${[0, 1].map(i => `<rect x="-36" y="${-42 + i * 8}" width="72" height="4" rx="2" fill="#C9CBE0"/>`).join('')}</g>`;

const magnifier = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M10 -58 L34 -30" stroke="${D}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="-8" cy="-80" r="28" fill="#D9F2FF" stroke="${V}" stroke-width="9"/><path d="M-22 -92 Q-14 -100 -4 -98" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  ${[[-34, -10], [-12, 0], [40, -8]].map(([a, b]) => `<g transform="translate(${a} ${b})" fill="#B5885A"><ellipse cx="0" cy="0" rx="6" ry="5"/><circle cx="-6" cy="-7" r="2.6"/><circle cx="0" cy="-9" r="2.6"/><circle cx="6" cy="-7" r="2.6"/></g>`).join('')}</g>`;

const scissors = (x, y) => `<g transform="translate(${x - 14} ${y})">
  <path d="M-4 -60 L22 -112 M4 -60 L-22 -112" stroke="#AEB4C6" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-14" cy="-42" r="13" fill="none" stroke="${P}" stroke-width="7"/><circle cx="14" cy="-42" r="13" fill="none" stroke="${P}" stroke-width="7"/>
  <circle cx="0" cy="-62" r="4" fill="${D}"/></g>
  <g transform="translate(${x + 30} ${y - 8}) rotate(-10)"><rect x="-22" y="-18" width="44" height="12" rx="4" fill="${V}"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${-20 + i * 6}" y="-8" width="3" height="10" rx="1.5" fill="${V}"/>`).join('')}</g>`;

const headphones = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M-36 -54 Q-36 -112 0 -112 Q36 -112 36 -54" stroke="${D}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="-48" y="-66" width="24" height="40" rx="12" fill="${V}"/><rect x="24" y="-66" width="24" height="40" rx="12" fill="${V}"/>
  <rect x="-44" y="-60" width="10" height="28" rx="5" fill="${L}"/><rect x="34" y="-60" width="10" height="28" rx="5" fill="${L}"/>
  <path d="M-58 -96 q-6 8 0 16 M58 -96 q6 8 0 16" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;

const sneaker = (x, y) => sh(x, y + 2, 44) + `<g transform="translate(${x} ${y})">
  <path d="M-46 -6 Q-48 -40 -30 -46 Q-20 -30 -2 -34 L12 -26 Q40 -22 46 -10 Q48 0 40 0 H-40 Q-46 0 -46 -6Z" fill="${L}"/>
  <path d="M-46 -8 H46 Q48 0 40 2 H-40 Q-48 2 -46 -8Z" fill="${W}" stroke="${LT}" stroke-width="2"/>
  <path d="M-18 -36 L-12 -26 M-8 -34 L-2 -24 M2 -32 L8 -22" stroke="${D}" stroke-width="3" stroke-linecap="round"/>
  <path d="M-30 -46 Q-36 -52 -30 -58 Q-24 -52 -30 -46Z" fill="${V}"/>
  <path d="M30 -64 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1z" fill="${Y}"/></g>`;

const mic = (x, y) => sh(x, y + 2, 30) + `<g transform="translate(${x} ${y})">
  <path d="M-24 0 L0 -8 L24 0" stroke="${D}" stroke-width="5" stroke-linecap="round" fill="none"/><rect x="-3" y="-70" width="6" height="64" fill="${D}"/>
  <rect x="-12" y="-96" width="24" height="34" rx="10" fill="${D}"/><circle cx="0" cy="-104" r="18" fill="#AEB4C6"/>
  ${[-8, 0, 8].map(i => `<path d="M${i} -120 V-88" stroke="#8A90A8" stroke-width="2"/>`).join('')}<path d="M-16 -104 H16" stroke="#8A90A8" stroke-width="2"/>
  <path d="M26 -110 q8 6 0 14 M34 -116 q14 12 0 26" stroke="${V}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;

// Objetos extras para os cartões do caderno (mesmo estilo e mesmo quadro)
const car = (x, y) => sh(x, y + 2, 52) + `<g transform="translate(${x} ${y})">
  <path d="M-54 -14 Q-54 -30 -40 -32 L-26 -54 Q-22 -60 -14 -60 H18 Q26 -60 30 -54 L42 -32 Q56 -30 56 -14 V-6 Q56 0 50 0 H-48 Q-54 0 -54 -6Z" fill="${P}"/>
  <path d="M-20 -52 H-2 V-34 H-32Z M4 -52 H20 Q24 -52 26 -48 L34 -34 H4Z" fill="#CDEBFF"/>
  <rect x="44" y="-26" width="10" height="7" rx="3" fill="${Y}"/><rect x="-54" y="-24" width="8" height="6" rx="3" fill="${O}"/>
  <circle cx="-30" cy="-2" r="13" fill="${D}"/><circle cx="-30" cy="-2" r="5" fill="${LT}"/><circle cx="32" cy="-2" r="13" fill="${D}"/><circle cx="32" cy="-2" r="5" fill="${LT}"/></g>`;

const apple = (x, y) => sh(x, y + 2, 32) + `<g transform="translate(${x} ${y})">
  <path d="M0 -62 Q-14 -76 -30 -62 Q-46 -46 -38 -22 Q-30 0 -14 -2 Q-6 -4 0 -2 Q6 -4 14 -2 Q30 0 38 -22 Q46 -46 30 -62 Q14 -76 0 -62Z" fill="${P}"/>
  <path d="M0 -62 Q2 -76 8 -84" stroke="${BRD}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M6 -74 Q20 -88 30 -76 Q18 -66 6 -74Z" fill="${G}"/><ellipse cx="-20" cy="-48" rx="6" ry="10" fill="#fff" opacity=".35"/></g>`;

const cat = (x, y) => sh(x, y + 2, 34) + `<g transform="translate(${x} ${y})">
  <path d="M26 -10 Q52 -14 46 -44" stroke="#8A90A8" stroke-width="8" stroke-linecap="round" fill="none"/>
  <ellipse cx="4" cy="-22" rx="28" ry="22" fill="#AEB4C6"/>
  <circle cx="-14" cy="-56" r="20" fill="#AEB4C6"/><path d="M-32 -64 L-30 -86 L-16 -72Z M4 -64 L2 -86 L-12 -72Z" fill="#AEB4C6"/>
  <path d="M-28 -70 L-27 -80 L-21 -73Z M0 -70 L-1 -80 L-7 -73Z" fill="#FFB3C7"/>
  <circle cx="-21" cy="-58" r="3.2" fill="${D}"/><circle cx="-7" cy="-58" r="3.2" fill="${D}"/><path d="M-17 -50 L-14 -47 L-11 -50" stroke="${D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M-36 -50 H-26 M-36 -45 L-27 -47 M8 -50 H-2 M8 -45 L-1 -47" stroke="${D}" stroke-width="1.6" stroke-linecap="round"/></g>`;

const house = (x, y) => sh(x, y + 2, 50) + `<g transform="translate(${x} ${y})">
  <rect x="-40" y="-56" width="80" height="56" rx="4" fill="${Y}"/><path d="M-50 -52 L0 -96 L50 -52Z" fill="${V}"/>
  <rect x="24" y="-90" width="12" height="24" fill="${VD}"/>
  <rect x="-10" y="-32" width="20" height="32" rx="3" fill="${BR}"/><circle cx="5" cy="-16" r="2" fill="${Y}"/>
  <rect x="-32" y="-44" width="16" height="14" rx="2" fill="#CDEBFF"/><rect x="16" y="-44" width="16" height="14" rx="2" fill="#CDEBFF"/></g>`;

const key = (x, y) => sh(x, y + 2, 36) + `<g transform="translate(${x} ${y - 40}) rotate(-24)">
  <circle cx="-28" cy="0" r="20" fill="${Y}"/><circle cx="-28" cy="0" r="8" fill="${W}"/>
  <rect x="-10" y="-6" width="56" height="12" rx="4" fill="${Y}"/><rect x="28" y="4" width="8" height="14" rx="2" fill="${Y}"/><rect x="40" y="4" width="6" height="10" rx="2" fill="${Y}"/></g>`;

const sun = (x, y) => `<g transform="translate(${x} ${y - 58})">
  ${Array.from({ length: 10 }, (_, i) => `<rect x="-4" y="-54" width="8" height="16" rx="4" fill="${O}" transform="rotate(${i * 36})"/>`).join('')}
  <circle cx="0" cy="0" r="30" fill="${Y}"/><circle cx="-10" cy="-4" r="3.4" fill="${D}"/><circle cx="10" cy="-4" r="3.4" fill="${D}"/>
  <path d="M-10 8 Q0 18 10 8" stroke="${D}" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>`;

// Desenho do objeto de cada unidade (quadro 140 × 140, chão em y = 130)
const ART = { car, apple, cat, house, key, sun, mug, cake, cupcake, palette, hi, nametag, party, dog, colors, clock, food, city, beach, popcorn, suitcase, phone, boxes, calendar, bags, guitar, camera, plant, book, rain, palm, ball, sack, talk, train, thought, news, magnifier, scissors, headphones, sneaker, mic };
export function objectSvg(name) {
  const f = ART[name];
  return f ? f(70, 130) : '';
}
