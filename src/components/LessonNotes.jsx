// Caderno dentro das lições: anotar sem sair do exercício e salvar palavras/frases.
import { createContext, useContext, useMemo } from 'react';
import { Icon } from './ui.jsx';
import { useNotebook, saveWord, findWord } from '../lib/notebook.js';
import { suggestPT } from '../lib/hints.js';
import { fx } from '../lib/fx.js';

// { lessonId, unitId, itemId } do exercício atual
export const LessonCtx = createContext(null);

// Salvar uma palavra tocada nas dicas (Hinted)
export function useWordSaver() {
  const ctx = useContext(LessonCtx);
  const { notes } = useNotebook();
  if (!ctx) return null;
  return {
    has: (en) => !!findWord(notes, en),
    save: (en, pt) => {
      const r = saveWord(notes, { en, pt, lessonId: ctx.lessonId, unitId: ctx.unitId, itemId: ctx.itemId });
      if (!r.existed) fx.play('click');
      return r;
    },
  };
}

// O que dá para guardar de cada tipo de exercício
export function itemCards(item) {
  const why = item.why || '';
  const fill = (en) => en.replace('___', item.answer);
  switch (item.type) {
    case 'meaning': case 'listen': return [{ en: item.en, pt: item.answer, plain: why }];
    case 'choice': return [{ en: fill(item.en), pt: null, plain: why }];
    case 'build': case 'type': return [{ en: item.answer, pt: item.pt, plain: why }];
    case 'dictation': return [{ en: item.en, pt: suggestPT(item.en), plain: why }];
    case 'dialogue': return [{ en: item.answer, pt: null, plain: why }];
    case 'speak': return [{ en: item.en, pt: item.pt, plain: why }];
    case 'match': return item.pairs.filter(([, pt]) => !/^\d+$/.test(pt)).map(([en, pt]) => ({ en, pt, plain: '' }));
    default: return [];
  }
}

export function SaveItemButton({ item }) {
  const ctx = useContext(LessonCtx);
  const { notes } = useNotebook();
  const cards = useMemo(() => itemCards(item), [item.id]);
  if (!cards.length || !ctx) return null;
  const saved = cards.every(c => findWord(notes, c.en));
  return (
    <button type="button" className="link-btn save-item" disabled={saved}
      onClick={() => { cards.forEach(c => saveWord(notes, { ...c, lessonId: ctx.lessonId, unitId: ctx.unitId, itemId: item.id })); fx.play('click'); }}>
      <Icon name={saved ? 'check' : 'notebook'} size={15} /> {saved ? 'Salvo no caderno' : cards.length > 1 ? `Salvar as ${cards.length} palavras no caderno` : 'Salvar no caderno'}
    </button>
  );
}

