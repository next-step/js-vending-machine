import store from './store/index.js';
import { getParam } from './utils/index.js';
import ChargeChange from './view/chargeChange/index.js';
import PurchaseProduct from './view/purchaseProduct/index.js';
import { STORE_KEY } from './constants/store/index.js';
import ProductManagement from './view/productManagement/index.js';

class App {
  constructor() {
    const tabMenuName = getParam('tab') ?? STORE_KEY.PRODUCT_MANAGEMENT;
    this.store = new store();

    this.productManagementView = new ProductManagement({
      store: this.store,
    });
    this.chargeChangeView = new ChargeChange();
    this.purchaseProductView = new PurchaseProduct();

    this.render(tabMenuName);
    this.setEvent();
  }

  handleHeaderMenu = (e) => {
    if (e.target.dataset.menuName) {
      const tabMenuName = e.target.dataset.menuName;
      this.render(tabMenuName);
    }
  };

  headerActive = (tabMenuName) => {
    const $TabMenu = document.querySelector(`header nav button[data-menu-name="${tabMenuName}"]`);

    document.querySelectorAll('header nav button').forEach(($Button) => {
      $Button.classList.remove('active');
    });
    $TabMenu.classList.add('active');
  };

  setEvent() {
    document.querySelector('header nav').addEventListener('click', this.handleHeaderMenu);
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      this.store.setLocalStorage();
    });
  }

  setRoute(tabMenuName) {
    window.history.pushState({}, 'tabMenu', `?tab=${tabMenuName}`);
  }

  render(tabMenuName) {
    this.store.setState({ key: 'tabMenuName', value: tabMenuName });
    this.headerActive(tabMenuName);
    this.setRoute(tabMenuName);

    this[`${tabMenuName}View`].render();
  }
}

export default App;
