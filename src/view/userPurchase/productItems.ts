import { Elem, InventoryItem } from '../../constants.js'
import el from '../../util/dom.js'

export default class ProductItems {
  #prevItems: InventoryItem[] = []
  #res: Elem[] = []

  buildItem(item: InventoryItem) {
    return el(`
      <tr>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString('ko-KR')}원</td>
        <td>${item.amount.toLocaleString('ko-KR')}개</td>
        <td><button data-event-target="purchase" type="button">구매하기</button></td>
      </tr>
    `)
  }

  update(items: InventoryItem[]) {
    items.forEach((item, i) => {
      const prevItem = this.#prevItems[i]
      if (!prevItem || item.price !== prevItem.price || item.amount !== prevItem.amount) {
        this.#res[i] = this.buildItem(item)
      }
    })
    this.#prevItems = items
    return this.#res
  }
}
