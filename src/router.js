import useRouter from './utils/useRouter';

function routing(path) {
  let component;

  switch (path[1]) {
    case 'product-management':
      break;
    case 'charge-changes':
      break;
    case 'product-purchase':
      break;
    default:
      return window.history.pushState('', '', '/product-management');
  }

  return component;
}

const router = () => {
  window.onpopstate = () => {
    const path = useRouter();
    routing(path);
  };
};

export default router;
