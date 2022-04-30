export const selector = (name) => document.querySelector(name);
export const selectorAll = (name) => document.querySelectorAll(name);

export const shadowDOMSelector = (webComponent, target) =>
  selector(webComponent).shadowRoot.querySelector(target);

export const shadowDOMSelectorAll = (webComponent, target) =>
  selector(webComponent).shadowRoot.querySelectorAll(target);

export const DEFAULT_PRICE_UNIT = 10;

export const VALIDATE = {
  ENTER_ALL_PRODUCT_INFO: '공백란 없이 상품 정보를 모두 입력해야 합니다.',
  TEN_UNIT_PRICE: '가격은 10원 단위가 기본입니다.',
};
