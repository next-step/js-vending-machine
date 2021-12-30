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
    const product = this.#productStore.getProduct({ name })
    if (!product) {
      return
    }
    this.#productStore.purchaseProduct({ name })
    this.#moneyStore.spendUserMoney({ money: product.price })
  }

  addUserMoney(money: number) {
    this.#moneyStore.addUserMoney({ money })
  }
}
