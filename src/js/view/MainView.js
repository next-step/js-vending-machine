import ProductManageView from './ProductManageView.js';
import VendingMachineManageView from './VendingMachineManageView.js';
import { FORM } from '../constants/content-constant.js';
import ProductPurchaseView from './ProductPurchaseView.js';
import { PRODUCT_PURCHASE_BUTTON } from '../constants/purchase-constant.js';

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

const isProductPurchaseButton = (className) =>
  className === PRODUCT_PURCHASE_BUTTON;

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
  ProductPurchaseView.initialize();
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

const handleContentsButton = (event) => {
  if (isProductPurchaseButton(event.target.className)) {
    ProductPurchaseView.handlePurchaseProduct(event);
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
  $app.addEventListener('click', handleContentsButton);
  $app.addEventListener('keypress', preventEmptyKeypress);
};

const initialize = () => {
  eventBindings();
  handleProductManageMenu();
};

export default initialize;
