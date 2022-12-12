export const MENU_TAB = {
  PRODUCT_MANAGE: "product-manage-menu",
  PRODUCT_PURCHASE: "product-purchase-menu",
  VM_MANAGE: "vending-machine-manage-menu",
};

export const PRODUCT_MANAGE_MENU = {
  PRODUCT_FORM: "product-container-form",
  NAME_INPUT: `product-name-input`,
  PRICE_INPUT: "product-price-input",
  QUANTITY_INPUT: "product-quantity-input",
  ADD_BTN: "product-add-button",
  NAME_LIST_CLASS: ".product-manage-name",
  PRICE_LIST_CLASS: ".product-manage-price",
  QUANTITY_LIST_CLASS: ".product-manage-quantity",
  INVENTORY_CLASS: ".product-inventory",
};

export const PRODUCT_PURCHASE_MENU = {
  CHARGE_INPUT: "charge-input",
  CHARGE_BTN: "charge-button",
  CHARGE_CHECK: "charge-amount",
  COIN_RETURN_BTN: "coin-return-button",

  FIVE_HUNDRED_WON: "coin-500-quantity",
  ONE_HUNDRED_WON: "coin-100-quantity",
  FIFTY_WON: "coin-50-quantity",
  TEN_WON: "coin-10-quantity",

  PURCHASE_BTN: "purchase-button",
  NAME_LIST_CLASS: ".product-purchase-name",
  PRICE_LIST_CLASS: ".product-purchase-price",
  QUANTITY_LIST_CLASSL: ".product-purchase-quantity",

  /*
   * - 각 상품 목록의 이름은 `dataset` 속성을 사용하고 `data-product-name` 형식으로 저장한다.
   * - 각 상품 목록의 가격은 `dataset` 속성을 사용하고 `data-product-price` 형식으로 저장한다.
   * - 각 상품 목록의 수량은 `dataset` 속성을 사용하고 `data-product-quantity` 형식으로 저장한다.
   */
};

export const VM_MANAGE_MENU = {
  //동전을 무작위로 생성하는 기능은 `/lib/` 내부의 랜덤 유틸 중 `Random.pick` 메서드를 활용해서 구현한다.
  CONTAINER: ".purchase-container",
  CHARGE_FORM: "vending-machine-form",
  CHARGE_INPUT: "vending-machine-charge-input",
  CHARGE_BTN: "vending-machine-charge-button",
  CHARGE_CHECK: "vending-machine-charge-amount",

  RETURN_BTN: "coin-return-button",
  FIVE_HUNDRED_WON: "vending-machine-coin-500-quantity",
  ONE_HUNDRED_WON: "vending-machine-coin-100-quantity",
  FIFTY_WON: "vending-machine-coin-50-quantity",
  TEN_WON: "vending-machine-coin-10-quantity",
};
