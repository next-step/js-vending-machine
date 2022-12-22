import { VALIDATE } from './validate.js';

export const ALERT = {
  PRICE_VALIDATION: `유효하지 않은 가격입니다. 상품의 최소가격은 ${VALIDATE.MIN_PRICE}원이며 ${VALIDATE.MIN_UNIT}원으로 나누어 떨어져야 합니다.`,
  CHARGE_VALIDATION: `유효하지 않은 충전 가격입니다. 충전 최소금액은 ${VALIDATE.MIN_PRICE}원이며 ${VALIDATE.MIN_UNIT}원으로 나누어 떨어져야 합니다.`,
};
