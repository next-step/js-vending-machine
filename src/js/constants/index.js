const NAME = {
  PRODUCT_INPUT: 'product-input',
  PURCHASE_AMOUNT: 'purchase-amount',
};

const MENU = {
  BUTTON: 'button-menu',
  VENDING_MACHINE_CHARGE: 'vending-machine-charge-amount',
  PRODUCT_MANAGE: 'product-manage-menu',
  VENDING_MACHINE_MANAGE: 'vending-machine-manage-menu',
  PRODUCT_PURCHASE: 'product-purchase-menu',
};

const MIN_PRODUCT = {
  PRICE: 100,
  COUNT: 1,
};

const ERROR_MESSAGE = {
  INVALID_PRODUCT_UNIT: '상품의 가격 단위는 10원으로 나누어떨어져야 합니다.',
  INVALID_CHARGE_UNIT: '충전금액은 10원으로 나누어 떨어져야 합니다.',
  INVALID_CHARGE_INSERT_UNIT: '투입금액은 10원으로 나누어 떨어져야 합니다.',
};

const STORAGE_KEY = {
  AMOUNT: 'amount',
  COINS: 'coins',
  PURCHASE_PRICE: 'purchasePrice',
};

const COINS = {
  FIVE_HUNDRED: 500,
  ONE_HUNDRED: 100,
  FIFTY: 50,
  TEN: 10,
};

export { NAME, MENU, MIN_PRODUCT, ERROR_MESSAGE, STORAGE_KEY, COINS };
