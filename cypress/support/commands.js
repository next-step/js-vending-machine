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

Cypress.Commands.add('calledInvalidMessage', message => {
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.get('#product-add-button')
    .click()
    .then(() => {
      expect(alertStub).to.be.calledWith(message);
    });
});

Cypress.Commands.add('typeProductItem', ({ title, price, quantity }) => {
  cy.get('#product-name-input').type(title);
  cy.get('#product-price-input').type(price);
  cy.get('#product-quantity-input').type(quantity);
});
