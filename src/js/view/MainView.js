import ProductManageView from './ProductManageView.js';
import VendingMachineManageView from './VendingMachineManageView.js';
import { FORM } from '../constants/content-constant.js';
import ProductPurchaseView from './ProductPurchaseView.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');
const $vendingMachineManageMenuSubmit = document.getElementById(
  'vending-machine-manage-menu'
);
const $productPurchaseMenuSubmit = document.getElementById(
  'product-purchase-menu'
);

const isProductManageContent = (formId) => formId === FORM.PRODUCT;

const isVendingMachineManageContent = (formId) =>
  formId === FORM.VENDING_MACHINE;

const isProductPurchaseContent = (formId) => formId === FORM.PRODUCT_PURCHASE;

const changeAppContents = (template) => {
  $app.replaceChildren(template);
};

const handleProductManageMenu = () => {
  changeAppContents(ProductManageView.contents());
  ProductManageView.initialize();
};

const handleVendingMachineManageMenu = () => {
  changeAppContents(VendingMachineManageView.contents());
  VendingMachineManageView.initialize();
};

const handleProductPurchaseMenu = () => {
  changeAppContents(ProductPurchaseView.contents());
};

const handleMenuContentSubmit = (event) => {
  const formId = event.target.id;
  if (isProductManageContent(formId)) {
    ProductManageView.handleProductAdd(event);
    return;
  }

  if (isVendingMachineManageContent(formId)) {
    VendingMachineManageView.handleChargingCoin(event);
    return;
  }

  if (isProductPurchaseContent(formId)) {
    ProductPurchaseView.handleChargingAmount(event);
  }
};

const preventEmptyKeypress = (event) => {
  if (event.target.tagName !== 'INPUT') {
    return;
  }

  if (event.code === 'Space') {
    event.preventDefault();
  }
};

const eventBindings = () => {
  $productManageMenuSubmit.addEventListener('click', handleProductManageMenu);
  $vendingMachineManageMenuSubmit.addEventListener(
    'click',
    handleVendingMachineManageMenu
  );
  $productPurchaseMenuSubmit.addEventListener(
    'click',
    handleProductPurchaseMenu
  );
  $app.addEventListener('submit', handleMenuContentSubmit);
  $app.addEventListener('keypress', preventEmptyKeypress);
};

const initialize = () => {
  eventBindings();
  handleProductManageMenu();
};

export default initialize;
