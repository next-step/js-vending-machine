import ProductStore from '../store/ProductStore'
import MoneyStore from '../store/MoneyStore'

export default class ProductPurchaseModel {
  #productStore: ProductStore
  #moneyStore: MoneyStore

  constructor(product: ProductStore, money: MoneyStore) {
    this.#productStore = product
    this.#moneyStore = money
  }

  purchaseProduct(name: string) {
    console.log(this.#productStore.getProduct({ name }))
  }
}
