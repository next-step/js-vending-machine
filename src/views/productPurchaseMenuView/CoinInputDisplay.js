import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class CoinInputDisplay extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'coin-input-display';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, CoinInputDisplay, { extends: ELEMENT_TYPE });

export const createCoinInputDisplay = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
