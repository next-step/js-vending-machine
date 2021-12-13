import View from '../abstract.js'
import el, { getClosest, getIndex } from '../../util/dom.js'
import Actions from '../../store/actions.js'
import { State } from '../../constants.js'
import ProductItems from './productItems.js'

export default class ProductList extends View {
  static #template = /* html */ `
    <fragment>
      <h3>구매할 수 있는 상품 현황</h3>
      <table class="product-inventory margin-auto">
        <colgroup>
          <col style="width: 140px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </thead>
        <tbody id="product-items-container"></tbody>
      </table>
    </fragment>
  `

  $itemsContainer
  #itemList = new ProductItems()

  constructor() {
    super()
    const $content = el(ProductList.#template)
    this.$itemsContainer = $content.querySelector('#product-items-container') as HTMLTableElement
    this.$itemsContainer.addEventListener('click', this.onPurchase)
    this.render($content)
  }

  watch({ inventory }: State) {
    return { inventory }
  }

  onStoreUpdated({ inventory }: State) {
    const res = this.#itemList.update(inventory)
    el(this.$itemsContainer, res)
  }

  onPurchase = (e: MouseEvent) => {
    e.preventDefault()
    const $target = e.target as HTMLElement
    if ($target.localName !== 'button') return
    const itemIndex = getIndex(getClosest($target, 'tr')!)
    this.dispatch(Actions.purchase_buyItem, {
      itemIndex,
    })
  }
}

customElements.define('product-list', ProductList)
