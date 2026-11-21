// Páginas públicas "/ingles" (índice) e "/ingles/<slug>" (sem login), feitas para quem chega pelo Google:
// a resposta logo no topo com áudio normal e devagar, exemplos, o jeito educado, o erro comum,
// um teste rápido de 3 perguntas e o convite para estudar no Sacou.
// Conteúdo: src/seo/paginas.json. Áudios: scripts/gen-ingles-audio.mjs.
// HTML pronto para o Google: scripts/prerender-ingles.mjs (roda no build).
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Logo } from '../components/ui.jsx';
import { useAuth } from '../lib/auth.jsx';
import { REMOTE } from '../lib/native.js';
import PAGINAS from '../seo/paginas.json';
import AUDIO from '../seo/audio.json';
import { TEMAS, SITE_URL, seoOf } from '../seo/seo.js';

// bandeiras desenhadas (o emoji de bandeira não aparece no Windows)
const BR = () => (
  <svg viewBox="0 0 100 70" width="34" height="24" aria-hidden="true"><rect width="100" height="70" rx="8" fill="#169B3A" /><path d="M50 8 L92 35 L50 62 L8 35Z" fill="#FFD52E" /><circle cx="50" cy="35" r="15" fill="#1E3F9A" /></svg>
);
const US = () => (
  <svg viewBox="0 0 100 70" width="34" height="24" aria-hidden="true"><defs><clipPath id="igus"><rect width="100" height="70" rx="8" /></clipPath></defs>
    <g clipPath="url(#igus)"><rect width="100" height="70" fill="#fff" />{[0, 2, 4, 6, 8, 10, 12].map(i => <rect key={i} y={i * 5.385} width="100" height="5.385" fill="#C8202F" />)}<rect width="44" height="37.7" fill="#233A8C" /></g></svg>
);

let atual = null;
function tocar(en, lento, onFim) {
  const h = AUDIO[en];
  if (!h) { onFim(); return; }
  try { atual?.pause(); } catch { /* nada */ }
  const a = new Audio(`${REMOTE}/audio/ingles/${h}-${lento ? 'l' : 'n'}.mp3`);
  atual = a;
  a.onended = a.onerror = onFim;
  a.play().catch(onFim);
}

// botões de ouvir; marca qual está tocando
function Ouvir({ en, grande }) {
  const [on, setOn] = useState('');
  const play = (modo) => { setOn(modo); tocar(en, modo === 'l', () => setOn(x => (x === modo ? '' : x))); };
  return (
    <div className={'ig-ouvir' + (grande ? ' big' : '')}>
      <button type="button" className={on === 'n' ? 'on' : ''} onClick={() => play('n')} aria-label={`Ouvir "${en}"`}>▶ Ouvir</button>
      <button type="button" className={on === 'l' ? 'on' : ''} onClick={() => play('l')} aria-label={`Ouvir "${en}" devagar`}>🐢 Devagar</button>
    </div>
  );
}

function Quiz({ itens }) {
  const [resp, setResp] = useState({});
  const acertos = itens.filter((q, i) => resp[i] === q.ok).length;
  const fim = Object.keys(resp).length === itens.length;
  return (
    <section className="ig-box">
      <h2>🎯 Teste rápido</h2>
      {itens.map((q, i) => (
        <div key={i} className="ig-q">
          <p className="ig-q-t"><span>{i + 1}</span>{q.q}</p>
          <div className="ig-ops">
            {q.ops.map((op, j) => {
              const r = resp[i];
              const cls = r === undefined ? '' : j === q.ok ? 'ok' : j === r ? 'bad' : 'off';
              return <button key={j} type="button" className={cls} disabled={r !== undefined} onClick={() => setResp(s => ({ ...s, [i]: j }))}>{op}</button>;
            })}
          </div>
          {resp[i] !== undefined && <p className={'ig-porque ' + (resp[i] === q.ok ? 'ok' : 'bad')}>{resp[i] === q.ok ? '✅ Isso! ' : '❌ Quase. '}{q.porque}</p>}
        </div>
      ))}
      {fim && <p className="ig-placar">Você acertou <b>{acertos} de {itens.length}</b>. {acertos === itens.length ? 'Mandou bem! 🎉' : 'Na lição você treina até ficar automático.'}</p>}
    </section>
  );
}

// título, descrição e dados estruturados: troca os do index.html enquanto a página está aberta
function useSeo(slug) {
  useEffect(() => {
    const s = seoOf(slug);
    if (!s) return undefined;
    const desfaz = [];
    const titulo = document.title;
    document.title = `${s.titulo} | Sacou English`;
    desfaz.push(() => { document.title = titulo; });
    const tag = (sel, criar, set) => {
      let el = document.head.querySelector(sel);
      if (el) { const antes = el.outerHTML; set(el); desfaz.push(() => { el.outerHTML = antes; }); return; }
      el = criar(); set(el); document.head.appendChild(el); desfaz.push(() => el.remove());
    };
    const meta = (attr, k, v) => tag(`meta[${attr}="${k}"]`, () => { const m = document.createElement('meta'); m.setAttribute(attr, k); return m; }, el => el.setAttribute('content', v));
    meta('name', 'description', s.descricao);
    meta('property', 'og:title', s.titulo);
    meta('property', 'og:description', s.descricao);
    tag('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, el => el.setAttribute('href', SITE_URL + s.path));
    tag('script[type="application/ld+json"]', () => { const l = document.createElement('script'); l.type = 'application/ld+json'; return l; }, el => { el.textContent = JSON.stringify(s.ld); });
    return () => desfaz.reverse().forEach(f => f());
  }, [slug]);
}

function Topo({ session, cta }) {
  return (
    <header className="ig-top">
      <Logo />
      <Link className="btn btn-violet ig-top-btn" {...cta}>{session ? 'Estudar' : 'Começar grátis'}</Link>
    </header>
  );
}
function Rodape() {
  return (
    <nav className="legal-nav ig-foot">
      <Link to="/ingles">Frases e dicas</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/baixar">Baixar app</Link>
      <Link to="/apoie">Apoie</Link>
      <Link to="/privacidade">Privacidade</Link>
    </nav>
  );
}
// quem já tem conta vai para a trilha; quem não tem, cria a conta (e faz o nivelamento)
const ctaDe = (session) => (session ? { to: '/aprender' } : { to: '/criar-conta' });

function CartaoMini({ slug }) {
  const p = PAGINAS[slug];
  return (
    <Link to={`/ingles/${slug}`} className="ig-mini">
      <b>{p.resposta.pt}</b>
      <i>{p.resposta.en}</i>
      <span>🗣️ {p.resposta.fala}</span>
    </Link>
  );
}

const semAcento = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// índice: /ingles
export function IndiceIngles() {
  const { session } = useAuth();
  useSeo(null);
  const [busca, setBusca] = useState('');
  const lista = useMemo(() => {
    const q = semAcento(busca.trim());
    return Object.keys(PAGINAS).filter(s => {
      if (!q) return true;
      const p = PAGINAS[s];
      return semAcento(`${p.titulo} ${p.resposta.pt} ${p.resposta.en} ${p.tema}`).includes(q);
    });
  }, [busca]);
  const cta = ctaDe(session);
  return (
    <div className="ig">
      <Topo session={session} cta={cta} />
      <main>
        <span className="ig-tema">Dicas rápidas · com áudio</span>
        <h1>Como se diz em inglês?</h1>
        <p className="ig-explica">Frases do dia a dia, inglês para viagem e os erros que todo brasileiro comete. Cada página tem a pronúncia escrita do jeito que a gente lê, áudio normal e devagar, exemplos e um teste rápido.</p>
        <label className="ig-busca">
          <span aria-hidden="true">🔎</span>
          <input type="search" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Procure: obrigado, banheiro, have…" aria-label="Procurar frase" />
        </label>
        {TEMAS.map(tema => {
          const doTema = lista.filter(s => PAGINAS[s].tema === tema);
          if (!doTema.length) return null;
          return (
            <section key={tema} className="ig-grupo">
              <h2>{tema}</h2>
              <div className="ig-mini-grid">{doTema.map(s => <CartaoMini key={s} slug={s} />)}</div>
            </section>
          );
        })}
        {!lista.length && <p className="ig-vazio">Ainda não temos essa frase. Que tal aprender com o curso completo? 👇</p>}
        <section className="ig-cta">
          <p className="ig-cta-k">Quer ir além das frases soltas?</p>
          <h2>Curso de inglês completo e grátis</h2>
          <p>Do zero ao intermediário, com lições curtas, áudio em tudo, pronúncia no microfone e um professor que explica seus erros em português. Sem cartão e sem anúncios.</p>
          <Link className="btn btn-lime btn-3d btn-lg" {...cta}>{session ? 'Continuar estudando →' : 'Começar grátis →'}</Link>
        </section>
      </main>
      <Rodape />
    </div>
  );
}

// página de uma frase: /ingles/<slug>
export default function Ingles() {
  const { slug } = useParams();
  const { session } = useAuth();
  const p = PAGINAS[slug];
  useSeo(p ? slug : undefined);
  if (!p) return <Navigate to="/ingles" replace />;
  const cta = ctaDe(session);
  return (
    <div className="ig">
      <Topo session={session} cta={cta} />
      <main>
        <Link to="/ingles" className="ig-voltar">← Todas as frases</Link>
        <span className="ig-tema">{p.tema}</span>
        <h1>{p.titulo}</h1>

        <div className="ig-card">
          <div className="ig-row"><span className="ig-flag"><BR /></span><span className="ig-lab">Português</span><b className="ig-pt">{p.resposta.pt}</b></div>
          <div className="ig-row"><span className="ig-flag"><US /></span><span className="ig-lab">Inglês</span><b className="ig-en">{p.resposta.en}</b></div>
          <div className="ig-row"><span className="ig-flag" aria-hidden="true">🗣️</span><span className="ig-lab">Como se fala</span><b className="ig-fala">{p.resposta.fala}</b></div>
          <Ouvir en={p.resposta.en} grande />
        </div>

        <p className="ig-explica">{p.explica}</p>

        <section className="ig-box">
          <h2>Exemplos</h2>
          <ul className="ig-ex">
            {p.exemplos.map(e => (
              <li key={e.en}>
                <div><b>{e.en}</b><span>{e.pt}</span></div>
                <Ouvir en={e.en} />
              </li>
            ))}
          </ul>
        </section>

        {p.dica && (
          <section className="ig-box ig-dica">
            <h2>💡 {p.dica.titulo}</h2>
            <p>{p.dica.texto}</p>
            <div className="ig-dica-frase">
              <div><b>{p.dica.en}</b><span>{p.dica.pt}</span><span className="ig-dica-fala">🗣️ {p.dica.fala}</span></div>
              <Ouvir en={p.dica.en} />
            </div>
          </section>
        )}

        <section className="ig-box">
          <h2>⚠️ O erro que todo brasileiro comete</h2>
          {p.erros.map(e => (
            <div key={e.certo} className="ig-erro">
              <p className="ig-errado">❌ {e.errado}</p>
              <div className="ig-certo"><p>✅ {e.certo} <span>({e.pt})</span></p><Ouvir en={e.certo} /></div>
              <p className="ig-erro-pq">{e.porque}</p>
            </div>
          ))}
        </section>

        <Quiz key={slug} itens={p.quiz} />

        <section className="ig-cta">
          <p className="ig-cta-k">Quer treinar isso de verdade?</p>
          {p.licao ? <>
            <h2>Está na lição “{p.licao.nome}”</h2>
            <p className="ig-cta-u">{p.licao.unidade}</p>
          </> : <h2>Aprenda inglês no seu nível</h2>}
          <p>{session
            ? 'Continue a sua trilha: lições curtas, com áudio e explicação em português.'
            : 'Faça o teste de nivelamento e comece do seu nível. Lições curtas, áudio em tudo, pronúncia no microfone e um professor que explica seus erros em português. Grátis, sem cartão e sem anúncios.'}</p>
          <Link className="btn btn-lime btn-3d btn-lg" {...cta}>{session ? 'Continuar estudando →' : 'Estude isso no Sacou →'}</Link>
        </section>

        <section className="ig-rel">
          <h2>Veja também</h2>
          <div className="ig-mini-grid">{p.relacionadas.filter(r => PAGINAS[r]).map(r => <CartaoMini key={r} slug={r} />)}</div>
          <p style={{ marginTop: 14 }}><Link to="/ingles" className="ig-voltar">Ver todas as frases →</Link></p>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
