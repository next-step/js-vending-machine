import {
  chargeMoneyFormView, model, newProductFormView, purchasableTableView,
} from '../index.js';
import { validatePurchasable } from '../service/purchaseProductService.js';

export class purchaseProductController {
  constructor() {
    purchasableTableView.bindOnClickPurchasableTable(this.onClickPurchasableTable);
    purchasableTableView.renderPurchasableTable();
  }

  onClickPurchasableTable(event) {
    if (event.target.tagName !== 'BUTTON') return;

    const clickedProductId = Number(event.target.parentElement.parentElement.id.split('-')[1]);
    const clickedProduct = model.products[clickedProductId];

    validatePurchasable(model.chargedAmountByUser, clickedProduct);

    model.setChargedAmountByUser(model.chargedAmountByUser - clickedProduct.price);
    model.setProducts({ ...clickedProduct, quantity: clickedProduct.quantity - 1 });

    purchasableTableView.renderPurchasableTable();
    newProductFormView.renderProducts();
    chargeMoneyFormView.renderChargedAmountByUser();
  }
}
