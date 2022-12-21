export const PRODUCT_MANAGE = {
  PRICE_MIN: 100,
  PRICE_UNIT: 10,
  QUANTITY_MIN: 1,
};

export const CHARGE_MANAGE = {
  AMOUNT_MIN: 100,
  AMOUNT_UNIT: 10,
};

export const MESSAGE = {
  PRODUCT_NAME_EMPTY: '상품명을 입력하세요.',
  PRODUCT_NAME_SPACE: '상품명에는 공백을 입력할 수 없습니다.',

  PRODUCT_MIN_PRICE: '최소 가격은 100원입니다.',
  PRODUCT_UNIT: '가격 단위는 10원입니다.',

  PRODUCT_MIN_QUANTITY: '최소 수량은 1개입니다.',

  CHARGE_MIN: '최소 충전 금액은 100원입니다.',
  CHARGE_UNIT: '충전 단위는 10원입니다.',
};

export const SELECTOR = {
  APP: '#app',
  PRODUCT_MANAGE_MENU: '#product-manage-menu',
  VENDING_MACHINE_MANAGE_MENU: '#vending-machine-manage-menu',
  PRODUCT_PURCHAGE_MENU: '#product-purchase-menu',

  PRODUCT_FORM: '.product-container',
  PRODUCT_ADD_BUTTON: '#product-add-button',

  PRODUCT_INVENTORY_CONTAINER: '#product-inventory-container',
  PRODUCT_FORM_INPUT: '.product-container > input',

  CHARGE_FORM: '.vending-machine-wrapper',
  CHARGE_FORM_INPUT: '#vending-machine-charge-input',
  CHARGE_TOTAL: '#vending-machine-charge-amount',

  COIN_500_QUANTITY: '#vending-machine-coin-500-quantity',
  COIN_100_QUANTITY: '#vending-machine-coin-100-quantity',
  COIN_50_QUANTITY: '#vending-machine-coin-50-quantity',
  COIN_10_QUANTITY: '#vending-machine-coin-10-quantity',
};

export const TAB = {
  PRODUCT_MANAGE_MENU: 'product-manage-menu',
  VENDING_MACHINE_MANAGE_MENU: 'vending-machine-manage-menu',
  PRODUCT_PURCHAGE_MENU: 'product-purchase-menu',
};

export const PRODUCT = {
  NAME: 'product-name',
  PRICE: 'product-price',
  QUANTITY: 'product-quantity',
};

export const CHARGE = {
  AMOUNT: 'vending-machine-charge-amount',
};
