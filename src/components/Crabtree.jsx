// Rosto do Mr. Crabtree, o Professor Rabugento (desenho próprio do Sacou).
// mood: grumpy | annoyed | surprised | proud. talking: o bigode mexe enquanto ele fala.
const BROWS = {
  grumpy: ['M44 60 L74 70', 'M86 70 L116 60'],
  annoyed: ['M44 66 L74 66', 'M86 60 Q100 50 116 54'],
  surprised: ['M44 58 Q59 46 74 56', 'M86 56 Q101 46 116 58'],
  proud: ['M44 64 Q59 58 74 64', 'M86 64 Q101 58 116 64'],
  thinking: ['M44 62 L74 66', 'M86 60 Q101 52 116 58'],
};
const MOUTH = {
  grumpy: <path d="M69 126 Q80 119 91 126" fill="none" stroke="#7A2E1F" strokeWidth="3.5" strokeLinecap="round" />,
  annoyed: <path d="M67 124 l6 -3 l7 3 l7 -3 l6 3" fill="none" stroke="#7A2E1F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />,
  surprised: <ellipse cx="80" cy="125" rx="6" ry="7.5" fill="#7A2E1F" />,
  proud: <path d="M68 121 Q80 130 92 121" fill="none" stroke="#7A2E1F" strokeWidth="3.5" strokeLinecap="round" />,
  thinking: <path d="M71 124 L89 124" fill="none" stroke="#7A2E1F" strokeWidth="3.5" strokeLinecap="round" />,
};

export default function Crabtree({ mood = 'grumpy', talking = false, size = 120 }) {
  const m = BROWS[mood] ? mood : 'grumpy';
  const eye = m === 'surprised' ? 4.6 : 3.4;
  return (
    <svg className={'crab' + (talking ? ' talking' : '')} viewBox="0 0 160 160" width={size} height={size} aria-hidden="true">
      <circle cx="80" cy="80" r="78" fill="#EEEAFE" />
      {/* camisa, colete e gravata-borboleta */}
      <path d="M26 160 Q30 134 80 132 Q130 134 134 160Z" fill="#5B3DF5" />
      <path d="M62 133 L80 150 L98 133 Q90 131 80 131 Q70 131 62 133Z" fill="#fff" />
      <path d="M80 142 L66 135 L66 151Z M80 142 L94 135 L94 151Z" fill="#C6F02E" stroke="#1B1E35" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="80" cy="142" r="3.4" fill="#1B1E35" />
      {/* orelhas e cabeça */}
      <ellipse cx="33" cy="86" rx="9" ry="13" fill="#E9B48D" />
      <ellipse cx="127" cy="86" rx="9" ry="13" fill="#E9B48D" />
      <ellipse cx="80" cy="84" rx="46" ry="50" fill="#F2C6A0" />
      {/* cabelo grisalho dos lados e um fio rebelde */}
      <path d="M36 74 Q32 46 52 40 Q44 54 46 72Z" fill="#C9CCD6" />
      <path d="M124 74 Q128 46 108 40 Q116 54 114 72Z" fill="#C9CCD6" />
      <path d="M80 34 Q76 20 86 16" fill="none" stroke="#C9CCD6" strokeWidth="3" strokeLinecap="round" />
      {/* sobrancelhas */}
      {BROWS[m].map((d, i) => <path key={i} d={d} fill="none" stroke="#9EA3B3" strokeWidth="7" strokeLinecap="round" />)}
      {/* óculos e olhos */}
      <circle cx="60" cy="81" r="14" fill="#fff" fillOpacity=".55" stroke="#1B1E35" strokeWidth="3" />
      <circle cx="100" cy="81" r="14" fill="#fff" fillOpacity=".55" stroke="#1B1E35" strokeWidth="3" />
      <path d="M74 80 Q80 76 86 80" fill="none" stroke="#1B1E35" strokeWidth="3" />
      <circle cx="60" cy="82" r={eye} fill="#1B1E35" />
      <circle cx="100" cy="82" r={eye} fill="#1B1E35" />
      {/* nariz, bochechas, boca e bigode */}
      <ellipse cx="80" cy="99" rx="8" ry="10" fill="#E39F78" />
      <circle cx="52" cy="104" r="6" fill="#F4A08C" opacity=".45" />
      <circle cx="108" cy="104" r="6" fill="#F4A08C" opacity=".45" />
      {MOUTH[m]}
      <path className="crab-stache" d="M52 112 Q64 102 80 108 Q96 102 108 112 Q104 120 92 117 Q86 115 80 113 Q74 115 68 117 Q56 120 52 112Z" fill="#B9BDC9" />
    </svg>
  );
}
