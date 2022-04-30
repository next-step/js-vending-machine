import ProductContainerView from './views/ProductContainerView';
import ChargeContainerView from './views/ChargeContainerView';

import { ValidationError } from './utils/errorValidation';
import * as model from './model';

const addProduct = (product: Product) => {
  try {
    const products: Array<Product> = model.addProduct(product);
    ProductContainerView.render(products);
  } catch (err: Error | unknown) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }
  }
};

const chargeCoin = (coin: number) => {
  try {
    const coins = model.chargeCoin(coin);
    ChargeContainerView.render(coins);
  } catch (err) {
    console.log(err);
  }
};

export default () => {
  ProductContainerView.subscribeAddProduct(addProduct);
  ChargeContainerView.subscribeChargeCoin(chargeCoin);
};

