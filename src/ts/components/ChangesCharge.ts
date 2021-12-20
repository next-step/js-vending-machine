import { ActionType, ClassName, Config, Id } from "../common/constants";
import { globalStore } from "../common/globalStore";
import Component from "../core/Component";
import { $, id2Query } from "../core/dom";

export default class ChangesCharge extends Component {
  show() {
    this.$target.classList.remove(ClassName.displayNone);
  }

  hide() {
    this.$target.classList.add(ClassName.displayNone);
  }

  protected componentDidMount(): void {
    globalStore.subscribe(this.render, this);

    const onChange = () => {
      const $cashInput = this.getCashInputRef();
      if (this.isNeededToStepDown(+$cashInput.value)) {
        $cashInput.stepDown();
      }
    };

    const onClick = (e: Event) => {
      const $eventTarget = e.target as HTMLElement;
      const $chargeBtn = $eventTarget.closest(
        id2Query(Id.vendingMachineChargeButton)
      ) as HTMLInputElement;

      if ($chargeBtn) {
        const $cashInput = this.getCashInputRef();
        const cash = +$cashInput.value;
        if (cash >= Config.MinPrice) {
          globalStore.dispatch({
            type: ActionType.chargeChanges,
            payload: cash,
          });
        }
      }
    };

    this.$target.addEventListener("change", onChange);
    this.$target.addEventListener("click", onClick);
  }

  private getCashInputRef(): HTMLInputElement {
    return $(
      id2Query(Id.vendingMachineChargeInput),
      this.$target
    ) as HTMLInputElement;
  }

  private isNeededToStepDown(price: number): boolean {
    return price % Config.PriceStep !== 0;
  }

  protected htmlTemplate(): string {
    const changes = globalStore.getState().changes ?? [];

    const tableRowsHTML = Config.ChangeTypes.map(
      (changeType: number) => /*html*/ {
        return /*html*/ `
      <tr>
				<td>${changeType}원</td>
				<td id="${Id.vendingMachineCoinQuantity(changeType)}">${
          changes[changeType] ?? 0
        }개</td>
			</tr>`;
      }
    ).join("");

    const totalChanges = Config.ChangeTypes.reduce((acc, changeType) => {
      const prev = acc ?? 0;
      const cur = (changes[changeType] ?? 0) * +changeType;
      return prev + cur;
    }, 0);

    return /*html*/ `
	<h3>자판기 돈통 충전하기</h3>
	<div class="${ClassName.vendingMachineWrapper}">
		<input type="number" 
		  name="vending-machine-charge-amount" 
		  id="${Id.vendingMachineChargeInput}" 
		  min=${Config.MinPrice} step=${Config.PriceStep} autofocus 
		/>
		<button id="${Id.vendingMachineChargeButton}">충전하기</button>
	</div>
	<p>보유 금액: <span id="${Id.vendingMachineChargeAmount}">${totalChanges}</span>원</p>
	<h3>동전 보유 현황</h3>
	<table class="${ClassName.cashboxRemaining}">
		<colgroup>
			<col />
			<col />
		</colgroup>
		<thead>
			<tr>
				<th>동전</th>
				<th>개수</th>
			</tr>
		</thead>
		<tbody>
      ${tableRowsHTML}
		</tbody>
	</table>
	`;
  }
}
