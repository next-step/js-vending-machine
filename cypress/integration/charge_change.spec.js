import { test$ } from '../../src/js/utils/utils.js';
import { TEST_DOM } from '../../src/js/constants/test.js';
import { ERROR_MESSAGE, LOCAL_STORAGE_KEY } from '../../src/js/constants/index.js';

before(() => {
  cy.visit('http://127.0.0.1:8080');
});

const checkError = (errorMessage) => {
  cy.on('uncaught:exception', (err) => {
    expect(err.message).to.include(errorMessage);
    return false;
  });
};

describe('동전 추가', () => {
  describe('...', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });

  describe('잘못된 충천 금액', () => {
    it('충전금액이 입력되지 않으면 에러', () => {
      checkError(ERROR_MESSAGE.NONE_AMOUNT);
      cy.typeAmountAndSubmit('');
    });

    it('충전금액이 10으로 나누어 떨어지지 않으면 에러', () => {
      checkError(ERROR_MESSAGE.AMOUNT_DIVISION_BY_TEN);
      cy.typeAmountAndSubmit('105');
    });

    it('충전금액이 100원 보다 작으면 않으면 에러', () => {
      checkError(ERROR_MESSAGE.MIN_AMOUNT);
      cy.typeAmountAndSubmit('99');
    });

    it('충전금액이 1억원을 넘어가면 에러 에러', () => {
      checkError(ERROR_MESSAGE.MAX_AMOUNT);
      cy.typeAmountAndSubmit('100000001');
    });
  });

  describe('정상적인 잔돈 충전', () => {
    it('충전을 하면 금액이 바뀌고 잔액은 계속 누적됨', async () => {
      const firstInput = '1000';
      const secondInput = '2000';

      cy.typeAmountAndSubmit(firstInput);
      cy.get(test$(TEST_DOM.CHARGED_AMOUNT)).should('have.text', Number(firstInput));

      cy.typeAmountAndSubmit(secondInput);
      cy.get(test$(TEST_DOM.CHARGED_AMOUNT)).should('have.text', Number(firstInput + secondInput));

      // const amountArray = [10, 50, 100, 500];
      // let result = 0;
      // [
      //   TEST_DOM.COIN_QUANTITY_10,
      //   TEST_DOM.COIN_QUANTITY_50,
      //   TEST_DOM.COIN_QUANTITY_100,
      //   TEST_DOM.COIN_QUANTITY_500,
      // ].forEach(($coinQuantity, index) => {
      //   cy.get(test$($coinQuantity)).then((val) => {
      //     console.log(val);
      //     cy.wrap(val).should('have.text', 10);
      //   });
      // });
    });
  });
});
