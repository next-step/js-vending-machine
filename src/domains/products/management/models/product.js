export default class Product {
  #name;

  #price;

  #quantity;

  constructor({ name, price, quantity }) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  getProduct() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }
}
