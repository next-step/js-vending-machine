import { render } from '../binders.js';

function Product({ name, price, quantity }) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

export const products = [];

const productControllerInitState = {
  name: '',
  price: 0,
  quantity: 0,
}

export function productManagerController() {
  let state = productControllerInitState;
  const productNameInputRef = { element: null };
  const productPriceInputRef = { element: null };
  const productQuantityInputRef = { element: null };

  return {
    productNameInput: {
      ref: productNameInputRef,
      events: {change: (e) => {
        state.name = e.target.value;
      }},
    },
    productPriceInput: {
      ref: productPriceInputRef,
      events: {change: (e) => {
        state.price = e.target.value
      }},
    },
    productQuantityInput: {
      ref: productQuantityInputRef,
      events: {change: (e) => {
        state.quantity = e.target.value;
      }},
    },
    productAddButton: {
      events: {click: () => {
        // TODO: 입력한 state들의 validation 넣기
        products.push(new Product(state));
        state = productControllerInitState;
        productNameInputRef.element.value = '';
        productPriceInputRef.element.value = '';
        productQuantityInputRef.element.value = '';
        render('productInventoryContainerBinder');
      }},
    }
  }
}

export function productInventoryContainerController() {
  return {
    rootElement: {
      children: products.map((product) => (`
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
        </tr>
      `)),
    }
  }
}
