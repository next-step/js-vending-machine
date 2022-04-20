import ProductContainerView from './views/ProductContainerView';
import ValidationError from './utils/errorValidation';
import * as model from './model';
import { router } from './router/router';

export const addProduct = function (product: Product): void {
  try {
    const products: Array<Product> = model.addProduct(product);
    ProductContainerView.render(products);
  } catch (err: Error) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }

    ProductContainerView.renderError(err);
  }
};

const init = () => {
  ProductContainerView.subscribeAddProduct(addProduct);
  router();
};
init();

