import { STORAGE, VENDING_MACHINE_INITIAL_STATE } from '../../src/constants/common.js';
import { $ELEMENT } from '../../src/constants/element.js';

const [NAME, PRICE, QUANTITY] = ['콜라', 1000, 12];
const [MODIFIED_PRICE, MODIFIED_QUANTITY] = [1500, 10];
const VALID_CHARGE_AMOUNT = 180;

describe('상품 관리하기', () => {
  beforeEach(() => {
    cy.visit('../../index.html', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem(STORAGE.KEY, JSON.stringify(VENDING_MACHINE_INITIAL_STATE));
      },
    });
  });

  context('상품 입력 시', () => {
    it('상품명, 금액, 수량을 입력할 수 있는 input이 있어야한다.', () => {
      cy.get($ELEMENT.NAME_INPUT).should('exist');
      cy.get($ELEMENT.PRICE_INPUT).should('exist');
      cy.get($ELEMENT.QUANTITY_INPUT).should('exist');
    });

    it('상품리스트를 보여줄 테이블이 존재해야한다.', () => {
      cy.get($ELEMENT.INVENTORY_CONTAINER).should('exist');
    });

    it('최초 상품목록은 비워진 상태이다', () => {
      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 0);
    });

    it('상품명, 금액, 수량을 입력할 수 있는 input은 빈 값의 상태로 초기 렌더 되어야한다.', () => {
      cy.get($ELEMENT.NAME_INPUT).should('have.value', '');
      cy.get($ELEMENT.PRICE_INPUT).should('have.value', '');
      cy.get($ELEMENT.QUANTITY_INPUT).should('have.value', '');
    });

    it('상품을 추가하기 위한 버튼이 존재해야한다. ', () => {
      cy.get($ELEMENT.ADD_BUTTON).should('exist');
    });

    it('상품 제출 시 상품명을 적지 않은 경우 버튼이 활성화 되지 않는다.', () => {
      cy.typeProduct({ name: '', price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).should('be.disabled');
    });

    it('상품 제출 시 최소 수량 1개 이상이 되지 않는 경우 버튼이 활성화 되지 않는다.', () => {
      cy.get($ELEMENT.NAME_INPUT).clear();
      cy.get($ELEMENT.PRICE_INPUT).clear();
      cy.get($ELEMENT.QUANTITY_INPUT).clear();
      cy.typeProduct({ name: NAME, price: PRICE, quantity: 0.2 });
      cy.get($ELEMENT.ADD_BUTTON).should('be.disabled');
    });

    it('상품의 최소가격은 100원이며 그 미만으로 입력되는 경우 경고창이 떠야한다.', () => {
      cy.typeProduct({ name: NAME, price: 80, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).should('not.be.disabled');
      cy.get($ELEMENT.ADD_BUTTON).click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 가격입니다. 상품의 최소가격은 100원이며 10원으로 나누어 떨어져야 합니다.'
        );
      });
    });

    it('상품의 가격은 10원으로 나누어 떨어져야 하며 그렇지 않을 경우 경고창이 떠야한다.', () => {
      cy.typeProduct({ name: NAME, price: 82, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).should('not.be.disabled');
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 가격입니다. 상품의 최소가격은 100원이며 10원으로 나누어 떨어져야 합니다.'
        );
      });
    });
  });

  context('상품 등록 시', () => {
    it('유효성에 알맞는 값 입력 후 추가하기 버튼 클릭 시 추가된 상품을 확인할 수 있어야한다.', () => {
      cy.typeProduct({ name: NAME, price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);

      cy.contains('td', NAME);
      cy.contains('td', PRICE);
      cy.contains('td', QUANTITY);
    });

    it('같은 상품명의 다른 가격 데이터 추가 시 동일 이름의 상품이 있는 경우 새로운 상품 내용으로 대체되어야 한다.', () => {
      cy.typeProduct({ name: NAME, price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', PRICE);
      cy.contains('td', QUANTITY);

      cy.typeProduct({ name: NAME, price: MODIFIED_PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', MODIFIED_PRICE);
      cy.contains('td', QUANTITY);

      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);
    });

    it('같은 상품명의 다른 수량 데이터 추가 시 동일 이름의 상품이 있는 경우 새로운 상품 내용으로 대체되어야 한다.', () => {
      cy.typeProduct({ name: NAME, price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', PRICE);
      cy.contains('td', QUANTITY);

      cy.typeProduct({ name: NAME, price: PRICE, quantity: MODIFIED_QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', PRICE);
      cy.contains('td', MODIFIED_QUANTITY);

      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);
    });

    it('같은 상품명의 다른 수량 데이터, 가격 추가 시 동일 이름의 상품이 있는 경우 새로운 상품 내용으로 대체되어야 한다.', () => {
      cy.typeProduct({ name: NAME, price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', PRICE);
      cy.contains('td', QUANTITY);

      cy.typeProduct({ name: NAME, price: MODIFIED_PRICE, quantity: MODIFIED_QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();

      cy.contains('td', NAME);
      cy.contains('td', MODIFIED_PRICE);
      cy.contains('td', MODIFIED_QUANTITY);

      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);
    });
  });

  context('탭 이동 시', () => {
    it('다른 탭으로 이동 후 다시 돌아와도 기존의 목록이 유지되어야 한다.', () => {
      cy.typeProduct({ name: NAME, price: PRICE, quantity: QUANTITY });
      cy.get($ELEMENT.ADD_BUTTON).click();
      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);

      cy.get($ELEMENT.VENDING_MACHINE_MANANGE_MENU).click();
      cy.get($ELEMENT.PRODUCT_MANGNE_MENU).click();

      cy.get($ELEMENT.INVENTORY_CONTAINER).children().should('have.length', 1);
    });
  });
});

describe('잔돈 충전하기', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
    cy.get($ELEMENT.VENDING_MACHINE_MANANGE_MENU).click();
  });
  context('잔돈 입력 시', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    });

    it('충전 값을 입력할 input이 존재해야 한다.', () => {
      cy.get($ELEMENT.CHARGE_INPUT).should('exist');
    });

    it('충전 값을 제출할 버튼이 존재해야 한다.', () => {
      cy.get($ELEMENT.CHARGE_BUTTON).should('exist');
    });

    it('충전된 총 금액을 보여줄 텍스트가 존재해야 한다.', () => {
      cy.get($ELEMENT.CHARGE_AMOUNT).should('exist');
    });

    it('최초 자판기가 보유한 금액은 0원이며 동전의 개수도 0개이다', () => {
      const INITIAL_VALUE = 0;
      cy.get($ELEMENT.CHARGE_AMOUNT).should('have.text', INITIAL_VALUE);
      cy.get($ELEMENT.COIN_500_COUNT).should('have.text', INITIAL_VALUE);
      cy.get($ELEMENT.COIN_100_COUNT).should('have.text', INITIAL_VALUE);
      cy.get($ELEMENT.COIN_50_COUNT).should('have.text', INITIAL_VALUE);
      cy.get($ELEMENT.COIN_10_COUNT).should('have.text', INITIAL_VALUE);
    });
  });

  context('잔돈 충전  시', () => {
    it('충전된 잔돈을 보여줄 테이블이 존재해야 한다.', () => {
      cy.get($ELEMENT.CASH_BOX_CONTAINER).should('exist');
    });

    it('최소 충전금액은 100원이며 그렇지 않을경우 경고창을 띄워준다.', () => {
      const INVALID_CHARGE_AMOUNT = 80;
      cy.get($ELEMENT.CHARGE_INPUT).type(INVALID_CHARGE_AMOUNT);
      cy.get($ELEMENT.CHARGE_BUTTON).click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 충전 가격입니다. 충전 최소금액은 100원이며 10원으로 나누어 떨어져야 합니다.'
        );
      });
    });

    it('10원으로 나누어 떨어지는 금액만 충전이 가능하다. 그렇지 않은 경우 경고창을 띄워준다.', () => {
      const INVALID_CHARGE_AMOUNT = 82;
      cy.get($ELEMENT.CHARGE_INPUT).type(INVALID_CHARGE_AMOUNT);
      cy.get($ELEMENT.CHARGE_BUTTON).click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 충전 가격입니다. 충전 최소금액은 100원이며 10원으로 나누어 떨어져야 합니다.'
        );
      });
    });
  });

  context('탭 이동 시', () => {
    it('다른 탭으로 이동 후 다시 돌아와도 자판기가 보유한 금액은 유지되어야 한다.', () => {
      it('다른 탭으로 이동 후 다시 돌아와도 기존의 목록이 유지되어야 한다.', () => {
        cy.get($ELEMENT.CHARGE_INPUT).type(VALID_CHARGE_AMOUNT);
        cy.get($ELEMENT.CHARGE_BUTTON).click();

        cy.get($ELEMENT.CHARGE_AMOUNT).should('have.text', VALID_CHARGE_AMOUNT);

        cy.get($ELEMENT.PRODUCT_MANGNE_MENU).click();
        cy.get($ELEMENT.VENDING_MACHINE_MANANGE_MENU).click();

        cy.get($ELEMENT.CHARGE_AMOUNT).should('have.text', VALID_CHARGE_AMOUNT);
      });
    });
  });
});

describe('새로고침 시', () => {
  beforeEach(() => {
    cy.visit('../../index.html', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem(STORAGE.KEY, JSON.stringify(VENDING_MACHINE_INITIAL_STATE));
      },
    });
  });
  it('새로고침 진행 시에도 최근 작업한 정보를 보여줘야한다', () => {
    cy.typeProduct({ name: NAME, price: MODIFIED_PRICE, quantity: MODIFIED_QUANTITY });
    cy.get($ELEMENT.ADD_BUTTON).click();

    cy.reload();

    cy.contains('td', NAME);
    cy.contains('td', MODIFIED_PRICE);
    cy.contains('td', MODIFIED_QUANTITY);

    cy.get($ELEMENT.VENDING_MACHINE_MANANGE_MENU).click();

    cy.get($ELEMENT.CHARGE_INPUT).type(VALID_CHARGE_AMOUNT);
    cy.get($ELEMENT.CHARGE_BUTTON).click();

    cy.get($ELEMENT.CHARGE_AMOUNT).should('have.text', VALID_CHARGE_AMOUNT);

    cy.reload();

    cy.get($ELEMENT.CHARGE_AMOUNT).should('have.text', VALID_CHARGE_AMOUNT);
  });
});
