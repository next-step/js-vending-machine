import { APP_KEY } from '../../src/constants.js';

const LOCAL_STORAGE = {};

Cypress.Commands.add('$', selector => {
  return cy.get(selector);
});

Cypress.Commands.add('setLocalStorage', () => {
  LOCAL_STORAGE[APP_KEY] = localStorage[APP_KEY];
});

Cypress.Commands.add('initLocalStorage', () => {
  localStorage.setItem(APP_KEY, LOCAL_STORAGE[APP_KEY]);
});

Cypress.Commands.add('inputProduct', ({ name, price, quantity }) => {
  cy.$('[name="product-name"]').type(name || '{backspace}');
  cy.$('[name="product-price"]').type(price || '{backspace}');
  cy.$('[name="product-quantity"]').type(quantity || '{backspace}');
});

Cypress.Commands.add('checkValidForm', (selector, invalidCount) => {
  cy.$(selector).within(() => {
    cy.$('input:invalid').should('have.length', invalidCount);
  });
});
