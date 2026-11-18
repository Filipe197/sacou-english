// Ranking semanal: liga (grupos de até 30 pessoas, sobe e desce no domingo) e
// ranking da turma. Os dados vêm de supabase/011_ranking.sql.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shell, Spinner, Icon } from '../components/ui.jsx';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';

export const TIERS = [
  { name: 'Bronze', icon: '🥉', color: '#B87333' },
  { name: 'Prata', icon: '🥈', color: '#8C96A8' },
  { name: 'Ouro', icon: '🥇', color: '#D9A400' },
  { name: 'Platina', icon: '💠', color: '#2BA3B8' },
  { name: 'Diamante', icon: '💎', color: '#5B3DF5' },
];
const missing = (e) => /league_board|class_board|set_ranking|schema cache|does not exist/i.test(e?.message || '');

function daysLeft(end) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  const n = Math.round((Date.parse(end) - Date.parse(today)) / 864e5);
  return n <= 0 ? 'Termina hoje, à meia-noite' : n === 1 ? 'Termina amanhã' : `Termina em ${n} dias`;
}

export default function Ranking() {
  const { user } = useAuth();
  const prog = useProgress();
  const [tab, setTab] = useState('liga');
  const [board, setBoard] = useState(null);
  const [err, setErr] = useState('');
  const [classes, setClasses] = useState([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    setErr('');
    const { data, error } = await supabase.rpc('league_board');
    if (error) { setErr(missing(error) ? 'O ranking ainda não foi ativado no servidor.' : 'Não conseguimos carregar o ranking. Verifique a conexão.'); setBoard({}); return; }
    setBoard(data || {});
  }
  useEffect(() => {
    if (!user) return;
    load();
    Promise.all([
      supabase.from('classes').select('id,name').eq('owner', user.id),
      supabase.from('class_members').select('class_id,classes(name)').eq('user_id', user.id),
    ]).then(([a, b]) => setClasses([...(a.data || []).map(c => ({ id: c.id, name: c.name })), ...(b.data || []).map(c => ({ id: c.class_id, name: c.classes?.name || 'Turma' }))]), () => {});
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function setRanking(on) {
    setBusy(true);
    const { error } = await supabase.rpc('set_ranking', { p_on: on });
    if (error) setErr('Não conseguimos mudar agora. Tente de novo.'); else await load();
    setBusy(false);
  }

  if (!board) return <Spinner />;
  const tier = TIERS[board.tier || 0];
  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div className="rk">
        <h1>Ranking</h1>
        <div className="nb-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'liga'} className={tab === 'liga' ? 'on' : ''} onClick={() => setTab('liga')}><Icon name="trophy" size={18} />Minha liga</button>
          <button type="button" role="tab" aria-selected={tab === 'turma'} className={tab === 'turma' ? 'on' : ''} onClick={() => setTab('turma')}><Icon name="users" size={18} />Turma</button>
        </div>
        {err && <div className="alert" role="alert">{err}</div>}

        {tab === 'liga' && !err && (board.opt_out ? (
          <div className="card rk-empty">
            <b>Você não está participando do ranking</b>
            <p className="muted">Ninguém vê seu nome nem seu XP. Se quiser competir com outros alunos, é só entrar.</p>
            <button type="button" className="btn btn-violet btn-3d" disabled={busy} onClick={() => setRanking(true)}>Participar do ranking</button>
          </div>
        ) : <>
          <div className="rk-head" style={{ '--tier': tier.color }}>
            <span className="rk-tier-ic" aria-hidden="true">{tier.icon}</span>
            <div>
              <b>Liga {tier.name}</b>
              <span>{daysLeft(board.week_end)}{board.joined ? ' · os 7 primeiros sobem de liga' : ''}</span>
            </div>
          </div>
          <div className="rk-ladder" aria-hidden="true">{TIERS.map((t, i) => <span key={t.name} className={i === (board.tier || 0) ? 'on' : i < (board.tier || 0) ? 'past' : ''} title={t.name}>{t.icon}</span>)}</div>

          {!board.joined ? (
            <div className="card rk-empty">
              <b>Faça uma lição para entrar na liga desta semana</b>
              <p className="muted">Assim que você ganhar XP, entra num grupo de até 30 alunos da sua liga. No domingo, quem estiver entre os 7 primeiros sobe.</p>
              <Link className="btn btn-violet btn-3d" to="/aprender">Ir para a trilha</Link>
            </div>
          ) : <Board rows={board.rows} promote={board.promote} demote={board.rows.length >= 10 ? board.demote : 0} />}
        </>)}

        {tab === 'turma' && <ClassTab classes={classes} />}

        {!board.opt_out && !err && (
          <p className="rk-foot muted">
            No ranking aparecem só o seu primeiro nome e a inicial do sobrenome.{' '}
            <button type="button" className="link-btn" disabled={busy} onClick={() => setRanking(false)}>Não quero participar</button>
          </p>
        )}
      </div>
    </Shell>
  );
}

function Board({ rows, promote = 0, demote = 0 }) {
  return (
    <ol className="rk-list">
      {rows.map((r, i) => {
        const pos = i + 1;
        const zone = r.xp > 0 && pos <= promote ? 'up' : demote && pos > rows.length - demote ? 'down' : '';
        return (
          <li key={i} className={'rk-row' + (r.me ? ' me' : '') + (zone ? ' ' + zone : '')}>
            <span className="rk-pos">{pos <= 3 && r.xp > 0 ? ['🥇', '🥈', '🥉'][pos - 1] : pos}</span>
            <span className="rk-name">{r.name}{r.me && <small> (você)</small>}</span>
            <span className="rk-xp">{r.xp.toLocaleString('pt-BR')} XP</span>
          </li>
        );
      }).flatMap((li, i) => {
        // linhas que separam as zonas de subida e de queda
        const out = [li];
        if (promote && i === promote - 1 && i < rows.length - 1) out.push(<li key={'z-up'} className="rk-zone up" aria-hidden="true">▲ Acima desta linha, sobe de liga</li>);
        if (demote && i === rows.length - demote - 1) out.push(<li key={'z-down'} className="rk-zone down" aria-hidden="true">▼ Abaixo desta linha, desce de liga</li>);
        return out;
      })}
    </ol>
  );
}

function ClassTab({ classes }) {
  const [cls, setCls] = useState(classes[0]?.id || null);
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { if (!cls && classes[0]) setCls(classes[0].id); }, [classes, cls]);
  useEffect(() => {
    if (!cls) return;
    setRows(null); setErr('');
    supabase.rpc('class_board', { p_class: cls }).then(({ data, error }) => {
      if (error) setErr(missing(error) ? 'O ranking ainda não foi ativado no servidor.' : 'Não conseguimos carregar a turma.');
      else setRows(data || []);
    });
  }, [cls]);
  if (!classes.length) return (
    <div className="card rk-empty">
      <b>Você ainda não está numa turma</b>
      <p className="muted">Entre com o código do seu professor ou crie uma turma com amigos para disputar o XP da semana.</p>
      <Link className="btn btn-violet btn-3d" to="/turmas">Ir para Turmas</Link>
    </div>
  );
  return (
    <>
      {classes.length > 1 && (
        <select className="rk-select" value={cls || ''} onChange={e => setCls(e.target.value)} aria-label="Escolher turma">
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      )}
      {err && <div className="alert" role="alert">{err}</div>}
      {!err && (rows === null ? <Spinner /> : rows.length ? <Board rows={rows} /> : <p className="muted">Ninguém da turma participa do ranking ainda.</p>)}
      <p className="muted rk-note">XP desta semana (de segunda a domingo).</p>
    </>
  );
}
