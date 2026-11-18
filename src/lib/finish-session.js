import { rpcOrQueue, logActivity } from './offline.js';
import { claimDailyCelebration } from './bonus.js';

// Aguarda os resultados dos exercícios antes de anunciar que tudo foi salvo.
export async function finishSession({ uid, lessonId, score, xp, activity, attemptId = crypto.randomUUID(), itemResults = [], setProfile }) {
  const items = await Promise.all(itemResults);
  const result = await rpcOrQueue(uid, 'complete_session', {
    p_lesson_id: lessonId, p_score: score, p_xp: xp, p_attempt_id: attemptId,
    p_day: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()),
  });
  if (result.error) return {
    xp: null, title: 'Não foi possível salvar seu progresso',
    message: 'Você terminou os exercícios, mas não conseguimos registrar esta sessão.',
    error: 'Verifique a conexão e tente novamente mais tarde.',
  };
  const data = result.data;
  if (data?.profile) setProfile?.(data.profile);
  const saved = {
    xp: result.queued ? null : data?.awarded_xp ?? null,
    streak: data?.profile?.streak,
    multiplier: data?.multiplier || 1,
    boostUntil: data?.boost_until,
    showStreak: !!data?.streak_increased && claimDailyCelebration(uid, data.profile.last_active, 'streak'),
    showBoost: !!data?.boost_started && claimDailyCelebration(uid, data.profile.xp_boost_day, 'boost'),
    queued: !!result.queued,
  };
  logActivity(uid, activity).catch(() => {});
  const failedItem = items.some(r => r?.error);
  const queued = result.queued || items.some(r => r?.queued);
  if (failedItem) return {
    ...saved,
    title: 'Sessão concluída com pendências',
    message: result.queued ? 'A conclusão ficou salva neste aparelho para envio quando a conexão voltar.' : 'A conclusão foi registrada, mas alguns resultados dos exercícios não foram salvos.',
    error: 'Não conseguimos atualizar todos os erros da revisão. Confira sua lista ao voltar.',
  };
  if (queued) return {
    ...saved,
    title: 'Sessão salva com envio pendente',
    message: 'Há resultados salvos neste aparelho que serão enviados quando a conexão voltar. Os pontos e a revisão serão atualizados após a confirmação.',
  };
  return saved;
}
