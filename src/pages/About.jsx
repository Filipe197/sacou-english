// Página "Sobre" (/sobre): quem faz, como o método funciona e por que é grátis.
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui.jsx';
import { useAuth } from '../lib/auth.jsx';
import { CONTACT_EMAIL } from '../lib/legal.js';

const METHOD = [
  ['🧭', 'Níveis do padrão europeu', 'O curso segue os níveis do CEFR (A1, A2, B1, B2 e C1). Cada unidade diz o que você vai conseguir fazer em inglês no fim dela.'],
  ['💬', 'Explicado em português', 'A gramática é explicada do jeito que um brasileiro entende, com os erros que a gente mais comete e o porquê de cada resposta.'],
  ['📚', 'Vocabulário certo para o nível', 'Toda palavra em inglês dos exercícios é conferida contra uma lista de vocabulário por nível (CEFR-J). Nada de palavra difícil antes da hora.'],
  ['🔁', 'Revisão no momento certo', 'O app lembra de cada palavra e frase que você estudou e traz de volta pouco antes de você esquecer (revisão espaçada).'],
  ['🎧', 'Ouvir, falar, ler e escrever', 'Áudio em todas as frases, ditado, pronúncia com o microfone, podcasts curtos e exercícios de escrita corrigidos.'],
  ['🤖', 'Professor de IA', 'Errou e não entendeu? O professor explica o seu erro na hora. E o Professor Juvenal dá uma aula diferente todo dia.'],
];

export default function About() {
  const { session } = useAuth();
  return (
    <div className="legal">
      <Link to="/" aria-label="Início"><Logo /></Link>
      <h1>Sobre o Sacou English</h1>
      <p className="about-lead">Um curso de inglês grátis, feito no Brasil para brasileiros, com lições curtas que cabem no dia a dia e explicação de verdade, não só “decore isso”.</p>

      <h2>Quem faz</h2>
      <p>O Sacou English é um projeto independente brasileiro. Ele nasceu de uma ideia simples: muita gente desiste do inglês porque os cursos são caros ou porque os apps gratuitos fazem você repetir frases sem entender o porquê. Aqui, cada resposta vem explicada em português.</p>
      <p>O curso está em teste aberto e melhora toda semana com o que os alunos contam. Achou um erro? Use o botão <b>“Reportar erro”</b> que aparece depois de cada exercício. Tem uma ideia ou dúvida? Escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h2>O método</h2>
      <div className="about-grid">
        {METHOD.map(([ic, t, d]) => (
          <div key={t} className="card"><h3><span aria-hidden="true">{ic}</span> {t}</h3><p>{d}</p></div>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 15 }}>As referências usadas estão em <Link to="/creditos">Fontes e créditos</Link>.</p>

      <h2>Por que é grátis?</h2>
      <p>Porque aprender inglês não deveria depender de quanto você pode pagar. Não tem pegadinha:</p>
      <ul>
        <li><b>Sem cartão de crédito</b> para criar a conta e <b>sem período de teste</b> que vira cobrança.</li>
        <li><b>Sem anúncios</b> no meio das lições.</li>
        <li><b>Seus dados não são vendidos</b> nem usados para publicidade (veja a <Link to="/privacidade">Política de Privacidade</Link>).</li>
      </ul>
      <p>O que custa dinheiro para manter, como o professor de IA e a voz natural, tem um limite diário por aluno. É isso que permite manter o curso aberto para todo mundo.</p>
      <p>Quem pode e quer ajudar a manter o projeto encontra as formas de apoio em <Link to="/apoie">Apoie o Sacou</Link>. É voluntário: nada muda para quem não contribui.</p>

      <div className="about-cta">
        <Link className="btn btn-violet btn-3d btn-lg" to={session ? '/aprender' : '/criar-conta'}>{session ? 'Continuar estudando' : 'Começar grátis'}</Link>
      </div>

      <nav className="legal-nav">
        <Link to="/apoie">Apoie</Link>
        <Link to="/privacidade">Política de Privacidade</Link>
        <Link to="/termos">Termos de Uso</Link>
        <Link to="/creditos">Fontes e créditos</Link>
      </nav>
    </div>
  );
}
