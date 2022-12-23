describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#charging-money').click();
  });

  describe('잔돈 충전', () => {
    describe('잔돈을 테스트한다.', () => {
      it('최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
        cy.get('#vending-machine-coin-500-quantity').contains('0');
        cy.get('#vending-machine-coin-100-quantity').contains('0');
        cy.get('#vending-machine-coin-50-quantity').contains('0');
        cy.get('#vending-machine-coin-10-quantity').contains('0');
      });
    });
  });
});
