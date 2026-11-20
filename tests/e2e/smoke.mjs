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
  // Escolhe uma resposta comprovadamente errada, sem depender da ordem sorteada.
  const item = JSON.parse(fs.readFileSync('src/content/a1/unit-01.json', 'utf8')).lessons[0].items[1];
  const wrong = item.options.find(o => o !== item.answer);
  await click(wrong); await click('Verificar');
  await expectText('Por que errei');
  await click('Por que errei');
  await expectText('Professor Sacou');
  await expectText('Salvar explicação no caderno');
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

await test('jogos: podcast toca e mostra a transcrição', async () => {
  await open('/jogos/podcast/pod-a1u1');
  await click('Mostrar transcrição');
  await expectText('Welcome to the podcast');
  if (!(await page.$('audio'))) throw new Error('o player de áudio não apareceu');
});

await test('aula falada: repetir, responder e resumo', async () => {
  await open('/aula');
  await wait(1200);
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Fechar')?.click());
  await click('Começar a aula');
  await expectText('Good morning, teacher.');
  await click('Pular');
  await expectText('What do you eat for breakfast?');
  await page.type('.conv-in input', 'I eat bread and drink cafe');
  await page.click('.conv-in button[type=submit]');
  await expectText('Café em inglês é "coffee".');
  await click('Terminar');
  await expectText('Resumo da aula');
});

await test('caderno na lição: consultar guias e anotações', async () => {
  await open('/licao/a1-u1-l1');
  await expectText('O que significa?');
  await page.click('.nb-open');
  await expectText('Esta lição');
  await click('Consultar');
  await page.type('.nb-find input', 'those');
  await expectText('This, that, these, those e as cores');
  await click('This, that, these, those e as cores');
  await expectText('aquele carro / aqueles carros');
  await page.click('.nb-drawer [aria-label="Fechar caderno"]');
  await expectText('O que significa?');
});

await test('ranking: liga com zonas e turma', async () => {
  await open('/ranking');
  await expectText('Liga Prata');
  await expectText('sobe de liga');
  await expectText('(você)');
  await click('Turma');
  await expectText('Turmas');
});

await test('progresso: retrospectiva do mês', async () => {
  await open('/progresso');
  await expectText('Retrospectiva');
  await expectText('dias estudados');
});

await test('prova: teste para pular unidade', async () => {
  await open('/aprender');
  await expectText('Já sabe esta unidade?');
  await expectText('Prova do nível A1');
  await open('/prova/unidade/a1-u6');
  await expectText('Já sabe esta unidade?');
  await click('Começar');
  await expectText('1/12');
});

await test('privacidade, termos e excluir conta', async () => {
  await open('/privacidade');
  await expectText('Política de Privacidade');
  await expectText('Seus direitos');
  await open('/termos');
  await expectText('Termos de Uso');
  await open('/perfil');
  await expectText('Excluir conta');
  await click('Excluir minha conta');
  await expectText('Tem certeza?');
  await page.type('#pf-del', 'excluir');
  await click('Excluir para sempre');
  await page.waitForFunction(() => globalThis.__deleted === true && location.search.includes('conta=excluida'));
});

await test('lição mostra palavra nova (dicas carregam depois da abertura)', async () => {
  await open('/licao/a1-u1-l1');
  await expectText('Palavra nova');
});

await test('aparência: modo escuro no perfil', async () => {
  await open('/perfil');
  await click('Escuro');
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  await click('Claro');
  await page.waitForFunction(() => !document.documentElement.dataset.theme);
});

await test('lição: dica na 1ª vez e "corrija o erro de antes" só no que errou', async () => {
  const lesson = JSON.parse(fs.readFileSync('src/content/a1/unit-05.json', 'utf8')).lessons[1];
  await open('/licao/' + lesson.id);
  await expectText('Veja esta dica');
  const tap = (sel, text) => page.evaluate((sel, text) => { const el = [...document.querySelectorAll(sel)].find(e => !e.disabled && e.textContent.replace(/\s+/g, ' ').trim().replace(/^\d+/, '') === text); el?.click(); return !!el; }, sel, text);
  for (const it of lesson.items) {
    if (['meaning', 'listen', 'choice'].includes(it.type)) await tap('.options .option', it.answer);
    else if (it.type === 'build') for (const w of ['this', 'are', 'my', 'keys']) { await tap('.bank .tile:not(.used)', w); await wait(80); }
    else if (it.type === 'match') for (const [en, pt] of it.pairs) { await tap('.match-col:first-child .mbtn', en); await wait(80); await tap('.match-col:last-child .mbtn', pt); await wait(80); }
    await wait(150);
    if (it.type !== 'match') await page.click('.bar .cta');
    await wait(300);
    await page.click('.bar .cta'); await wait(300);
  }
  await expectText('Corrija o erro de antes');
  const slots = await page.evaluate(() => document.querySelectorAll('.fix-slot').length);
  if (slots !== 1) throw new Error(`esperava 1 espaço para corrigir, veio ${slots}`);
  await tap('.bank .tile:not(.used)', 'These'); await wait(100);
  await page.click('.bar .cta');
  await page.waitForSelector('.bar.ok', { timeout: 5000 }).catch(() => { throw new Error('a correção não foi aceita'); });
});

await test('lição: volta de onde parou se a página recarregar', async () => {
  const lesson = JSON.parse(fs.readFileSync('src/content/a1/unit-05.json', 'utf8')).lessons[2];
  await open('/licao/' + lesson.id);
  await wait(600);
  const tap = (sel, text) => page.evaluate((sel, text) => { const el = [...document.querySelectorAll(sel)].find(e => !e.disabled && e.textContent.replace(/\s+/g, ' ').trim().replace(/^\d+/, '') === text); el?.click(); return !!el; }, sel, text);
  const [m] = lesson.items; // 1º exercício: ligar pares
  for (const [en, pt] of m.pairs) { await tap('.match-col:first-child .mbtn', en); await wait(80); await tap('.match-col:last-child .mbtn', pt); await wait(80); }
  await wait(300); await page.click('.bar .cta'); await wait(400);
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText('Continuando de onde você parou');
  await expectText('2/6');
});

await test('tirar dúvidas: pergunta, resposta e salvar', async () => {
  await open('/duvidas');
  await wait(800);
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Fechar')?.click());
  await expectText('Experimente perguntar');
  await page.type('.dv-bar input', 'Qual a diferença entre these e those?');
  await page.click('.dv-bar button[type=submit]');
  await expectText('Estes sapatos são novos.');
  await click('Salvar no caderno');
  await expectText('Salvo no caderno');
  if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) throw new Error('rolagem lateral na tela de dúvidas');
});

await test('aula do Juvenal: volta de onde parou se a página recarregar', async () => {
  await open('/aula');
  await wait(800);
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Fechar')?.click());
  await click('Começar a aula');
  await expectText('Good morning, teacher.');
  await click('Pular');
  await expectText('What do you eat for breakfast?');
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText('Continuando de onde você parou');
  await expectText('What do you eat for breakfast?');
  await page.evaluate(() => document.querySelector('[aria-label="Sair da aula"]')?.click());
});

await test('aula do Juvenal: 1 por dia para alunos, sem limite para administrador', async () => {
  await page.evaluateOnNewDocument(() => { globalThis.__aulaStatus = { used: 1, limit: 1, admin: false }; });
  await open('/aula');
  await expectText('Você já fez sua aula de hoje');
  if (!await page.evaluate(() => document.querySelector('.aula-go')?.disabled)) throw new Error('o botão de começar deveria estar travado');
  await page.evaluateOnNewDocument(() => { globalThis.__aulaStatus = { used: 3, limit: 1, admin: true }; });
  await open('/aula');
  await expectText('Conta de administrador');
  if (await page.evaluate(() => document.querySelector('.aula-go')?.disabled)) throw new Error('o administrador não deveria ter limite');
});

// Recarrega no meio de uma sessão de exercícios sorteados: tem que voltar no MESMO exercício
// (sem tela de início e sem sortear outros).
async function sameAfterReload(counter) {
  await wait(500);
  const q = () => page.evaluate(() => (document.querySelector('.lesson-main, main')?.innerText || '').split('\n').slice(0, 2).join('|')); // tipo + enunciado (as palavras do banco são embaralhadas a cada abertura)
  const before = await q();
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText(counter);
  await wait(400);
  const after = await q();
  if (before !== after) throw new Error(`voltou outro exercício:\n antes: ${before}\n depois: ${after}`);
}
await test('prova: volta na mesma pergunta se a página recarregar', async () => {
  await open('/prova/unidade/a1-u6');
  // o teste anterior deixou esta prova pela metade: ela já abre retomada, sem a tela de início
  if ((await text()).includes('Já sabe esta unidade?')) await click('Começar');
  await expectText('1/12');
  await sameAfterReload('1/12');
});
await test('treino: volta no mesmo exercício se a página recarregar', async () => {
  await open('/praticar'); await click('Começar treino'); await expectText('1/12');
  await sameAfterReload('1/12');
});
await test('revisão de erros: volta no mesmo exercício se a página recarregar', async () => {
  await open('/revisao'); await click('Começar revisão'); await expectText('1/3');
  await sameAfterReload('1/3');
});
await test('teste de nível: volta na mesma pergunta se a página recarregar', async () => {
  await open('/nivelamento'); await click('Começar o teste');
  await page.waitForFunction(() => /\b1\/\d+\b/.test(document.body.innerText));
  const counter = await page.evaluate(() => document.body.innerText.match(/\b1\/\d+\b/)?.[0]);
  if (!counter) throw new Error('não achei o contador do teste');
  await sameAfterReload(counter);
});
await test('tirar dúvidas: a conversa continua depois de recarregar', async () => {
  await open('/duvidas');
  await wait(800);
  await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Fechar')?.click());
  await page.type('.dv-bar input', 'Qual a diferença entre these e those?');
  await page.click('.dv-bar button[type=submit]');
  await expectText('Estes sapatos são novos.');
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText('Estes sapatos são novos.');
});
await test('conversa: as falas continuam depois de recarregar', async () => {
  await open('/conversar');
  await page.evaluate(() => document.querySelector('.sc-card')?.click());
  await page.waitForSelector('.conv-in input');
  await page.type('.conv-in input', 'Hello, I would like a coffee please');
  await page.click('.conv-in button[type=submit]');
  await wait(1500);
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText('Hello, I would like a coffee please');
});

// ---------- ensino: desafio, enunciados em inglês, lição adaptativa e escrita sem ajuda ----------
await test('desafio da unidade: escreve, recebe a correção e o resultado continua depois de recarregar', async () => {
  await open('/aprender');
  await expectText('Desafio escrito');
  await open('/desafio/a1-u1');
  await expectText('Sua tarefa');
  await page.type('.dz-in', 'I get up at seven. I have breakfast. He work in a bank.');
  await click('Enviar para correção');
  await expectText('Você já consegue');
  await expectText('He works in a bank');
  await page.reload({ waitUntil: 'networkidle0' });
  await expectText('Você já consegue');
});

await test('A2 em diante: enunciados em inglês', async () => {
  await open('/prova/nivel/A2');
  if ((await text()).includes('Prova do nível A2')) await click('Começar');
  await page.waitForSelector('.q-label');
  const r = await page.evaluate(() => {
    const PT = ['O que significa?', 'Monte a frase em inglês', 'Escreva em inglês', 'Complete a frase', 'Ouça e escolha o significado', 'Ouça e escreva em inglês'];
    const ls = [...document.querySelectorAll('.q-label')];
    return { en: ls.some(l => l.lang === 'en'), pt: ls.some(l => PT.includes(l.textContent.trim())), txt: ls.map(l => l.textContent).join(' | ') };
  });
  // enunciados padrão têm de estar em inglês; os próprios do exercício ("Responda:", "Complete com...") vêm do conteúdo
  if (r.pt) throw new Error('enunciado padrão do A2 em português: ' + r.txt);
});

await test('lição adaptativa: pula o que já domina e pede a frase sem ajuda', async () => {
  const lesson = JSON.parse(fs.readFileSync('src/content/a1/unit-01.json', 'utf8')).lessons[0];
  await page.evaluateOnNewDocument((ids) => {
    try {
      const far = new Intl.DateTimeFormat('en-CA').format(new Date(Date.now() + 30 * 864e5));
      const m = { [ids[0]]: { b: 5, d: far, n: 6, w: 0, t: 1 }, [ids[1]]: { b: 5, d: far, n: 6, w: 0, t: 1 }, [ids[2]]: { b: 2, d: far, n: 2, w: 0, t: 1 } };
      if (!sessionStorage.getItem('mem-set')) {
        localStorage.setItem('sacou-memoria:00000000-0000-4000-8000-0000000000d1', JSON.stringify(m));
        for (const k of Object.keys(localStorage)) if (k.startsWith('sacou-licao-andamento:')) localStorage.removeItem(k); // outro teste deixou esta lição pela metade
        sessionStorage.setItem('mem-set', '1');
      }
    } catch {}
  }, [lesson.items[0].id, lesson.items[1].id, lesson.items[5].id]);
  await open('/licao/' + lesson.id);
  await expectText('Você já domina 2 exercícios');
  await expectText('1/4');
  const tap = (sel, t) => page.evaluate((sel, t) => { const el = [...document.querySelectorAll(sel)].find(e => !e.disabled && e.textContent.replace(/\s+/g, ' ').trim().replace(/^\d+/, '') === t); el?.click(); return !!el; }, sel, t);
  for (const it of lesson.items.slice(2, 5)) {
    if (it.type === 'match') for (const [en, pt] of it.pairs) { await tap('.match-col:first-child .mbtn', en); await wait(80); await tap('.match-col:last-child .mbtn', pt); await wait(80); }
    else { await tap('.options .option', it.answer); await wait(100); await page.click('.bar .cta'); }
    await wait(350); await page.click('.bar .cta'); await wait(350);
  }
  await expectText('Agora é com você');
  await page.type('.type-in', lesson.items[5].answer);
  await page.click('.bar .cta');
  await page.waitForSelector('.bar.ok', { timeout: 5000 }).catch(() => { throw new Error('a frase escrita sem ajuda não foi aceita'); });
});

await test('meu progresso: retrato por habilidade e o que já consigo fazer', async () => {
  await open('/progresso');
  await expectText('Seu inglês por habilidade');
  await expectText('exercícios firmes');
  await expectText('O que você já consegue fazer');
  await expectText('Consigo');
  if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) throw new Error('rolagem lateral em Meu progresso');
});

await test('A1 completo: lições novas aparecem como NOVA, abrem e não travam a trilha', async () => {
  await open('/aprender');
  await wait(1500);
  const r = await page.evaluate(() => ({ extra: document.querySelectorAll('.tr-node.extra').length, cur: document.querySelectorAll('.tr-node.current').length }));
  if (r.extra < 3) throw new Error(`esperava as lições novas como extra, veio ${r.extra}`);
  if (r.cur !== 1) throw new Error('a lição atual sumiu');
  await expectText('Minha rotina'); // a trilha continua na unidade 6
  await open('/licao/a1-u1-l8');
  await expectText('O que significa?');
  await expectText('Nice to meet you!');
  await open('/licao/a1-u1-l10');
  await expectText('Mensagem da Julia');
});

await test('falar: "não posso falar agora" abre as palavras para montar a frase', async () => {
  const lesson = JSON.parse(fs.readFileSync('src/content/a1/unit-01.json', 'utf8')).lessons.find(l => l.id === 'a1-u1-l9');
  await page.evaluateOnNewDocument(() => { try { for (const k of Object.keys(localStorage)) if (k.startsWith('sacou-licao-andamento:')) localStorage.removeItem(k); } catch {} });
  await open('/licao/' + lesson.id);
  await wait(800);
  const tap = (sel, t) => page.evaluate((sel, t) => { const el = [...document.querySelectorAll(sel)].find(e => !e.disabled && e.textContent.replace(/\s+/g, ' ').trim().replace(/^\d+\s*/, '') === t); el?.click(); return !!el; }, sel, t);
  // responde o que estiver na tela até chegar no exercício de falar
  const answers = lesson.items.filter(i => i.type === 'listen').map(i => i.answer);
  const dict = lesson.items.filter(i => i.type === 'dictation').map(i => i.en);
  for (let step = 0, d = 0; step < 25 && !(await text()).includes('Não posso falar agora'); step++) {
    if (await page.$('.options .option')) { for (const t of answers) if (await tap('.options .option', t)) break; }
    else if (await page.$('.type-in')) await page.type('.type-in', dict[d++] || '');
    await wait(150);
    if (await page.$('.bar .cta:not([disabled])')) await page.click('.bar .cta');
    await wait(400);
    if (await page.$('.bar.ok, .bar.bad')) { await page.click('.bar .cta'); await wait(400); }
  }
  await click('Não posso falar agora');
  await expectText('monte a frase em inglês');
  // a frase em inglês não pode ficar na tela (senão é só copiar)
  const shown = await page.evaluate(() => { const m = document.querySelector('.lesson-main') || document.body; const c = m.cloneNode(true); c.querySelectorAll('.quiet-build').forEach(e => e.remove()); return /nice to meet you/i.test(c.textContent); });
  if (shown) throw new Error('a frase aparece na tela enquanto o aluno monta');
  for (const w of ['Nice', 'to', 'meet', 'you']) { await tap('.quiet-build .bank .tile:not(.used)', w); await wait(120); }
  await page.waitForSelector('.bar.ok', { timeout: 5000 }).catch(() => { throw new Error('a frase montada não foi aceita'); });
});

await test('A1 completo: unidades novas (9 em diante) na trilha, com guia', async () => {
  const novas = fs.readdirSync('src/content/a1').map(f => JSON.parse(fs.readFileSync('src/content/a1/' + f, 'utf8'))).filter(u => u.order >= 9);
  await open('/aprender');
  for (const u of novas) await expectText(u.title);
  for (const u of novas) {
    await open('/guia/' + u.id);
    await expectText(u.guide.title);
    await expectText(u.guide.points[0].en.split(' / ')[0]);
  }
});

await browser.close();
await server.close();

const fails = results.filter(r => !r[0]);
for (const [ok, name, msg] of results) console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : ` — ${msg}`}`);
console.log(`\n${results.length - fails.length}/${results.length} testes passaram.`);
process.exit(fails.length ? 1 : 0);
