const { test$ } = require('../../src/js/utils/utils.js');
const { TEST_DOM } = require('../../src/js/constants/test.js');
const { ERROR_MESSAGE } = require('../../src/js/constants/index.js');
const { checkError } = require('../support/utils.js');

before(() => {
  cy.visit('http://127.0.0.1:8080');
});

describe('사용자가 자판기에 돈을 충전', () => {
  before(() => {
    cy.clearNewProductForm();
    cy.typeNewProductFormAndSubmit(['hello', 1000, 10]);
    cy.clickMachineModeTab(TEST_DOM.MANAGE_PRODUCT_TAB);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('잘못된 충전 금액이 입력되는 경우 에러', () => {
    it('충전 금액이 입력되지 않은 경우 에러', () => {
      cy.typeChargeAmountAndSubmit('');
      checkError(ERROR_MESSAGE.NONE_CHARGE_AMOUNT);
    });

    it('충전 금액이 100원 보다 작은 경우 에러  ', () => {
      checkError(ERROR_MESSAGE.MIN_CHARGE_AMOUNT);
      cy.typeChargeAmountAndSubmit('99');
    });

    it('충전 금액이 1억원 보다 큰 경우 경우 에러', () => {
      checkError(ERROR_MESSAGE.MAX_CHARGE_AMOUNT);
      cy.typeChargeAmountAndSubmit('100000001');
    });

    it('충전 금액이 10으로 나누어 떨어지지 않으면 에러', () => {
      checkError(ERROR_MESSAGE.DIVISION_BY_TEN_CHARGE_AMOUNT);
      cy.typeChargeAmountAndSubmit('1001');
    });
  });

  describe('정상적인 충전', () => {
    const validAmount = '10000';

    it('충전 금액을 입력하고, 충전하기 버튼을 누르면 아래 충전된 금액이 나타난다', () => {
      cy.typeChargeAmountAndSubmit(validAmount);
      cy.get(test$(TEST_DOM.INSERTED_AMOUNT)).should('have.text', validAmount);
    });

    it('충전 금액은 누적 가능하다(10000원 + 10000원 -> 20000원).', () => {
      cy.get(test$(TEST_DOM.INSERTED_AMOUNT)).then(($insertedAmount) => {
        const insertedAmount = Number($insertedAmount.text());

        cy.typeChargeAmountAndSubmit(validAmount);
        cy.get(test$(TEST_DOM.INSERTED_AMOUNT)).should(
          'have.text',
          insertedAmount + Number(validAmount)
        );
      });
    });
  });
});
