import ErrorHandler from './ErrorHandler.js';
import Store from '../../store.js';

export default class ComponentHandler extends HTMLElement {
  #removeHandler = null;
  #store = Store;
  #errorHandler = ErrorHandler;
  #timerId = null;

  constructor() {
    super();
    this.render(this.#store.getState());
    this.#timerId = setInterval(() => this.#store.push(), 2000);
  }

  connectedCallback() {
    this.#removeHandler = this.bindHandler();
    this.#store.pull();
  }

  disconnectedCallback() {
    if (this.#removeHandler === null) return;

    this.#removeHandler();
    this.#store.push();
    clearInterval(this.#timerId);
  }

  render() {
    throw new Error('렌더링 할 템플릿을 지정해주세요!');
  }

  getState(key) {
    return this.#store.getState(key);
  }

  setState(newState) {
    this.#store.setState(newState);

    this.render(this.#store.getState());
  }

  defineEvents() {
    return [];
  }

  bindHandler() {
    const events = this.defineEvents();
    events.forEach(({ type, callback }) => this.addEventListener(type, callback));
    return () => {
      events.forEach(({ type, callback }) => this.removeEventListener(type, callback));
    };
  }

  dispatch(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
    return this;
  }

  printError() {
    this.#errorHandler.printStackLog();
  }
}
