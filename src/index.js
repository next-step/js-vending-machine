import { productManagerViewInitiator } from './views/productManagerView/index.js';
import { vendingMachineManagerViewInitiator } from './views/vendingMachineManager/index.js';
import { productPurchaseMenuInitiator } from './views/productPurchaseMenuView/index.js';

import { productManagerController, productInventoryContainerController } from './components/productManagerComponent/index.js';
import { vendingMachineControllerComponent, cashBoxComponent } from './components/vendingMachineManagerComponent/index.js';
import {
  coinInputControllerComponent,
  coinInputDisplayComponent,
  productListComponent,
  restAmountFlushButtonComponent,
  restAmountFlushDisplayComponent,
} from './components/productPurchaseMenuComponent/index.js';

import { binders, createBinder } from './binders.js';

const $app = document.getElementById('app');
const $productManageMenu = document.getElementById('product-manage-menu');
const $vendingMachineManageMenu = document.getElementById('vending-machine-manage-menu');
const $productPurchaseMenu = document.getElementById('product-purchase-menu');

$productManageMenu.addEventListener('click', () => {
  $app.innerHTML = '';

  const {
    productContainerView,
    productInventoryContainerView,
  } = productManagerViewInitiator($app);

  binders.productContainerBinder = createBinder(productContainerView, productManagerController);
  binders.productInventoryContainerBinder = createBinder(productInventoryContainerView, productInventoryContainerController);
});

$vendingMachineManageMenu.addEventListener('click', () => {
  $app.innerHTML = '';
  const {
    vendingMachineControllerView,
    cashBoxView,
  } = vendingMachineManagerViewInitiator($app);

  binders.vendingMachineControllerBinder = createBinder(vendingMachineControllerView, vendingMachineControllerComponent);
  binders.cashBoxBinder = createBinder(cashBoxView, cashBoxComponent);
});

$productPurchaseMenu.addEventListener('click', () => {
  $app.innerHTML = '';
  const {
    coinInputController,
    coinInputDisplay,
    productList,
    restAmountFlushButton,
    restAmountFlushDisplay,
  } = productPurchaseMenuInitiator($app);

  binders.coinInputControllerBinder = createBinder(coinInputController, coinInputControllerComponent);
  binders.coinInputDisplayBinder = createBinder(coinInputDisplay, coinInputDisplayComponent);
  binders.productListBinder = createBinder(productList, productListComponent);
  binders.restAmountFlushButtonBinder = createBinder(restAmountFlushButton, restAmountFlushButtonComponent);
  binders.restAmountFlushDisplayBinder = createBinder(restAmountFlushDisplay, restAmountFlushDisplayComponent);
});
