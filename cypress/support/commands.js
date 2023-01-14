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

Cypress.Commands.add('alertMessage', (selector, message) => {
  const stub = cy.stub();
  cy.on('window:alert', stub);
  cy.get(selector)
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith(message);
    });
});

Cypress.Commands.add('addProduct', (value) => {
  const [name, price, amount] = value;
  cy.get('#product-name-input').type(name);
  cy.get('#product-price-input').type(price);
  cy.get('#product-quantity-input').type(amount);

  cy.get('#product-add-button').click();
});
