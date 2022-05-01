import { SELECTOR } from '../constants.js';

export const vendingMachineManageTabTemplate = () => String.raw`
  <h3>자판기 돈통 충전하기</h3>
  <form class="vending-machine-wrapper">
    <input
      type="number"
      name="vending-machine-charge-amount"
      id="${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}"
      autofocus
    />
    <button id="${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}">충전하기</button>
  </form>
  <p>보유 금액: <span id="${SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT_ID}">0</span>원</p>
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
        <td id="${SELECTOR.VENDING_MACHINE_COIN_500_QUANTITY_ID}"></td>
      </tr>
      <tr>
        <td>100원</td>
        <td id="${SELECTOR.VENDING_MACHINE_COIN_100_QUANTITY_ID}"></td>
      </tr>
      <tr>
        <td>50원</td>
        <td id="${SELECTOR.VENDING_MACHINE_COIN_50_QUANTITY_ID}"></td>
      </tr>
      <tr>
        <td>10원</td>
        <td id="${SELECTOR.VENDING_MACHINE_COIN_10_QUANTITY_ID}"></td>
      </tr>
    </tbody>
  </table>
`;
