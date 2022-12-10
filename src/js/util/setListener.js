import { vendingMachine } from '../service/vendingmachine.js';
import { querySelector } from '../ui/element.js';
import { removeSpace } from './string.js';

/**
 *
 * @param {string} selector
 * @param {function} callback
 * @returns
 */
export const setClickEventListener = (selector, callback) =>
  querySelector(selector).addEventListener('click', () => callback(vendingMachine));

/**
 *
 * @param {string} selector
 * @param {function} callback
 * @returns
 */
export const setEnterEventListener = (selector, callback) =>
  querySelector(selector).addEventListener('keypress', (event) => {
    if (event.key === 'Enter') callback(vendingMachine);
  });

export const setChangeRemovingSpaceListener = (selector) => {
  querySelector(selector).addEventListener('change', function (event) {
    this.value = removeSpace(event.target.value);
  });
};
