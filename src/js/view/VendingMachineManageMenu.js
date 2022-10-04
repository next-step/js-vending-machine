import { ERROR_MESSAGE, MENU, STORAGE_KEY } from '../constants/index.js';
import { checkPriceUnit, checkValidation } from '../validate/index.js';
import VendingMachineManageMenuService from '../service/VendingMachineManageMenuService.js';
import ProductManageMenuService from '../service/ProductManageMenuService.js';
import { vendingMachineManageMenuTemplate } from '../template/index.js';

class VendingMachineManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
    this.initEventListener();
    this.vendingManageService = new VendingMachineManageMenuService();
  }

  static changeRenderer() {
    const $vendingMachineChargeAmount = document.querySelector('#vending-machine-charge-amount');
    $vendingMachineChargeAmount.textContent = ProductManageMenuService.getCurrentTabState()[STORAGE_KEY.AMOUNT];

    const $coinTable = document.querySelectorAll('[data-price]');

    $coinTable.forEach(element => {
      const { price } = element.dataset;
      element.textContent = `${ProductManageMenuService.getCurrentTabState()[STORAGE_KEY.COINS][price]}개`;
    });

    const $vendingMachineForm = document.querySelector('#vending-machine-form');
    $vendingMachineForm.reset();
  }

  initRenderer() {
    this.app.innerHTML = vendingMachineManageMenuTemplate;
    VendingMachineManageMenu.changeRenderer();
  }

  chargeMoneyBox(e) {
    e.preventDefault();

    const vendingMachinePrice = new FormData(e.target).get(MENU.VENDING_MACHINE_CHARGE);
    const formattingPrice = parseInt(vendingMachinePrice, 10);

    try {
      const inputCondition = checkPriceUnit(formattingPrice);
      checkValidation(inputCondition, ERROR_MESSAGE.INVALID_CHARGE_UNIT);

      this.vendingManageService.setHoldingAmount(formattingPrice);
      this.vendingManageService.setCoinsAmount(
        formattingPrice,
        VendingMachineManageMenuService.getCoinsNumber(formattingPrice)
      );

      VendingMachineManageMenu.changeRenderer();
    } catch (error) {
      alert(error.message);
    }
  }

  initEventListener() {
    const $vendingMachineForm = document.querySelector('#vending-machine-form');
    $vendingMachineForm.addEventListener('submit', this.chargeMoneyBox.bind(this));
  }
}

export default VendingMachineManageMenu;
