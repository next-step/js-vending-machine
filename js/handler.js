import { setChargeEvent, setProductEvent } from './index.js';
import { CHARGE, PRODUCT, SELECTOR, TAB } from './constants/constant.js';
import { addCharge } from './controllers/charge.js';
import { addProduct } from './controllers/product.js';

import { $ } from './utils/selector.js';
import { validate } from './utils/validator.js';
import {
  chargeAmountValidations,
  productNameValidations,
  productPriceValidations,
  productQuantityValidations,
} from './validations/validation.js';
import { renderVendingMachineManage } from './views/Charge.js';
import { renderProductManage } from './views/product.js';
import { vendingMachine } from './models/VendingMachine.js';

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

export const handleFormProductSubmit = (event) => {
  event.preventDefault();
  const productForm = {
    name: event.target.elements[PRODUCT.NAME].value,
    price: event.target.elements[PRODUCT.PRICE].value,
    quantity: event.target.elements[PRODUCT.QUANTITY].value,
  };
  try {
    validate(productForm.name, productNameValidations);
    validate(productForm.price, productPriceValidations);
    validate(productForm.quantity, productQuantityValidations);

    addProduct({
      name: productForm.name,
      price: +productForm.price,
      quantity: +productForm.quantity,
    });
  } catch (err) {
    alert(err.message);
  }
};

export const handFormChargeSubmit = (event) => {
  event.preventDefault();
  const chargeAmount = event.target.elements[CHARGE.AMOUNT].value;
  try {
    validate(chargeAmount, chargeAmountValidations);
    addCharge(+chargeAmount);
  } catch (err) {
    alert(err.message);
  }
};
