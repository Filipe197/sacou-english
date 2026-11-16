// Resultado da fala palavra por palavra + treino de uma palavra só.
import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';
import { tipsFor, sameWord } from '../lib/pronounce.js';

// lido na hora (e não ao carregar o arquivo), para refletir o navegador atual
export const getSR = () => (typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition || null) : null);

// Reconhecimento de voz de uma frase: devolve as alternativas que o navegador ouviu.
export function useListen() {
  const [listening, setListening] = useState(false);
  const rec = useRef(null);
  useEffect(() => () => rec.current?.abort?.(), []);
  function listen({ onResult, onError, interim }) {
    const SR = getSR();
    if (!SR) return;
    rec.current?.abort?.();
    const r = new SR(); rec.current = r;
    r.lang = 'en-US'; r.interimResults = !!interim; r.maxAlternatives = 4;
    r.onresult = (e) => {
      const res = e.results[e.results.length - 1];
      if (!res.isFinal) { interim?.(res[0].transcript); return; }
      onResult([...res].map(a => a.transcript));
    };
    r.onerror = (e) => onError?.(e.error === 'not-allowed' ? 'Permita o uso do microfone no navegador para praticar a fala.' : e.error === 'no-speech' ? 'Não ouvi nada. Toque no microfone e fale perto do aparelho.' : 'Não consegui ouvir. Toque no microfone e fale de novo.');
    r.onend = () => setListening(false);
    r.start(); setListening(true);
  }
  const stop = () => rec.current?.stop?.();
  return { listening, listen, stop };
}

export function PronWords({ words, onPick, picked }) {
  const missed = words.filter(w => !w.ok).length;
  return (
    <div className="pron">
      <div className="pron-line" lang="en">
        {words.map((x, i) => (
          <button key={i} type="button" className={'pron-w ' + (x.ok ? 'ok' : 'miss') + (picked === i ? ' on' : '')}
            onClick={() => onPick(i)} aria-label={`${x.w}: ${x.ok ? 'entendi bem' : 'não entendi, toque para treinar'}`}>{x.w}</button>
        ))}
      </div>
      <p className="muted pron-legend">
        {missed ? <><span className="dot ok" /> entendi <span className="dot miss" /> não entendi — toque numa palavra para treinar</> : <><span className="dot ok" /> Entendi todas as palavras!</>}
      </p>
    </div>
  );
}

export function WordCoach({ word, onClose }) {
  const { listening, listen } = useListen();
  const [res, setRes] = useState(null); // null | 'ok' | 'miss'
  const [heard, setHeard] = useState('');
  const [msg, setMsg] = useState('');
  const tips = tipsFor(word);
  const clean = word.replace(/[^A-Za-z']/g, '');
  useEffect(() => { setRes(null); setHeard(''); setMsg(''); speak(clean, { slow: true }); }, [word]);
  function go() {
    setMsg(''); setRes(null);
    listen({
      onResult: (alts) => {
        const hit = alts.some(a => a.split(/\s+/).some(w => sameWord(w, clean)));
        setHeard(alts[0]); setRes(hit ? 'ok' : 'miss');
      },
      onError: setMsg,
    });
  }
  return (
    <div className="coach" role="dialog" aria-label={`Treinar a palavra ${clean}`}>
      <div className="coach-h">
        <b lang="en">{clean}</b>
        {canSpeak() && <button type="button" className="chip" onClick={() => speak(clean)}><Icon name="sound" size={14} />Ouvir</button>}
        {canSpeak() && <button type="button" className="chip" onClick={() => speak(clean, { slow: true })}><Icon name="turtle" size={14} />Devagar</button>}
        <button type="button" className="icon-btn" style={{ width: 34, height: 34, marginLeft: 'auto' }} aria-label="Fechar treino" onClick={onClose}><Icon name="x" size={16} /></button>
      </div>
      <ul className="coach-tips">{tips.map(t => <li key={t}>{t}</li>)}</ul>
      {getSR() && (
        <div className="coach-try">
          <button type="button" className={'mic sm' + (listening ? ' on' : '')} disabled={listening} onClick={go} aria-label={`Falar ${clean}`}><Icon name="mic" size={24} color="#fff" stroke={2.2} /></button>
          <span style={{ fontSize: 15 }}>
            {listening ? 'Ouvindo… diga só a palavra' : res === 'ok' ? <b style={{ color: 'var(--ok-d)' }}>Isso! Agora saiu “{clean}”.</b>
              : res === 'miss' ? <>Ouvi <b lang="en">“{heard}”</b>. Ouça devagar e tente de novo.</> : 'Toque no microfone e diga só esta palavra.'}
          </span>
        </div>
      )}
      {msg && <span className="alert" role="status">{msg}</span>}
    </div>
  );
}
