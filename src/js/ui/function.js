// eslint-disable-next-line no-unused-vars
import { vendingMachine } from '../service/vendingmachine.js';
import { ELEMENT, querySelector } from './element.js';

const inputName = querySelector(ELEMENT.INPUT.PRODUCT_NAME);
const inputPrice = querySelector(ELEMENT.INPUT.PRODUCT_PRICE);
const inputAmount = querySelector(ELEMENT.INPUT.PRODUCT_AMOUNT);
const inputChargeAmount = querySelector(ELEMENT.INPUT.CHARGE_AMOUNT);
/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const addProduct = (vendingMachine) => {
  const [name, price, amount] = [inputName.value, Number(inputPrice.value), Number(inputAmount.value)];
  vendingMachine.addItem({ name, price, amount });
};

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const insertCoins = (vendingMachine) => {
  vendingMachine.insertCoins(Number(inputChargeAmount.value));
};

/**
 *
 * @param {HTMLElement} element
 */
const clearInput = (inputElement) => {
  inputElement.value = '';
};

export const clearProductInputs = () => {
  [inputName, inputPrice, inputAmount].forEach((input) => clearInput(input));
};

export const clearChargeAmountInput = () => {
  clearInput(inputChargeAmount);
};

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const renderProduct = (vendingMachine) => {
  const products = vendingMachine.getProducts();
  const innerHTML = products.reduce((result, { name, price, amount }) => {
    const row = `<tr>
      ${[name, price, amount].reduce((result, prop) => result + `<td>${prop}</td>`, '')}
    </tr>`;
    return result + row;
  }, '');
  querySelector(ELEMENT.TABLE.VENDING_MACHINE_PRODUCT_TBODY).innerHTML = innerHTML;
};

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const renderChargeAmount = (vendingMachine) => {
  const coins = vendingMachine.getChanges();
  const coinArray = Object.keys(coins).sort((a, b) => Number(b) - Number(a));
  const innerHTML = coinArray.reduce((result, unit) => {
    const row = `<tr>
      <td>${unit}원</td>
      <td>${coins[unit]}개</td>
    </tr>`;
    return result + row;
  }, '');

  querySelector(ELEMENT.TABLE.VENDING_MACHINE_CHARGE_AMOUNT).innerHTML = innerHTML;
};

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const renderTotalChargeAmount = (vendingMachine) => {
  querySelector(ELEMENT.SPAN.CHARGE_AMOUNT).innerText = vendingMachine.getTotalChanges();
};

/**
 *
 * @param {string} tabElementSelector
 */
export const showTab = (tabElement) => {
  const tabs = Object.values(ELEMENT.TABS);
  tabs.forEach((tab) => {
    tab === tabElement ? querySelector(tab).classList.remove('hidden') : querySelector(tab).classList.add('hidden');
  });
};
