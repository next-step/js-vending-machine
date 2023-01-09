import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class RestAmountFlushButton extends getCustomElementClass(HTMLButtonElement) {}

const CUSTOM_ELEMENT_NAME = 'rest-amount-flush-button';
const ELEMENT_TYPE = 'button';

window.customElements.define(CUSTOM_ELEMENT_NAME, RestAmountFlushButton, { extends: ELEMENT_TYPE });

export const createRestAmountFlushButton = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
