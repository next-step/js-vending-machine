import productContainerView from './views/productContainerView';
import * as model from './model';
import { Product, Page } from './model';
import ValidationError from './utils/errorValidation';

const controlProductContainerAddProduct = function (product: Product): void {
  try {
    const result = model.addProduct(product);
    productContainerView.render(result);
  } catch (err) {
    if (err instanceof ValidationError) alert(err.message);
    console.log(err);
  }
};

const controlProductContainerRender = function (): void {
  const result = model.loadProduct();
  productContainerView.render(result);
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
