import { Id } from "../common/constants";
import Component from "../core/Component";
import { id2Query } from "../core/dom";

export default class Tap extends Component<ITapProps> {
  protected componentDidMount(): void {
    const onClick = (e: Event) => {
      const $evtTarget = e.target as HTMLElement;
      if ($evtTarget.closest(id2Query(Id.productManageMenuBtn))) {
        this.props?.showProductManageTab();
      } else if ($evtTarget.closest(id2Query(Id.vendingMachineManageMenuBtn))) {
        this.props?.showChargeCashTab();
      } else if ($evtTarget.closest(id2Query(Id.purchaseMenuBtn))) {
        this.props?.showPurchaseTab();
      }
    };
    this.$target.addEventListener("click", onClick);
  }

  protected htmlTemplate(): string {
    return /*html*/ `
      <button id="${Id.productManageMenuBtn}">상품 관리</button>
      <button id="${Id.vendingMachineManageMenuBtn}">잔돈충전</button>
      <button id="${Id.purchaseMenuBtn}">상품 구매</button>
      `;
  }
}

interface ITapProps {
  showProductManageTab: () => void;
  showChargeCashTab: () => void;
  showPurchaseTab: () => void;
}
