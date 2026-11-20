// Aula falada com o Professor Juvenal, o mais ranzinza do Brasil: ele comenta, no personagem,
// e pede para o aluno repetir uma frase ou responder uma pergunta. A repetição é
// conferida no navegador, palavra por palavra; se não sair, ele pede de novo.
import { useEffect, useRef, useState } from 'react';
import { Shell, Icon } from '../components/ui.jsx';
import Juvenal from '../components/Juvenal.jsx';
import { useListen, getSR, PronWords, WordCoach } from '../components/Pronounce.jsx';
import { Summary } from './Conversation.jsx';
import { alignSpeech } from '../lib/pronounce.js';
import { speak, speakAsync, canSpeak, fx } from '../lib/fx.js';
import { askAI } from '../lib/ai.js';
import { useAuth } from '../lib/auth.jsx';
import { useWakeLock } from '../lib/wakelock.js';
import { useProgress } from '../lib/progress.js';
import { currentLevel } from '../lib/content.js';
import { logActivity } from '../lib/offline.js';
import { fetchJuvenal, juvenalVoiceOff, newJuvenalLesson, aulaStatus } from '../lib/voz.js';
import { playUrl } from '../lib/fx.js';
import { AULA_LEVELS, TOPICS, topicById, TEACHER, MAX_STEPS, MAX_CHARS, MAX_TRIES, RETRY, GIVE_UP, INTRO, commentInPt } from '../lib/aula.js';

const PASS = 0.75; // parte das palavras que precisa sair para valer a repetição (igual às lições)
const VOICE_KEY = 'sacou-aula-voz';
const readVoice = () => { try { return localStorage.getItem(VOICE_KEY) !== '0'; } catch { return true; } };
const saveVoice = (on) => { try { localStorage.setItem(VOICE_KEY, on ? '1' : '0'); } catch { /* sem armazenamento */ } };
// Modo sem filtro (18+): palavrões liberados na aula, só depois de confirmar a idade (fica no aparelho)
const ADULT_KEY = 'sacou-aula-18';
const readAdult = () => { try { return localStorage.getItem(ADULT_KEY) === '1'; } catch { return false; } };
const saveAdult = (on) => { try { localStorage.setItem(ADULT_KEY, on ? '1' : '0'); } catch { /* sem armazenamento */ } };

// Andamento da aula salvo no aparelho: se a página recarregar no meio (tela apagou, navegador
// fechou a aba), a aula volta no mesmo passo, com a mesma conversa e sem gastar outra aula do dia.
const AULA_TTL = 3 * 3600 * 1000;
const aulaKey = (uid) => `sacou-aula-andamento:${uid || 'anon'}`;
function readAula(uid) {
  try {
    const s = JSON.parse(localStorage.getItem(aulaKey(uid)) || 'null');
    return s && s.cfg && s.aulaId && Date.now() - s.at < AULA_TTL ? s : null;
  } catch { return null; }
}
const writeAula = (uid, s) => { try { localStorage.setItem(aulaKey(uid), JSON.stringify({ ...s, at: Date.now() })); } catch { /* sem armazenamento */ } };
const clearAula = (uid) => { try { localStorage.removeItem(aulaKey(uid)); } catch { /* sem armazenamento */ } };

export default function Aula() {
  const { user } = useAuth();
  const restore = useRef(undefined);
  if (restore.current === undefined) restore.current = readAula(user?.id);
  const [cfg, setCfg] = useState(() => restore.current?.cfg || null);
  const [run, setRun] = useState(0);
  const exit = () => { clearAula(user?.id); restore.current = null; setCfg(null); };
  const again = () => { clearAula(user?.id); restore.current = null; setRun(n => n + 1); };
  if (cfg) return <Lesson key={run} cfg={cfg} restore={restore.current} onExit={exit} onAgain={again} />;
  return <Setup onStart={setCfg} />;
}

function Setup({ onStart }) {
  const prog = useProgress();
  const [level, setLevel] = useState(null);
  const [topic, setTopic] = useState('surpresa');
  const lvl = level || (prog.loading ? 'A1' : currentLevel(prog.done));
  const [adult, setAdult] = useState(readAdult);
  const [quota, setQuota] = useState(undefined);
  useEffect(() => { let on = true; aulaStatus().then(s => on && setQuota(s)); return () => { on = false; }; }, []);
  const blocked = !!quota && !quota.admin && quota.used >= quota.limit;
  const [ask18, setAsk18] = useState(false);
  const toggleAdult = () => { if (adult) { setAdult(false); saveAdult(false); } else setAsk18(true); };
  return (
    <Shell>
      <div className="aula-setup">
        <div className="aula-hero">
          <Juvenal mood="grumpy" size={132} />
          <div>
            <p className="q-label" style={{ margin: 0 }}>Aula falada</p>
            <h1>{TEACHER.full}</h1>
            <p className="aula-tag">{TEACHER.tag}</p>
            {canSpeak() && (
              <button type="button" className="chip aula-hear" onClick={() => speakAsync(INTRO[0], { lang: 'pt', who: TEACHER.who, voice: 'jp' })}>
                <Icon name="sound" size={15} />Ouvir o Juvenal
              </button>
            )}
            <p className="muted">
              <span className="hide-m">Dá aula de inglês desde a época da fita VHS. Reclama do calor, do vizinho que reforma a casa há três anos e do
              cafezinho que esfriou, mas não desiste de você de jeito nenhum: </span>Ele fala uma frase, você repete em voz alta e,
              se não sair, ele pede de novo (reclamando, claro).<span className="hide-m"> Depois faz perguntas para você responder do seu jeito.</span>
            </p>
          </div>
        </div>

        <div className="card aula-pick">
          <h2>Seu nível</h2>
          <div className="aula-chips" role="radiogroup" aria-label="Nível da aula">
            {AULA_LEVELS.map(l => (
              <button key={l} type="button" role="radio" aria-checked={lvl === l} className={'aula-chip' + (lvl === l ? ' on' : '')} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14, margin: '6px 0 0' }}>
            {commentInPt(lvl) ? 'No A1 e no A2, ele reclama em português e ensina em inglês.' : 'No B1 e no B2, ele reclama em inglês (com tradução, se precisar).'}
          </p>
          <h2>Assunto</h2>
          <div className="aula-chips" role="radiogroup" aria-label="Assunto da aula">
            {TOPICS.map(t => (
              <button key={t.id} type="button" role="radio" aria-checked={topic === t.id} className={'aula-chip' + (topic === t.id ? ' on' : '')} onClick={() => setTopic(t.id)}>{t.title}</button>
            ))}
          </div>
          <button type="button" className="btn btn-violet btn-lg btn-3d aula-go" disabled={blocked} onClick={() => onStart({ level: lvl, topic, adult })}>
            <Icon name="mic" size={20} color="#fff" />{blocked ? "Aula de hoje já feita" : "Começar a aula"}
          </button>
          <button type="button" className={'aula-adult' + (adult ? ' on' : '')} role="switch" aria-checked={adult} onClick={toggleAdult}>
            <span className="aula-adult-ic" aria-hidden="true">18+</span>
            <span><b>Juvenal sem filtro</b><small>{adult ? 'Ligado: ele fala palavrão à vontade.' : 'Com palavrões e humor adulto. Só para maiores de 18.'}</small></span>
            <span className={'pf-switch' + (adult ? ' on' : '')} aria-hidden="true"><span /></span>
          </button>
          {ask18 && (
            <div className="aula-18" role="alertdialog" aria-labelledby="aula-18-t">
              <b id="aula-18-t">Conteúdo para maiores de 18 anos</b>
              <p>No modo sem filtro, o Professor Juvenal fala palavrão à vontade e faz piadas de humor adulto. Ele continua sem ofender você. Ao ligar, você confirma que tem <b>18 anos ou mais</b>.</p>
              <div className="aula-18-btns">
                <button type="button" className="btn btn-violet" onClick={() => { setAdult(true); saveAdult(true); setAsk18(false); }}>Tenho 18 anos ou mais</button>
                <button type="button" className="btn btn-out" onClick={() => setAsk18(false)}>Cancelar</button>
              </div>
            </div>
          )}
          <DailyQuota st={quota} />
          {!getSR() && <p className="note" style={{ marginTop: 14 }}>Seu navegador não reconhece fala. Dá para fazer a aula escrevendo, mas o melhor é usar o Chrome ou o Edge para falar.</p>}
        </div>
      </div>
    </Shell>
  );
}

// Aula do dia: alunos fazem 1 aula por dia com o Juvenal (com a voz natural dele);
// administradores não têm limite, para testar.
function DailyQuota({ st }) {
  if (st === undefined) return null;
  if (!st) return <p className="aula-beta"><b>1 aula por dia</b> com o Juvenal, com a voz natural dele.</p>;
  if (st.admin) return <p className="aula-beta"><b>Conta de administrador:</b> aulas, voz natural e IA sem limite, para você testar à vontade.</p>;
  return st.used >= st.limit
    ? <p className="aula-beta aula-done"><b>Você já fez sua aula de hoje com o Juvenal.</b> Ele precisa de um descanso (e de um cafezinho quente). Volte amanhã!</p>
    : <p className="aula-beta"><b>1 aula por dia</b> com o Juvenal, com a voz natural dele. A de hoje está esperando você.</p>;
}

function Lesson({ cfg, restore, onExit, onAgain }) {
  const { level, topic: topicId } = cfg;
  const topic = topicById(topicId);
  const pt = commentInPt(level);
  const { user } = useAuth();
  const { listening, listen, stop } = useListen();
  const [steps, setSteps] = useState(() => restore?.steps || []);
  const [cur, setCur] = useState(() => restore?.cur || null);           // passo atual do professor
  const [resumed, setResumed] = useState(() => !!restore?.cur);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [pending, setPending] = useState(null);   // passos para tentar de novo após erro
  const [talking, setTalking] = useState(false);
  const [tries, setTries] = useState(0);
  const [result, setResult] = useState(null);     // palavras da última repetição
  const [local, setLocal] = useState(null);       // resmungo pronto (sem IA)
  const [fix, setFix] = useState(null);           // correção da última resposta
  const [lastAnswer, setLastAnswer] = useState('');
  const [input, setInput] = useState('');
  const [showPt, setShowPt] = useState(false);
  const [picked, setPicked] = useState(null);
  const [voice, setVoice] = useState(readVoice);
  const [summary, setSummary] = useState(null);
  const [sumBusy, setSumBusy] = useState(false);
  const talkId = useRef(0);
  const alive = useRef(true);
  // reclamações de "repete de novo": usa todas, em ordem embaralhada, antes de repetir alguma
  const retryBag = useRef([]);
  const nextRetry = () => {
    if (!retryBag.current.length) retryBag.current = RETRY.map((_, i) => i).sort(() => Math.random() - 0.5);
    return RETRY[retryBag.current.pop()];
  };
  const aulaId = useRef(null);
  if (!aulaId.current) { aulaId.current = restore?.aulaId || crypto.randomUUID(); newJuvenalLesson(); }
  useWakeLock(true); // a tela não apaga durante a aula
  const [voiceOff, setVoiceOff] = useState(juvenalVoiceOff);
  const started = useRef(false);
  const voiceRef = useRef(voice);
  voiceRef.current = voice;
  const asks = steps.filter(s => s.role === 'teacher').length;
  const answered = steps.some(s => s.role === 'student');

  useEffect(() => {
    alive.current = true;
    if (!started.current) {
      started.current = true;
      if (restore?.cur) { setTimeout(() => alive.current && setResumed(false), 3500); } // volta no mesmo passo, sem pedir outro à IA
      else next(restore?.steps || []);
    }
    return () => { alive.current = false; talkId.current++; try { window.speechSynthesis?.cancel(); } catch { /* sem voz */ } };
  }, []);

  useEffect(() => {
    if (summary) { clearAula(user?.id); return; }
    if (cur || steps.length) writeAula(user?.id, { cfg, aulaId: aulaId.current, steps, cur });
  }, [steps, cur, summary]); // eslint-disable-line react-hooks/exhaustive-deps

  async function say(parts) {
    const my = ++talkId.current;
    if (!voiceRef.current || !canSpeak()) return;
    setTalking(true);
    // falas criadas na hora: pede todas à voz natural de uma vez (sem pausa entre elas)
    const natural = parts.map(([text, lang, own]) => (text && !own ? fetchJuvenal(text, lang, aulaId.current, level) : null));
    for (let i = 0; i < parts.length; i++) {
      const [text, lang, own] = parts[i];
      if (my !== talkId.current || !alive.current) break;
      if (!text) continue;
      const url = natural[i] && await natural[i];
      if (my !== talkId.current || !alive.current) break;
      if (!url || !(await playUrl(url))) await speakAsync(text, { lang, who: TEACHER.who, voice: own });
    }
    setVoiceOff(juvenalVoiceOff());
    if (my === talkId.current && alive.current) setTalking(false);
  }

  async function next(ns) {
    setBusy(true); setErr(''); setPending(null);
    try {
      const r = await askAI('aula', { level, topic: topicId, steps: ns, adult: !!cfg.adult, aula: aulaId.current });
      if (!alive.current) return;
      const withT = [...ns, { role: 'teacher', task: r.task, comment: r.comment, target: r.target_en }];
      setSteps(withT);
      setCur(r); setTries(0); setResult(null); setLocal(null); setPicked(null); setShowPt(false); setInput('');
      setFix(r.correction?.has_error ? r.correction : null);
      if (r.correction?.has_error) fx.play('wrong');
      say([[r.comment, pt ? 'pt' : 'en'], [r.target_en, 'en']]);
    } catch (e) {
      if (!alive.current) return;
      setErr(e.message); setPending(ns);
    }
    setBusy(false);
  }

  function advance(studentStep) {
    const ns = [...steps, studentStep];
    setSteps(ns);
    if (cur?.finished || asks >= MAX_STEPS) finish(ns);
    else next(ns);
  }

  function heardRepeat(alts) {
    const r = alignSpeech(cur.target_en, alts);
    const t = tries + 1;
    setTries(t); setResult(r); setPicked(null);
    if (r.score >= PASS) {
      fx.play('correct'); setLocal(null);
      setTimeout(() => { if (alive.current) advance({ role: 'student', kind: 'ok', text: r.heard, tries: t }); }, 900);
      return;
    }
    fx.play('wrong');
    const missed = r.words.filter(w => !w.ok).map(w => w.w);
    if (t >= MAX_TRIES) {
      const line = pt ? GIVE_UP[0] : GIVE_UP[1];
      setLocal(line);
      say([[line, pt ? 'pt' : 'en', pt ? 'jp' : 'je']]);
      setTimeout(() => { if (alive.current) advance({ role: 'student', kind: 'hard', text: r.heard, tries: t, missed }); }, 2600);
      return;
    }
    const [lp, le] = nextRetry();
    const line = pt ? lp : le;
    setLocal(line);
    say([[line, pt ? 'pt' : 'en', pt ? 'jp' : 'je'], [cur.target_en, 'en']]);
  }

  function mic() {
    if (listening) { stop(); return; }
    setErr(''); talkId.current++;
    try { window.speechSynthesis?.cancel(); } catch { /* sem voz */ } setTalking(false);
    if (cur.task === 'repeat') listen({ onResult: heardRepeat, onError: setErr });
    else listen({ interim: setInput, onResult: (alts) => sendAnswer(alts[0]), onError: setErr });
  }

  function sendAnswer(text) {
    const t = String(text || '').trim().slice(0, MAX_CHARS);
    if (!t || busy) return;
    setLastAnswer(t);
    advance({ role: 'student', kind: 'answer', text: t });
  }

  async function finish(ns = steps) {
    if (!ns.some(s => s.role === 'student')) { onExit(); return; }
    setSumBusy(true); setErr(''); talkId.current++;
    try {
      const s = await askAI('aula', { level, topic: topicId, steps: ns, mode: 'summary', adult: !!cfg.adult, aula: aulaId.current });
      if (!alive.current) return;
      logActivity(user?.id, 'conversa');
      fx.play('complete');
      setSummary(s);
    } catch (e) { if (alive.current) setErr(e.message); }
    if (alive.current) setSumBusy(false);
  }

  function toggleVoice() {
    const on = !voice; setVoice(on); saveVoice(on);
    if (!on) { talkId.current++; try { window.speechSynthesis?.cancel(); } catch { /* sem voz */ } setTalking(false); }
  }

  if (summary) {
    return <Summary sc={{ title: `${TEACHER.full} · ${topic.title}` }} s={summary} onExit={onExit} onAgain={onAgain}
      kicker="Resumo da aula" againLabel="Outra aula" exitLabel="Trocar assunto" />;
  }

  const repeat = cur?.task === 'repeat';
  const waiting = busy || sumBusy || !cur;
  const mood = waiting ? 'thinking' : local ? 'annoyed' : result && result.score >= PASS ? 'proud' : cur.mood;
  const bubble = waiting ? null : local || (pt || !showPt ? cur.comment : cur.comment_pt);

  return (
    <div className="conv aula">
      <header className="lesson-top">
        <button type="button" className="icon-btn" aria-label="Sair da aula" onClick={onExit}><Icon name="x" size={24} stroke={2.4} /></button>
        <div style={{ minWidth: 0 }}>
          <b style={{ display: 'block' }}>Aula com o {TEACHER.full}</b>
          <span className="muted" style={{ fontSize: 13 }}>{level} · {topic.title} · {Math.min(asks, MAX_STEPS)}/{MAX_STEPS}{cfg.adult ? ' · 18+' : ''}</span>
        </div>
        <button type="button" className="chip aula-voice" onClick={toggleVoice} aria-pressed={voice}>
          <Icon name="sound" size={14} />{voice ? 'Voz' : 'Voz desligada'}
        </button>
        {answered && <button type="button" className="btn btn-out" style={{ minHeight: 40 }} onClick={() => finish()} disabled={waiting}>{sumBusy ? 'Preparando…' : 'Terminar'}</button>}
      </header>

      <main className="aula-main" aria-live="polite">
        {resumed && <p className="resume-note" role="status">↩ Continuando de onde você parou</p>}
        {voice && /^limite-(aulas|site)$/.test(voiceOff) && (
          <p className="aula-voice-note">Sua aula com a voz natural de hoje já foi usada. As falas novas seguem com a voz do aparelho.</p>
        )}
        {fix && (
          <div className="cv-fix aula-fix">
            <span className="cv-fix-t"><Icon name="sparkle" size={14} />Você disse “{fix.you_said || lastAnswer}”. Melhor:</span>
            <b lang="en">{fix.better}</b>
            {canSpeak() && <button type="button" className="icon-btn" style={{ width: 30, height: 30 }} aria-label={`Ouvir: ${fix.better}`} onClick={() => speak(fix.better)}><Icon name="sound" size={14} /></button>}
            <span className="cv-fix-why">{fix.why_pt}</span>
          </div>
        )}

        <div className="aula-prof">
          <Juvenal mood={mood} talking={talking} size={112} />
          <div className={'aula-bubble' + (waiting ? ' typing' : '')} role={waiting ? 'status' : undefined} aria-label={waiting ? `${TEACHER.name} está pensando` : undefined}>
            {waiting ? <><span /><span /><span /></> : (
              <>
                <span lang={pt || showPt || local ? 'pt-BR' : 'en'}>{bubble}</span>
                {!pt && !local && <button type="button" className="link-btn" onClick={() => setShowPt(v => !v)}>{showPt ? 'Ver em inglês' : 'Tradução'}</button>}
              </>
            )}
          </div>
        </div>

        {cur && !busy && (
          <div className={'card aula-task' + (repeat ? '' : ' ask')}>
            <span className="q-label" style={{ margin: 0 }}>{repeat ? 'Repita comigo' : 'Responda em inglês'}</span>
            {repeat && result ? <PronWords words={result.words} picked={picked} onPick={setPicked} /> : <b lang="en" className="aula-target">{cur.target_en}</b>}
            {(pt || repeat) && <span className="muted">{cur.target_pt}</span>}
            <span className="aula-acts">
              {canSpeak() && <button type="button" className="chip" onClick={() => speak(cur.target_en)}><Icon name="sound" size={14} />Ouvir</button>}
              {canSpeak() && <button type="button" className="chip" onClick={() => speak(cur.target_en, { slow: true })}><Icon name="turtle" size={14} />Devagar</button>}
              {!repeat && !pt && <button type="button" className="chip" onClick={() => setShowPt(v => !v)}>Tradução</button>}
            </span>
            {!repeat && !pt && showPt && <span className="muted">{cur.target_pt}</span>}
            {repeat && result && <span className="muted aula-heard">Ouvi: “{result.heard || '…'}”</span>}
          </div>
        )}
        {repeat && result && picked != null && <WordCoach word={result.words[picked].w} onClose={() => setPicked(null)} />}
      </main>

      <footer className="conv-bar">
        {err && (
          <div className="alert" role="alert" style={{ marginBottom: 10 }}>
            {err}
            {pending && <button type="button" className="link-btn" style={{ marginLeft: 8 }} onClick={() => next(pending)}>Tentar de novo</button>}
          </div>
        )}
        {cur && repeat && (
          <div className="aula-rep">
            {getSR() ? (
              <button type="button" className={'mic' + (listening ? ' on' : '')} onClick={mic} disabled={waiting} aria-label={listening ? 'Parar de ouvir' : 'Falar a frase'}>
                <Icon name="mic" size={34} color="#fff" stroke={2.2} />
              </button>
            ) : (
              <button type="button" className="btn btn-violet btn-lg" disabled={waiting} onClick={() => advance({ role: 'student', kind: 'ok', text: cur.target_en, tries: 1 })}>Já falei em voz alta</button>
            )}
            <span className="muted aula-hint">
              {listening ? 'Ouvindo… fale a frase' : tries ? `Tentativa ${Math.min(tries + 1, MAX_TRIES)} de ${MAX_TRIES}` : 'Toque no microfone e repita a frase'}
            </span>
            <button type="button" className="link-btn" disabled={waiting} onClick={() => advance({ role: 'student', kind: 'skip', text: '', tries: Math.max(1, tries) })}>Pular</button>
          </div>
        )}
        {cur && !repeat && (
          <>
            <form className="conv-in" onSubmit={(e) => { e.preventDefault(); sendAnswer(input); }}>
              {getSR() && (
                <button type="button" className={'mic sm' + (listening ? ' on' : '')} onClick={mic} disabled={waiting} aria-label={listening ? 'Parar de ouvir' : 'Falar'}>
                  <Icon name="mic" size={24} color="#fff" stroke={2.2} />
                </button>
              )}
              <input value={input} onChange={e => setInput(e.target.value)} maxLength={MAX_CHARS} disabled={waiting} lang="en"
                placeholder={listening ? 'Ouvindo… fale em inglês' : getSR() ? 'Fale no microfone ou escreva em inglês' : 'Escreva em inglês'} aria-label="Sua resposta em inglês" autoComplete="off" />
              <button type="submit" className="btn btn-violet" disabled={!input.trim() || waiting} aria-label="Enviar"><Icon name="arrow" size={20} color="#fff" /></button>
            </form>
            <p className="muted conv-hint">Travou? Escreva em português que ele ajuda (reclamando).</p>
          </>
        )}
      </footer>
    </div>
  );
}
