import { Id } from "../common/constants";
import Component from "../core/Component";
import { $, id2Query } from "../core/dom";
import ChangesCharge from "./ChangesCharge";
import ProductManage from "./ProductManage";
import ProductPurchase from "./ProductPurchase";
import Tap from "./Tap";

export default class App extends Component {
  private tapComp?: Tap;
  private productManageComp?: ProductManage;
  private changesChargeComp?: ChangesCharge;
  private productPurchaseComp?: ProductPurchase;

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
      showChargeChangesTab: () => this.showChargeChangesTab(),
      showPurchaseTab: () => this.showPurchaseTab(),
    });

    this.productManageComp = new ProductManage(
      $(id2Query(Id.productManageComp))
    );

    this.changesChargeComp = new ChangesCharge(
      $(id2Query(Id.changesChargeComp))
    );

    this.productPurchaseComp = new ProductPurchase(
      $(id2Query(Id.productPurchaseComp))
    );
  }

  private hideAllTabs() {
    this.productManageComp?.hide();
    this.changesChargeComp?.hide();
    this.productPurchaseComp?.hide();
  }

  private showProductManageTab() {
    this.hideAllTabs();
    this.productManageComp?.show();
    console.log("showProductManageTab");
  }

  private showChargeChangesTab() {
    this.hideAllTabs();
    this.changesChargeComp?.show();
    console.log("showChargeCashTab");
  }

  private showPurchaseTab() {
    this.hideAllTabs();
    this.productPurchaseComp?.show();
    console.log("showPurchaseTab");
  }

  protected htmlTemplate(): string {
    return /*html*/ `
      <h1>🥤자판기🥤</h1>
      <div id="${Id.tapComp}"></div>
      <div id="${Id.productManageComp}"></div>
      <div id="${Id.changesChargeComp}"></div>
      <div id="${Id.productPurchaseComp}"></div>
    `;
  }
}
