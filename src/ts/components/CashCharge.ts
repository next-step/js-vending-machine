import { ClassName, Id } from "../common/constants";
import Component from "../core/Component";

export default class CashCharge extends Component {
  show() {
    this.$target.classList.remove(ClassName.displayNone);
  }

  hide() {
    this.$target.classList.add(ClassName.displayNone);
  }

  protected htmlTemplate(): string {
    return /*html*/ `
	<h3>자판기 돈통 충전하기</h3>
	<div class="${ClassName.vendingMachineWrapper}">
		<input type="number" name="vending-machine-charge-amount" id="${Id.vendingMachineChargeInput}" autofocus />
		<button id="${Id.vendingMachineChargeButton}">충전하기</button>
	</div>
	<p>보유 금액: <span id="${Id.vendingMachineChargeAmount}">0</span>원</p>
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
			<tr>
				<td>500원</td>
				<td id="${Id.vendingMachineCoin500Quantity}"></td>
			</tr>
			<tr>
				<td>100원</td>
				<td id="${Id.vendingMachineCoin100Quantity}"></td>
			</tr>
			<tr>
				<td>50원</td>
				<td id="${Id.vendingMachineCoin50Quantity}"></td>
			</tr>
			<tr>
				<td>10원</td>
				<td id="${Id.vendingMachineCoin10Quantity}"></td>
			</tr>
		</tbody>
	</table>
	`;
  }
}
