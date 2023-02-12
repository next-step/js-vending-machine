// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('doAlert', message => {
  // cy.get('@consoleError').should('be.calledOnce');
  cy.on('window:alert', str => {
    expect(str).to.equal(message);
  });
});

Cypress.Commands.add('$', dataset => cy.get(`[data-cy=${dataset}]`));

Cypress.Commands.add('registerProduct', ({ name, price, quantity }) => {
  cy.$('product-name-input').type(name, { force: true });
  cy.$('product-price-input').type(price, { force: true });
  cy.$('product-quantity-input').type(quantity, { force: true });
  cy.$('product-add-button').click();

  cy.$('product-name-input').clear({ force: true });
  cy.$('product-price-input').clear({ force: true });
  cy.$('product-quantity-input').clear({ force: true });
});

Cypress.Commands.add('chargingMoney', money => {
  cy.$('charge-input').type(money, { force: true });
  cy.$('charge-button').click();
  cy.$('charge-input').clear({ force: true });
});
