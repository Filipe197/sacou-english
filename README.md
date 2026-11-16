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

1. **Banco:** Supabase → SQL Editor → cole `supabase/schema.sql` → Run.
2. **Login:** Supabase → Authentication → URL Configuration → *Site URL* = endereço do site na Vercel
   e, em *Redirect URLs*, adicione `https://SEU-SITE.vercel.app/**` e `http://localhost:5173/**`.
3. **Vercel:** importe o repositório e cadastre as variáveis `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_PUBLISHABLE_KEY` (mesmos valores do `.env.example`).

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
