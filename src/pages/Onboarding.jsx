import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { Icon, Logo, Anim } from '../components/ui.jsx';

const LEVELS = [
  { title: 'Nunca estudei inglês', desc: 'Vou começar do zero, sem problema.', out: 'Você começa no nível A1, Unidade 1: cumprimentos e palavras do dia a dia. Tudo explicado passo a passo.', cta: 'Começar do zero', test: false },
  { title: 'Sei algumas palavras', desc: 'Entendo coisas como “hello”, cores e números.', out: 'Você faz um teste rápido (cerca de 3 minutos). As unidades que você já domina são marcadas como concluídas e você começa no ponto certo.', cta: 'Fazer teste rápido', test: true },
  { title: 'Consigo conversas simples', desc: 'Me apresento e falo da minha rotina.', out: 'O teste vai conferir o que você já sabe do A1 e do A2 (cerca de 6 minutos) e te colocar no ponto certo da trilha.', cta: 'Fazer teste de nível', test: true },
  { title: 'Sou intermediário ou mais', desc: 'Leio textos e assisto séries com legenda.', out: 'O teste confere o que você já sabe do A1 ao B1 (cerca de 8 minutos) e te coloca no ponto certo da trilha.', cta: 'Fazer teste de nível', test: true },
];
const GOALS = [{ min: 5, xp: 15, label: 'Leve' }, { min: 10, xp: 30, label: 'Regular' }, { min: 15, xp: 45, label: 'Firme' }, { min: 20, xp: 60, label: 'Intenso' }];

export default function Onboarding() {
  const { profile, updateProfile } = useAuth();
  const [params] = useSearchParams();
  const [level, setLevel] = useState(params.get('nivel') ? 1 : 0);
  const [goal, setGoal] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const L = LEVELS[level];

  async function go() {
    setBusy(true); setErr('');
    const { error } = await updateProfile({ daily_goal_xp: GOALS[goal].xp, start_level: 'A1', onboarded: !L.test });
    setBusy(false);
    if (error) return setErr('Não foi possível salvar. Verifique sua conexão e tente de novo.');
    nav(L.test ? `/nivelamento?ate=${level >= 3 ? 'B1' : level >= 2 ? 'A2' : 'A1'}` : '/aprender', { replace: true });
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ maxWidth: 920, margin: '0 auto', padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <Logo to="/" />
        <div className="steps" style={{ flex: 1, margin: 0 }} aria-label="Etapa 2 de 2"><span className="s on" /><span className="s on" /></div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text3)' }}>2 de 2</span>
      </header>
      <main style={{ maxWidth: 920, margin: '0 auto', padding: '16px 24px 64px' }}>
        <Anim name="welcome" size={120} loop />
        <h1 style={{ fontSize: 'clamp(32px,4vw,44px)', margin: '0 0 10px', lineHeight: 1.08 }}>
          {profile?.display_name ? `${profile.display_name.split(' ')[0]}, quanto inglês você já sabe?` : 'Quanto inglês você já sabe?'}
        </h1>
        <p className="muted" style={{ margin: '0 0 32px', fontSize: 17, lineHeight: 1.6, maxWidth: 640 }}>Não existe resposta errada. Isso só define <b>por onde você começa</b> — dá para mudar depois.</p>

        <div className="opts2" role="radiogroup" aria-label="Seu nível">
          {LEVELS.map((l, i) => (
            <button key={l.title} type="button" role="radio" aria-checked={i === level} className={'opt' + (i === level ? ' on' : '')} onClick={() => setLevel(i)}>
              <span className="dot" />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <b style={{ fontSize: 18, fontFamily: 'var(--head)' }}>{l.title}</b>
                <span className="muted" style={{ fontSize: 15, lineHeight: 1.45 }}>{l.desc}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="info-dark" style={{ marginTop: 20 }}>
          <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="info" color="#0B0D1A" stroke={2.4} /></span>
          <div><b style={{ display: 'block', marginBottom: 4, color: 'var(--lime)' }}>O que acontece agora</b><span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--on-dark)' }}>{L.out}</span></div>
        </div>

        <h2 style={{ fontSize: 26, margin: '48px 0 6px' }}>Qual sua meta diária?</h2>
        <p className="muted" style={{ margin: '0 0 18px', fontSize: 15 }}>Pouco todo dia vale mais que muito de vez em quando. Uma lição leva de 3 a 5 minutos.</p>
        <div className="goals" role="radiogroup" aria-label="Meta diária">
          {GOALS.map((g, i) => (
            <button key={g.min} type="button" role="radio" aria-checked={i === goal} className={'goal' + (i === goal ? ' on' : '')} onClick={() => setGoal(i)}>
              <b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 26 }}>{g.min} min</b>
              <span className="muted" style={{ fontSize: 14 }}>{g.label} · {g.xp} XP</span>
            </button>
          ))}
        </div>

        {err && <div className="alert" role="alert" style={{ marginTop: 20 }}>{err}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}>
          <button className="btn btn-violet btn-lg" onClick={go} disabled={busy}>{busy ? 'Salvando…' : L.cta} <Icon name="arrow" size={18} stroke={2.5} /></button>
        </div>
      </main>
    </div>
  );
}
