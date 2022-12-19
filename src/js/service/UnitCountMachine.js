import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from './constant.js';
import ValidationError from './ValidationError.js';
import { isInsertedCoinsValid } from './validator.js';

/**
 * @typedef {Object} UnitCountInfo
 * @property {number} amount
 * @property {Object.<string, number>} unitInfo
 */

export default class UnitCountMachine {
  /**@type {UnitCountInfo} */
  #unitCountInfo;

  constructor() {
    this.#unitCountInfo = {
      amount: 0,
      unitInfo: VENDING_MACHINE_CONSTANT.CHANGES.UNITS.reduce(
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
    return this.#unitCountInfo;
  }

  /**
   *
   * @returns {number[]}
   */
  getUnits() {
    return Object.keys(this.#unitCountInfo.unitInfo).sort((a, b) => Number(b) - Number(a));
  }

  /**
   *
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  #getUnitCountInfo(chargeAmount) {
    const { unitInfo } = this.#units.reduce(
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

  get #units() {
    return Object.keys(this.#unitCountInfo.unitInfo).sort((a, b) => Number(b) - Number(a));
  }

  get UnitCountInfo() {
    return this.#unitCountInfo;
  }

  #validateCoins(amount) {
    if (!isInsertedCoinsValid(amount)) {
      throw new ValidationError(ALERT_MESSAGE.VALIDATION.CHARGE_AMOUNT);
    }
  }

  /**
   *
   * @param {number} amount
   */
  accumulateUnitCountInfo(amount) {
    this.#validateCoins(amount);
    const insertedUnitCountInfo = this.#getUnitCountInfo(amount);
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
