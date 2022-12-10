import { ELEMENT, querySelector } from './element.js';

const inputName = querySelector(ELEMENT.INPUT.PRODUCT_NAME);
const inputPrice = querySelector(ELEMENT.INPUT.PRODUCT_PRICE);
const inputAmount = querySelector(ELEMENT.INPUT.PRODUCT_AMOUNT);

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const addProduct = (vendingMachine) => {
  const [name, price, amount] = [inputName.value, Number(inputPrice.value), Number(inputAmount.value)];
  vendingMachine.addItem({ name, price, amount });
};

export const clearInputs = () => {
  [inputName, inputPrice, inputAmount].forEach((input) => (input.value = ''));
};

/**
 *
 * @param {import('../service/vendingmachine.js').VendingMachine} vendingMachine
 */
export const renderProduct = (vendingMachine) => {
  const products = vendingMachine.getItems();
  const innerHTML = products.reduce((result, { name, price, amount }) => {
    return result + `<tr>${[name, price, amount].reduce((result, prop) => result + `<td>${prop}</td>`, '')}</tr>`;
  }, '');
  querySelector(ELEMENT.TABLE.VENDING_MACHINE_PRODUCT_TBODY).innerHTML = innerHTML;
};
