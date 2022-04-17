import useRouter from './utils/useRouter';
import ProductManagement from './domains/products/management/views/ProductManagement';

export const routing = (path) => {
  let component;

  switch (path[1]) {
    case '':
    case 'product-management':
      component = ProductManagement();
      break;
    case 'charge-changes':
      component = 'charge-changes';
      break;
    case 'product-purchase':
      component = 'product-purchase';
      break;
    default:
      component = ProductManagement();
      window.history.pushState('', '', '/');
  }

  return component;
};

const router = () => {
  window.onload = () => {
    const path = useRouter();
    const component = routing(path);

    document.querySelector('main').append(component);
  };

  window.onpopstate = () => {
    const path = useRouter();
    const component = routing(path);

    document.querySelector('main').replaceWith(component);
  };
};

export default router;
