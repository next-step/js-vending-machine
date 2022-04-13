Cypress.Commands.add('$productManageMenu', () =>
  cy.get('#product-manage-menu')
);
Cypress.Commands.add('$vendingMachineManageMenu', () =>
  cy.get('#vending-machine-manage-menu')
);
Cypress.Commands.add('$productPurchaseMenu', () =>
  cy.get('#product-purchase-menu')
);

describe('자판기', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('메인 화면 테스트', () => {
    it('상품관리, 잔동충전, 상품구매 버튼이 보인다.', () => {
      cy.$productManageMenu().should('be.visible');
      cy.$vendingMachineManageMenu().should('be.visible');
      cy.$productPurchaseMenu().should('be.visible');
    });
  });
});
