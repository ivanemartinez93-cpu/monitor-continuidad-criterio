import './style.css';
import { getLatestRun } from './service.js';
import { showLoading, showError, showRun, showEmpty } from './ui.js';
import { updateMonitor } from './controller.js';
const refresh = document.querySelector('#refresh');
const update = () => updateMonitor(getLatestRun, { showLoading, showError, showRun, showEmpty });
refresh.addEventListener('click', update);
update();


