export function boostSeconds(until, now = Date.now()) {
  const remaining = Math.ceil((Date.parse(until || '') - now) / 1000);
  return Number.isFinite(remaining) ? Math.max(0, remaining) : 0;
}

export function boostClock(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

// O banco decide quando a ofensiva e o bônus aumentam; esta marca só evita repetir a festa.
export function claimDailyCelebration(uid, day, kind) {
  if (!uid || !day) return false;
  const key = `sacou-festa:${uid}:${kind}`;
  try {
    if (localStorage.getItem(key) === day) return false;
    localStorage.setItem(key, day);
  } catch { /* a conclusão continua funcionando sem armazenamento */ }
  return true;
}
