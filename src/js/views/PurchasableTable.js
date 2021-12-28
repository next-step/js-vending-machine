import { DOM } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import el from '../utils/dom.js';
import { model } from '../index.js';
import { createPurchasableRowArray } from '../service/purchaseProductService.js';

export class PurchasableTable {
  constructor() {
    this.$container = $(DOM.PURCHASABLE_CONTAINER);
    this.$purchasableInventory = $(DOM.PURCHASABLE_INVENTORY); // 여기에 클릭이벤트 발생 -> id->DOM.PURCHASE_BUTTON 구매하기

    this.renderPurchasableTable();
  }

  bindOnClickPurchasableTable(handler) {
    this.$purchasableInventory.addEventListener('click', () => {
      handler(event);
    });
  }

  renderPurchasableTable() {
    const purchasableElementArray = model.products.map((product, index) => el(`<tr id="purchasable-${index}">`, createPurchasableRowArray(product)));
    this.$purchasableInventory.replaceChildren();
    purchasableElementArray.forEach((i) => this.$purchasableInventory.appendChild(i));
  }
}
