// Provas: "pular unidade" (exercícios da unidade atual) e "prova do nível"
// (exercícios de todas as unidades de um nível). Com 80% ou mais de acerto de
// primeira, as lições ainda não feitas são marcadas como concluídas
// (skip_lessons, a mesma do teste de nível: não dá XP nem conta erros).
import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import LessonRunner, { savedEntries } from '../components/LessonRunner.jsx';
import { Shell } from '../components/ui.jsx';
import { LEVELS, LEVEL_NAMES, unitsOf, getUnit, shuffle } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';

export const PASS = 0.8;
const SKIP_TYPES = ['match', 'speak', 'story', 'quiz'];
const pool = (u) => u.lessons.flatMap(l => l.items.filter(i => !SKIP_TYPES.includes(i.type)).map(item => ({ item, lessonId: l.id, unit: u })));

export const examCard = (level) => ({
  kicker: 'PROVA APROVADA', big: level, title: `Passei na prova do nível ${level} de inglês!`,
  sub: `${LEVEL_NAMES[level]} · segue o padrão europeu CEFR`,
});

export default function Exam() {
  const { kind, id } = useParams();
  const prog = useProgress();
  const { profile, user } = useAuth();
  const saveKey = `${user?.id || 'anon'}:prova:${kind}:${id}`;
  const [saved] = useState(() => savedEntries(saveKey)); // prova pela metade: mesmas perguntas
  const [started, setStarted] = useState(!!saved);
  const unit = kind === 'unidade' ? getUnit(id) : null;
  const level = kind === 'nivel' && LEVELS.includes(id) ? id : null;
  const units = unit ? [unit] : level ? unitsOf(level) : [];

  const entries = useMemo(() => saved || (units.length === 1
    ? shuffle(pool(units[0])).slice(0, 12)
    : units.flatMap(u => shuffle(pool(u)).slice(0, 3))), [kind, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!units.length) return <Navigate to="/aprender" replace />;
  const title = unit ? `Teste da unidade ${unit.order}: ${unit.title}` : `Prova do nível ${level}`;
  const pending = units.flatMap(u => u.lessons).filter(l => !prog.done.has(l.id)).map(l => l.id);

  if (!started) {
    return (
      <Shell>
        <div className="card exam-intro">
          <span className="exam-ic" aria-hidden="true">{unit ? '⚡' : '🎓'}</span>
          <span className="eyebrow">{unit ? `Nível ${unit.level} · Unidade ${unit.order}` : `Nível ${level} · ${LEVEL_NAMES[level]}`}</span>
          <h1>{unit ? 'Já sabe esta unidade?' : `Prova do nível ${level}`}</h1>
          <p className="muted">
            {unit
              ? <>São <b>{entries.length} perguntas</b> sobre “{unit.title}”. Acertando pelo menos 80% de primeira, a unidade é marcada como concluída e a próxima abre.</>
              : <>São <b>{entries.length} perguntas</b>, 3 de cada unidade do {level}. Acertando pelo menos 80% de primeira, você é aprovado{pending.length ? ' e as lições que faltam do nível são marcadas como concluídas' : ''}.</>}
          </p>
          <ul>
            <li>Não dá XP e não conta erros para a revisão.</li>
            <li>Leva cerca de {Math.max(3, Math.round(entries.length / 4))} minutos.</li>
            <li>Se não passar, tudo continua como estava. Pode tentar de novo quando quiser.</li>
          </ul>
          <div className="exam-actions">
            <button type="button" className="btn btn-violet btn-lg btn-3d" onClick={() => setStarted(true)} disabled={prog.loading}>Começar</button>
            <Link className="btn btn-out btn-lg" to="/aprender">Voltar para a trilha</Link>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <LessonRunner
      introduceWords={false}
      entries={entries}
      saveKey={saveKey}
      title={title}
      retryWrong={false}
      finishCta="Voltar para a trilha"
      onFinish={async ({ firstTry }) => {
        const vals = entries.map(e => firstTry.get(e.item.id));
        const rate = vals.filter(Boolean).length / Math.max(1, vals.length);
        const passed = rate >= PASS;
        // por unidade, para a prova do nível mostrar onde focar
        const weak = units.filter(u => {
          const mine = entries.filter(e => e.unit.id === u.id).map(e => firstTry.get(e.item.id));
          return mine.length && mine.filter(Boolean).length / mine.length < 0.67;
        });
        let error;
        if (passed && pending.length) ({ error } = await supabase.rpc('skip_lessons', { p_lesson_ids: pending }));
        const pct = Math.round(rate * 100);
        if (!passed) return {
          xp: null, anim: 'keep-going', to: '/aprender',
          title: `Faltou pouco: ${pct}%`,
          message: `Para passar é preciso 80%. ${weak.length && level ? `Vale revisar: ${weak.map(u => u.title).join(', ')}.` : 'Faça as lições da unidade e tente de novo quando quiser.'}`,
        };
        return {
          xp: null, anim: 'trophy', to: '/aprender',
          title: unit ? 'Unidade liberada!' : `Aprovado no ${level}!`,
          message: unit
            ? `Você acertou ${pct}% e pulou “${unit.title}”. As lições continuam lá para treinar quando quiser.`
            : `Você acertou ${pct}%.${pending.length ? ` Marcamos as ${pending.length} lições que faltavam do ${level} como concluídas.` : ''}${weak.length ? ` Para ficar perfeito, revise: ${weak.map(u => u.title).join(', ')}.` : ''}`,
          error: error ? 'Você passou, mas não conseguimos salvar. Verifique a conexão e faça o teste de novo.' : undefined,
          share: level && !error ? { card: examCard(level), name: profile?.display_name?.split(' ')[0] } : undefined,
        };
      }}
    />
  );
}
