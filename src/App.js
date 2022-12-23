import ManageProductsPage from './js/components/ManageProductsPage.js';
import PurchaseProduct from './js/components/PurchaseProduct.js';
import ChargingMoney from './js/components/ChargingMoney.js';
import { init } from './router.js';

// 나중에 hosting 처리해주기
// const BASE_URL = 'js-vending-machine/';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);

    if (pathname === '/' || pathname === '/manage-products') {
      new ManageProductsPage({ $target }).render();
    } else if (pathname === '/charging-money') {
      new ChargingMoney({ $target });
    } else if (pathname === '/purchase-product') {
      new PurchaseProduct({ $target });
    }
  };

  init(this.route);
  this.route();

  // 뒤로가기, 앞으로가기 할때
  window.addEventListener('popstate', this.route);
}
