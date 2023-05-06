import ProductManageView from '../views/ProductManageView.js';
import ProductManageModel from '../models/ProductManageModel.js';
import SELECTOR from '../constants/selector.js';
import {$} from '../utils/dom.js';
import { getStorageProducts, setStorageProducts } from '../utils/storage.js';

class ProductManageController {
  #products = [];

  constructor() {
    this.productManageView = new ProductManageView();
    this.initAddEventListener();
    this.#renderProductList();
  }

  initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener(
      'click',
      (e) => this.#onClickTabContent(e),
    );
  }

  #renderProductList() {
    this.productManageView.render();
    this.#renderTableWithProducts();
  }

  #renderTableWithProducts() {
    this.productManageView.renderTableWithProductItems(
      getStorageProducts()
    );
  }

  #onClickTabContent(e) {
    const { id } = e.target;
    if (id === SELECTOR.productAddButtonId) this.#handleProductsMangement();
  }

  #handleProductsMangement() {
    const hasProductInStorage = !!getStorageProducts().length;
    const productInputData = this.#getProductInputData();
    const productMangageModel = new ProductManageModel(productInputData);

    if(hasProductInStorage) {
      this.#updateProducts(productInputData);
    } else {
      this.#setProducts(productMangageModel.product);
    }

    this.#renderTableWithProducts();
    this.productManageView.resetProductItemInputs();
  }

  #getProductInputData() {
    const productName = $(`#${SELECTOR.productNameInputId}`);
    const productPrice = $(`#${SELECTOR.productPriceInputId}`);
    const productQuantity = $(`#${SELECTOR.productQuantityInputId}`);

    return {
      name: productName.value,
      price: productPrice.value,
      quantity: productQuantity.value
    };
  }

  #setProducts(product) {
    this.#products.push(product);
    setStorageProducts(this.#products);
  }

  #isDuplicateProduct(name) {
    return this.#products.findIndex(it => it.name === name) !== -1;
  }

  #updateProducts(product) {
    const isDuplicateProduct = this.#isDuplicateProduct(product.name);

    if(isDuplicateProduct) {
      const newProducts = this.#products.map(it => {
        if(it.name === product.name){
          it = product;
        }

        return it;
      });

      this.#products = newProducts;
      setStorageProducts(newProducts);
    } else {
      this.#setProducts(product);
    }
  }
}

export default ProductManageController;