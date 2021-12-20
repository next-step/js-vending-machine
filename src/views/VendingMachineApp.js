import View from "./View.js"
import Navigation from "./Navigation.js";
import ProductManage from "./ProductManage.js";
import ChargeAmountManage from "./ChargeAmountManage.js";
import ProductPurchase from "./ProductPurchase.js";
import { $ } from "../util/index.js";

export default class VendingMachineApp extends View {
  currentView;
  init() {
    this.setCurrentView("product-manage");

    $("nav-tab").on("change-tab", ({detail: {currentView}}) => {
      this.setCurrentView(currentView);
    })
  }
  setCurrentView(currentView) {
    if(this.currentView) $(this.currentView).hide();
    $(currentView).show();

    this.currentView = currentView;
    $("nav-tab").setAttribute("data-tab", currentView);
  }
  render() {
    /* html */
    return `
      <h1>🥤자판기🥤</h1>
      <nav-tab data-tab=""></nav-tab>
      <div className="content">
        <product-manage class="hide"></product-manage>
        <charge-amount-manage class="hide"></charge-amount-manage>
        <product-purchase class="hide"></product-purchase>
      </div>
    `;
  }
}

customElements.define("vending-machine-app", VendingMachineApp);
