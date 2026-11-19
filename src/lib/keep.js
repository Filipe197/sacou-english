// Guarda no aparelho o andamento de uma tela (conversa, tira-dúvidas...), para que nada
// se perca se a página recarregar no meio (celular apagou, aba fechada, atualização do app).
// Cada pessoa tem a sua cópia (a chave leva o id da conta) e ela vence depois de `ttl`.
export function keepRead(key, ttl = 6 * 3600 * 1000) {
  try {
    const s = JSON.parse(localStorage.getItem(`sacou-andamento:${key}`) || 'null');
    return s && s.at && Date.now() - s.at < ttl ? s.data : null;
  } catch { return null; }
}
export function keepWrite(key, data) {
  try { localStorage.setItem(`sacou-andamento:${key}`, JSON.stringify({ at: Date.now(), data })); } catch { /* sem armazenamento */ }
}
export function keepClear(key) {
  try { localStorage.removeItem(`sacou-andamento:${key}`); } catch { /* sem armazenamento */ }
}
