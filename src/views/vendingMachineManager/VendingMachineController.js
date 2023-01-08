import { getCustomElementClass, getCustomElementCreator } from '../../core/CustomComponent.js';

class VendingMachineController extends getCustomElementClass(HTMLDivElement) {}

const CUSTOM_ELEMENT_NAME = 'vending-machine-controller';
const ELEMENT_TYPE = 'div';

window.customElements.define(CUSTOM_ELEMENT_NAME, VendingMachineController, { extends: ELEMENT_TYPE });

export const createVendingMachineController = getCustomElementCreator({ elementType: ELEMENT_TYPE, customElementName: CUSTOM_ELEMENT_NAME });
