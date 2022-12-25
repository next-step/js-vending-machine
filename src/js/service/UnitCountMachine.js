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

  constructor(unitCountInfo) {
    if (UnitCountMachine.#isValidUnitCountInfo(unitCountInfo)) {
      this.#unitCountInfo = unitCountInfo;
      return;
    }

    this.#unitCountInfo = {
      amount: 0,
      unitInfo: UnitCountMachine.units.reduce(
        (result, unit) => ({
          ...result,
          [unit]: 0,
        }),
        {}
      ),
    };
  }

  /**
   * @returns {UnitCountInfo}
   */
  get unitCountInfo() {
    return cloneDeep(this.#unitCountInfo);
  }

  /**
   * @returns {number[]}
   */
  static get units() {
    return UnitCountMachine.#UNITS.sort((a, b) => Number(b) - Number(a));
  }

  /**
   *
   * @param {number} amount
   */
  accumulate(amount) {
    UnitCountMachine.#validateCoins(amount);
    const insertedUnitCountInfo = UnitCountMachine.#insertUnit(Number(amount));
    this.#unitCountInfo = {
      amount: this.#unitCountInfo.amount + insertedUnitCountInfo.amount,
      unitInfo: UnitCountMachine.units.reduce(
        (result, unit) => {
          return { ...result, [unit]: insertedUnitCountInfo.unitInfo[unit] + this.#unitCountInfo.unitInfo[unit] };
        },
        { ...this.#unitCountInfo.unitInfo }
      ),
    };
  }

  /**
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  redraw(amount) {
    const remain = UnitCountMachine.#getRemainUnit(this.#unitCountInfo, amount);

    UnitCountMachine.units.forEach((unit) => {
      this.#unitCountInfo.unitInfo[unit] -= remain.unitInfo[unit];
    });

    return remain;
  }

  /**
   *
   * @param {UnitCountInfo} unitCountInfo
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  static #getRemainUnit(unitCountInfo, amount) {
    const { unitInfo: currentInfo } = unitCountInfo;
    const { unitInfo } = UnitCountMachine.units.reduce(
      ({ amount: remainAmount, unitInfo }, unit) => {
        const count = Math.min(Math.floor(remainAmount / unit), currentInfo[unit]);
        const sum = unit * count;

        return {
          amount: remainAmount - sum >= 0 ? remainAmount - sum : 0,
          unitInfo: {
            ...unitInfo,
            [unit]: count,
          },
        };
      },
      { amount }
    );
    return { amount: UnitCountMachine.units.reduce((result, unit) => result + unitInfo[unit] * unit, 0), unitInfo };
  }

  /**
   *
   * @param {number} amount
   * @returns {UnitCountInfo}
   */
  static #insertUnit(chargeAmount) {
    const { unitInfo } = UnitCountMachine.units.reduce(
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

  static #validateCoins(amount) {
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
   * @param {UnitCountInfo} unitCountInfo
   */
  static #isValidUnitCountInfo(unitCountInfo) {
    if (!unitCountInfo) return false;

    const keyInfo = {
      amount: { type: 'number' },
      unitInfo: { type: 'object' },
    };

    const isValidType = (value, type) => (value + '').length && typeof value === type;
    const shallowCheckResult = Object.keys(keyInfo).every((key) => isValidType(unitCountInfo[key], keyInfo[key].type));
    if (!shallowCheckResult) return false;

    return Object.keys(unitCountInfo.unitInfo).every((unit) => isValidType(unitCountInfo.unitInfo[unit], 'number'));
  }
}
