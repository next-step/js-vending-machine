import SELECTOR from '../constants/selector.js';
import {
  coinReturnTemplate,
  purchaseProductItem,
  inputAmountTemplate,
  purchaseProductTabelTemplate,
  returnCoinTableTemplate,
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
    $(`#${SELECTOR.returnCoinTableBodyId}`).innerHTML =
      returnCoinTableTemplate(coins);
  }
}

export default ProductPurchaseView;
