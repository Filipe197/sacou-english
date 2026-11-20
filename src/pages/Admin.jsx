import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { getItem, getLesson } from '../lib/content.js';
import { Shell, Spinner } from '../components/ui.jsx';

// Mostra um exercício de forma legível (para revisar um report ou um item difícil)
function ItemPreview({ id }) {
  const f = getItem(id);
  if (!f) return <span className="muted">Exercício {id} (não encontrado no conteúdo atual)</span>;
  const { item, lesson } = f;
  const main = item.en || item.pt || item.q || item.lines?.map(l => l[1]).join(' / ') || item.pairs?.map(p => p.join(' = ')).join(' · ') || (item.type === 'story' ? lesson.story?.title : '');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--violet)', textTransform: 'uppercase', letterSpacing: .5 }}>
        {lesson.unit.level} · Unidade {lesson.unit.order} · {lesson.title} · {item.type}
      </span>
      <b lang="en">{main}</b>
      {item.answer && <span className="muted" style={{ fontSize: 14 }}>Resposta: {item.answer}{item.accept?.length ? ` (aceita também: ${item.accept.join(' | ')})` : ''}</span>}
      <Link to={`/licao/${lesson.id}`} style={{ fontSize: 13 }}>Abrir a lição</Link>
    </div>
  );
}

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '—';
const fmtDay = (d) => d ? `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(2, 4)}` : 'nunca';
const PAGE = 50;

// Quem se cadastrou: nome, e-mail, quando entrou e quanto já estudou
function Students() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const fetchPage = useCallback(async (search, offset) => {
    const { data, error } = await supabase.rpc('admin_users', { p_search: search, p_limit: PAGE, p_offset: offset });
    if (error) {
      setErr(/admin_users|schema cache|does not exist/i.test(error.message) ? 'Falta rodar o arquivo supabase/006_admin_alunos.sql no Supabase para ver a lista.' : 'Não consegui carregar a lista agora.');
      return null;
    }
    setErr('');
    return data;
  }, []);

  useEffect(() => {
    let live = true;
    setLoading(true);
    const t = setTimeout(async () => {
      const d = await fetchPage(q, 0);
      if (!live) return;
      setRows(d?.rows || []); setTotal(d?.total || 0); setLoading(false);
    }, q ? 300 : 0);
    return () => { live = false; clearTimeout(t); };
  }, [q, fetchPage]);

  async function more() {
    setLoading(true);
    const d = await fetchPage(q, rows.length);
    if (d) setRows(r => [...r, ...d.rows]);
    setLoading(false);
  }

  function csv() {
    const head = ['Nome', 'E-mail', 'Cadastro', 'Último estudo', 'Lições', 'XP', 'Sequência', 'Nível inicial'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines = rows.map(r => [r.name, r.email, fmtDate(r.created_at), fmtDay(r.last_active), r.lessons_done, r.xp_total, r.streak, r.start_level].map(esc).join(';'));
    const blob = new Blob(['﻿' + [head.map(esc).join(';'), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'alunos-sacou-english.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, margin: 0 }}>Quem se cadastrou</h2>
          <p className="muted" style={{ fontSize: 14, margin: '4px 0 0' }}>{total} {total === 1 ? 'aluno' : 'alunos'}{q ? (total === 1 ? ' encontrado' : ' encontrados') : ''}, do mais recente para o mais antigo.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: '1 1 260px', justifyContent: 'flex-end' }}>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nome ou e-mail" aria-label="Buscar aluno por nome ou e-mail"
            style={{ flex: '1 1 200px', maxWidth: 320, minHeight: 40, padding: '0 14px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--card, #fff)', color: 'inherit', font: 'inherit' }} />
          {rows.length > 0 && <button className="btn btn-out" style={{ minHeight: 40, padding: '0 14px', fontSize: 14 }} onClick={csv}>Baixar planilha</button>}
        </div>
      </div>
      {err ? <div className="alert" role="alert">{err}</div> : rows.length === 0 && !loading ? <p className="muted">{q ? 'Ninguém encontrado com essa busca.' : 'Ainda ninguém se cadastrou.'}</p> : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map(r => (
            <div key={r.id} style={{ borderTop: '1px solid var(--line)', padding: '12px 0', display: 'flex', gap: '6px 16px', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <b style={{ display: 'block' }}>{r.name || <span className="muted" style={{ fontWeight: 500 }}>Sem nome</span>}</b>
                <span className="muted" style={{ fontSize: 13, overflowWrap: 'anywhere' }}>{r.email || '—'}{r.provider && r.provider !== 'email' ? ` · entrou com ${r.provider[0].toUpperCase() + r.provider.slice(1)}` : ''}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px 14px', flexWrap: 'wrap', fontSize: 13, color: 'var(--text2, inherit)' }}>
                <span><span className="muted">Cadastro</span> <b>{fmtDate(r.created_at)}</b></span>
                <span><span className="muted">Último estudo</span> <b>{fmtDay(r.last_active)}</b>{r.streak > 1 ? ` 🔥${r.streak}` : ''}</span>
                <span><b>{r.lessons_done}</b> <span className="muted">{r.lessons_done === 1 ? 'lição' : 'lições'}</span></span>
                <span><b>{r.xp_total}</b> <span className="muted">XP</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
      {!err && rows.length < total && (
        <button className="btn btn-out" style={{ marginTop: 12, minHeight: 40, fontSize: 14 }} onClick={more} disabled={loading}>{loading ? 'Carregando…' : `Mostrar mais (${total - rows.length})`}</button>
      )}
    </div>
  );
}

const KIND = { js: 'Erro de código', promise: 'Erro de código', react: 'Tela quebrou', api: 'Servidor / IA' };
const ago = (d) => { const m = Math.round((Date.now() - new Date(d)) / 60000); return m < 60 ? `há ${m} min` : m < 1440 ? `há ${Math.round(m / 60)} h` : `há ${Math.round(m / 1440)} d`; };

// Erros que aconteceram no aparelho dos alunos (aviso automático, 008_erros.sql)
// Funil dos testadores (supabase/017_metricas.sql): quem entra, começa, termina, volta e onde desiste
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
function Funnel() {
  const [days, setDays] = useState(30);
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    let live = true;
    setD(null);
    supabase.rpc('admin_funnel', { p_days: days }).then(({ data, error }) => {
      if (!live) return;
      if (error) { setErr(/admin_funnel|lesson_runs|schema cache|does not exist/i.test(error.message || '') ? 'Falta rodar o arquivo supabase/017_metricas.sql no Supabase para ligar as métricas.' : 'Não consegui carregar as métricas agora.'); return; }
      setErr(''); setD(data);
    });
    return () => { live = false; };
  }, [days]);
  const steps = d ? [
    ['Criaram a conta', d.signed_up],
    ['Começaram uma lição', d.started],
    ['Terminaram 1 lição', d.finished_1],
    ['Terminaram 3 lições', d.finished_3],
  ] : [];
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
        <h2 style={{ fontSize: 20, margin: 0 }}>Funil dos testadores</h2>
        <div style={{ display: 'flex', gap: 6 }} role="group" aria-label="Período">
          {[7, 30, 90].map(n => (
            <button key={n} className={'btn ' + (days === n ? 'btn-violet' : 'btn-out')} style={{ minHeight: 36, padding: '0 12px', fontSize: 14 }} onClick={() => setDays(n)}>{n} dias</button>
          ))}
        </div>
      </div>
      <p className="muted" style={{ fontSize: 14, margin: '0 0 12px' }}>Quem se cadastrou nos últimos {days} dias: até onde chegou e se voltou.</p>
      {err ? <p className="alert" role="alert">{err}</p> : !d ? <Spinner /> : <>
        {steps.map(([t, v]) => (
          <div key={t} className="funnel-row">
            <span>{t}</span>
            <div className="funnel-track"><div className="funnel-bar" style={{ width: `${pct(v, d.signed_up)}%` }} /></div>
            <b>{v} <span className="muted" style={{ fontWeight: 400, fontSize: 13 }}>{pct(v, d.signed_up)}%</span></b>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginTop: 16 }}>
          {[
            ['Voltaram no dia seguinte', `${pct(d.d1_back, d.d1_base)}%`, `${d.d1_back} de ${d.d1_base} que já tiveram a chance`],
            ['Voltaram em até 7 dias', `${pct(d.d7_back, d.d7_base)}%`, `${d.d7_back} de ${d.d7_base} com 7 dias de conta`],
            ['Lições abertas', d.runs, `${d.runs_done} terminadas · ${d.runs_quit} abandonadas`],
          ].map(([t, v, s]) => (
            <div key={t} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 14 }}>
              <span className="muted" style={{ fontSize: 13 }}>{t}</span>
              <b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 28, margin: '2px 0' }}>{v}</b>
              <span className="muted" style={{ fontSize: 12 }}>{s}</span>
            </div>
          ))}
        </div>
        <p className="muted" style={{ fontSize: 12, margin: '10px 0 0' }}>Abandonada = aberta e sem terminar há mais de 1 hora. As lições abertas só são contadas a partir da instalação das métricas.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 18 }}>
          <div>
            <h3 style={{ fontSize: 17, margin: '0 0 6px' }}>Lições com mais abandono</h3>
            {d.lessons.length === 0 ? <p className="muted">Ainda sem dados.</p> : d.lessons.map(l => {
              const les = getLesson(l.lesson_id);
              return (
                <div key={l.lesson_id} style={{ borderTop: '1px solid var(--line)', padding: '8px 0', display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14 }}>
                  <span>{les ? `${les.unit.level} · U${les.unit.order} · ${les.title}` : l.lesson_id}</span>
                  <span style={{ whiteSpace: 'nowrap' }}><b>{l.quits}</b> de {l.starts} saíram{l.quits ? ` (em ${l.quit_at_pct ?? 0}% da lição)` : ''}</span>
                </div>
              );
            })}
          </div>
          <div>
            <h3 style={{ fontSize: 17, margin: '0 0 6px' }}>Exercícios em que desistem</h3>
            <p className="muted" style={{ fontSize: 13, margin: '0 0 6px' }}>O exercício que estava na tela quando a pessoa saiu.</p>
            {d.quit_items.length === 0 ? <p className="muted">Ainda sem dados.</p> : d.quit_items.map(q => (
              <div key={q.item_id} style={{ borderTop: '1px solid var(--line)', padding: '10px 0', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <ItemPreview id={q.item_id} />
                <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}><b>{q.quits}</b> saídas · {q.students} alunos</span>
              </div>
            ))}
          </div>
        </div>
      </>}
    </div>
  );
}

function SiteErrors() {
  const [groups, setGroups] = useState(null);
  const [err, setErr] = useState('');
  const load = useCallback(async () => {
    const { data, error } = await supabase.from('app_errors').select('id,kind,message,detail,page,ua,created_at,user_id').order('created_at', { ascending: false }).limit(400);
    if (error) { setErr(/app_errors|schema cache|does not exist/i.test(error.message) ? 'Falta rodar o arquivo supabase/008_erros.sql no Supabase para ligar o aviso de erros.' : 'Não consegui carregar os erros agora.'); setGroups([]); return; }
    const map = new Map();
    for (const r of data) {
      const k = r.kind + '|' + r.message;
      const g = map.get(k) || { key: k, kind: r.kind, message: r.message, count: 0, users: new Set(), last: r, pages: new Set() };
      g.count++; if (r.user_id) g.users.add(r.user_id); if (r.page) g.pages.add(r.page.split('?')[0]);
      map.set(k, g);
    }
    setErr(''); setGroups([...map.values()]);
  }, []);
  useEffect(() => { load(); }, [load]);
  async function resolve(g) {
    await supabase.from('app_errors').delete().eq('kind', g.kind).eq('message', g.message);
    load();
  }
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, margin: 0 }}>Erros do site</h2>
          <p className="muted" style={{ fontSize: 14, margin: '4px 0 0' }}>Registrados automaticamente quando algo quebra no aparelho de um aluno. Marque como resolvido depois de corrigir.</p>
        </div>
        <button className="btn btn-out" style={{ minHeight: 36, padding: '0 12px', fontSize: 14 }} onClick={load}>Atualizar</button>
      </div>
      {err ? <div className="alert" role="alert">{err}</div> : groups == null ? <p className="muted">Carregando…</p> : groups.length === 0 ? <p className="muted">Nenhum erro registrado. 🎉</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {groups.map(g => (
            <div key={g.key} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 14, display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: g.kind === 'api' ? 'var(--bad)' : 'var(--violet)', textTransform: 'uppercase', letterSpacing: .5 }}>{KIND[g.kind] || g.kind}</span>
                <b style={{ overflowWrap: 'anywhere' }}>{g.message}</b>
                <span className="muted" style={{ fontSize: 13 }}>{g.count}× · {g.users.size} {g.users.size === 1 ? 'aluno' : 'alunos'} · último {ago(g.last.created_at)} · {[...g.pages].slice(0, 3).join(', ')}</span>
                {g.last.detail && <details style={{ fontSize: 12 }}><summary className="muted" style={{ cursor: 'pointer' }}>Detalhes técnicos</summary><pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', margin: '6px 0 0', maxHeight: 200, overflow: 'auto' }}>{g.last.detail}{'\n\n'}{g.last.ua}</pre></details>}
              </div>
              <button className="btn btn-out" style={{ minHeight: 40, fontSize: 14, alignSelf: 'flex-start' }} onClick={() => resolve(g)}>Marcar resolvido</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('aberto');
  const [err, setErr] = useState('');
  const [checked, setChecked] = useState(false);

  const load = useCallback(async () => {
    const [s, r] = await Promise.all([
      supabase.rpc('admin_stats'),
      supabase.from('content_reports').select('id,item_id,message,status,created_at').eq('status', filter).order('created_at', { ascending: false }).limit(100),
    ]);
    setChecked(true);
    if (s.error) { setErr('Sem acesso aos dados de administração. Confira se o arquivo 002_admin.sql foi rodado e se sua conta está na tabela admins.'); return; }
    setErr(''); setStats(s.data); setReports(r.data || []);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id, status) {
    await supabase.from('content_reports').update({ status }).eq('id', id);
    load();
  }

  if (!checked) return <Spinner />;
  if (!isAdmin && err) {
    return <Shell><div style={{ maxWidth: 640, margin: '0 auto' }}><h1>Acesso restrito</h1><p className="muted">{err}</p></div></Shell>;
  }

  const maxUsers = Math.max(1, ...(stats?.daily || []).map(d => d.users));
  const cards = stats ? [
    ['Alunos cadastrados', stats.users, `+${stats.new_users_7d} nos últimos 7 dias`],
    ['Ativos hoje', stats.active_today, 'fizeram pelo menos 1 lição'],
    ['Ativos em 7 dias', stats.active_7d, 'alunos diferentes'],
    ['Lições concluídas', stats.lessons_done, 'no total'],
    ['Reports abertos', stats.open_reports, 'esperando revisão'],
  ] : [];

  return (
    <Shell>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 34, margin: '0 0 6px' }}>Administração</h1>
          <p className="muted" style={{ margin: 0 }}>Uso do site, quem se cadastrou e erros de conteúdo reportados pelos alunos.</p>
        </div>
        {err && <div className="alert" role="alert">{err}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
          {cards.map(([t, v, d]) => (
            <div key={t} className="card"><span className="muted" style={{ fontSize: 13 }}>{t}</span><b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 32, margin: '4px 0' }}>{v}</b><span className="muted" style={{ fontSize: 13 }}>{d}</span></div>
          ))}
        </div>

        {!err && <Funnel />}
        {!err && <SiteErrors />}
        {!err && <Students />}

        {stats && (
          <div className="card">
            <h2 style={{ fontSize: 20, margin: '0 0 16px' }}>Alunos ativos por dia (14 dias)</h2>
            {stats.daily.length === 0 ? <p className="muted">Ainda sem atividade.</p> : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 140 }} role="img" aria-label={stats.daily.map(d => `${d.day}: ${d.users} alunos`).join(', ')}>
                {stats.daily.map(d => (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{d.users}</span>
                    <div style={{ width: '100%', maxWidth: 32, height: `${(d.users / maxUsers) * 80}%`, minHeight: 4, background: 'var(--violet)', borderRadius: '6px 6px 2px 2px' }} />
                    <span style={{ fontSize: 10, color: 'var(--text3)' }}>{d.day.slice(8)}/{d.day.slice(5, 7)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <h2 style={{ fontSize: 20, margin: 0 }}>Erros reportados pelos alunos</h2>
            <div style={{ display: 'flex', gap: 6 }} role="group" aria-label="Filtrar reports">
              {['aberto', 'corrigido', 'ignorado'].map(s => (
                <button key={s} className={'btn ' + (filter === s ? 'btn-violet' : 'btn-out')} style={{ minHeight: 36, padding: '0 12px', fontSize: 14 }} onClick={() => setFilter(s)}>{s[0].toUpperCase() + s.slice(1)}s</button>
              ))}
            </div>
          </div>
          {reports.length === 0 ? <p className="muted">Nenhum report {filter}.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {reports.map(r => (
                <div key={r.id} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 14, display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <ItemPreview id={r.item_id} />
                    <div className="note" style={{ fontSize: 14 }}>“{r.message}”<br /><span className="muted" style={{ fontSize: 12 }}>{new Date(r.created_at).toLocaleString('pt-BR')}</span></div>
                  </div>
                  {filter === 'aberto' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button className="btn btn-violet" style={{ minHeight: 40, fontSize: 14 }} onClick={() => setStatus(r.id, 'corrigido')}>Marcar corrigido</button>
                      <button className="btn btn-out" style={{ minHeight: 40, fontSize: 14 }} onClick={() => setStatus(r.id, 'ignorado')}>Ignorar</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            <div className="card">
              <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Exercícios em que mais erram</h2>
              <p className="muted" style={{ fontSize: 14, margin: '0 0 12px' }}>Bons candidatos para revisar a explicação ou o enunciado.</p>
              {stats.hard_items.length === 0 ? <p className="muted">Ainda sem dados.</p> : stats.hard_items.map(h => (
                <div key={h.item_id} style={{ borderTop: '1px solid var(--line)', padding: '10px 0', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <ItemPreview id={h.item_id} />
                  <span style={{ whiteSpace: 'nowrap', fontSize: 14 }}><b>{h.mistakes}</b> erros · {h.students} alunos</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>Lições mais feitas</h2>
              {stats.top_lessons.length === 0 ? <p className="muted">Ainda sem dados.</p> : stats.top_lessons.map(t => {
                const l = getLesson(t.lesson_id);
                return (
                  <div key={t.lesson_id} style={{ borderTop: '1px solid var(--line)', padding: '10px 0', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span>{l ? `${l.unit.level} · U${l.unit.order} · ${l.title}` : t.lesson_id}</span><b>{t.students}</b>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
