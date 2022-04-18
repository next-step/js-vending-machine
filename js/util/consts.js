export const selector = (name) => document.querySelector(name);
export const selectorAll = (name) => document.querySelectorAll(name);
// 10원 단위 상수로 전환
export const DEFAULT_PRICE_UNIT = 10;

export const VALIDATE = {
  ENTER_ALL_PRODUCT_INFO: '상품 정보를 모두 입력해야 합니다.',
  TEN_UNIT_PRICE: '가격은 10원 단위가 기본입니다.',
};
