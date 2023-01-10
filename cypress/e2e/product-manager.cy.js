import {
  PRODUCT_ADD_BUTTON_SELECTOR,
  PRODUCT_INVENTORY_CONTAINER_SELECTOR,
  PRODUCT_INVENTORY_SELECTOR,
  PRODUCT_MANAGER_FORM_SELECTOR,
  PRODUCT_NAME_INPUT_SELECTOR,
  PRODUCT_PRICE_INPUT_SELECTOR,
  PRODUCT_QUANTITY_INPUT_SELECTOR,
} from "../support/selectors.js";
import { ERROR_MESSAGE } from "../support/constants.js";

describe("상품관리 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("상품을 관리할 수 있는 화면이 존재한다.", () => {
    it("상품 추가할 수 있는 영역이 존재한다", () => {
      cy.get(PRODUCT_MANAGER_FORM_SELECTOR).should("exist");
    });
    it("상품 현황을 파악할 수 있는 영역이 존재한다", () => {
      cy.get(PRODUCT_INVENTORY_SELECTOR).should("exist");
    });
    it("최초 상품 현황은 비워져있다", () => {
      cy.get(PRODUCT_INVENTORY_CONTAINER_SELECTOR).should("be.empty");
    });
  });

  context("상품을 추가할 수 있다.", () => {
    it("빈 값은 입력할 수 없다.", () => {
      cy.alert({
        action: () => {
          cy.get(PRODUCT_NAME_INPUT_SELECTOR).type(" ");
          cy.get(PRODUCT_PRICE_INPUT_SELECTOR).type("100");
          cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).type("1");
          return cy.get(PRODUCT_ADD_BUTTON_SELECTOR).click();
        },
        message: ERROR_MESSAGE.EMPTY_VALUE,
      });
    });
    it("가격은 100원 이상 입력할 수 있다.", () => {
      cy.alert({
        action: () => {
          cy.get(PRODUCT_NAME_INPUT_SELECTOR).type("코카콜라");
          cy.get(PRODUCT_PRICE_INPUT_SELECTOR).type("80");
          cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).type("1");
          return cy.get(PRODUCT_ADD_BUTTON_SELECTOR).click();
        },
        message: ERROR_MESSAGE.INVALID_PRODUCT_PRICE_AMOUNT,
      });
    });
    it("가격은 10원 단위로 입력할 수 있다", () => {
      cy.alert({
        action: () => {
          cy.get(PRODUCT_NAME_INPUT_SELECTOR).type("코카콜라");
          cy.get(PRODUCT_PRICE_INPUT_SELECTOR).type("111");
          cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).type("1");
          return cy.get(PRODUCT_ADD_BUTTON_SELECTOR).click();
        },
        message: ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT,
      });
    });

    it("추가된 상품은 상품 현향 목룍에 추가된다", () => {
      cy.get(PRODUCT_NAME_INPUT_SELECTOR).type("코카콜라");
      cy.get(PRODUCT_PRICE_INPUT_SELECTOR).type("100");
      cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).type("1");
      cy.get(PRODUCT_ADD_BUTTON_SELECTOR).click();

      cy.contains("코카콜라").should("exist");
      cy.contains("100").should("exist");
      cy.contains("1").should("exist");
      cy.get(PRODUCT_INVENTORY_CONTAINER_SELECTOR)
        .children()
        .should("have.length", 1);
    });
    it("이미 등록된 상품을 재등록시 해당 상품은 입력된 값으로 갱신된다", () => {});
    it("상품 목록은 탬을 이동하여도 기존 상품 목록이 유지되어야 한다.", () => {});
  });
});
