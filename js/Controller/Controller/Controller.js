import VendingMachine from '../../Model/VendingMachine/VendingMachine.js';
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
        const productInfoValidate = vendingMachine.validate();
        if (productInfoValidate instanceof Error) {
          alert(productInfoValidate.message);
          return;
        }

        Component.product.removePreviousComponent();

        vendingMachine.setProduct();

        const name = vendingMachine.getName,
          price = vendingMachine.getPrice,
          quantity = vendingMachine.getQuantity,
          productList = vendingMachine.getProductList;

        productList.forEach((product) => {
          // FIXME N회 랜더링 수정
          const trComponent = Component.product.create([
            product.name,
            product.price,
            product.quantity,
          ]);
          Component.product.render(trComponent);
        });

        Component.product.init();
        vendingMachine.init();
      },
    },
  };
})();

export default Controller;
