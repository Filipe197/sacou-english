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
   (jogos e histórias: missão da semana de jogos). Por último, `supabase/008_erros.sql` (aviso automático de erros).
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
- **Treino infinito** (`api/treino.js`): na revisão, a IA cria exercícios novos sobre os erros do aluno; cada
  frase passa pela mesma checagem CEFR-J do build (`scripts/cefr.mjs`) e o que não passar é descartado.
- **Professor que lembra:** a explicação do erro considera os erros que o aluno mais repete.
- **Modo fone** (`/fone`), **missões da semana**, **card para o story**, **turmas** (`/turmas`) e
  **lição sem internet** (fica salva no aparelho e sobe quando a conexão volta: `src/lib/offline.js`).
- Teste local sem gastar: `AI_MOCK=1` no `.env` devolve respostas de exemplo (não funciona em produção).

## Jogos e histórias (`/jogos`)

- **Ana em Londres:** série de episódios ilustrados com áudio, perguntas e escolhas que mudam a história.
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

## Fontes

Ver página `/creditos` no site: CEFR (Conselho da Europa), British Council/EAQUALS Core Inventory,
CEFR-J Wordlist v1.5 (Tono Laboratory, TUFS).
