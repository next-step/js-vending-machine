import { APP_KEY, COINS, ERROR_MESSAGE, INITIAL_STORE, STATE_KEY } from './constants.js';

class Storage {
  #key = APP_KEY;
  storage = window.localStorage;
  localState;

  constructor() {
    this.localState = { ...this.#pull(), [STATE_KEY.RETURNED]: COINS };
  }

  setState = payload => {
    if (payload instanceof Array) {
      payload.forEach(this.setState);
      return;
    }
    const { key, value } = payload;

    if (this.localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    this.localState[key] = value;
    this.#push();
  };

  getState = key => {
    if (this.localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    return this.localState[key];
  };

  getAllState() {
    return this.localState;
  }

  #push() {
    this.storage.setItem(this.#key, JSON.stringify(this.localState));
  }

  #pull() {
    const item = this.storage.getItem(this.#key);
    if (item === undefined) return { ...INITIAL_STORE };

    return JSON.parse(item);
  }
}

export default new Storage();
