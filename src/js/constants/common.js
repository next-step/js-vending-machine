import SELECTOR from './selector.js';

export const TITLE = {
  MAIN: '🥤자판기🥤',
  PRODUCT_MANAGE: {
    ADD: '상품 추가하기',
    STATUS: '상품현황'
  },
  VENDING_MACHINE_MANAGE: {
    CHARGE: '자판기 동전 충전하기',
    CONINS: '자판기가 보유한 동전',
  },
  PRODUCT_PURCHASE_MENU: {
    INPUT_AMOUNT: '금액투입',
    STATUS: '구매할 수 있는 상품 현황',
    CHANGES: '잔돈',
  },
}
export const PRODUCT_MANAGE_MENU = '상품 관리';
export const VENDING_MACHINE_MANAGE_MENU = '잔돈 충전';
export const PRODUCT_PURCHASE_MENU = '상품 구매';

export const MENU_BUTTONS = [
  {
    text: PRODUCT_MANAGE_MENU,
    id: SELECTOR.productManageMenuId,
  },
  {
    text: VENDING_MACHINE_MANAGE_MENU,
    id: SELECTOR.vendingMachineManageMenuId,
  },
  {
    text: PRODUCT_PURCHASE_MENU,
    id: SELECTOR.productPurchaseMenuId,
  },
];

export const BUTTON_NAME = {
  ADD: '추가하기',
  CHARGE: '충전하기',
};

export const PRODUCT_PROPERTIES = [
  {
    text: '상품명',
    id: SELECTOR.productNameInputId,
    type: 'text',
  },
  {
    text: '가격',
    id: SELECTOR.productPriceInputId,
    type: 'number',
  },
  {
    text: '수량',
    id: SELECTOR.productQuantityInputId,
    type: 'number',
  },
];

export const CHANGE_INPUT_PROPERTIES = [
  {
    text: '동전',
    id: SELECTOR.vendingMachineChargeInputId,
    type: 'number',
  },
];

export const VENDING_MACHINE_TABLE_LABEL = ['동전', '개수'];