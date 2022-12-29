import ManageProductsPage from './js/components/pages/ManageProductsPage.js';
import PurchaseProductPage from './js/components/pages/PurchaseProductPage.js';
import ChargingMoneyPage from './js/components/pages/ChargingMoneyPage.js';
import { init } from './router.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    this.$target = $target;
    this.$target.innerHTML = '';

    switch (pathname) {
      case '/manage-products':
        new ManageProductsPage({ $target }).render();
        break;
      case '/charging-money':
        new ChargingMoneyPage({ $target }).render();
        break;
      case '/purchase-product':
        new PurchaseProductPage({ $target }).render();
        break;
      default:
        new ManageProductsPage({ $target }).render();
    }
  };

  init(this.route);
  this.route();

  // 뒤로가기, 앞으로가기 할때
  window.addEventListener('popstate', this.route);
}
