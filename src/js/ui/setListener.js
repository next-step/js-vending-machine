import ValidationError from '../service/ValidationError.js';
import { vendingMachine } from '../service/VendingMachine.js';
import { querySelector } from './selector.js';
import { removeSpace } from '../util/string.js';

/**
 *
 * @param {HTMLElement} element
 * @param {function} callback
 * @returns
 */
export const setClickEventListenerWithVendingMachine = (element, callback) =>
  element.addEventListener('click', () => {
    try {
      callback(vendingMachine);
    } catch (error) {
      if (error instanceof ValidationError) {
        alert(error.message);
        return;
      }
      console.error(error);
    }
  });

/**
 * @param {HTMLElement} element
 * @param {function} callback
 * @returns
 */
export const setEnterEventListener = (element, callback) =>
  element.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      callback(vendingMachine);
      event.preventDefault();
    }
  });

/**
 * @param {HTMLElement} element
 */
export const setChangeRemovingSpaceListener = (element) => {
  element.addEventListener('change', function (event) {
    this.value = removeSpace(event.target.value);
  });
};
