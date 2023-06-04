class ProductManageModel {
  #product;

  constructor(product) {
    this.#product = product;
  }

  get product() {
    return this.#product;
  }
}
export default ProductManageModel;
