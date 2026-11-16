// Modo turma: o professor cria uma turma, convida os alunos com um código e
// acompanha o progresso de cada um. O aluno entra pelo link ou pelo código.
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { useProgress, todayBR } from '../lib/progress.js';
import { Shell, Spinner, Icon } from '../components/ui.jsx';

const missingMsg = 'O modo turma ainda não foi ativado no banco (falta rodar supabase/005_turmas_missoes.sql).';
const errPt = (e) => /schema cache|does not exist|create_class|join_class/i.test(e?.message || '') ? missingMsg
  : /não encontrada/i.test(e?.message || '') ? 'Turma não encontrada. Confira o código.'
  : /cheia/i.test(e?.message || '') ? 'Essa turma está cheia.'
  : /limite/i.test(e?.message || '') ? 'Você chegou ao limite de 20 turmas.'
  : 'Não deu certo agora. Tente de novo.';
const inviteLink = (code) => `${location.origin}/turmas/entrar/${code}`;

function ago(day) {
  if (!day) return 'nunca';
  const d = Math.round((new Date(todayBR() + 'T12:00:00') - new Date(day + 'T12:00:00')) / 864e5);
  return d <= 0 ? 'hoje' : d === 1 ? 'ontem' : `há ${d} dias`;
}

export default function Classes() {
  const { user } = useAuth();
  const prog = useProgress();
  const { code: linkCode } = useParams();
  const nav = useNavigate();
  const [mine, setMine] = useState(null); // turmas que eu dou
  const [joined, setJoined] = useState([]); // turmas em que sou aluno
  const [err, setErr] = useState('');
  const [code, setCode] = useState(linkCode || '');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(null);
  const [toast, setToast] = useState('');

  async function load() {
    const [a, b] = await Promise.all([
      supabase.from('classes').select('id,name,code,created_at').eq('owner', user.id).order('created_at'),
      supabase.from('class_members').select('class_id,joined_at,classes(name)').eq('user_id', user.id),
    ]);
    if (a.error) { setErr(errPt(a.error)); setMine([]); return; }
    setMine(a.data); setJoined(b.data || []);
  }
  useEffect(() => { if (user) load(); }, [user?.id]);

  async function join(e) {
    e?.preventDefault(); if (code.trim().length < 4) return;
    setBusy(true); setErr('');
    const { data, error } = await supabase.rpc('join_class', { p_code: code.trim() });
    setBusy(false);
    if (error) { setErr(errPt(error)); return; }
    setToast(data.owner === user.id ? 'Essa turma é sua.' : `Você entrou na turma “${data.name}”!`);
    setCode(''); if (linkCode) nav('/turmas', { replace: true });
    load();
  }
  async function create(e) {
    e.preventDefault(); if (name.trim().length < 2) return;
    setBusy(true); setErr('');
    const { data, error } = await supabase.rpc('create_class', { p_name: name.trim() });
    setBusy(false);
    if (error) { setErr(errPt(error)); return; }
    setName(''); await load(); setOpen(data.id);
  }
  async function leave(id) {
    if (!confirm('Sair desta turma? O professor deixa de ver seu progresso.')) return;
    await supabase.from('class_members').delete().eq('class_id', id).eq('user_id', user.id);
    load();
  }
  async function remove(id) {
    if (!confirm('Apagar esta turma? Os alunos saem dela automaticamente. Isso não pode ser desfeito.')) return;
    await supabase.from('classes').delete().eq('id', id);
    setOpen(null); load();
  }
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); setToast(msg); } catch { setToast(text); }
    setTimeout(() => setToast(''), 2500);
  }

  if (prog.loading || mine === null) return <Spinner />;
  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Turmas</h1>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>Professores criam uma turma e acompanham o progresso dos alunos. Alunos entram pelo link ou pelo código que o professor enviar.</p>
        </div>
        {err && <div className="alert" role="alert">{err}</div>}
        {toast && <div className="note" role="status">{toast}</div>}

        <div className="two">
          <form className="card" onSubmit={join}>
            <h2 className="cl-h"><Icon name="user" size={20} />Entrar numa turma</h2>
            <p className="muted" style={{ margin: '0 0 12px', fontSize: 14 }}>Ao entrar, o professor passa a ver seu nome, XP, sequência, lições concluídas e quantos erros você tem para revisar. Você pode sair quando quiser.</p>
            <div className="cl-row">
              <input className="cl-in code" value={code} onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))} placeholder="CÓDIGO" aria-label="Código da turma" autoCapitalize="characters" />
              <button className="btn btn-violet" disabled={busy || code.length < 4}>Entrar</button>
            </div>
            {joined.length > 0 && (
              <div className="cl-list">
                {joined.map(j => (
                  <div key={j.class_id} className="cl-item">
                    <span><b>{j.classes?.name || 'Turma'}</b><br /><span className="muted" style={{ fontSize: 13 }}>Desde {new Date(j.joined_at).toLocaleDateString('pt-BR')}</span></span>
                    <button type="button" className="link-btn" onClick={() => leave(j.class_id)}>Sair</button>
                  </div>
                ))}
              </div>
            )}
          </form>

          <form className="card" onSubmit={create}>
            <h2 className="cl-h"><Icon name="users" size={20} />Sou professor</h2>
            <p className="muted" style={{ margin: '0 0 12px', fontSize: 14 }}>Crie uma turma e mande o link para os alunos. Você acompanha quem está estudando, quem parou e quem precisa de ajuda.</p>
            <div className="cl-row">
              <input className="cl-in" value={name} onChange={e => setName(e.target.value.slice(0, 60))} placeholder="Nome da turma (ex.: Inglês 3º ano)" aria-label="Nome da turma" />
              <button className="btn btn-violet" disabled={busy || name.trim().length < 2}>Criar</button>
            </div>
          </form>
        </div>

        {mine.map(c => <ClassCard key={c.id} c={c} open={open === c.id} onToggle={() => setOpen(open === c.id ? null : c.id)} onCopy={copy} onRemove={() => remove(c.id)} />)}
      </div>
    </Shell>
  );
}

function ClassCard({ c, open, onToggle, onCopy, onRemove }) {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    if (!open) return;
    supabase.rpc('class_report', { p_class: c.id }).then(({ data, error }) => { if (error) setErr(errPt(error)); else setRows(data || []); });
  }, [open, c.id]);
  const active = rows?.filter(r => r.week_xp > 0).length ?? 0;
  return (
    <div className="card">
      <div className="cl-top">
        <button type="button" className="cl-title" onClick={onToggle} aria-expanded={open}>
          <b>{c.name}</b><span className="muted">Código <span className="cl-code">{c.code}</span></span>
        </button>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-out" onClick={() => onCopy(inviteLink(c.code), 'Link de convite copiado! Mande para os alunos.')}><Icon name="share" size={16} />Copiar convite</button>
          <button type="button" className="btn btn-out" onClick={onToggle}>{open ? 'Fechar' : 'Ver alunos'}</button>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 16 }}>
          {err && <div className="alert">{err}</div>}
          {!rows && !err && <p className="muted">Carregando…</p>}
          {rows && !rows.length && <p className="muted">Nenhum aluno ainda. Mande o link <b>{inviteLink(c.code)}</b> ou o código <b>{c.code}</b>.</p>}
          {rows && rows.length > 0 && (
            <>
              <p className="muted" style={{ margin: '0 0 10px', fontSize: 14 }}>{rows.length} {rows.length === 1 ? 'aluno' : 'alunos'} · {active} {active === 1 ? 'estudou' : 'estudaram'} nos últimos 7 dias</p>
              <div className="cl-table-wrap">
                <table className="cl-table">
                  <thead><tr><th>Aluno</th><th>XP 7 dias</th><th>Sequência</th><th>Lições</th><th>Erros abertos</th><th>Último estudo</th></tr></thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.user_id} className={r.week_xp === 0 ? 'idle' : ''}>
                        <td><b>{r.name || 'Aluno'}</b></td><td>{r.week_xp}</td><td>{r.streak} 🔥</td><td>{r.lessons_done}</td>
                        <td className={r.mistakes_open >= 10 ? 'warn' : ''}>{r.mistakes_open}</td><td>{ago(r.last_active)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <button type="button" className="link-btn" style={{ color: 'var(--bad)', marginTop: 10 }} onClick={onRemove}><Icon name="trash" size={14} /> Apagar turma</button>
        </div>
      )}
    </div>
  );
}
