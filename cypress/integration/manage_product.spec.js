const { test$ } = require('../../src/js/utils/utils.js');
const { ERROR_MESSAGE } = require('../../src/js/constants/index.js');
const { checkError } = require('../support/utils.js');

before(() => {
  cy.visit('http://127.0.0.1:8080');
});

describe('새로운 제품 추가', () => {
  describe('...', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    describe('잘못된 이름', () => {
      it('자동차 이름 아무것도 입력하지 않은 경우 에러', () => {
        checkError(ERROR_MESSAGE.NONE_NAME);
        cy.typeNewProductFormAndSubmit(['', 1000, 10]);
        cy.clearNewProductForm();
      });

      it('이름이 10글자를 넘는 경우 에러', () => {
        checkError(ERROR_MESSAGE.MAX_LENGTH_NAME);
        cy.typeNewProductFormAndSubmit(['01234567890', 1000, 10]);
        cy.clearNewProductForm();
      });
    });

    describe('잘못된 가격', () => {
      it('가격을 입력하지 않은 경우 에러', () => {
        checkError(ERROR_MESSAGE.NONE_PRICE);
        cy.typeNewProductFormAndSubmit(['박카스', '', 10]);
        cy.clearNewProductForm();
      });

      it('가격이 10으로 나누어 떨어지지 않는 경우 에러', () => {
        checkError(ERROR_MESSAGE.DIVISION_BY_TEN);
        cy.typeNewProductFormAndSubmit(['박카스', 123124, 10]);
        cy.clearNewProductForm();
      });

      it('가격이 100원 보다 아래인 경우 에러', () => {
        checkError(ERROR_MESSAGE.MIN_PRICE);
        cy.typeNewProductFormAndSubmit(['박카스', 99, 10]);
        cy.clearNewProductForm();
      });

      it('가격이 1000만원 초과되는 경우 에러', () => {
        checkError(ERROR_MESSAGE.MAX_PRICE);
        cy.typeNewProductFormAndSubmit(['박카스', 10000001, 10]);
        cy.clearNewProductForm();
      });
    });

    describe('잘못된 수량', () => {
      it('수량 입력하지 않으면 에러', () => {
        checkError(ERROR_MESSAGE.NONE_QUANTITY);
        cy.typeNewProductFormAndSubmit(['박카스', 1000, '']);
        cy.clearNewProductForm();
      });

      it('수량이 1개 보다 작은 경우 에러', () => {
        checkError(ERROR_MESSAGE.MIN_QUANTITY);
        cy.typeNewProductFormAndSubmit(['박카스', 1000, 0]);
        cy.clearNewProductForm();
      });

      it('수량이 999개 초과하는 경우 에러', () => {
        checkError(ERROR_MESSAGE.MAX_QUANTITY);
        cy.typeNewProductFormAndSubmit(['박카스', 1000, 1000]);
        cy.clearNewProductForm();
      });
    });

    describe('정상적으로 새로운 상품 추가 ', () => {
      const validProduct1 = ['몬스터', 2000, 10];
      const validProduct2 = ['박카스', 2000, 30];

      it('정상적인 입력으로 새로운 상품 추가', () => {
        const products = [...validProduct1, ...validProduct2];

        cy.typeNewProductFormAndSubmit(validProduct1);
        cy.clearNewProductForm();

        cy.typeNewProductFormAndSubmit(validProduct2);
        cy.clearNewProductForm();

        cy.checkProductItem(products);
      });

      it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체', () => {
        const existProduct = ['몬스터', 2500, 5];
        const products = [...existProduct, ...validProduct2];

        cy.typeNewProductFormAndSubmit(existProduct);
        cy.checkProductItem(products);
        cy.clearNewProductForm();

        cy.checkProductItem(products);
      });
    });
  });
});
