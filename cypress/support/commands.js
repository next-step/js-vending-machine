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

Cypress.Commands.add('typeCharge', (charge) => {
  cy.get(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).type(charge);
});

Cypress.Commands.add('clickAddChargeButton', () => {
  cy.get(SELECTOR.VENDING_MACHINE_CHARGE_BUTTON).click();
});

Cypress.Commands.add('addCharge', (charge) => {
  cy.typeCharge(charge);
  cy.clickAddChargeButton();
});

Cypress.Commands.add('checkCoinFormat', (selector) => {
  cy.get(selector)
    .invoke('text')
    .then((text) => {
      const textArray = text.split('');
      const textArrayLength = textArray.length;

      textArray.forEach((txt, idx) => {
        if (idx === textArrayLength - 1) {
          expect(txt).to.be.equal('개');
          return;
        }
        // eslint-disable-next-line no-unused-expressions
        expect(Number.isNaN(Number(txt))).to.be.false;
      });
    });
});
