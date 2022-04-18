/* eslint-disable no-unused-vars */
before(() => cy.visit('../../dist/index.html'));

const $formContainer = () => cy.get('[data-test="product-container"]');
const $nameInput = () => cy.get('[data-test="product-name-input"]');
const $priceInput = () => cy.get('[data-test="product-price-input"]');
const $quantityInput = () => cy.get('[data-test="product-quantity-input"]');

const $inventroyContainer = () =>
  cy.get('[data-test="product-inventory-container"');

afterEach(() => {
  cy.reload();
  cy.visit('../../dist/index.html');
});

describe('상품을 추가하려 한다.', () => {
  context('파워에이드 3개를 1500원에 추가한다.', () => {
    it('파워에이드 3개가 1500원으로 추가된다.', () => {
      const data = ['파워에이드', '3', '1500'];

      $nameInput().type(data[0]);
      $priceInput().type(data[1]);
      $quantityInput().type(data[2]);

      $formContainer().submit();

      $inventroyContainer()
        .find('td')
        .each(($el, idx) => expect($el.text()).eq(data[idx]));
    });
  });
});
