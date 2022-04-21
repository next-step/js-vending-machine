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
});

export const STORE_KEY = Object.freeze({
  CURRENT_TAB: 'current-tab',
  PRODUCTS: 'products',
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
});

export const ERROR_MESSAGE = Object.freeze({
  REQUIRED_PRODUCT_NAME: '상품명을 입력해주세요.',
  REQUIRED_PRODUCT_PRICE: '상품 금액을 입력해주세요.',
  REQUIRED_PRODUCT_QUANTITY: '상품 수량을 입력해주세요.',
  PRODUCT_PRICE_HAVE_TO_OVER_100: `상품 금액은 ${STANDARD.PRODUCT_PRICE_MINIMUM}이상인 정수여야 합니다.`,
  PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10: `상품 금액은 ${STANDARD.PRODUCT_PRICE_DIVIDE_BY}으로 나누어 떨어져야 합니다.`,
  PRODUCT_QUANTITY_HAVE_TO_OVER_1: `상품 수량은 ${STANDARD.PRODUCT_QUANTITY_MINIMUM}이상인 정수여야 합니다.`,
});
