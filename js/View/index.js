import { selector } from '../util/consts.js';
import ProductCharge from './Component/ProductCharge.js';
import ProductHandlingBoard from './Component/ProductHandlingBoard.js';
import Router from './Component/Router.js';

const Component = (function () {
  return {
    router: {
      render() {
        selector('#app').innerHTML = `
          <h1>🧃 자판기 미션 🧃</h1>
          <vending-machine-router></vending-machine-router>
          <product-handling-board></product-handling-board>
        `;
      },
    },
    product: {
      init() {
        selector('product-handling-board').shadowRoot.querySelector(
          '#product-name-input'
        ).value = '';
        selector('product-handling-board').shadowRoot.querySelector(
          '#product-price-input'
        ).value = '';
        selector('product-handling-board').shadowRoot.querySelector(
          '#product-quantity-input'
        ).value = '';
      },

      define() {
        customElements.define('vending-machine-router', Router);
        customElements.define('product-handling-board', ProductHandlingBoard);
        customElements.define('product-inventory', ProductCharge);
      },

      create(priceInfo) {
        const tr = document.createElement('tr');
        const fragment = document.createDocumentFragment();
        priceInfo.forEach((info) => {
          const th = document.createElement('td');
          th.textContent = info;
          fragment.appendChild(th);
        });
        tr.appendChild(fragment);
        return tr;
      },

      render(element) {
        selector('product-handling-board')
          .shadowRoot.querySelector('product-inventory')
          .shadowRoot.querySelector('#product-inventory-container')
          .appendChild(element);
      },

      removePreviousComponent() {
        // FIXME 일괄 삭제 고려
        selector('product-handling-board')
          .shadowRoot.querySelector('product-inventory')
          .shadowRoot.querySelector('#product-inventory-container')
          .querySelectorAll('tr')
          .forEach((tag) => tag.remove());
      },
    },
  };
})();

export default Component;
