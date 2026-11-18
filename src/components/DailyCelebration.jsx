import { useEffect, useRef, useState } from 'react';
import { boostClock, boostSeconds } from '../lib/bonus.js';
import { Icon } from './ui.jsx';
import AnimatedFlame from './AnimatedFlame.jsx';

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
      <AnimatedFlame className="daily-flame">{showStreak && <span>{days}</span>}</AnimatedFlame>
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
