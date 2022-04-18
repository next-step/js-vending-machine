import { VALIDATE } from '../../util/consts.js';
import Validator from '../Validator.js';

class VendingMachine {
  #name;
  #price;
  #quantity;

  /**
   * @param {string} newName
   */
  set setName(newName) {
    this.#name = newName;
  }

  /**
   * @param {number} newPrice
   */
  set setPrice(newPrice) {
    this.#price = newPrice;
  }

  /**
   * @param {number} newQuantity
   */
  set setQuantity(newQuantity) {
    this.#quantity = newQuantity;
  }

  get getName() {
    return this.#name;
  }

  get getPrice() {
    return this.#price;
  }

  get getQuantity() {
    return this.#quantity;
  }

  static of({ name, price, quantity }) {
    return new VendingMachine({ name, price, quantity });
  }

  validate() {
    const { product } = Validator;

    // COMPLETE
    if (product.isEmpty(this.#name, this.#price, this.#quantity)) {
      return new Error(VALIDATE.ENTER_ALL_PRODUCT_INFO);
    }

    if (
      product.isNotPriceTenUnit(parseInt(this.#price, 10)) &&
      product.isNotOverTen(parseInt(this.#price, 10))
    ) {
      return new Error(VALIDATE.TEN_UNIT_PRICE);
    }
  }
}

export default VendingMachine;
