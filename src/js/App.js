import store from './store/index.js';
import ChargeChange from './view/chargeChange/index.js';
import Product from './view/productManagement/index.js';
import PurchaseProduct from './view/purchaseProduct/index.js';

class App {
  constructor() {
    store.init();

    this.$productManagement = new Product();
    this.$chargeChange = new ChargeChange();
    this.$purchaseProduct = new PurchaseProduct();

    document.querySelector('header nav').addEventListener('click', this.handleHeaderMenu);
    this.tabMenuRender();
  }

  handleHeaderMenu = (e) => {
    if (e.target.tagName === 'BUTTON') {
      const menuName = e.target.dataset.menuName;

      store.setState({ key: 'menuName', value: menuName });
      this.tabMenuRender(menuName);
    }
  };

  tabMenuRender() {
    const menuName = store.getState()?.menuName;

    this.headerActive(menuName);
    this[`$${menuName}`].render();
    this[`$${menuName}`].setEvent();
  }

  headerActive = (menuName) => {
    const $TabMenu = document.querySelector(`header nav button[data-menu-name="${menuName}"]`);

    document.querySelectorAll('header nav button').forEach(($Button) => {
      $Button.classList.remove('active');
    });
    $TabMenu.classList.add('active');
  };
}

export default App;
