import { VENDING_MACHINE_CONSTANT } from './constant.js';

const PRODUCT_MIN_PRICE = VENDING_MACHINE_CONSTANT.PRODUCT.MIN_PRICE;
const PRODUCT_MULTIPLE_PRICE = VENDING_MACHINE_CONSTANT.PRODUCT.MULTIPLE_PRICE;
const PRODUCT_MIN_AMOUNT = VENDING_MACHINE_CONSTANT.PRODUCT.MIN_AMOUNT;

const CHARGE_MIN_AMOUNT = VENDING_MACHINE_CONSTANT.CHANGES.MIN_AMOUNT;
const CHARGE_MULTIPLE = VENDING_MACHINE_CONSTANT.CHANGES.MULTIPLE;

/**
 *
 * @param {number} n
 * @returns
 */
const isInteger = (n) => !isNaN(n) && Number.isInteger(n);

/**
 *
 * @param {number} n
 * @param {number} multiple
 * @returns {boolean}
 */
const isMultipleOf = (n, multiple) => n % multiple === 0;

/**
 *
 * @param {number} n
 * @param {number} minValue
 * @returns
 */
const isGreaterThan = (n, minValue) => n >= minValue;

/**
 *
 * @param {string} name
 */
export const isNameValid = (name) => (name || '').length > 1;

/**
 *
 * @param {number} price
 */
export const isPriceValid = (price) =>
  isInteger(price) && isGreaterThan(price, PRODUCT_MIN_PRICE) && isMultipleOf(price, PRODUCT_MULTIPLE_PRICE);

/**
 *
 * @param {number} amount
 * @returns
 */
export const isAmountValid = (amount) => isInteger(amount) && isGreaterThan(amount, PRODUCT_MIN_AMOUNT);

/**
 *
 * @param {number} amount
 * @returns
 */
export const isInsertedCoinsValid = (amount) =>
  isInteger(amount) && isGreaterThan(amount, CHARGE_MIN_AMOUNT) && isMultipleOf(amount, CHARGE_MULTIPLE);
