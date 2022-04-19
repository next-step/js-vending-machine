import { selector } from '../../util/consts.js';
import Component from '../../View/index.js';
import Controller from '../Controller/Controller.js';

const Event = (function () {
  return {
    router: {
      init() {
        const router = selector('vending-machine-router');
        router.addEventListener('click', this.seperateEventTarget);
      },

      // TODO router 구현
      // DOMContentLoaded를 통해
      // 해당 페이지에 이동하면 state를 통해 DOM을 렌더링
      seperateEventTarget(event) {
        if (event.target.id === 'vending-machine-manage-menu') {
          console.log('vending-machine');
        }
        if (event.target.id === 'product-manage-menu') {
          console.log('manage-menu');
        }
        if (event.target.id === 'product-purchase-menu') {
          console.log('product-purchase');
        }
      },
    },

    product: {
      init() {
        const shadowDOMSelector = selector('product-handling-board').shadowRoot;

        const name = shadowDOMSelector.querySelector('#product-name-input'),
          price = shadowDOMSelector.querySelector('#product-price-input'),
          quantity = shadowDOMSelector.querySelector('#product-quantity-input'),
          createButton = shadowDOMSelector.querySelector('#product-add-button');

        name.addEventListener('keyup', this.seperateProductInfo);
        price.addEventListener('keyup', this.seperateProductInfo);
        quantity.addEventListener('keyup', this.seperateProductInfo);
        createButton.addEventListener('click', this.seperateProductInfo);
      },

      seperateProductInfo(event) {
        const { id, value } = event.target;
        const { product } = Controller;
        const isKeyTypeEnter = event.key === 'Enter';
        const hasClicked =
          event.type === 'click' && id === 'product-add-button';

        if (hasClicked || isKeyTypeEnter) {
          product.add(value);
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
