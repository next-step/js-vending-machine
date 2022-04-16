import { ERROR_MESSAGE, INITIAL_STORE } from '../constants.js';
import { getType } from './utils.js';

class Storage {
  #key = 'VENDING_MACHINE_APP';

  constructor() {
    this.storage = localStorage;
  }

  setStorage(value) {
    this.storage.setItem(this.#key, JSON.stringify(value));
  }

  getStorage() {
    const item = this.storage.getItem(this.#key);
    if (item === undefined) return {};

    return JSON.parse(item);
  }
}
/**
 *
 * 1. 최초 진입 시
 * - storage 초기화, storage[init];
 *
 * 2. 상품 탭에서 작업 시
 * - 페이지 진입 시 storage[pull](key);
 * - 입력 하면 storage[push](key, value);
 *
 * 3. 충전 탭에서 작업 시
 * - 페이지 진입 시 storage[pull](key);
 * - 입력 하면 storage[push](key, value);
 *
 * 4. 구매 탭에서 작업 시
 * - 페이지 진입 시 storage[pull](key);
 * - 동전 충전 시 storage[push](key, value);
 * - 구매 작업 시 storage[push](key, value);
 * - 반환 작업 시 storage[push](key, value);
 *
 *
 * pulling은 init, 구매 탭에서 작업 시
 */

export const useStore = () => {
  const storage = new Storage();
  let localState = { ...INITIAL_STORE, ...storage.getStorage() };

  const initStore = () => {
    localState = { ...localState, ...INITIAL_STORE };
    storage.setStorage(localState);
  };

  const setState = (key, value) => {
    if (localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);
    const valueType = getType(localState[key]);
    switch (valueType) {
      // Array
      case 'Array': {
        localState[key] = [value, ...localState[key]];
        break;
      }
      // Json
      case 'Object': {
        localState[key] = { ...localState[key], value };
        break;
      }
      // Array + Json
      default: {
        // TODO: Purchase Product
        localState[key] = value;
        break;
      }
    }

    storage.setStorage(localState);
  };

  const getState = key => {
    if (key === undefined) return localState;
    if (localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    return localState[key];
  };

  return {
    initStore,
    setState,
    getState,
  };
};
