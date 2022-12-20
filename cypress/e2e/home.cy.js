describe('사이트 홈 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    });

    homeSpec();
})

function homeSpec() {
    it('첫 페이지에 상품관리, 잔돈충전, 상품구매 버튼이 있다.', () => {
        cy.get('#stock-manage-menu').should('exist');
        cy.get('#vending-machine-manage-menu').should('exist');
        cy.get('#product-purchase-menu').should('exist');
        cy.get('.stock-container').should('not.be.visible');
    });

    it('상품관리탭을 클릭하면 상품 추가하기 창이 보여진다.', () => {
        cy.clickStockTab();
        cy.get('.stock-container').should('be.visible');
    });

    it('잔돈충전탭을 클릭하면 잔돈 충전하기 창이 보여진다.', () => {
        cy.clickRechargeTab();
        cy.get('.recharge-container').should('be.visible');
    });
}

