import { SELECTOR } from '../../src/js/constants/selector.js';

Cypress.Commands.addAll({
  typeProductName(name) {
    cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(name);
  },
  typeProductPrice(price) {
    cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(price);
  },
  typeProductQuantity(quantity) {
    cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(quantity);
  },
  clickProductAddButton() {
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
  },
  addProduct({ name, price, quantity }) {
    cy.typeProductName(name);
    cy.typeProductPrice(price);
    cy.typeProductQuantity(quantity);
    cy.clickProductAddButton();
  },
});

Cypress.Commands.addAll({
  typeCharge(charge) {
    cy.get(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).type(charge);
  },

  clickAddChargeButton() {
    cy.get(SELECTOR.VENDING_MACHINE_CHARGE_BUTTON).click();
  },
  addCharge(charge) {
    cy.typeCharge(charge);
    cy.clickAddChargeButton();
  },
});

Cypress.Commands.addAll({
  checkCoinFormat(selector) {
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
  },
});

Cypress.Commands.addAll({
  typePurchaseMoney(money) {
    cy.get(SELECTOR.PRODUCT_PURCHASE_MONEY_INPUT).type(money);
  },
  clickPurchaseMoneyAddButton() {
    cy.get(SELECTOR.PRODUCT_PURCHASE_MONEY_BUTTON).click();
  },
});
