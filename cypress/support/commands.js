// @ts-nocheck

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add('gnb', () => {
  return cy.get('vending-machine-app #gnb')
})
Cypress.Commands.add('machineCharge', () => {
  return cy.get('machine-charge')
})
Cypress.Commands.add('productInventory', () => {
  return cy.get('product-inventory')
})
Cypress.Commands.add('userPurchase', () => {
  return cy.get('user-purchase')
})

Cypress.Commands.add('inventoryInputs', () => {
  return cy.get('product-inventory input')
})

Cypress.Commands.add('inventoryAdd', (name, price, amount) => {
  return cy
    .inventoryInputs()
    .eq(0)
    .clear()
    .type(name)
    .next()
    .clear()
    .type(price)
    .next()
    .clear()
    .type(amount)
    .parent()
    .submit()
})
Cypress.Commands.add('inventoryList', () => {
  return cy.get('#product-inventory-container tr')
})
