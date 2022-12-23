import ERROR_MESSAGES from '../../src/js/constants/errorMessages';
// Cypress.Commands.add('$', dataset => cy.get(`[data-cy=${dataset}]`));
const $ = dataset => cy.get(`[data-cy=${dataset}]`);

Cypress.Commands.add('doAlert', message => {
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
    });

    it('상품명은 공백이면 alert을 띄운다.', () => {
      $('product-name-input').type(' ');
      $('product-price-input').type('1000');
      $('product-quantity-input').type('5');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.NAME_SHOULD_NOT_EMPTY);
    });

    it('가격은 공백이면 alert을 띄운다.', () => {
      $('product-name-input').type('콜라');
      $('product-price-input').type(' ');
      $('product-quantity-input').type('5');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.PRICE_SHOULD_NOT_EMPTY);
    });

    it('수량이 공백이면 alert을 띄운다.', () => {
      $('product-name-input').type('콜라');
      $('product-price-input').type('1000');
      $('product-quantity-input').type(' ');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.QUANTITY_SHOULD_NOT_EMPTY);
    });

    it('최소 가격보다 입력한 가격이 적으면 alert을 띄운다.', () => {
      $('product-name-input').type('콜라');
      $('product-price-input').type('10');
      $('product-quantity-input').type('5');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.TOO_SMALL_PRICE);
    });

    it('최소 수량보다 입력한 수량이 적으면 alert을 띄운다.', () => {
      $('product-name-input').type('콜라');
      $('product-price-input').type('1000');
      $('product-quantity-input').type('0');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.TOO_SMALL_QUANTITY);
    });

    it('상품의 가격이 10으로 나누어떨어지지 않으면 alert을 띄운다.', () => {
      $('product-name-input').type('콜라');
      $('product-price-input').type('777');
      $('product-quantity-input').type('5');
      $('product-add-button').click();

      cy.doAlert(ERROR_MESSAGES.NOT_DIVISIBLE_PRICE);
    });
  });
});
