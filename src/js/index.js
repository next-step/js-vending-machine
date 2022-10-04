import LocalStorage from './storage/index.js';
import ProductManageMenu from './view/ProductManageMenu.js';
import VendingMachineManageMenu from './view/VendingMachineManageMenu.js';
import ProductPurchaseMenu from './view/ProductPurchaseMenu.js';
import { MENU } from './constants/index.js';

const $app = document.querySelector('#app');
const $navigation = document.querySelector('.navigation');

const renderTab = () => {
  switch (LocalStorage.getCurrentTab()) {
    case MENU.PRODUCT_MANAGE:
      return new ProductManageMenu($app);
    case MENU.VENDING_MACHINE_MANAGE:
      return new VendingMachineManageMenu($app);
    case MENU.PRODUCT_PURCHASE:
      return new ProductPurchaseMenu($app);
    default:
      return new ProductManageMenu($app);
  }
};

$navigation.addEventListener('click', e => {
  if (e.target.classList.contains(MENU.BUTTON)) {
    LocalStorage.setCurrentTab(e.target.id);
    renderTab();
  }
});

window.onload = () => {
  if (LocalStorage.getCurrentTab()) renderTab();
};
