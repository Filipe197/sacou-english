import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LessonRunner from '../components/LessonRunner.jsx';
import { UNITS, LEVEL_ORDER, shuffle } from '../lib/content.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { Logo } from '../components/ui.jsx';

// Teste de nível: alguns exercícios de cada unidade (sem "match", sem repetir erros).
// Unidades seguidas, desde o início, com 2/3 ou mais de acerto são marcadas como concluídas.
const PASS = 0.66;

export default function Placement() {
  const { updateProfile } = useAuth();
  const [started, setStarted] = useState(false);
  const [params] = useSearchParams();
  const upTo = LEVEL_ORDER.indexOf(['A2', 'B1'].includes(params.get('ate')) ? params.get('ate') : 'A1');
  const units = UNITS.filter(u => LEVEL_ORDER.indexOf(u.level) <= upTo);
  const entries = useMemo(() => units.flatMap(u => {
    const per = upTo > 0 && LEVEL_ORDER.indexOf(u.level) < upTo ? 2 : 3; // no teste longo, menos perguntas dos níveis de baixo
    return shuffle(u.lessons.flatMap(l => l.items.filter(i => !['match', 'speak', 'story', 'quiz'].includes(i.type)).map(item => ({ item, lessonId: l.id, unit: u })))).slice(0, per);
  }), [upTo]);

  if (!started) {
    return (
      <div className="center-page" style={{ flexDirection: 'column', gap: 24 }}>
        <Logo />
        <div className="card" style={{ maxWidth: 560, padding: 32 }}>
          <h1 style={{ fontSize: 32, margin: '0 0 12px' }}>Teste de nível</h1>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 16px' }}>
            São {entries.length} perguntas rápidas sobre o conteúdo {upTo === 2 ? 'dos níveis A1, A2 e B1' : upTo === 1 ? 'dos níveis A1 e A2' : 'do nível A1'}. Não tem problema errar: o teste só serve para descobrir <b>por onde você começa</b>.
          </p>
          <ul style={{ margin: '0 0 24px', paddingLeft: 20, lineHeight: 1.8, color: 'var(--text2)' }}>
            <li>Cada unidade em que você acertar pelo menos 2 de cada 3 perguntas é marcada como concluída (a partir da primeira).</li>
            <li>O teste não dá XP e não conta erros para revisão.</li>
            <li>Leva cerca de {Math.max(3, Math.round(entries.length / 7))} minutos.</li>
          </ul>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-violet btn-lg" onClick={() => setStarted(true)}>Começar o teste</button>
            <Link className="btn btn-out btn-lg" to="/aprender" onClick={() => updateProfile({ onboarded: true })}>Prefiro começar do zero</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LessonRunner
        introduceWords={false}
      entries={entries}
      title="Teste de nível"
      exitTo="/bem-vindo"
      retryWrong={false}
      finishCta="Ver minha trilha"
      onFinish={async ({ firstTry }) => {
        const passed = [];
        for (const u of units) {
          const mine = entries.filter(e => e.unit.id === u.id).map(e => firstTry.get(e.item.id));
          const rate = mine.filter(Boolean).length / Math.max(1, mine.length);
          if (rate >= PASS) passed.push(u); else break; // só pula unidades seguidas desde o início
        }
        const ids = passed.flatMap(u => u.lessons.map(l => l.id));
        let error;
        if (ids.length) ({ error } = await supabase.rpc('skip_lessons', { p_lesson_ids: ids }));
        await updateProfile({ onboarded: true });
        return {
          to: '/aprender',
          title: passed.length ? `Você pulou ${passed.length} ${passed.length === 1 ? 'unidade' : 'unidades'}!` : 'Vamos começar pela base',
          message: passed.length
            ? `Marcamos como concluídas: ${passed.map(u => u.title).join(', ')}. Você pode refazer qualquer lição quando quiser.`
            : 'Você vai começar na Unidade 1. Ela é rápida e garante que nenhuma base fique faltando.',
          error: error ? 'Não conseguimos salvar o resultado do teste. Você pode refazê-lo depois.' : undefined,
        };
      }}
    />
  );
}
