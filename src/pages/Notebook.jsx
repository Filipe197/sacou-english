import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Shell, Spinner, Icon } from '../components/ui.jsx';
import NoteEditor from '../components/NoteEditor.jsx';
import { useNotebook, notebook, COLORS, COLOR_NAMES, snippet, relTime, exportMarkdown, isDue, gradeCard, findWord, BOX_DAYS } from '../lib/notebook.js';
import { getUnit, shuffle } from '../lib/content.js';
import { suggestPT } from '../lib/hints.js';
import { speak, canSpeak, fx } from '../lib/fx.js';

const fold = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const unitLabel = (id) => { const u = getUnit(id); return u ? `${u.level} · ${u.title}` : id; };

// ---------- pedaços reaproveitados ----------
export function SyncBadge({ sync }) {
  const map = {
    saved: ['ok', 'Salvo na nuvem'],
    saving: ['wait', 'Salvando…'],
    offline: ['warn', 'Sem conexão — salvo neste aparelho'],
    missing: ['warn', 'Salvo só neste aparelho'],
  };
  const m = map[sync];
  if (!m) return null;
  return (
    <span className={'sync ' + m[0]} role="status" title={sync === 'missing' ? 'O administrador precisa rodar supabase/003_caderno.sql no Supabase para sincronizar.' : undefined}>
      <span className="dot" />{m[1]}
      {sync === 'offline' && <button type="button" className="link-btn" style={{ padding: 0, fontSize: 13 }} onClick={() => notebook.retry()}>tentar agora</button>}
    </span>
  );
}

export function Toast({ toast, onClose }) {
  useEffect(() => { if (!toast) return; const t = setTimeout(onClose, 5000); return () => clearTimeout(t); }, [toast]);
  if (!toast) return null;
  return (
    <div className="nb-toast" role="status">
      <span>{toast.msg}</span>
      {toast.action && <button type="button" onClick={() => { toast.action.fn(); onClose(); }}>{toast.action.label}</button>}
      <button type="button" className="x" aria-label="Fechar aviso" onClick={onClose}><Icon name="x" size={16} /></button>
    </div>
  );
}

function ColorDots({ value, onChange }) {
  return (
    <div className="color-dots" role="radiogroup" aria-label="Cor">
      {COLORS.map(c => (
        <button key={c} type="button" role="radio" aria-checked={value === c} aria-label={COLOR_NAMES[c]} title={COLOR_NAMES[c]}
          className={'cdot c-' + c + (value === c ? ' on' : '')} onClick={() => onChange(c)} />
      ))}
    </div>
  );
}

function TagInput({ tags, onChange, all = [] }) {
  const [v, setV] = useState('');
  const add = (raw) => {
    const t = fold(raw).replace(/[^a-z0-9 -]/g, '').trim().replace(/\s+/g, '-').slice(0, 24);
    if (t && !tags.includes(t) && tags.length < 12) onChange([...tags, t]);
    setV('');
  };
  const sugg = v ? all.filter(t => t.startsWith(fold(v)) && !tags.includes(t)).slice(0, 4) : [];
  return (
    <div className="tag-input">
      <Icon name="tag" size={16} />
      {tags.map(t => (
        <span key={t} className="tag">#{t}<button type="button" aria-label={`Remover etiqueta ${t}`} onClick={() => onChange(tags.filter(x => x !== t))}>×</button></span>
      ))}
      <input value={v} onChange={e => setV(e.target.value)} placeholder={tags.length ? '' : 'Adicionar etiqueta'} aria-label="Nova etiqueta"
        onKeyDown={e => { if ((e.key === 'Enter' || e.key === ',') && v.trim()) { e.preventDefault(); add(v); } else if (e.key === 'Backspace' && !v && tags.length) onChange(tags.slice(0, -1)); }}
        onBlur={() => v.trim() && add(v)} />
      {sugg.map(s => <button key={s} type="button" className="tag sugg" onMouseDown={e => e.preventDefault()} onClick={() => add(s)}>#{s}</button>)}
    </div>
  );
}

function Levels({ box }) {
  return (
    <span className="levels" title={`Nível de memória ${box} de 6`} aria-label={`Nível de memória ${box} de 6`}>
      {[1, 2, 3, 4, 5, 6].map(i => <span key={i} className={i <= box ? 'on' : ''} />)}
    </span>
  );
}

// ---------- formulário de palavra ----------
export function WordForm({ initial, notes, onClose, onSaved, allTags = [] }) {
  const editing = !!initial?.id;
  const [f, setF] = useState(() => ({ en: '', pt: '', example: '', plain: '', tags: [], color: 'none', ...Object.fromEntries(Object.entries(initial || {}).map(([k, v]) => [k, v ?? (k === 'tags' ? [] : '')])) }));
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF(x => ({ ...x, [k]: e.target ? e.target.value : e }));
  const hint = !f.pt && f.en ? suggestPT(f.en) : null;
  const dup = !editing && f.en && findWord(notes, f.en);

  function save(e) {
    e.preventDefault();
    if (!f.en.trim()) { setErr('Escreva a palavra ou expressão em inglês.'); return; }
    if (dup) { setErr('Essa palavra já está no seu caderno.'); return; }
    const patch = { en: f.en.trim(), pt: f.pt.trim() || null, example: f.example.trim() || null, plain: f.plain.trim(), tags: f.tags, color: f.color };
    let n;
    if (editing) { notebook.update(initial.id, patch); n = { ...initial, ...patch }; }
    else n = notebook.create({ kind: 'word', due_at: new Date().toISOString(), lesson_id: initial?.lesson_id || null, unit_id: initial?.unit_id || null, item_id: initial?.item_id || null, ...patch });
    fx.play('click');
    onSaved?.(n, editing);
    onClose();
  }

  return (
    <div className="nb-modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="nb-modal" onSubmit={save} role="dialog" aria-modal="true" aria-label={editing ? 'Editar palavra' : 'Nova palavra'}
        onKeyDown={e => e.key === 'Escape' && onClose()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>{editing ? 'Editar palavra' : 'Nova palavra'}</h2>
          <button type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}><Icon name="x" size={22} /></button>
        </div>
        <div className="field">
          <label htmlFor="w-en">Em inglês</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input id="w-en" lang="en" autoFocus value={f.en} onChange={set('en')} placeholder="Ex.: excuse me" style={{ flex: 1 }} autoComplete="off" />
            {canSpeak() && <button type="button" className="btn btn-out" style={{ padding: '0 14px' }} aria-label="Ouvir" onClick={() => f.en && speak(f.en)}><Icon name="sound" size={20} /></button>}
          </div>
          {dup && <span className="hint" style={{ color: 'var(--bad-d)' }}>Já está no caderno: {dup.en} = {dup.pt}</span>}
        </div>
        <div className="field" style={{ marginTop: 14 }}>
          <label htmlFor="w-pt">Em português</label>
          <input id="w-pt" value={f.pt} onChange={set('pt')} placeholder="Ex.: com licença" autoComplete="off" />
          {hint && <button type="button" className="link-btn" style={{ alignSelf: 'flex-start', padding: 0 }} onClick={() => setF(x => ({ ...x, pt: hint }))}>Sugestão: “{hint}” — usar</button>}
        </div>
        <div className="field" style={{ marginTop: 14 }}>
          <label htmlFor="w-ex">Frase de exemplo <span className="muted" style={{ fontWeight: 400 }}>(opcional)</span></label>
          <input id="w-ex" lang="en" value={f.example} onChange={set('example')} placeholder="Ex.: Excuse me, where is the bank?" autoComplete="off" />
        </div>
        <div className="field" style={{ marginTop: 14 }}>
          <label htmlFor="w-nt">Minha anotação <span className="muted" style={{ fontWeight: 400 }}>(opcional)</span></label>
          <textarea id="w-nt" rows={2} value={f.plain} onChange={set('plain')} placeholder="Uma dica para lembrar, quando usar..." />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 14 }}>
          <ColorDots value={f.color} onChange={set('color')} />
          <div style={{ flex: 1, minWidth: 200 }}><TagInput tags={f.tags} onChange={set('tags')} all={allTags} /></div>
        </div>
        {err && <div className="alert" role="alert" style={{ marginTop: 14 }}>{err}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-out" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-violet">{editing ? 'Salvar' : 'Adicionar ao caderno'}</button>
        </div>
      </form>
    </div>
  );
}

// ---------- painel da anotação ----------
function NotePane({ note, allTags, onBack, onDelete, onMakeCard }) {
  const unit = note.unit_id ? getUnit(note.unit_id) : null;
  const [title, setTitle] = useState(note.title);
  useEffect(() => setTitle(note.title), [note.id]);
  const words = note.plain ? note.plain.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className={'nb-pane-in c-' + note.color}>
      <div className="nb-pane-top">
        <button type="button" className="icon-btn nb-back" aria-label="Voltar para a lista" onClick={onBack}><Icon name="back" size={22} /></button>
        <div className="nb-meta">
          {unit && <Link className="chip violet" to={`/guia/${unit.id}`} title="Abrir o guia da unidade"><Icon name="book" size={14} />{unit.level} · {unit.title}</Link>}
          <span className="muted" style={{ fontSize: 13 }}>Editado {relTime(note.updated_at)} · {words} {words === 1 ? 'palavra' : 'palavras'}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          <button type="button" className={'icon-btn' + (note.pinned ? ' pinned' : '')} aria-pressed={note.pinned} aria-label={note.pinned ? 'Desafixar' : 'Fixar no topo'} title={note.pinned ? 'Desafixar' : 'Fixar no topo'}
            onClick={() => notebook.update(note.id, { pinned: !note.pinned }, { touch: false })}><Icon name="pin" size={20} /></button>
          <button type="button" className="icon-btn" aria-label="Apagar anotação" title="Apagar" onClick={() => onDelete(note)}><Icon name="trash" size={20} /></button>
        </div>
      </div>
      <input className="nb-title" value={title} placeholder="Sem título" aria-label="Título da anotação" maxLength={200}
        onChange={e => { setTitle(e.target.value); notebook.update(note.id, { title: e.target.value }); }} />
      <div className="nb-props">
        <ColorDots value={note.color} onChange={(c) => notebook.update(note.id, { color: c }, { touch: false })} />
        <div style={{ flex: 1, minWidth: 220 }}><TagInput tags={note.tags || []} all={allTags} onChange={(tags) => notebook.update(note.id, { tags })} /></div>
      </div>
      <NoteEditor key={note.id} note={note} unit={unit} autofocus={!note.plain && !!note.title}
        onMakeCard={(t) => onMakeCard(t, note)}
        onSave={(content, plain) => notebook.update(note.id, { content, plain: plain.slice(0, 60000) })} />
    </div>
  );
}

// ---------- flashcards ----------
function Flashcards({ words }) {
  const due = words.filter(isDue);
  const [dir, setDir] = useState('en'); // en: inglês → português
  const [s, setS] = useState(null);

  function start(list) {
    setS({ queue: shuffle(list).slice(0, 20), idx: 0, flipped: false, right: 0, wrong: 0, again: new Set() });
  }
  const card = s && s.queue[s.idx];
  const front = card && (dir === 'en' ? card.en : (card.pt || card.en));

  useEffect(() => { if (card && dir === 'en' && !s.flipped) speak(card.en); }, [s?.idx, card?.id]);

  function flip() { if (!s || s.flipped) return; setS({ ...s, flipped: true }); if (dir === 'pt') speak(card.en); }
  function grade(g) {
    gradeCard(card, g);
    fx.play(g === 'again' ? 'wrong' : 'correct');
    const queue = [...s.queue];
    const again = new Set(s.again);
    if (g === 'again' && !again.has(card.id)) { queue.push(card); again.add(card.id); }
    setS({ ...s, queue, again, idx: s.idx + 1, flipped: false, right: s.right + (g !== 'again' ? 1 : 0), wrong: s.wrong + (g === 'again' ? 1 : 0) });
  }

  useEffect(() => {
    if (!card) return;
    const onKey = (e) => {
      if (e.target.closest('input,textarea,[contenteditable="true"]')) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      else if (s.flipped && e.key === '1') grade('again');
      else if (s.flipped && e.key === '2') grade('good');
      else if (s.flipped && e.key === '3') grade('easy');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!words.length) {
    return (
      <div className="card nb-empty">
        <Icon name="cards" size={40} color="var(--violet)" />
        <h2>Nenhum cartão ainda</h2>
        <p className="muted">Durante as lições, toque numa palavra sublinhada e em <b>“+ Caderno”</b>, ou use <b>“Salvar no caderno”</b> depois de responder. As palavras salvas viram cartões de memória aqui.</p>
      </div>
    );
  }

  if (s && !card) {
    return (
      <div className="card nb-empty">
        <Icon name="check" size={44} color="var(--ok)" stroke={2.6} />
        <h2>Revisão concluída!</h2>
        <p className="muted">Você lembrou de <b>{s.right}</b> {s.right === 1 ? 'cartão' : 'cartões'} e errou <b>{s.wrong}</b>. Cada acerto empurra o cartão para mais longe: ele volta em 1, 2, 4, 8, 16 e depois 32 dias.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-violet" onClick={() => setS(null)}>Voltar</button>
          {words.filter(isDue).length > 0 && <button className="btn btn-out" onClick={() => start(words.filter(isDue))}>Revisar os que faltam ({words.filter(isDue).length})</button>}
        </div>
      </div>
    );
  }

  if (!s) {
    return (
      <div className="fc-start">
        <div className="card fc-hero">
          <div>
            <b style={{ fontSize: 22, fontFamily: 'var(--head)' }}>{due.length ? `${due.length} ${due.length === 1 ? 'cartão para revisar' : 'cartões para revisar'} hoje` : 'Tudo em dia!'}</b>
            <p style={{ margin: '6px 0 0', color: 'var(--on-dark)' }}>{due.length ? 'Até 20 cartões por rodada. Vire o cartão, veja a resposta e diga se lembrou.' : 'Nenhum cartão vence hoje. Se quiser, treine todos mesmo assim.'}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {due.length > 0 && <button className="btn btn-lime btn-lg" onClick={() => start(due)}><Icon name="flip" size={18} />Começar revisão</button>}
            <button className={'btn btn-lg ' + (due.length ? 'btn-ghost-dark' : 'btn-lime')} onClick={() => start(words)}>Treinar todos ({words.length})</button>
          </div>
        </div>
        <div className="seg" role="radiogroup" aria-label="Direção dos cartões">
          <button type="button" role="radio" aria-checked={dir === 'en'} className={dir === 'en' ? 'on' : ''} onClick={() => setDir('en')}>Inglês → Português</button>
          <button type="button" role="radio" aria-checked={dir === 'pt'} className={dir === 'pt' ? 'on' : ''} onClick={() => setDir('pt')}>Português → Inglês</button>
        </div>
        <div className="fc-boxes">
          {[0, 1, 2, 3, 4, 5, 6].map(b => {
            const n = words.filter(w => (w.box || 0) === b).length;
            return <div key={b} className="fc-box"><b>{n}</b><span>{b === 0 ? 'Novos' : `Nível ${b}`}</span><small>{b === 0 ? 'hoje' : `a cada ${BOX_DAYS[b]} ${BOX_DAYS[b] === 1 ? 'dia' : 'dias'}`}</small></div>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="fc">
      <div className="fc-top">
        <button type="button" className="icon-btn" aria-label="Encerrar revisão" onClick={() => setS({ ...s, queue: s.queue.slice(0, s.idx) })}><Icon name="x" size={22} /></button>
        <div className="track" style={{ flex: 1 }}><div className="fill" style={{ width: (s.idx / s.queue.length) * 100 + '%' }} /></div>
        <span className="muted" style={{ fontWeight: 700, fontSize: 14 }}>{s.idx + 1}/{s.queue.length}</span>
      </div>
      <button type="button" className={'fc-card' + (s.flipped ? ' flipped' : '')} onClick={flip} aria-label={s.flipped ? 'Cartão virado' : 'Virar o cartão'}>
        <span className="fc-face fc-front">
          <small>{dir === 'en' ? 'Em inglês' : 'Em português'}</small>
          <span className="fc-word" lang={dir === 'en' ? 'en' : 'pt-BR'}>{front}</span>
          <span className="muted" style={{ fontSize: 14 }}>Toque para virar · espaço</span>
        </span>
        <span className="fc-face fc-back">
          <small>{dir === 'en' ? 'Em português' : 'Em inglês'}</small>
          <span className="fc-word" lang={dir === 'en' ? 'pt-BR' : 'en'}>{dir === 'en' ? (card.pt || '—') : card.en}</span>
          {card.example && <span className="fc-ex" lang="en">“{card.example}”</span>}
          {card.plain && <span className="fc-note">{card.plain}</span>}
        </span>
      </button>
      <div className="fc-actions">
        {canSpeak() && <button type="button" className="btn btn-out" onClick={() => speak(card.en)}><Icon name="sound" size={18} />Ouvir</button>}
        {canSpeak() && <button type="button" className="btn btn-out" onClick={() => speak(card.example || card.en, { slow: true })} aria-label="Ouvir devagar"><Icon name="turtle" size={18} /></button>}
      </div>
      {s.flipped ? (
        <div className="fc-grades">
          <button type="button" className="btn btn-lg g-again" onClick={() => grade('again')}>Errei<small>1 · volta já</small></button>
          <button type="button" className="btn btn-lg g-good" onClick={() => grade('good')}>Lembrei<small>2 · {BOX_DAYS[Math.min(6, (card.box || 0) + 1)]} d</small></button>
          <button type="button" className="btn btn-lg g-easy" onClick={() => grade('easy')}>Fácil<small>3 · {BOX_DAYS[Math.min(6, (card.box || 0) + 2)]} d</small></button>
        </div>
      ) : (
        <div className="fc-grades"><button type="button" className="btn btn-violet btn-lg btn-3d" style={{ gridColumn: '1 / -1' }} onClick={flip} autoFocus>Mostrar resposta</button></div>
      )}
    </div>
  );
}

// ---------- página ----------
export default function Notebook() {
  const { notes, sync, loaded } = useNotebook();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const tab = params.get('aba') || 'notas';
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all'); // all | pinned | unit:<id> | tag:<t>
  const [wordForm, setWordForm] = useState(null);
  const [toast, setToast] = useState(null);
  const searchRef = useRef(null);

  const allNotes = notes.filter(n => n.kind === 'note');
  const words = notes.filter(n => n.kind === 'word');
  const allTags = useMemo(() => [...new Set(notes.flatMap(n => n.tags || []))].sort(), [notes]);
  const unitsUsed = useMemo(() => [...new Set(notes.map(n => n.unit_id).filter(Boolean))], [notes]);
  const dueCount = words.filter(isDue).length;

  // nova anotação vinda de outra página (?nova=1&unidade=a1-u1)
  useEffect(() => {
    if (!loaded || params.get('nova') !== '1') return;
    const unit = params.get('unidade');
    const u = unit && getUnit(unit);
    const n = notebook.create({ unit_id: u ? u.id : null, title: u ? `Anotações — ${u.title}` : '' });
    nav(`/caderno/${n.id}`, { replace: true });
  }, [loaded]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus(); }
      if (e.altKey && e.key.toLowerCase() === 'n') { e.preventDefault(); newNote(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const match = (n) => {
    if (filter === 'pinned' && !n.pinned) return false;
    if (filter.startsWith('unit:') && n.unit_id !== filter.slice(5)) return false;
    if (filter.startsWith('tag:') && !(n.tags || []).includes(filter.slice(4))) return false;
    if (!q.trim()) return true;
    const hay = fold([n.title, n.plain, n.en, n.pt, n.example, ...(n.tags || []).map(t => '#' + t)].join(' '));
    return fold(q).split(/\s+/).every(w => hay.includes(w));
  };
  const listNotes = allNotes.filter(match);
  const listWords = words.filter(match);
  const open = id ? notebook.get(id) : null;

  function setTab(t) { const p = new URLSearchParams(params); p.set('aba', t); p.delete('nova'); p.delete('unidade'); setParams(p); }
  function newNote() {
    const n = notebook.create({ unit_id: filter.startsWith('unit:') ? filter.slice(5) : null, tags: filter.startsWith('tag:') ? [filter.slice(4)] : [] });
    nav(`/caderno/${n.id}?aba=notas`);
  }
  function del(n) {
    const removed = notebook.remove(n.id);
    if (n.kind === 'note') nav('/caderno?aba=notas');
    setToast({ msg: n.kind === 'note' ? 'Anotação apagada.' : `“${n.en}” saiu do caderno.`, action: { label: 'Desfazer', fn: () => notebook.restore(removed) } });
  }
  function makeCard(text, note) {
    setWordForm({ en: text.slice(0, 300), pt: suggestPT(text) || '', lesson_id: note?.lesson_id, unit_id: note?.unit_id });
  }

  if (!loaded) return <Spinner />;

  const listHead = (
    <div className="nb-tools">
      <label className="nb-search">
        <Icon name="search" size={18} />
        <input ref={searchRef} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar no caderno (Ctrl+K)" aria-label="Buscar no caderno" />
      </label>
      <div className="nb-filters" role="group" aria-label="Filtros">
        <button type="button" className={'chip' + (filter === 'all' ? ' on' : '')} onClick={() => setFilter('all')}>Tudo</button>
        <button type="button" className={'chip' + (filter === 'pinned' ? ' on' : '')} onClick={() => setFilter('pinned')}><Icon name="pin" size={13} />Fixadas</button>
        {unitsUsed.length > 0 && (
          <select className={'chip' + (filter.startsWith('unit:') ? ' on' : '')} aria-label="Filtrar por unidade" value={filter.startsWith('unit:') ? filter : ''}
            onChange={e => setFilter(e.target.value || 'all')}>
            <option value="">Unidade…</option>
            {unitsUsed.map(u => <option key={u} value={'unit:' + u}>{unitLabel(u)}</option>)}
          </select>
        )}
        {allTags.slice(0, 8).map(t => (
          <button key={t} type="button" className={'chip' + (filter === 'tag:' + t ? ' on' : '')} onClick={() => setFilter(filter === 'tag:' + t ? 'all' : 'tag:' + t)}>#{t}</button>
        ))}
      </div>
    </div>
  );

  return (
    <Shell>
      <div className="nb">
        <div className="nb-head">
          <div>
            <h1 style={{ fontSize: 36, margin: 0 }}>Meu caderno</h1>
            <SyncBadge sync={sync} />
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-out" onClick={() => exportMarkdown(notes, unitLabel)} disabled={!notes.length} title="Baixar tudo como arquivo Markdown"><Icon name="download" size={18} />Exportar</button>
            <button className="btn btn-out" onClick={() => setWordForm({})}><Icon name="cards" size={18} />Nova palavra</button>
            <button className="btn btn-violet btn-3d" onClick={newNote} title="Alt+N"><Icon name="plus" size={18} />Nova anotação</button>
          </div>
        </div>

        <div className="nb-tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'notas'} className={tab === 'notas' ? 'on' : ''} onClick={() => setTab('notas')}><Icon name="edit" size={17} />Anotações <span>{allNotes.length}</span></button>
          <button role="tab" aria-selected={tab === 'palavras'} className={tab === 'palavras' ? 'on' : ''} onClick={() => setTab('palavras')}><Icon name="book" size={17} />Vocabulário <span>{words.length}</span></button>
          <button role="tab" aria-selected={tab === 'cartoes'} className={tab === 'cartoes' ? 'on' : ''} onClick={() => setTab('cartoes')}><Icon name="cards" size={17} />Cartões {dueCount > 0 && <span className="due">{dueCount}</span>}</button>
        </div>

        {sync === 'missing' && (
          <div className="note" style={{ marginBottom: 16 }}>
            Seu caderno está salvo <b>só neste aparelho</b> por enquanto: a tabela do caderno ainda não foi criada no servidor.
            Quando ela for criada (arquivo <code>supabase/003_caderno.sql</code>), tudo sobe sozinho.
          </div>
        )}

        {tab === 'notas' && (
          <div className={'nb-split' + (open ? ' has-open' : '')}>
            <aside className="nb-list">
              {listHead}
              {!allNotes.length ? (
                <div className="nb-empty small">
                  <Icon name="notebook" size={36} color="var(--violet)" />
                  <b>Seu caderno está vazio</b>
                  <p className="muted">Anote regras, frases e dúvidas. Dentro das lições, toque no ícone de caderno no topo para anotar sem sair do exercício.</p>
                  <button className="btn btn-violet" onClick={newNote}><Icon name="plus" size={18} />Primeira anotação</button>
                </div>
              ) : !listNotes.length ? (
                <p className="muted" style={{ padding: 16 }}>Nada encontrado{q ? ` para “${q}”` : ''}.</p>
              ) : (
                <ul className="nb-items">
                  {listNotes.map(n => (
                    <li key={n.id}>
                      <Link to={`/caderno/${n.id}?aba=notas`} className={'nb-item c-' + n.color + (open?.id === n.id ? ' on' : '')} aria-current={open?.id === n.id ? 'true' : undefined}>
                        <span className="nb-item-t">{n.pinned && <Icon name="pin" size={13} />}{n.title || 'Sem título'}</span>
                        <span className="nb-item-s">{snippet(n) || 'Anotação vazia'}</span>
                        <span className="nb-item-m">
                          {n.unit_id && <span className="mini">{getUnit(n.unit_id)?.level} · {getUnit(n.unit_id)?.title}</span>}
                          {(n.tags || []).slice(0, 2).map(t => <span key={t} className="mini tagm">#{t}</span>)}
                          <span style={{ marginLeft: 'auto' }}>{relTime(n.updated_at)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
            <section className="nb-pane" aria-label="Anotação aberta">
              {open && open.kind === 'note' ? (
                <NotePane note={open} allTags={allTags} onBack={() => nav('/caderno?aba=notas')} onDelete={del} onMakeCard={makeCard} />
              ) : (
                <div className="nb-empty">
                  <Icon name="edit" size={40} color="var(--violet)" />
                  <h2>{allNotes.length ? 'Escolha uma anotação' : 'Comece seu caderno'}</h2>
                  <p className="muted">Formate com títulos, listas, tarefas e marca-texto. Selecione um texto em inglês para ouvir a pronúncia ou transformá-lo em cartão de memória.</p>
                  <button className="btn btn-violet" onClick={newNote}><Icon name="plus" size={18} />Nova anotação</button>
                </div>
              )}
            </section>
          </div>
        )}

        {tab === 'palavras' && (
          <>
            {listHead}
            {!words.length ? (
              <div className="card nb-empty">
                <Icon name="book" size={40} color="var(--violet)" />
                <h2>Seu vocabulário começa aqui</h2>
                <p className="muted">Salve palavras durante as lições (toque numa palavra sublinhada → <b>+ Caderno</b>) ou adicione à mão.</p>
                <button className="btn btn-violet" onClick={() => setWordForm({})}><Icon name="plus" size={18} />Adicionar palavra</button>
              </div>
            ) : !listWords.length ? <p className="muted">Nada encontrado{q ? ` para “${q}”` : ''}.</p> : (
              <div className="wgrid">
                {listWords.map(w => (
                  <article key={w.id} className={'wcard c-' + w.color}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <b className="wcard-en" lang="en">{w.en}</b>
                        <span className="wcard-pt">{w.pt || '—'}</span>
                      </div>
                      {canSpeak() && <button type="button" className="icon-btn" aria-label={`Ouvir ${w.en}`} onClick={() => speak(w.en)}><Icon name="sound" size={20} /></button>}
                    </div>
                    {w.example && <button type="button" className="wcard-ex" lang="en" onClick={() => speak(w.example)} title="Ouvir o exemplo">“{w.example}”</button>}
                    {w.plain && <p className="wcard-note">{w.plain}</p>}
                    <div className="wcard-foot">
                      <Levels box={w.box || 0} />
                      {w.unit_id && <span className="mini">{getUnit(w.unit_id)?.level} · {getUnit(w.unit_id)?.title}</span>}
                      {(w.tags || []).slice(0, 2).map(t => <span key={t} className="mini tagm">#{t}</span>)}
                      <span style={{ marginLeft: 'auto', display: 'flex' }}>
                        <button type="button" className="icon-btn sm" aria-label={`Editar ${w.en}`} onClick={() => setWordForm(w)}><Icon name="edit" size={17} /></button>
                        <button type="button" className="icon-btn sm" aria-label={`Apagar ${w.en}`} onClick={() => del(w)}><Icon name="trash" size={17} /></button>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'cartoes' && <Flashcards words={words} />}
      </div>

      {wordForm && <WordForm initial={wordForm} notes={notes} allTags={allTags} onClose={() => setWordForm(null)}
        onSaved={(n, editing) => !editing && setToast({ msg: `“${n.en}” entrou no seu vocabulário.`, action: tab !== 'palavras' ? { label: 'Ver', fn: () => setTab('palavras') } : null })} />}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </Shell>
  );
}
