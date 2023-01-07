import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class productInventoryContainer extends getCustomElementClass(HTMLTableSectionElement) {}

const CUSTOM_ELEMENT_NAME = 'product-inventory-container';
const ELEMENT_TYPE = 'tbody';

window.customElements.define(CUSTOM_ELEMENT_NAME, productInventoryContainer, { extends: ELEMENT_TYPE });

export const createProductInventoryContainer = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
