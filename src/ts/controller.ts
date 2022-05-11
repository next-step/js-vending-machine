import ProductContainerView from './views/ProductContainerView';
import ChargeContainerView from './views/ChargeContainerView';

import { UserInputValidationError } from './utils/errorValidation';
import * as state from './state/store';

const isUerInputValidation = (err: Error | unknown): err is UserInputValidationError => {
  return err instanceof UserInputValidationError;
};

export const addProduct = (product: Product) => {
  try {
    const products = state.addProduct(product);
    ProductContainerView.render({ products });
  } catch (err: Error | unknown) {
    if (isUerInputValidation(err)) alert(err.message);
  }
};

export const chargeCoin = (coin: number) => {
  try {
    const coins = state.chargeCoin(coin);
    ChargeContainerView.render({ coins });
  } catch (err) {
    if (isUerInputValidation(err)) alert(err.message);
  }
};
