import './charging-money-input.js';

const template = /* html */ `
    <link rel="stylesheet" href="/src/css/index.css">
    <div id="charging-money-container" class="contents-container">
		<div class="purchase-container">
			<h3>충전하기</h3>
      <charging-money-input></charging-money-input>
			<p>충전 금액: <span id="charge-amount">0</span>원</p>
		</div>
		<table class="cashbox-change">
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
					<td id="coin-500-quantity"></td>
				</tr>
				<tr>
					<td>100원</td>
					<td id="coin-100-quantity"></td>
				</tr>
				<tr>
					<td>50원</td>
					<td id="coin-50-quantity"></td>
				</tr>
				<tr>
					<td>10원</td>
					<td id="coin-10-quantity"></td>
				</tr>
			</tbody>
		</table>
	</div>
`;

class ChargingMoney extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.innerHTML = template;
  }
}

window.customElements.define('charging-money', ChargingMoney);
