import {
  EMPTY_PRODUCT_NAME,
  EMPTY_PRODUCT_NUMBER,
  EMPTY_PRODUCT_PRICE,
  INVALID_PRODUCT_NUMBER_MINIMUM,
  INVALID_PRODUCT_PRICE,
  INVALID_PRODUCT_PRICE_MINIMUM,
} from '../../src/js/constants.js';

const BASE_URL = '../../index.html';

const addProduct = (name, price, number, clickEvent) => {
  cy.get('#product-name-input').type(name);
  cy.get('#product-price-input').type(price);
  cy.get('#product-quantity-input').type(number);
  cy.get('#product-add-button')
    .click()
    .then(() => clickEvent);
};

const showProductList = (row, name, price, number) => {
  cy.get('#product-inventory-container')
    .eq(row)
    .within(() => {
      cy.get('td').eq(0).contains(name);
      cy.get('td').eq(1).contains(price);
      cy.get('td').eq(2).contains(number);
    });
};

const showProductListLength = (row) => {
  cy.get('#product-inventory-container').children().should('have.length', row);
};

describe('상품 관리 - 상품 추가하기', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  context('상품 추가하기 유효성 검사', () => {
    it('상품 추가하기했을때, 상품명이 비어 있으면 경고창을 보여준다', () => {
      addProduct(' ', 3000, 2, () =>
        expect(alertStub).to.be.calledWith(EMPTY_PRODUCT_NAME)
      );
    });
    it('상품 추가하기했을때, 가격이 비어 있으면 경고창을 보여준다', () => {
      addProduct('apple', Number(''), 2, () =>
        expect(alertStub).to.be.calledWith(EMPTY_PRODUCT_PRICE)
      );
    });
    it('상품 추가하기했을때, 수량이 비어 있으면 경고창을 보여준다', () => {
      addProduct('apple', 5, Number(''), () =>
        expect(alertStub).to.be.calledWith(EMPTY_PRODUCT_NUMBER)
      );
    });

    it('상품의 수량은 최소 1개가 되지 않으면, 경고창을 보여준다.', () => {
      addProduct('apple', 300, 0, () =>
        expect(alertStub).to.be.calledWith(INVALID_PRODUCT_NUMBER_MINIMUM)
      );
    });
    it('상품의 가격은 최소 100원이 되지 않으면, 경고창을 보여준다.', () => {
      addProduct('apple', 50, 5, () =>
        expect(alertStub).to.be.calledWith(INVALID_PRODUCT_PRICE_MINIMUM)
      );
    });
    it('상품의 가격이 10원으로 나누어 떨어지지 않으면, 경고창을 보여준다.', () => {
      addProduct('apple', 365, 5, () =>
        expect(alertStub).to.be.calledWith(INVALID_PRODUCT_PRICE)
      );
    });
  }),
    context('자판기 유저 플로우 테스트', () => {
      it('처음 화면에 진입했을때, 상품 추가하기 화면을 볼 수 있습니다.', () => {
        cy.get('#add-product-section').each((addProductSection) => {
          expect(addProductSection).to.be.visible;
        });
      });
      it('처음 화면에 진입했을떄, 상품 목록은 비워진 상태입니다.', () => {
        showProductListLength(0);
      });

      it('사용자는 추가한 상품을 확인할 수 있다.', () => {
        addProduct('apple', 500, 5);
        showProductListLength(1);
        showProductList(0, 'apple', 500, 5);
      });
      it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체한다.', () => {
        addProduct('apple', 500, 5);
        addProduct('apple', 1000, 10);

        showProductListLength(1);
        showProductList(0, 'apple', 1000, 10);
      });
      it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
        addProduct('apple', 500, 5);

        cy.get('#vending-machine-manage-menu').click();
        cy.get('#product-manage-menu').click();

        showProductList(0, 'apple', 500, 5);
      });
    });
});
