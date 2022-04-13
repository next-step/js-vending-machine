describe('자판기 미션 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  context('[STEP1] 상품관리', () => {
    it('1. 초기화면 - 상품관리, 잔돈 충전, 상품 구매 버튼과 상품 추가 탭이 노출된다.', () => {
      cy.initialView();
    });

    it('2. 상풍명, 가격, 수량을 입력하고 추가 버튼을 클릭하면, 상품 현황에 상품이 추가된다.', () => {
      const item = {
        title: '아이스 아메리카노',
        price: 1500,
        quantity: 5
      };

      cy.get('#product-name-input').type(item.title);
      cy.get('#product-price-input').type(item.price);
      cy.get('#product-price-input').type(item.quantity);
      cy.get('#product-quantity-input').type(5).type('{enter}');

      cy.get('.product-inventory tr').should('have.length', 2);
      cy.get('.product-inventory tr')
        .last()
        .contains(item.title)
        .siblings()
        .contains(item.price)
        .siblings()
        .contains(item.quantity);
    });
  });
});
