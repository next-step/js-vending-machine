import { PRODUCT_CONFIG, COIN_CONFIG } from './config';

export const ERROR = {
  PRODUCT_LESS_THAN_MIN_PRICE: `상품 가격은 최소 ${PRODUCT_CONFIG.MIN_PRICE}원 이상이어야 합니다!`,
  PRODUCT_NOT_DIVIDED_PRICE: `상품 가격은 ${PRODUCT_CONFIG.SHOULD_BE_DIVIDED}원 단위로 나누어 떨어져야합니다!`,
  PRODUCT_LESS_THAN_MIN_QUANTITY: `상품 수량은 ${PRODUCT_CONFIG.MIN_QUANTITY}개 이상이어야 합니다!`,
  PRODUCT_EMPTY: `상품이 남아있지 않습니다. 😅;`,
  PRODUCT_PRICE_GREATER_THAN_OWN: `상품을 구매하기 위한 충전 금액이 부족합니다. \n금액을 더 투입해주세요! 💰`,
  COIN_LESS_THAN_MIN_PRICE: `충전 금액은 최소 ${COIN_CONFIG.MIN_PRICE}원 이상이어야 합니다!`,
  COIN_NOT_DIVIDED_PRICE: `충전 금액은 ${COIN_CONFIG.SHOULD_BE_DIVIDED}원 단위로 나누어 떨어져야합니다!`,
  INPUT_PRICE_NOT_DIVIDED_PRICE: `충전 금액은 ${PRODUCT_CONFIG.SHOULD_BE_DIVIDED}원 단위로 나누어 떨어져야합니다!`,
  INPUT_PRICE_LESS_THAN_MIN_PRICE: `충전 금액은 최소 ${PRODUCT_CONFIG.SHOULD_BE_DIVIDED}원 이상이어야 합니다!`,
  NO_STORAGE_ITEM: '아이템이 존재하지 않습니다!',
  NO_PRODUCT_ITEM: '🎁 상품을 추가해주세요!🎁 ',
  FAIL_ADD_PRODUCT: '상품 등록에 실패했습니다. 😢',
} as const;

