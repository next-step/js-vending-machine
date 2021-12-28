import { chargeFormView, purchasableTableView } from '../index.js';

export class purchaseProductController {
  constructor() {
    purchasableTableView.bindOnClickPurchasableTable(this.onClickPurchasableTable);
  }

  onClickPurchasableTable(event) {
    if (event.target.tagName !== 'BUTTON') return;

    const clickedProductId = event.target.parentElement.parentElement.id;
    console.log(clickedProductId);
  }
}
