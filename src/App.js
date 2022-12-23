import ManageProducts from './components/ManageProducts.js';
import PurchaseProduct from './components/PurchaseProduct.js';
import ChargingMoney from './components/ChargingMoney.js';
import { init, routeChange } from './router.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);

    if (pathname === '/' || pathname === '/ManageProducts') {
      new ManageProducts({ $target });
    } else if (pathname === '/ChargingMoney') {
      new ChargingMoney({ $target });
    } else if (pathname === '/PurchaseProduct') {
      new PurchaseProduct({ $target });
    }
  };

  init(this.route);
  this.route();

  document.querySelector('.tabs').addEventListener('click', event => {
    const url = event.target.id;
    routeChange(`/${url}`);
  });
}
