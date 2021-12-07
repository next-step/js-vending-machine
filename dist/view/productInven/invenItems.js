import el from '../../util/dom.js';
export default class InvenItems {
    #prevInvens = [];
    #res = [];
    buildItem(item) {
        return el(`<tr><td>${item.name}</td><td>${item.price}</td><td>${item.amount}</td></tr>`);
    }
    update(invens) {
        invens.forEach((item, i) => {
            const prevItem = this.#prevInvens[i];
            if (!prevItem || item.price !== prevItem.price || item.amount !== prevItem.amount) {
                this.#res[i] = this.buildItem(item);
            }
        });
        this.#prevInvens = invens;
        return this.#res;
    }
}
//# sourceMappingURL=invenItems.js.map