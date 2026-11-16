import { useEffect, useRef } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Icon } from './ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';

// ---------- modelos prontos ----------
const txt = (t, marks) => (t ? [{ type: 'text', text: t, ...(marks ? { marks } : {}) }] : undefined);
const h = (level, t) => ({ type: 'heading', attrs: { level }, content: txt(t) });
const p = (t, marks) => ({ type: 'paragraph', content: txt(t, marks) });
const li = (t) => ({ type: 'listItem', content: [p(t)] });
const ul = (items) => ({ type: 'bulletList', content: items.map(li) });
const tasks = (items) => ({ type: 'taskList', content: items.map(t => ({ type: 'taskItem', attrs: { checked: false }, content: [p(t)] })) });
const B = [{ type: 'bold' }];

export const TEMPLATES = [
  { id: 'rule', label: 'Regra de gramática', doc: () => [h(2, 'A regra'), p('Escreva aqui a regra com suas palavras.'), h(3, 'Exemplos'), ul(['Inglês — tradução', 'Inglês — tradução']), h(3, 'Cuidado com'), ul(['O erro que eu costumo cometer'])] },
  { id: 'vocab', label: 'Lista de palavras', doc: () => [h(2, 'Palavras novas'), ul(['word — palavra', 'word — palavra', 'word — palavra']), p('Dica: selecione uma palavra em inglês e toque em “Criar cartão” para treinar com flashcards.')] },
  { id: 'doubts', label: 'Dúvidas', doc: () => [h(2, 'Dúvidas para tirar'), tasks(['Por que se usa ... aqui?', 'Qual a diferença entre ... e ...?'])] },
  { id: 'phrases', label: 'Frases úteis', doc: () => [h(2, 'Frases para usar'), ul(['Frase em inglês — quando usar']), h(3, 'Situação'), p('Em que momento do dia a dia eu usaria essas frases?')] },
];

export function unitSummaryDoc(unit) {
  const g = unit.guide;
  const out = [h(2, g?.title || unit.title)];
  if (g?.intro) out.push(p(g.intro));
  if (g?.points?.length) {
    out.push(h(3, 'Pontos principais'));
    out.push({ type: 'bulletList', content: g.points.map(pt => ({ type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: pt.en, marks: B }, { type: 'text', text: ` — ${pt.pt}. ${pt.note || ''}`.trimEnd() }] }] })) });
  }
  if (g?.tips?.length) { out.push(h(3, 'Dicas')); out.push(ul(g.tips)); }
  if (unit.words?.length) { out.push(h(3, 'Vocabulário da unidade')); out.push(ul(unit.words.map(([en, pt]) => `${en} — ${pt}`))); }
  out.push(h(3, 'Minhas observações'));
  out.push(p(''));
  return out;
}

// ---------- barra de ferramentas ----------
function Tb({ on, active, label, children, disabled }) {
  return (
    <button type="button" className={'tb' + (active ? ' on' : '')} aria-label={label} title={label} aria-pressed={active ? true : undefined}
      disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={on}>{children}</button>
  );
}
const HL = [['#F1FF9C', 'Marca-texto verde'], ['#E4DEFF', 'Marca-texto roxo'], ['#FFD9E2', 'Marca-texto rosa'], ['#CDEBFF', 'Marca-texto azul']];

function selectedText(editor) {
  const { from, to, empty } = editor.state.selection;
  return empty ? '' : editor.state.doc.textBetween(from, to, ' ').trim();
}

export default function NoteEditor({ note, onSave, compact = false, unit = null, onMakeCard, autofocus = false, placeholder }) {
  const saveRef = useRef(onSave);
  saveRef.current = onSave;
  const timer = useRef(null);
  const pendingSave = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: ({ node }) => node.type.name === 'heading' ? 'Título da seção' : (placeholder || 'Comece a escrever... use a barra acima para formatar') }),
    ],
    content: note.content || (note.plain ? { type: 'doc', content: note.plain.split('\n').map(l => p(l)) } : ''),
    autofocus: autofocus ? 'end' : false,
    editorProps: { attributes: { class: 'nb-prose' + (compact ? ' compact' : ''), 'aria-label': 'Texto da anotação', spellcheck: 'true' } },
    onUpdate: ({ editor: ed }) => {
      pendingSave.current = () => saveRef.current(ed.getJSON(), ed.getText({ blockSeparator: '\n' }));
      clearTimeout(timer.current);
      timer.current = setTimeout(() => { pendingSave.current?.(); pendingSave.current = null; }, 400);
    },
  }, [note.id]);

  // salva o que faltou ao sair
  useEffect(() => () => { clearTimeout(timer.current); pendingSave.current?.(); }, [note.id]);

  if (!editor) return <div className="nb-prose" />;
  const e = editor;
  const chain = () => e.chain().focus();
  const isEmpty = e.isEmpty;

  function speakSel() {
    const t = selectedText(e) || e.getText();
    if (t) speak(t.slice(0, 600));
  }

  return (
    <div className={'nb-editor' + (compact ? ' compact' : '')}>
      <div className="nb-toolbar" role="toolbar" aria-label="Formatação">
        <Tb label="Título" active={e.isActive('heading', { level: 2 })} on={() => chain().toggleHeading({ level: 2 }).run()}><b>T</b></Tb>
        <Tb label="Subtítulo" active={e.isActive('heading', { level: 3 })} on={() => chain().toggleHeading({ level: 3 }).run()}><b style={{ fontSize: 12 }}>T</b></Tb>
        <span className="tb-sep" />
        <Tb label="Negrito (Ctrl+B)" active={e.isActive('bold')} on={() => chain().toggleBold().run()}><b>B</b></Tb>
        <Tb label="Itálico (Ctrl+I)" active={e.isActive('italic')} on={() => chain().toggleItalic().run()}><i style={{ fontFamily: 'Georgia,serif' }}>I</i></Tb>
        <Tb label="Sublinhado (Ctrl+U)" active={e.isActive('underline')} on={() => chain().toggleUnderline().run()}><u>U</u></Tb>
        <Tb label="Tachado" active={e.isActive('strike')} on={() => chain().toggleStrike().run()}><s>S</s></Tb>
        <span className="tb-hl">
          {HL.map(([c, l]) => (
            <Tb key={c} label={l} active={e.isActive('highlight', { color: c })} on={() => chain().toggleHighlight({ color: c }).run()}>
              <span className="hl-dot" style={{ background: c }} />
            </Tb>
          ))}
        </span>
        <span className="tb-sep" />
        <Tb label="Lista" active={e.isActive('bulletList')} on={() => chain().toggleBulletList().run()}><Icon name="list" size={18} /></Tb>
        <Tb label="Lista numerada" active={e.isActive('orderedList')} on={() => chain().toggleOrderedList().run()}><Icon name="olist" size={18} /></Tb>
        <Tb label="Lista de tarefas" active={e.isActive('taskList')} on={() => chain().toggleTaskList().run()}><Icon name="checklist" size={18} /></Tb>
        {!compact && <Tb label="Citação" active={e.isActive('blockquote')} on={() => chain().toggleBlockquote().run()}><Icon name="quote" size={18} /></Tb>}
        {!compact && <Tb label="Linha divisória" on={() => chain().setHorizontalRule().run()}><Icon name="rule" size={18} /></Tb>}
        <span className="tb-sep" />
        {canSpeak() && <Tb label="Ouvir em inglês (a seleção ou o texto todo)" on={speakSel}><Icon name="sound" size={18} /></Tb>}
        <Tb label="Desfazer (Ctrl+Z)" disabled={!e.can().undo()} on={() => chain().undo().run()}><Icon name="undo" size={18} /></Tb>
        <Tb label="Refazer (Ctrl+Shift+Z)" disabled={!e.can().redo()} on={() => chain().redo().run()}><Icon name="redo" size={18} /></Tb>
      </div>

      <BubbleMenu editor={e} tippyOptions={{ duration: 120, maxWidth: 'none' }} className="nb-bubble">
        <button type="button" onClick={() => chain().toggleBold().run()} className={e.isActive('bold') ? 'on' : ''}><b>B</b></button>
        <button type="button" onClick={() => chain().toggleItalic().run()} className={e.isActive('italic') ? 'on' : ''}><i>I</i></button>
        <button type="button" onClick={() => chain().toggleHighlight({ color: HL[0][0] }).run()} className={e.isActive('highlight') ? 'on' : ''} aria-label="Marca-texto"><Icon name="marker" size={16} /></button>
        {canSpeak() && <button type="button" onClick={speakSel} aria-label="Ouvir"><Icon name="sound" size={16} /> Ouvir</button>}
        {onMakeCard && <button type="button" className="mk" onClick={() => { const t = selectedText(e); if (t) onMakeCard(t); }}><Icon name="cards" size={16} /> Criar cartão</button>}
      </BubbleMenu>

      <EditorContent editor={e} />

      {isEmpty && (
        <div className="nb-templates">
          <span className="muted">Começar com um modelo:</span>
          {unit && <button type="button" className="chip violet" onClick={() => e.chain().setContent({ type: 'doc', content: unitSummaryDoc(unit) }, true).focus('end').run()}><Icon name="sparkle" size={14} />Resumo de “{unit.title}”</button>}
          {TEMPLATES.map(t => (
            <button key={t.id} type="button" className="chip" onClick={() => e.chain().setContent({ type: 'doc', content: t.doc() }, true).focus('end').run()}>{t.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
