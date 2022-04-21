import { replaceWithFrag } from '../utils/dom.js';
import routes from './route.js';

const createRoute = ({ root, store, defaultHash }) => {
  const push = (hash) => {
    const matchedRoute = findRoute(hash);
    const matchedView = matchedRoute
      ? matchedRoute.view
      : findRoute(defaultHash).view;

    replaceWithFrag(matchedView(root, store));
  };

  window.addEventListener('hashchange', () => push(location.hash));

  push(location.hash);

  return {
    push,
  };
};

const findRoute = (hash) => routes.find(({ path }) => `#${path}` === hash);

export default createRoute;
