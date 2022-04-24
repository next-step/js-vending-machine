Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('product-handling-board')
    .shadow()
    .find('[data-product=name-input]')
    .type(name);
  cy.get('product-handling-board')
    .shadow()
    .find('[data-product=price-input]')
    .type(price);
  cy.get('product-handling-board')
    .shadow()
    .find('[data-product=quantity-input]')
    .type(`${quantity}{enter}`);
});

Cypress.Commands.add('findProductInventory', () => {
  cy.get('product-handling-board').shadow().find('product-inventory');
});

Cypress.Commands.add('findAddButton', () => {
  cy.get('product-handling-board').shadow().find('[data-product=add-button]');
});

Cypress.Commands.add('findProduct', () => {
  cy.get('product-handling-board')
    .shadow()
    .find('product-inventory')
    .shadow()
    .find('[data-manage=product]');
});
