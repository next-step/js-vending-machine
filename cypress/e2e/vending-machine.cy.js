describe("lotto", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5501/");
  });

  it("자판기 상품을 추가하면 상품 현황에 나타난다.", () => {
    cy.get("#product-name-input").type("oragne");
    cy.get("#product-price-input").type(300);
    cy.get("#product-quantity-input").type(6);

    cy.get("#product-add-button").click();
    cy.get("#product-inventory-container tr")
      .last()
      .contains("oragne")
      .siblings()
      .contains(300)
      .siblings()
      .contains(6);
  });
});
