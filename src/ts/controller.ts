import productContainerView from './views/productContainerView.js';
import * as model from './model.js';
import { Product, Page } from './model.js';

const controlProductContainerAddProduct = function (product: Product): void {
  model.addProduct(product);
  productContainerView.render(model.state.products);
};

const controlProductContainerRender = function (): void {
  productContainerView.render();
};

const controlPageView = function (page: Page): void {
  switch (page) {
    case Page.ProductManagement:
      controlProductContainerRender();
      break;
    default:
      throw Error('존재하지 않는 page view 입니다.');
  }
};

const init = () => {
  productContainerView.addHandlerRender(controlProductContainerRender);
  productContainerView.addHandlerProduct(controlProductContainerAddProduct);

  controlPageView(Page.ProductManagement);
};

init();
