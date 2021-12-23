import { ErrorMsgs } from "../../src/utils/constants.js";

beforeEach(() => {
  cy.restoreLocalStorage();
});
afterEach(() => {
  cy.saveLocalStorage();
});

describe("vending-machine", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  it("(NOT A TEST) localStorage에 데이터를 남기기 위함", () => {
    cy.addNewProduct("커피", 650, 20);
    cy.addNewProduct("칠성사이다", 800, 10);
    cy.addNewProduct("코카콜라", 900, 18);
  });

  it("inventory 저장데이터가 있으면 기존 저장된 리스트 노출됨", () => {
    cy.get("#product-inventory-container tr").should("have.length", 3);
  });

  describe("새로운 상품 정보 추가/교체하기", () => {
    it("정상적으로 상품정보를 입력하면 상품 목록에 출력된다", () => {
      /* input을 차례로 입력하고 추가버튼을 누른다
        표에 해당 내용이 추가되었는지 확인*/
      cy.addNewProduct("바나나킥", 220, 2);
      cy.get("#product-inventory-container tr")
        .eq(3)
        .find("td")
        .eq(0)
        .should("have.text", "바나나킥")
        .next()
        .should("have.text", "220원")
        .next()
        .should("have.text", "2개");
    });

    it("이름이 이미 있는 상품정보를 입력하면 상품 목록이 교체된다", () => {
      /* 똑같은 이름의 상품정보를 입력하고 추가버튼을 누른다
        표에 해당 내용으로 교체되었는지 확인한다 */
      cy.addNewProduct("바나나킥", 3000, 7);
      cy.get("#product-inventory-container tr")
        .eq(3)
        .find("td")
        .eq(0)
        .should("have.text", "바나나킥")
        .next()
        .should("have.text", "3000원")
        .next()
        .should("have.text", "7개");
    });

    it("이름이 비어있으면 에러 발생", () => {
      cy.get("#product-name-input").clear().next().clear().next().clear();
      cy.get("#product-add-button").click();
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.EMPTY_NAME)
      );
    });

    it("가격이 비어있으면 에러 발생", () => {
      cy.get("#product-name-input")
        .clear()
        .type("바나나킥")
        .next()
        .clear()
        .next()
        .clear();
      cy.get("#product-add-button").click();
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.EMPTY_PRICE)
      );
    });

    it("가격이 100원 미만이면 에러 발생", () => {
      cy.addNewProduct("바나나킥", 10, 2);
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.OUT_OF_RANGE_PRICE)
      );
    });

    it("가격이 10원 단위가 아니면 에러 발생", () => {
      cy.addNewProduct("바나나킥", 222, 2);
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.NOT_DIVIDED_PRICE)
      );
    });

    it("수량이 비어있으면 에러 발생", () => {
      cy.get("#product-name-input")
        .clear()
        .type("바나나킥")
        .next()
        .clear()
        .type(2000)
        .next()
        .clear();
      cy.get("#product-add-button").click();
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.EMPTY_QUANTITY)
      );
    });

    it("수량이 1개 미만이면 에러 발생", () => {
      cy.addNewProduct("바나나킥", 2000, 0);
      cy.on("window:alert", (text) =>
        expect(text).to.equal(ErrorMsgs.OUT_OF_RANGE_QUANTITY)
      );
    });
  });
});
