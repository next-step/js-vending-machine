import ERROR_MESSAGES from '../../src/js/constants/errorMessages';

Cypress.Commands.add('containProduct', (name, price, quantity) => {
  cy.$('products-inventory').find('td').eq(0).should('contain', name);
  cy.$('products-inventory').find('td').eq(1).should('contain', price);
  cy.$('products-inventory').find('td').eq(2).should('contain', quantity);
});

Cypress.Commands.add('registerProduct', (name, price, quantity) => {
  cy.$('product-name-input').type(name);
  cy.$('product-price-input').type(price);
  cy.$('product-quantity-input').type(quantity);
  cy.$('product-add-button').click();
});

Cypress.Commands.add('clearInputs', () => {
  cy.$('product-name-input').clear();
  cy.$('product-price-input').clear();
  cy.$('product-quantity-input').clear();
});

describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('상품 관리', () => {
    describe('상품명, 금액, 수량의 유효성 검사를 테스트한다.', () => {
      it('최초 상품 목록은 비워진 상태이다.', () => {
        expect(cy.$('products-inventory').find('tbody').children().should('have.length', 0));
      });

      it('상품명, 금액, 수량 input이 존재한다.', () => {
        cy.$('product-name-input').should('exist');
        cy.$('product-price-input').should('exist');
        cy.$('product-quantity-input').should('exist');
        cy.$('product-add-button').should('exist');
      });

      it('상품명은 공백이면 alert을 띄운다.', () => {
        cy.registerProduct(' ', '1000', '5');
      });

      it('가격은 공백이면 alert을 띄운다.', () => {
        cy.registerProduct('콜라', ' ', '5');
        cy.doAlert(ERROR_MESSAGES.PRICE_SHOULD_NOT_EMPTY);
      });

      it('수량이 공백이면 alert을 띄운다.', () => {
        cy.registerProduct('콜라', '1000', ' ');
        cy.doAlert(ERROR_MESSAGES.QUANTITY_SHOULD_NOT_EMPTY);
      });

      it('최소 가격보다 입력한 가격이 적으면 alert을 띄운다.', () => {
        cy.registerProduct('콜라', '10', '5');
        cy.doAlert(ERROR_MESSAGES.TOO_SMALL_PRICE);
      });

      it('최소 수량보다 입력한 수량이 적으면 alert을 띄운다.', () => {
        cy.registerProduct('콜라', '1000', '0');
        cy.doAlert(ERROR_MESSAGES.TOO_SMALL_QUANTITY);
      });

      it('상품의 가격이 10으로 나누어떨어지지 않으면 alert을 띄운다.', () => {
        cy.registerProduct('콜라', '777', '5');
        cy.doAlert(ERROR_MESSAGES.NOT_DIVISIBLE_PRICE);
      });
    });

    describe('상품 추가를 테스트한다.', () => {
      const name = '콜라';
      const price = '1000';
      const quantity = 5;

      beforeEach(() => {
        cy.registerProduct(name, price, quantity);
      });

      it('올바른 상품을 입력하면 추가된 상품에 입력한 상품이 추가된다.', () => {
        cy.containProduct(name, price, quantity);
      });

      it('기존의 상품은 새로운 상품으로 대체된다.', () => {
        cy.clearInputs();
        const newPrice = '2000';
        const newQuantity = 10;
        cy.registerProduct(name, newPrice, newQuantity);

        expect(cy.$('products-inventory').find('td').should('have.length', 3));
        cy.containProduct(name, newPrice, newQuantity);
      });

      it('탭을 이동해도 기존에 입력했던 상품들이 보인다.', () => {
        cy.get('#purchase-product').click();
        cy.get('#manage-products').click();

        cy.containProduct(name, price, quantity);
      });
    });
  });
});
