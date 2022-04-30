import Router from './View/Component/Router.js';
import UserPurchase from './View/Component/UserPurchase.js';
import CashBox from './View/Component/CashBox.js';
import ProductDashboard from './View/Component/Product/ProductDashboard.js';
import ProductManageMenu from './View/Template/ProductManageMenu.js';
import ProductInventory from './View/Component/Product/ProductInventory.js';
import Employee from './Controller/Controller/Employee.js';

const init = () => {
  customElements.define('vending-machine-router', Router);
  customElements.define('product-inventory', ProductInventory);
  customElements.define('product-dashboard', ProductDashboard);
  customElements.define('user-purchase', UserPurchase);
  customElements.define('cash-box', CashBox);

  ProductManageMenu.of().mount();
  Employee.of().display();
};

window.addEventListener('DOMContentLoaded', init);
