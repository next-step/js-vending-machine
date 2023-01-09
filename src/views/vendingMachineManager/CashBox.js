import { getCustomElementClass, getCustomElementCreator } from '../../core/CustomComponent.js';

class CashBox extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'cash-box';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, CashBox, { extends: ELEMENT_TYPE });

export const createCashBox = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
