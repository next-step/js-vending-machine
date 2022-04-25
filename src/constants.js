export const SELECTOR = Object.freeze({
  APP_ID: 'app',

  PRODUCT_MANAGE_MENU_ID: 'product-manage-menu',
  VENDING_MACHINE_MANAGE_MENU_ID: 'vending-machine-manage-menu',

  PRODUCT_PURCHASE_MENU_ID: 'product-purchase-menu',
  PRODUCT_NAME_INPUT_ID: 'product-name-input',
  PRODUCT_PRICE_INPUT_ID: 'product-price-input',
  PRODUCT_QUANTITY_INPUT_ID: 'product-quantity-input',
  PRODUCT_ADD_BUTTON_ID: 'product-add-button',
  PRODUCT_INVENTORY_CONTAINER_ID: 'product-inventory-container',

  VENDING_MACHINE_CHARGE_INPUT_ID: 'vending-machine-charge-input',
  VENDING_MACHINE_CHARGE_BUTTON_ID: 'vending-machine-charge-button',
  VENDING_MACHINE_CHARGE_AMOUNT_ID: 'vending-machine-charge-amount',
  VENDING_MACHINE_COIN_500_QUANTITY_ID: 'vending-machine-coin-500-quantity',
  VENDING_MACHINE_COIN_100_QUANTITY_ID: 'vending-machine-coin-100-quantity',
  VENDING_MACHINE_COIN_50_QUANTITY_ID: 'vending-machine-coin-50-quantity',
  VENDING_MACHINE_COIN_10_QUANTITY_ID: 'vending-machine-coin-10-quantity',
});

export const STORE_KEY = Object.freeze({
  CURRENT_TAB: 'current-tab',
  PRODUCTS: 'products',
  HOLDING_MONEY: 'holding-money',

  COIN_500_AMOUNT: 'coin-500-amount',
  COIN_100_AMOUNT: 'coin-100-amount',
  COIN_50_AMOUNT: 'coin-50-amount',
  COIN_10_AMOUNT: 'coin-10-amount',
});

export const HASH = Object.freeze({
  PRODUCT_MANAGE_TAB: '#/product-manage',
  VENDING_MACHINE_MANAGE_TAB: '#/vending-machine-manage',
  PRODUCT_PURCHASE_TAB: '#/product-purchase',
});

export const STANDARD = Object.freeze({
  PRODUCT_PRICE_MINIMUM: 100,
  PRODUCT_PRICE_DIVIDE_BY: 10,
  PRODUCT_QUANTITY_MINIMUM: 1,

  CHARGE_INPUT_MINIMUM: 100,
  CHARGE_INPUT_DIVIDE_BY: 10,

  COIN_500: '500',
  COIN_100: '100',
  COIN_50: '50',
  COIN_10: '10',
});

export const ERROR_MESSAGE = Object.freeze({
  REQUIRED_PRODUCT_NAME: '상품명을 입력해주세요.',
  REQUIRED_PRODUCT_PRICE: '상품 금액을 입력해주세요.',
  REQUIRED_PRODUCT_QUANTITY: '상품 수량을 입력해주세요.',

  PRODUCT_PRICE_HAVE_TO_OVER_100: `상품 금액은 ${STANDARD.PRODUCT_PRICE_MINIMUM}이상인 정수여야 합니다.`,
  PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10: `상품 금액은 ${STANDARD.PRODUCT_PRICE_DIVIDE_BY}으로 나누어 떨어져야 합니다.`,
  PRODUCT_QUANTITY_HAVE_TO_OVER_1: `상품 수량은 ${STANDARD.PRODUCT_QUANTITY_MINIMUM}이상인 정수여야 합니다.`,

  REQUIRED_CHARGE_INPUT: '충전 금액을 입력해주세요.',
  CHARGE_INPUT_HAVE_TO_OVER_100: `충전 금액은 ${STANDARD.CHARGE_INPUT_MINIMUM}원 이상이어야 합니다.`,
  CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10: `충전 금액은 ${STANDARD.CHARGE_INPUT_DIVIDE_BY}원으로 나누어 떨어져야 합니다.`,
});
