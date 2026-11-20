// Página "Baixe o app" (/baixar): APK para Android e passo a passo para instalar no iPhone
// pela tela de início (PWA), enquanto não existe app na App Store.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Icon } from '../components/ui.jsx';

export const APK_URL = '/download/sacou-english.apk';
const APK_SIZE = '8 MB';

function device() {
  if (typeof navigator === 'undefined') return 'pc';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  return 'pc';
}

function Steps({ items }) {
  return <ol className="dl-steps">{items.map((t, i) => <li key={i}><span className="dl-n">{i + 1}</span><span>{t}</span></li>)}</ol>;
}

export default function Download() {
  const dev = useMemo(device, []);
  const [tab, setTab] = useState(dev === 'ios' ? 'ios' : 'android');
  return (
    <div className="apoie dl">
      <Link to="/" aria-label="Início" className="ap-logo"><Logo /></Link>

      <section className="ap-hero">
        <span className="ap-kick">Grátis · sem anúncios</span>
        <h1>Leve o Sacou English no seu celular.</h1>
        <p>O app abre na hora, direto na sua trilha, e o progresso é o mesmo da sua conta no site.</p>
        <div className="ap-hero-bts">
          {dev !== 'ios' && <a className="btn btn-lime btn-lg" href={APK_URL} download><Icon name="download" size={20} />Baixar para Android</a>}
          {dev === 'ios' && <a className="btn btn-lime btn-lg" href="#iphone" onClick={() => setTab('ios')}>Instalar no iPhone</a>}
          <Link className="btn btn-ghost-dark btn-lg" to="/aprender">Usar no navegador</Link>
        </div>
      </section>

      <div className="dl-tabs" role="tablist" aria-label="Escolha seu celular">
        <button type="button" role="tab" aria-selected={tab === 'android'} className={tab === 'android' ? 'on' : ''} onClick={() => setTab('android')}>Android</button>
        <button type="button" role="tab" aria-selected={tab === 'ios'} className={tab === 'ios' ? 'on' : ''} onClick={() => setTab('ios')}>iPhone</button>
      </div>

      {tab === 'android' ? (
        <section className="ap-sec dl-sec" id="android">
          <h2>Instalar no Android</h2>
          <div className="card dl-card">
            <Steps items={[
              <>Toque em <b>Baixar o app</b> aqui embaixo (arquivo de {APK_SIZE}).</>,
              <>Quando terminar, toque na notificação do download ou abra o arquivo <b>sacou-english.apk</b> na pasta Downloads.</>,
              <>Se o celular perguntar, permita <b>instalar apps desta fonte</b> (o Chrome ou o app de arquivos pede isso uma vez só).</>,
              <>Toque em <b>Instalar</b>. Se aparecer o aviso do Play Protect, toque em <b>Mais detalhes → Instalar mesmo assim</b>: o aviso aparece porque o app ainda não está na Play Store.</>,
              <>Abra o <b>Sacou English</b> e entre com a mesma conta do site.</>,
            ]} />
            <a className="btn btn-violet btn-3d btn-lg" href={APK_URL} download><Icon name="download" size={20} />Baixar o app ({APK_SIZE})</a>
          </div>

          <h3 className="dl-h3">O que precisa</h3>
          <ul className="ap-list dl-req">
            <li><Icon name="check" size={18} stroke={3} /><span><b>Android 6.0 ou mais novo</b> (praticamente todo celular dos últimos anos).</span></li>
            <li><Icon name="check" size={18} stroke={3} /><span><b>Uns 30 MB livres</b>: o app tem {APK_SIZE} e guarda as atualizações no celular.</span></li>
            <li><Icon name="check" size={18} stroke={3} /><span><b>Internet</b> para entrar na conta, ouvir os áudios e usar o professor de IA. As lições abrem rápido porque o app já vem com elas.</span></li>
            <li><Icon name="check" size={18} stroke={3} /><span><b>Microfone</b> (opcional) para os exercícios de fala. O reconhecimento de voz usa o do Google, que já vem na maioria dos celulares.</span></li>
          </ul>

          <h3 className="dl-h3">Como o app se atualiza</h3>
          <div className="dl-upd">
            <div className="card"><span aria-hidden="true">⚡</span><b>Sozinho, na maioria das vezes</b><p>Quando sai uma novidade, o app baixa em segundo plano e já abre atualizado na próxima vez. Você não precisa fazer nada.</p></div>
            <div className="card"><span aria-hidden="true">📚</span><b>Nunca no meio da lição</b><p>A troca só acontece quando você abre o app de novo, para não interromper o que você está estudando.</p></div>
            <div className="card"><span aria-hidden="true">📲</span><b>Às vezes, um toque</b><p>Quando a mudança é maior, aparece o aviso <b>Nova versão do app</b>. Toque em <b>Atualizar</b> e depois em <b>Instalar</b>.</p></div>
          </div>
          <p className="muted ap-small">Instalou uma versão antiga (antes de 20/11/2026)? Baixe por esta página uma vez e instale por cima. Depois disso, as atualizações chegam sozinhas. Seu progresso fica salvo na conta.</p>
        </section>
      ) : (
        <section className="ap-sec dl-sec" id="iphone">
          <h2>Instalar no iPhone</h2>
          <p className="ap-lead">Ainda não temos app na App Store, mas dá para colocar o Sacou na tela de início do iPhone. Ele abre em tela cheia, como um app.</p>
          <div className="card dl-card">
            <Steps items={[
              <>Abra <b>sacou-english.vercel.app</b> no <b>Safari</b> (precisa ser o Safari).</>,
              <>Toque no botão <b>Compartilhar</b> <span className="dl-ic" aria-hidden="true"><Icon name="share" size={16} /></span> na barra de baixo (no iPad, fica em cima).</>,
              <>Role a lista e toque em <b>Adicionar à Tela de Início</b>.</>,
              <>Confirme em <b>Adicionar</b>, no canto de cima.</>,
              <>Abra pelo ícone do <b>Sacou English</b> na tela de início e entre com sua conta.</>,
            ]} />
            <p className="muted ap-small"><b>Precisa de:</b> iPhone ou iPad com iOS 15 ou mais novo, o Safari e internet. <b>Atualização:</b> automática; o Sacou abre sempre na versão mais nova.</p>
            <p className="muted ap-small">Não achou a opção? Atualize o iPhone ou confira se está no Safari, e não dentro do Instagram ou do WhatsApp (nesses, toque em “Abrir no navegador” antes).</p>
          </div>
        </section>
      )}

      <section className="ap-sec">
        <h2>Prefere não instalar?</h2>
        <p className="ap-lead">O Sacou funciona inteiro pelo navegador do celular ou do computador, com a mesma conta.</p>
        <Link className="btn btn-out" to="/aprender">Estudar pelo navegador</Link>
      </section>

      <nav className="legal-nav">
        <Link to="/sobre">Sobre</Link>
        <Link to="/apoie">Apoie</Link>
        <Link to="/privacidade">Política de Privacidade</Link>
        <Link to="/termos">Termos de Uso</Link>
      </nav>
    </div>
  );
}
