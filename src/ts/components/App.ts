import { Id } from "../common/constants";
import Component from "../core/Component";
import { $, id2Query } from "../core/dom";
import ProductManage from "./ProductManage";
import Tap from "./Tap";

export default class App extends Component {
  private tapComp?: Tap;
  private productManageComp?: ProductManage;

  constructor($target: HTMLElement) {
    super($target);
  }

  componentDidMount() {
    this.tapComp = new Tap($(id2Query(Id.tapComp)), {
      showProductManageTab: () => {
        console.log("showProductManageTab");
      },
      showVendingMachineManageTab: () => {
        console.log("showVendingMachineManageTab");
      },
      showPurchaseTab: () => {
        console.log("showPurchaseTab");
      },
    });

    this.productManageComp = new ProductManage(
      $(id2Query(Id.productManageComp))
    );
  }

  protected htmlTemplate(): string {
    return /*html*/ `
      <h1>🥤자판기🥤</h1>
      <div id="${Id.tapComp}"></div>
      <div id="${Id.productManageComp}"></div>
    `;
  }
}
