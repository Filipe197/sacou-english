// Política de Privacidade (/privacidade) e Termos de Uso (/termos), em linguagem simples.
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui.jsx';
import { CONTACT_EMAIL, LEGAL_UPDATED } from '../lib/legal.js';

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

function Page({ title, children }) {
  return (
    <div className="legal">
      <Link to="/" aria-label="Início"><Logo /></Link>
      <h1>{title}</h1>
      <p className="muted">Atualizado em {LEGAL_UPDATED}.</p>
      {children}
      <nav className="legal-nav">
        <Link to="/privacidade">Política de Privacidade</Link>
        <Link to="/termos">Termos de Uso</Link>
        <Link to="/creditos">Fontes e créditos</Link>
      </nav>
    </div>
  );
}

export function Privacy() {
  return (
    <Page title="Política de Privacidade">
      <p>Esta página explica quais dados o Sacou English guarda, para que usamos, com quem compartilhamos e como você pode ver, corrigir ou apagar seus dados, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018, LGPD).</p>

      <h2>Quais dados guardamos</h2>
      <ul>
        <li><b>Conta:</b> nome (como você quer ser chamado), e-mail e senha (a senha fica criptografada; ninguém consegue lê-la). Se você entra com o Google, recebemos seu nome e e-mail do Google.</li>
        <li><b>Estudo:</b> lições concluídas, notas, XP, sequência de dias, exercícios que você errou, combo, meta diária e nível.</li>
        <li><b>Caderno:</b> as anotações e palavras que você salva.</li>
        <li><b>Turmas e ranking:</b> as turmas em que você entra ou que cria e sua posição no ranking da semana.</li>
        <li><b>Lembretes:</b> se você ativar, o endereço técnico de notificação do seu navegador.</li>
        <li><b>Uso do professor de IA:</b> quantas vezes você usou por dia (para o limite diário). O texto das conversas não fica guardado no nosso banco; só o que você escolher salvar no caderno.</li>
        <li><b>Relatos de erro no conteúdo:</b> o texto que você escreve ao usar “Reportar erro” num exercício.</li>
        <li><b>Erros técnicos:</b> quando algo quebra, guardamos a mensagem de erro, a página e o tipo de navegador, para corrigir o problema.</li>
      </ul>

      <h2>Para que usamos</h2>
      <ul>
        <li>Fazer o curso funcionar: salvar seu progresso, montar sua revisão e mostrar suas estatísticas (execução do serviço que você pediu).</li>
        <li>Enviar lembretes de estudo, só se você ativar (consentimento; dá para desligar no Perfil).</li>
        <li>Mostrar o ranking e as turmas (você pode sair do ranking e das turmas quando quiser).</li>
        <li>Corrigir erros e melhorar o site (interesse legítimo).</li>
      </ul>
      <p>Não vendemos seus dados, não mostramos anúncios e não usamos seus dados para publicidade.</p>

      <h2>Quem mais vê seus dados</h2>
      <ul>
        <li><b>Ranking:</b> outros alunos veem só seu primeiro nome, a inicial do sobrenome e o XP da semana. Você pode sair do ranking na própria página do ranking.</li>
        <li><b>Turmas:</b> o professor da turma vê seu nome, XP, sequência, lições concluídas e quantos erros você tem para revisar.</li>
        <li><b>Serviços que fazem o site funcionar</b> (operadores, que só usam os dados para prestar o serviço):
          Supabase (banco de dados e login), Vercel (hospedagem do site), o provedor de IA do professor (DeepSeek ou Anthropic, que recebe o texto da sua pergunta ou resposta no momento do uso),
          o serviço de notificações do seu navegador (Google, Apple, Mozilla ou Microsoft) e o Google, se você entrar com ele.
          Alguns desses serviços ficam fora do Brasil; a transferência acontece para executar o serviço que você usa.</li>
      </ul>

      <h2>Por quanto tempo</h2>
      <p>Guardamos seus dados enquanto sua conta existir. Quando você exclui a conta, apagamos na hora o perfil, o progresso, o caderno, as turmas que você criou, o ranking e os lembretes. Os registros de erro técnico perdem o vínculo com você.</p>

      <h2>Seus direitos</h2>
      <p>Você pode, a qualquer momento: confirmar quais dados temos, acessar e corrigir seus dados (no Perfil), baixar suas anotações (Caderno → Exportar), desligar os lembretes, sair do ranking e das turmas, e <b>excluir sua conta e todos os seus dados</b> em <Link to="/perfil">Perfil → Excluir minha conta</Link>.</p>
      <p>Para qualquer outro pedido ou dúvida sobre seus dados, escreva para <Mail />. Respondemos em até 15 dias.</p>

      <h2>Crianças e adolescentes</h2>
      <p>Menores de 18 anos devem usar o Sacou English com o conhecimento de um responsável. Se você é responsável e quer apagar a conta de um menor, escreva para <Mail />.</p>

      <h2>Segurança</h2>
      <p>A conexão com o site é criptografada (HTTPS), cada aluno só consegue ler os próprios dados no banco, e as chaves dos serviços ficam só no servidor. Nenhum sistema é 100% seguro: se acontecer um incidente que possa trazer risco a você, avisaremos.</p>

      <h2>Mudanças</h2>
      <p>Se esta política mudar de forma importante, avisaremos no próprio app.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Termos de Uso">
      <p>Ao criar uma conta no Sacou English, você concorda com estes termos. Eles são curtos de propósito.</p>
      <h2>O serviço</h2>
      <p>O Sacou English é um curso de inglês gratuito, com lições, exercícios, jogos e um professor de IA. Podemos mudar, melhorar ou tirar recursos ao longo do tempo.</p>
      <h2>Sua conta</h2>
      <ul>
        <li>Use informações verdadeiras e guarde sua senha com cuidado; você é responsável pelo que acontece na sua conta.</li>
        <li>Você pode excluir sua conta a qualquer momento no Perfil.</li>
      </ul>
      <h2>Uso adequado</h2>
      <ul>
        <li>Não tente atrapalhar o site, burlar os limites, acessar dados de outras pessoas ou usar o professor de IA para assuntos que não sejam o estudo de inglês.</li>
        <li>Nomes de usuário e nomes de turmas não podem ser ofensivos. Podemos suspender contas que desrespeitem estas regras.</li>
      </ul>
      <h2>Professor de IA</h2>
      <p>As respostas do professor de IA são criadas automaticamente e podem ter erros. Use-as como apoio ao estudo e confira no Guia de gramática quando tiver dúvida.</p>
      <h2>Conteúdo</h2>
      <p>As lições seguem o padrão europeu CEFR. O conteúdo, as ilustrações próprias e o código do Sacou English pertencem aos seus autores; as obras de terceiros estão listadas em <Link to="/creditos">Fontes e créditos</Link>. As anotações que você escreve são suas.</p>
      <h2>Garantias</h2>
      <p>Fazemos o possível para o site funcionar bem e o conteúdo estar correto, mas o serviço é oferecido como está, sem garantia de que nunca terá falhas ou de resultado em provas e certificações.</p>
      <h2>Privacidade e contato</h2>
      <p>Veja como cuidamos dos seus dados na <Link to="/privacidade">Política de Privacidade</Link>. Dúvidas: <Mail />.</p>
    </Page>
  );
}
