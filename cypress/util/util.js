Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('product-dashboard')
    .shadow()
    .find('[data-product=name-input]')
    .type(name, { force: true });
  cy.get('product-dashboard')
    .shadow()
    .find('[data-product=price-input]')
    .type(price, { force: true });
  cy.get('product-dashboard')
    .shadow()
    .find('[data-product=quantity-input]')
    .type(`${quantity}{enter}`, { force: true });
});

Cypress.Commands.add('findProductInventory', () => {
  cy.get('product-inventory').shadow().find('.product-inventory');
});

Cypress.Commands.add('findAddButton', () => {
  cy.get('product-dashboard').shadow().find('[data-product=add-button]');
});

Cypress.Commands.add('findProduct', () => {
  cy.get('product-inventory').shadow().find('[data-manage=product]');
});
