import Product from '../../Model/Product/Product.js';
import ProductManageMenu from '../../View/Template/ProductManageMenu.js';
import ProductPurchaseMenu from '../../View/Template/ProductPurchaseMenu.js';
import VendingMachineManageMenu from '../../View/Template/VendingMachineManageMenu.js';
import Employee from '../Controller/Employee.js';

const Event = (function () {
  const employee = Employee.of();

  return {
    router: {
      click(event) {
        if (event.target.id === 'product-manage-menu') {
          ProductManageMenu.of().mount();
          employee.display();
        }

        if (event.target.id === 'vending-machine-manage-menu') {
          VendingMachineManageMenu.of().mount();
        }

        if (event.target.id === 'product-purchase-menu') {
          ProductPurchaseMenu.of().mount();
        }
      },
    },

    product: {
      submit(event) {
        event.preventDefault();

        const form = event.path[0];
        const product = Product.of({
          name: form.querySelector('#product-name-input').value,
          price: form.querySelector('#product-price-input').value,
          quantity: form.querySelector('#product-quantity-input').value,
        });

        if (!employee.isPassProductValidation(product)) {
          return;
        }

        employee.update(product);
      },
    },
  };
})();

export default Event;
