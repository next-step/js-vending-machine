import { $ } from './dom.js';
import VendingMachine from './VendingMachine.js';
import store from './store/store.js';

class App {
  constructor() {
    const $app = $('#app');

    store.subscribe(() => {
      new VendingMachine($app);
    });

    this.initStore();
  }

  initStore() {
    store.dispatch('');
  }
}

new App();
