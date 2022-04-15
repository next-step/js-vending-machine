import { SELECTOR } from '../constants.js';
import { TabModel } from '../models/index.js';
import { $ } from '../utils/dom.js';

class TabController {
  constructor() {
    this.menuModel = new TabModel();
    this.addEvent();
  }

  addEvent() {
    $(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.PRODUCT_PURCHASE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
    $(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).onclick = this.onClickMenu.bind(this);
  }

  onClickMenu(event) {
    this.menuModel.setCurrentTab(event.target.textContent);
  }
}

export default TabController;
