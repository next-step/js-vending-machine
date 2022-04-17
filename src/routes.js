import { $element } from './helpers/index.js';

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';

const router = {};

const createRouter = () => {
  const routes = [];

  let routeCallbackGroup = null;
  let $targetElements = null;
  let notFoundComponents = null;

  const checkRoutes = () => {
    const { hash } = location;
    const currentRoute = routes.find(({ testRegExp }) => testRegExp.test(hash));

    $targetElements.replaceChildren($element(!currentRoute ? notFoundComponents : currentRoute.component));
    routeCallbackGroup.forEach(callback => callback());
  };

  router.addRoute = (fragment, component) => {
    const params = [];

    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, '\\/');

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    });

    return router;
  };

  router.setNotFound = component => {
    notFoundComponents = component;
    return router;
  };

  router.addEvents = (...events) => {
    routeCallbackGroup = events;
    return router;
  };

  router.start = elements => {
    $targetElements = elements;

    window.addEventListener('hashchange', checkRoutes);
    if (!location.hash) location.hash = '#/product';
    checkRoutes();
  };

  router.navigate = fragment => (location.hash = fragment);
  return router;
};

export default createRouter();
