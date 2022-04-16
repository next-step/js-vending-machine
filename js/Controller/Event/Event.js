import { selector } from '../../util/consts.js';
import Controller from '../Controller/Controller.js';

const Event = (function () {
  return {
    router: {
      init() {
        const router = selector('#router');
        router.addEventListener('click', this.seperateEventTarget);
      },

      // TODO router 구현
      seperateEventTarget(event) {
        if (event.target.id === 'vending-machine-manage-menu') {
        }
        if (event.target.id === 'product-manage-menu') {
        }
        if (event.target.id === 'product-purchase-menu') {
        }
      },
    },

    product: {
      init() {
        const name = selector('#product-name-input'),
          price = selector('#product-price-input'),
          quantity = selector('#product-quantity-input'),
          { productContainer } = Controller.product;

        name.addEventListener('keydown', productContainer);
        price.addEventListener('keydown', productContainer);
        quantity.addEventListener('keydown', productContainer);
      },
    },
  };
})();

export default Event;
