import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getLatestRun, parseRuns } from '../src/service.js';
import { updateMonitor } from '../src/controller.js';

const run = { status: 'completed', conclusion: 'success', created_at: '2026-11-13T12:00:00Z', html_url: 'https://github.com/ivanemartinez93-cpu/tablero-continuidad-ia-demo/actions/runs/123' };
const response = body => async () => ({ ok: true, json: async () => body });
test('consulta válida conserva el resultado y la fecha', async () => assert.deepEqual(await getLatestRun(response({ workflow_runs: [run] })), run));
test('lista vacía es un estado válido', async () => assert.equal(await getLatestRun(response({ workflow_runs: [] })), null));
test('respuesta sin lista o con lista inválida se rechaza', () => { for (const data of [null, {}, {workflow_runs: 'invalid'}]) assert.throws(() => parseRuns(data), /formato inválido/); });
test('ejecución con enlace externo se rechaza', () => assert.throws(() => parseRuns({workflow_runs: [{...run, html_url:'https://example.com'}]}), /no es válida/));
test('error HTTP y red se propagan', async () => { await assert.rejects(getLatestRun(async () => ({ok:false,status:404})), /HTTP 404/); await assert.rejects(getLatestRun(async () => {throw Error('sin red');}), /sin red/); });
function recorder() { const calls=[]; return { calls, ui: { showLoading: v => calls.push(['loading',v]), showRun: v => calls.push(['run',v]), showEmpty: () => calls.push(['empty']), showError: v => calls.push(['error',v]) } }; }
test('ciclo de carga muestra ejecución y finaliza', async () => { const {calls,ui}=recorder(); await updateMonitor(async () => run,ui); assert.deepEqual(calls,[['loading',true],['run',run],['loading',false]]); });
test('ciclo de carga muestra vacío y finaliza', async () => { const {calls,ui}=recorder(); await updateMonitor(async () => null,ui); assert.deepEqual(calls,[['loading',true],['empty'],['loading',false]]); });
test('ciclo de carga muestra error y finaliza', async () => { const {calls,ui}=recorder(); await updateMonitor(async () => {throw Error('sin red');},ui); assert.deepEqual(calls,[['loading',true],['error','sin red'],['loading',false]]); });

