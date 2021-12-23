import { ERROR_MESSAGES, PRODUCT_PRICE, PRODUCT_QUANTITY } from '../constants/index.js';
import { hasBlankString } from '../util/index.js';

const isMinValue = value => value < PRODUCT_PRICE.MIN || value % PRODUCT_PRICE.MIN_UNIT;

const getErrorMessage = (key, value) => {
  if (value === "") return ERROR_MESSAGES.NO_VALUE;

  switch (key) {
    case "name":
      return hasBlankString(value) ? ERROR_MESSAGES.INVALID_PRODUCT_NAME : "";
    case "price":
      return isMinValue(value) ? ERROR_MESSAGES.INVALID_PRICE : "";
    case "vending-machine-charge-amount":
      return isMinValue(value) ? ERROR_MESSAGES.INVALID_MACHINE_CHARGE : "";
    case "quantity":
      return value < PRODUCT_QUANTITY.MIN ? ERROR_MESSAGES.INVALID_QUANTITY : "";
    default: return "";
  }
}

export default getErrorMessage;
