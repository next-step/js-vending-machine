Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('#product-name-input').type(name)
  cy.get('#product-price-input').type(price)
  cy.get('#product-quantity-input').type(quantity)
  cy.get('#product-add-button').click()
})

Cypress.Commands.add('chargeChange', (change) => {
  cy.get('#charge-input').type(change)
  cy.get('#charge-button').click()
})

