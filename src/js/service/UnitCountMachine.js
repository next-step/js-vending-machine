import { cloneDeep } from '../util/object.js';
import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import ValidationError from './ValidationError.js';
import { isGreaterThan, isInteger, isMultipleOf } from './validator.js';

/**
 * @typedef {Object} UnitCountInfo
 * @property {number} amount
 * @property {Object.<string, number>} unitInfo
 */

//prettier-ignore
const {
  MIN_AMOUNT: CHARGE_MIN_AMOUNT,
  MULTIPLE: CHARGE_MULTIPLE,
} = VENDING_MACHINE_CONSTANT.UNIT_INFO;

export default class UnitCountMachine {
  /**@type {UnitCountInfo} */
  #unitCountInfo;
  static #UNITS = VENDING_MACHINE_CONSTANT.UNIT_INFO.UNITS;

  constructor() {
    this.#unitCountInfo = {
      amount: 0,
      unitInfo: UnitCountMachine.#UNITS.reduce(
        (result, unit) => ({
          ...result,
          [unit]: 0,
        }),
        {}
      ),
    };
  }

  /**
   *
   * @returns {UnitCountInfo}
   */
  get unitCountInfo() {
    return cloneDeep(this.#unitCountInfo);
  }

  /**
   *
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  #calculateUnitCountInfo(chargeAmount) {
    const { unitInfo } = this.units.reduce(
      ({ amount, unitInfo }, unit) => {
        const count = Math.floor(amount / unit);
        return {
          amount: amount - count * unit,
          unitInfo: { ...unitInfo, [unit]: count },
        };
      },
      { amount: chargeAmount, unitInfo: {} }
    );
    return { amount: chargeAmount, unitInfo };
  }

  get units() {
    return Object.keys(this.#unitCountInfo.unitInfo).sort((a, b) => Number(b) - Number(a));
  }

  #validateCoins(amount) {
    if (!UnitCountMachine.#isInsertedCoinsValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.CHARGE_AMOUNT);
    }
  }

  /**
   *
   * @param {number|string} amount
   * @returns
   */
  static #isInsertedCoinsValid(amount) {
    return isInteger(amount) && isGreaterThan(amount, CHARGE_MIN_AMOUNT) && isMultipleOf(amount, CHARGE_MULTIPLE);
  }

  /**
   *
   * @param {number} amount
   */
  accumulateUnitCountInfo(amount) {
    this.#validateCoins(amount);
    const insertedUnitCountInfo = this.#calculateUnitCountInfo(Number(amount));
    this.#unitCountInfo = {
      amount: this.#unitCountInfo.amount + insertedUnitCountInfo.amount,
      unitInfo: Object.keys(insertedUnitCountInfo.unitInfo).reduce(
        (result, unit) => {
          return { ...result, [unit]: insertedUnitCountInfo.unitInfo[unit] + this.#unitCountInfo.unitInfo[unit] };
        },
        { ...this.#unitCountInfo.unitInfo }
      ),
    };
  }
}
