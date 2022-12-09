beforeEach(() => {
  cy.visit('index.html');
});

describe('상품관리 탭을 테스트한다.', () => {
  context('상품을 추가할 때', () => {
    it('최초 상품 목록은 비워진 상태이다.', () => {
      cy.get('#product-inventory-container').children().should('have.length', 0);
    });
  });
});
