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
});

export const TAB = Object.freeze({
  PRODUCT_MANAGE_TAB: '상품관리',
  PRODUCT_PURCHASE_TAB: '상품구매',
  VENDING_MACHINE_MANAGE_TAB: '잔돈충전',
});

export const ERROR_MESSAGE = Object.freeze({
  REQUIRED_PRODUCT_NAME: '상품명을 입력해주세요.',
  REQUIRED_PRODUCT_PRICE: '상품 금액을 입력해주세요.',
  REQUIRED_PRODUCT_QUANTITY: '상품 수량을 입력해주세요.',
  PRODUCT_PRICE_HAVE_TO_OVER_100: '상품 금액은 100이상인 정수여야 합니다.',
  PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10: '상품 금액은 10으로 나누어 떨어져야 합니다.',
  PRODUCT_QUANTITY_HAVE_TO_OVER_1: '상품 수량은 1이상인 정수여야 합니다.',
});
