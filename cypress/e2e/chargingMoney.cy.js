describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#charging-money').click();
  });

  describe('잔돈 충전', () => {
    describe('잔돈의 초기값을 테스트한다.', () => {
      it('최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
        cy.get('#vending-machine-coin-500-quantity').contains('0');
        cy.get('#vending-machine-coin-100-quantity').contains('0');
        cy.get('#vending-machine-coin-50-quantity').contains('0');
        cy.get('#vending-machine-coin-10-quantity').contains('0');
      });

      it('잔돈을 충전할 input 값이 존재한다.', () => {
        cy.get('#vending-machine-charge-input').should('exist');
        cy.get('#vending-machine-charge-button').should('exist');
      });

      it('최소 충전 금액이 100보다 적으면 alert을 띄운다.', () => {
        cy.get('#vending-machine-charge-input').type('10');
        cy.get('#vending-machine-charge-button').click();
        cy.doAlert('최소 충전 금액은 100이상이어야 합니다.');
      });

      it('충전 금액이 10으로 나누어 떨어지지 않으면 alert을 띄운다.', () => {
        cy.get('#vending-machine-charge-input').type('777');
        cy.get('#vending-machine-charge-button').click();
        cy.doAlert('충전 금액은 10으로 나누어 떨어져야 합니다.');
      });
    });

    describe('잔돈을 충전한다.', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.get('#charging-money').click();
        cy.get('#vending-machine-charge-input').type('660');
        cy.get('#vending-machine-charge-button').click();
        cy.get('#vending-machine-charge-input').clear();
      });

      it('충전 금액 입력하면 보유 금액에 더해진다.', () => {
        cy.get('#vending-machine-charge-amount').should('have.text', '660');
        cy.get('#vending-machine-charge-input').clear();

        cy.get('#vending-machine-charge-input').type('240');
        cy.get('#vending-machine-charge-button').click();
        cy.get('#vending-machine-charge-input').clear();
        cy.get('#vending-machine-charge-amount').should('have.text', '900');
      });

      it('충전 금액을 입력하면 동전이 채워진다.', () => {
        cy.get('#vending-machine-coin-500-quantity').contains('1');
        cy.get('#vending-machine-coin-100-quantity').contains('1');
        cy.get('#vending-machine-coin-50-quantity').contains('1');
        cy.get('#vending-machine-coin-10-quantity').contains('1');
      });
    });
  });
});
