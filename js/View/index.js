import ProductCharge from './Component/ProductCharge.js';
import ProductElement from './Component/ProductElement.js';

const Component = (function () {
  return {
    product: {
      init() {
        customElements.define('product-inventory', ProductCharge);
        // customElements.define('product', ProductElement);
      },

      create(priceInfo) {
        const tr = document.createElement('tr');
        const fragment = document.createDocumentFragment();
        priceInfo.forEach((info) => {
          const th = document.createElement('th');
          th.textContent = info;
          fragment.appendChild(th);
        });
        tr.appendChild(fragment);
        return tr;
      },

      render(target, element) {
        console.log(target);
        console.log(element);
        target.appendChild(element);
      },
    },
  };
})();

export default Component;
