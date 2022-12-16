import { getProductManagerHTML } from './components/productManager.js';
import { getProductPurchaseHTML } from './components/productPurchase.js';
import { getVendingMachineManageMenuHTML } from './components/vendingMachineManageMenu.js';

const $app = document.getElementById('app');
const $productManageMenu = document.getElementById('product-manage-menu');
const $vendingMachineManageMenu = document.getElementById('vending-machine-manage-menu');
const $productPurchaseMenu = document.getElementById('product-purchase-menu');

$productManageMenu.addEventListener('click', () => {
  $app.innerHTML = getProductManagerHTML();
});

$vendingMachineManageMenu.addEventListener('click', () => {
  $app.innerHTML = getVendingMachineManageMenuHTML();
});

$productPurchaseMenu.addEventListener('click', () => {
  $app.innerHTML = getProductPurchaseHTML();
});
