import { useEffect, useMemo, useState } from 'react';
import { hintPieces, ptKeyToEn } from '../lib/hints.js';
import { speak } from '../lib/fx.js';
import { useWordSaver } from './LessonNotes.jsx';

// Texto com dicas: palavras com tradução ficam sublinhadas; toque para ver.
// Palavras novas (newKeys) aparecem destacadas em roxo.
export default function Hinted({ text, lang = 'en', newKeys }) {
  const pieces = useMemo(() => hintPieces(text, lang), [text, lang]);
  const [open, setOpen] = useState(null);
  const saver = useWordSaver();
  useEffect(() => {
    if (open === null) return;
    const close = () => setOpen(null);
    const t = setTimeout(() => document.addEventListener('click', close, { once: true }), 0);
    return () => { clearTimeout(t); document.removeEventListener('click', close); };
  }, [open]);

  return (
    <>
      {pieces.map((p, i) => {
        if (!p.hint) return <span key={i}>{p.text}</span>;
        const isNew = newKeys && (lang === 'en' ? newKeys.has(p.key) : newKeys.has(ptKeyToEn(p.key)));
        return (
          <span key={i} className={'hw' + (isNew ? ' new' : '') + (open === i ? ' open' : '')} role="button" tabIndex={0}
            aria-label={`${p.text}: ${p.hint}`}
            onClick={(e) => { e.stopPropagation(); setOpen(open === i ? null : i); if (lang === 'en') speak(p.text); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen(open === i ? null : i); } }}>
            {p.text}
            {open === i && <span className="hw-pop" role="tooltip" lang={lang === 'en' ? 'pt-BR' : 'en'}>{p.hint}
              {saver && (() => {
                const en = lang === 'en' ? p.text : p.hint.split(' / ')[0];
                const pt = lang === 'en' ? p.hint : p.text;
                const has = saver.has(en);
                return <button type="button" className="hw-save" disabled={has} onClick={(e) => { e.stopPropagation(); saver.save(en.replace(/[?!.,]+$/, ''), pt); setOpen(null); }}>{has ? '✓ No caderno' : '+ Caderno'}</button>;
              })()}
            </span>}
          </span>
        );
      })}
    </>
  );
}
