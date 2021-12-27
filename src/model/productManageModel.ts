import ProductStore, { ProductProps } from '../store/ProductStore'
import { PRODUCT_INVENTORY_CONTAINER } from '../utils/constants/element'
import { $ } from '../utils/dom/selector'

export default class ProductManageModel {
  #store: ProductStore

  constructor(product: ProductStore) {
    this.#store = product
    const products = this.#store.getProducts()
    console.log('afdasfadsff first', products)
    this.renderProduct(products)
  }

  addProduct(productProp: ProductProps) {
    this.#store.setProduct(productProp)
    console.log(this.#store.getProducts())
    const products = this.#store.getProducts()

    console.log('addproducts ', products)
    this.renderProduct(products)
    // render product
  }

  renderProduct(products: ProductProps[]) {
    const $inventory = $({
      selector: PRODUCT_INVENTORY_CONTAINER,
    }) as HTMLTableSectionElement

    if (!$inventory || !products.length) {
      return
    }

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
