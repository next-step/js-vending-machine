import ProductManageMenu from "./views/ProductManageMenu.js";
import View from "./common/View.js";
import { $ } from "./utils/index.js";

export default class VendingMachineApp extends View {
  render() {
    this.$el.innerHTML = `
      <button id="product-manage-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈충전</button>
      <button id="product-purchase-menu">상품 구매</button>
      <div id="app" data-component="route-view"></div>
    `;

    this.components["product-manage-menu"] = new ProductManageMenu({
      $el: $('[data-component="route-view"]'),
    });
  }
}
