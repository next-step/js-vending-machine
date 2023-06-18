import SELECTOR from '../constants/selector.js';
import {
  coinReturnTemplate,
  purchaseProductItem,
  inputAmountTemplate,
  purchaseProductTabelTemplate,
} from '../templates/productPurchaseMenuTemplate.js';
import { $ } from '../utils/dom.js';

class ProductPurchaseView {
  render() {
    $(`#${SELECTOR.tabContentContainerId}`).innerHTML =
      inputAmountTemplate + purchaseProductTabelTemplate + coinReturnTemplate;
  }

  renderPurchaseProductInputAmount(amount) {
    $(`#${SELECTOR.chargeAmountId}`).innerText = amount;
  }

  renderPurchaseProductList(products) {
    $(`#${SELECTOR.purchaseProductTableBodyId}`).innerHTML =
      purchaseProductItem(products);
  }

  renderCoinsReturned(coins) {
    Object.entries(coins).map(([key, value]) => {
      $(`#coin-${key}-quantity`).innerText = `${value || 0}개`;
    });
  }
}

export default ProductPurchaseView;
