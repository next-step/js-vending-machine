import LocalStorage from './storage/index.js';
import ProductManageMenu from './view/ProductManageMenu.js';
import VendingMachineManageMenu from './view/VendingMachineManageMenu.js';
import ProductPurchaseMenu from './view/ProductPurchaseMenu.js';
import { MENU } from './constants/index.js';

const $app = document.querySelector('#app');
const $navigation = document.querySelector('.navigation');
const $buttonMenu = document.querySelectorAll('.button-menu');
const $productManageMenu = document.querySelector('#product-manage-menu');
const $vendingMachineManageMenu = document.querySelector('#vending-machine-manage-menu');
const $productPurchaseMenu = document.querySelector('#product-purchase-menu');

const renderTab = () => {
  $buttonMenu.forEach(element => {
    element.classList.remove('clicked');
  });

  switch (LocalStorage.getCurrentTab()) {
    case MENU.PRODUCT_MANAGE:
      $productManageMenu.classList.add('clicked');
      return new ProductManageMenu($app);

    case MENU.VENDING_MACHINE_MANAGE:
      $vendingMachineManageMenu.classList.add('clicked');
      return new VendingMachineManageMenu($app);

    case MENU.PRODUCT_PURCHASE:
      $productPurchaseMenu.classList.add('clicked');
      return new ProductPurchaseMenu($app);

    default:
      $productManageMenu.classList.add('clicked');
      return new ProductManageMenu($app);
  }
};

$navigation.addEventListener('click', e => {
  const { className, id } = e.target;

  if (className === MENU.BUTTON) {
    LocalStorage.setCurrentTab(id);
    renderTab();
  }
});

window.onload = () => {
  if (LocalStorage.getCurrentTab()) renderTab();
};
