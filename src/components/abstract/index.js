import ErrorHandler from './ErrorHandler.js';
import Store from '../../store.js';
import { ERROR_MESSAGE } from '../../constants.js';

export default class ComponentHandler extends HTMLElement {
  #removeHandler = null;
  #store = Store;
  #errorHandler = ErrorHandler;

  constructor() {
    super();
    this.render(this.#store.getAllState());
  }

  connectedCallback() {
    this.#removeHandler = this.handlerBindWithReturnRemover();
  }

  disconnectedCallback() {
    if (this.#removeHandler === null) return;

    this.#removeHandler();
  }

  render() {
    throw new Error(ERROR_MESSAGE.NEED_TO_TEMPLATE);
  }

  getState(key) {
    return this.#store.getState(key);
  }

  setState(newState) {
    this.#store.setState(newState);

    this.render(this.#store.getAllState());
  }

  defineEvents() {
    return [];
  }

  handlerBindWithReturnRemover() {
    const events = this.defineEvents();
    events.forEach(({ type, callback }) => this.addEventListener(type, callback));
    return () => {
      events.forEach(({ type, callback }) => this.removeEventListener(type, callback));
    };
  }
}
