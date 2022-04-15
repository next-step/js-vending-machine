import VendingMachine from './VendingMachine.js';

import { SELECTOR } from './constants.js';
import { $ } from './utils/dom.js';

new VendingMachine($(`#${SELECTOR.APP_ID}`));
