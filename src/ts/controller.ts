import ProductContainerView from './views/ProductContainerView';
import ChargeContainerView from './views/ChargeContainerView';

import { ValidationError } from './utils/errorValidation';
import * as model from './model';

export const addProduct = (product: Product) => {
  try {
    const products = model.addProduct(product);
    ProductContainerView.render(products);
  } catch (err: Error | unknown) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }
  }
};

export const chargeCoin = (coin: number) => {
  try {
    const coins = model.chargeCoin(coin);
    ChargeContainerView.render(coins);
  } catch (err) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }
  }
};
