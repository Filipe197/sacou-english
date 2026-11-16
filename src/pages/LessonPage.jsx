import { Navigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import LessonRunner from '../components/LessonRunner.jsx';
import { getLesson, lessonStates, LESSONS } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { todayBR } from '../lib/progress.js';
import { rpcOrQueue, enqueue, looksOffline, logActivity } from '../lib/offline.js';
import { shareMoments } from '../components/ShareCard.jsx';
import { Spinner } from '../components/ui.jsx';

export default function LessonPage() {
  const { id } = useParams();
  const lesson = getLesson(id);
  const prog = useProgress();
  const { user, profile, setProfile } = useAuth();

  const entries = useMemo(() => lesson ? lesson.items.map(item => ({ item, lessonId: lesson.id, unit: lesson.unit, story: lesson.story })) : [], [lesson]);

  if (!lesson) return <Navigate to="/aprender" replace />;
  if (prog.loading) return <Spinner />;
  const st = lessonStates(prog.done).find(s => s.lesson.id === id)?.state;
  if (st === 'locked') return <Navigate to="/aprender" replace />;
  const repeat = st === 'done' && prog.scores[id]?.times_done > 0; // pulada no teste conta como nova

  return (
    <LessonRunner
      entries={entries}
      title={`${lesson.unit.title} — ${lesson.title}`}
      onItemResult={(e, ok) => { if (!ok) rpcOrQueue(user?.id, 'record_mistake', { p_item_id: e.item.id, p_lesson_id: e.lessonId }); }}
      onFinish={async ({ score }) => {
        const xp = repeat ? 5 : 10 + (score >= 90 ? 5 : 0);
        const args = { p_lesson_id: lesson.id, p_score: score, p_xp: xp };
        const { data, error } = await supabase.rpc('complete_lesson', args);
        const next0 = LESSONS[LESSONS.findIndex(l => l.id === lesson.id) + 1];
        if (error && looksOffline(error)) {
          // sem internet: guarda no aparelho e envia quando a conexão voltar
          enqueue(user?.id, { fn: 'complete_lesson', args, day: todayBR() });
          enqueue(user?.id, { fn: 'activity', args: { kind: 'lesson' } });
          return { xp, next: next0 && !repeat ? next0 : undefined, title: 'Lição concluída!', message: 'Você está sem internet, mas tudo bem: a lição ficou salva neste aparelho e será enviada sozinha quando a conexão voltar.' };
        }
        if (error) return { xp: null, error: 'Não conseguimos salvar seu progresso agora. Refaça a lição mais tarde para registrar.' };
        if (data) setProfile(data);
        logActivity(user?.id, 'lesson');
        // primeira lição do dia: a sequência subiu
        const streakUp = data && profile && profile.last_active !== data.last_active;
        const next = LESSONS[LESSONS.findIndex(l => l.id === lesson.id) + 1];
        const card = !repeat && shareMoments({ lesson, next, streak: data?.streak, streakUp });
        const share = card ? { card, name: profile?.display_name?.split(' ')[0] } : null;
        return {
          xp, streak: data?.streak, next: next && !repeat ? next : undefined, share: share || undefined,
          anim: streakUp ? 'streak' : undefined,
          title: streakUp ? (data.streak === 1 ? 'Sequência iniciada!' : `${data.streak} dias seguidos!`) : repeat ? 'Treino concluído!' : undefined,
          message: streakUp ? 'Você estudou hoje e sua sequência está garantida. Volte amanhã para continuar.' : undefined,
        };
      }}
    />
  );
}
