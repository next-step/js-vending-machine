import { createVendingMachineController } from "./VendingMachineController.js";
import { createCashBox } from "./CashBox.js";
import { getHTMLElementFromHTMLString } from "../common.js";

export function vendingMachineManagerViewInitiator(rootElement) {
  const $vendingMachineController = createVendingMachineController({
    children: getVendingMachineControllerElements(),
    dynamicElementSelectors: {
      chargeAmountInput: '#vending-machine-charge-input',
      chargeButton: '#vending-machine-charge-button',
    },
    attributes: {
      className: 'vending-machine-wrapper',
      id: 'vending-machine-controller',
    },
  });

  const $cashBox = createCashBox({
    children: getCashBoxElements(),
    dynamicElementSelectors: {
      totalAmount: '#vending-machine-charge-amount',
      coin500: '#vending-machine-coin-500-quantity',
      coin100: '#vending-machine-coin-100-quantity',
      coin50: '#vending-machine-coin-50-quantity',
      coin10: '#vending-machine-coin-10-quantity',
    },
    attributes: {
      id: 'cash-box',
    },
  });

  const baseElements = [
    ...getVendingMachineManagerTitle(),
    $vendingMachineController,
    $cashBox,
  ];

  rootElement.append(...baseElements);

  return {
    vendingMachineControllerView: $vendingMachineController,
    cashBoxView: $cashBox,
  };
}

function getVendingMachineManagerTitle() {
  return getHTMLElementFromHTMLString('<h3>자판기 동전 충전하기</h3>');
}

function getVendingMachineControllerElements() {
  return getHTMLElementFromHTMLString(`
    <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
    <button id="vending-machine-charge-button">충전하기</button>
  `);
}

function getCashBoxElements() {
  return getHTMLElementFromHTMLString(`
    <p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
    <h3>자판기가 보유한 동전</h3>
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
          <td id="vending-machine-coin-500-quantity">0</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity">0</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity">0</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity">0</td>
        </tr>
      </tbody>
    </table>
  `);
}
