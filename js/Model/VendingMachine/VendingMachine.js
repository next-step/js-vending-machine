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
}

export default VendingMachine;
