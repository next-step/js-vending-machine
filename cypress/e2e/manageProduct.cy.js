import ERROR_MESSAGES from '../../src/js/constants/errorMessages';

Cypress.Commands.add('containProduct', ({ name, price, quantity }) => {
  const priceWithComma = Number(price).toLocaleString('ko-KR');
  const quantityWithComma = Number(quantity).toLocaleString('ko-KR');
  cy.$('products-inventory').find('td').eq(0).should('contain', name);
  cy.$('products-inventory').find('td').eq(1).should('contain', priceWithComma);
  cy.$('products-inventory').find('td').eq(2).should('contain', quantityWithComma);
});

Cypress.Commands.add('clearInputs', () => {
  cy.$('product-name-input').clear();
  cy.$('product-price-input').clear();
  cy.$('product-quantity-input').clear();
});

describe('자판기 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#manage-product-menu').click();
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
        cy.registerProduct({ name: ' ', price: '1000', quantity: '5' });
      });

      it('가격은 공백이면 alert을 띄운다.', () => {
        cy.registerProduct({ name: '콜라', price: ' ', quantity: '5' });
        cy.doAlert(ERROR_MESSAGES.PRICE_SHOULD_NOT_EMPTY);
      });

      it('수량이 공백이면 alert을 띄운다.', () => {
        cy.registerProduct({ name: '콜라', price: '1000', quantity: ' ' });
        cy.doAlert(ERROR_MESSAGES.QUANTITY_SHOULD_NOT_EMPTY);
      });

      it('최소 가격보다 입력한 가격이 적으면 alert을 띄운다.', () => {
        cy.registerProduct({ name: '콜라', price: '10', quantity: '5' });
        cy.doAlert(ERROR_MESSAGES.TOO_SMALL_PRICE);
      });

      it('최소 수량보다 입력한 수량이 적으면 alert을 띄운다.', () => {
        cy.registerProduct({ name: '콜라', price: '1000', quantity: '0' });
        cy.doAlert(ERROR_MESSAGES.TOO_SMALL_QUANTITY);
      });

      it('상품의 가격이 10으로 나누어떨어지지 않으면 alert을 띄운다.', () => {
        cy.registerProduct({ name: '콜라', price: '777', quantity: '5' });
        cy.doAlert(ERROR_MESSAGES.NOT_DIVISIBLE_PRICE);
      });
    });

    describe('상품 추가를 테스트한다.', () => {
      const product = {
        name: '콜라',
        price: '1000',
        quantity: 5,
      };

      beforeEach(() => {
        cy.registerProduct(product);
      });

      it('올바른 상품을 입력하면 추가된 상품에 입력한 상품이 추가된다.', () => {
        cy.containProduct(product);
      });

      it('기존의 상품은 새로운 상품으로 대체된다.', () => {
        cy.clearInputs();
        const newPrice = '2000';
        const newQuantity = 10;
        cy.registerProduct({ name: '콜라', price: newPrice, quantity: newQuantity });

        expect(cy.$('products-inventory').find('td').should('have.length', 3));
        cy.containProduct({ name: '콜라', price: newPrice, quantity: newQuantity });
      });

      it('탭을 이동해도 기존에 입력했던 상품들이 보인다.', () => {
        cy.get('#product-purchase-menu').click();
        cy.get('#manage-product-menu').click();

        cy.containProduct(product);
      });
    });
  });
});
