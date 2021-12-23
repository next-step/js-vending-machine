let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("addNewProduct", (name, price, quantity) => {
  cy.get("#product-name-input")
    .clear()
    .type(name)
    .next()
    .clear()
    .type(price)
    .next()
    .clear()
    .type(quantity);
  cy.get("#product-add-button").click();
});
