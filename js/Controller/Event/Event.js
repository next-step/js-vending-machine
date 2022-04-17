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
          createButton = selector('#product-add-button');

        name.addEventListener('keyup', this.seperateProductInfo);
        price.addEventListener('keyup', this.seperateProductInfo);
        quantity.addEventListener('keyup', this.seperateProductInfo);
        createButton.addEventListener('click', this.seperateProductInfo);
      },

      submitProduct(event) {
        const { id, value } = event.target;
        const { product } = Controller;

        product.act(value);
      },

      seperateProductInfo(event) {
        const { id, value } = event.target;
        const { product } = Controller;

        if (
          event.type === 'click' &&
          event.target.id === 'product-add-button'
        ) {
          product.act(value);
        }

        if (event.key === 'Enter') {
          product.act(value);
        }

        if (id === 'product-name-input') {
          product.handleName(value);
        }

        if (id === 'product-price-input') {
          product.handlePrice(value);
        }

        if (id === 'product-quantity-input') {
          product.handleQuantity(value);
        }
      },
    },
  };
})();

export default Event;
