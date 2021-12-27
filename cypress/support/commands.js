Cypress.Commands.add('setupProductManageSelector', () => {
  cy.get('[data-cy=product-name-input]').as('productNameInput')
  cy.get('[data-cy=product-price-input]').as('productPriceInput')
  cy.get('[data-cy=product-quantity-input]').as('productQuantityInput')
  cy.get('[data-cy=product-add-button]').as('productAddButton')
  cy.get('[data-cy=product-inventory-container]').as(
    'productInventoryContainer'
  )
})
