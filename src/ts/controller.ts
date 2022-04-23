import ProductContainerView from './views/ProductContainerView';
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

const init = () => {
  ProductContainerView.subscribeAddProduct(addProduct);
  router();
};
init();
