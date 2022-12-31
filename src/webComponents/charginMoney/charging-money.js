import { ALERT } from '../../constants/alert.js';
import { $ELEMENT } from '../../constants/element.js';
import { makeRadonValueWithMax } from '../../js/utils/random.js';
import './charging-money-input.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
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
    this.coinMap = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
    this.chargedTotal = 0;
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));

    this.$chargingMoneyInput = this.root.querySelector('charging-money-input');
    this.$chargeAmount = this.root.querySelector('#charge-amount');
    this.$coin500Count = this.root.querySelector($ELEMENT.COIN_500_COUNT);
    this.$coin100Count = this.root.querySelector($ELEMENT.COIN_100_COUNT);
    this.$coin50Count = this.root.querySelector($ELEMENT.COIN_50_COUNT);
    this.$coin10Count = this.root.querySelector($ELEMENT.COIN_10_COUNT);

    this.$chargingMoneyInput.addEventListener('onMoneySubmit', (e) => {
      this.addCharge(e);
    });
    this.render();
  }

  makeCoinCount = (coins) => {
    const coin500 = coins >= 500 ? makeRadonValueWithMax({ max: coins / 500 }) : 0;
    coins -= coin500 * 500;
    const coin100 = coins >= 100 ? makeRadonValueWithMax({ max: coins / 100 }) : 0;
    coins -= coin100 * 100;
    const coin50 = coins >= 50 ? makeRadonValueWithMax({ max: coins / 50 }) : 0;
    coins -= coin50 * 50;
    const coin10 = coins >= 10 ? Math.floor(coins / 10) : 0;
    coins -= coin10 * 10;

    return {
      coin500,
      coin100,
      coin50,
      coin10,
    };
  };

  makeRandomCoins = (chargedMoney) => {
    const { coin500, coin100, coin50, coin10 } = this.makeCoinCount(chargedMoney);

    const prevMap = this.coinMap;

    const newCoinMap = {
      500: prevMap[500] + coin500,
      100: prevMap[100] + coin100,
      50: prevMap[50] + coin50,
      10: prevMap[10] + coin10,
    };

    return newCoinMap;
  };

  addTotal(typedCoin) {
    console.log(typeof typedCoin);
    this.chargedTotal += typedCoin;
  }

  setNewCoinMap(newCoinMap) {
    this.coinMap = newCoinMap;
  }

  addCharge(e) {
    const typedCoin = Number(e.detail);

    const isValidCoin = typedCoin >= 100 && typedCoin % 10 === 0 && typedCoin;

    if (!isValidCoin) alert(ALERT.CHARGE_VALIDATION);

    const newCoinMap = this.makeRandomCoins(typedCoin);
    this.setNewCoinMap(newCoinMap);
    this.addTotal(typedCoin);
    this.render();
  }

  renderTotalCoin = ({ totalAmount }) => {
    this.$chargeAmount.innerText = totalAmount;
  };

  renderCoinsList = ({ coinMap }) => {
    console.log(this.$coin100Count);
    const { $coin500Count, $coin100Count, $coin50Count, $coin10Count } = this;

    $coin500Count.innerText = coinMap[500];
    $coin100Count.innerText = coinMap[100];
    $coin50Count.innerText = coinMap[50];
    $coin10Count.innerText = coinMap[10];
  };

  render() {
    this.$chargeAmount = this.root.querySelector('#charge-amount');
    this.renderTotalCoin({ totalAmount: this.chargedTotal });
    this.renderCoinsList({ coinMap: this.coinMap });
  }
}

window.customElements.define('charging-money', ChargingMoney);
