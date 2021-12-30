import ProductStore from '../../store/ProductStore'
import { ProductPurchaseReucerAction } from './productPurchaseAction'
import ProductPurchaseModel from '../../model/productPurchaseModel'
import MoneyStore from '../../store/MoneyStore'

export default class ProductPurchaseController {
  #model: ProductPurchaseModel

  constructor(productStore: ProductStore, moneyStore: MoneyStore) {
    this.#model = new ProductPurchaseModel(productStore, moneyStore)
  }

  dispatch(action: ProductPurchaseReucerAction) {
    switch (action.type) {
      case 'ADD_USER_MONEY':
        this.#model.addUserMoney(action.payload.money)
        break
      case 'PURCHASE_PRODUCT':
        this.#model.purchaseProduct(action.payload.name)
        break
    }
  }
}
