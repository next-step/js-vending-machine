import { getCustomElementClass, getCustomElementCreator } from "../../core/CustomComponent.js";

class ProductManagerCustomContainer extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'product-manager-custom-container';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, ProductManagerCustomContainer, { extends: ELEMENT_TYPE });

export const createProductManagerCustomContainer = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
