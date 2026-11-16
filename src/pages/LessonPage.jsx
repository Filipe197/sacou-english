import { Navigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import LessonRunner from '../components/LessonRunner.jsx';
import { getLesson, lessonStates } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { Spinner } from '../components/ui.jsx';

export default function LessonPage() {
  const { id } = useParams();
  const lesson = getLesson(id);
  const prog = useProgress();
  const { setProfile } = useAuth();

  const entries = useMemo(() => lesson ? lesson.items.map(item => ({ item, lessonId: lesson.id, unit: lesson.unit })) : [], [lesson]);

  if (!lesson) return <Navigate to="/aprender" replace />;
  if (prog.loading) return <Spinner />;
  const st = lessonStates(prog.done).find(s => s.lesson.id === id)?.state;
  if (st === 'locked') return <Navigate to="/aprender" replace />;
  const repeat = st === 'done';

  return (
    <LessonRunner
      entries={entries}
      title={`${lesson.unit.title} — ${lesson.title}`}
      onItemResult={(e, ok) => { if (!ok) supabase.rpc('record_mistake', { p_item_id: e.item.id, p_lesson_id: e.lessonId }); }}
      onFinish={async ({ score }) => {
        const xp = repeat ? 5 : 10 + (score >= 90 ? 5 : 0);
        const { data, error } = await supabase.rpc('complete_lesson', { p_lesson_id: lesson.id, p_score: score, p_xp: xp });
        if (error) return { xp: null, error: 'Não conseguimos salvar seu progresso agora (sem conexão?). Refaça a lição mais tarde para registrar.' };
        if (data) setProfile(data);
        return { xp, streak: data?.streak, title: repeat ? 'Treino concluído!' : undefined };
      }}
    />
  );
}
