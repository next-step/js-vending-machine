/// <reference types="cypress" />

describe('상품관리 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html');
    cy.get('#product-manage-menu').click();
  });

  it('최초 상품 목록은 비워진 상태이다.', () => {
    cy.get('#product-name-input').should('be.empty');
    cy.get('#product-price-input').should('be.empty');
    cy.get('#product-quantity-input').should('be.empty');

    cy.get('#product-inventory-container').children().should('have.length', 0);
  });

  it('상품 이름은 공백이 불가능하다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('상품 이름을 입력해주세요!');
    });

    cy.get('#product-add-button').click();
  });

  it('상품 금액은 공백이 불가능하다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('상품 가격을 양수로 입력해주세요!');
    });

    cy.get('#product-name-input').type('name');
    cy.get('#product-add-button').click();
  });

  it('상품 금액의 최소 가격은 100원', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('상품 가격은 100원 이상 입력해주세요!');
    });

    const PRODUCT_MIN_PRICE = 100;

    cy.get('#product-name-input').type('name');
    cy.get('#product-price-input').type(PRODUCT_MIN_PRICE - 1);
    cy.get('#product-add-button').click();
  });

  it('상품 금액의 최소 가격은 10원으로 나누어 떨어져야 한다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('가격은 10원 단위로 떨어져야 합니다.');
    });

    cy.get('#product-name-input').type('name');
    cy.get('#product-price-input').type(129);
    cy.get('#product-add-button').click();
  });

  it('상품 수량은 공백이 불가능하다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('상품 수량을 양수로 입력해주세요!');
    });

    cy.get('#product-name-input').type('name');
    cy.get('#product-price-input').type(1160);
    cy.get('#product-add-button').click();
  });

  it('상품의 최소 수량은 1개이다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('상품 수량을 양수로 입력해주세요!');
    });

    cy.get('#product-name-input').type('name');
    cy.get('#product-price-input').type(1160);
    cy.get('#product-quantity-input').type(0);
    cy.get('#product-add-button').click();
  });

  it('사용자는 추가한 상품을 확인할 수 있다.', () => {
    const inputs = ['name', 1160, 5];
    const [name, price, quantity] = inputs;
    cy.get('#product-name-input').type(name);
    cy.get('#product-price-input').type(price);
    cy.get('#product-quantity-input').type(quantity);
    cy.get('#product-add-button').click();

    const productInventoryContainer = cy.get('#product-inventory-container');
    productInventoryContainer.find('td').each((el, i) => cy.wrap(el).should('have.text', inputs[i]));
  });

  it('같은 상품명의 데이터를 출라하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
    const PRODUCT_NAME = 'name'
    const inputs = [PRODUCT_NAME, 1160, 5];
    const [name1, price1, quantity1] = inputs;
    cy.get('#product-name-input').type(name1);
    cy.get('#product-price-input').type(price1);
    cy.get('#product-quantity-input').type(quantity1);
    cy.get('#product-add-button').click();

    const productInventoryContainer = cy.get('#product-inventory-container');
    productInventoryContainer.find('td').each((el, i) => cy.wrap(el).should('have.text', inputs[i]));

    const newInputs = [PRODUCT_NAME, 3000, 70];
    const [name, price, quantity] = newInputs;
    cy.get('#product-name-input').type(name);
    cy.get('#product-price-input').type(price);
    cy.get('#product-quantity-input').type(quantity);
    cy.get('#product-add-button').click();

    const productInventoryContainer2 = cy.get('#product-inventory-container');
    productInventoryContainer2.find('td').each((el, i) => cy.wrap(el).should('have.text', newInputs[i]));
  });

  it('탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
    const inputs = ['name', 1160, 5];
    const [name, price, quantity] = inputs;
    cy.get('#product-name-input').type(name);
    cy.get('#product-price-input').type(price);
    cy.get('#product-quantity-input').type(quantity);
    cy.get('#product-add-button').click();

    // 탭 이동
    cy.get('#vending-machine-manage-menu').click();
    cy.get('#product-manage-menu').click();

    const productInventoryContainer = cy.get('#product-inventory-container');
    productInventoryContainer.find('td').each((el, i) => cy.wrap(el).should('have.text', inputs[i]));
  });
});
