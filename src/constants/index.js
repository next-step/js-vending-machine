export const NO_VALUE = "NO_VALUE";
export const INVALID_PRODUCT_NAME = "INVALID_PRODUCT_NAME";
export const INVALID_PRICE = "INVALID_PRICE";
export const INVALID_QUANTITY = "INVALID_QUANTITY";

export const PRODUCT_PRICE = {
  MIN: 100,
  MIN_UNIT: 10
}

export const PRODUCT_QUANTITY = {
  MIN: 1
}

export const ERROR_MESSAGES = {
  [NO_VALUE]: "값을 입력해 주세요.",
  [INVALID_PRODUCT_NAME]: "상품명에 공백문자를 입력하실 수 없습니다.",
  [INVALID_PRICE]: `상품 가격은 ${PRODUCT_PRICE.MIN}원 이상, ${PRODUCT_PRICE.MIN_UNIT}원 단위로 입력 가능합니다.`,
  [INVALID_QUANTITY]: `수량 입력은 최소 ${PRODUCT_QUANTITY.MIN}개 이상 이여야 합니다.`
};
