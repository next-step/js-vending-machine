import { Id } from "../common/constants";
import Component from "../core/Component";
import { $, id2Query } from "../core/dom";
import CashCharge from "./CashCharge";
import ProductManage from "./ProductManage";
import Tap from "./Tap";

export default class App extends Component {
  private tapComp?: Tap;
  private productManageComp?: ProductManage;
  private cashChargeComp?: CashCharge;

  constructor($target: HTMLElement) {
    super($target);
  }

  componentDidMount() {
    this.initComponents();
    this.showProductManageTab();
  }

  private initComponents() {
    this.tapComp = new Tap($(id2Query(Id.tapComp)), {
      showProductManageTab: () => this.showProductManageTab(),
      showChargeCashTab: () => this.showChargeCashTab(),
      showPurchaseTab: () => this.showPurchaseTab(),
    });

    this.productManageComp = new ProductManage(
      $(id2Query(Id.productManageComp))
    );

    this.cashChargeComp = new CashCharge($(id2Query(Id.cashChargeComp)));
  }

  private hideAllTabs() {
    this.productManageComp?.hide();
    this.cashChargeComp?.hide();
  }

  private showProductManageTab() {
    this.hideAllTabs();
    this.productManageComp?.show();
    console.log("showProductManageTab");
  }

  private showChargeCashTab() {
    this.hideAllTabs();
    this.cashChargeComp?.show();
    console.log("showChargeCashTab");
  }

  private showPurchaseTab() {
    this.hideAllTabs();
    console.log("showPurchaseTab");
  }

  protected htmlTemplate(): string {
    return /*html*/ `
      <h1>🥤자판기🥤</h1>
      <div id="${Id.tapComp}"></div>
      <div id="${Id.productManageComp}"></div>
      <div id="${Id.cashChargeComp}"></div>
    `;
  }
}
