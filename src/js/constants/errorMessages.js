import {
  MINIMUM_QUANTITY,
  MINIMUM_PRICE,
  DIVISIBLE_PRICE,
  MINIMUM_CHARGING_MONEY,
  DIVISIBLE_CHARGING_MONEY,
} from './vendingMachine.js';

const ERROR_MESSAGES = {
  NAME_SHOULD_NOT_EMPTY: '이름을 입력해주세요.',
  PRICE_SHOULD_NOT_EMPTY: '가격을 입력해주세요.',
  QUANTITY_SHOULD_NOT_EMPTY: '수량을 입력해주세요.',
  TOO_SMALL_QUANTITY: `상품의 최소 수량은 ${MINIMUM_QUANTITY}개이상입니다.`,
  TOO_SMALL_PRICE: `상품의 최소 가격은 ${MINIMUM_PRICE}원 입니다.`,
  NOT_DIVISIBLE_PRICE: `상품의 가격은 ${DIVISIBLE_PRICE}으로 나누어 떨어져야 합니다.`,
  TOO_SMALL_CHARGING_MONEY: `충전 금액은 최소 ${MINIMUM_CHARGING_MONEY}원 입니다.`,
  NOT_DIVISIBLE_CHARGING_MONEY: `충전 금액은 ${DIVISIBLE_CHARGING_MONEY}으로 나누어 떨어져야 합니다.`,
  NOT_ENOUGH_MONEY: `투입 금액이 부족합니다.`,
};

export default ERROR_MESSAGES;
