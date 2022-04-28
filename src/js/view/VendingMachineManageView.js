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
    </tbody>
  </table>
  `
  );
  $tempElement.remove();
  return $template;
}

function coinTemplate({ name, quantity }) {
  const $template = new DocumentFragment();
  const $tr = document.createElement('tr');
  $tr.insertAdjacentHTML(
    'afterbegin',
    `
    <td>${name}원</td>
    <td id="vending-machine-coin-${name}-quantity">${quantity}개</td>
  `
  );
  $template.append($tr);
  return $template;
}

function $chargeAmountInput() {
  return document.querySelector('#vending-machine-charge-input');
}

function $chargeAmount() {
  return document.querySelector('#vending-machine-charge-amount');
}

function $chargeCoinInventory() {
  return document.querySelector('#coin-inventory-container');
}

const VendingMachineManageView = (function () {
  function updateChargeAmount() {
    $chargeAmount().textContent = VendingMachineManage.chargeAmount();
  }

  function updateChargeCoinList() {
    $chargeCoinInventory().replaceChildren(
      ...VendingMachineManage.chargeCoinList().map((chargeCoin) =>
        coinTemplate(chargeCoin)
      )
    );
  }

  function initializeChargeFields() {
    $chargeAmountInput().value = null;
  }

  function initialize() {
    updateChargeAmount();
    updateChargeCoinList();
    initializeChargeFields();
  }

  function handleChargingCoin(event) {
    event.preventDefault();
    try {
      VendingMachineManage.chargingCoin($chargeAmountInput().value);
      initialize();
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
