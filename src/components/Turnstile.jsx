// Verificação anti-robô (Cloudflare Turnstile), usada no cadastro, no login e no "esqueci a senha".
// Quase sempre é invisível: só aparece um desafio quando a Cloudflare desconfia.
// A chave do site é pública (widget "Sacou English" na Cloudflare, domínios sacou-english.vercel.app
// e localhost, que é o app Android). VITE_TURNSTILE_SITE_KEY troca a chave; "off" desliga.
// O Supabase confere o token do lado dele (Authentication → Attack Protection, chave secreta lá).
// Cada token vale uma vez só: depois de cada tentativa, chame reset() pela ref.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const ENV_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
export const TURNSTILE_KEY = ENV_KEY === 'off' ? '' : (ENV_KEY || '0x4AAAAAAGLLK8I2ppNi4MWb');
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let carregando = null;
function carregar() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  carregando ||= new Promise((ok, falha) => {
    const s = document.createElement('script');
    s.src = SRC; s.async = true; s.defer = true;
    s.onload = () => ok(window.turnstile);
    s.onerror = () => { carregando = null; falha(new Error('turnstile')); };
    document.head.appendChild(s);
  });
  return carregando;
}

// onToken(token | '') avisa quando a verificação passa, expira ou falha
const Turnstile = forwardRef(function Turnstile({ onToken }, ref) {
  const caixa = useRef(null);
  const id = useRef(null);
  const cb = useRef(onToken);
  cb.current = onToken;
  const [erro, setErro] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() { cb.current(''); try { if (id.current != null) window.turnstile?.reset(id.current); } catch { /* nada */ } },
  }), []);

  useEffect(() => {
    if (!TURNSTILE_KEY) return undefined;
    let vivo = true;
    carregar().then((ts) => {
      if (!vivo || !caixa.current) return;
      id.current = ts.render(caixa.current, {
        sitekey: TURNSTILE_KEY,
        language: 'pt-br',
        appearance: 'interaction-only', // só aparece se precisar de um clique
        callback: (t) => { setErro(false); cb.current(t); },
        'expired-callback': () => cb.current(''),
        'error-callback': () => { cb.current(''); setErro(true); },
      });
    }).catch(() => setErro(true));
    return () => { vivo = false; try { if (id.current != null) window.turnstile?.remove(id.current); } catch { /* nada */ } id.current = null; };
  }, []);

  if (!TURNSTILE_KEY) return null;
  return (
    <div className="turnstile">
      <div ref={caixa} />
      {erro && <p className="hint">Não conseguimos fazer a verificação anti-robô. Confira sua internet e recarregue a página.</p>}
    </div>
  );
});

export default Turnstile;
