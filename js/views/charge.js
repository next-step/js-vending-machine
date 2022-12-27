import { COINS, SELECTOR } from '../constants/constant.js';
import { $ } from '../utils/selector.js';

export const renderVendingMachineManage = (charge) => {
  const template = `
    <h3>자판기 돈통 충전하기</h3>
    <form class="vending-machine-wrapper">
      <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
      <button type="submit" id="vending-machine-charge-button">충전하기</button>
    </form>
    <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
    <h3>동전 보유 현황</h3>
    <table class="cashbox-remaining">
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
          <td id="vending-machine-coin-500-quantity">0개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity">0개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity">0개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity">0개</td>
        </tr>
      </tbody>
    </table>
  `;
  $(SELECTOR.APP).insertAdjacentHTML('afterbegin', template);

  if (charge && charge.amount > 0) {
    renderTotalCharge(charge.amount);
    renderCoins(charge.coins);
  }
};

export const renderCoins = (coins) => {
  $(SELECTOR.CASHBOX_BODY).replaceChildren();
  const template = `
    <tr>
			<td>500원</td>
			<td id="vending-machine-coin-500-quantity" class="vending-machine-coin">${
        coins[COINS.COIN_500]
      }개</td>
		</tr>
		<tr>
			<td>100원</td>
			<td id="vending-machine-coin-100-quantity" class="vending-machine-coin">${
        coins[COINS.COIN_100]
      }개</td>
		</tr>
		<tr>
			<td>50원</td>
			<td id="vending-machine-coin-50-quantity" class="vending-machine-coin">${
        coins[COINS.COIN_50]
      }개</td>
		</tr>
		<tr>
			<td>10원</td>
			<td id="vending-machine-coin-10-quantity" class="vending-machine-coin">${
        coins[COINS.COIN_10]
      }개</td>
		</tr>`;

  $(SELECTOR.CASHBOX_BODY).insertAdjacentHTML('afterbegin', template);
};

export const renderTotalCharge = (amount) => {
  $(SELECTOR.CHARGE_TOTAL).innerText = amount;
};

export const clearChargeForm = () => {
  $(SELECTOR.CHARGE_FORM_INPUT).value = '';
};
