Cypress.Commands.add('alert', (alertMessage) => {
  cy.on('window:alert', (msg) => expect(msg).to.equal(alertMessage));
});

Cypress.Commands.add('submitForm', (formSelector, value) => {
  cy.get(formSelector).find('input').clear().type(value);
  cy.get(formSelector).submit();
});
