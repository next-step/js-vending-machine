import Product from '../../Model/Product/Product.js';
import Storage from '../../Model/Store/Storage.js';
import Validator from '../../Model/Validator.js';
import { shadowDOMSelectorAll } from '../../util/consts.js';
import Component from '../../View/index.js';
import Controller from './Controller.refactor.js';

class Employee extends Controller {
  #storage = Storage.of();
  constructor() {
    super();
  }

  isPassProductValidation(product) {
    const productInfoValidate = product.validate();
    if (productInfoValidate instanceof Error) {
      alert(productInfoValidate.message);
      return false;
    }
    return true;
  }

  update(product) {
    const { getProductInfo } = product;

    if (!this.#storage.isPassStorageValidation()) {
      this.#storage.setStorageProduct = [getProductInfo];

      // TODO: View와 분리하기
      const dom = Component.product.render('tr', {
        product: getProductInfo,
        tagName: 'td',
      });
      Component.product.mount(dom);
      return;
    }

    const storageProduct = this.#storage.getStorageProduct;
    if (this.includesSameProductToStorage(storageProduct, getProductInfo)) {
      let order;
      const newProducts = [...storageProduct].map((prevProduct, index) => {
        if (prevProduct.name === getProductInfo.name) {
          order = index;
          return getProductInfo;
        }
        return prevProduct;
      });

      this.#storage.setStorageProduct = newProducts;
      shadowDOMSelectorAll('product-inventory', 'tr')[
        order + 1
      ].childNodes.forEach((td, index) => {
        td.textContent = Object.values(getProductInfo)[index];
      });

      return;
    }

    // 같은게 없을 때 근데 스토리지에는 있음

    this.#storage.setStorageProduct = [...storageProduct, getProductInfo];
    const dom = Component.product.render('tr', {
      product: getProductInfo,
      tagName: 'td',
    });
    Component.product.mount(dom);
  }

  includesSameProductToStorage(storageProduct, newProduct) {
    return storageProduct.some(
      (prevProduct) => prevProduct.name === newProduct.name
    );
  }

  updateInventory() {}
  updateStorage() {}

  static of() {
    return new Employee();
  }
}

export default Employee;
