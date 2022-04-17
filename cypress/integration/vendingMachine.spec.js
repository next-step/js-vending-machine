// MEMO: 테스트코드 작성 시 상수 값 분리
describe('vending machine', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('상품관리 화면', () => {
    Cypress.Commands.add('addProduct', () => {
      cy.get('[data-product=name-input]').type('아메리카노');
      cy.get('[data-product=price-input]').type('4000');
      cy.get('[data-product=quantity-input]').type(`4{enter}`);
    });

    // COMPLETE
    it('최초 상품 공백 확인', () => {
      cy.get('[data-manage=product]').should('be.empty');
    });

    // TODO
    it('상품명, 금액, 수량을 추가할 수 있다. 추가한 상품은 하위 UI에 반영된다.', () => {
      const data = ['아메리카노', '4000', '4'];
      cy.addProduct();
      data.forEach((value) => {
        cy.get('[data-manage=product]')
          .contains('td', value)
          .should('be.visible');
      });
      // thead > td
    });

    // TODO
    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
      cy.addProduct();
      // 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.
    });

    // TODO
    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {});
  });
});
