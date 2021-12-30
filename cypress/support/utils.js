export const checkError = (errorMessage) => {
  cy.on('uncaught:exception', (err) => {
    console.log(errorMessage);
    expect(err.message).to.include(errorMessage);
    return false;
  });
};
