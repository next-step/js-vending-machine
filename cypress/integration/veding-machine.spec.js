import { ERROR } from '../../dist/ts/utils/message.js';

describe('자판기 미션 테스트', () => {
  context('[STEP1] 상품관리', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('1. 초기화면 - 상품관리, 잔돈 충전, 상품 구매 버튼과 상품 추가 탭이 노출된다.', () => {
      cy.initialView();
    });

    it('2. 상풍명, 가격, 수량을 입력하고 추가 버튼을 클릭하면, 상품 현황에 상품이 추가된다.', () => {
      const item = {
        title: '아이스 아메리카노',
        price: 1500,
        quantity: 5
      };

      cy.get('#product-name-input').type(item.title);
      cy.get('#product-price-input').type(item.price);
      cy.get('#product-quantity-input').type(item.quantity);
      cy.get('#product-add-button').click();
      cy.get('.product-inventory tr').should('have.length', 2);
      cy.get('.product-inventory tr')
        .last()
        .contains(item.title)
        .siblings()
        .contains(item.price)
        .siblings()
        .contains(item.quantity);
    });

    it('3. 상품 가격은 100원 이상이어야 한다. 100원 미만으로 입력한 경우, alert가 뜬다.', () => {
      const item = {
        title: '아이스 아메리카노',
        price: 30,
        quantity: 5
      };

      cy.invalidProductInput(item, ERROR.LESS_THAN_MIN_PRICE);
    });

    it('4. 상품 가격은 10원 단위로 나누어떨어져야한다. 나누어 떨어지지 않으면, alert가 뜬다.', () => {
      const item = {
        title: '아이스 아메리카노',
        price: 3333,
        quantity: 5
      };
      cy.invalidProductInput(item, ERROR.NOT_DIVIDED_PRICE);
    });

    it('5. 상품 수량은 최소 1개 이상 입력해야 한다.', () => {
      const item = {
        title: '아이스 아메리카노',
        price: 3000,
        quantity: 0
      };
      cy.invalidProductInput(item, ERROR.LESS_THAN_MIN_QUANTITY);
    });
  });
});
