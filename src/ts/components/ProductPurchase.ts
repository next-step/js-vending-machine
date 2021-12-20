import { ActionType, ClassName, Config, Id } from "../common/constants";
import { IProduct, globalStore } from "../common/globalStore";
import Component from "../core/Component";
import { $, id2Query } from "../core/dom";

export default class ProductPurchase extends Component {
  show() {
    this.$target.classList.remove(ClassName.displayNone);
  }

  hide() {
    this.$target.classList.add(ClassName.displayNone);
  }

  protected componentDidMount(): void {
    globalStore.subscribe(this.render, this);
    this.$target.addEventListener("change", (e: Event) => this.onChange(e));
    this.$target.addEventListener("click", (e: Event) => this.onClick(e));
  }

  private onClick(e: Event) {
    const $eventTarget = e.target as HTMLElement;
    if ($eventTarget.closest(id2Query(Id.chargeBtn))) {
      console.log("click");
      const $cashInput = this.getCashInputRef();
      globalStore.dispatch({
        type: ActionType.chargeAmount,
        payload: +$cashInput.value,
      });
    }
  }

  private onChange(e: Event) {
    const $cashInput = this.getCashInputRef();
    if (this.isNeededToStepDown(+$cashInput.value)) {
      $cashInput.stepDown();
    }
  }

  private getCashInputRef(): HTMLInputElement {
    return $(id2Query(Id.chargeInput), this.$target) as HTMLInputElement;
  }

  private isNeededToStepDown(cash: number): boolean {
    return cash % Config.PriceStep !== 0;
  }

  protected htmlTemplate(): string {
    const { amount, products } = globalStore.getState();
    return /*html*/ `
    <div class="${ClassName.purchaseContainer}">
	<h3>충전하기</h3>
	<div class="${ClassName.vendingMachineWrapper}">
		<input type="number" name="charge-amount" 
		  id="${Id.chargeInput}" 
		  min=${Config.PriceStep}
		  step=${Config.PriceStep}
		/>
		<button id="${Id.chargeBtn}">충전하기</button>
	</div>
	<p>충전 금액: <span id="${Id.chargeAmount}">${amount ?? 0}</span>원</p>
    </div>

    <h2>구매할 수 있는 상품 현황</h2>
    <table class="${ClassName.table}">
    <thead>
    <tr>
	<th class="${ClassName.tableCell}">상품명</th>
	<th class="${ClassName.tableCell}">가격</th>
	<th class="${ClassName.tableCell}">수량</th>
	<th class="${ClassName.tableCell}">구매</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
    `;
  }
}
