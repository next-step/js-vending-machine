import { Elem, InventoryItem } from '../../constants.js'
import el from '../../util/dom.js'
import lnKo from '../../util/lnKo.js'

export default class InventoryItems {
  #prevItems: InventoryItem[] = []
  #res: Elem[] = []

  buildItem(item: InventoryItem) {
    return el(`
      <tr>
        <td>${item.name}</td>
        <td><span>${lnKo(item.price)}</span>원</td>
        <td><span>${lnKo(item.amount)}</span>개</td>
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
