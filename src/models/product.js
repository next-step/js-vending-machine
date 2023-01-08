import { toNumber } from "../utils/utils.js";

export class Product {
  constructor({ name, price, quantity }) {
    this.name = name;
    this.price = toNumber(price);
    this.quantity = toNumber(quantity);
  }

  buyProduct(coinInputControllerState) {
    if (!this.#checkIfCanBuyThisProduct(coinInputControllerState.totalAmount)) return;
    if (!this.#checkProductQuantity()) return;

    coinInputControllerState.deductAmount(this.price);
    this.quantity -= 1;
    return true;
  }

  #checkIfCanBuyThisProduct(amount) {
    if (this.price > amount) {
      alert('상품 구입에 금액이 부족합니다!');
      return false;
    }
    return true;
  }

  #checkProductQuantity() {
    if (this.quantity <= 0) {
      alert('상품 재고가 모두 떨어졌습니다!');
      return false;
    }
    return true;
  }
}
