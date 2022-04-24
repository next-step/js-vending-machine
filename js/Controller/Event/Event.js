import Product from '../../Model/Product/Product.js';
import ProductManageMenu from '../../View/Template/ProductManageMenu.js';
import Employee from '../Controller/Employee.js';

const Event = (function () {
  const employee = Employee.of();
  return {
    router: {
      click(event) {
        if (event.target.id === 'product-manage-menu') {
          ProductManageMenu.of().render(); // 화면을 그려주고
          // 스토리지에서 상품을 가져와서

          //TODO storage에서 직원이 꺼내오고 렌더링
          employee.getProduct();
          employee.display();
        }

        if (event.target.id === 'vending-machine-manage-menu') {
        }

        if (event.target.id === 'product-purchase-menu') {
        }
      },
    },

    product: {
      keydown(event) {
        console.log(event.target);
      },

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

        // 1. 같은 부분이 있다면 view 대체하기
        // 2. localstorage에 최신화 하기
        employee.update(product);
        //
      },
    },
  };
})();

export default Event;
