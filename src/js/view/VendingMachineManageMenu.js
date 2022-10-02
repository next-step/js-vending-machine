import { ERROR_MESSAGE, MENU, MIN_PRODUCT } from '../constants/index.js';
import { checkPriceUnit, checkValidation } from '../validate/index.js';
import VendingMachineManageMenuService from '../service/VendingMachineManageMenuService.js';

class VendingMachineManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
    this.initEventListener();
  }

  vendingMachineManageMenuTemplate = `
    <h3>자판기 돈통 충전하기</h3>
    <div class="vending-machine-wrapper">
      <form id="vending-machine-form">
        <input name="vending-machine-charge-amount" type="number" id="vending-machine-charge-input" min=${MIN_PRODUCT.PRICE} autofocus placeholder="자판기가 보유할 금액"/>
        <button id="vending-machine-charge-button">충전하기</button>
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
      <tbody>
        <tr>
          <td>500원</td>
          <td id="vending-machine-coin-500-quantity">{coin500}</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity">{coin100}</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity">{coin50}</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity">{coin10}</td>
        </tr>
      </tbody>
    </table>
    `;

  initRenderer() {
    this.app.innerHTML = this.vendingMachineManageMenuTemplate;
  }

  chargeMoneyBox = e => {
    e.preventDefault();

    const vendingMachinePrice = new FormData(e.target).get(MENU.VENDING_MACHINE_CHARGE_CLASSNAME);

    try {
      const inputCondition = checkPriceUnit(vendingMachinePrice);
      checkValidation(inputCondition, ERROR_MESSAGE.INVALID_CHARGE_UNIT);

      VendingMachineManageMenuService.setChargePriceState(vendingMachinePrice);

      this.initRenderer();
    } catch (error) {
      alert(error.message);
    }
  };

  initEventListener() {
    const $vendingMachineForm = document.querySelector('#vending-machine-form');
    $vendingMachineForm.addEventListener('submit', this.chargeMoneyBox.bind(this));
  }
}

export default VendingMachineManageMenu;
