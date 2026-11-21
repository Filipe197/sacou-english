import { Logo } from '../components/ui.jsx';

export default function Credits() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 64px' }}>
      <Logo />
      <h1 style={{ fontSize: 36, margin: '32px 0 12px' }}>Fontes e créditos</h1>
      <p className="muted" style={{ fontSize: 17, lineHeight: 1.65 }}>
        O conteúdo do Sacou English é organizado a partir de referências públicas reconhecidas para o ensino de idiomas. Todo exercício passa por uma checagem automática antes de ir ao ar.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
        <div className="card"><b>Níveis e objetivos (CEFR)</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>Quadro Europeu Comum de Referência para as Línguas — Conselho da Europa (2001; Volume Complementar, 2020). Define o que o aluno consegue fazer em cada nível, de A1 a C2.</p></div>
        <div className="card"><b>Gramática e funções por nível</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>British Council / EAQUALS Core Inventory for General English (North, Ortega &amp; Sheehan, 2010). Usado como referência de quais tópicos ensinar em cada nível.</p></div>
        <div className="card"><b>Vocabulário por nível</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>The CEFR-J Wordlist, Version 1.5. Compiled by Yukio Tono, Tokyo University of Foreign Studies. Retrieved from Open Language Profiles (github.com/openlanguageprofiles/olp-en-cefrj). Toda palavra em inglês dos exercícios é conferida contra esta lista.</p></div>
        <div className="card"><b>Vocabulário do C1</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>Octanove Vocabulary Profile C1/C2, Version 1.0. Created by Octanove Labs. Retrieved from Open Language Profiles (github.com/openlanguageprofiles/olp-en-cefrj). Licensed under CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0). As palavras do C1 são conferidas contra esta lista.</p></div>
        <div className="card"><b>Frequência das palavras</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>wordfreq, de Robyn Speer (github.com/rspeer/wordfreq). Dados de frequência sob licença CC BY-SA 4.0. Usado para priorizar as palavras mais usadas do inglês na hora de escrever as lições.</p></div>
        <div className="card"><b>Efeitos sonoros e animações</b><p className="muted" style={{ margin: '6px 0 0', lineHeight: 1.6 }}>Sons: Kenney (kenney.nl), licença CC0. Animações: LottieFiles, Lottie Simple License.</p></div>
      </div>
      <p className="muted" style={{ fontSize: 14, marginTop: 24, lineHeight: 1.6 }}>Encontrou algo errado? Use o botão “Reportar erro” que aparece depois de cada exercício. Todos os relatos são revisados.</p>
    </div>
  );
}
