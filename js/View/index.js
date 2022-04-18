import { selector } from '../util/consts.js';
import ProductCharge from './Component/ProductCharge.js';

const Component = (function () {
  return {
    product: {
      init() {
        selector('#product-name-input').value = '';
        selector('#product-price-input').value = '';
        selector('#product-quantity-input').value = '';
      },

      define() {
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
        selector('product-inventory')
          .shadowRoot.querySelector('#product-inventory-container')
          .appendChild(element);
      },

      removePreviousComponent() {
        // FIXME 일괄 삭제 고려
        selector('product-inventory')
          .shadowRoot.querySelector('#product-inventory-container')
          .querySelectorAll('tr')
          .forEach((tag) => tag.remove());
      },
    },
  };
})();

export default Component;
