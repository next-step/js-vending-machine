import ProductPurchaseView from '../views/ProductPurchaseView.js';
import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import {
  getStorageInsertCoin,
  getStorageProducts,
  setStorageInsertCoin,
  setStorageProducts,
} from '../utils/storage.js';
import ProductPurchaseModel from '../models/ProductPurchaseModel.js';

class ProductPurchaseController {
  constructor() {
    this.productPurchaseView = new ProductPurchaseView();
    this.#initAddEventListener();
    this.chargeInputElement;
  }

  renderProductPurchase() {
    const purchaseAvailableProducts = getStorageProducts();
    const insertedCoin = getStorageInsertCoin();

    this.productPurchaseView.render();
    this.productPurchaseView.renderPurchaseProductInputAmount(insertedCoin);
    this.productPurchaseView.renderPurchaseProductList(purchaseAvailableProducts);
    this.chargeInputElement = $(`#${SELECTOR.chargeInputId}`);
  }

  #initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener('click', (e) =>
      this.#onClickTabContent(e)
    );
  }

  #onClickTabContent(e) {
    const { id, className } = e.target;
    if (id === SELECTOR.chargeButtonId) this.#handleCoinInsertion();
    if (className === SELECTOR.purchaseButtonClass)
      this.#handleProductPurchase(e.target);
    if (id === SELECTOR.coinReturnButtonId) this.#handleCoinReturn();
  }

  #handleCoinInsertion() {
    const coin = this.#getInsertedCoin();
    this.#validateCoin(coin);

    const productPurchaseModel = new ProductPurchaseModel(coin);
    productPurchaseModel.setCoinInsertion();

    this.#renderInsertedCoin();
    this.#resetInsertCoinInputBox();
  }

  #getInsertedCoin() {
    const amount = this.chargeInputElement.value;
    return amount;
  }

  #renderInsertedCoin(coin) {
    $(`#${SELECTOR.chargeAmountId}`).innerText = getStorageInsertCoin();
  }

  #resetInsertCoinInputBox() {
    this.chargeInputElement.value = ``;
    this.chargeInputElement.focus();
  }

  #validateCoin(coin) {
    try {
      this.#validationInsertedCoin(coin);
    } catch (error) {
      alert(error.message);
      throw Error(error.message);
    }
  }

  #validationInsertedCoin(coin) {
    if (Number(coin) < 10) {
      this.#resetInsertCoinInputBox();
      throw Error('최소 충전 금액은 10원입니다.');
    }
  }

  #handleProductPurchase(target) {
    this.#validateAvailablePurchase(target);
    this.#purchaseProduct(target);
    this.renderProductPurchase();
  }

  #validateAvailablePurchase(target) {
    const product = target.parentElement.parentElement;
    const price = Number(product.children[1].innerText);
    const quantity = Number(product.children[2].innerText);

    try {
      this.#validateQuantity(quantity);
      this.#validatePrice(price);
    } catch (error) {
      alert(error.message);
      throw Error(error.message);
    }
  }

  #validateQuantity(quantity) {
    if (quantity <= 0) {
      throw Error('수량이 부족하여 구매할 수 없습니다.');
    }
  }

  #validatePrice(price) {
    const insertedCoin = Number(getStorageInsertCoin());
    if (price > insertedCoin) {
      throw Error('금액이 부족합니다.');
    }
  }

  #purchaseProduct(target) {
    let products = getStorageProducts();
    let insertedCoin = Number(getStorageInsertCoin());
    const product = target.parentElement.parentElement;
    const name = product.children[0].innerText;

    products
      .filter((it) => it.name == name)
      .map((it) => {
        it.quantity -= 1;
        insertedCoin -= Number(it.price);

        return it;
      });

    setStorageProducts([...products]);
    setStorageInsertCoin(insertedCoin);
  }

  #handleCoinReturn() {
    console.log('잔돈반환');
  }
}

export default ProductPurchaseController;
