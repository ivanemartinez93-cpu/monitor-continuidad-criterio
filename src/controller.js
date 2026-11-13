export async function updateMonitor(service, ui) {
 ui.showLoading(true);
 try {
  const run = await service();
  if (run === null) ui.showEmpty();
  else ui.showRun(run);
 } catch (error) {
  ui.showError(error instanceof Error ? error.message : 'Error desconocido.');
 } finally {
  ui.showLoading(false);
 }
}

