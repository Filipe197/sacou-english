// Card de conquista no formato do story (1080x1920), desenhado no próprio aparelho.
// No celular abre o "Compartilhar" do sistema (Instagram, WhatsApp...); no
// computador baixa a imagem.
import { useState } from 'react';
import { Icon } from './ui.jsx';

const SITE = 'sacou-english.vercel.app';
const STREAK_MARKS = [3, 7, 14, 21, 30, 50, 75, 100, 150, 200, 300, 365, 500];

// Momentos que merecem card ao terminar uma lição
export function shareMoments({ lesson, next, streak, streakUp }) {
  const unitDone = !next || next.unit.id !== lesson.unit.id;
  const levelDone = unitDone && (!next || next.unit.level !== lesson.unit.level);
  if (levelDone) return { kicker: `NÍVEL ${lesson.unit.level} CONCLUÍDO`, big: lesson.unit.level, title: `Completei o nível ${lesson.unit.level} de inglês!`, sub: 'Todas as unidades, com explicação em português.' };
  if (unitDone) return { kicker: 'UNIDADE CONCLUÍDA', big: `${lesson.unit.level}·${lesson.unit.order}`, title: lesson.unit.title, sub: lesson.unit.subtitle || `Unidade ${lesson.unit.order} do nível ${lesson.unit.level}` };
  if (streakUp && STREAK_MARKS.includes(streak)) return streakCard(streak);
  return null;
}
export const streakCard = (streak) => ({ kicker: 'SEQUÊNCIA', big: String(streak), title: `${streak} dias seguidos estudando inglês`, sub: 'Um pouco todo dia faz toda a diferença.', fire: true });
export const progressCard = ({ xp, streak, level, lessons }) => ({
  kicker: 'MEU PROGRESSO', big: level, title: `${lessons} ${lessons === 1 ? 'lição concluída' : 'lições concluídas'}`,
  sub: `${xp.toLocaleString('pt-BR')} XP · ${streak} ${streak === 1 ? 'dia seguido' : 'dias seguidos'}`,
});

function wrap(ctx, text, maxW) {
  const words = String(text).split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  return lines;
}

export async function drawCard(card, name) {
  const W = 1080, H = 1920;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  const head = 'Space Grotesk, system-ui, sans-serif';
  const body = 'Inter, system-ui, sans-serif';
  try { await Promise.all([document.fonts.load(`700 100px "Space Grotesk"`), document.fonts.load(`600 40px Inter`)]); } catch { /* usa a fonte do sistema */ }

  // fundo: tinta escura com brilhos violeta e limão
  x.fillStyle = '#0B0D1A'; x.fillRect(0, 0, W, H);
  const glow = (cx, cy, r, col) => { const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(11,13,26,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H); };
  glow(880, 260, 900, 'rgba(91,61,245,.55)');
  glow(120, 1700, 800, 'rgba(212,255,58,.16)');
  x.strokeStyle = 'rgba(255,255,255,.05)'; x.lineWidth = 2;
  for (let i = 0; i < W; i += 90) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); }

  // logo
  const lx = 90, ly = 140;
  x.fillStyle = '#5B3DF5'; roundRect(x, lx, ly, 120, 120, 30); x.fill();
  x.strokeStyle = '#D4FF3A'; x.lineWidth = 12; x.lineCap = 'round'; x.lineJoin = 'round';
  x.beginPath(); x.moveTo(lx + 28, ly + 80); x.lineTo(lx + 52, ly + 56); x.lineTo(lx + 68, ly + 72); x.lineTo(lx + 94, ly + 42); x.stroke();
  x.beginPath(); x.moveTo(lx + 76, ly + 40); x.lineTo(lx + 95, ly + 40); x.lineTo(lx + 95, ly + 59); x.stroke();
  x.font = `700 64px ${head}`; x.fillStyle = '#fff'; x.textBaseline = 'middle';
  x.fillText('Sacou', lx + 150, ly + 62); x.fillStyle = '#D4FF3A'; x.fillText('English', lx + 150 + x.measureText('Sacou ').width, ly + 62);

  // selo
  x.textBaseline = 'alphabetic';
  x.font = `800 40px ${body}`;
  const k = card.kicker; const kw = x.measureText(k).width + 70;
  x.fillStyle = '#D4FF3A'; roundRect(x, 90, 520, kw, 84, 42); x.fill();
  x.fillStyle = '#0B0D1A'; x.fillText(k, 125, 577);

  // número grande
  let y = 900;
  if (card.emoji) {
    // medalha: emoji num círculo (a fonte dos títulos não desenha emoji grande em todo celular)
    const cx = 250, cy = 830, r = 160;
    const g = x.createRadialGradient(cx - 40, cy - 50, 20, cx, cy, r);
    g.addColorStop(0, '#FFF7E6'); g.addColorStop(1, '#FBD38D');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
    x.lineWidth = 14; x.strokeStyle = '#D4FF3A'; x.stroke();
    x.font = '170px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(card.emoji, cx, cy + 8);
    x.textAlign = 'left'; x.textBaseline = 'alphabetic';
    y = 1100;
  } else {
    x.font = `700 ${card.big.length > 4 ? 250 : 330}px ${head}`;
    x.fillStyle = '#fff'; x.fillText(card.big, 80, y);
    if (card.fire) drawFire(x, 110 + x.measureText(card.big).width, y - 230, 1.6);
  }

  // título e subtítulo
  y += 120;
  x.font = `700 92px ${head}`; x.fillStyle = '#fff';
  for (const ln of wrap(x, card.title, W - 180).slice(0, 4)) { x.fillText(ln, 90, y); y += 104; }
  y += 20;
  x.font = `500 46px ${body}`; x.fillStyle = '#C9CBE0';
  for (const ln of wrap(x, card.sub, W - 180).slice(0, 3)) { x.fillText(ln, 90, y); y += 62; }

  // rodapé
  x.fillStyle = 'rgba(255,255,255,.08)'; roundRect(x, 90, 1560, W - 180, 220, 44); x.fill();
  x.font = `600 40px ${body}`; x.fillStyle = '#C9CBE0';
  x.fillText(name ? `${name} está aprendendo inglês` : 'Aprendendo inglês', 140, 1645);
  x.font = `800 50px ${body}`; x.fillStyle = '#D4FF3A';
  x.fillText('Aprenda também. É grátis!', 140, 1715);
  x.font = `600 36px ${body}`; x.fillStyle = 'rgba(255,255,255,.6)'; x.textAlign = 'center';
  x.fillText(SITE, W / 2, 1860);

  return new Promise(res => c.toBlob(res, 'image/png'));
}

function roundRect(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
function drawFire(x, X, Y, s) {
  x.save(); x.translate(X, Y); x.scale(s, s);
  const g = x.createLinearGradient(0, 0, 0, 140); g.addColorStop(0, '#FFC23A'); g.addColorStop(1, '#FF5A1F');
  x.fillStyle = g; x.beginPath();
  x.moveTo(60, 0); x.bezierCurveTo(70, 40, 120, 60, 115, 105); x.bezierCurveTo(110, 140, 80, 150, 60, 150);
  x.bezierCurveTo(30, 150, 5, 130, 5, 100); x.bezierCurveTo(5, 70, 30, 60, 35, 35); x.bezierCurveTo(45, 55, 50, 60, 55, 62); x.bezierCurveTo(60, 40, 55, 20, 60, 0); x.fill();
  x.restore();
}

export function ShareButton({ card, name, label = 'Compartilhar no story', className = 'btn btn-out btn-lg' }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  async function go() {
    setBusy(true); setMsg('');
    try {
      const blob = await drawCard(card, name);
      const file = new File([blob], 'sacou-english.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Sacou English', text: `${card.title} — ${SITE}` });
      } else {
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sacou-english-conquista.png'; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        setMsg('Imagem baixada! Poste no seu story e marque a gente.');
      }
    } catch (e) { if (e?.name !== 'AbortError') setMsg('Não deu para gerar a imagem agora.'); }
    setBusy(false);
  }
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <button type="button" className={className} onClick={go} disabled={busy}><Icon name="share" size={18} />{busy ? 'Gerando imagem…' : label}</button>
      {msg && <span className="muted" style={{ fontSize: 13 }}>{msg}</span>}
    </span>
  );
}
