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
   `supabase/004_ia.sql` (limite diário do professor de IA).
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

## Professor de IA e conversa

- **Por que errei?** No feedback de um erro, o aluno pede ao professor uma explicação do erro *dele*
  e pode fazer até 3 perguntas sobre o exercício (`api/explicar.js`, `src/components/Tutor.jsx`).
- **Conversar** (`/conversar`): situações com personagens, por voz ou texto, com correção na hora e
  resumo final que vira flashcards (`api/conversa.js`, `src/pages/Conversation.jsx`, `src/lib/scenarios.js`).
- **Pronúncia palavra por palavra** no exercício de fala: marca as palavras que o reconhecimento de voz
  não entendeu e dá dicas para os sons difíceis para brasileiros. Roda no navegador, sem custo de IA
  (`src/lib/pronounce.js`, `src/components/Pronounce.jsx`).
- Limite por aluno por dia (em `supabase/004_ia.sql`): 40 explicações, 60 falas na conversa e 8 resumos.
- Teste local sem gastar: `AI_MOCK=1` no `.env` devolve respostas de exemplo (não funciona em produção).

## Conteúdo

- As unidades ficam em `src/content/a1/unit-XX.json`.
- `npm run validate` confere tudo: estrutura, explicação em cada exercício e se **toda palavra em inglês
  está no nível A1 da CEFR-J Wordlist** (`content/sources/`). O `npm run build` roda essa checagem antes;
  se algo estiver errado, o deploy falha em vez de publicar conteúdo quebrado.
- Palavras fora da lista só entram em `extra_vocab`, com justificativa (geram aviso).

## Sons e animações (prontos, gratuitos)

- `public/sounds/`: `correct.ogg`, `wrong.ogg`, `complete.ogg`, `click.ogg` — pacotes Kenney (CC0).
- `public/animations/`: `celebrate.lottie`, `trophy.lottie` — LottieFiles (Lottie Simple License).
- Se um arquivo não existir, o site funciona normalmente, só sem aquele efeito.

## Fontes

Ver página `/creditos` no site: CEFR (Conselho da Europa), British Council/EAQUALS Core Inventory,
CEFR-J Wordlist v1.5 (Tono Laboratory, TUFS).
