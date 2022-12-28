const ROUTE_CHANGE_EVENT = 'onChangeRoute';
const BASE_URL = 'js-vending-machine';

export const init = onRouteChange => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

export const routeChange = (url, params) => {
  console.log(`${BASE_URL}${url}`);
  history.pushState(null, null, `${url}`);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
