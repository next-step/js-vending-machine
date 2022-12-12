describe("lotto", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5501/");
  });

  it("자판기 상품을 추가하면 상품 현황에 나타난다.", () => {
    cy.get("#product-name-input").type("orange");
    cy.get("#product-price-input").type(300);
    cy.get("#product-quantity-input").type(6);
    cy.get("#product-add-button").click();
    cy.get("#product-inventory-container tr")
      .last()
      .contains("orange")
      .siblings()
      .contains(300)
      .siblings()
      .contains(6);
  });

  it("상품 가격은 10으로 나누어 떨어져야한다.", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#product-name-input").type("apple");
    cy.get("#product-price-input").type(333);
    cy.get("#product-quantity-input").type(6);
    cy.get("#product-add-button")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(
          "상품의 가격은 10원으로 나누어 떨어져야합니다."
        );
      });
  });

  it("상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.", () => {
    cy.get("#product-name-input").type("orange");
    cy.get("#product-price-input").type(300);
    cy.get("#product-quantity-input").type(6);
    cy.get("#product-add-button").click();

    cy.get("#vending-machine-manage-menu").click();
    cy.get("#product-manage-menu").click();

    cy.get("#product-inventory-container tr")
      .last()
      .contains("orange")
      .siblings()
      .contains(300)
      .siblings()
      .contains(6);
  });
});
