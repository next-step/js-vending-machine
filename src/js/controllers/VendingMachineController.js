import VendingMachineView from '../views/VendingMachineView.js';
import ProductManageController from './ProductManageController.js';
import ChangeMangeController from './ChangeMangeController.js';
import SELECTOR from '../constants/selector.js';
import { $ } from '../utils/dom.js';
import { getStorageCurrentMenu, setStorageCurrentMenu } from '../utils/storage.js';
import ProductPurchaseController from './ProductPurchaseController.js';

class VendingMachineController {
  constructor() {
    this.vendingMachineView = new VendingMachineView();
    this.vendingMachineView.render();
    this.productManageController = new ProductManageController();
    this.changeManageController = new ChangeMangeController();
    this.productPurchaseController = new ProductPurchaseController();
  }

  run() {
    this.#initAddEventListener();
    this.#render();
  }

  #initAddEventListener() {
    $(`#${SELECTOR.tabButtonContainerId}`).addEventListener('click', (e) =>
      this.#onClickTab(e)
    );
  }

  #render() {
    const currentMenu = getStorageCurrentMenu();

    if (currentMenu === SELECTOR.productManageMenuId || !currentMenu) {
      this.productManageController.renderProductList();
    }
    if (currentMenu === SELECTOR.vendingMachineManageMenuId) {
      this.changeManageController.renderVendingMachineCharge();
    }
    if (currentMenu === SELECTOR.productPurchaseMenuId) {
      this.productPurchaseController.renderProductPurchase();
    }
  }

  #onClickTab(e) {
    const { id } = e.target;

    if (id === SELECTOR.productManageMenuId) {
      this.#setCurrentMenu(SELECTOR.productManageMenuId);
      this.productManageController.renderProductList();
    }
    if (id === SELECTOR.vendingMachineManageMenuId) {
      this.#setCurrentMenu(SELECTOR.vendingMachineManageMenuId);
      this.changeManageController.renderVendingMachineCharge();
    }
    if (id === SELECTOR.productPurchaseMenuId) {
      this.#setCurrentMenu(SELECTOR.productPurchaseMenuId);
      this.productPurchaseController.renderProductPurchase();
    }
  }

  #setCurrentMenu(menu) {
    setStorageCurrentMenu(menu);
  }
}

export default VendingMachineController;
