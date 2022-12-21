import { COMPONENTS } from './constants/components.js';
import { SELECTOR } from './constants/selector.js';
import { $ } from './utils/dom.js';

import './App.js';

const $app = $(SELECTOR.COMMON.APP);

$app.innerHTML = COMPONENTS.APP;
