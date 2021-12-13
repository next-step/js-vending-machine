import el from '../../util/dom.js';
export default class ProductItems {
    #prevItems = [];
    #res = [];
    buildItem(item) {
        return el(`
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.amount}</td>
        <td><button type="button">구매하기</button></td>
      </tr>
    `);
    }
    update(items) {
        items.forEach((item, i) => {
            const prevItem = this.#prevItems[i];
            if (!prevItem || item.price !== prevItem.price || item.amount !== prevItem.amount) {
                this.#res[i] = this.buildItem(item);
            }
        });
        this.#prevItems = items;
        return this.#res;
    }
}
//# sourceMappingURL=productItems.js.map