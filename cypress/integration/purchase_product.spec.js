const { test$ } = require('../../src/js/utils/utils.js');
const { TEST_DOM } = require('../../src/js/constants/test.js');
const { ERROR_MESSAGE } = require('../../src/js/constants/index.js');
const { checkError } = require('../support/utils.js');
before(() => {
  cy.visit('http://127.0.0.1:8080');
});

describe('사용자가 자판기에 금액을 충전', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('상품을 구매 할 수 없는 경우', () => {
    const expensivePrice = 10000;
    const insertedAmount = 500;

    it('충전된 금액보다 상품 가격이 비싸면 구매 할 수 없다.', () => {
      checkError(ERROR_MESSAGE.LACK_MONEY);

      cy.typeNewProductFormAndSubmit(['칠성사이다', expensivePrice, 1]);
      cy.clearNewProductForm();
      cy.clickMachineModeTab(TEST_DOM.PURCHASE_PRODUCT_TAB);
      cy.typeChargeAmountAndSubmit(`${insertedAmount}`);
      cy.purchaseProduct();
    });

    it('구입하려는 상품의 개수가 0개 이하면 구매 할 수 없다.', () => {
      checkError(ERROR_MESSAGE.LACK_PRODUCT_QUANTITY);
      cy.clickMachineModeTab(TEST_DOM.MANAGE_PRODUCT_TAB);
      cy.typeNewProductFormAndSubmit(['칠성사이다', 100, 1]);
      cy.clearNewProductForm();

      cy.clickMachineModeTab(TEST_DOM.PURCHASE_PRODUCT_TAB);
      cy.purchaseProduct();
      cy.purchaseProduct();
    });
  });

  describe('상품이 구매 가능한 경우', () => {
    before(() => {
      cy.clickMachineModeTab(TEST_DOM.MANAGE_PRODUCT_TAB);
      cy.typeNewProductFormAndSubmit(['칠성사이다', 100, 100]);
      cy.clickMachineModeTab(TEST_DOM.PURCHASE_PRODUCT_TAB);
    });

    it('상품을 추가하면 상품이 보이고, 구매하기 버튼이 보인다.', () => {
      cy.get(test$(TEST_DOM.PURCHASE_BUTTON)).should('be.visible');
    });
  });
});
