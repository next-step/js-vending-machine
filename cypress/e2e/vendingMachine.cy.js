describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('탭 전환 테스트', () => {
    it('잔돈 충전 탭을 클릭하면 잔동 충전 section이 보인다.', () => {
      cy.get('#charging-money-menu').click();
      cy.$('charging-money').should('be.visible');
    });

    it('상품 구매 탭을 클릭하면 상품 구매 section이 보인다.', () => {
      cy.get('#product-purchase-menu').click();
      cy.$('purchase-product').should('be.visible');
    });

    it('상품 관리 탭을 클릭하면 상품 관리 section이 보인다.', () => {
      cy.get('#manage-product-menu').click();
      cy.$('manage-products').should('be.visible');
    });
  });
});
