export const APP_KEY = 'VENDING_MACHINE_APP';

export const ROUTER = {
  PRODUCT: '#/product',
  CHARGE: '#/charge',
  PURCHASE: '#/purchase',
};

export const STATE_KEY = {
  PRODUCT: 'product',
  CHARGE: 'charge',
  PURCHASE: 'purchase',
  RETURNED: 'returned',
};

export const COIN_KEY = {
  COIN500: '500',
  COIN100: '100',
  COIN50: '50',
  COIN10: '10',
};

export const COINS = {
  [COIN_KEY.COIN500]: 0,
  [COIN_KEY.COIN100]: 0,
  [COIN_KEY.COIN50]: 0,
  [COIN_KEY.COIN10]: 0,
};

export const INITIAL_STORE = {
  [STATE_KEY.PRODUCT]: [],
  [STATE_KEY.CHARGE]: { ...COINS },
  [STATE_KEY.PURCHASE]: 0,
  [STATE_KEY.RETURNED]: { ...COINS },
};

export const VENDING_MACHINE = {
  MAX_PRODUCT_NAME_LENGTH: 20,
  MIN_PRICE: 100,
  MIN_PURCHASE_PRICE: 10,
  PRICE_STEP: 10,
  MIN_QUANTITY: 1,
  QUANTITY_STEP: 1,
};

export const ERROR_MESSAGE = {
  NOT_EXISTS_KEY: '등록되지 않은 상태 키에요!😤',
  NEED_TO_TEMPLATE: '렌더링 할 템플릿을 지정해주세요!🙄',
  NOT_NUMBER_TYPE: '숫자형이 아니네요!😡',
  NOT_ENOUGH_MONEY: '투입된 금액이 부족해서 구매할 수 없어요😫',
  NOT_ENOUGH_QUANTITY: '선택한 품목의 수량이 부족해서 구입할 수 없어요!🥸',
  NOT_EXISTS_MONEY: '반환할 금액이 없어요!🤯',
  EMPTY_RETURN_CHANGES: '반환할 잔돈이 없어요!😱',
};
