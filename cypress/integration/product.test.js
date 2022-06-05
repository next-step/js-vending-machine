describe('Product', () => {
  beforeEach(() => {
    cy.visit('./index.html');
    cy.clearLocalStorage();
  });

  it('[상품 추가하기] 영역이 보여야 한다.', () => {
    cy.get('#product-name-input').should('be.visible');
    cy.get('#product-price-input').should('be.visible');
    cy.get('#product-quantity-input').should('be.visible');
    cy.get('#product-add-button').should('be.visible');
  });

  it('[상품 현황] 영역이 보여야 한다.', () => {
    cy.get('.product-inventory').should('be.visible');
  });

  it('최초 상품 목록은 비워진 상태여야 한다.', () => {
    cy.get('#product-inventory-container').find('.product-manage-name').should('have.length', 0);
  });

  it('상품이 없으면 "등록된 상품이 없습니다."라는 메시지를 보여준다. ', () => {
    cy.get('#product-inventory-container').find('tr').contains('등록된 상품이 없습니다.');
  });

  it('[추가하기] 버튼을 클릭하면 상품이 추가된다.', () => {
    // given
    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(1500);
    cy.get('#product-quantity-input').type(5);

    // when
    cy.get('#product-add-button').click();

    // then
    cy.get('.product-manage-name').should('have.text', '칠성사이다');
    cy.get('.product-manage-price').should('have.text', 1500);
    cy.get('.product-manage-quantity').should('have.text', 5);
  });

  it('상품명, 금액, 수량은 공백을 입력할 수 없다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // when , then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('상품명, 금액, 수량에는 공백을 입력할 수 없습니다.');
      });
  });

  it('상품의 최소 가격은 100원이다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(50);
    cy.get('#product-quantity-input').type(5);

    // when , then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('상품의 최소 가격은 100원입니다.');
      });
  });

  it('상품의 최소 수량은 1개여야 한다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(500);
    cy.get('#product-quantity-input').type(0);

    // when , then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('상품의 최소 수량은 1개입니다.');
      });
  });

  it('상품 가격은 10원으로 나누어 떨어져야 한다.', () => {
    // given
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(105);
    cy.get('#product-quantity-input').type(1);

    // when , then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('상품의 가격은 10원 단위어야 합니다.');
      });
  });

  it('상품이 추가되면 입력 값은 빈 값으로 바뀌어야 한다.', () => {
    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(150);
    cy.get('#product-quantity-input').type(1);

    // when , then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        cy.get('#product-name-input').should('have.value', '');
        cy.get('#product-price-input').should('have.value', '');
        cy.get('#product-quantity-input').should('have.value', '');
      });
  });

  it('같은 상품명의 상품을 추가하면 기존 상품을 새로운 상품으로 대체한다.', () => {
    // given
    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(200);
    cy.get('#product-quantity-input').type(1);
    cy.get('#product-add-button').click();

    // when : 같은 상품명인데 가격과 수량을 다르게 추가한다.
    cy.get('#product-name-input').type('칠성사이다');
    cy.get('#product-price-input').type(500);
    cy.get('#product-quantity-input').type(10);

    // then
    cy.get('#product-add-button')
      .click()
      .then(() => {
        // 기존에 입력한 가격 200과 수량 1은 보이지 않아야 한다.
        cy.get('.product-manage-name').should('have.text', '칠성사이다');
        cy.get('.product-manage-price').should('not.have.text', 200);
        cy.get('.product-manage-quantity').should('not.have.text', 1);
      });
  });
});
