import { getProductManagerHTML, viewInitiator } from './views/productManagerView.js';
import { getProductPurchaseHTML } from './components/productPurchase.js';
import { getVendingMachineManageMenuHTML } from './components/vendingMachineManageMenu.js';

import { productManagerController } from './components/productManagerComponent.js';
import { productInventoryContainerController } from './components/productManagerComponent.js';

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
  $app.innerHTML = getVendingMachineManageMenuHTML();
});

$productPurchaseMenu.addEventListener('click', () => {
  $app.innerHTML = getProductPurchaseHTML();
});
