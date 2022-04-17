export const APP_KEY = 'VENDING_MACHINE_APP';

export const ACTION_KEY = {
  INIT: 'INIT',
  PULL: 'PULL',
  PUSH: 'PUSH',
};

export const STATE_KEY = {
  PRODUCT: 'PRODUCT',
  CHARGE: 'CHARGE',
  PURCHASE: 'PURCHASE',
};

export const COINS = {
  500: 0,
  100: 0,
  50: 0,
  10: 0,
};

export const INITIAL_STORE = {
  [STATE_KEY.PRODUCT]: [],
  [STATE_KEY.CHARGE]: COINS,
};

export const VENDING_MACHINE = {
  MIN_PRICE: 100,
  PRICE_STEP: 10,
  MIN_QUANTITY: 1,
  QUANTITY_STEP: 1,
};

export const ERROR_MESSAGE = {
  INVALID_TYPE: '옳지 못한 타입입니다.',
  NOT_EXISTS_KEY: '등록되지 않은 상태 키입니다.',
};
