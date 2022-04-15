import store from './store/index.js';
import ChargeChange from './view/chargeChange/index.js';
import { headerActive } from './view/common.js';
import Product from './view/productManagement/index.js';
import PurchaseProduct from './view/purchaseProduct/index.js';

class App {
  constructor() {
    store.init();

    this.$productManagement = new Product();
    this.$chargeChange = new ChargeChange();
    this.$purchaseProduct = new PurchaseProduct();

    document.querySelector('header').addEventListener('click', this.handleHeaderMenu);
  }

  handleHeaderMenu = (e) => {
    if (e.target.tagName === 'BUTTON') {
      headerActive(e.target);
      this.tabMenuRender();
    }
  };

  tabMenuRender() {
    const menuName = document.querySelector('header button.active').dataset.menuName;
    this[`$${menuName}`].render();
    this[`$${menuName}`].setEvent();
  }
}

export default App;
