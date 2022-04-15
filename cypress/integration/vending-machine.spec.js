import { ERRORS } from '../../src/js/constants.js';

const typeProduct = ({ name, price, quantity }) => {
  cy.get('#product-name-input').type(name);
  cy.get('#product-price-input').type(price);
  cy.get('#product-quantity-input').type(quantity);
};

context('자판기 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('최초 렌더링 시에, localStorage에 상품목록이 없다면 최초 상품 목록은 비워진 상태이다.', () => {
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem('ns-vending-machine')).to.be.null;
    });
    cy.get('#product-inventory-container').children().should('have.length', 0);
  });

  it('상품을 추가하지 못하는 경우', () => {
    context('상품명, 금액, 수량은 공백이 불가능하다.', () => {
      typeProduct({ name: '', price: '', quantity: '' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 0);
    });

    context('상품의 최소 수량은 1개여야 한다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '0' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 0);
    });

    context('상품 가격이 10원으로 나누어 떨어지지 않는 경우 경고창 발생', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      typeProduct({ name: '테스트 상품', price: '10000', quantity: '111' });
      cy.get('#product-add-button').click();

      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERRORS.PRICE_UNIT);
      cy.get('#product-inventory-container').children().should('have.length', 0);
    });
  });

  it('상품이 정상적으로 등록된 경우', () => {
    context('상품명, 금액, 수량을 정상 입력한 경우 상품이름, 가격, 수량 순으로 보여진다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-container table.product-inventory tbody > tr')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
    });

    context('상품이 등록된 후, 입력창은 초기화 된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-container table.product-inventory tbody > tr')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
      cy.get('#product-name-input').should('have.value', '');
      cy.get('#product-price-input').should('have.value', '');
      cy.get('#product-quantity-input').should('have.value', '');
    });

    context('중복되는 상품이름을 추가하는 경우 덮어쓰기 된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      typeProduct({ name: '테스트 상품', price: '20000', quantity: '10' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-container table.product-inventory tbody > tr')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('20000');
          cy.get('td').eq(2).contains('10');
        });
    });

    context('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-container table.product-inventory tbody > tr')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });

      cy.get('#vending-machine-manage-menu').click();
      cy.get('#product-manage-menu').click();
      cy.get('#product-container table.product-inventory tbody > tr')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
    });
  });
});
