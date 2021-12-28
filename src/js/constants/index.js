export const DOM = {
  NEW_PRODUCT_FORM_CONTAINER: '#new-product-form-container',
  PRODUCT_NAME_INPUT: '#product-name-input',
  PRODUCT_PRICE_INPUT: '#product-price-input',
  PRODUCT_QUANTITY_INPUT: '#product-quantity-input',
  PRODUCT_ADD_BUTTON: '#product-add-button',
  PRODUCT_INVENTORY: '#product-inventory',
  PRODUCT_INVENTORY_CONTAINER: '#product-inventory-container',

  VIEW_STATE_TABS_CONTAINER: '#view-state-tabs-container',
  MANAGE_PRODUCT_BUTTON: '#product-manage-menu',
  CHARGE_CHANGE_BUTTON: '#vending-machine-manage-menu',
  PURCHASE_PRODUCT_BUTTON: '#product-purchase-menu',

  CHARGE_FORM_CONTAINER: '#charge-form-container',
  CHARGE_FORM: '.vending-machine-wrapper',
  CHARGE_MONEY_INPUT: '#vending-machine-charge-input',
  CHARGE_BUTTON: '#vending-machine-charge-button',
  CHARGED_AMOUNT: '#vending-machine-charge-amount',
  COIN_QUANTITY_500: '#vending-machine-coin-500-quantity',
  COIN_QUANTITY_100: '#vending-machine-coin-100-quantity',
  COIN_QUANTITY_50: '#vending-machine-coin-50-quantity',
  COIN_QUANTITY_10: '#vending-machine-coin-10-quantity',
};

export const ERROR_MESSAGE = {
  NONE_NAME: '이름을 입력해주세요.',
  MAX_LENGTH_NAME: '이름의 길이는 10글자 이하여야합니다.',

  NONE_QUANTITY: '수량을 입력해주세요.',
  MIN_QUANTITY: '수량은 1개 이상이어야 합니다.',
  MAX_QUANTITY: '수량은 999개 이하여야 합니다.',

  NONE_PRICE: '가격을 입력해주세요.',
  DIVISION_BY_TEN: '가격은 10으로 나누어 떨어져야 합니다.',
  MIN_PRICE: '가격은 100원 이상이어야 합니다.',
  MAX_PRICE: '가격은 1000만원 이하여야 합니다.',

  NONE_AMOUNT: '충전 금액이 입력되지 않았습니다',
  MIN_AMOUNT: '충전 금액은 100원 이상이어야 합니다.',
  MAX_AMOUNT: '충천 금액은 1억 이하여야 합니다.',
  AMOUNT_DIVISION_BY_TEN: '충전 금액은 10으로 나누어 떨어져야 합니다.',
};

export const MACHINE_MODE = {
  MANAGE_PRODUCT: 'manageProduct',
  CHARGE_CHANGE: 'chargeChange',
  PURCHASE_PRODUCT: 'purchaseProduct',
};

export const LOCAL_STORAGE_KEY = {
  PRODUCTS: 'products',
  MACHINE_MODE: 'currentTab',
  CHARGED_AMOUNT: 'chargedAmount',
  CHARGED_COINS: 'chargedCoins',
};
