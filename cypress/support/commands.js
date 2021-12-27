const LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('setupProductManageSelector', () => {
  cy.get('[data-cy=product-name-input]').as('name')
  cy.get('[data-cy=product-price-input]').as('price')
  cy.get('[data-cy=product-quantity-input]').as('quantity')
  cy.get('[data-cy=product-add-button]').as('button')
  cy.get('[data-cy=product-inventory-container]').as('inventory')

  cy.get('[data-cy=product-manage-navigator]').as('manageNavi')
  cy.get('[data-cy=product-purchase-navigator]').as('purchaseNavi')
})

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})
Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add('addProduct', (product) => {
  cy.get('@name').type(product[0])
  cy.get('@price').type(product[1])
  cy.get('@quantity').type(product[2])
})
