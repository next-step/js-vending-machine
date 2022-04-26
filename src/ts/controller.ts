import ProductContainerView from './views/ProductContainerView';
import ChargeContainerView from './views/ChargeContainerView';

import { ValidationError } from './utils/errorValidation';
import * as model from './model';
import { router } from './router/router';

const addProduct = function (product: Product) {
  try {
    const products: Array<Product> = model.addProduct(product);
    ProductContainerView.render(products);
  } catch (err: Error | unknown) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }

    if (err instanceof Error) {
      ProductContainerView.renderError(err.message);
    }
  }
};

const chargeCoin = function (coin: number) {
  try {
    const coins = model.chargeCoin(coin);
    ChargeContainerView.render(coins);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  ProductContainerView.subscribeAddProduct(addProduct);
  ChargeContainerView.subscribeChargeCoin(chargeCoin);
  router();
};

init();
