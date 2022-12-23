import { render } from '../binders.js';
import { Product } from '../models/product.js';

// TODO: localStorage를 다루는 로직은 util에서
// TODO: 처음 App 실행 시, localStorage에서 price 정보를 가져와야함.
// TODO: Store로 따로 분리 리팩토링
const products = [];

const MIN_PRICE = 100;

const productControllerInitState = {
  name: '',
  price: 0,
  quantity: 0,
}

const productNameInputRef = { element: null };
const productPriceInputRef = { element: null };
const productQuantityInputRef = { element: null };

export function productManagerController() {
  let state = productControllerInitState;

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
        // TODO: Validate 리팩토링
        if (!name) {
          alert('상품 이름을 입력해주세요!');
          productNameInputRef.element.focus();
          return;
        }

        if (!price && price > 0) {
          alert('상품 가격을 양수로 입력해주세요!');
          productPriceInputRef.element.focus();
          return;
        }

        if (!quantity && quantity > 0) {
          alert('상품 수량을 양수로 입력해주세요!');
          productQuantityInputRef.element.focus();
          return;
        }

        if (price < MIN_PRICE) {
          alert('가격은 100원 이상이어야 합니다.');
          productPriceInputRef.element.focus();
          return;
        }

        if (price % 10 !== 0) {
          alert('가격은 10원 단위로 떨어져야 합니다.');
          productPriceInputRef.element.focus();
          return;
        }

        // TODO: 등록시 localStorage의 product 정보 함께 갱신
        products.push(new Product(state));

        state = productControllerInitState;

        productNameInputRef.element.value = '';
        productPriceInputRef.element.value = '';
        productQuantityInputRef.element.value = '';
        // TODO: binder 이름 상수로 관리하기
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
