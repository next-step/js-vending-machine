import ProductContainerView from './views/ProductContainerView';
import ChargeContainerView from './views/ChargeContainerView';

import { ValidationError } from './utils/errorValidation';
import * as state from './state/store';


const isValidationError = (err: Error | unknown): err is ValidationError => {
  return err instanceof ValidationError;
};

export const addProduct = (product: Product) => {
  try {
    const products = state.addProduct(product);
    ProductContainerView.render(products);
  } catch (err: Error | unknown) {
    if (isValidationError(err)) alert(err.message);
  }
};

export const chargeCoin = (coin: number) => {
  try {
    const coins = state.chargeCoin(coin);
    ChargeContainerView.render(coins);
  } catch (err) {
    if (isValidationError(err)) alert(err.message);    
  }
};
