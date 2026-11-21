// Regras da trilha (lições novas não travam quem já passou daquele ponto). Uso: node tests/unit/trail-rules.mjs
import assert from 'node:assert/strict';
import { statesOf, unitComplete, coreOf } from '../../src/lib/trail-rules.js';

const L = (id, added) => ({ id, ...(added ? { added: '2026-11' } : {}) });
// unidade 1 com uma lição nova no meio, unidade 2 inteira nova, depois o A2
const lessons = [L('u1-l1'), L('u1-l2'), L('u1-l8', 1), L('u1-l3'), L('u2-l1', 1), L('u2-l2', 1), L('a2-l1'), L('a2-l2')];
const s = (done) => statesOf(lessons, new Set(done));

// aluno novo: tudo em ordem, a lição nova faz parte do caminho
assert.deepEqual(s([]), ['current', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked']);
assert.deepEqual(s(['u1-l1', 'u1-l2']), ['done', 'done', 'current', 'locked', 'locked', 'locked', 'locked', 'locked']);
// aluno que já estava no A2: as lições novas viram extras e o A2 continua liberado
assert.deepEqual(s(['u1-l1', 'u1-l2', 'u1-l3', 'a2-l1']), ['done', 'done', 'extra', 'done', 'extra', 'extra', 'done', 'current']);
// aluno que terminou a unidade 1 antiga e não começou mais nada: a unidade nova é o caminho normal
assert.deepEqual(s(['u1-l1', 'u1-l2', 'u1-l3']), ['done', 'done', 'extra', 'done', 'current', 'locked', 'locked', 'locked']);
// unidade concluída conta só as lições originais; unidade inteira nova conta todas
assert.equal(unitComplete(lessons.slice(0, 4), new Set(['u1-l1', 'u1-l2', 'u1-l3'])), true);
assert.equal(unitComplete(lessons.slice(4, 6), new Set(['u2-l1'])), false);
assert.equal(coreOf(lessons.slice(4, 6)).length, 2);
// lição bônus numa unidade inteira nova não conta para concluir a unidade
const comBonus = [...lessons.slice(4, 6), { id: 'u2-l11', added: '2026-11', bonus: true }];
assert.equal(unitComplete(comBonus, new Set(['u2-l1', 'u2-l2'])), true);
console.log('✓ regras da trilha: 8 verificações passaram');
