import { render, PRODUCT_INVENTORY_CONTAINER_BINDER } from '../../binders.js';
import { Product } from '../../models/Product.js';
import { setLocalStorageItem } from '../../utils/localStorageUtils.js';
import { products, PRODUCTS_STATE_KEY } from '../../states/productState.js';

import { Ref } from '../common/Ref.js';
import { ProductManagerState } from './productManagerState.js';

const productControllerInitState = new ProductManagerState({
  name: '',
  price: 0,
  quantity: 0,
});

const productNameInputRef = new Ref();
const productPriceInputRef = new Ref();
const productQuantityInputRef = new Ref();

export function productManagerController() {
  let productControllerState = productControllerInitState;

  return {
    productNameInput: {
      ref: productNameInputRef,
      events: {change: (e) => {
        productControllerState.name = e.target.value;
      }},
    },
    productPriceInput: {
      ref: productPriceInputRef,
      events: {change: (e) => {
        productControllerState.price = e.target.value
      }},
    },
    productQuantityInput: {
      ref: productQuantityInputRef,
      events: {change: (e) => {
        productControllerState.quantity = e.target.value;
      }},
    },
    productAddButton: {
      events: {click: () => {
        if (!productControllerState.validateName(productNameInputRef.element)) return;
        if (!productControllerState.validatePrice(productPriceInputRef.element)) return;
        if (!productControllerState.validateQuantity(productQuantityInputRef.element)) return;

        // TODO: product를 새로 추가하는 것은 products의 상태를 변화시키는 것이고 동시에 sync해야 하므로, setlocalstate는 객체안에서 동시에 이뤄져야한다.
        products[productControllerState.name] = new Product(productControllerState);
        setLocalStorageItem(PRODUCTS_STATE_KEY, JSON.stringify(products));

        productControllerState = new ProductManagerState({});

        productNameInputRef.element.value = '';
        productPriceInputRef.element.value = '';
        productQuantityInputRef.element.value = '';
        render(PRODUCT_INVENTORY_CONTAINER_BINDER);
      }},
    }
  }
}

export function productInventoryContainerController() {
  return {
    rootElement: {
      children: Object.values(products).map((product) => (
        `<tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
        </tr>`
      )).join(''),
    }
  }
}
