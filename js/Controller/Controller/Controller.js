import VendingMachine from '../../Model/VendingMachine/VendingMachine.js';
import { selector } from '../../util/consts.js';
import Component from '../../View/index.js';

const Controller = (function () {
  const vendingMachine = new VendingMachine();
  return {
    product: {
      handleName(value) {
        // TODO Domain으로 자료 넘겨서 validation 체크
        vendingMachine.setName = value;
      },

      handlePrice(value) {
        // TODO Domain으로 자료 넘겨서 validation 체크
        vendingMachine.setPrice = value;
      },

      handleQuantity(value) {
        // TODO Domain으로 자료 넘겨서 validation 체크
        vendingMachine.setQuantity = value;
      },

      act() {
        // TODO 하단 UI 보여주기
        const priceInfo = [
          vendingMachine.getName,
          vendingMachine.getPrice,
          vendingMachine.getQuantity,
        ];
        const product = Component.product.create(priceInfo);
        Component.product.render(
          selector('product-inventory').shadowRoot.querySelector(
            '#product-inventory-container'
          ),
          product
        );
      },
    },
  };
})();

export default Controller;
