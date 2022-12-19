// eslint-disable-next-line no-unused-vars
import { VENDING_MACHINE_CONSTANT } from '../service/constant.js';
import { SELECTOR_MAP, querySelector } from './selector.js';

const $element = {
  inputName: querySelector(SELECTOR_MAP.INPUT.PRODUCT_NAME),
  inputPrice: querySelector(SELECTOR_MAP.INPUT.PRODUCT_PRICE),
  inputAmount: querySelector(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT),
  inputChargeAmount: querySelector(SELECTOR_MAP.INPUT.CHARGE_AMOUNT),
};
/**
 * @typedef {import('../service/vendingmachine.js').VendingMachine} VendingMachine
 */

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const addProduct = (vendingMachine) => {
  // prettier-ignore
  const [name, price, amount] = [
    $element.inputName.value,
    $element.inputPrice.value,
    $element.inputAmount.value,
  ];
  vendingMachine.addItem({ name, price, amount });
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const insertCoins = (vendingMachine) => {
  vendingMachine.insertCoins(Number($element.inputChargeAmount.value));
};

/**
 *
 * @param {HTMLElement} element
 */
const clearInput = (inputElement) => {
  inputElement.value = '';
};

export const clearProductInputs = () => {
  [$element.inputName, $element.inputPrice, $element.inputAmount].forEach((input) => clearInput(input));
};

export const clearChargeAmountInput = () => {
  clearInput($element.inputChargeAmount);
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const renderProduct = (vendingMachine) => {
  const products = vendingMachine.getProducts();
  querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_PRODUCT_TBODY).innerHTML = products
    .map(
      ({ name, price, amount }) => `<tr>
      <td>${name}</td>
      <td>${price}</td>
      <td>${amount}</td>
    </tr>`
    )
    .join('');
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const renderChargeAmount = (vendingMachine) => {
  const unitCountMap = vendingMachine.unitCountInfo;
  const unitArray = vendingMachine.getUnits();
  querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT).innerHTML = unitArray.reduce((result, unit) => {
    const row = `<tr>
      <td>${unit}${VENDING_MACHINE_CONSTANT.MONEY_UNIT}</td>
      <td>${unitCountMap.unitInfo[unit]}${VENDING_MACHINE_CONSTANT.AMOUNT_POSTFIX}</td>
    </tr>`;
    return result + row;
  }, '');
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const renderTotalChargeAmount = (vendingMachine) => {
  querySelector(SELECTOR_MAP.SPAN.CHARGE_AMOUNT).innerText = vendingMachine.unitCountInfo.amount;
};

/**
 *
 * @param {string} tabElementSelector
 */
export const showTab = (tabElement) => {
  const tabs = Object.values(SELECTOR_MAP.TABS);
  tabs.forEach((tab) => {
    tab === tabElement ? querySelector(tab).classList.remove('hidden') : querySelector(tab).classList.add('hidden');
  });
};
