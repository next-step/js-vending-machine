import ProductManageView from './ProductManageView.js';
import VendingMachineManageView from './VendingMachineManageView.js';
import { FORM } from '../constants/content-constant.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');
const $vendingMachineManageMenuSubmit = document.getElementById(
  'vending-machine-manage-menu'
);

function isProductManageContent(formId) {
  return formId === FORM.PRODUCT;
}

function isVendingMachineManageContent(formId) {
  return formId === FORM.VENDING_MACHINE;
}

function changeAppContents(template) {
  $app.replaceChildren(template);
}

function handleProductManageMenu() {
  changeAppContents(ProductManageView.contents());
  ProductManageView.initialize();
}

function handleVendingMachineManageMenu() {
  changeAppContents(VendingMachineManageView.contents());
  VendingMachineManageView.initialize();
}

function handleMenuContentSubmit(event) {
  const formId = event.target.id;
  if (isProductManageContent(formId)) {
    ProductManageView.handleProductAdd(event);
    return;
  }

  if (isVendingMachineManageContent(formId)) {
    VendingMachineManageView.handleChargingCoin(event);
  }
}

function preventEmptyKeypress(event) {
  if (event.target.tagName !== 'INPUT') {
    return;
  }

  if (event.code === 'Space') {
    event.preventDefault();
  }
}

function eventBindings() {
  $productManageMenuSubmit.addEventListener('click', handleProductManageMenu);
  $vendingMachineManageMenuSubmit.addEventListener(
    'click',
    handleVendingMachineManageMenu
  );
  $app.addEventListener('submit', handleMenuContentSubmit);
  $app.addEventListener('keypress', preventEmptyKeypress);
}

function initialize() {
  eventBindings();
  handleProductManageMenu();
}

export { initialize };
