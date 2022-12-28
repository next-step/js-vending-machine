import ManageProductsPage from './js/components/pages/ManageProductsPage.js';
import PurchaseProduct from './js/components/PurchaseProduct.js';
import ChargingMoneyPage from './js/components/pages/ChargingMoneyPage.js';
import { init } from './router.js';

export default function App({ $target }) {
  this.getEndPoint = pathname => {
    const endPoint = pathname.split('/');
    return endPoint[endPoint.length - 1];
  };

  this.route = () => {
    const { pathname } = location;
    console.log(pathname);
    const endPoint = this.getEndPoint(pathname);
    console.log(endPoint);
    this.$target = $target;
    this.$target.innerHTML = '';

    switch (endPoint) {
      case 'manage-products':
        new ManageProductsPage({ $target }).render();
        break;
      case 'charging-money':
        new ChargingMoneyPage({ $target }).render();
        break;
      case 'purchase-product':
        new PurchaseProduct({ $target });
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
