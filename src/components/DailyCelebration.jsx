import { useEffect, useRef, useState } from 'react';
import { boostClock, boostSeconds } from '../lib/bonus.js';
import { Icon } from './ui.jsx';

export function BoostTimer({ until, className = '' }) {
  const [seconds, setSeconds] = useState(() => boostSeconds(until));
  useEffect(() => {
    const tick = () => setSeconds(boostSeconds(until));
    tick(); const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [until]);
  if (!seconds) return null;
  return <span className={`boost-timer ${className}`} title="XP em dobro nas atividades concluídas antes de o tempo acabar">
    <b>2× XP</b><span aria-label={`${Math.floor(seconds / 60)} minutos e ${seconds % 60} segundos restantes`}>{boostClock(seconds)}</span>
  </span>;
}

export default function DailyCelebration({ streak, showStreak, boostUntil, showBoost, onContinue }) {
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  const days = Math.max(1, streak || 1);
  return <main className="daily-celebration">
    <div className="daily-confetti" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <section className="daily-card" aria-labelledby="daily-title">
      <p className="daily-eyebrow">{showStreak ? 'Você apareceu. Você avançou.' : 'Primeira lição do dia: feita!'}</p>
      <div className="daily-flame" aria-hidden="true">
        <svg viewBox="0 0 120 144" fill="none"><path d="M65 5C77 39 43 47 52 71c10-8 16-19 16-30 31 23 45 43 39 66-6 24-24 34-47 34-29 0-49-19-49-45 0-22 15-36 29-53-1 17 3 24 7 26C36 42 57 30 65 5Z" fill="currentColor"/><path d="M62 77c10 15 22 23 22 35 0 14-10 24-24 24s-23-10-23-24c0-12 13-24 25-35Z" fill="#FFE9A8"/></svg>
        {showStreak && <span>{days}</span>}
      </div>
      <h1 id="daily-title" ref={heading} tabIndex={-1}>{showStreak ? `${days} ${days === 1 ? 'dia' : 'dias'} de ofensiva!` : 'Seu esforço vale em dobro!'}</h1>
      <p className="daily-message">{showStreak ? days === 1
        ? 'Toda grande jornada começa com um dia. O seu é hoje.'
        : 'Mais um dia de inglês na conta. Olha só o hábito que você está construindo!'
        : 'Você deu o primeiro passo de hoje. Aproveite o embalo para praticar mais um pouco.'}</p>
      {showStreak && <div className="daily-days" aria-label={`${days} dias de ofensiva. Hoje está garantido.`}>
        {Array.from({ length: Math.min(days, 6) }, (_, i) => <span key={i} className={i === Math.min(days, 6) - 1 ? 'today' : ''}>
          <b><Icon name="check" size={20} /></b><small>{i === Math.min(days, 6) - 1 ? 'Hoje' : `Dia ${days - Math.min(days, 6) + i + 1}`}</small>
        </span>)}
      </div>}
      {showBoost && <div className="daily-bonus"><span className="daily-bonus-icon" aria-hidden="true">2×</span><div>
        <strong>Você liberou 10 minutos de XP duplo!</strong>
        <p>Esta lição já valeu o dobro. Conclua outras atividades antes de o tempo acabar para ganhar mais.</p>
        <BoostTimer until={boostUntil} />
      </div></div>}
      <button className="btn btn-violet btn-lg btn-3d daily-continue" onClick={onContinue}>Continuar</button>
      <p className="daily-footer">{showStreak ? 'Volte amanhã para manter sua ofensiva.' : 'Cada prática faz diferença.'}</p>
    </section>
  </main>;
}
