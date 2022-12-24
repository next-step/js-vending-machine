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
  name ? cy.get($ELEMENT.NAME_INPUT).type(name) : cy.get($ELEMENT.NAME_INPUT).clear();
  cy.get($ELEMENT.PRICE_INPUT).type(price);
  cy.get($ELEMENT.QUANTITY_INPUT).type(quantity);
});

Cypress.Commands.add('checkProduct', ({ name, price, quantity }) => {
  cy.contains('td', name);
  cy.contains('td', price);
  cy.contains('td', quantity);
});
