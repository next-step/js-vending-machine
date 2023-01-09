import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class ProductList extends getCustomElementClass(HTMLTableSectionElement) {}

const CUSTOM_ELEMENT_NAME = 'product-list';
const ELEMENT_TYPE = 'tbody';

window.customElements.define(CUSTOM_ELEMENT_NAME, ProductList, { extends: ELEMENT_TYPE });

export const createProductList = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
