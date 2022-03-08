describe('상품 관리 / 요구사항', () => {
  before(() => {
    cy.visit('index.html');
  });
  beforeEach(() => {
    cy.reload();
    cy.get('#product-manage-menu').click();
  });
  it('최초 상품 목록은 비워진 상태이다.', () => {
    cy.get('.product-list-container').should($ele => {
      expect($ele[0].children.length).to.equal(0);
    });
  });
  it('상품명, 금액, 수량을 추가할 수 있다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '100';

    cy.get('.product-list-container > .tr').should('have.length', 0);
    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr').should('have.length', 1);
    cy.get('.product-list-container > .tr > .td').should($ele => {
      expect($ele[0].innerHTML).to.equal(name);
      expect($ele[1].innerHTML).to.equal(price);
      expect($ele[2].innerHTML).to.equal(qty);
    });
  });
  it('상품명, 금액, 수량은 공백이 불가능하다.', () => {
    let name = '상 품 명';
    let price = '1000';
    let qty = '100';

    cy.get('.product-list-container > .tr').should('have.length', 0);
    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr').should('have.length', 0);
  });

  it('상품의 최소 수량은 1개여야 한다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '0';

    cy.get('.product-list-container > .tr').should('have.length', 0);
    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr').should('have.length', 0);
  });

  it('상품의 최소 가격은 100원이다', () => {
    let name = '상품명';
    let price = '0';
    let qty = '1';

    cy.get('.product-list-container > .tr').should('have.length', 0);
    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr').should('have.length', 0);
  });

  it('상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
    let name = '상품명';
    let price = '109';
    let qty = '1';

    cy.get('.product-list-container > .tr').should('have.length', 0);

    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr').should('have.length', 0);
  });

  it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '3';

    cy.get('.product-list-container > .tr').should('have.length', 0);
    cy.inputProduct(name, price, qty);
    cy.get('.product-list-container > .tr').should('have.length', 1);

    name = '상품명2';
    price = '1000';
    qty = '3';

    cy.inputProduct(name, price, qty);
    cy.get('.product-list-container > .tr').should('have.length', 2);

    name = '상품명2';
    price = '1100';
    qty = '5';

    cy.inputProduct(name, price, qty);
    cy.get('.product-list-container > .tr').should('have.length', 2);

    cy.get('.product-list-container > .tr:nth-child(2) > .td').should($ele => {
      expect($ele[0].innerHTML).to.equal(name);
      expect($ele[1].innerHTML).to.equal(price);
      expect($ele[2].innerHTML).to.equal(qty);
    });
  });

  it('사용자는 추가한 상품을 확인할 수 있다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '3';

    cy.inputProduct(name, price, qty);
    cy.get('.product-list-container .tr').should('be.visible');
  });
  it('상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '3';

    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr > .td').should($ele => {
      expect($ele[0].innerHTML).to.equal(name);
      expect($ele[1].innerHTML).to.equal(price);
      expect($ele[2].innerHTML).to.equal(qty);
    });
  });
  it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
    let name = '상품명';
    let price = '1000';
    let qty = '3';

    cy.inputProduct(name, price, qty);

    cy.get('.product-list-container > .tr > .td').should($ele => {
      expect($ele[0].innerHTML).to.equal(name);
      expect($ele[1].innerHTML).to.equal(price);
      expect($ele[2].innerHTML).to.equal(qty);
    });

    cy.get('#vending-machine-manage-menu').click();
    cy.get('#product-purchase-menu').click();
    cy.get('#product-manage-menu').click();

    cy.get('.product-list-container > .tr > .td').should($ele => {
      expect($ele[0].innerHTML).to.equal(name);
      expect($ele[1].innerHTML).to.equal(price);
      expect($ele[2].innerHTML).to.equal(qty);
    });
  });
});