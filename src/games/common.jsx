import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Anim, Bolt } from '../components/ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';

// Barra de cima dos jogos (mesmo visual das lições)
export function GameTop({ progress = 0, label, right, onExit }) {
  const [ask, setAsk] = useState(false);
  return (
    <>
      <header className="lesson-top">
        <button type="button" className="icon-btn" aria-label="Sair do jogo" onClick={() => (onExit ? onExit() : setAsk(true))}><Icon name="x" size={24} stroke={2.4} /></button>
        <div className="track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={label}><div className="fill" style={{ width: `${Math.min(100, progress)}%` }} /></div>
        {right}
      </header>
      {ask && (
        <div className="exit-box" role="alertdialog" aria-label="Sair do jogo">
          <div>
            <b style={{ display: 'block', marginBottom: 4 }}>Sair do jogo?</b>
            <span className="muted" style={{ fontSize: 15 }}>O XP só conta quando você chega até o final.</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-violet" onClick={() => setAsk(false)} autoFocus>Continuar jogando</button>
            <Link to="/jogos" className="btn btn-out">Sair</Link>
          </div>
        </div>
      )}
    </>
  );
}

export function Finish({ title, message, stats = [], xp, streak, record, onAgain, children }) {
  return (
    <div className="finish">
      <Anim name="celebrate" size={180} />
      <h1 style={{ fontSize: 'clamp(30px,5vw,42px)', margin: '8px 0 0' }}>{title}</h1>
      {message && <p className="muted" style={{ fontSize: 17, maxWidth: 560, lineHeight: 1.6 }}>{message}</p>}
      {record && <div className="g-record"><Icon name="medal" size={20} />Novo recorde pessoal!</div>}
      <div className="finish-stats">
        {stats.map(([l, v]) => <div key={l} className="fstat"><span className="muted" style={{ fontSize: 13 }}>{l}</span><b>{v}</b></div>)}
        {xp != null && <div className="fstat"><span className="muted" style={{ fontSize: 13 }}>XP ganho</span><b style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><Bolt size={22} />+{xp}</b></div>}
        {streak != null && <div className="fstat"><span className="muted" style={{ fontSize: 13 }}>Sequência</span><b>{streak} {streak === 1 ? 'dia' : 'dias'}</b></div>}
      </div>
      {children}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {onAgain && <button type="button" className="btn btn-violet btn-lg btn-3d" onClick={onAgain} autoFocus>Jogar de novo</button>}
        <Link className={'btn btn-lg ' + (onAgain ? 'btn-out' : 'btn-violet btn-3d')} to="/jogos" autoFocus={!onAgain}>Voltar aos jogos</Link>
      </div>
    </div>
  );
}

// Fala em inglês com botão de ouvir e tradução escondida
export function Line({ en, pt, who, big = false, open: startOpen = false }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className={'g-line' + (big ? ' big' : '')}>
      {who && <span className="g-who">{who}</span>}
      <div className="g-line-row">
        {canSpeak() && <button type="button" className="g-say" aria-label={`Ouvir: ${en}`} onClick={() => speak(en)}><Icon name="sound" size={big ? 20 : 16} /></button>}
        <span lang="en" className="g-en">{en}</span>
      </div>
      {pt && (open ? <span className="g-pt">{pt}</span>
        : <button type="button" className="link-btn g-show" onClick={() => setOpen(true)}>Ver tradução</button>)}
    </div>
  );
}

// Lista de opções com o mesmo visual das lições. Devolve true/false em onAnswer.
export function Choices({ options, answer, onAnswer, english = false, locked, picked }) {
  return (
    <div className="options" role="radiogroup">
      {options.map((o, i) => {
        const label = typeof o === 'string' ? o : o.en;
        let cls = 'option';
        if (picked?.includes(label)) cls += label === answer || answer == null ? ' ok' : ' bad';
        if (locked && label === answer) cls += ' ok';
        return (
          <button key={label} type="button" role="radio" aria-checked={picked?.includes(label)} className={cls} disabled={locked || picked?.includes(label)}
            lang={english ? 'en' : undefined} onClick={() => onAnswer(label, o)}>
            <span className="k" aria-hidden="true">{i + 1}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>{label}{typeof o !== 'string' && o.pt && <span className="muted" style={{ fontSize: 13, fontWeight: 500 }} lang="pt">{o.pt}</span>}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Why({ ok, text, title }) {
  return (
    <div className={'g-why ' + (ok ? 'ok' : 'bad')} role="status">
      <b>{title || (ok ? 'Isso!' : 'Ainda não.')}</b> {text}
    </div>
  );
}
