import ProductPurchaseView from '../views/ProductPurchaseView.js';
import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import { getStorageInsertCoin, getStorageProducts } from '../utils/storage.js';
import ProductPurchaseModel from '../models/ProductPurchaseModel.js';

class ProductPurchaseController {
  constructor() {
    this.productPurchaseView = new ProductPurchaseView();
    this.#initAddEventListener();
    this.chargeInputElement;
  }

  renderProductPurchase() {
    const purchaseAvailableProducts = getStorageProducts();

    this.productPurchaseView.render();
    this.productPurchaseView.renderPurchaseProductInputAmount(
      getStorageInsertCoin()
    );
    this.productPurchaseView.renderPurchaseProductList(purchaseAvailableProducts);
    this.chargeInputElement = $(`#${SELECTOR.chargeInputId}`);
  }

  #initAddEventListener() {
    $(`#${SELECTOR.tabContentContainerId}`).addEventListener('click', (e) =>
      this.#onClickTabContent(e)
    );
  }

  #onClickTabContent(e) {
    const { id } = e.target;
    if (id === SELECTOR.chargeButtonId) this.#handleCoinInsertion();
    if (id === SELECTOR.purchaseButtonClass) this.#purchaseProduct();
    if (id === SELECTOR.coinReturnButtonId) this.#handleCoinReturn();
  }

  #handleCoinInsertion() {
    const coin = this.#getInsertedCoin();
    this.#validate(coin);

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

  #validate(coin) {
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

  #purchaseProduct() {
    console.log('상품구매');
    // 충전금액을 바탕으로 상품 구매 가능
    // - 상품 금액만큼 충전금액에서 차감, 상품 수량도 차감
    // - 수량이 0인 상품은 구매 불가
    // - 상품가격이 보유금액보다 높으면 구매 불가
  }

  #handleCoinReturn() {
    console.log('잔돈반환');
  }
}

export default ProductPurchaseController;
