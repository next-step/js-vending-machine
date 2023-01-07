import { entryObject } from "../utils/utils.js";

export function getCustomElementClass(Element) {
  class CustomElement extends Element {
    elements = {};
    dynamicElementSelectors = {};

    constructor() {
      super();
    }

    connectedCallback() {
      this.createElements();
    }

    disconnectedCallback() {
      this.elements = {};
    }

    init(children = [], dynamicElementSelectors = {}) {
      this.append(...children);
      this.dynamicElementSelectors = dynamicElementSelectors;
    }

    createElements() {
      this.scanDynamicElement();
      this.elements.rootElement = this;
    }

    scanDynamicElement() {
      entryObject(this.dynamicElementSelectors).forEach(([name, selector]) => {
        const element = this.querySelector(selector);
        if (!element) throw new Error(`selector "${selector}" does not exist`);
        this.elements[name] = element;
      });
    }

    attachEvent(eventObject) {
      entryObject(eventObject).forEach(([name, [eventType, eventCallback]]) => {
        this.elements[name].addEventListener(eventType, eventCallback);
      });
    }

    render(newElement) {
      if (newElement) {
        this.replaceWith(newElement);
        this.createElements();
      }
    }
  }

  return CustomElement;
}

export function getCustomElementCreator({
  elementType,
  customElementName,
}) {
  const customElement = document.createElement(elementType, { is: customElementName });

  return ({
    children,
    dynamicElementSelectors,
    attributes,
  }) => {
    customElement.init(children, dynamicElementSelectors);
    for (const key in attributes) {
      const val = attributes[key];
      customElement[key] = val;
    }

    return customElement;
  }
}
