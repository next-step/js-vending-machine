// Stock
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

// Recharge
Cypress.Commands.add('clickRechargeTab', () => {
    cy.get('#vending-machine-manage-menu').click();
})

Cypress.Commands.add('clickRecharge', (value) => {
    cy.get('#recharge-button').click();
})

Cypress.Commands.add('typeRechargeAmount', (value) => {
    cy.get('#recharge-input').type(value);
})

Cypress.Commands.add('getRechargeCoinName', (i) => {
    return +cy.get('#recharge-cashbox-container').children('tr').eq(i).children('td').eq(i).invoke('text');
})

Cypress.Commands.add('getRechargeCoinQuantity', (i) => {
    return +cy.get('#recharge-cashbox-container').children('tr').eq(i).children('td').eq(i + 1).invoke('text');
})