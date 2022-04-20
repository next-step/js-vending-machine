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

  it('[추가하기] 버튼을 클릭하면 상품이 추가된다.', () => {
    // given
    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(1500);
    cy.get('#product-quantity-input').type(5);

    // when
    cy.get('#product-add-button').click();

    // then
    cy.get('.product-manage-name').should('have.text', '칠성사이다');
    cy.get('.product-manage-price').should('have.text', 1500);
    cy.get('.product-manage-quantity').should('have.text', 5);
  });
});
