Cypress.Commands.add('$productManageMenu', () =>
  cy.get('#product-manage-menu')
);
Cypress.Commands.add('$vendingMachineManageMenu', () =>
  cy.get('#vending-machine-manage-menu')
);
Cypress.Commands.add('$productPurchaseMenu', () =>
  cy.get('#product-purchase-menu')
);
Cypress.Commands.add('$app', () => cy.get('#app'));
Cypress.Commands.add('$productContainer', () =>
  cy.$app().get('div.product-container')
);
Cypress.Commands.add('$productInventory', () =>
  cy.$app().get('table.product-inventory')
);
Cypress.Commands.add('$productNameInput', () =>
  cy.$app().get('#product-name-input')
);
Cypress.Commands.add('$productPriceInput', () =>
  cy.$app().get('#product-price-input')
);
Cypress.Commands.add('$productQuantityInput', () =>
  cy.$app().get('#product-quantity-input')
);
Cypress.Commands.add('$productAddSubmit', () =>
  cy.$app().get('#product-add-button')
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

  describe('상품관리 화면 테스트', () => {
    it('상품명, 가격, 수량을 입력할 수 있는 폼이 보인다.', () => {
      cy.$productContainer().should('be.visible');
      cy.$productNameInput().should('be.visible');
      cy.$productPriceInput().should('be.visible');
      cy.$productQuantityInput().should('be.visible');
      cy.$productAddSubmit().should('be.visible');
    });

    it('상품 목록이 보인다.', () => {
      cy.$productInventory().should('be.visible');
    });
  });
});
