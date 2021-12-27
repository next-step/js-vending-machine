import ProductStore, { ProductProps } from '../store/ProductStore'
import {
  PRODUCT_INVENTORY_CONTAINER,
  PRODUCT_NAME_INPUT,
  PRODUCT_PRICE_INPUT,
  PRODUCT_QUANTITY_INPUT,
} from '../utils/constants/element'
import { $ } from '../utils/dom/selector'

export default class ProductManageModel {
  #store: ProductStore

  constructor(product: ProductStore) {
    this.#store = product
  }

  addProduct(productProp: ProductProps) {
    this.#store.setProduct(productProp)

    const $productNameInput = $({
      selector: PRODUCT_NAME_INPUT,
    }) as HTMLInputElement

    const $productPriceInput = $({
      selector: PRODUCT_PRICE_INPUT,
    }) as HTMLInputElement

    const $productQuantityInput = $({
      selector: PRODUCT_QUANTITY_INPUT,
    }) as HTMLInputElement

    $productNameInput.value = ''
    $productPriceInput.value = ''
    $productQuantityInput.value = ''
  }

  renderProduct() {
    const products = this.#store.getProducts()

    const $inventory = $({
      selector: PRODUCT_INVENTORY_CONTAINER,
    }) as HTMLTableSectionElement

    if (!$inventory || !products.length) {
      return
    }

    $inventory.innerHTML = ''

    products.forEach(({ name, price, quantity }) => {
      const row = $inventory.insertRow(0)
      const nameCell = row.insertCell(0)
      const priceCell = row.insertCell(1)
      const quantityCell = row.insertCell(2)

      nameCell.textContent = name
      priceCell.textContent = price.toLocaleString()
      quantityCell.textContent = quantity.toLocaleString()
    })
  }
}
