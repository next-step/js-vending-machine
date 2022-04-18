const productStore = {
  products: [],
  GET_PRODUCTS() {
    return this.products;
  },
  SET_PRODUCTS(_products) {
    this.products = [...this.products, _products];
  },
};

export default productStore;
