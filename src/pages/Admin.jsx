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
          <p className="muted" style={{ margin: 0 }}>Uso do site e erros de conteúdo reportados pelos alunos.</p>
        </div>
        {err && <div className="alert" role="alert">{err}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
          {cards.map(([t, v, d]) => (
            <div key={t} className="card"><span className="muted" style={{ fontSize: 13 }}>{t}</span><b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 32, margin: '4px 0' }}>{v}</b><span className="muted" style={{ fontSize: 13 }}>{d}</span></div>
          ))}
        </div>

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
