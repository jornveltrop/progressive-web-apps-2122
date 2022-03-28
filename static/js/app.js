import { enhanchedDetail } from './modules/enhanchedDetail.js';
import { serviceWorker } from './modules/serviceWorker.js';

function init() {
    enhanchedDetail();
    serviceWorker();
}

init();
