import { VENDING_MACHINE_CONSTANT } from './Constant';

const MIN_PRICE = VENDING_MACHINE_CONSTANT.PRODUCTION.MIN_PRICE;
const MULTIPLE_PRICE = VENDING_MACHINE_CONSTANT.PRODUCTION.MULTIPLE_PRICE;
const MIN_AMOUNT = VENDING_MACHINE_CONSTANT.PRODUCTION.MIN_AMOUNT;

/**
 *
 * @param {string} name
 */
export const isNameValid = (name) => (name || '').length > 1;

/**
 *
 * @param {number} price
 * @returns {boolean}
 */
export const isPriceValid = (price) =>
  isNaN(price) && Number.isInteger(price) && price >= MIN_PRICE && price % MULTIPLE_PRICE === 0;

/**
 *
 * @param {number} amount
 * @returns
 */
export const isAmountValid = (amount) => isNaN(amount) && Number.isInteger(amount) && amount >= MIN_AMOUNT;
