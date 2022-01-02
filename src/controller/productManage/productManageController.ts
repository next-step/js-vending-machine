import { ADD_PRODUCT } from '../../constants/productManage/action'
import {
  PRODUCT_ADD_BUTTON,
  PRODUCT_NAME_INPUT,
  PRODUCT_PRICE_INPUT,
  PRODUCT_QUANTITY_INPUT,
} from '../../constants/productManage/element'
import {
  PRODUCT_ADD_INPUT_INVALID,
  PRODUCT_ADD_PRICE_INVALID,
  PRODUCT_ADD_QUANTITY_INVALID,
} from '../../constants/productManage/errorMessage'
import ProductStore, { ProductProps } from '../../store/ProductStore'
import { $ } from '../../utils/dom/selector'
import { ProductManageReucerAction } from './productManageAction'

export default class ProductManageController {
  #productStore: ProductStore
  $productNameInput: HTMLInputElement
  $productPriceInput: HTMLInputElement
  $productQuantityInput: HTMLInputElement

  constructor(productStore: ProductStore) {
    this.#productStore = productStore
  }

  addProduct() {
    const { errorMessage, product } = this.getProduct()

    if (errorMessage) {
      alert(errorMessage)
      return false
    }

    if (!product) {
      return false
    }

    this.#productStore.setProduct(product)
    return true
  }

  dispatch(action: ProductManageReucerAction): boolean {
    switch (action.type) {
      case ADD_PRODUCT:
        return this.addProduct()

      default:
        return false
    }
  }

  getProduct(): { product?: ProductProps; errorMessage?: string } {
    const productNameInput = $({
      selector: PRODUCT_NAME_INPUT,
    }) as HTMLInputElement

    const productPriceInput = $({
      selector: PRODUCT_PRICE_INPUT,
    }) as HTMLInputElement

    const productQuantityInput = $({
      selector: PRODUCT_QUANTITY_INPUT,
    }) as HTMLInputElement

    const name = productNameInput.value
    const price = Number(productPriceInput.value)
    const quantity = Number(productQuantityInput.value)

    if (
      productNameInput.value === '' ||
      productQuantityInput.value === '' ||
      productQuantityInput.value === ''
    ) {
      return { errorMessage: PRODUCT_ADD_INPUT_INVALID }
    }

    if (quantity < 1) {
      return { errorMessage: PRODUCT_ADD_QUANTITY_INVALID }
    }

    if (!this.#productStore.isPriceValid(price)) {
      return { errorMessage: PRODUCT_ADD_PRICE_INVALID }
    }

    return { product: { name, price, quantity } }
  }
}
