import { COINS, ERRORS } from '../../src/js/constants/index.js';

const typeProduct = ({ name, price, quantity }) => {
  cy.get('input').eq(0).type(name);
  cy.get('input').eq(1).type(price);
  cy.get('input').eq(2).type(quantity);
};

context('자판기 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  context('최초 렌더링 시에, localStorage에 작업내역이 없다면', () => {
    it('상품 목록은 비워진 상태이다.', () => {
      cy.clearLocalStorage().should((ls) => {
        expect(ls.getItem('ns-vending-machine')).to.be.null;
      });

      cy.get('#product-inventory-container').children().contains('상품리스트가 존재하지 않습니다.');
    });
    it('잔돈은 0원이다.', () => {
      cy.clearLocalStorage().should((ls) => {
        expect(ls.getItem('ns-vending-machine')).to.be.null;
      });

      cy.get('#vending-machine-manage-menu').click();

      cy.get('#vending-machine-charge-amount').contains('0');
      cy.get('.cashbox-remaining tr').eq(1).should('contain', '0');
      cy.get('.cashbox-remaining tr').eq(2).should('contain', '0');
      cy.get('.cashbox-remaining tr').eq(3).should('contain', '0');
      cy.get('.cashbox-remaining tr').eq(4).should('contain', '0');
    });
  });

  context('상품을 추가하지 못하는 경우', () => {
    it('상품명, 금액, 수량은 공백이 불가능하다.', () => {
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().contains('상품리스트가 존재하지 않습니다.');
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '0' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().contains('상품리스트가 존재하지 않습니다.');
    });

    it('상품 가격이 10원으로 나누어 떨어지지 않는 경우 경고창 발생', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      typeProduct({ name: '테스트 상품', price: '111', quantity: '111' });
      cy.get('#product-add-button').click();

      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERRORS.PRICE_UNIT);
      cy.get('#product-inventory-container').children().contains('상품리스트가 존재하지 않습니다.');
    });
  });

  context('상품이 정상적으로 등록된 경우', () => {
    it('상품명, 금액, 수량을 정상 입력한 경우 상품이름, 가격, 수량 순으로 보여진다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-inventory-container')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
    });

    it('상품이 등록된 후, 입력창은 초기화 된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-inventory-container')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
      cy.get('input').eq(0).should('have.value', '');
      cy.get('input').eq(1).should('have.value', '');
      cy.get('input').eq(2).should('have.value', '');
    });

    it('중복되는 상품이름을 추가하는 경우 덮어쓰기 된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      typeProduct({ name: '테스트 상품', price: '20000', quantity: '10' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-inventory-container')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('20000');
          cy.get('td').eq(2).contains('10');
        });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지된다.', () => {
      typeProduct({ name: '테스트 상품', price: '10000', quantity: '5' });
      cy.get('#product-add-button').click();

      cy.get('#product-inventory-container').children().should('have.length', 1);
      cy.get('#product-inventory-container')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });

      cy.get('#vending-machine-manage-menu').click();
      cy.get('#product-manage-menu').click();
      cy.get('#product-inventory-container')
        .eq(0)
        .within(() => {
          cy.get('td').eq(0).contains('테스트 상품');
          cy.get('td').eq(1).contains('10000');
          cy.get('td').eq(2).contains('5');
        });
    });
  });
  context('잔돈 충전을 못하는 경우', () => {
    it('충전금액이 10원으로 나누어 떨어지지 않는 경우 경고창 발생', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      cy.get('#vending-machine-manage-menu').click();
      cy.get('#vending-machine-charge-input').type(111);
      cy.get('#vending-machine-charge-button').click();

      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERRORS.AMOUNT_UNIT);
    });
  });

  context('잔돈 충전이 정상동작하는 경우', () => {
    it('자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다.', () => {
      cy.get('#vending-machine-manage-menu').click();
      cy.get('#vending-machine-charge-input').type(1000);
      cy.get('#vending-machine-charge-button').click();

      cy.get('#vending-machine-charge-amount').should('contain', '1000');
    });
    it('잔돈을 누적하여 충전할 수 있다.', () => {
      cy.get('#vending-machine-manage-menu').click();
      cy.get('#vending-machine-charge-amount').should('contain', '1000');

      cy.get('#vending-machine-charge-input').type(500);
      cy.get('#vending-machine-charge-button').click();

      cy.get('#vending-machine-charge-amount').should('contain', '1500');
    });
    it('자판기가 보유한 금액만큼 동전이 무작위로 생성된다.', () => {
      let total = 0;
      const coins = [COINS[500], COINS[100], COINS[50], COINS[10]];

      cy.get('#vending-machine-manage-menu').click();
      cy.get('#vending-machine-charge-input').type(1000);
      cy.get('#vending-machine-charge-button').click();

      cy.get('.cashbox-remaining tbody tr')
        .each(($tr, index) => {
          const price = coins[index] * Number($tr[0].children[1].innerText.slice(0, -1));
          total += price;
        })
        .then(() => {
          cy.get('#vending-machine-charge-amount').should('have.text', total);
        });
    });
    it('다른 탭을 클릭하여도 잔돈은 유지 되어야 한다.', () => {
      cy.get('#vending-machine-manage-menu').click();
      cy.get('#vending-machine-charge-amount').should('contain', '2500');

      cy.get('#product-manage-menu').click();
      cy.get('#vending-machine-manage-menu').click();

      cy.get('#vending-machine-charge-amount').should('contain', '2500');
    });
  });
});
