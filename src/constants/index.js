export const NO_VALUE = "NO_VALUE";
export const INVALID_PRODUCT_NAME = "INVALID_PRODUCT_NAME";
export const INVALID_PRICE = "INVALID_PRICE";
export const INVALID_QUANTITY = "INVALID_QUANTITY";
export const INVALID_MACHINE_CHARGE = "INVALID_MACHINE_CHARGE";
export const INVALID_PRODUCT_CHARGE = "INVALID_PRODUCT_CHARGE";
export const NO_RETURN_COIN = "NO_RETURN_COIN";

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
  [INVALID_PRICE]: `상품 가격은 최소 ${PRODUCT_PRICE.MIN}원 이상, ${PRODUCT_PRICE.MIN_UNIT}원 단위로 입력 가능합니다.`,
  [INVALID_MACHINE_CHARGE]: `충전 금액은 최소 ${PRODUCT_PRICE.MIN}원 이상, ${PRODUCT_PRICE.MIN_UNIT}원 단위로 입력 가능합니다.`,
  [INVALID_PRODUCT_CHARGE]: `투입 금액은 최소 ${PRODUCT_PRICE.MIN_UNIT}원 이상, ${PRODUCT_PRICE.MIN_UNIT}원 단위로 입력 가능합니다.`,
  [INVALID_QUANTITY]: `수량 입력은 최소 ${PRODUCT_QUANTITY.MIN}개 이상 이여야 합니다.`,
  [NO_RETURN_COIN]: "반환할 충전 금액이 없습니다."
};

export const COINS = [
  [500, 0],
  [100, 0],
  [50, 0],
  [10, 0]
];
