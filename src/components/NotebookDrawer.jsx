// Painel lateral do caderno dentro da lição (carregado só quando aberto)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './ui.jsx';
import NoteEditor from './NoteEditor.jsx';
import NotebookSearch from './NotebookSearch.jsx';
import { useNotebook, notebook } from '../lib/notebook.js';
import { getLesson } from '../lib/content.js';
import { speak } from '../lib/fx.js';

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));

export default function NotebookDrawer({ lessonId, unit, onClose }) {
  const { notes } = useNotebook();
  const lesson = getLesson(lessonId);
  const existing = notes.find(n => n.kind === 'note' && n.lesson_id === lessonId);
  const [draftId] = useState(newId);
  const note = existing || { id: draftId, content: null, plain: '', title: '' };
  const words = notes.filter(n => n.kind === 'word' && n.lesson_id === lessonId);
  const [tab, setTab] = useState('lesson'); // lesson: anotar · find: consultar todo o caderno

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function save(content, plain) {
    if (notebook.get(note.id)) notebook.update(note.id, { content, plain });
    else if (plain.trim()) notebook.create({ id: note.id, kind: 'note', lesson_id: lessonId, unit_id: unit?.id || null, title: lesson ? `${lesson.unit.title} — ${lesson.title}` : 'Anotações da lição', content, plain });
  }

  return (
    <>
      <div className="nb-drawer-bg" onClick={onClose} />
      <aside className="nb-drawer" role="dialog" aria-label="Caderno da lição">
        <div className="nb-drawer-top">
          <div style={{ minWidth: 0 }}>
            <span className="eyebrow" style={{ margin: 0, fontSize: 12 }}>Caderno</span>
            <b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lesson ? lesson.title : 'Anotações'}</b>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {existing && <Link className="icon-btn" to={`/caderno/${existing.id}`} aria-label="Abrir no caderno" title="Abrir no caderno (sai da lição)"><Icon name="expand" size={20} /></Link>}
            <button type="button" className="icon-btn" aria-label="Fechar caderno" onClick={onClose}><Icon name="x" size={22} /></button>
          </div>
        </div>
        <div className="nb-tabs nb-drawer-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'lesson'} className={tab === 'lesson' ? 'on' : ''} onClick={() => setTab('lesson')}><Icon name="edit" size={16} />Esta lição</button>
          <button type="button" role="tab" aria-selected={tab === 'find'} className={tab === 'find' ? 'on' : ''} onClick={() => setTab('find')}><Icon name="search" size={16} />Consultar</button>
        </div>
        {tab === 'find' ? <NotebookSearch unit={unit} lessonId={lessonId} /> : <>
        <NoteEditor key={note.id} note={note} compact unit={unit} autofocus placeholder="Anote aqui o que está aprendendo nesta lição..." onSave={save} />
        <p className="muted" style={{ fontSize: 13, margin: '8px 0 0' }}>Salva sozinho enquanto você escreve. Tudo fica em <b>Caderno</b>, no menu.</p>
        </>}
        {tab === 'lesson' && words.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <b style={{ fontSize: 14 }}>Palavras salvas nesta lição</b>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {words.map(w => (
                <button key={w.id} type="button" className="chip" onClick={() => speak(w.en)} title="Ouvir">
                  <b lang="en">{w.en}</b>{w.pt && <span className="muted"> = {w.pt}</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
