import { PRODUCT_ELEMENTS, TAB } from './utils/constant.js';
import { $, SELECTOR } from './utils/selector.js';
import {
  renderProductManage,
  renderVendingMachineManage,
} from './utils/template.js';
import { showErrorMessage, validate } from './utils/util.js';
import {
  productNameValidations,
  productPriceValidations,
  productQuantityValidations,
} from './utils/validation.js';

export const setProductEvent = () => {
  $(SELECTOR.PRODUCT_FORM).addEventListener('submit', (event) => {
    handleFormProductSubmit(event);
  });
};

const handleChangeTab = (event) => {
  const target = event.target.id;
  $(SELECTOR.APP).replaceChildren();
  switch (target) {
    case TAB.PRODUCT_MANAGE_MENU:
      renderProductManage();
      setProductEvent();
      break;
    case TAB.VENDING_MACHINE_MANAGE_MENU:
      renderVendingMachineManage();
      break;
    case TAB.PRODUCT_PURCHAGE_MENU:
      break;
  }
};

const handleFormProductSubmit = (event) => {
  event.preventDefault();
  try {
    validate(
      event.target.elements[PRODUCT_ELEMENTS.NAME].value,
      productNameValidations
    );
    validate(
      event.target.elements[PRODUCT_ELEMENTS.PRICE].value,
      productPriceValidations
    );
    validate(
      event.target.elements[PRODUCT_ELEMENTS.QUANTITY].value,
      productQuantityValidations
    );
  } catch (err) {
    showErrorMessage(err);
  }
};

const setEvent = () => {
  $(SELECTOR.PRODUCT_MANAGE_MENU).addEventListener('click', (event) => {
    handleChangeTab(event);
  });
  $(SELECTOR.VENDING_MACHINE_MANAGE_MENU).addEventListener('click', (event) => {
    handleChangeTab(event);
  });
};

setEvent();
