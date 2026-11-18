// Aba "Consultar" do caderno dentro da lição: busca em todo o caderno
// (anotações, vocabulário, respostas salvas do Tirar dúvidas) e nos guias de
// gramática, só para leitura, sem sair do exercício.
import { useMemo, useState } from 'react';
import { Icon } from './ui.jsx';
import { useNotebook, snippet } from '../lib/notebook.js';
import { UNITS } from '../lib/content.js';
import { speak, canSpeak } from '../lib/fx.js';

const MAX = 12; // resultados por grupo
// minúsculas e sem acento: "duvida" acha "dúvida", "THOSE" acha "those"
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const has = (q) => (...parts) => parts.some(p => norm(p).includes(q));

export default function NotebookSearch({ unit, lessonId }) {
  const { notes } = useNotebook();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null); // id do resultado aberto
  const term = norm(q.trim());
  const searching = term.length >= 2;

  const results = useMemo(() => {
    if (!searching) return null;
    const m = has(term);
    const guides = [];
    for (const u of UNITS) {
      const g = u.guide;
      const whole = m(g.title, g.intro, u.title);
      const points = g.points.filter(p => m(p.en, p.pt, p.note));
      const tips = (g.tips || []).filter(t => m(t));
      if (whole || points.length || tips.length) guides.push({ u, points: whole && !points.length ? g.points : points, tips: whole && !tips.length ? (g.tips || []) : tips });
    }
    const docs = notes.filter(n => n.kind !== 'word' && m(n.title, n.plain, ...(n.tags || [])));
    const words = notes.filter(n => n.kind === 'word' && m(n.en, n.pt, n.example, n.plain));
    return { guides: guides.slice(0, MAX), docs: docs.slice(0, MAX), words: words.slice(0, MAX * 2) };
  }, [term, searching, notes]);

  const recent = useMemo(() => notes.filter(n => n.kind !== 'word' && n.lesson_id !== lessonId && n.plain?.trim())
    .sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || ''))).slice(0, 4), [notes, lessonId]);
  const empty = results && !results.guides.length && !results.docs.length && !results.words.length;
  const toggle = (id) => setOpen(o => (o === id ? null : id));

  return (
    <div className="nb-find">
      <label className="nb-search">
        <Icon name="search" size={18} />
        <input type="text" value={q} onChange={e => { setQ(e.target.value); setOpen(null); }} autoFocus
          placeholder="Buscar: those, passado, do/does…" aria-label="Buscar no caderno e nos guias" enterKeyHint="search" />
        {q && <button type="button" className="nb-find-clear" aria-label="Limpar busca" onClick={() => setQ('')}><Icon name="x" size={16} /></button>}
      </label>

      {!searching && (
        <>
          <p className="muted nb-find-hint">Procure em todas as suas anotações, nas palavras salvas, nas respostas do Tirar dúvidas e nos guias de gramática. A lição continua de onde parou.</p>
          {unit?.guide && <GuideCard u={unit} points={unit.guide.points} tips={unit.guide.tips || []} open={open === 'g-' + unit.id} onToggle={() => toggle('g-' + unit.id)} label="Guia desta unidade" />}
          {recent.length > 0 && (
            <Group title="Anotações recentes">
              {recent.map(n => <DocCard key={n.id} n={n} open={open === n.id} onToggle={() => toggle(n.id)} />)}
            </Group>
          )}
        </>
      )}

      {empty && <p className="muted nb-find-hint">Nada encontrado para “{q.trim()}”. Tente outra palavra, em inglês ou em português.</p>}
      {results?.guides.length > 0 && (
        <Group title="Guia de gramática">
          {results.guides.map(({ u, points, tips }) => <GuideCard key={u.id} u={u} points={points} tips={tips} open={open === 'g-' + u.id} onToggle={() => toggle('g-' + u.id)} />)}
        </Group>
      )}
      {results?.docs.length > 0 && (
        <Group title="Anotações">
          {results.docs.map(n => <DocCard key={n.id} n={n} open={open === n.id} onToggle={() => toggle(n.id)} />)}
        </Group>
      )}
      {results?.words.length > 0 && (
        <Group title="Vocabulário">
          <div className="nb-find-words">
            {results.words.map(w => (
              <button key={w.id} type="button" className="chip" onClick={() => canSpeak() && speak(w.en)} title="Ouvir">
                <b lang="en">{w.en}</b>{w.pt && <span className="muted"> = {w.pt}</span>}
              </button>
            ))}
          </div>
        </Group>
      )}
    </div>
  );
}

function Group({ title, children }) {
  return <section className="nb-find-group"><h3>{title}</h3>{children}</section>;
}

function DocCard({ n, open, onToggle }) {
  return (
    <div className={'nb-find-item' + (open ? ' open' : '')}>
      <button type="button" className="nb-find-head" onClick={onToggle} aria-expanded={open}>
        <b>{n.title || 'Sem título'}</b>
        {!open && <span className="muted">{snippet(n, 90)}</span>}
        <Icon name="arrow" size={16} />
      </button>
      {open && <div className="nb-find-body">{n.plain}</div>}
    </div>
  );
}

function GuideCard({ u, points, tips, open, onToggle, label }) {
  return (
    <div className={'nb-find-item' + (open ? ' open' : '')}>
      <button type="button" className="nb-find-head" onClick={onToggle} aria-expanded={open}>
        <span className="nb-find-tag">{label || `${u.level} · Unidade ${u.order}`}</span>
        <b>{u.guide.title}</b>
        <Icon name="arrow" size={16} />
      </button>
      {open && (
        <div className="nb-find-body">
          {points.map(p => (
            <div key={p.en} className="nb-find-point">
              {canSpeak() && <button type="button" className="icon-btn" aria-label={`Ouvir: ${p.en}`} onClick={() => speak(p.en.replace(/\(.*?\)/g, ''))}><Icon name="sound" size={16} /></button>}
              <div><b lang="en">{p.en}</b> <span className="nb-find-pt">{p.pt}</span>{p.note && <span className="muted"> {p.note}</span>}</div>
            </div>
          ))}
          {tips.map(t => <p key={t} className="nb-find-tip">💡 {t}</p>)}
        </div>
      )}
    </div>
  );
}
