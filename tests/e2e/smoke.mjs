// Testes de tela: abre o site com dados de demonstração num navegador de verdade e
// confere as telas principais (trilha, lição, professor, treino, caderno, jogos).
// Uso: npm test   (usa o Chrome ou o Edge instalado; CHROME_PATH escolhe outro)
import fs from 'node:fs';
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';
import config from './vite.e2e.config.mjs';

const CANDIDATES = [process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
const CHROME = CANDIDATES.find(p => fs.existsSync(p));
if (!CHROME) { console.error('Nenhum Chrome/Edge encontrado. Defina CHROME_PATH.'); process.exit(1); }

const server = await createServer({ ...config, configFile: false });
await server.listen();
const BASE = 'http://localhost:5310';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--mute-audio'] });

const results = [];
let page, pageErrors;
const wait = (ms) => new Promise(r => setTimeout(r, ms));
async function open(path) {
  await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 60000 });
  await wait(300);
}
const text = () => page.evaluate(() => document.body.innerText);
async function expectText(t, timeout = 8000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) { if ((await text()).toLowerCase().includes(t.toLowerCase())) return; await wait(150); }
  throw new Error(`não encontrei o texto "${t}" na tela`);
}
async function click(t) {
  const ok = await page.evaluate((t) => {
    const el = [...document.querySelectorAll('button, a')].find(b => b.innerText.trim().includes(t) && !b.disabled);
    if (el) { el.click(); return true; } return false;
  }, t);
  if (!ok) throw new Error(`não encontrei o botão "${t}"`);
  await wait(250);
}
async function test(name, fn) {
  page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  try {
    await fn();
    if (pageErrors.length) throw new Error('erro de código na página: ' + pageErrors[0]);
    results.push([true, name]);
  } catch (e) {
    results.push([false, name, e.message]);
    await page.screenshot({ path: `tests/e2e/falhou-${name.replace(/\W+/g, '-')}.png` }).catch(() => {});
  }
  await page.close();
}

// ---------- testes ----------
await test('trilha abre', async () => { await open('/aprender'); await expectText('Unidade'); });

await test('lição: acerto e erro com o professor', async () => {
  await open('/licao/a1-u1-l1');
  await expectText('O que significa?');
  await click('Olá!');
  await click('Verificar');
  await expectText('Continuar');
  await click('Continuar');
  // segundo exercício: escolhe uma opção qualquer até errar e chama o professor
  for (let i = 0; i < 6; i++) {
    const t = await text();
    if (t.includes('Por que errei')) break;
    const opts = await page.$$('.options .option:not([disabled])');
    if (opts.length) { await opts[opts.length - 1].click(); await wait(150); await click('Verificar'); }
    if ((await text()).includes('Por que errei')) break;
    if ((await text()).includes('Continuar')) await click('Continuar'); else if ((await text()).includes('Entendi')) await click('Entendi'); else break;
  }
  if ((await text()).includes('Por que errei')) {
    await click('Por que errei');
    await expectText('Professor Sacou');
    const t = await text();
    if (t.includes('não respondeu')) throw new Error('o professor não respondeu');
  }
});

await test('treino abre', async () => { await open('/praticar'); await expectText('Começar treino'); });
await test('caderno abre', async () => { await open('/caderno'); await expectText('Meu caderno'); });
await test('progresso abre', async () => { await open('/progresso'); await expectText('XP'); });

await test('jogos: página e Palavra Relâmpago', async () => {
  await open('/jogos'); await expectText('Jogos e histórias'); await expectText('Ana em Londres');
  await open('/jogos/relampago'); await click('Valendo'); await expectText('Combo');
});
await test('jogos: episódio 1', async () => {
  await open('/jogos/episodio/ep1'); await click('Começar'); await expectText('What is your name');
});
await test('jogos: Frase em pedaços e Ouviu, tocou', async () => {
  await open('/jogos/frases'); await click('Começar'); await expectText('Monte em inglês');
  await open('/jogos/ouvir'); await click('Começar');
  if ((await page.$$('.ls-card')).length !== 4) throw new Error('as 4 figuras não apareceram');
});

await browser.close();
await server.close();

const fails = results.filter(r => !r[0]);
for (const [ok, name, msg] of results) console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : ` — ${msg}`}`);
console.log(`\n${results.length - fails.length}/${results.length} testes passaram.`);
process.exit(fails.length ? 1 : 0);
