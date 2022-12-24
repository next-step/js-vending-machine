/// <reference types="cypress" />

describe('상품관리 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html');
    cy.get('#vending-machine-manage-menu').click();
  });

  it('최초 자판기가 보유한 금액은 0원이며, 각 동전의 갯수는 0개 이다.', () => {
    const vendingMachineQueryInput = cy.get('#vending-machine-charge-input');
    vendingMachineQueryInput.should('be.empty');

    cy.get('#vending-machine-charge-amount').should('have.text', 0);
    cy.get('#vending-machine-coin-500-quantity').should('have.text', 0);
    cy.get('#vending-machine-coin-100-quantity').should('have.text', 0);
    cy.get('#vending-machine-coin-50-quantity').should('have.text', 0);
    cy.get('#vending-machine-coin-10-quantity').should('have.text', 0);
  });

  it('충전금액은 비어 있으면 안된다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('충전 금액을 10원 이상 입력해주세요!');
    });

    cy.get('#vending-machine-charge-button').click();
  });

  it('충전금액은 10원으로 나누어 떨어져야 한다.', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('충전 금액을 10원 단위로 입력해주세요!');
    });

    cy.get('#vending-machine-charge-input').type('123');
    cy.get('#vending-machine-charge-button').click();
  });

  it('잔돈은 누적되어 충전된다.', () => {
    const plusAmount = 100;
    cy.get('#vending-machine-charge-input').type(plusAmount);
    cy.get('#vending-machine-charge-button').click();

    cy.get('#vending-machine-charge-amount').should('have.text', plusAmount);

    cy.get('#vending-machine-charge-input').clear().type(plusAmount);
    cy.get('#vending-machine-charge-button').click();

    cy.get('#vending-machine-charge-amount').should('have.text', plusAmount * 2);
  });

  it('자판기가 보유한 금액만큼의 동전이 생성된다.', () => {
    cy.get('#vending-machine-charge-input').type(1160);
    cy.get('#vending-machine-charge-button').click();

    cy.get('#vending-machine-charge-amount').should('have.text', 1160);
    cy.get('#vending-machine-coin-500-quantity').should('have.text', 2);
    cy.get('#vending-machine-coin-100-quantity').should('have.text', 1);
    cy.get('#vending-machine-coin-50-quantity').should('have.text', 1);
    cy.get('#vending-machine-coin-10-quantity').should('have.text', 1);
  });

  it('탭을 이동하여도 충전한 금액이 유지되어야한다.', () => {
    cy.get('#vending-machine-charge-input').type(1160);
    cy.get('#vending-machine-charge-button').click();

    cy.get('#vending-machine-charge-amount').should('have.text', 1160);

    // 탭 이동
    cy.get('#product-manage-menu').click();
    cy.get('#vending-machine-manage-menu').click();

    cy.get('#vending-machine-charge-amount').should('have.text', 1160);
  });
});
