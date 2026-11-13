const status = document.querySelector('#status');
const result = document.querySelector('#result');
const refresh = document.querySelector('#refresh');
export function showLoading(loading) { refresh.disabled = loading; if (loading) { status.textContent = 'Consultando GitHub…'; result.hidden = true; } }
export function showError(message) { status.textContent = `No se pudo consultar la actualización. ${message}`; result.hidden = true; }
export function showEmpty() { status.textContent = 'No hay ejecuciones registradas.'; result.hidden = true; }
export function showRun(run) {
 const labels = {success:'Exitosa', failure:'Fallida', cancelled:'Cancelada', skipped:'Omitida', timed_out:'Agotó el tiempo'};
 const active = {queued:'En cola', in_progress:'En curso', requested:'Solicitada', waiting:'En espera'};
 document.querySelector('#conclusion').textContent = run.status === 'completed' ? (labels[run.conclusion] || 'Finalizada: resultado desconocido') : (active[run.status] || 'Estado no reconocido');
 const date = new Date(run.created_at);
 document.querySelector('#date').textContent = Number.isNaN(date.valueOf()) ? 'Fecha desconocida' : date.toLocaleString('es-AR');
 document.querySelector('#event').textContent = run.event === 'schedule' ? 'Programada' : run.event === 'workflow_dispatch' ? 'Manual' : (run.event || 'Desconocido');
 document.querySelector('#run-link').href = run.html_url;
 status.textContent = 'Consulta realizada correctamente.'; result.hidden = false;
}


