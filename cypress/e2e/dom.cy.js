import { ALERT_MESSAGE } from '../../src/js/service/constant';
import { ELEMENT } from '../../src/js/ui/element';
import { removeSpace } from '../../src/js/util/string';

/* eslint-disable no-undef */
describe('자판기 요구사항을 점검한다', () => {
  const URL = '../../index.html';

  beforeEach(() => {
    cy.visit(URL);
  });

  const getAlertStub = () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    return alertStub;
  };

  describe('상품관리 요구사항을 점검한다', () => {
    it('상품명에 공백을 입력할 수 없다', () => {
      const productName = '코카 콜라 250ml';

      cy.get(ELEMENT.INPUT.PRODUCT_NAME).type(productName);
      cy.get(ELEMENT.INPUT.PRODUCT_PRICE).type(1250);
      cy.get(ELEMENT.INPUT.PRODUCT_AMOUNT).type(100);
      cy.get(ELEMENT.BUTTON.PRODUCT_ADD).click();

      cy.get(ELEMENT.TABLE.VENDING_MACHINE_PRODUCT_TBODY).contains(removeSpace(productName));
    });

    it('상품의 최소 수량이 1개 미만일 경우 상품을 등록할 수 없다', () => {
      const alertStub = getAlertStub();

      cy.get(ELEMENT.INPUT.PRODUCT_NAME).type('코카콜라250ml');
      cy.get(ELEMENT.INPUT.PRODUCT_PRICE).type(1250);
      [0, -1, -1999].forEach((amount) => {
        cy.get(ELEMENT.INPUT.PRODUCT_AMOUNT).type(amount);
        cy.get(ELEMENT.BUTTON.PRODUCT_ADD)
          .click()
          .then(() => {
            const message = alertStub.getCall(0).lastArg;
            expect(message).to.equal(ALERT_MESSAGE.VALIDATION.PRODUCT.AMOUNT);
          });
      });
    });

    it('상품의 최소 가격이 100원 미만이거나 10원으로 나누어떨어지지 않으면 상품을 등록할 수 없다', () => {
      const alertStub = getAlertStub();

      cy.get(ELEMENT.INPUT.PRODUCT_NAME).type('코카콜라250ml');
      cy.get(ELEMENT.INPUT.PRODUCT_AMOUNT).type(10);
      [1255, 1233, 2299].forEach((price) => {
        cy.get(ELEMENT.INPUT.PRODUCT_PRICE).type(price);
        cy.get(ELEMENT.BUTTON.PRODUCT_ADD)
          .click()
          .then(() => {
            const message = alertStub.getCall(0).lastArg;
            expect(message).to.equal(ALERT_MESSAGE.VALIDATION.PRODUCT.PRICE);
          });
      });
    });

    const INPUTS = [ELEMENT.INPUT.PRODUCT_NAME, ELEMENT.INPUT.PRODUCT_PRICE, ELEMENT.INPUT.PRODUCT_AMOUNT];
    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다', () => {
      const productName = '코카콜라제로250ml';
      const oldProduct = [productName, 1250, 10];
      const newProduct = [productName, 1390, 30];

      INPUTS.forEach((input, index) => cy.get(input).type(oldProduct[index]));
      cy.get(ELEMENT.BUTTON.PRODUCT_ADD).click();
      INPUTS.forEach((input, index) => cy.get(input).type(newProduct[index]));
      cy.get(ELEMENT.BUTTON.PRODUCT_ADD).click();

      newProduct.forEach((keyword) => {
        cy.get(ELEMENT.TABLE.VENDING_MACHINE_PRODUCT_TBODY).contains(keyword);
      });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다', () => {
      const productInput = ['나랑드사이다2L', 1120, 100];
      INPUTS.forEach((input, index) => cy.get(input).type(productInput[index]));
      cy.get(ELEMENT.BUTTON.PRODUCT_ADD).click();

      cy.get(ELEMENT.TAB_BUTTON.MANAGING_CHARGE).click();
      cy.get(ELEMENT.TAB_BUTTON.MANAGING_PRODUCT).click();

      productInput.forEach((keyword) => {
        cy.get(ELEMENT.TABLE.VENDING_MACHINE_PRODUCT_TBODY).contains(keyword);
      });
    });
  });
});
