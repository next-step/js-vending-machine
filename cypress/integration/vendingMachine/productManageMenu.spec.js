function addProduct({ name, price, quantity }) {
  cy.get('[placeHolder="상품명"]').type(name);
  cy.get('[placeHolder="가격"]').type(String(price));
  cy.get('[placeHolder="수량"]').type(String(quantity));
  cy.get('button').contains('추가하기').click();
}

describe('상품 관리', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('상품명, 가격, 수량을 입력 후 추가하기 버튼을 누르면 상품이 추가된다.', () => {
    const name = 'apple';
    const price = 1000;
    const quantity = 20;
    addProduct({ name, price, quantity });

    cy.get('table')
      .find('tbody tr:last td')
      .then(($el) => {
        cy.wrap($el[0]).should('have.text', name);
        cy.wrap($el[1]).should('contain.text', price);
        cy.wrap($el[2]).should('contain.text', quantity);
      });
  });

  it('탭 이동 시 상품목록이 유지된다.', () => {
    const name = 'apple';
    const price = 1000;
    const quantity = 20;
    addProduct({ name, price, quantity });

    cy.contains('잔돈충전').click();
    cy.contains('상품 관리').click();

    cy.get('table')
      .find('tbody tr:last td')
      .then(($el) => {
        cy.wrap($el[0]).should('have.text', name);
        cy.wrap($el[1]).should('contain.text', price);
        cy.wrap($el[2]).should('contain.text', quantity);
      });
  });

  it('새로고침 하더라도 상품목록이 유지된다.', () => {
    cy.clearLocalStorage();
    const name = 'apple';
    const price = 1000;
    const quantity = 20;
    addProduct({ name, price, quantity });

    cy.reload();

    cy.get('table')
      .find('tbody tr:last td')
      .then(($el) => {
        cy.wrap($el[0]).should('have.text', name);
        cy.wrap($el[1]).should('contain.text', price);
        cy.wrap($el[2]).should('contain.text', quantity);
      });
  });
});
