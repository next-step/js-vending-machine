import ERROR_MESSAGES from '../../src/js/constants/errorMessages';

Cypress.Commands.add('inputMoney', price => {
  cy.$('input-money').type(price);
  cy.$('input-money-button').click();
});

describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#product-purchase-menu').click();
  });

  describe('상품 구매', () => {
    describe('투입 금액의 유효성 검사를 한다.', () => {
      it('금액을 투입할 수 있다.', () => {
        cy.$('input-money').should('exist');
        cy.$('input-money-button').should('exist');
      });

      it('투입 금액이 100원 보다 크지 않으면 alert을 띄운다.', () => {
        cy.inputMoney('10');
        cy.doAlert(ERROR_MESSAGES.TOO_SMALL_CHARGING_MONEY);
      });

      it('투입 금액이 10으로 나누어 떨어지지 않으면 alert을 띄운다.', () => {
        cy.inputMoney('111');
        cy.doAlert(ERROR_MESSAGES.NOT_DIVISIBLE_CHARGING_MONEY);
      });

      it('투입 금액을 입력하면 투입한 금액에 기록된다.', () => {
        cy.inputMoney('1000');
        cy.$('input-money-value').should('have.text', '1,000');
      });
    });

    describe('구매할 수 있는 상품 현황을 테스트한다.', () => {
      beforeEach(() => {
        cy.inputMoney('1000');
      });

      it('상품을 클릭하면 상품 개수가 1씩 줄어든다.', () => {});
      it('상품을 클릭하면 투입 금액에서 해당 금액만큼 빠져나간다.', () => {});
      it('상품을 클릭하고 투입 금액보다 적으면 alert을 띄운다.', () => {});
    });
  });
});
