export const MIN_PRICE = 100;
export const MIN_QUANTITY = 1;
export const STEP_PRICE = 10;

function isEmpty(value) {
  return value === undefined || value === null || value.trim() === '';
}

export default class Product {
  #name;
  #price;
  #quantity;

  constructor({ name, price, quantity }) {
    this.#validate({ name, price, quantity });
    this.#name = name.trim();
    this.#price = price;
    this.#quantity = quantity;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get quantity() {
    return this.#quantity;
  }

  toJson() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
    };
  }

  #validateName(name) {
    if (isEmpty(name)) {
      throw new Error('상품명은 필수값입니다.');
    }
  }

  #validatePrice(price) {
    if (isEmpty(price)) {
      throw new Error('가격은 필수값입니다.');
    }
    if (price < MIN_PRICE) {
      throw new Error(`가격은 ${MIN_PRICE} 보다 커야됩니다.`);
    }
    if (price % STEP_PRICE !== 0) {
      throw new Error(`가격은 ${STEP_PRICE} 단위여야 합니다.`);
    }
  }

  #validateQuantity(quantity) {
    if (isEmpty(quantity)) {
      throw new Error('수량은 필수값입니다.');
    }

    if (quantity < MIN_QUANTITY) {
      throw new Error(`수량은 ${MIN_QUANTITY} 이상 이여야 합니다.`);
    }
  }

  #validate({ name, price, quantity }) {
    this.#validateName(name);
    this.#validatePrice(price);
    this.#validateQuantity(quantity);
  }
}
