import useRouter from './utils/useRouter';
import ProductManagement from './domains/products/management/views/ProductManagement';
import productAppend from './domains/products/management/viewModel/productAppend';

export const routing = (path) => {
  const rootPath = path[0];

  let render;
  let eventListeners;

  switch (rootPath) {
    case '':
    case 'product-management':
      render = ProductManagement;
      eventListeners = productAppend;

      break;
    // TODO: Add components
    case 'charge-changes':
      render = () => 'charge-changes';
      eventListeners = () => {};

      break;
    // TODO: Add components
    case 'product-purchase':
      render = () => 'product-purchase';
      eventListeners = () => {};

      break;
    default:
      render = ProductManagement;
      eventListeners = productAppend;

      window.history.pushState('', '', '/');
  }

  return {
    render,
    eventListeners,
  };
};

const getComponent = () => {
  const path = useRouter();

  return routing(path);
};

const router = () => {
  window.onload = () => {
    const component = getComponent();

    document.querySelector('main').append(component.render());
    component.eventListeners();
  };

  window.onpopstate = () => {
    const component = getComponent();
    const child = document.querySelector('main').childNodes[0];

    child.replaceWith(component.render());
    component.eventListeners();
  };
};

export default router;
