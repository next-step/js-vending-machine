import ManageProducts from './components/ManageProducts.js';
import PurchaseProduct from './components/PurchaseProduct.js';
import ChargingMoney from './components/ChargingMoney.js';
import { init } from './router.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);

    if (pathname === '/' || pathname === '/manage-products') {
      new ManageProducts({ $target });
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
