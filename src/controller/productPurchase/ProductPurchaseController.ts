import ProductStore from '../../store/ProductStore'
import { ProductPurchaseReucerAction } from './productPurchaseAction'
import MoneyStore from '../../store/MoneyStore'

export default class ProductPurchaseController {
  #productStore: ProductStore
  #moneyStore: MoneyStore

  constructor(productStore: ProductStore, moneyStore: MoneyStore) {
    this.#productStore = productStore
    this.#moneyStore = moneyStore
  }

  dispatch(action: ProductPurchaseReucerAction) {
    switch (action.type) {
      case 'ADD_USER_MONEY':
        this.#moneyStore.addUserMoney({ money: action.payload.money })
        break
      case 'PURCHASE_PRODUCT':
        const name = action.payload.name

        const product = this.#productStore.getProduct({ name })

        if (!product) {
          return
        }
        this.#productStore.purchaseProduct({ name })
        this.#moneyStore.spendUserMoney({ money: product.price })
        break
    }
  }
}
