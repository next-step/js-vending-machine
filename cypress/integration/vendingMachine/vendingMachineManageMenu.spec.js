describe('자판기 잔돈 충전', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#vending-machine-manage-menu');
  });

  it('', () => {
    const amount = 1000;

    cy.get('#vending-machine-charge-input').type(String(amount));
    cy.get('button').contains('충전하기').click();

    cy.contains('보유 금액').should('contain.text', amount);
  });
});
