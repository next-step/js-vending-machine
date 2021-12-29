const { test$ } = require('../../src/js/utils/utils.js');
import { TEST_DOM } from '../../src/js/constants/test.js';

const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('typeNewProductFormAndSubmit', (product) => {
  const inputs = [
    test$(TEST_DOM.PRODUCT_NAME_INPUT),
    test$(TEST_DOM.PRODUCT_PRICE_INPUT),
    test$(TEST_DOM.PRODUCT_QUANTITY_INPUT),
  ];

  inputs.forEach((input, index) => {
    const text = product[index];
    if (text.length === 0) return;
    cy.get(input).type(text);
  });

  cy.get(test$(TEST_DOM.PRODUCT_ADD_BUTTON)).click();
});

Cypress.Commands.add('clearNewProductForm', () => {
  cy.get(test$(TEST_DOM.PRODUCT_NAME_INPUT)).clear();
  cy.get(test$(TEST_DOM.PRODUCT_PRICE_INPUT)).clear();
  cy.get(test$(TEST_DOM.PRODUCT_QUANTITY_INPUT)).clear();
});

Cypress.Commands.add('checkProductItem', (products) => {
  cy.get(test$(TEST_DOM.PRODUCT_INVENTORY_CONTAINER))
    .find('th')
    .each(($el, index) => {
      cy.wrap($el).should('have.text', products[index]);
    });
});

Cypress.Commands.add('typeAmountAndSubmit', (amountString) => {
  cy.get(test$(TEST_DOM.CHARGE_CHANGE_TAB)).click();
  amountString.length > 0 && cy.get(test$(TEST_DOM.CHARGE_AMOUNT)).type(amountString);
  cy.get(test$(TEST_DOM.CHARGE_BUTTON)).click();
  cy.get(test$(TEST_DOM.CHARGE_AMOUNT)).clear();
});

Cypress.Commands.add('typeChargeAmountAndSubmit', (amountString) => {
  if (amountString.length !== 0) {
    cy.get(test$(TEST_DOM.INSERT_MONEY_INPUT)).type(amountString);
  }
  cy.get(test$(TEST_DOM.INSERT_MONEY_BUTTON)).click();
  cy.get(test$(TEST_DOM.INSERT_MONEY_INPUT)).clear();
});

Cypress.Commands.add('clickMachineModeTab', (tab) => {
  cy.get(test$(tab)).click();
});

Cypress.Commands.add('purchaseProduct', () => {
  cy.get(test$(TEST_DOM.PURCHASE_BUTTON)).click();
});
