import { getProductManagerHTML, viewInitiator } from './views/productManagerView.js';
import { getVendingMachineManager, viewInitiator as vendingMachineInitiator } from './views/vendingMachineManagerView.js';

import { productManagerController, productInventoryContainerController } from './components/productManagerComponent.js';
import { vendingMachineControllerComponent, cashBoxComponent } from './components/vendingMachineManagerComponent.js';

import { binders, createBinder } from './binders.js';

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

$vendingMachineManageMenu.addEventListener('click', () => {
  const {
    vendingMachineControllerView,
    cashBoxView,
  } = vendingMachineInitiator($app, getVendingMachineManager());

  binders.vendingMachineControllerBinder = createBinder(vendingMachineControllerView, vendingMachineControllerComponent);
  binders.cashBoxBinder = createBinder(cashBoxView, cashBoxComponent);
});

$productPurchaseMenu.addEventListener('click', () => {
  
});
