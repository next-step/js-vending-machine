describe('Product', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('[상품 추가하기] 영역이 보여야 한다.', () => {
    // todo : 이름, 가격, 수량 input과 추가하기 버튼이 있어야 한다.
    cy.get('#product-name-input').should('be.visible');
    cy.get('#product-price-input').should('be.visible');
    cy.get('#product-quantity-input').should('be.visible');
    cy.get('#product-add-button').should('be.visible');
  });

  it('[상품 현황] 영역이 보여야 한다.', () => {
    cy.get('.product-inventory').should('be.visible');
  });
});
