describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#charging-money-menu').click();
  });

  describe('잔돈 충전', () => {
    describe('잔돈의 초기값을 테스트한다.', () => {
      it('최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
        cy.$('coins').eq(0).should('contain', '0');
        cy.$('coins').eq(1).should('contain', '0');
        cy.$('coins').eq(2).should('contain', '0');
        cy.$('coins').eq(3).should('contain', '0');
      });

      it('잔돈을 충전할 input 값이 존재한다.', () => {
        cy.$('charge-input').should('exist');
        cy.$('charge-button').should('exist');
      });

      it('최소 충전 금액이 100보다 적으면 alert을 띄운다.', () => {
        cy.chargingMoney('10');
        cy.doAlert('최소 충전 금액은 100이상이어야 합니다.');
      });

      it('충전 금액이 10으로 나누어 떨어지지 않으면 alert을 띄운다.', () => {
        cy.chargingMoney('777');
        cy.doAlert('충전 금액은 10으로 나누어 떨어져야 합니다.');
      });
    });

    describe('잔돈을 충전한다.', () => {
      beforeEach(() => {
        cy.chargingMoney('660');
      });

      it('충전 금액 입력하면 보유 금액에 더해진다.', () => {
        cy.$('charge-amount').should('have.text', '660');
        cy.chargingMoney('240');
        cy.$('charge-amount').should('have.text', '900');
      });

      it('충전 금액을 입력하면 동전이 채워진다.', () => {
        cy.get('.coins').eq(0).should('contain', '1');
        cy.get('.coins').eq(1).should('contain', '1');
        cy.get('.coins').eq(2).should('contain', '1');
        cy.get('.coins').eq(3).should('contain', '1');
      });
    });
  });
});
