import { PRODUCT_CONFIG } from './config';

export const ERROR = {
  LESS_THAN_MIN_PRICE: `상품 가격은 최소 ${PRODUCT_CONFIG.MIN_PRICE}원 이상이어야 합니다!`,
  NOT_DIVIDED_PRICE: `상품 가격은 ${PRODUCT_CONFIG.SHOULD_BE_DIVIDED}원 단위로 나누어 떨어져야합니다!`,
  LESS_THAN_MIN_QUANTITY: `상품 가격은 ${PRODUCT_CONFIG.MIN_QUANTITY}원 단위로 나누어 떨어져야합니다!`,
  NO_STORAGE_ITEM: '아이템이 존재하지 않습니다!',
  NO_PRODUCT_ITEM: '🎁 상품을 추가해주세요!🎁 ',
  FAIL_ADD_PRODUCT: '상품 등록에 실패했습니다. 😢',
} as const;
