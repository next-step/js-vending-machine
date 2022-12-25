import { ALERT_MESSAGE, VENDING_MACHINE_CONSTANT } from '../../src/js/service/constant';
import { SELECTOR_MAP } from '../../src/js/ui/selector.js';
import { removeSpace } from '../../src/js/util/string.js';
// https://www.thisdot.co/blog/testing-web-components-with-cypress-and-typescript

// prettier-ignore
const {
    UNITS,
  } = VENDING_MACHINE_CONSTANT.UNIT_INFO;
const { MONEY_UNIT, AMOUNT_POSTFIX } = VENDING_MACHINE_CONSTANT;

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

  const shadowDOMShouldCallback = (elementId, callback) => {
    cy.get(elementId).shadow().find('tbody').should(callback);
  };

  const containsTextInShadows = (elementId, shouldBeContainedText) => {
    shadowDOMShouldCallback(elementId, (elements) => {
      const [tbody] = elements.get();
      expect(tbody.textContent).to.contains(shouldBeContainedText);
    });
  };

  const containsTextInShadowsInnerTBody = (selector, innerSelector, shouldBeContainedText) => {
    shadowDOMShouldCallback(selector, (elements) => {
      const [tbody] = elements;
      expect(tbody.querySelector(innerSelector).textContent).to.contains(shouldBeContainedText);
    });
  };

  const purchaseItem = (itemIndex, amount) => {
    shadowDOMShouldCallback(SELECTOR_MAP.TABLE.VENDING_MACHINE_PURCHASABLE_PRODUCT, (elements) => {
      const [tbody] = elements.get();
      const button = tbody.querySelectorAll('button')[itemIndex];

      if (!button) throw new Error('itemIndex 잘못 입력했음.');

      Array.from({ length: amount }).forEach(() => button.click());
    });
  };

  const validateChanges = (selector, changes = [0, 0, 0, 0]) => {
    // cy.get(selector).should('have.text', amount);

    UNITS.forEach((unit, index) => {
      containsTextInShadowsInnerTBody(
        selector,
        `tr:nth-child(${index + 1}) > td:first-child`,
        String(unit) + MONEY_UNIT
      );

      containsTextInShadowsInnerTBody(
        selector,
        `tr:nth-child(${index + 1}) > td:nth-child(2)`,
        String(changes[index]) + AMOUNT_POSTFIX
      );
    });
  };

  describe('상품관리 요구사항을 점검한다', () => {
    it('상품명에 공백을 입력할 수 없다', () => {
      const productName = '코카 콜라 250ml';

      cy.get(SELECTOR_MAP.INPUT.PRODUCT_NAME).type(productName);
      cy.get(SELECTOR_MAP.INPUT.PRODUCT_PRICE).type(1250);
      cy.get(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT).type(100);
      cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click();

      containsTextInShadows(SELECTOR_MAP.TABLE.VENDING_MACHINE_PRODUCT, removeSpace(productName));
    });

    it('상품의 최소 수량이 1개 미만일 경우 상품을 등록할 수 없다', () => {
      const alertStub = getAlertStub();

      cy.get(SELECTOR_MAP.INPUT.PRODUCT_NAME).type('코카콜라250ml');
      cy.get(SELECTOR_MAP.INPUT.PRODUCT_PRICE).type(1250);
      [0, -1, -1999].forEach((amount) => {
        cy.get(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT).type(amount);
        cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD)
          .click()
          .then(() => {
            const message = alertStub.getCall(0).lastArg;
            expect(message).to.equal(ALERT_MESSAGE.VALIDATION.PRODUCT.AMOUNT);
          });
      });
    });

    it('상품의 최소 가격이 100원 미만이거나 10원으로 나누어떨어지지 않으면 상품을 등록할 수 없다', () => {
      const alertStub = getAlertStub();

      cy.get(SELECTOR_MAP.INPUT.PRODUCT_NAME).type('코카콜라250ml');
      cy.get(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT).type(10);
      [1255, 1233, 2299].forEach((price) => {
        cy.get(SELECTOR_MAP.INPUT.PRODUCT_PRICE).type(price);
        cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD)
          .click()
          .then(() => {
            const message = alertStub.getCall(0).lastArg;
            expect(message).to.equal(ALERT_MESSAGE.VALIDATION.PRODUCT.PRICE);
          });
      });
    });

    const INPUTS = [
      SELECTOR_MAP.INPUT.PRODUCT_NAME,
      SELECTOR_MAP.INPUT.PRODUCT_PRICE,
      SELECTOR_MAP.INPUT.PRODUCT_AMOUNT,
    ];

    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다', () => {
      const productName = '코카콜라제로250ml';
      const oldProduct = [productName, 1250, 10];
      const newProduct = [productName, 1390, 30];

      INPUTS.forEach((input, index) => cy.get(input).type(oldProduct[index]));
      cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click();
      INPUTS.forEach((input, index) => cy.get(input).type(newProduct[index]));
      cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click();

      newProduct.forEach((keyword) => {
        containsTextInShadows(SELECTOR_MAP.TABLE.VENDING_MACHINE_PRODUCT, keyword);
      });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다', () => {
      const productInput = ['나랑드사이다2L', 1120, 100];
      INPUTS.forEach((input, index) => cy.get(input).type(productInput[index]));
      cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click();

      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_CHARGE).click();
      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_PRODUCT).click();

      productInput.forEach((keyword) => {
        containsTextInShadows(SELECTOR_MAP.TABLE.VENDING_MACHINE_PRODUCT, keyword);
      });
    });
  });

  describe('잔돈 충전 요구사항을 점검한다', () => {
    beforeEach(() => {
      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_CHARGE).click();
    });

    it('잔돈 충전 탭에서 450원을 입력하면 100원X4개, 50원X1개의 동전이 충전된다', () => {
      const amount = 450;
      const unitsAbout450 = [0, 4, 1, 0];

      cy.get(SELECTOR_MAP.INPUT.CHARGE_AMOUNT).type(amount);
      cy.get(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT).click();

      cy.get(SELECTOR_MAP.SPAN.CHARGE_AMOUNT).should('have.text', amount);
      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT, unitsAbout450);
    });

    it('잔돈이 올바르게 누적되는지 점검한다', () => {
      const first = { amount: 450, accumulatedAmount: 450, accumulatedChanges: [0, 4, 1, 0] };
      const second = { amount: 200, accumulatedAmount: 650, accumulatedChanges: [0, 6, 1, 0] };

      const cases = [first, second];
      cases.forEach(({ amount, accumulatedAmount, accumulatedChanges }) => {
        cy.get(SELECTOR_MAP.INPUT.CHARGE_AMOUNT).type(amount);
        cy.get(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT).click();
        cy.get(SELECTOR_MAP.SPAN.CHARGE_AMOUNT).should('have.text', accumulatedAmount);
        validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT, accumulatedChanges);
      });
    });

    it('잔돈 충전 후 다른 탭을 클릭하더라도 자판기가 보유한 금액은 유지되어야 한다', () => {
      const amount = 450;
      const unitsAbout450 = [0, 4, 1, 0];

      cy.get(SELECTOR_MAP.INPUT.CHARGE_AMOUNT).type(amount);
      cy.get(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT).click();

      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_PRODUCT).click();

      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_CHARGE).click();

      cy.get(SELECTOR_MAP.SPAN.CHARGE_AMOUNT).should('have.text', amount);
      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT, unitsAbout450);
    });
  });

  describe('상품 구매 요구사항을 점검한다', () => {
    const addItems = () => {
      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_PRODUCT).click();

      const items = [
        { name: '코카콜라 250ml 제로 인상된 가격', price: 1800, amount: 20 },
        { name: '컴포즈커피 아이스 아메리카노', price: 1500, amount: 10 },
        { name: '스타벅스 카페라떼 350ml', price: 3800, amount: 38 },
        { name: '1개남은 제품', price: 1000, amount: 1 },
      ];

      items.forEach(({ name, price, amount }) => {
        cy.get(SELECTOR_MAP.INPUT.PRODUCT_NAME).type(name);
        cy.get(SELECTOR_MAP.INPUT.PRODUCT_PRICE).type(price);
        cy.get(SELECTOR_MAP.INPUT.PRODUCT_AMOUNT).type(amount);
        cy.get(SELECTOR_MAP.BUTTON.PRODUCT_ADD).click();
      });
    };

    const insertCoins = (amount) => {
      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_CHARGE).click();

      cy.get(SELECTOR_MAP.INPUT.CHARGE_AMOUNT).type(amount);
      cy.get(SELECTOR_MAP.BUTTON.CHARGE_AMOUNT).click();
    };

    const insertSpendingMoney = (amount) => {
      cy.get(SELECTOR_MAP.TAB_BUTTON.PURCHASING_PRODUCT).click();

      cy.get(SELECTOR_MAP.INPUT.SPENDING_MONEY_INPUT).type(amount);
      cy.get(SELECTOR_MAP.BUTTON.INSERTION_FOR_MONEY).click();
    };

    beforeEach(() => {
      addItems();
      insertCoins(2260); // [4,2,1,1]
    });

    it('최소 개수의 동전으로 잔돈을 반환해야 한다', () => {
      insertSpendingMoney(1810);
      purchaseItem(0, 1);

      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();

      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_RETURN_CHANGES, [0, 0, 0, 1]);
    });

    it('모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다', () => {
      // 예) 자판기가 보유한 동전 500원 2개인 상태이고, 800원을 거슬러줘야 한다면 500원 1개만 반환한다. 나머지 300원에 해당하는 금액은 반환하지 않는다.
      insertSpendingMoney(3820);
      purchaseItem(2, 1);

      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();

      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_RETURN_CHANGES, [0, 0, 0, 1]);
    });

    it('반환한 동전만큼 사용자가 충전한 금액이 차감되어야 한다', () => {
      insertSpendingMoney(3820);
      purchaseItem(2, 1);

      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();

      // 3820 - 3800 = 20 => 자판기에 50원 1개, 10원 1개라서 10원 1개만 반환
      cy.get(SELECTOR_MAP.SPAN.SPENDING_AMOUNT).should('have.text', 10);
    });

    it('반환한 동전만큼 자판기가 보유하고 있는 동전도 차감되어야 한다', () => {
      insertSpendingMoney(3820);
      purchaseItem(2, 1);

      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();

      cy.get(SELECTOR_MAP.TAB_BUTTON.MANAGING_CHARGE).click();
      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_CHARGE_AMOUNT, [4, 2, 1, 0]);
    });

    it('재고가 0인 경우 구매할 수 없다', () => {
      const alertStub = getAlertStub();
      const elementId = SELECTOR_MAP.TABLE.VENDING_MACHINE_PURCHASABLE_PRODUCT;
      const itemIndex = 3;
      insertSpendingMoney(10000);

      purchaseItem(itemIndex, 1);

      cy.get(elementId)
        .shadow()
        .find('tbody button')
        .eq(itemIndex)
        .click()
        .then(() => {
          const message = alertStub.getCall(0).lastArg;
          expect(message).to.equal(ALERT_MESSAGE.SOLD_OUT);
        });
    });

    it('투입된 금액의 잔여금액이 해당 상품 가격보다 낮을 경우 구매할 수 없다', () => {
      const alertStub = getAlertStub();
      const elementId = SELECTOR_MAP.TABLE.VENDING_MACHINE_PURCHASABLE_PRODUCT;
      const itemIndex = 0;
      insertSpendingMoney(1000);

      cy.get(elementId)
        .shadow()
        .find('tbody button')
        .eq(itemIndex)
        .click()
        .then(() => {
          const message = alertStub.getCall(0).lastArg;
          expect(message).to.equal(ALERT_MESSAGE.NOT_ENOUGH_SPENDING_MONEY);
        });
    });

    it.only('반환한 동전의 결과는 누적되지 않는다', () => {
      // 반환하기 버튼을 눌러 나타나는 표에 나온 개수 항목이 계속해서 누적되는 것이 아니라는 의미인 듯

      insertSpendingMoney(3820);
      purchaseItem(2, 1);

      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();
      cy.get(SELECTOR_MAP.BUTTON.RETURN_CHANGES_BUTTON).click();

      validateChanges(SELECTOR_MAP.TABLE.VENDING_MACHINE_RETURN_CHANGES, [0, 0, 0, 0]);
    });
  });
});
