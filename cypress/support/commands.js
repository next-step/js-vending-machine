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

Cypress.Commands.add('mockMathRandom', () => {
  const mockMathRandom = () => {
    const mockValues = [0.1, 0.6, 0.4, 0.9]
    let i = -1
    return () => {
      i += 1
      return mockValues[i % mockValues.length]
    }
  }
  cy.window().then((window) => {
    window.Math.random = mockMathRandom()
  })
})

Cypress.Commands.add('chargePurchase', (purchase) => {
  cy.get('#purchase-input').type(purchase)
  cy.get('#purchase-button').click()
})

Cypress.Commands.add('remains', (coin500, coin100, coin50, coin10) => {
  cy.get('#coin-500-reamins').should('have.text', coin500)
  cy.get('#coin-100-reamins').should('have.text', coin100)
  cy.get('#coin-50-reamins').should('have.text', coin50)
  cy.get('#coin-10-reamins').should('have.text', coin10)
})
