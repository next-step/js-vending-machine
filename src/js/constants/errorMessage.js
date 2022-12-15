import { PRODUCT } from './productManageMenu.js';
import { CHARGE } from './vendingMachineManageMenu.js';

export const ERROR_MESSAGE = {
  EMPTY_INPUT: '공백은 추가할 수 없습니다.',
  INVALID_PRODUCT_NAME: '유효하지 않은 상품명입니다.',
  INVALID_PRODUCT_MIN_PRICE: `상품의 최소 가격은 ${PRODUCT.MIN_PRICE}원입니다.`,
  INVALID_PRODUCT_PRICE_UNIT: `상품의 가격은 ${PRODUCT.DIVISIBLE_UNIT}원으로 나누어 떨어져야 합니다.`,
  INVALID_PRODUCT_MIN_QUANTITY: `상품의 최소 수량은 ${PRODUCT.MIN_QUANTITY}개여야 합니다.`,

  INVALID_VENDING_MACHINE_MIN_CHARGE: `최소 충전 금액은 ${CHARGE.MIN_PRICE}원 이상만 가능합니다.`,
  INVALID_VENDING_MACHINE_CHARGE_UNIT: `${CHARGE.DIVISIBLE_UNIT}원으로 나누어 떨어지는 금액만 충전이 가능합니다.`,
};
