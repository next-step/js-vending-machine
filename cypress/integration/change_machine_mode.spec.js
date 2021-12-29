const { TEST_DOM } = require('../../src/js/constants/test.js');
const { test$ } = require('../../src/js/utils/utils.js');

before(() => {
  cy.visit('http://127.0.0.1:8080');
});

describe('상단 탭으로 기계 모드 전환 가능', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('초기에는 상품관리 모드', () => {
    cy.get(test$(TEST_DOM.PRODUCTS_CONTAINER)).should('be.visible');
    cy.get(test$(TEST_DOM.CHARGE_COIN_CONTAINER)).should('not.be.visible');
    cy.get(test$(TEST_DOM.INSERT_MONEY_CONTAINER)).should('not.be.visible');
  });

  it('잔돈 충전 탭 클릭하면 잔돈 충천 모드로 전환', () => {
    cy.clickMachineModeTab(TEST_DOM.CHARGE_CHANGE_TAB);
    cy.get(test$(TEST_DOM.PRODUCTS_CONTAINER)).should('not.be.visible');
    cy.get(test$(TEST_DOM.CHARGE_COIN_CONTAINER)).should('be.visible');
    cy.get(test$(TEST_DOM.INSERT_MONEY_CONTAINER)).should('not.be.visible');
  });

  it('상품 구매 탭 클릭하면 상품구매 모드로 전환', () => {
    cy.clickMachineModeTab(TEST_DOM.PURCHASE_PRODUCT_TAB);
    cy.get(test$(TEST_DOM.PRODUCTS_CONTAINER)).should('not.be.visible');
    cy.get(test$(TEST_DOM.CHARGE_COIN_CONTAINER)).should('not.be.visible');
    cy.get(test$(TEST_DOM.INSERT_MONEY_CONTAINER)).should('be.visible');
  });

  it('상품관리 모드 탭 클릭하면 상품관리 모드로 전환', () => {
    cy.clickMachineModeTab(TEST_DOM.MANAGE_PRODUCT_TAB);
    cy.get(test$(TEST_DOM.PRODUCTS_CONTAINER)).should('be.visible');
    cy.get(test$(TEST_DOM.CHARGE_COIN_CONTAINER)).should('not.be.visible');
    cy.get(test$(TEST_DOM.INSERT_MONEY_CONTAINER)).should('not.be.visible');
  });
});
