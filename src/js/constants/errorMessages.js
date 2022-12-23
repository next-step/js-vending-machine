import { MINIMUM_QUANTITY, MINIMUM_PRICE, DIVISIBLE_PRICE } from './vendingMachine.js';

const ERROR_MESSAGES = {
  NAME_SHOULD_NOT_EMPTY: '이름을 입력해주세요.',
  PRICE_SHOULD_NOT_EMPTY: '가격을 입력해주세요.',
  QUANTITY_SHOULD_NOT_EMPTY: '수량을 입력해주세요.',
  TOO_SMALL_QUANTITY: `상품의 최소 수량은 ${MINIMUM_QUANTITY}개이상입니다.`,
  TOO_SMALL_PRICE: `상품의 최소 가격은 ${MINIMUM_PRICE}원 입니다.`,
  NOT_DIVISIBLE_PRICE: `상품의 가격은 ${DIVISIBLE_PRICE}으로 나누어 떨어져야 합니다.`,
};

export default ERROR_MESSAGES;
