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
  cy.on('window:alert', str => {
    expect(str).to.equal(message);
  });
});

Cypress.Commands.add('$', dataset => cy.get(`[data-cy=${dataset}]`));

Cypress.Commands.add('registerProduct', (name, price, quantity) => {
  cy.$('product-name-input').type(name);
  cy.$('product-price-input').type(price);
  cy.$('product-quantity-input').type(quantity);
  cy.$('product-add-button').click();
});

Cypress.Commands.add('chargingMoney', money => {
  cy.$('charge-input').type(money);
  cy.$('charge-button').click();
  cy.$('charge-input').clear();
});
