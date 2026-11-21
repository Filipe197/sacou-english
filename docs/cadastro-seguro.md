# Cadastro seguro: confirmar e-mail + anti-robô

O código já está pronto. Ele só exige a verificação anti-robô quando existe `VITE_TURNSTILE_SITE_KEY`.
Siga a ordem abaixo. Se ligar o anti-robô no Supabase antes de o site publicado ter a chave,
**ninguém consegue entrar nem criar conta**.

## Parte 1: e-mails saindo pelo Gmail do Sacou

O envio padrão do Supabase manda poucos e-mails por hora e, no plano grátis, costuma entregar
só para quem é da equipe do projeto. Por isso o envio precisa sair pelo Gmail.

1. Entre na Conta Google **sacouenglish@gmail.com** → Segurança → ative a **Verificação em duas etapas**, se ainda não estiver ativa.
2. Ainda em Segurança, procure **Senhas de app** e crie uma com o nome "Supabase". O Google mostra uma senha de 16 letras.
   Copie essa senha (não mande no chat).
3. No Supabase: **Authentication → Emails → SMTP Settings → Enable custom SMTP**:
   - Sender email: `sacouenglish@gmail.com`
   - Sender name: `Sacou English`
   - Host: `smtp.gmail.com`
   - Port: `465`
   - Username: `sacouenglish@gmail.com`
   - Password: a senha de app de 16 letras
4. Ainda em **Authentication → Emails → Templates**, cole os modelos abaixo.
5. Faça um teste com "Esqueci minha senha" num e-mail seu e confira se chegou.

## Parte 2: ligar a confirmação de e-mail

**Authentication → Sign In / Providers → Email → Confirm email: ligado → Save.**

Pode ligar assim que a Parte 1 funcionar. O site já mostra a tela "Confira seu e-mail" com o botão de reenviar o link.

## Parte 3: anti-robô (Cloudflare Turnstile)

1. Crie uma conta grátis em dash.cloudflare.com, abra **Turnstile → Add widget**:
   - Nome: `Sacou English`
   - Domínios: `sacou-english.vercel.app` e `localhost` (o `localhost` é o app Android)
   - Modo: **Managed**
2. A Cloudflare mostra duas chaves:
   - **Site Key** (pública): mande no chat. Eu coloco no site e publico.
   - **Secret Key** (secreta): não mande no chat.
3. **Só depois que eu avisar que o site foi publicado com a chave:**
   Supabase → **Authentication → Attack Protection → Enable Captcha protection** →
   provedor **Turnstile by Cloudflare** → cole a **Secret Key** → Save.

## Modelos de e-mail

### Confirm signup

Assunto: `Confirme seu e-mail no Sacou English`

```html
<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0B0D1A">
  <h2 style="margin:0 0 12px">Falta só um passo! 🎉</h2>
  <p style="font-size:16px;line-height:1.5">Toque no botão abaixo para confirmar seu e-mail e começar a estudar inglês no Sacou English.</p>
  <p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#5B3DF5;color:#fff;padding:14px 26px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px">Confirmar meu e-mail</a></p>
  <p style="font-size:13px;color:#5A5E7A">Se você não criou uma conta no Sacou English, é só ignorar este e-mail.</p>
</div>
```

### Reset password

Assunto: `Crie uma nova senha no Sacou English`

```html
<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0B0D1A">
  <h2 style="margin:0 0 12px">Vamos criar uma senha nova</h2>
  <p style="font-size:16px;line-height:1.5">Recebemos um pedido para trocar a senha da sua conta. Toque no botão para criar uma nova.</p>
  <p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#5B3DF5;color:#fff;padding:14px 26px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px">Criar nova senha</a></p>
  <p style="font-size:13px;color:#5A5E7A">Se não foi você, ignore este e-mail: sua senha continua a mesma.</p>
</div>
```
