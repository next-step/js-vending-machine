const { TEST_DOM } = require('../../src/js/constants/test.js');
const { test$ } = require('../../src/js/utils/utils.js');
const { checkError } = require('../support/utils.js');
const { ERROR_MESSAGE } = require('../../src/js/constants/index.js');
before(() => {
  cy.visit('http://127.0.0.1:8080');
});

describe('잔돈 반환', () => {
  describe('...', () => {
    before(() => {
      cy.clickMachineModeTab(TEST_DOM.PURCHASE_PRODUCT_TAB);
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    const coinArray = [500, 100, 50, 10];
    const insertedAmount = 1040;

    it('충전 금액이 0원인 상태에서 반환하기 버튼을 누르면 에러', () => {
      checkError(ERROR_MESSAGE.NONE_CHARGED_AMOUNT);
      cy.get(test$(TEST_DOM.COIN_RETURN_BUTTON)).click();
    });

    it('반환하기 버튼을 누르면 잔돈이 반환된다.', () => {
      cy.typeChargeAmountAndSubmit(`${insertedAmount}`);
      cy.get(test$(TEST_DOM.COIN_RETURN_BUTTON)).click();
    });

    it('반환된 동전들의 계산 결과가 일치한다.', () => {
      let acc = 0;
      cy.get(test$(TEST_DOM.COIN_RETURN_CONTAINER))
        .find('tbody span')
        .each(($el, index) => {
          acc += Number($el.text()) * coinArray[index];
        })
        .then(() => {
          cy.wrap(acc).should('eq', insertedAmount);
        });
    });

    it('반환이 완료되면 반환된 금액만큼 충전 금액에서 차감된다.', () => {
      let acc = 0;
      cy.get(test$(TEST_DOM.COIN_RETURN_CONTAINER))
        .find('tbody span')
        .each(($el, index) => {
          acc += Number($el.text()) * coinArray[index];
        })
        .then(() => {
          cy.wrap(acc).should('eq', insertedAmount);
        });

      cy.get(test$(TEST_DOM.INSERTED_AMOUNT)).then(($el) => {
        cy.wrap($el.text()).should('eq', `${insertedAmount - acc}`);
      });
    });
  });
});
