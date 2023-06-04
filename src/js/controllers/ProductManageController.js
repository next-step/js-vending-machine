import ProductManageView from '../views/ProductManageView.js';
import ProductManageModel from '../models/ProductManageModel.js';
import SELECTOR from '../constants/selector.js';
import { $ } from '../utils/dom.js';
import { getStorageProducts } from '../utils/storage.js';

class ProductManageController {
  constructor() {
    this.productManageView = new ProductManageView();
    this.#initAddEventListener();
  }

  renderProductList() {
    this.productManageView.render();
    this.#renderTableWithProducts();
  }

  #initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener('click', (e) =>
      this.#onClickTabContent(e)
    );
  }

  #renderTableWithProducts() {
    this.productManageView.renderTableWithProductItems(getStorageProducts());
  }

  #onClickTabContent(e) {
    const { id } = e.target;
    if (id === SELECTOR.productAddButtonId) this.#handleProductsMangement();
  }

  #handleProductsMangement() {
    const productInputData = this.#getProductInputData();
    this.#validate(productInputData);

    const productMangageModel = new ProductManageModel(productInputData);
    productMangageModel.handleProducts();

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
      quantity: productQuantity.value,
    };
  }

  #validate(productInputData) {
    try {
      this.#validateEmpty(productInputData);
      this.#validateQuantity(productInputData);
      this.#validatePrice(productInputData);
    } catch (error) {
      alert(error.message);
      throw Error(error.message);
    }
  }

  #validateEmpty(productInputData) {
    if (!productInputData.name) {
      throw Error('상품명을 입력해주세요');
    }
    if (!productInputData.price) {
      throw Error('금액을 입력해주세요');
    }
    if (!productInputData.quantity) {
      throw Error('수량을 입력해주세요');
    }
  }

  #validatePrice(productInputData) {
    if (productInputData.price < 100) {
      throw Error('상품의 최소 가격은 100원입니다.');
    }
    if (productInputData.price % 10 !== 0) {
      throw Error('상품의 가격은 10의 배수만 단위만 가능합니다.');
    }
  }

  #validateQuantity(productInputData) {
    if (productInputData.quantity < 1) {
      throw Error('상품의 최소 수량은 1개 이상입니다.');
    }
  }
}

export default ProductManageController;
