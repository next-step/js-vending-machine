import { ProductManageController, TabController } from './controllers/index.js';

import { $ } from './utils/dom.js';
import { SELECTOR } from './constants.js';

class VendingMachine {
  constructor(target) {
    this.$productManageController = new ProductManageController(target);
    this.$tabController = new TabController(target);
    this.initEvents();
  }

  initEvents() {
    $(`#${SELECTOR.APP_ID}`).addEventListener('click', event => {
      if (event.target.id === SELECTOR.PRODUCT_ADD_BUTTON_ID) {
        this.$productManageController.addProduct();
      }
    });
  }
}

export default VendingMachine;
