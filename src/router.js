const ROUTE_CHANGE_EVENT = 'onChangeRoute';

// 커스텀 이벤트를 통해 ROUTE_CHANGE 이벤트 발생 시
// onRouteChange 콜백 함수를 호출하도록 이벤트 바인딩
export const init = onRouteChange => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

// URL을 업데이트하고 커스텀 이벤트를 발생시키는 함수
export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
