Cypress.Commands.add('$', selector => {
  return cy.get(selector);
});
