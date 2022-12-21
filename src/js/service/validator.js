/**
 *
 * @param {string} value
 * @returns
 */
export const isInteger = (value) =>
  !isNaN(Number(value)) && !(String(value).startsWith('1e-') || String(value).indexOf('.') >= 0);

/**
 *
 * @param {string|number} n
 * @param {number} multiple
 * @returns {boolean}
 */
export const isMultipleOf = (n, multiple) => Number(n) % multiple === 0;

/**
 *
 * @param {string|number} n
 * @param {number} minValue
 * @returns
 */
export const isGreaterThan = (n, minValue) => Number(n) >= minValue;
