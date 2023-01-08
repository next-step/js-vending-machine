import { entryObject } from './utils/utils.js';

export const PRODUCT_CONTAINER_BINDER = 'productContainerBinder';
export const PRODUCT_INVENTORY_CONTAINER_BINDER = 'productInventoryContainerBinder';
export const VENDING_MACHINE_CONTROLLER_BINDER = 'vendingMachineControllerBinder';
export const CASH_BOX_BINDER = 'cashBoxBinder';
export const COIN_INPUT_CONTROLLER_BINDER = 'coinInputControllerBinder';
export const COIN_INPUT_DISPLAY_BINDER = 'coinInputDisplayBinder';
export const PRODUCT_LIST_BINDER = 'productListBinder';
export const REST_AMOUNT_FLUSH_BUTTON_BINDER = 'restAmountFlushButtonBinder';
export const REST_AMOUNT_FLUSH_DISPLAY_BINDER = 'restAmountFlushDisplayBinder';

export const binders = {
  [PRODUCT_CONTAINER_BINDER]: null,
  [PRODUCT_INVENTORY_CONTAINER_BINDER]: null,
  [VENDING_MACHINE_CONTROLLER_BINDER]: null,
  [CASH_BOX_BINDER]: null,
  [COIN_INPUT_CONTROLLER_BINDER]: null,
  [COIN_INPUT_DISPLAY_BINDER]: null,
  [PRODUCT_LIST_BINDER]: null,
  [REST_AMOUNT_FLUSH_BUTTON_BINDER]: null,
  [REST_AMOUNT_FLUSH_DISPLAY_BINDER]: null,
};

export function render(binderName) {
  binders[binderName]?.();
}

export function createBinder(view, viewModelCreator) {
  const render = () => {
    const vm = viewModelCreator();
    const el = bindViewModelWithView(vm, view);
    view.render(el);
  }
  render();

  return render;
}

function bindViewModelWithView(vm, view) {
  entryObject(vm).forEach(([elementName, elementViewModel]) => {
    const pairElement = view.elements[elementName];
    entryObject(elementViewModel).forEach(([key, val]) => {
      if (key === 'events') {
        entryObject(val).forEach(([eventType, callback]) => {
          pairElement.addEventListener(eventType, callback);
        });
        return;
      }

      if (key === 'ref') {
        val.element = pairElement;
        val.onRenderCallbacks.forEach((onRenderCallback) => onRenderCallback(val.element));
        val.onRenderCallbacks = [];
        return;
      }

      if (key === 'children') {
        pairElement.innerHTML = val;
      }
    });
  });

  return view.rootElement;
}
