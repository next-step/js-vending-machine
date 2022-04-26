import useRouter from './utils/useRouter';
import ProductManagement from './domains/products/management/views/ProductManagement';
import productAppend from './domains/products/management/viewModel/productAppend';

export const routing = (path) => {
  const rootPath = path[0];

  switch (rootPath) {
    case '':
    case 'product-management':
      return {
        render: ProductManagement,
        eventListeners: productAppend,
      };

    // TODO: Add components
    case 'charge-changes':
      return {
        render: () => 'charge-changes',
        eventListeners: () => {},
      };

    // TODO: Add components
    case 'product-purchase':
      return {
        render: () => 'product-purchase',
        eventListeners: () => {},
      };

    default:
      window.history.pushState('', '', '/');
      return {
        render: ProductManagement,
        eventListeners: productAppend,
      };
  }
};

const getComponent = () => {
  const path = useRouter.getPath();

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
