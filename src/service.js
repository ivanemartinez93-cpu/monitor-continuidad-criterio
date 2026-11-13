const base = import.meta.env?.VITE_API_URL || 'https://api.github.com';
const path = '/repos/ivanemartinez93-cpu/tablero-continuidad-ia-demo/actions/workflows/actualizar.yml/runs?per_page=1';
const allowedUrl = 'https://github.com/ivanemartinez93-cpu/tablero-continuidad-ia-demo/actions/runs/';

export function parseRuns(data) {
 if (!data || !Array.isArray(data.workflow_runs)) throw new Error('La respuesta de GitHub tiene un formato inválido.');
 if (data.workflow_runs.length === 0) return null;
 const run = data.workflow_runs[0];
 if (!run || typeof run.status !== 'string' || typeof run.created_at !== 'string' || typeof run.html_url !== 'string' || !run.html_url.startsWith(allowedUrl)) throw new Error('La ejecución recibida no es válida.');
 return run;
}

export async function getLatestRun(fetcher = fetch) {
 const response = await fetcher(base.replace(/\/$/, '') + path, { headers: { Accept: 'application/vnd.github+json' } });
 if (!response.ok) throw new Error(`GitHub respondió HTTP ${response.status}. Intentá nuevamente más tarde.`);
 return parseRuns(await response.json());
}

