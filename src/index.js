import { getProductManagerHTML, viewInitiator } from './components/productManager.js';
import { getProductPurchaseHTML } from './components/productPurchase.js';
import { getVendingMachineManageMenuHTML } from './components/vendingMachineManageMenu.js';

import { productManagerController } from './controller/productManagerController.js';
import { productInventoryContainerController } from './controller/productManagerController.js';

import { binders } from './binders.js';
import { entryObject } from './utils/utils.js';

const $app = document.getElementById('app');
const $productManageMenu = document.getElementById('product-manage-menu');
const $vendingMachineManageMenu = document.getElementById('vending-machine-manage-menu');
const $productPurchaseMenu = document.getElementById('product-purchase-menu');

$productManageMenu.addEventListener('click', () => {
  const {
    productContainerView,
    productInventoryContainerView,
  } = viewInitiator($app, getProductManagerHTML());

  binders.productContainerBinder = createBinder(productContainerView, productManagerController);
  binders.productInventoryContainerBinder = createBinder(productInventoryContainerView, productInventoryContainerController);
});

function createBinder(view, viewModelCreator) {

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
          return;
        }

        if (key === 'children') {
          pairElement.innerHTML = val;
        }
      });
    });

    return view.rootElement;
  }

  const render = () => {
    const vm = viewModelCreator();
      const el = bindViewModelWithView(vm, view);
      view.render(el);
  }
  render();

  return render;
}

$vendingMachineManageMenu.addEventListener('click', () => {
  $app.innerHTML = getVendingMachineManageMenuHTML();
});

$productPurchaseMenu.addEventListener('click', () => {
  $app.innerHTML = getProductPurchaseHTML();
});
