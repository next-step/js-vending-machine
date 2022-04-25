import { FORM } from '../constants/content-constant.js';
import { VENDING_MACHINE } from '../constants/vending-machine-constant.js';
import VendingMachineManage from '../VendingMachineManage.js';

function vendingMachineManageTemplate() {
  const $template = new DocumentFragment();
  const $tempElement = document.createElement('div');
  $template.append($tempElement);
  $tempElement.insertAdjacentHTML(
    'afterend',
    `
  <h3>자판기 돈통 충전하기</h3>
  <div class="vending-machine-wrapper">
    <form id="${FORM.VENDING_MACHINE}">
      <input required 
             min="${VENDING_MACHINE.MIN_CHARGING_COIN}"
             step="${VENDING_MACHINE.STEP_CHARGING_COIN}"
             type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" />
      <button type="submit" id="vending-machine-charge-button">충전하기</button>
    </form>
  </div>
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
    <tbody id="coin-inventory-container">
    <tr>
      <td>500원</td>
      <td id="vending-machine-coin-500-quantity"></td>
    </tr>
    <tr>
      <td>100원</td>
      <td id="vending-machine-coin-100-quantity"></td>
    </tr>
    <tr>
      <td>50원</td>
      <td id="vending-machine-coin-50-quantity"></td>
    </tr>
    <tr>
      <td>10원</td>
      <td id="vending-machine-coin-10-quantity"></td>
    </tr>
    </tbody>
  </table>
  `
  );
  $tempElement.remove();
  return $template;
}

// function coinTemplate() {}

function $chargeAmountInput() {
  return document.querySelector('#vending-machine-charge-input');
}

function $chargeAmount() {
  return document.querySelector('#vending-machine-charge-amount');
}

const VendingMachineManageView = (function () {
  function updateCoinList() {}

  function updateChargeAmount() {
    $chargeAmount().textContent = VendingMachineManage.chargeAmount();
  }

  function initialize() {
    updateChargeAmount();
    updateCoinList();
  }

  function initializeChargeFields() {
    $chargeAmountInput().value = null;
  }

  function handleChargingCoin(event) {
    event.preventDefault();
    try {
      VendingMachineManage.chargingCoin($chargeAmountInput().value);
      initialize();
      initializeChargeFields();
    } catch (e) {
      alert(e.message);
    }
  }

  function contents() {
    return vendingMachineManageTemplate();
  }

  return { contents, initialize, handleChargingCoin };
})();
export default VendingMachineManageView;
