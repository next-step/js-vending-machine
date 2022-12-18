Cypress.Commands.add('clickStockTab', () => {
    cy.get('#stock-manage-menu').click();
})

Cypress.Commands.add('clickStockAdd', () => {
    cy.get('#stock-add-button').click();
})

Cypress.Commands.add('typename', (value) => {
    cy.get('#stock-name-input').type(value);
})

Cypress.Commands.add('typeStockPrice', (value) => {
    cy.get('#stock-price-input').type(value);
})

Cypress.Commands.add('typeStockQuantity', (value) => {
    cy.get('#stock-quantity-input').type(value);
})