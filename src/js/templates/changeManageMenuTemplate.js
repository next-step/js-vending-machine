import { TITLE, CHANGE_INPUT_PROPERTIES, VENDING_MACHINE_TABLE_LABEL, BUTTON_NAME } from '../constants/common.js';
import SELECTOR from '../constants/selector.js';
import { createTableTh } from './common.js';

export const vendingMachineChargeAddInput = (id, type, text) => `
  <input type="${type}" id="${id}" placeholder="${text}" />
`;

export const changeAddFormTemplate = `
  <h3>${TITLE.VENDING_MACHINE_MANAGE.CHARGE}</h3>
  <div class="${SELECTOR.vendingMachineWapper}">
    ${CHANGE_INPUT_PROPERTIES.map(it => vendingMachineChargeAddInput(it.id, it.type, it.text)).join('')}
    <button id="${SELECTOR.vendingMachineChargeButtonId}">${BUTTON_NAME.CHARGE}</button>
  </div>
`;

export const vendingMachingTableTemplate = `
<h3>${TITLE.VENDING_MACHINE_MANAGE.CONINS}</h3>
<table class="${SELECTOR.cashboxRemaining}">
  <colgroup>
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      ${VENDING_MACHINE_TABLE_LABEL.map(it => createTableTh(it)).join('')}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>500원</td>
      <td id="${SELECTOR.vendingMachineCoin500QuantityId}"></td>
    </tr>
    <tr>
      <td>100원</td>
      <td id="${SELECTOR.vendingMachineCoin100QuantityId}"></td>
    </tr>
    <tr>
      <td>50원</td>
      <td id="${SELECTOR.vendingMachineCoin50QuantityId}"></td>
    </tr>
    <tr>
      <td>10원</td>
      <td id="${SELECTOR.vendingMachineCoin10QuantityId}"></td>
    </tr>
  </tbody>
</table>
`;