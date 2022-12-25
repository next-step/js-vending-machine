// eslint-disable-next-line no-unused-vars
import { VENDING_MACHINE_CONSTANT } from '../service/constant.js';
import UnitCountMachine from '../service/UnitCountMachine.js';
import { saveItem } from '../util/dataSaver.js';
import { DATA_STORAGE } from './constant.js';
import { SELECTOR_MAP, querySelector } from './selector.js';
import { setClickEventListenerWithVendingMachine } from './setListener.js';

const $element = {
  inputName: querySelector(SELECTOR_MAP.INPUT.PRODUCT_NAME),
  inputPrice: querySelector(SELECTOR_MAP.INPUT.PRODUCT_PRICE),
  inputAmount: querySelector(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT),
  inputChargeAmount: querySelector(SELECTOR_MAP.INPUT.CHARGE_AMOUNT),
  inputSpendingAmount: querySelector(SELECTOR_MAP.INPUT.SPENDING_MONEY_INPUT),
};
/**
 * @typedef {import('../service/VendingMachine').VendingMachine} VendingMachine
 * @typedef {import('../service/UnitCountMachine.js').UnitCountInfo} UnitCountInfo
 */

/**
 * @param {VendingMachine} vendingMachine
 */
export const renderTotalChargeAmount = (vendingMachine) => {
  querySelector(SELECTOR_MAP.SPAN.CHARGE_AMOUNT).innerText = vendingMachine.unitCountMachine.unitCountInfo.amount;
};

/**
 * @param {VendingMachine} vendingMachine
 */
export const renderSpendingAmount = (vendingMachine) => {
  querySelector(SELECTOR_MAP.SPAN.SPENDING_AMOUNT).innerText = vendingMachine.insertedMoney;
};

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
  vendingMachine.productManager.add({ name, price, amount });
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const insertCoins = (vendingMachine) => {
  vendingMachine.unitCountMachine.accumulate($element.inputChargeAmount.value);
};

/**
 *
 * @param {HTMLElement} element
 */
const clearInput = (inputElement) => {
  inputElement.value = '';
};

export const clearProductInputs = () => {
  [$element.inputName, $element.inputPrice, $element.inputAmount].forEach(clearInput);
};

export const clearChargeAmountInput = () => {
  clearInput($element.inputChargeAmount);
};

export const clearSpendingAmountInput = () => {
  clearInput($element.inputSpendingAmount);
};

/**
 *
 * @param {VendingMachine} vendingMachine
 */
export const renderProduct = (vendingMachine) => {
  const {
    productManager: { products },
  } = vendingMachine;
  querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_PRODUCT).tableBodyElement.innerHTML = products
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
 * @param {VendingMachine} vendingMachine
 */
export const renderChargeAmount = (vendingMachine) => {
  const unitCountInfo = vendingMachine.unitCountMachine.unitCountInfo;
  const units = UnitCountMachine.units;
  querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT).tableBodyElement.innerHTML = units
    .map(
      (unit) => `<tr>
      <td>${unit}${VENDING_MACHINE_CONSTANT.MONEY_UNIT}</td>
      <td>${unitCountInfo.unitInfo[unit]}${VENDING_MACHINE_CONSTANT.AMOUNT_POSTFIX}</td>
    </tr>`
    )
    .join('');
};

/**
 * @param {UnitCountInfo} unitCountInfo
 */
export const renderReturnedChanges = (unitCountInfo) => {
  const units = Object.keys(unitCountInfo.unitInfo);
  querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_RETURN_CHANGES).tableBodyElement.innerHTML = units
    .map(
      (unit) => `<tr>
      <td>${unit}${VENDING_MACHINE_CONSTANT.MONEY_UNIT}</td>
      <td>${unitCountInfo.unitInfo[unit]}${VENDING_MACHINE_CONSTANT.AMOUNT_POSTFIX}</td>
    </tr>`
    )
    .join('');
};

/**
 * @param {VendingMachine} vendingMachine
 */
export const renderPurchasableProduct = (vendingMachine) => {
  const {
    productManager: { products },
  } = vendingMachine;

  const element = querySelector(SELECTOR_MAP.TABLE.VENDING_MACHINE_PURCHASABLE_PRODUCT).tableBodyElement;
  element.innerHTML = products
    .map(
      ({ name, price, amount }) => `<tr>
      <td>${name}</td>
      <td>${price}</td>
      <td>${amount}</td>
      <td><button>구매하기</button></td>
    </tr>`
    )
    .join('');

  element.querySelectorAll('button').forEach((button, idx) => {
    setClickEventListenerWithVendingMachine(button, () => {
      // prettier-ignore
      const result = vendingMachine.purchase(idx);
      if (result) {
        renderPurchasableProduct(vendingMachine);
        renderSpendingAmount(vendingMachine);
        saveItem(DATA_STORAGE.PRODUCTS, vendingMachine.productManager.products);
      }
    });
  });
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
