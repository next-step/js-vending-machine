import ProductManageController from '../../controller/productManage/productManageController'
import ProductStore from '../../store/ProductStore'
import {
  PRODUCT_ADD_BUTTON,
  PRODUCT_INVENTORY_CONTAINER,
  PRODUCT_NAME_INPUT,
  PRODUCT_PRICE_INPUT,
  PRODUCT_QUANTITY_INPUT,
} from '../../constants/productManage/element'
import { $ } from '../../utils/dom/selector'
import View from '../View'

const ProductManageTemplate = `
  <h3>상품 추가하기</h3>
  <div class="product-container">
    <input type="text" id="product-name-input" data-cy="product-name-input" placeholder="상품명" />
    <input type="number" id="product-price-input" data-cy="product-price-input" placeholder="가격" />
    <input type="number" id="product-quantity-input" data-cy="product-quantity-input" placeholder="수량" />
    <button id="product-add-button" data-cy="product-add-button">추가하기</button>
  </div>
  <table class="product-inventory">
    <colgroup>
      <col style="width: 140px" />
      <col style="width: 100px" />
      <col style="width: 100px" />
    </colgroup>
    <thead>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
      </tr>
    </thead>
    <tbody id="product-inventory-container" data-cy="product-inventory-container"></tbody>
  </table>
`

export default class ProductManageView extends View {
  viewId: string
  template: string
  controller: ProductManageController
  $template: DocumentFragment
  $addButton: HTMLElement
  $productNameInput: HTMLInputElement
  $productPriceInput: HTMLInputElement
  $productQuantityInput: HTMLInputElement

  #store: ProductStore

  constructor(productStore: ProductStore) {
    super()
    this.viewId = 'product-manage-menu'
    this.template = ProductManageTemplate
    this.controller = new ProductManageController(productStore)
    this.#store = productStore
  }

  onProductAddButtonClick() {
    this.$addButton.addEventListener('click', () => {
      const isSuccessed = this.controller.dispatch({
        type: 'ADD_PRODUCT',
      })

      if (!isSuccessed) {
        return
      }

      this.$productNameInput.value = ''
      this.$productPriceInput.value = ''
      this.$productQuantityInput.value = ''
      this.renderProduct()
    })
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

  render() {
    super.render()
    this.renderProduct()
  }

  bindEvent() {
    this.onProductAddButtonClick()
  }

  selectDomElement() {
    this.$addButton = $({
      selector: PRODUCT_ADD_BUTTON,
      target: this.$template,
    }) as HTMLInputElement
    this.$productNameInput = $({
      selector: PRODUCT_NAME_INPUT,
      target: this.$template,
    }) as HTMLInputElement

    this.$productPriceInput = $({
      selector: PRODUCT_PRICE_INPUT,
      target: this.$template,
    }) as HTMLInputElement

    this.$productQuantityInput = $({
      selector: PRODUCT_QUANTITY_INPUT,
      target: this.$template,
    }) as HTMLInputElement
  }
}
