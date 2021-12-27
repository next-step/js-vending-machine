/// <reference types="cypress" />

describe('자판기 미션', () => {
  beforeEach(() => {
    cy.visit('https://eungyucho.github.io/js-vending-machine/')
    cy.setupProductManageSelector()
  })
})
