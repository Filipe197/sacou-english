// Página "Apoie o Sacou" (/apoie): doação por Pix, patrocínio de empresas, parceria com escolas
// e formulário de contato (supabase/018_apoio.sql). Aberta para quem não tem conta.
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Icon } from '../components/ui.jsx';
import { supabase } from '../lib/supabase.js';
import { CONTACT_EMAIL } from '../lib/legal.js';
import { PIX_KEY, pixPayload } from '../lib/pix.js';
import { qrMatrix } from '../lib/qr.js';

const KINDS = [
  ['apoiar', 'Quero contribuir'],
  ['patrocinio', 'Quero patrocinar (empresa)'],
  ['parceria', 'Quero uma parceria (escola ou instituição)'],
];

function PixQR({ text }) {
  const m = useMemo(() => qrMatrix(text), [text]);
  const n = m.length, q = 4;
  let d = '';
  m.forEach((row, y) => row.forEach((on, x) => { if (on) d += `M${x + q} ${y + q}h1v1h-1z`; }));
  return (
    <svg className="pix-qr" viewBox={`0 0 ${n + 2 * q} ${n + 2 * q}`} role="img" aria-label="QR Code do Pix para apoiar o Sacou English" shapeRendering="crispEdges">
      <rect width="100%" height="100%" fill="#fff" />
      <path d={d} fill="#0B0D1A" />
    </svg>
  );
}

function CopyButton({ text, label, done = 'Copiado!' }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(text); } catch {
      const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch { /* sem cópia */ } t.remove();
    }
    setOk(true); setTimeout(() => setOk(false), 2000);
  }
  return <button type="button" className="btn btn-out ap-copy" onClick={copy}><Icon name={ok ? 'check' : 'notebook'} size={18} />{ok ? done : label}</button>;
}

function ContactForm({ kind, setKind }) {
  const [f, setF] = useState({ name: '', email: '', org: '', message: '', site: '' });
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [err, setErr] = useState('');
  const up = (k) => (e) => setF(v => ({ ...v, [k]: e.target.value }));
  async function send(e) {
    e.preventDefault();
    if (f.site) { setState('sent'); return; } // campo escondido preenchido = robô
    if (f.name.trim().length < 2) { setErr('Escreva seu nome.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) { setErr('Confira o e-mail.'); return; }
    setErr(''); setState('sending');
    const { error } = await supabase.from('support_contacts').insert({
      name: f.name.trim().slice(0, 120), email: f.email.trim().slice(0, 200), org: f.org.trim().slice(0, 160) || null,
      kind, message: f.message.trim().slice(0, 2000) || null,
    });
    if (error) { setState('error'); return; }
    setState('sent');
  }
  if (state === 'sent') return <div className="card ap-sent" role="status"><b>Mensagem enviada. Obrigado! 💜</b><span>Respondemos pelo e-mail que você informou.</span></div>;
  return (
    <form className="card ap-form" onSubmit={send} noValidate>
      <div className="ap-grid">
        <div className="field"><label htmlFor="ap-n">Nome</label><input id="ap-n" value={f.name} onChange={up('name')} autoComplete="name" maxLength={120} required /></div>
        <div className="field"><label htmlFor="ap-e">E-mail</label><input id="ap-e" type="email" value={f.email} onChange={up('email')} autoComplete="email" maxLength={200} required /></div>
      </div>
      <div className="field"><label htmlFor="ap-o">Empresa ou instituição (opcional)</label><input id="ap-o" value={f.org} onChange={up('org')} autoComplete="organization" maxLength={160} /></div>
      <div className="field"><label htmlFor="ap-k">Você quer</label>
        <select id="ap-k" value={kind} onChange={e => setKind(e.target.value)}>{KINDS.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></div>
      <div className="field"><label htmlFor="ap-m">Mensagem (opcional)</label><textarea id="ap-m" rows={4} value={f.message} onChange={up('message')} maxLength={2000} /></div>
      <input className="ap-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.site} onChange={up('site')} placeholder="Deixe em branco" />
      {err && <p className="alert" role="alert">{err}</p>}
      {state === 'error' && <p className="alert" role="alert">Não foi possível enviar agora. Tente de novo ou escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
      <button className="btn btn-violet btn-3d btn-lg" disabled={state === 'sending'}>{state === 'sending' ? 'Enviando...' : 'Enviar mensagem'}</button>
      <p className="muted ap-small">Usamos seus dados só para responder este contato. Prefere e-mail? Escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </form>
  );
}

export default function Support() {
  const [kind, setKind] = useState('apoiar');
  const formRef = useRef(null);
  const payload = useMemo(() => pixPayload(), []);
  const toForm = (k) => { setKind(k); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <div className="apoie">
      <Link to="/" aria-label="Início" className="ap-logo"><Logo /></Link>

      <section className="ap-hero">
        <span className="ap-kick">Projeto independente e gratuito</span>
        <h1>Ajude a manter o inglês grátis para todo mundo.</h1>
        <p>O Sacou English ensina inglês do zero, com explicação em português, sem cobrar nada de ninguém. Quem pode contribuir ajuda quem não pode pagar um curso a continuar estudando.</p>
        <div className="ap-hero-bts">
          <a className="btn btn-lime btn-lg" href="#pix">Quero apoiar</a>
          <Link className="btn btn-ghost-dark btn-lg" to="/sobre">Conhecer o projeto</Link>
        </div>
      </section>

      <section className="ap-sec">
        <h2>Grátis de verdade, hoje e depois</h2>
        <p className="ap-lead">A gratuidade é a base do Sacou, não uma promoção. O apoio é voluntário e não muda nada no estudo de quem doa ou de quem não doa.</p>
        <ul className="ap-list">
          <li><Icon name="check" size={18} stroke={3} />Lições, revisões, jogos e o guia de gramática continuam gratuitos.</li>
          <li><Icon name="check" size={18} stroke={3} />Ninguém precisa doar para avançar de nível.</li>
          <li><Icon name="check" size={18} stroke={3} />Doar não libera conteúdo escondido: todo mundo estuda com o mesmo curso.</li>
          <li><Icon name="check" size={18} stroke={3} />Sem anúncios e sem venda de dados.</li>
        </ul>
      </section>

      <section className="ap-sec">
        <h2>Para onde vai o apoio</h2>
        <div className="ap-cards ap-costs">
          <div className="card"><span aria-hidden="true">🖥️</span><b>Servidores</b><p>Manter o app no ar e o progresso de cada aluno salvo.</p></div>
          <div className="card"><span aria-hidden="true">🤖</span><b>Professor de IA</b><p>Cada explicação de erro e cada correção de texto tem custo.</p></div>
          <div className="card"><span aria-hidden="true">🎧</span><b>Áudios com voz natural</b><p>Lições, podcasts e a aula do Juvenal com vozes que soam de verdade.</p></div>
          <div className="card"><span aria-hidden="true">📚</span><b>Conteúdo novo</b><p>Novas unidades, histórias e ilustrações até o nível avançado.</p></div>
        </div>
      </section>

      <section className="ap-sec">
        <h2>Formas de apoiar</h2>
        <div className="ap-cards ap-ways">
          <div className="card">
            <span className="ap-tag">Para você</span>
            <b>Apoiador</b>
            <p>Qualquer valor ajuda, de uma vez só ou sempre que puder. Cada contribuição mantém o curso aberto para mais gente.</p>
            <a className="btn btn-violet" href="#pix">Doar por Pix</a>
          </div>
          <div className="card">
            <span className="ap-tag">Para empresas</span>
            <b>Patrocinador</b>
            <p>Sua marca ao lado de um projeto que leva inglês de graça para brasileiros.</p>
            <ul className="ap-mini"><li>Nome e logotipo na área de patrocinadores do site</li><li>Agradecimento nas redes do Sacou</li><li>Contrapartidas combinadas caso a caso</li></ul>
            <button type="button" className="btn btn-out" onClick={() => toForm('patrocinio')}>Quero patrocinar</button>
          </div>
          <div className="card">
            <span className="ap-tag">Para escolas e professores</span>
            <b>Parceiro</b>
            <p>Use o Sacou com seus alunos: o professor cria uma turma e acompanha o progresso de cada um. Queremos ouvir o que sua escola precisa.</p>
            <button type="button" className="btn btn-out" onClick={() => toForm('parceria')}>Quero uma parceria</button>
          </div>
        </div>
      </section>

      <section className="ap-sec" id="pix">
        <h2>Doe por Pix</h2>
        <div className="card ap-pix">
          <PixQR text={payload} />
          <div className="ap-pix-t">
            <p>Abra o app do seu banco, escolha <b>Pix → Ler QR Code</b> e aponte para o código. Você escolhe o valor.</p>
            <p>Pelo celular? Use o <b>Pix copia e cola</b> ou a chave abaixo.</p>
            <span className="ap-key-k">Chave Pix (celular)</span>
            <code className="ap-key">{PIX_KEY}</code>
            <div className="ap-pix-bts">
              <CopyButton text={payload} label="Copiar Pix copia e cola" />
              <CopyButton text={PIX_KEY} label="Copiar chave" done="Chave copiada!" />
            </div>
            <p className="muted ap-small">No app do banco aparece o nome do responsável pelo projeto. O valor é decidido por você na hora.</p>
          </div>
        </div>
      </section>

      <section className="ap-sec">
        <h2>Nosso compromisso com a transparência</h2>
        <p>Todo valor recebido vai para manter, melhorar e ampliar o Sacou English. Queremos usar cada apoio com responsabilidade e contar, de tempos em tempos, o que ele tornou possível.</p>
      </section>

      <section className="ap-sec" ref={formRef} id="contato">
        <h2>Fale com a gente</h2>
        <p className="ap-lead">Quer patrocinar, fazer uma parceria ou só tirar uma dúvida sobre como apoiar? Mande uma mensagem.</p>
        <ContactForm kind={kind} setKind={setKind} />
      </section>

      <nav className="legal-nav">
        <Link to="/sobre">Sobre</Link>
        <Link to="/privacidade">Política de Privacidade</Link>
        <Link to="/termos">Termos de Uso</Link>
      </nav>
    </div>
  );
}
