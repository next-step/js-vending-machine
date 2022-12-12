/**
 *
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const querySelector = (selector) => document.querySelector(selector);

/**
 *
 * @param {string} selector
 * @returns {HTMLElement[]}
 */
export const querySelectorAll = (selector) => document.querySelector(selector);

export const ELEMENT = {
  SECTION: {
    MANAGING_PRODUCT: '#section-managing-product',
    MANAGING_CHARGE: '#section-managing-charge',
  },
  SPAN: {
    CHARGE_AMOUNT: '#text-charge-amount',
  },
  BUTTON: {
    PRODUCT_ADD: '#product-add-button',
    CHARGE_AMOUNT: '#vending-machine-charge-button',
  },
  INPUT: {
    PRODUCT_NAME: '#product-name-input',
    PRODUCT_PRICE: '#product-price-input',
    PRODUCT_AMOUNT: '#product-amount-input',
    CHARGE_AMOUNT: '#charge-amount-input',
  },
  TABLE: {
    VENDING_MACHINE_PRODUCT_TBODY: '#vending-machine-products-table > tbody',
    VENDING_MACHINE_CHARGE_AMOUNT: '#vending-machine-charge-amount > tbody',
  },
  TAB_BUTTON: {
    MANAGING_PRODUCT: '#product-manage-menu',
    MANAGING_CHARGE: '#vending-machine-manage-menu',
    // PURCHASING_PRODUCT: '#product-purchase-menu',
  },
  TABS: {
    MANAGING_PRODUCT: '#section-managing-product',
    MANAGING_CHARGE: '#section-managing-charge',
    // PURCHASING_PRODUCT: '#section-purchasing-product', // TODO: step2에서 index.html에 반영하기
  },
};
