import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { Icon, Logo, Fire } from '../components/ui.jsx';

const LEVELS = [
  ['A1', 'Iniciante', 'Se apresentar, cumprimentar e fazer perguntas simples.'],
  ['A2', 'Básico', 'Falar da rotina, fazer compras e pedir informações.'],
  ['B1', 'Intermediário', 'Se virar em viagens e contar experiências.'],
  ['B2', 'Independente', 'Conversar com fluidez e defender opiniões.'],
  ['C1', 'Avançado', 'Usar o inglês no trabalho e nos estudos.'],
  ['C2', 'Fluente', 'Entender praticamente tudo e se expressar com naturalidade.'],
];

const Check = () => (
  <span style={{ width: 28, height: 28, borderRadius: 99, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
    <Icon name="check" size={16} color="#0B0D1A" stroke={3} />
  </span>
);

export default function Landing() {
  const { session } = useAuth();
  const start = session ? '/aprender' : '/criar-conta';
  return (
    <div>
      <section className="hero">
        <div className="wrap">
          <nav className="nav" aria-label="Principal">
            <Logo dark />
            <div className="navlinks">
              <a className="plain hide-m" href="#como">Como funciona</a>
              <a className="plain hide-m" href="#niveis">Níveis</a>
              {session
                ? <Link className="btn btn-lime" to="/aprender" style={{ minHeight: 44 }}>Continuar estudando</Link>
                : <>
                    <Link className="plain" to="/entrar">Entrar</Link>
                    <Link className="btn btn-lime" to="/criar-conta" style={{ minHeight: 44, fontSize: 15 }}>Começar grátis</Link>
                  </>}
            </div>
          </nav>

          <div className="hero-grid">
            <div>
              <span className="pill" style={{ background: 'var(--ink2)', color: 'var(--lime)' }}>Do zero à fluência · A1 até C2</span>
              <h1>Aprenda inglês<br />entendendo o <span style={{ color: 'var(--lime)' }}>porquê</span> de cada coisa.</h1>
              <p className="lead">Lições curtas, explicadas em português, que se adaptam ao seu ritmo. Seu progresso fica salvo na sua conta — continue de onde parou, em qualquer aparelho.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link className="btn btn-lime btn-lg" to={start}>{session ? 'Continuar' : 'Começar do zero'} <Icon name="arrow" size={18} stroke={2.5} /></Link>
                {!session && <Link className="btn btn-ghost-dark btn-lg" to="/criar-conta?nivel=1">Já sei um pouco</Link>}
              </div>
              <p style={{ margin: '20px 0 0', fontSize: 14, color: 'var(--on-dark2)' }}>Grátis. Leva menos de 1 minuto para criar sua conta.</p>
            </div>

            <div style={{ position: 'relative', padding: '24px 0' }} aria-hidden="true">
              <div className="demo">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div className="track" style={{ flex: 1 }}><div className="fill" style={{ width: '58%' }} /></div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--violet)' }}>7/12</span>
                </div>
                <p className="q-label">Monte a frase</p>
                <p style={{ margin: '0 0 20px', fontFamily: 'var(--head)', fontSize: 26, fontWeight: 600 }}>Eu sou estudante.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 14, border: '2px dashed var(--line2)', borderRadius: 16, marginBottom: 14 }}>
                  {['I', 'am', 'a', 'student'].map(w => <span key={w} style={{ padding: '10px 14px', borderRadius: 12, background: 'var(--bg)', border: '2px solid var(--line2)', fontWeight: 600 }}>{w}</span>)}
                </div>
                <div style={{ background: 'var(--ok-bg)', borderRadius: 18, padding: '16px 18px', display: 'flex', gap: 12 }}>
                  <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 99, background: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={18} color="#fff" stroke={3} /></span>
                  <div>
                    <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ok-d)' }}>Isso mesmo!</p>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: '#234238' }}>Por quê? Em inglês, profissões levam <b>a</b> ou <b>an</b> antes: <i>I am <b>a</b> student</i>.</p>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: -6, right: -6, background: 'var(--lime)', color: 'var(--ink)', padding: '12px 16px', borderRadius: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 12px 30px rgba(0,0,0,.35)' }}>
                <Fire size={20} color="#0B0D1A" /> Sequência de dias
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como" className="section">
        <div className="wrap">
          <p className="eyebrow">Como funciona</p>
          <h2>Três passos e você já está falando suas primeiras frases.</h2>
          <div className="grid3">
            {[
              ['Crie sua conta', 'Com sua conta, cada lição, palavra e conquista fica salva. Estude no celular e continue no computador.'],
              ['Descubra seu nível', 'Nunca estudou? Comece do zero. Já sabe algo? Um teste rápido pula o que você já domina.'],
              ['Pratique um pouco por dia', 'Lições de 5 a 10 minutos. Você escolhe sua meta diária e acompanha sua sequência de dias.'],
            ].map(([t, d], i) => (
              <div key={t} className="card" style={{ padding: 32, borderRadius: 24 }}>
                <span className="num">{i + 1}</span>
                <h3 style={{ fontSize: 24, margin: '24px 0 10px' }}>{t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="explain">
            <div>
              <h2 style={{ color: '#fff', marginBottom: 18 }}>Errou? A gente explica. Acertou? Também.</h2>
              <p style={{ margin: '0 0 28px', fontSize: 18, lineHeight: 1.6, color: 'var(--violet-ring)' }}>Nada de decorar sem entender. Cada exercício traz uma explicação curta, em português, de por que a resposta é aquela — e seus erros voltam depois para revisão.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Guia de gramática antes de cada unidade', 'Botão “Não entendi” em toda pergunta', 'Revisão das frases que você errou'].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Check /><span style={{ fontSize: 17, fontWeight: 500 }}>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="card" style={{ borderRadius: 24, padding: 28 }} aria-hidden="true">
              <p className="q-label">Complete</p>
              <p style={{ margin: '0 0 18px', fontFamily: 'var(--head)', fontSize: 26, fontWeight: 600 }}>Tom ___ from England.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 10, marginBottom: 16 }}>
                <span className="option bad" style={{ justifyContent: 'center', fontSize: 18 }}>are</span>
                <span className="option ok" style={{ justifyContent: 'center', fontSize: 18 }}>is</span>
              </div>
              <div style={{ background: 'var(--bad-bg)', borderRadius: 16, padding: '16px 18px' }}>
                <p style={{ margin: '0 0 6px', fontWeight: 700, color: 'var(--bad-d)' }}>Quase! A resposta é “is”.</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#4A2A1C' }}>Tom é uma pessoa só (ele = he), então usa <b>is</b>. Regra: I → am · he/she/it → is · you/we/they → are.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="niveis" className="section">
        <div className="wrap">
          <p className="eyebrow">Sua jornada</p>
          <h2 style={{ marginBottom: 16 }}>Seis níveis, do “hello” à fluência.</h2>
          <p className="muted" style={{ margin: '0 0 40px', fontSize: 18, lineHeight: 1.6, maxWidth: 680 }}>Seguimos o Quadro Europeu Comum de Referência (CEFR), o mesmo padrão usado por escolas e certificados internacionais. Os níveis A1, A2, B1 e B2 já estão disponíveis; os próximos estão em produção.</p>
          <div className="grid6">
            {LEVELS.map(([c, n, d], i) => (
              <div key={c} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8, borderRadius: 20, background: i === 5 ? 'var(--ink)' : '#fff', color: i === 5 ? '#fff' : undefined }}>
                <span style={{ fontFamily: 'var(--head)', fontSize: 32, fontWeight: 700, color: i === 5 ? 'var(--lime)' : 'var(--violet)' }}>{c}</span>
                <b>{n}</b>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: i === 5 ? 'var(--on-dark)' : 'var(--text2)' }}>{d}</span>
                {i > 3 && <span style={{ fontSize: 12, fontWeight: 600, color: i === 5 ? 'var(--on-dark2)' : 'var(--text3)', marginTop: 'auto' }}>Em breve</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Tudo que você precisa para não desistir.</h2>
          <div className="grid4">
            {[
              ['clock', 'Lições curtas', 'De 5 a 10 minutos. Cabe no intervalo do almoço.'],
              ['mic', 'Ouça, fale e escreva', 'Áudio em todas as frases, ditado, exercícios de escrita e de pronúncia com o microfone.'],
              ['review', 'Revisão dos erros', 'O que você erra fica guardado para você praticar até acertar.'],
              ['trophy', 'Metas e sequência', 'Meta diária, XP e sequência de dias para manter o ritmo.'],
            ].map(([ic, t, d]) => (
              <div key={t} className="card" style={{ borderRadius: 24, padding: 28 }}>
                <Icon name={ic} size={32} color="var(--violet)" />
                <h3 style={{ fontSize: 20, margin: '18px 0 8px' }}>{t}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band">
            <div style={{ maxWidth: 640 }}>
              <h2 style={{ margin: '0 0 12px' }}>Sua primeira lição está a 1 minuto daqui.</h2>
              <p style={{ margin: 0, fontSize: 18, color: '#2C3018' }}>Crie sua conta grátis e comece hoje.</p>
            </div>
            <Link className="btn btn-ink btn-lg" to={start}>{session ? 'Continuar estudando' : 'Criar minha conta'}</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 14, color: 'var(--text3)' }}>
          <span>Sacou English · Inglês explicado do zero à fluência</span>
          <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}><a href="#como">Como funciona</a><a href="#niveis">Níveis</a><Link to="/creditos">Fontes e créditos</Link></span>
        </div>
      </footer>
    </div>
  );
}
