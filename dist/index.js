import el from './util/dom.js';
import { connectStore } from './store/index.js';
import actionWorker from './store/actionWorker.js';
import './view/index.js';
(() => {
    const $app = el('<vending-machine-app id="app">');
    const store = connectStore($app, actionWorker);
    store.dispatch("init" /* init */);
    document.body.insertAdjacentElement('afterbegin', $app);
})();
//# sourceMappingURL=index.js.map