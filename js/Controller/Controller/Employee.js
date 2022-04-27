import Storage from '../../Model/Store/Storage.js';
import Component from '../../View/Component.js';

class Employee {
  #storage = Storage.of();

  isPassProductValidation(product) {
    const productInfoValidate = product.validate();
    if (productInfoValidate instanceof Error) {
      alert(productInfoValidate.message);
      return false;
    }
    return true;
  }

  display() {
    const products = this.#storage.getStorageProduct;
    const dom = Component.product.renderStorageItem(products);
    Component.product.mount(dom);
  }

  static of() {
    return new Employee();
  }

  /**
   * @param {Class Product} product
   * @instance {
   *  name: {string}
   *  price: {string}
   *  quantity: {string}
   * }
   */
  update(product) {
    if (!this.#storage.isPassStorageValidation()) {
      this.firstUpdateInventoryAndStorage(this.#storage, product.info);
      return;
    }

    const storageProduct = this.#storage.getStorageProduct;
    if (
      this.#storage.includeSameProductToStorage(storageProduct, product.info)
    ) {
      this.replaceInventoryAndStorage(product, storageProduct);
      return;
    }

    this.updateInventoryAndStorage(product, storageProduct);
  }

  firstUpdateInventoryAndStorage(storage, info) {
    storage.setStorageProduct = [info];

    const dom = Component.product.render('tr', {
      product: info,
      tagName: 'td',
    });
    Component.product.mount(dom);
    Component.product.dashboardInit();
  }

  replaceInventoryAndStorage(product, storageProduct) {
    const { replacedProducts, order } = product.replaceDuplicatedProduct(
      storageProduct,
      product.info
    );

    this.#storage.setStorageProduct = replacedProducts;

    Component.product.replaceInventoryProduct(order, product.info);
    Component.product.dashboardInit();
  }

  updateInventoryAndStorage(product, storageProduct) {
    this.#storage.setStorageProduct = [...storageProduct, product.info];
    const dom = Component.product.render('tr', {
      product: product.info,
      tagName: 'td',
    });
    Component.product.mount(dom);
    Component.product.dashboardInit();
  }
}

export default Employee;
