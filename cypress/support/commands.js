Cypress.Commands.add('alert', (alertMessage) => {
  cy.on('window:alert', (msg) => expect(msg).to.equal(alertMessage));
});

Cypress.Commands.add('insert', ($el, value) => {
  cy.get($el).clear().type(value);
});

Cypress.Commands.add('submitForm', ($el = '.product-container') => {
  cy.get($el).submit();
});

Cypress.Commands.add('addProductInfo', (productInfo) => {
  Object.values(productInfo).forEach((info) => cy.insert(info.$el, info.value));
});
