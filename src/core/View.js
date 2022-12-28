import { entryObject } from "../utils/utils.js";

class View {
  rootElement = null;
  #dynamicElementSelectors = {};

  constructor(rootElement, dynamicElementSelectors = {}) {
    this.rootElement = rootElement;
    this.#dynamicElementSelectors = dynamicElementSelectors;
    this.#scanDynamicElement();
  }

  #scanDynamicElement() {
    entryObject(this.#dynamicElementSelectors).forEach(([name, selector]) => {
      const element = this.rootElement.querySelector(selector);
      if (!element) throw new Error(`selector "${selector}" does not exist`);
      this[name] = element;
    });
  }

  attachEvent(eventObject) {
    entryObject(eventObject).forEach(([name, [eventType, eventCallback]]) => {
      this[name].addEventListener(eventType, eventCallback);
    });
  }

  render(newElement) {
    this.rootElement.replaceWith(newElement);
    this.#scanDynamicElement();
  }
}

export { View };
