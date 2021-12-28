before(() => {
  cy.visit('http://127.0.0.1:8080');
});

const checkError = (errorMessage) => {
  cy.on('uncaught:exception', (err) => {
    expect(err.message).to.include(errorMessage);
    return false;
  });
};

describe('동전 추가', () => {
  describe('...', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
