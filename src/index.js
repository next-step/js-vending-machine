import './components/index.js';
import { ROUTER } from './constants.js';
import router from './routes.js';
import { $element } from './helpers/index.js';

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
        <a href="${ROUTER.PRODUCT}" id="product-manage-menu">
          <button class="nav-button" data-route="product" tabindex="-1">상품 관리</button>
        </a>
        <a href="${ROUTER.CHARGE}" id="vending-machine-manage-menu">
          <button class="nav-button" data-route="charge" tabindex="-1">잔돈 충전</button>
        </a>
        <a href="${ROUTER.PURCHASE}" id="product-purchase-menu">
          <button class="nav-button" data-route="purchase" tabindex="-1">상품 구매</button>
        </a>
      </nav>
    </header>
    <main></main>
  </div>`);

document.body.insertAdjacentElement('afterbegin', AppTemplate);

router
  .addRoute(ROUTER.PRODUCT, '<machine-product></machine-product>')
  .addRoute(ROUTER.CHARGE, '<machine-charge></machine-charge>')
  .addRoute(ROUTER.PURCHASE, '<machine-purchase></machine-purchase>')
  .setNotFound('<not-found></not-found>')
  .addEvents(activeButton)
  .start(document.querySelector('main'));
