import { Link } from 'react-router-dom';
import { UNITS, LESSONS, LEVELS, LEVEL_ORDER, LEVEL_NAMES, levelPercent, currentLevel, unitComplete } from '../lib/content.js';
import { useProgress, lastSevenDays, liveStreak } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { useInstall } from '../lib/install.js';
import { useNavigate } from 'react-router-dom';
import { Shell, Spinner, Icon, Fire, Bolt } from '../components/ui.jsx';
import { Missions } from '../components/Missions.jsx';
import { ShareButton, progressCard } from '../components/ShareCard.jsx';
import Reminder from '../components/Reminder.jsx';
import { Achievements } from '../components/Achievements.jsx';
import MonthRecap from '../components/MonthRecap.jsx';
import { SkillPortrait, CanDoList } from '../components/CanDo.jsx';

export default function Progress() {
  const prog = useProgress();
  const { profile, user, updateProfile, signOut } = useAuth();
  const inst = useInstall();
  const nav = useNavigate();
  if (prog.loading) return <Spinner />;

  const days = lastSevenDays(prog.week);
  const goal = profile?.daily_goal_xp || 30;
  const max = Math.max(goal, ...days.map(d => d.xp), 1);
  const hit = days.filter(d => d.xp >= goal).length;
  const lessonsDone = LESSONS.filter(l => prog.done.has(l.id)).length;
  const wordsLearned = UNITS.filter(u => unitComplete(u.lessons, prog.done)).reduce((n, u) => n + u.words.length, 0);
  const level = currentLevel(prog.done);
  const pct = levelPercent(prog.done, level);
  const initials = (profile?.display_name || user?.email || '?').split(/\s+/).map(s => s[0]).join('').slice(0, 2).toUpperCase();
  const since = user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '';

  const stats = [
    [<Fire size={28} />, liveStreak(profile), 'dias seguidos'],
    [<Bolt size={28} />, (profile?.xp_total || 0).toLocaleString('pt-BR'), 'XP total'],
    [<Icon name="check" size={28} color="var(--ok)" stroke={2.6} />, lessonsDone, 'lições concluídas'],
    [<Icon name="book" size={28} />, wordsLearned, 'palavras de unidades concluídas'],
  ];

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card pr-hero" style={{ background: 'var(--ink-fixed)', color: '#fff', borderColor: 'var(--ink-fixed)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', padding: 28 }}>
          <span className="pr-av" style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--head)', fontSize: 32, fontWeight: 700, color: 'var(--lime)' }}>{initials}</span>
          <div className="pr-who" style={{ flex: 1, minWidth: 220 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: 32 }}>{profile?.display_name || 'Meu progresso'}</h1>
            <p style={{ margin: 0, color: 'var(--on-dark)' }}>Estudando desde {since} · Meta diária: {goal} XP</p>
          </div>
          <Link to="/perfil" className="btn btn-out pf-edit"><Icon name="edit" size={18} />Editar perfil</Link>
          <ShareButton card={progressCard({ xp: profile?.xp_total || 0, streak: liveStreak(profile), level, lessons: lessonsDone })} name={profile?.display_name?.split(' ')[0]} label="Compartilhar progresso" className="btn btn-lime" />
        </div>

        <div className="stats4">
          {stats.map(([ic, v, l]) => (
            <div key={l} className="card">{ic}<b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 32, margin: '10px 0 2px' }}>{v}</b><span className="muted" style={{ fontSize: 14 }}>{l}</span></div>
          ))}
        </div>

        <SkillPortrait prog={prog} uid={profile?.id} />

        <CanDoList prog={prog} level={level} />

        <MonthRecap prog={prog} name={profile?.display_name?.split(' ')[0]} />

        <Achievements prog={prog} />

        <div className="two">
          <Missions />
          <Reminder />
        </div>

        <div className="two">
          <div className="card">
            <h2 style={{ margin: '0 0 6px', fontSize: 22 }}>Últimos 7 dias</h2>
            <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>Você bateu a meta em {hit} de 7 dias.</p>
            <div className="bars" role="img" aria-label={`XP por dia: ${days.map(d => `${d.label} ${d.xp}`).join(', ')}`}>
              {days.map(d => (
                <div key={d.day} className="col">
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>{d.xp}</span>
                  <div className={'b' + (d.xp < goal ? ' low' : '')} style={{ height: `${(d.xp / max) * 75}%` }} />
                  <span style={{ fontSize: 13, color: d.label === 'Hoje' ? 'var(--ink)' : 'var(--text3)', fontWeight: d.label === 'Hoje' ? 700 : 400 }}>{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, fontSize: 13, color: 'var(--text2)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--violet)' }} />Meta batida</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: '#C9C0FB' }} />Abaixo da meta</span>
            </div>
          </div>

          <div className="card">
            <h2 style={{ margin: '0 0 6px', fontSize: 22 }}>Unidades do {level}</h2>
            <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>Quanto de cada unidade você já concluiu.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {UNITS.filter(u => u.level === level).map(u => {
                const d = u.lessons.filter(l => prog.done.has(l.id)).length;
                const p = Math.round((d / u.lessons.length) * 100);
                return (
                  <div key={u.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 120px 44px', gap: 12, alignItems: 'center', fontSize: 15 }}>
                    <span>{u.title}</span><div className="track"><div className="fill" style={{ width: p + '%' }} /></div><b style={{ textAlign: 'right' }}>{p}%</b>
                  </div>
                );
              })}
            </div>
            {prog.mistakes.length > 0 && <div className="note" style={{ marginTop: 20 }}><b>Sugestão:</b> você tem {prog.mistakes.length} {prog.mistakes.length === 1 ? 'exercício' : 'exercícios'} na revisão. <Link to="/revisao">Revisar agora</Link></div>}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>Caminho até a fluência</h2>
            <span className="muted" style={{ fontSize: 14 }}>Você está no {level} · {pct}% concluído</span>
          </div>
          <div className="grid6">
            {LEVEL_ORDER.map((c) => {
              const st = LEVEL_ORDER.indexOf(c) < LEVEL_ORDER.indexOf(level) || (c === level && pct === 100) ? 'done' : c === level ? 'cur' : LEVELS.includes(c) ? 'open' : 'soon';
              const dark = st === 'cur';
              return (
                <div key={c} style={{ borderRadius: 16, padding: 16, background: dark ? 'var(--violet)' : st === 'done' ? 'var(--violet-l)' : 'var(--bg)', color: dark ? '#fff' : '#3A3E5A' }}>
                  <b style={{ fontFamily: 'var(--head)', fontSize: 24, display: 'block' }}>{c}</b>
                  <span style={{ fontSize: 13 }}>{LEVEL_NAMES[c]} · {st === 'done' ? 'concluído' : st === 'cur' ? 'em curso' : st === 'open' ? 'disponível' : 'em breve'}</span>
                  {dark && <div style={{ height: 6, background: 'var(--violet-dd)', borderRadius: 99, marginTop: 12, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: 'var(--lime)' }} /></div>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <h2 style={{ margin: '0 0 12px', fontSize: 22 }}>Configurações</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-out" onClick={() => updateProfile({ sound_on: !profile?.sound_on })} aria-pressed={!!profile?.sound_on}>
              <Icon name={profile?.sound_on ? 'sound' : 'mute'} />{profile?.sound_on ? 'Som ligado' : 'Som desligado'}
            </button>
            {inst.canInstall && <button className="btn btn-lime" onClick={inst.install}><Icon name="download" />Instalar app</button>}
            <button className="btn btn-out" onClick={async () => { const result = await signOut(); if (!result?.error) nav('/'); }}><Icon name="logout" />Sair da conta</button>
          </div>
          {!inst.canInstall && inst.iosHint && <p className="note" style={{ marginTop: 12 }}>Para instalar no iPhone: no Safari, toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.</p>}
        </div>
      </div>
    </Shell>
  );
}
