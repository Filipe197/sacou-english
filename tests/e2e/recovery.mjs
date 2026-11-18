import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';
import config from './vite.e2e.config.mjs';

const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find(p => fs.existsSync(p));
assert.ok(chrome, 'Chrome/Edge não encontrado');
const server = await createServer({ ...config, configFile: false,
  server: { ...config.server, port: 5311 },
  plugins: [{ name: 'recovery-mocks', enforce: 'pre', resolveId(source, importer) {
    if (importer && !importer.replaceAll('\\', '/').includes('/tests/') && /\/supabase\.js$/.test(source)) return path.resolve('tests/e2e/recovery-supabase.js');
    return null;
  } }, ...config.plugins.filter(p => p.name !== 'e2e-mocks')],
});
await server.listen();
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--mute-audio'] });
const UID = '00000000-0000-4000-8000-0000000000d1';
fs.mkdirSync('tests/e2e/artifacts', { recursive: true });
let checks = 0;
async function expectText(page, text) {
  try { await page.waitForFunction(t => document.body.innerText.toLowerCase().includes(t.toLowerCase()), { timeout: 15000 }, text); }
  catch (error) {
    await page.screenshot({ path: 'tests/e2e/artifacts/recuperacao-falhou.png', fullPage: true });
    throw new Error(`Não encontrei "${text}". Tela: ${await page.evaluate(() => document.body.innerText)}`, { cause: error });
  }
}
async function click(page, text) {
  assert.ok(await page.evaluate(t => {
    const b = [...document.querySelectorAll('button')].filter(b => b.innerText.trim().replace(/^\d+\s*/, '') === t && !b.disabled).at(-1);
    if (!b) return false; b.click(); return true;
  }, text), `Botão não encontrado: ${text}`);
}
async function fits(page, selector) {
  assert.ok(await page.evaluate(s => {
    const e = document.querySelector(s); if (!e) return false;
    const r = e.getBoundingClientRect();
    return r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1 && e.scrollWidth <= e.clientWidth + 1;
  }, selector), `Layout fora da tela: ${selector}`);
}
async function open(page, url) { await page.goto(`http://localhost:5311${url}`, { waitUntil: 'networkidle0' }); }

try {
  for (const [label, viewport] of Object.entries({ celular: { width: 390, height: 844, isMobile: true, hasTouch: true }, pc: { width: 1440, height: 1000 } })) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => { errors.push(e.message); console.error('Erro de página:', e.message); });
    await page.setViewport(viewport);
    await page.evaluateOnNewDocument(() => { globalThis.__recovery = { profile: 'error' }; });
    await open(page, '/aprender');
    await expectText(page, 'Não foi possível abrir seu perfil');
    await fits(page, '.auth-recovery');
    await page.screenshot({ path: `tests/e2e/artifacts/perfil-${label}.png` });
    await page.evaluate(() => { __recovery.profile = 'missing'; });
    await click(page, 'Tentar novamente');
    await expectText(page, 'Seu perfil não foi encontrado');
    await page.evaluate(() => { __recovery.profile = null; });
    await click(page, 'Tentar novamente');
    await expectText(page, 'Unidade');
    checks += 3;

    // Sair sem ter aberto o caderno também precisa preservar notas pendentes.
    await page.evaluate(uid => {
      const note = { id: 'pending-note', user_id: uid, title: 'Minha anotação', kind: 'note', tags: [] };
      localStorage.setItem(`sacou-caderno:${uid}`, JSON.stringify({ notes: [note], pending: { [note.id]: { op: 'upsert', v: 1 } } }));
      localStorage.setItem('sacou-caderno:outra-conta', 'preservar');
    }, UID);
    await open(page, '/perfil');
    await page.evaluate(() => { __recovery.profile = null; __recovery.notes = 'error'; });
    await click(page, 'Tentar novamente');
    await expectText(page, 'Editar perfil');
    await click(page, 'Sair da conta');
    await expectText(page, 'Há anotações que ainda não foram enviadas');
    await fits(page, '.auth-notice');
    assert.ok(await page.evaluate(uid => localStorage.getItem(`sacou-caderno:${uid}`)?.includes('Minha anotação') && !__recovery.signedOut, UID));
    await page.screenshot({ path: `tests/e2e/artifacts/anotacoes-${label}.png` });
    await click(page, 'Entendi');
    await page.evaluate(() => { __recovery.notes = null; });
    await click(page, 'Sair da conta');
    await page.waitForFunction(() => __recovery.signedOut);
    assert.equal(await page.evaluate(uid => localStorage.getItem(`sacou-caderno:${uid}`), UID), null);
    assert.equal(await page.evaluate(() => localStorage.getItem('sacou-caderno:outra-conta')), 'preservar');
    checks += 2;

    for (const mode of ['error', 'offline', 'success']) {
      await open(page, '/tests/e2e/recovery.html');
      await expectText(page, 'O que significa?');
      await page.evaluate(mode => { __recovery.profile = null; __recovery.rpc = mode; __recovery.calls = []; }, mode);
      await click(page, 'Olá'); await click(page, 'Verificar');
      // Dois cliques no mesmo instante não podem concluir a sessão duas vezes.
      await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Continuar'); b.click(); b.click(); });
      await page.waitForSelector('.finish');
      const text = await page.evaluate(() => document.body.innerText);
      assert.equal(text.includes('XP ganho'), mode === 'success');
      if (mode === 'error') assert.ok(text.includes('Não foi possível salvar seu progresso'));
      if (mode === 'offline') {
        assert.ok(text.includes('envio pendente'));
        const queue = await page.evaluate(uid => JSON.parse(localStorage.getItem(`sacou-fila:${uid}`)), UID);
        assert.ok(queue.some(j => j.fn === 'complete_session' && j.args.p_day && j.args.p_attempt_id));
      }
      assert.equal(await page.evaluate(() => __recovery.calls.filter(c => c.fn === 'complete_session').length), 1);
      if (mode === 'error') await page.screenshot({ path: `tests/e2e/artifacts/progresso-${label}.png`, fullPage: true });
      checks++;
    }
    // Primeiro dia e dias seguintes; repetir uma atividade no mesmo dia não repete a festa.
    for (const days of [1, 3]) {
      await open(page, '/tests/e2e/recovery.html');
      await page.evaluate(days => {
        Object.keys(localStorage).filter(k => k.startsWith('sacou-festa:')).forEach(k => localStorage.removeItem(k));
        __recovery.reward = { days, boost: true, multiplier: 2 };
      }, days);
      await expectText(page, 'O que significa?');
      await click(page, 'Olá'); await click(page, 'Verificar'); await click(page, 'Continuar');
      await expectText(page, `${days} ${days === 1 ? 'dia' : 'dias'} de ofensiva!`);
      await expectText(page, '10 minutos de XP duplo');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: `tests/e2e/artifacts/ofensiva-${days}-${label}.png`, fullPage: true });
      await click(page, 'Continuar'); await expectText(page, '+10');
      await open(page, '/tests/e2e/recovery.html');
      await page.evaluate(days => { __recovery.reward = { days, boost: true, multiplier: 2 }; }, days);
      await expectText(page, 'O que significa?');
      await click(page, 'Olá'); await click(page, 'Verificar'); await click(page, 'Continuar');
      await page.waitForSelector('.finish');
      assert.equal(await page.$('.daily-celebration'), null);
      checks += 2;
    }
    assert.deepEqual(errors, [], `Erros de página (${label})`);
    await page.close();
    console.log(`✓ Recuperação de perfil, anotações e progresso: ${label}`);
  }

  // O contador também precisa caber durante os exercícios, inclusive em telas estreitas.
  // Navegador limpo: envios pendentes dos testes anteriores trariam um perfil sem bônus.
  const timerContext = await browser.createBrowserContext();
  const timerPage = await timerContext.newPage();
  await timerPage.evaluateOnNewDocument(() => {
    globalThis.__recovery = { profileData: { xp_boost_until: new Date(Date.now() + 600000).toISOString() } };
  });
  for (const width of [320, 390, 768, 1440]) {
    await timerPage.setViewport({ width, height: 900 });
    for (const route of ['/tests/e2e/recovery.html', '/aprender']) {
      await open(timerPage, route);
      await timerPage.waitForSelector('.boost-timer');
      assert.ok(await timerPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Contador causou rolagem lateral em ${width}px`);
      await fits(timerPage, '.boost-timer');
      checks++;
    }
  }
  await timerContext.close();

  const page = await browser.newPage();
  await open(page, '/perfil');
  const result = await page.evaluate(async uid => {
    const { notebook, loadNotebook, clearNotebookCache } = await import('/src/lib/notebook.js');
    const { rpcOrQueue, readQueue } = await import('/src/lib/offline.js');
    const { finishSession } = await import('/src/lib/finish-session.js');
    const { boostSeconds, boostClock } = await import('/src/lib/bonus.js');
    await loadNotebook(uid);
    const note = notebook.create({ title: 'Original' });
    __recovery.notes = 'slow';
    const saving = notebook.retry();
    await new Promise(r => setTimeout(r, 0));
    const mayLeave = await clearNotebookCache(uid); // vence os 3 s, sem apagar
    const kept = localStorage.getItem(`sacou-caderno:${uid}`).includes('Original');
    notebook.update(note.id, { title: 'Editada durante o envio' });
    __recovery.notes = null; __recovery.releaseNote(); await saving;
    const editKept = Object.keys(JSON.parse(localStorage.getItem(`sacou-caderno:${uid}`)).pending).length === 1;
    await notebook.retry();
    const cleared = await clearNotebookCache(uid);

    __recovery.rpc = 'reject';
    const queued = await rpcOrQueue(uid, 'resolve_mistake', { p_item_id: 'item' });
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('QuotaExceededError'); };
    let storageFailure;
    try { storageFailure = await rpcOrQueue(uid, 'record_mistake', { p_item_id: 'outro' }); }
    finally { Storage.prototype.setItem = original; }
    __recovery.rpc = 'success';
    const partial = await finishSession({ uid, lessonId: 'review', score: 100, xp: 5, activity: 'review', setProfile() {}, itemResults: [Promise.resolve({ error: { message: 'erro' } })] });
    return { mayLeave, kept, editKept, cleared, queued: queued.queued, storageFailure: !!storageFailure.error,
      partial: !!partial.error, partialXp: partial.xp, queueLength: readQueue(uid).length,
      expired: boostSeconds(new Date(Date.now() - 1000).toISOString()), invalid: boostSeconds('inválido'), tenMinutes: boostClock(600) };
  }, UID);
  assert.deepEqual(result, { mayLeave: false, kept: true, editKept: true, cleared: true, queued: true, storageFailure: true, partial: true, partialXp: 5, queueLength: 1, expired: 0, invalid: 0, tenMinutes: '10:00' });
  checks += 5;
  await page.close();
  console.log(`✓ ${checks} verificações de recuperação passaram (PC, celular, rede e armazenamento).`);
} finally { await browser.close(); await server.close(); }
