import ProductPurchaseView from '../views/ProductPurchaseView.js';
import { $ } from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import {
  getStorageChanges,
  getStorageCoins,
  getStorageInsertCoin,
  getStorageProducts,
  setStorageChanges,
  setStorageCoins,
  setStorageInsertCoin,
  setStorageProducts,
} from '../utils/storage.js';
import ProductPurchaseModel from '../models/ProductPurchaseModel.js';

class ProductPurchaseController {
  #returnCoin = {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  };
  #productPurchaseModel;
  #chargeInputElement;

  constructor() {
    this.productPurchaseView = new ProductPurchaseView();

    const coinStorage = {
      getCoin: () => Number(getStorageInsertCoin()),
      insertCoin: (coin) => setStorageInsertCoin(coin),
    };
    this.#productPurchaseModel = new ProductPurchaseModel(coinStorage);
    this.#initAddEventListener();
  }

  renderProductPurchase() {
    const purchaseAvailableProducts = getStorageProducts();
    const insertedCoin = this.#productPurchaseModel.getCoin();
    const returnChanges = getStorageChanges();

    this.productPurchaseView.render();
    this.productPurchaseView.renderPurchaseProductInputAmount(insertedCoin);
    this.productPurchaseView.renderPurchaseProductList(purchaseAvailableProducts);
    this.productPurchaseView.renderCoinsReturned(returnChanges);

    this.#chargeInputElement = $(`#${SELECTOR.chargeInputId}`);
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
    const insertedCoin = this.#getInsertedCoin();
    this.#validateCoin(insertedCoin);

    this.#productPurchaseModel.setCoin(insertedCoin);

    this.#renderInsertedCoin();
    this.#resetInsertCoinInputBox();
  }

  #getInsertedCoin() {
    const amount = this.#chargeInputElement.value;
    return amount;
  }

  #renderInsertedCoin() {
    $(`#${SELECTOR.chargeAmountId}`).innerText =
      this.#productPurchaseModel.getCoin();
  }

  #resetInsertCoinInputBox() {
    this.#chargeInputElement.value = ``;
    this.#chargeInputElement.focus();
  }

  #validateCoin(insertedCoin) {
    try {
      this.#validationInsertedCoin(insertedCoin);
    } catch (error) {
      alert(error.message);
      throw Error(error.message);
    }
  }

  #validationInsertedCoin(insertedCoin) {
    if (Number(insertedCoin) < 10) {
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
    let insertedCoin = this.#productPurchaseModel.getCoin();
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
    this.#productPurchaseModel.setCoin(insertedCoin);
  }

  #handleCoinReturn() {
    const vedingMachineCoin = getStorageCoins();
    let insertedCoin = this.#productPurchaseModel.getCoin();

    this.#returnChanges(vedingMachineCoin, insertedCoin);
    setStorageChanges(this.#returnCoin);
    this.productPurchaseView.renderCoinsReturned(this.#returnCoin);
  }

  #returnChanges(vedingMachineCoin, insertedCoin) {
    const coinKeys = Object.keys(vedingMachineCoin).sort((a, b) => b - a);

    coinKeys.forEach((key) => {
      let count = Math.floor(insertedCoin / key);

      if (count > 0) {
        vedingMachineCoin[key] -= count;
        this.#returnCoin[key] += count;
        insertedCoin -= key * count;
      }
    });

    this.productPurchaseView.renderPurchaseProductInputAmount(insertedCoin);
    this.#productPurchaseModel.setCoin(insertedCoin);
    setStorageCoins(vedingMachineCoin);
  }
}

export default ProductPurchaseController;
