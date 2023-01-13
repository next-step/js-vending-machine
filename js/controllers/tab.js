import { setChargeEvent, setProductEvent, vendingMachine } from '../index.js';
import { SELECTOR, TAB } from '../constants/constant.js';
import { $ } from '../utils/selector.js';
import { renderVendingMachineManage } from '../views/Charge.js';
import { renderProductManage } from '../views/product.js';

export const handleChangeTab = (event) => {
  const target = event.target.id;
  $(SELECTOR.APP).replaceChildren();
  switch (target) {
    case TAB.PRODUCT_MANAGE_MENU:
      renderProductManage(vendingMachine.getProduct());
      setProductEvent();
      break;
    case TAB.VENDING_MACHINE_MANAGE_MENU:
      renderVendingMachineManage(vendingMachine.getCharge());
      setChargeEvent();
      break;
    case TAB.PRODUCT_PURCHAGE_MENU:
      break;
  }
};
