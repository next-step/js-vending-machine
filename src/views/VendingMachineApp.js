import store from '../store/index.js';
import { observe } from '../core/observer.js';
import { $ } from "../util/index.js";
import View from "./View.js"
import "./Navigation.js";
import "./ProductManage.js";
import "./ChargeAmountManage.js";
import "./ProductPurchase.js";

export default class VendingMachineApp extends View {
  prevMachineView;
  init() {
    observe(() => {
      this.setCurrentView();
    })
  }
  setCurrentView() {
    const { currentMachineView } = store.getState();
    if(this.prevMachineView) $(this.prevMachineView).hide();
    $(currentMachineView).show();

    this.prevMachineView = currentMachineView;
    $("nav-tab").setAttribute("data-tab", currentMachineView);
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
