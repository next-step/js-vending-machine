import { entryObject } from './utils/utils.js';

export const binders = {
  productContainerBinder: null,
  productInventoryContainerBinder: null,
  vendingMachineControllerBinder: null,
  cashBoxBinder: null,
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
    const pairElement = view[elementName];
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
        return;
      }

      if (key === 'children') {
        pairElement.innerHTML = val;
      }
    });
  });

  return view.rootElement;
}
