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
    describe('금액을 충전한다.', () => {
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

    const addItems = () => {
      cy.get('#manage-product-menu').click();

      const items = [
        { name: '콜라', price: 1800, quantity: 20 },
        { name: '사이다', price: 1500, quantity: 10 },
        { name: '1개남은 제품', price: 1000, quantity: 1 },
      ];

      items.forEach(({ name, price, quantity }) => {
        cy.registerProduct({ name, price, quantity });
      });
    };

    const addMoney = () => {
      cy.get('#charging-money-menu').click();
      cy.chargingMoney('1000');
      cy.chargingMoney('400');
    };

    describe('상품을 구매한다.', () => {
      beforeEach(() => {
        addItems();
        addMoney();
        cy.get('#product-purchase-menu').click();
      });

      it('상품을 구매하면 상품 개수가 1씩 줄어들고 해당 금액만큼 빠져나간다.', () => {
        cy.$('input-money').type('2000', { force: true });
        cy.$('input-money-button').click();
        cy.$('purchase-list').find('td').eq(0).click();
        cy.$('purchase-list').find('td').eq(2).should('contain', '19');
      });

      it('구매하려는 상품이 투입 금액보다 적으면 alert을 띄운다.', () => {
        cy.$('input-money').type('100', { force: true });
        cy.$('input-money-button').click();
        cy.doAlert(ERROR_MESSAGES.NOT_ENOUGH_MONEY);
      });
    });

    describe('잔돈을 계산한다.', () => {
      beforeEach(() => {
        addMoney();
        cy.get('#product-purchase-menu').click();
      });

      it('모든 금액에 대해 잔돈을 반환할 수 없는 경우, 잔돈을 반환할 수 있는 만큼만 반환한다.', () => {
        cy.$('input-money').type('1500', { force: true });
        cy.$('input-money-button').click();

        cy.$('coin-return-button').click();
        cy.$('coins').eq(0).should('contain', '2개');
        cy.$('coins').eq(1).should('contain', '4개');

        cy.$('input-money-value').should('have.text', '100');
      });

      it('반환한 동전 만큼 사용자가 충전한 금액이 차단된다.', () => {
        cy.$('input-money').type('1000', { force: true });
        cy.$('input-money-button').click();
        cy.$('coin-return-button').click();

        cy.get('#charging-money-menu').click();
        cy.$('charge-amount').should('have.text', '400');
      });
    });
  });
});
