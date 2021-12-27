import ProductStore, { ProductProps } from '../store/ProductStore'

export default class ProductManageModel {
  #store: ProductStore

  constructor(product: ProductStore) {
    this.#store = product
  }

  addProduct(productProp: ProductProps) {
    this.#store.setProduct(productProp)
  }
}
