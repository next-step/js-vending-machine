import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from '../../src/js/service/constant';
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

  describe('잔돈 충전 요구사항을 점검한다', () => {
    const UNITS = VENDING_MACHINE_CONSTANT.CHANGES.UNITS;
    const MONEY_UNIT = VENDING_MACHINE_CONSTANT.MONEY_UNIT;
    const COINS_POSTFIX = VENDING_MACHINE_CONSTANT.COINS_POSTFIX;

    beforeEach(() => {
      cy.get(ELEMENT.TAB_BUTTON.MANAGING_CHARGE).click();
    });

    const validateChanges = (amount, changes = [0, 0, 0, 0]) => {
      cy.get(ELEMENT.SPAN.CHARGE_AMOUNT).should('have.text', amount);
      UNITS.forEach((unit, index) => {
        cy.get(`${ELEMENT.TABLE.VENDING_MACHINE_CHARGE_AMOUNT} > tr:nth-child(${index + 1}) > td:first-child`).contains(
          unit + MONEY_UNIT
        );
        cy.get(
          `${ELEMENT.TABLE.VENDING_MACHINE_CHARGE_AMOUNT} > tr:nth-child(${index + 1}) > td:nth-child(2)`
        ).contains(changes[index] + COINS_POSTFIX);
      });
    };

    it('잔돈 충전 탭에서 450원을 입력하면 100원X4개, 50원X1개의 동전이 충전된다', () => {
      const amount = 450;
      const unitsAbout450 = [0, 4, 1, 0];

      cy.get(ELEMENT.INPUT.CHARGE_AMOUNT).type(amount);
      cy.get(ELEMENT.BUTTON.CHARGE_AMOUNT).click();

      validateChanges(amount, unitsAbout450);
    });

    it('잔돈이 올바르게 누적되는지 점검한다', () => {
      const first = { amount: 450, accumulatedAmount: 450, accumulatedChanges: [0, 4, 1, 0] };
      const second = { amount: 200, accumulatedAmount: 650, accumulatedChanges: [0, 6, 1, 0] };

      const cases = [first, second];
      cases.forEach(({ amount, accumulatedAmount, accumulatedChanges }) => {
        cy.get(ELEMENT.INPUT.CHARGE_AMOUNT).type(amount);
        cy.get(ELEMENT.BUTTON.CHARGE_AMOUNT).click();
        validateChanges(accumulatedAmount, accumulatedChanges);
      });
    });

    it('잔돈 충전 후 다른 탭을 클릭하더라도 자판기가 보유한 금액은 유지되어야 한다', () => {
      const amount = 450;
      const unitsAbout450 = [0, 4, 1, 0];

      cy.get(ELEMENT.INPUT.CHARGE_AMOUNT).type(amount);
      cy.get(ELEMENT.BUTTON.CHARGE_AMOUNT).click();

      cy.get(ELEMENT.TAB_BUTTON.MANAGING_PRODUCT).click();
      cy.get(ELEMENT.TAB_BUTTON.MANAGING_CHARGE).click();

      validateChanges(amount, unitsAbout450);
    });
  });
});
