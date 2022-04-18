import Validator from '../../Model/Validator.js';
import VendingMachine from '../../Model/VendingMachine/VendingMachine.js';
import { selector } from '../../util/consts.js';
import Component from '../../View/index.js';

const Controller = (function () {
  const vendingMachine = new VendingMachine();
  return {
    product: {
      handleName(value) {
        vendingMachine.setName = value;
      },

      handlePrice(value) {
        vendingMachine.setPrice = value;
      },

      handleQuantity(value) {
        vendingMachine.setQuantity = value;
      },

      add() {
        const name = vendingMachine.getName,
          price = vendingMachine.getPrice,
          quantity = vendingMachine.getQuantity;

        const productInfoValidate = vendingMachine.validate();
        if (productInfoValidate instanceof Error) {
          alert(productInfoValidate.message);
          return;
        }
        /* TODO
            1. 같은 상품명의 데이터를 추가하는지 확인
            2. 해당 상품으로 대체
            3. 다시 저장
        */
        window.state
          ? (window.state = [...window.state, { name, price, quantity }])
          : (window.state = [{ name, price, quantity }]);

        // FIXME window.state에 접근해 렌더링하여 유지보수성 올리기
        const product = Component.product.create([name, price, quantity]);
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
