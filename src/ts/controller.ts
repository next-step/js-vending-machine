import productContainerView from './views/ProductContainerView';
import ErrorPageView from './views/ErrorPageView';

import * as model from './model';
import { Page } from './model';
import ValidationError from './utils/errorValidation';

const controlProductContainerAddProduct = function (product: Product): void {
  try {
    const products = model.addProduct(product);
    productContainerView.render(products);
  } catch (err) {
    if (err instanceof ValidationError) {
      alert(err.message);
    }
  }
};

const controlProductContainerRender = function (): void {
  const products = model.loadProduct();
  productContainerView.render(products);
};

const controlErrorPageRender = function (): void {
  ErrorPageView.render(Error('🚨 존재하지 않는 페이지입니다! 🚨'));
};

const controlPageView = function (page: Page): void {
  switch (page) {
    case Page.ProductManagement:
      controlProductContainerRender();
      break;
    default:
      controlErrorPageRender();
  }
};

const init = () => {
  productContainerView.addHandlerProduct(controlProductContainerAddProduct);
  controlPageView(Page.ProductManagement);
};

init();
