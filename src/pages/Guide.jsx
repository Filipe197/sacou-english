import { Link, useParams } from 'react-router-dom';
import { UNITS, getUnit } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { Shell, Icon } from '../components/ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';

export default function Guide() {
  const { unitId } = useParams();
  const prog = useProgress();
  const unit = unitId ? getUnit(unitId) : null;

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {!unit ? (
          <>
            <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Guia de gramática</h1>
            <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 28px' }}>Cada unidade tem uma explicação curta, em português, com exemplos. Consulte sempre que bater uma dúvida.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {UNITS.map(u => (
                <Link key={u.id} to={`/guia/${u.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <div><span style={{ fontSize: 13, fontWeight: 700, color: 'var(--violet)' }}>A1 · UNIDADE {u.order}</span><h2 style={{ margin: '4px 0', fontSize: 22 }}>{u.guide.title}</h2><span className="muted" style={{ fontSize: 15 }}>{u.title}</span></div>
                  <Icon name="arrow" />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <Link to="/guia" className="link-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="back" size={16} />Todos os guias</Link>
            <p className="eyebrow" style={{ marginTop: 16 }}>A1 · Unidade {unit.order} · {unit.title}</p>
            <h1 style={{ fontSize: 'clamp(30px,4vw,40px)', margin: '0 0 12px' }}>{unit.guide.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, margin: '0 0 24px', color: 'var(--text2)' }}>{unit.guide.intro}</p>

            <div className="card" style={{ marginBottom: 16, background: 'var(--violet-l)', borderColor: 'var(--violet-ring)' }}>
              <b style={{ color: 'var(--violet-dd)' }}>Ao final desta unidade:</b> <span>{unit.can_do.text}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {unit.guide.points.map(p => (
                <div key={p.en} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {canSpeak() && <button className="audio-btn" style={{ width: 44, height: 44, borderRadius: 12 }} aria-label={`Ouvir: ${p.en}`} onClick={() => speak(p.en.replace(/\(.*?\)/g, ''))}><Icon name="sound" size={20} color="#fff" /></button>}
                  <div>
                    <b lang="en" style={{ fontSize: 19, fontFamily: 'var(--head)' }}>{p.en}</b>
                    <div style={{ color: 'var(--violet-dd)', fontWeight: 600, margin: '2px 0 6px' }}>{p.pt}</div>
                    <div className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {unit.guide.tips?.length > 0 && (
              <div className="info-dark" style={{ marginTop: 16 }}>
                <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="info" color="#0B0D1A" /></span>
                <div><b style={{ color: 'var(--lime)' }}>Dicas</b><ul style={{ margin: '6px 0 0', paddingLeft: 18, lineHeight: 1.7, color: 'var(--on-dark)' }}>{unit.guide.tips.map(t => <li key={t}>{t}</li>)}</ul></div>
              </div>
            )}

            <h2 style={{ fontSize: 22, margin: '32px 0 12px' }}>Palavras da unidade</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {unit.words.map(([en, pt], i) => (
                <div key={en} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderTop: i ? '1px solid var(--line)' : 0 }}>
                  {canSpeak() && <button className="icon-btn" aria-label={`Ouvir: ${en}`} onClick={() => speak(en)}><Icon name="sound" size={18} /></button>}
                  <b lang="en" style={{ flex: 1 }}>{en}</b><span className="muted">{pt}</span>
                </div>
              ))}
            </div>
            <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>Referência: {unit.can_do.source}. Vocabulário conferido com a CEFR-J Wordlist (nível A1).</p>
          </>
        )}
      </div>
    </Shell>
  );
}
