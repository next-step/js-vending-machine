describe('bending machine', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('상품관리 페이지', () => {
    it('최초 상품 공백 확인', () => {
      cy.get('[data-manage=product]').should('be.empty');
    });
  });
});
