// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { $ELEMENT } from '../../src/constants/element.js';

Cypress.Commands.add('typeProduct', ({ name, price, quantity }) => {
  name
    ? cy.getProductInputWithShadow($ELEMENT.NAME_INPUT).type(name)
    : cy.getProductInputWithShadow($ELEMENT.NAME_INPUT).clear();
  cy.getProductInputWithShadow($ELEMENT.PRICE_INPUT).type(price);
  cy.getProductInputWithShadow($ELEMENT.QUANTITY_INPUT).type(quantity);
});

Cypress.Commands.add('checkProduct', ({ name, price, quantity }) => {
  cy.contains('td', name);
  cy.contains('td', price);
  cy.contains('td', quantity);
});

Cypress.Commands.add('checkProductWithShadowDom', ({ name, price, quantity }) => {
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('product-manage')
    .shadow()
    .contains('td', name);
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('product-manage')
    .shadow()
    .contains('td', price);
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('product-manage')
    .shadow()
    .contains('td', quantity);
});

Cypress.Commands.add('getProductInputWithShadow', (elementName) => {
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('product-manage')
    .shadow()
    .find('add-product-input')
    .shadow()
    .find(elementName);
});

Cypress.Commands.add('getProductManageWithShadow', (elementName) => {
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('product-manage')
    .shadow()
    .find(elementName);
});

Cypress.Commands.add('getHashNavButtonWithShadow', (hashId) => {
  cy.get('vending-machine-app').shadow().find(`hash-nav-button[hash-id=${hashId}]`);
});

Cypress.Commands.add('getChargingInputWithShadow', (elementName) => {
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('charging-money')
    .shadow()
    .find('charging-money-input')
    .shadow()
    .find(elementName);
});

Cypress.Commands.add('getChargingMoneyWithShadow', (elementName) => {
  cy.get('vending-machine-app')
    .shadow()
    .find('route-wrapper')
    .shadow()
    .find('charging-money')
    .shadow()
    .find(elementName);
});
