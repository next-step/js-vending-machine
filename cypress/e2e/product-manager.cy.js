import {
  CHANGE_CHARGE_MENU_SELECTOR,
  PRODUCT_ADD_BUTTON_SELECTOR,
  PRODUCT_INVENTORY_CONTAINER_SELECTOR,
  PRODUCT_INVENTORY_SELECTOR,
  PRODUCT_MANAGE_MENU_SELECTOR,
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

  const addProduct = ({ name, price, quantity }) => {
    cy.get(PRODUCT_NAME_INPUT_SELECTOR).type(name);
    cy.get(PRODUCT_PRICE_INPUT_SELECTOR).type(price);
    cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).type(quantity);
    return cy.get(PRODUCT_ADD_BUTTON_SELECTOR).click();
  };

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
          return addProduct({ name: " ", price: "100", quantity: "1" });
        },
        message: ERROR_MESSAGE.EMPTY_VALUE,
      });
    });

    it("가격은 100원 이상 입력할 수 있다.", () => {
      cy.alert({
        action: () => {
          return addProduct({ name: "코카콜라", price: "80", quantity: "1" });
        },
        message: ERROR_MESSAGE.INVALID_PRODUCT_PRICE_AMOUNT,
      });
    });

    it("가격은 10원 단위로 입력할 수 있다", () => {
      cy.alert({
        action: () => {
          return addProduct({ name: "코카콜라", price: "101", quantity: "1" });
        },
        message: ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT,
      });
    });

    it("추가된 상품은 상품 현향 목룍에 추가된다", () => {
      addProduct({ name: "코카콜라", price: "100", quantity: "1" });

      cy.contains("코카콜라").should("exist");
      cy.contains("100").should("exist");
      cy.contains("1").should("exist");
      cy.get(PRODUCT_INVENTORY_CONTAINER_SELECTOR)
        .children()
        .should("have.length", 1);
    });

    it("상품이 추가되면 추가하기 입력 폼에 입력된 값은 초기화된다.", () => {
      addProduct({ name: "코카콜라", price: "100", quantity: "1" });

      cy.get(PRODUCT_NAME_INPUT_SELECTOR).should("have.value", "");
      cy.get(PRODUCT_PRICE_INPUT_SELECTOR).should("have.value", "");
      cy.get(PRODUCT_QUANTITY_INPUT_SELECTOR).should("have.value", "");
    });

    it("이미 등록된 상품을 재등록시 해당 상품은 입력된 값으로 갱신된다", () => {
      addProduct({ name: "코카콜라", price: "100", quantity: "1" });
      addProduct({ name: "코카콜라", price: "1000", quantity: "10" });

      cy.get(PRODUCT_INVENTORY_CONTAINER_SELECTOR)
        .children()
        .should("have.length", 1);

      cy.contains("코카콜라").next().should("have.text", "1000");
      cy.contains("코카콜라").next().next().should("have.text", "10");
    });
  });

  it("상품 목록은 탬을 이동하여도 기존 상품 목록이 유지되어야 한다.", () => {
    addProduct({ name: "코카콜라", price: "100", quantity: "1" });

    cy.contains("코카콜라").next().should("have.text", "100");
    cy.contains("코카콜라").next().next().should("have.text", "1");

    cy.get(CHANGE_CHARGE_MENU_SELECTOR).click();
    cy.get(PRODUCT_MANAGE_MENU_SELECTOR).click();

    cy.contains("코카콜라").next().should("have.text", "100");
    cy.contains("코카콜라").next().next().should("have.text", "1");
  });
});
