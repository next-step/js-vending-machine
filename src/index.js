import './components/index.js';
import { $element } from './helpers/index.js';
import router from './routes.js';

const activeButton = () => {
  document.querySelectorAll('.nav-button').forEach(button => {
    const page = button.getAttribute('data-route');
    if (`#/${page}` !== location.hash) button.classList.remove('active');
    else button.classList.add('active');
  });
};

const AppTemplate = $element(/*html*/ `
  <div id="app">
    <header>
      <div>
        <h1>🏧자판기🏧</h1>
      </div>
      <nav>
        <a href="#/product" id="product-manage-menu">
          <button class="nav-button" data-route="product">상품 관리</button>
        </a>
        <a href="#/charge" id="vending-machine-manage-menu">
          <button class="nav-button" data-route="charge">잔돈 충전</button>
        </a>
        <a href="#/purchase" id="product-purchase-menu">
          <button class="nav-button" data-route="purchase">상품 구매</button>
        </a>
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
  .addEvents(activeButton)
  .start(document.querySelector('main'));
