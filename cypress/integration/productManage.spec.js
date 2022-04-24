import { ERROR_MESSAGE, SELECTOR, STANDARD } from '../../src/constants.js';

describe('상품 추가하기 탭 관련 테스트', () => {
  beforeEach(() => cy.visit('/'));

  context('상품명이 알맞게 입력되어야 합니다.', () => {
    it('상품명은 필수값 입니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
    });
  });

  context('상품 가격이 알맞게 입력되어야 합니다.', () => {
    it('상품 가격은 필수값 입니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.REQUIRED_PRODUCT_PRICE);
    });

    it(`상품 가격은 ${STANDARD.PRODUCT_PRICE_MINIMUM}이상 정수여야 합니다.`, () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(10);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_OVER_100);
    });

    it(`상품 가격은 ${STANDARD.PRODUCT_PRICE_DIVIDE_BY}으로 나누어 떨어져야 합니다.`, () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(999);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10);
    });
  });

  context('상품 수량이 알맞게 입력되어야 합니다.', () => {
    it('상품 수량은 필수값 입니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hi');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.REQUIRED_PRODUCT_QUANTITY);
    });

    it(`상품 수량은 ${STANDARD.PRODUCT_QUANTITY_MINIMUM}이상 정수여야 합니다.`, () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hi');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(-1);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.expectAlertWithMessage(ERROR_MESSAGE.PRODUCT_QUANTITY_HAVE_TO_OVER_1);
    });
  });

  context('상품 추가가 잘 되어야 합니다.', () => {
    it('모든 데이터가 잘 입력되었다면 테이블에 상품이 추가됩니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hello');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.PRODUCT_INVENTORY_CONTAINER_ID}`)
        .first()
        .children()
        .children()
        .each((el, index) => {
          if (index === 0) expect(el).to.have.text('hello');
          if (index === 1) expect(el).to.have.text(1000);
          if (index === 2) expect(el).to.have.text(5);
        });
    });

    it('기존에 존재하던 상품이 추가되면 내용을 덮어씌웁니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hello');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hello');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(10000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(50);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.PRODUCT_INVENTORY_CONTAINER_ID}`)
        .first()
        .children()
        .children()
        .each((el, index) => {
          if (index === 0) expect(el).to.have.text('hello');
          if (index === 1) expect(el).to.have.text(10000);
          if (index === 2) expect(el).to.have.text(50);
        });
    });
  });
});
