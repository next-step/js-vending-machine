import ProductManageView from './ProductManageView.js';
import VendingMachineManageView from './VendingMachineManageView.js';
import { FORM } from '../constants/content-constant.js';

const $app = document.querySelector('#app');
const $productManageMenuSubmit = document.getElementById('product-manage-menu');
const $vendingMachineManageMenuSubmit = document.getElementById(
  'vending-machine-manage-menu'
);

const isProductManageContent = (formId) => formId === FORM.PRODUCT;

const isVendingMachineManageContent = (formId) =>
  formId === FORM.VENDING_MACHINE;

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

const handleMenuContentSubmit = (event) => {
  const formId = event.target.id;
  if (isProductManageContent(formId)) {
    ProductManageView.handleProductAdd(event);
    return;
  }

  if (isVendingMachineManageContent(formId)) {
    VendingMachineManageView.handleChargingCoin(event);
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
  $app.addEventListener('submit', handleMenuContentSubmit);
  $app.addEventListener('keypress', preventEmptyKeypress);
};

const initialize = () => {
  eventBindings();
  handleProductManageMenu();
};

export default initialize;
