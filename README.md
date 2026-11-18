# Sacou English

Site de inglês do zero à fluência, com explicação em português em cada exercício.
Stack: React (Vite) + Supabase (login e progresso) + Vercel.

## Rodar no PC

```
npm install
copy .env.example .env
npm run dev
```

## Primeira configuração (uma vez só)

1. **Banco:** Supabase → SQL Editor → cole `supabase/schema.sql` → Run. Depois rode também
   `supabase/002_admin.sql` (painel), `supabase/003_caderno.sql` (caderno digital) e
   `supabase/004_ia.sql` (limite diário do professor de IA) e `supabase/005_turmas_missoes.sql`
   (missões, turmas, lembretes, treino com IA e lição feita sem internet) e `supabase/006_admin_alunos.sql`
   (lista de alunos com nome e e-mail no painel Admin; só administradores veem) e `supabase/007_jogos.sql`
   (jogos e histórias: missão da semana de jogos). Depois, `supabase/008_erros.sql` (aviso automático de erros) e `supabase/009_escudo.sql` (escudo da sequência).
2. **Login:** Supabase → Authentication → URL Configuration → *Site URL* = endereço do site na Vercel
   e, em *Redirect URLs*, adicione `https://SEU-SITE.vercel.app/**` e `http://localhost:5173/**`.
3. **Vercel:** importe o repositório e cadastre as variáveis `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_PUBLISHABLE_KEY` (mesmos valores do `.env.example`).
4. **Professor de IA:** na Vercel, cadastre a chave de **um** destes provedores (fica só no servidor,
   na pasta `api/`; nunca vai para o navegador):
   - **DeepSeek:** `DEEPSEEK_API_KEY` (crie em platform.deepseek.com). Opcional: `DEEPSEEK_MODEL`
     (padrão `deepseek-flash`).
   - **Claude (Anthropic):** `ANTHROPIC_API_KEY` (crie em console.anthropic.com). Opcional: `AI_MODEL`
     (padrão `claude-opus-5-5`).
   Se as duas chaves existirem, `AI_PROVIDER=deepseek` ou `AI_PROVIDER=anthropic` escolhe qual usar
   (sem isso, vale a DeepSeek). Para usar no PC, coloque as mesmas variáveis no `.env`.

5. **Lembretes no celular (opcional):** a chave pública já está no código. Na Vercel, cadastre os segredos
   `VAPID_PRIVATE_KEY` e `CRON_SECRET` (valores no seu `.env`, gerados uma vez) e `SUPABASE_SERVICE_ROLE_KEY`
   (Supabase → Project Settings → API Keys → secret / service_role). A Vercel chama `api/lembrete.js`
   todo dia às 19h de Brasília (`vercel.json` → `crons`).

## Professor de IA e conversa

- **Por que errei?** No feedback de um erro, o aluno pede ao professor uma explicação do erro *dele*
  e pode fazer até 3 perguntas sobre o exercício (`api/explicar.js`, `src/components/Tutor.jsx`).
- **Conversar** (`/conversar`): situações com personagens, por voz ou texto, com correção na hora e
  resumo final que vira flashcards (`api/conversa.js`, `src/pages/Conversation.jsx`, `src/lib/scenarios.js`).
- **Pronúncia palavra por palavra** no exercício de fala: marca as palavras que o reconhecimento de voz
  não entendeu e dá dicas para os sons difíceis para brasileiros. Roda no navegador, sem custo de IA
  (`src/lib/pronounce.js`, `src/components/Pronounce.jsx`).
- Limite por aluno por dia (em `supabase/004_ia.sql`): 40 explicações, 60 falas na conversa e 8 resumos.
- **Aula falada** (`/aula`): o Professor Juvenal (o mais ranzinza do Brasil) fala uma frase, o aluno repete e o site confere
  palavra por palavra no navegador (sem custo de IA); se não sair, ele pede de novo. Depois faz perguntas para o aluno
  responder. A IA só cria o próximo passo (`api/aula.js`, `src/pages/Aula.jsx`, `src/lib/aula.js`); conta no limite
  de falas da conversa. As falas prontas dele (`RETRY`, `GIVE_UP`, `INTRO` em `src/lib/aula.js`) têm voz natural
  da Kokoro (`pm_santa` em português, `am_santa` em inglês), gerada pelo `gen-audio.py`; as respostas criadas pela IA
  usam a voz do aparelho (aviso de "voz em fase beta" na tela).
- **Treino infinito** (`api/treino.js`): na revisão, a IA cria exercícios novos sobre os erros do aluno; cada
  frase passa pela mesma checagem CEFR-J do build (`scripts/cefr.mjs`) e o que não passar é descartado.
- **Professor que lembra:** a explicação do erro considera os erros que o aluno mais repete.
- **Modo fone** (`/fone`), **missões da semana**, **card para o story**, **turmas** (`/turmas`) e
  **lição sem internet** (fica salva no aparelho e sobe quando a conexão volta: `src/lib/offline.js`).
- Teste local sem gastar: `AI_MOCK=1` no `.env` devolve respostas de exemplo (não funciona em produção).

## Jogos e histórias (`/jogos`)

- **Ana em Londres:** série de episódios ilustrados com áudio, perguntas e escolhas que mudam a história.
- **Podcast da Ana:** um episódio curto por unidade (A1 a B2) com as vozes dos personagens, transcrição que
  acompanha o áudio e 3 perguntas. Roteiros em `src/games/data/podcasts.json`; áudio gerado por
  `python scripts/gen-podcasts.py` (em `public/audio/podcast/`).
- **Detetive:** casos para resolver lendo depoimentos e pistas. **Missões na cidade:** situações reais de viagem.
- **Jogos rápidos:** Palavra Relâmpago, Ouviu, tocou e Frase em pedaços (usam o que o aluno já estudou).
- Conteúdo em `src/games/data/`. Episódios, casos e missões liberam ao terminar a unidade indicada em `unlock`.
  `scripts/validate-games.mjs` confere todo o inglês na CEFR-J (roda no build).
- Ilustrações próprias em SVG (`src/games/art.jsx`): personagens montáveis e cenários.

## Erros, testes e voz

- **Aviso automático de erros:** quando algo quebra no aparelho de um aluno, o site grava em `app_errors`
  (`src/lib/errors.js`). Os erros aparecem no painel Admin, e os administradores recebem um aviso no celular
  junto do lembrete diário se houver erros nas últimas 24 h.
- **Checagens no build:** conteúdo das lições, conteúdo dos jogos e `scripts/check-api.mjs` (todas as funções de
  `api/` precisam carregar). Se algo falhar, a Vercel não publica.
- **Testes de tela:** `npm test` abre o site com dados de demonstração no Chrome/Edge e passa pelas telas principais
  (`tests/e2e/`). O GitHub roda tudo a cada envio (`.github/workflows/testes.yml`).
- **Voz natural:** `public/audio/` tem um MP3 por frase, gerado com a Kokoro (voz neural, Apache 2.0), com voz
  feminina ou masculina conforme o personagem (`src/lib/voices.json`). Depois de criar conteúdo novo, rode
  `python scripts/gen-audio.py` (instruções no topo do arquivo). Frases sem áudio usam a voz do aparelho.

## Escudo, conquistas e ícone

- **Comemoração diária e XP duplo:** execute também `supabase/010_sessoes_bonus.sql`, depois de `009_escudo.sql`,
  **antes de publicar esta versão**. A primeira lição da trilha concluída no dia ativa 10 minutos de XP em dobro,
  inclusive para essa lição. Treinos, revisões, jogos e modo fone também recebem o bônus enquanto ele estiver ativo.
  O banco controla a expiração e reconhece reenvios da mesma sessão sem somar pontos novamente.
  A comemoração da ofensiva aparece após a primeira atividade do dia confirmada pelo servidor. Sem conexão,
  o app informa o envio pendente; pontos e bônus dependem da confirmação. Envios de dias anteriores não ativam
  um bônus novo. O relógio do aparelho só exibe a contagem: a decisão sobre XP é do servidor.
- **Testes de recuperação:** `npm run test:recovery` verifica erros de perfil, preservação das anotações,
  gravação de progresso, comemoração e bônus em celular (390 px) e PC (1440 px). Também faz parte de `npm test`.
  As capturas ficam em `tests/e2e/artifacts/` (fora do Git). Os testes SQL em `supabase/tests/010_sessoes_bonus.sql`
  verificam a regra real do banco em uma transação revertida ao final; use um banco de testes com as migrações aplicadas.

- **Escudo da sequência** (`009_escudo.sql`): a cada 7 dias seguidos o aluno ganha um escudo (máx. 2). Se faltar
  um dia, o escudo é usado sozinho na próxima lição e a sequência continua.
- **Conquistas:** 23 medalhas calculadas do progresso (`src/lib/achievements.js`), em Meu progresso, com card para o story.
- **Número no ícone** do app instalado: erros para revisar, ou 1 se ainda não estudou hoje (`AppBadge.jsx`).
- **Modo lento palavra por palavra:** cada palavra do curso tem áudio próprio (`public/audio/w/`, gerado pelo
  `gen-audio.py`); a tartaruga junta as palavras com pausas.

## Atualizações chegando para todo mundo

- Cada publicação gera `version.json` com o número da versão (`vite.config.js`). O app confere sempre que volta
  para a tela e a cada 15 min (`src/components/UpdateManager.jsx`): em telas paradas recarrega na hora; no meio de
  uma lição, jogo ou anotação mostra a faixa "Nova versão disponível" e atualiza quando a pessoa sai da tela.
- **Novidades:** para avisar os alunos de algo novo, adicione um item no topo de `src/novidades.json`. O app mostra
  esse cartão uma vez para quem já usava o app.

## Conteúdo

- As unidades ficam em `src/content/<nível>/unit-XX.json` (A1, A2, B1 e B2, 8 unidades de 7 lições cada).
- `npm run validate` confere tudo: estrutura, explicação em cada exercício e se **toda palavra em inglês
  está no nível da unidade (ou abaixo) na CEFR-J Wordlist** (`content/sources/`). O `npm run build` roda essa checagem antes;
  se algo estiver errado, o deploy falha em vez de publicar conteúdo quebrado.
- Palavras fora da lista só entram em `extra_vocab`, com justificativa (geram aviso).

## Sons e animações (prontos, gratuitos)

- `public/sounds/`: `correct.ogg`, `wrong.ogg`, `complete.ogg`, `click.ogg` — pacotes Kenney (CC0).
- `public/animations/`: `celebrate.lottie`, `trophy.lottie` — LottieFiles (Lottie Simple License).
- Se um arquivo não existir, o site funciona normalmente, só sem aquele efeito.

## Ilustrações da trilha

- `public/art/pessoas/`: personagens do **Humaaans**, de Pablo Stanley (CC0, humaaans.com), com as roupas
  recoloridas para o roxo, o limão e o laranja do Sacou.
- `src/art/objetos.js`: objetos de cada tema (paleta, bolo, caneca…), desenhados para o Sacou.
- `src/components/TrailScene.jsx`: qual personagem e qual objeto aparecem em cada unidade.
- O pacote original fica em `arte-fonte/` (fora do git).

## Fontes

Ver página `/creditos` no site: CEFR (Conselho da Europa), British Council/EAQUALS Core Inventory,
CEFR-J Wordlist v1.5 (Tono Laboratory, TUFS).
