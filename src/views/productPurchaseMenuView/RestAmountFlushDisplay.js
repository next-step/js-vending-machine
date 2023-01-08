import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class RestAmountFlushDisplay extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'rest-amount-flush-display';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, RestAmountFlushDisplay, { extends: ELEMENT_TYPE });

export const createRestAmountFlushDisplay = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
