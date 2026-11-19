// "Meu progresso": o que o aluno já consegue fazer em inglês.
// 1) Retrato por habilidade (ouvir, ler, escrever, falar), a partir da memória de cada exercício
//    (src/lib/memory.js) e, para o que foi feito antes dela existir, da nota das lições concluídas.
// 2) Lista dos "Consigo…" (objetivos do padrão europeu CEFR de cada unidade): conquistado ao
//    terminar a unidade e comprovado com nota 50+ no desafio da unidade.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UNITS, LEVELS, LEVEL_NAMES, LESSONS, useContentReady } from '../lib/content.js';
import { memorySnapshot } from '../lib/memory.js';
import { Icon } from './ui.jsx';

const SKILLS = [
  { id: 'ouvir', label: 'Ouvir', icon: 'headphones', types: ['listen', 'dictation'], tip: 'Ouça a escuta de cada unidade e use o modo fone.' },
  { id: 'ler', label: 'Ler', icon: 'book', types: ['meaning', 'choice', 'match', 'quiz', 'dialogue'], tip: 'As histórias das lições são ótimas para ler mais.' },
  { id: 'escrever', label: 'Escrever', icon: 'edit', types: ['build', 'type'], tip: 'Faça o desafio de cada unidade: é escrita de verdade, corrigida pela IA.' },
  { id: 'falar', label: 'Falar', icon: 'mic', types: ['speak'], tip: 'Converse com os personagens e faça a aula com o Juvenal.' },
];
const skillOf = Object.fromEntries(SKILLS.flatMap(s => s.types.map(t => [t, s.id])));
const FIRM = 2; // caixa a partir da qual o exercício conta como "firme"

function portrait(prog, uid) {
  const mem = memorySnapshot(uid);
  const acc = Object.fromEntries(SKILLS.map(s => [s.id, { seen: 0, firm: 0 }]));
  for (const l of LESSONS) {
    const done = prog.done.has(l.id) && prog.scores[l.id]?.times_done > 0; // pulada pelo teste de nível não conta
    const legacyFirm = (prog.scores[l.id]?.best_score || 0) >= 80;
    for (const it of l.items || []) {
      const sk = skillOf[it.type];
      if (!sk) continue;
      const m = mem[it.id];
      if (!m && !done) continue;
      acc[sk].seen++;
      if (m ? m.b >= FIRM : legacyFirm) acc[sk].firm++;
    }
  }
  return acc;
}

const stage = (p) => (p >= 75 ? 'Firme' : p >= 45 ? 'Em progresso' : 'Começando');

export function SkillPortrait({ prog, uid }) {
  const ready = useContentReady();
  const extras = {
    ouvir: Object.keys(prog.scores).filter(k => k.startsWith('jogo-pod-')).length,
    escrever: Object.entries(prog.scores).filter(([k]) => k.startsWith('desafio-')).map(([, v]) => v.best_score),
  };
  const acc = ready === true ? portrait(prog, uid) : null;
  return (
    <div className="card sk">
      <h2>Seu inglês por habilidade</h2>
      <p className="muted sk-sub">Quanto do que você já viu está firme na memória: exercícios que você acertou de primeira e continuou acertando nas revisões.</p>
      {!acc ? <p className="muted">{ready === 'erro' ? 'Conecte-se à internet para ver seu retrato.' : 'Montando seu retrato…'}</p> : (
        <div className="sk-grid">
          {SKILLS.map(s => {
            const { seen, firm } = acc[s.id];
            const p = seen ? Math.round((firm / seen) * 100) : 0;
            return (
              <div key={s.id} className={'sk-item sk-' + s.id}>
                <div className="sk-top"><span className="sk-ic"><Icon name={s.icon} size={20} /></span><b>{s.label}</b><span className="sk-st">{seen ? stage(p) : 'Ainda não começou'}</span></div>
                <div className="sk-bar" role="progressbar" aria-valuenow={p} aria-valuemax={100} aria-label={`${s.label}: ${p}% firme`}><span style={{ width: p + '%' }} /></div>
                <span className="sk-n">{seen ? `${firm} de ${seen} exercícios firmes · ${p}%` : 'Nenhum exercício feito ainda'}</span>
                {s.id === 'ouvir' && extras.ouvir > 0 && <span className="sk-x">🎧 {extras.ouvir} {extras.ouvir === 1 ? 'escuta ouvida' : 'escutas ouvidas'}</span>}
                {s.id === 'escrever' && extras.escrever.length > 0 && <span className="sk-x">🎯 {extras.escrever.length} {extras.escrever.length === 1 ? 'desafio' : 'desafios'} · média {Math.round(extras.escrever.reduce((a, b) => a + b, 0) / extras.escrever.length)}</span>}
                {seen > 0 && p < 75 && <span className="sk-tip">{s.tip}</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function CanDoList({ prog, level }) {
  const [open, setOpen] = useState(level);
  const rows = UNITS.filter(u => u.can_do?.text).map(u => {
    const doneN = u.lessons.filter(l => prog.done.has(l.id)).length;
    const score = prog.scores[`desafio-${u.id}`]?.best_score;
    const st = score >= 50 ? 'proved' : doneN === u.lessons.length ? 'got' : doneN > 0 ? 'going' : 'todo';
    return { u, st, score, doneN };
  });
  const got = rows.filter(r => r.st === 'proved' || r.st === 'got').length;
  const proved = rows.filter(r => r.st === 'proved').length;
  return (
    <div className="card cd">
      <div className="cd-head">
        <div>
          <h2>O que você já consegue fazer</h2>
          <p className="muted">Os objetivos do padrão europeu (CEFR) de cada unidade. Termine a unidade para conquistar e passe no desafio para comprovar.</p>
        </div>
        <span className="cd-count"><b>{got}</b> de {rows.length}<small>{proved ? `${proved} ${proved === 1 ? 'comprovado' : 'comprovados'} no desafio` : 'conquistados'}</small></span>
      </div>
      {LEVELS.map(lv => {
        const mine = rows.filter(r => r.u.level === lv);
        const n = mine.filter(r => r.st === 'proved' || r.st === 'got').length;
        return (
          <details key={lv} className="cd-lv" open={open === lv} onToggle={e => { if (e.currentTarget.open) setOpen(lv); }}>
            <summary><b>{lv}</b> · {LEVEL_NAMES[lv]}<span className="cd-lv-n">{n}/{mine.length}</span></summary>
            <ul>
              {mine.map(({ u, st, score, doneN }) => (
                <li key={u.id} className={'cd-' + st}>
                  <span className="cd-ic" aria-hidden="true">{st === 'proved' ? '🏅' : st === 'got' ? <Icon name="check" size={16} stroke={3} /> : st === 'going' ? '…' : <Icon name="lock" size={14} />}</span>
                  <div>
                    <p>{u.can_do.text}</p>
                    <small>
                      Unidade {u.order} · {u.title} · {st === 'proved' ? `comprovado no desafio (nota ${score})`
                        : st === 'got' ? <Link to={`/desafio/${u.id}`}>Faça o desafio para comprovar</Link>
                        : st === 'going' ? `${doneN} de ${u.lessons.length} lições` : 'ainda não começou'}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
