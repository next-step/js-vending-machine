import { ERROR_MESSAGE, SELECTOR } from '../../src/constants.js';

describe('상품 추가하기 탭 관련 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).click();
  });

  context('상품명이 알맞게 입력되어야 합니다.', () => {
    it('상품명은 필수값 입니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.REQUIRED_PRODUCT_NAME);
        });
    });
  });

  context('상품 가격이 알맞게 입력되어야 합니다.', () => {
    it('상품 가격은 필수값 입니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.REQUIRED_PRODUCT_PRICE);
        });
    });

    it('상품 가격은 100이상 정수여야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(10);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_OVER_100,
          );
        });
    });

    it('상품 가격은 10으로 나누어 떨어져야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('apple');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(999);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(5);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGE.PRODUCT_PRICE_HAVE_TO_DIVIDED_BY_10,
          );
        });
    });
  });

  context('상품 수량이 알맞게 입력되어야 합니다.', () => {
    it('상품 수량은 필수값 입니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hi');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.REQUIRED_PRODUCT_QUANTITY);
        });
    });

    it('상품 수량은 1이상 정수여야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).type('hi');
      cy.get(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).type(1000);
      cy.get(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).type(-1);
      cy.get(`#${SELECTOR.PRODUCT_ADD_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            ERROR_MESSAGE.PRODUCT_QUANTITY_HAVE_TO_OVER_1,
          );
        });
    });
  });
});
