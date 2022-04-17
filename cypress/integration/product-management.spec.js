before(() => cy.visit('../../dist/index.html'));

// eslint-disable-next-line no-unused-vars
const $nameInput = () => cy.get('[data-test="product-name-input"]');

afterEach(() => {
  cy.reload();
});

describe('상품을 추가하려 한다.', () => {
  context('파워에이드 3개를 1500원에 추가한다.', () => {
    it('파워에이드 3개가 1500원으로 추가된다.', () => {});
  });
});
