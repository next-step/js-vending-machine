import productContainerView from './views/ProductContainerView';
import ErrorPageView from './views/ErrorPageView';

import * as model from './model';
import { Page } from './model';
import ValidationError from './utils/errorValidation';

const controlProductContainerAddProduct = function (product: Product): void {
  try {
    const products: Array<Product> = model.addProduct(product);
    if (products) productContainerView.render(products);
  } catch (err: Error) {
    if (err instanceof ValidationError) {
      alert(err.message);
      return;
    }

    productContainerView.renderError(err);
  }
};

const controlProductContainerRender = function (): void {
  try {
    const products = model.loadProduct();
    productContainerView.render(products);
  } catch (err: Error) {
    productContainerView.renderError(err);
  }
};

const controlErrorPageRender = function (): void {
  ErrorPageView.render(Error('🚨 존재하지 않는 페이지입니다! 🚨'));
};

const controlPageView = function (page: Page): void {
  document.querySelectorAll(`button[data-page]`)?.forEach(el => el.classList.remove('active'));
  document.querySelector(`button[data-page="${page}"]`)?.classList.add('active');

  switch (page) {
    case Page.ProductManagement:
      controlProductContainerRender();
      break;
    default:
      controlErrorPageRender();
  }
};

const addPageEventHandler = () => {
  document.querySelectorAll('.link').forEach(el => {
    el.addEventListener('click', (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLButtonElement;
      const pageName = target.dataset.page! as Page;
      controlPageView(pageName);
    });
  });
};

const init = () => {
  addPageEventHandler();
  productContainerView.addHandlerProduct(controlProductContainerAddProduct);
  controlPageView(Page.ProductManagement);
};

init();
