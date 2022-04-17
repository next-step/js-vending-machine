import './components/index.js';
import { $element } from './helpers/index.js';
import router from './routes.js';

const AppTemplate = $element(/*html*/ `
  <div id="app">
    <header>
      <div>
        <h1>🏧자판기🏧</h1>
      </div>
      <nav>
        <a href="#/product" id="product-manage-menu"><button>상품 관리</button></a>
        <a href="#/charge" id="vending-machine-manage-menu"><button>잔돈 충전</button></a>
        <a href="#/purchase" id="product-purchase-menu"><button>상품 구매</button></a>
      </nav>
    </header>
    <main></main>
  </div>`);

document.body.insertAdjacentElement('afterbegin', AppTemplate);

router
  .addRoute('#/product', '<machine-product></machine-product>')
  .addRoute('#/charge', '<machine-charge></machine-charge>')
  .addRoute('#/purchase', '<machine-purchase></machine-purchase>')
  .setNotFound('<not-found></not-found>')
  .start(document.querySelector('main'));
