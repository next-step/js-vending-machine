import productContainerView from './views/productContainerView.js';
import * as model from './model.js';
import { Product } from './model.js';

const controlProductContainerAddProduct = function (product: Product): void {
  model.addProduct(product);
  productContainerView.render(model.state.products);
};

const controlProductContainerRender = function (): void {
  productContainerView.render();
};

const init = () => {
  productContainerView.addHandlerRender(controlProductContainerRender);
  productContainerView.addHandlerProduct(controlProductContainerAddProduct);
};

init();
