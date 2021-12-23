import {
  ActionType,
  AlertMsg,
  ClassName,
  Config,
  Id,
} from "../common/constants";
import { globalStore } from "../common/globalStore";
import Component from "../core/Component";
import { $, class2Query, id2Query } from "../core/dom";
import CoinChanger from "./CoinChanger";

export default class ProductPurchase extends Component {
  private coinChangerComp?: CoinChanger;
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
    this.coinChangerComp = new CoinChanger(
      $(id2Query(Id.coinChanger), this.$target)
    );
  }

  protected componentDidUpdate(): void {
    this.coinChangerComp = new CoinChanger(
      $(id2Query(Id.coinChanger), this.$target)
    );
  }

  private onClick(e: Event) {
    const $eventTarget = e.target as HTMLElement;
    if ($eventTarget.closest(id2Query(Id.chargeBtn))) {
      const $cashInput = this.getCashInputRef();
      globalStore.dispatch({
        type: ActionType.chargeAmount,
        payload: +$cashInput.value,
      });
    }

    const $purchaseBtn = $eventTarget.closest(
      class2Query(ClassName.purchaseBtn)
    ) as HTMLElement;
    if ($purchaseBtn) {
      const name = $purchaseBtn.dataset.id ?? "";
      this.purchaseProduct(name);
    }
  }

  private purchaseProduct(productName: string) {
    try {
      this.validatePurchase(productName);
      globalStore.dispatch({
        type: ActionType.purchaseProduct,
        payload: productName,
      });
    } catch (error: any) {
      alert(error?.message);
      return;
    }
  }

  private validatePurchase(productName: string) {
    const { amount, products } = globalStore.getState();
    const product = products.find(({ name }) => name === productName);
    if (!product) {
      throw Error(AlertMsg.notFoundProduct);
    }
    if (product.quantity === 0) {
      throw Error(AlertMsg.productSoldOut);
    }
    if (product.price > amount) {
      throw Error(AlertMsg.notEnoughAmount);
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

    const tableBodyHTML = (products ?? [])
      .map(
        ({ name, price, quantity }) => /*html*/ `
	      <tr class="${ClassName.productManageItem}">
          <td class="${ClassName.productManageName} ${ClassName.tableCell}">${name}</td>
          <td class="${ClassName.productManagePrice} ${ClassName.tableCell}">${price}</td>
          <td class="${ClassName.productManageQuantity} ${ClassName.tableCell}">${quantity}</td>
          <td class="${ClassName.tableCell}">
            <button class="${ClassName.purchaseBtn}" data-id="${name}">구매하기</button>
          </td>
	      </tr>`
      )
      .join("");

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
      ${tableBodyHTML}
    </tbody>
    </table>
    <div id="${Id.coinChanger}"></div>
    `;
  }
}
