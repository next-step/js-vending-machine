import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class CoinInputController extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'coin-input-controller';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, CoinInputController, { extends: ELEMENT_TYPE });

export const createCoinInputController = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
