// @ts-nocheck

/* for keeping localStorage through test */
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

Cypress.Commands.add('gnbClick', index => {
  return cy.get('vending-machine-app #gnb').children().eq(index).click()
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

/* purchaseIventory */
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

/* machineCharge */
Cypress.Commands.add('machineChargeAdd', price => {
  cy.get('#vending-machine-charge-input').type(price).parent().submit()
})
Cypress.Commands.add('machineCharged', () => {
  return cy.get('#vending-machine-charge-amount')
})

/* userPurchase */
Cypress.Commands.add('userChargeAdd', price => {
  cy.get('#charge-input').type(price).parent().submit()
})
Cypress.Commands.add('userCharged', () => {
  return cy.get('#charge-amount')
})
Cypress.Commands.add('getListItem', index => {
  return cy.get('#product-items-container tr').eq(index)
})
Cypress.Commands.add('userBuy', index => {
  cy.getListItem(index).find('button').click()
})
Cypress.Commands.add('getChange', () => {
  cy.get('#coin-return-button').click()
})
