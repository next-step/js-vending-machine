// Cypress.Commands.add('$', dataset => cy.get(`[data-cy=${dataset}]`));
const $ = dataset => cy.get(`[data-cy=${dataset}]`);

Cypress.Commands.add('alert', message => {
  cy.on('window:alert', str => {
    expect(str).to.equal(message);
  });
});

describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('탭 전환시', () => {
    it('첫 화면에서 상품관리 section이 보인다.', () => {
      cy.get('#manage-products').click();
      $('manage-products').should('be.visible');
    });

    it('잔돈 충전 탭을 클릭하면 잔동 충전 section이 보인다.', () => {
      cy.get('#charging-money').click();
      $('charging-money').should('be.visible');
    });

    it('상품 구매 탭을 클릭하면 상품 구매 section이 보인다.', () => {
      cy.get('#purchase-product').click();
      $('purchase-product').should('be.visible');
    });

    it('상품 관리 탭을 클릭하면 상품 관리 section이 보인다.', () => {
      cy.get('#manage-products').click();
      $('manage-products').should('be.visible');
    });
  });

  describe('상품 관리 - 상품을 추가한다.', () => {
    it('최초 상품 목록은 비워진 상태이다.', () => {
      expect($('products-inventory').find('tbody').children().should('have.length', 0));
    });

    it('상품명, 금액, 수량을 입력 할 수 있다.', () => {
      $('product-name-input').should('exist');
      $('product-price-input').should('exist');
      $('product-quantity-input').should('exist');
      $('product-add-button').should('exist');

      // $('product-name-input').type('콜라');
      // $('product-price-input').type('1,000');
      // $('product-quantity-input').type('5');
      // $('product-add-button').click();
    });

    it('상품명은 공백이 불가능하다.', () => {
      $('product-name-input').type(' ');
      $('product-price-input').type('1,000');
      $('product-quantity-input').type('5');
      $('product-add-button').click();

      cy.alert('상품명은 공백이 불가능합니다.');
    });
  });
});
