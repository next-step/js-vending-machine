import { VENDING_MACHINE_CONSTANT } from './constant.js';

//prettier-ignore
const {
  MIN_PRICE: PRODUCT_MIN_PRICE,
  MULTIPLE_PRICE: PRODUCT_MULTIPLE_PRICE,
  MIN_AMOUNT: PRODUCT_MIN_AMOUNT,
} = VENDING_MACHINE_CONSTANT.PRODUCT;

//prettier-ignore
const {
  MIN_AMOUNT: CHARGE_MIN_AMOUNT,
  MULTIPLE: CHARGE_MULTIPLE,
} = VENDING_MACHINE_CONSTANT.CHANGES;

/**
 *
 * @param {string} value
 * @returns
 */
const isInteger = (value) =>
  !isNaN(Number(value)) && !(String(value).startsWith('1e-') || String(value).indexOf('.') >= 0);

/**
 *
 * @param {string|number} n
 * @param {number} multiple
 * @returns {boolean}
 */
const isMultipleOf = (n, multiple) => Number(n) % multiple === 0;

/**
 *
 * @param {string|number} n
 * @param {number} minValue
 * @returns
 */
const isGreaterThan = (n, minValue) => Number(n) >= minValue;

/**
 *
 * @param {string} name
 */
export const isNameValid = (name) => (name || '').length > 0;

/**
 *
 * @param {number|string} price
 */
export const isPriceValid = (price) =>
  isInteger(price) && isGreaterThan(price, PRODUCT_MIN_PRICE) && isMultipleOf(price, PRODUCT_MULTIPLE_PRICE);
/**
 *
 * @param {number|string} amount
 * @returns
 */
export const isAmountValid = (amount) => isInteger(amount) && isGreaterThan(amount, PRODUCT_MIN_AMOUNT);

/**
 *
 * @param {number|string} amount
 * @returns
 */
export const isInsertedCoinsValid = (amount) =>
  isInteger(amount) && isGreaterThan(amount, CHARGE_MIN_AMOUNT) && isMultipleOf(amount, CHARGE_MULTIPLE);
