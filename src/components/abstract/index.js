import { useStore } from '../../helpers/index.js';

const store = useStore();

export default class ComponentHandler extends HTMLElement {
  #removeHandler = null;
  #store = store;

  constructor() {
    super();
    this.#store = store;
    this.render(this.#store.getState());
  }

  connectedCallback() {
    this.#removeHandler = this.bindHandler();
  }

  disconnectedCallback() {
    if (this.#removeHandler === null) return;

    this.#removeHandler();
  }

  render() {
    throw new Error('렌더링 할 템플릿을 지정해주세요!');
  }

  setState(key, value) {
    this.#store.setState(key, value);
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
}
