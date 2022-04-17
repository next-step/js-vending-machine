import { APP_KEY, ERROR_MESSAGE, INITIAL_STORE } from './constants.js';
import { getType } from './helpers/index.js';

class Storage {
  #key = APP_KEY;

  constructor() {
    this.storage = localStorage;
    this.localState = { ...INITIAL_STORE, ...this.pull() };
  }

  push() {
    this.storage.setItem(this.#key, JSON.stringify(this.localState));
  }

  pull() {
    const item = this.storage.getItem(this.#key);
    if (item === undefined) return {};

    return JSON.parse(item);
  }

  initStore = () => {
    this.localState = { ...this.localState, ...INITIAL_STORE };
    this.push(this.localState);
  };

  setState = ({ key, value, isReplace = false }) => {
    if (this.localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    if (isReplace) {
      this.localState[key] = value;
      return;
    }

    const valueType = getType(this.localState[key]);
    switch (valueType) {
      // Array
      case 'Array': {
        this.localState[key] = [value, ...this.localState[key]];
        break;
      }
      // Json
      case 'Object': {
        this.localState[key] = { ...this.localState[key], value };
        break;
      }
      // Array + Json
      default: {
        // TODO: Purchase Product
        this.localState[key] = value;
        break;
      }
    }
  };

  getState = key => {
    if (key === undefined) return this.localState;
    if (this.localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    return this.localState[key];
  };
}

export default new Storage();
