import { SELECTOR } from '../../src/js/constants/selector.js';

Cypress.Commands.add('typeProductName', (name) => {
  cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(name);
});

Cypress.Commands.add('typeProductPrice', (price) => {
  cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(price);
});

Cypress.Commands.add('typeProductQuantity', (quantity) => {
  cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(quantity);
});

Cypress.Commands.add('clickProductAddButton', () => {
  cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
});

Cypress.Commands.add('addProduct', ({ name, price, quantity }) => {
  cy.typeProductName(name);
  cy.typeProductPrice(price);
  cy.typeProductQuantity(quantity);
  cy.clickProductAddButton();
});
