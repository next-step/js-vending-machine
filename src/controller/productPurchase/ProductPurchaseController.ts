import ProductStore from '../../store/ProductStore'
import { ProductPurchaseReucerAction } from './productPurchaseAction'
import MoneyStore from '../../store/MoneyStore'
import { $ } from '../../utils/dom/selector'
import { PRODUCT_PURCHASE_CHARGE_INPUT } from '../../constants/productPurchase/element'
import {
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY,
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID,
  PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID,
  PURCHASE_PRODUCT_PURCHASE_NO_MONEY,
  PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT,
} from '../../constants/productPurchase/errorMessage'

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
        return this.addUserMoney()
      case 'PURCHASE_PRODUCT':
        const name = action.payload.name

        return this.purchaseProduct(name)
      default:
        return false
    }
  }

  purchaseProduct(productName: string) {
    const product = this.#productStore.getProduct({ name: productName })
    const money = this.#moneyStore.getUserMoney()

    if (!product) {
      return false
    }

    if (product.quantity <= 0) {
      alert(PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT)
      return false
    }

    if (product.price > money) {
      alert(PURCHASE_PRODUCT_PURCHASE_NO_MONEY)
      return false
    }

    this.#productStore.purchaseProduct({ name: productName })
    this.#moneyStore.spendUserMoney({ money: product.price })
    return true
  }

  addUserMoney() {
    const moneyOutput = this.getMoney()

    if (moneyOutput.errorMessage) {
      alert(moneyOutput.errorMessage)
      return false
    }

    this.#moneyStore.addUserMoney({ money: moneyOutput.money ?? 0 })
    return true
  }

  getMoney(): { money?: number; errorMessage?: string } {
    const $chargeInput = $({
      selector: PRODUCT_PURCHASE_CHARGE_INPUT,
    }) as HTMLInputElement

    const money = Number($chargeInput.value)

    if ($chargeInput.value === '') {
      return { errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY }
    }

    if (money < 10) {
      return {
        errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID,
      }
    }

    if (money % 10 !== 0) {
      return { errorMessage: PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID }
    }

    return { money }
  }
}
