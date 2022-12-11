import { ROUTES } from '../constants/routeConstant.js';

const renderPage = (el, route) => {
  //initialize first
  el.innerHTML = '';
  const Component = route.components;

  new Component({
    $target: el,
  });
};

const getHashRoute = () => {
  const route = ROUTES[0];
  const hashLocation = window.location.hash;
  const findRoute = ROUTES.filter(
    (hashRoute) => hashLocation === hashRoute.path
  );

  // if (!findRoute.length) throw new Error('적합한 라우터가 없습니다.');

  return findRoute[0] || route;
};

export const initialRoutes = ({ el }) => {
  document.querySelectorAll('.hash-nav').forEach(($navButton) => {
    $navButton.addEventListener('click', (e) => {
      console.log(e.target.id);
      const { id: hashId } = e.target;
      history.pushState(null, null, `#${hashId}`);
    });
  });

  window.addEventListener('hashchange', () => {
    renderPage(el, getHashRoute());
  });

  //for relaoding button
  window.onload = () => {
    return renderPage(el, getHashRoute());
  };
};
