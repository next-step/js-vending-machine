const LOCAL_STORAGE_MEMORY = {}

// common

Cypress.Commands.add('setupNaviSelector', () => {
  cy.get('[data-cy=product-manage-navigator]').as('manageNavi')
  cy.get('[data-cy=charge-money-navigator]').as('chargeNavi')
  cy.get('[data-cy=product-purchase-navigator]').as('purchaseNavi')
})

Cypress.Commands.add('callAlertWith', (selector, message) => {
  const stub = cy.stub()
  cy.on('window:alert', stub)
  cy.get(selector)
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith(message)
    })
})

Cypress.Commands.add('callAlertWithElement', (element, message) => {
  const stub = cy.stub()
  cy.on('window:alert', stub)
  element.click().then(() => {
    expect(stub.getCall(0)).to.be.calledWith(message)
  })
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

// product manage

Cypress.Commands.add('setupProductManageSelector', () => {
  cy.get('[data-cy=product-name-input]').as('name')
  cy.get('[data-cy=product-price-input]').as('price')
  cy.get('[data-cy=product-quantity-input]').as('quantity')
  cy.get('[data-cy=product-add-button]').as('button')
  cy.get('[data-cy=product-inventory-container]').as('inventory')
})

Cypress.Commands.add('addProduct', (product) => {
  cy.get('@name').type(product[0])
  cy.get('@price').type(product[1])
  cy.get('@quantity').type(product[2])
})

// charge money
Cypress.Commands.add('setupChargeVendingMachineSelector', () => {
  cy.get('[data-cy=vending-machine-charge-input]').as('input')
  cy.get('[data-cy=vending-machine-charge-button]').as('button')
  cy.get('[data-cy=vending-money-inventory]').as('moneyInventory')
  cy.get('[data-cy=vending-coin-inventory]').as('coinInventory')
})

Cypress.Commands.add('checkVendingCoinAmount', (coinAmountArray) => {
  cy.get('@coinInventory')
    .get('tr td')
    .each(($cell, index) => {
      if (index % 2 !== 0) {
        expect(
          cy
            .wrap($cell)
            .should('have.text', coinAmountArray[Math.floor(index / 2)] + '개')
        )
      }
    })
})

Cypress.Commands.add('checkInventorySuffix', () => {
  cy.get('@coinInventory')
    .get('tr td')
    .each(($cell, index) => {
      if (index % 2 !== 0) {
        expect(
          cy
            .wrap($cell)
            .should('contain.text', '개')
            .should('not.contain.text', ' 개')
        )
      }
    })
})

// purchase product
Cypress.Commands.add('setupProductPurchase', () => {
  cy.get('[data-cy=charge-input]').as('chargeUserMoneyInput')
  cy.get('[data-cy=charge-button]').as('chargeUserMoneyButton')
  cy.get('[data-cy=charge-amount]').as('chargeMoneyAmount')
  cy.get('[data-cy=product-items-container]').as('productItemContainer')
  cy.get('[data-cy=return-coin-inventory]').as('returnCoinInventory')
})

Cypress.Commands.add('setupProductManage', () => {
  cy.get('[data-cy=product-name-input]').as('productNameInput')
  cy.get('[data-cy=product-price-input]').as('productPriceInput')
  cy.get('[data-cy=product-quantity-input]').as('productQuantityInput')
  cy.get('[data-cy=product-add-button]').as('productAddButton')
  cy.get('[data-cy=product-inventory-container]').as('productManageInventory')
})

Cypress.Commands.add('addProductAtBefore', (product) => {
  cy.get('@productNameInput').type(product[0])
  cy.get('@productPriceInput').type(product[1])
  cy.get('@productQuantityInput').type(product[2])
})
