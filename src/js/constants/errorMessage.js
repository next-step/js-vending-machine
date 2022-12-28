import { PRODUCT } from './productManageMenu.js';
import { MONEY, PURCHASE_PRODUCT } from './productPurchaseMenu.js';
import { CHARGE } from './vendingMachineManageMenu.js';

export const ERROR_MESSAGE = {
  COMMON: {
    EMPTY_INPUT: '공백은 추가할 수 없습니다.',
    UNKNOWN: '예상치 못한 에러가 발생했습니다.',
  },

  PRODUCT: {
    INVALID_NAME: '유효하지 않은 상품명입니다.',
    INVALID_MIN_PRICE: `상품의 최소 가격은 ${PRODUCT.MIN_PRICE}원입니다.`,
    INVALID_PRICE_UNIT: `상품의 가격은 ${PRODUCT.DIVISIBLE_UNIT}원으로 나누어 떨어져야 합니다.`,
    INVALID_MIN_QUANTITY: `상품의 최소 수량은 ${PRODUCT.MIN_QUANTITY}개여야 합니다.`,
  },

  VENDING_MACHINE: {
    INVALID_MIN_CHARGE: `최소 충전 금액은 ${CHARGE.MIN_PRICE}원 이상만 가능합니다.`,
    INVALID_CHARGE_UNIT: `${CHARGE.DIVISIBLE_UNIT}원으로 나누어 떨어지는 금액만 충전이 가능합니다.`,
  },

  PRODUCT_PURCHASE: {
    INVALID_MIN_MONEY: `최소 충전 금액은 ${MONEY.MIN}원 이상만 가능합니다.`,
    INVALID_MONEY_UNIT: `${MONEY.UNIT}원으로 나누어 떨어지는 금액만 충전이 가능합니다.`,
    INVALID_CHARGE_AMOUNT: '충전 금액이 구매하려는 제품의 가격보다 적습니다.',
    INVALID_MIN_QUANTITY: `수량이 ${PURCHASE_PRODUCT.MIN_QUANTITY}인 상품은 구매할 수 없습니다.`,
    INVALID_RETURN_CHARGE_AMOUNT: '충전 금액이 0원이면 잔돈을 반환할 수 없습니다.',
    INVALID_RETURN_RESULT: '자판기의 잔돈이 없어서 반환이 불가능합니다.',
    EMPTY_VENDING_MACHINE_CHARGE: '자판기 돈통의 돈이 부족하여 충전된 돈중 일부는 반환을 할 수 없습니다',
  },
};
