import { CHARGE, PRODUCT } from '../../js/constants/message';

const SELECTOR = {
  TAB_PRODUCT_MENU: '#product-manage-menu',
  TAB_CHARGE_MENU: '#vending-machine-manage-menu',

  PRODUCT_NAME: '#product-name-input',
  PRODUCT_PRICE: '#product-price-input',
  PRODUCT_QUANTITY: '#product-quantity-input',
  PRODUCT_ADD_BUTTON: '#product-add-button',

  PRODUCT_MANAGE_NAME: '.product-manage-name',
  PRODUCT_MANAGE_PRICE: '.product-manage-price',
  PRODUCT_MANAGE_QUANTITY: '.product-manage-quantity',

  PRODUCT_LIST: '#product-inventory-container > tr',

  CHARGE_INPUT: '#vending-machine-charge-input',
  CHARGE_BUTTON: '#vending-machine-charge-button',
  CHARGE_AMOUNT: '#vending-machine-charge-amount',

  COIN_QUANTITY_500: '#vending-machine-coin-500-quantity',
  COIN_QUANTITY_100: '#vending-machine-coin-100-quantity',
  COIN_QUANTITY_50: '#vending-machine-coin-50-quantity',
  COIN_QUANTITY_10: '#vending-machine-coin-10-quantity',
};

const addProduct = (value) => {
  const [name, price, amount] = value;
  cy.get('#product-name-input').type(name);
  cy.get('#product-price-input').type(price);
  cy.get('#product-quantity-input').type(amount);

  cy.get('#product-add-button').click();
};

beforeEach(() => {
  cy.visit('/');
});
describe('상품 관리를 한다', () => {
  beforeEach(() => {
    cy.get(SELECTOR.TAB_PRODUCT_MENU).click();
  });
  it('상품 목록은 비워져 있다', () => {
    cy.get(SELECTOR.PRODUCT_MANAGE_NAME).should('have.not.exist');
  });
  it('상품명을 입력할 수 있다', () => {
    cy.get(SELECTOR.PRODUCT_NAME).type('콜라');
  });
  it('상품명은 공백을 입력할 수 없다', () => {
    cy.get(SELECTOR.PRODUCT_NAME).type('사이 ');
    cy.get(SELECTOR.PRODUCT_NAME).should('have.not.value', ' ');
  });
  it('가격은 숫자만 입력할 수 있다', () => {
    cy.get(SELECTOR.PRODUCT_PRICE).type('test');
    cy.get(SELECTOR.PRODUCT_PRICE).should('have.value', '');

    cy.get(SELECTOR.PRODUCT_PRICE).type('3000');
    cy.get(SELECTOR.PRODUCT_PRICE).should('have.value', '3000');
  });
  it('가격은 공백을 입력할 수 없다', () => {
    cy.get(SELECTOR.PRODUCT_PRICE).type('3 ');
    cy.get(SELECTOR.PRODUCT_PRICE).should('have.not.value', ' ');
  });
  it('최소 가격은 100원이고, 10원으로 나눠 떨어진다', () => {
    cy.get(SELECTOR.PRODUCT_NAME).type('콜라');

    cy.get(SELECTOR.PRODUCT_PRICE).type('99');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, PRODUCT.MIN_PRICE);

    cy.get(SELECTOR.PRODUCT_PRICE).type('111');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, PRODUCT.PRICE_UNIT);

    cy.get(SELECTOR.PRODUCT_PRICE).type('200');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
  });
  it('수량은 숫자만 입력할 수 있다', () => {
    cy.get(SELECTOR.PRODUCT_QUANTITY).type('TEST');
    cy.get(SELECTOR.PRODUCT_QUANTITY).should('have.value', '');
  });
  it('수량은 공백을 입력할 수 없다', () => {
    cy.get(SELECTOR.PRODUCT_QUANTITY).type('3 ');
    cy.get(SELECTOR.PRODUCT_QUANTITY).should('have.not.value', ' ');
  });
  it('최소 수량은 1개이다', () => {
    addProduct(['콜라', '200', '0']);
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, PRODUCT.MIN_QUANTITY);
  });
  it('추가하기를 클릭하면 form은 초기화된다', () => {
    addProduct(['콜라', '200', '1']);

    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

    cy.get(SELECTOR.PRODUCT_NAME).should('have.value', '');
    cy.get(SELECTOR.PRODUCT_PRICE).should('have.value', '');
    cy.get(SELECTOR.PRODUCT_QUANTITY).should('have.value', '');
  });
  it('추가하기를 클릭하면 상품 목록에 표기된다', () => {
    addProduct(['콜라', '200', '1']);

    cy.get(SELECTOR.PRODUCT_ADD_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.PRODUCT_LIST).should('have.length', 1);
      });
  });
  it('같은 상품명의 데이터를 추가하면 대체된다', () => {
    addProduct(['콜라', '200', '1']);
    addProduct(['콜라', '2000', '5']);
    cy.get(SELECTOR.PRODUCT_LIST).should('have.length', 1);
    cy.get(SELECTOR.PRODUCT_LIST).should('contain', '콜라');
    cy.get(SELECTOR.PRODUCT_LIST).should('contain', '2000');
    cy.get(SELECTOR.PRODUCT_LIST).should('contain', '5');
  });
});

describe('잔돈 충전을 한다.', () => {
  beforeEach(() => {
    cy.get(SELECTOR.TAB_CHARGE_MENU).click();
  });
  it('최초 자판기는 보유 금액이 0원이다', () => {
    cy.get(SELECTOR.CHARGE_AMOUNT).should('exist');
    cy.get(SELECTOR.CHARGE_AMOUNT).should('contain', '0');
  });
  it('자판기가 보유한 동전은 각각 0개이다', () => {
    cy.get(SELECTOR.COIN_QUANTITY_500).should('exist');
    cy.get(SELECTOR.COIN_QUANTITY_500).should('contain', '0개');

    cy.get(SELECTOR.COIN_QUANTITY_100).should('exist');
    cy.get(SELECTOR.COIN_QUANTITY_100).should('contain', '0개');

    cy.get(SELECTOR.COIN_QUANTITY_50).should('exist');
    cy.get(SELECTOR.COIN_QUANTITY_50).should('contain', '0개');

    cy.get(SELECTOR.COIN_QUANTITY_10).should('exist');
    cy.get(SELECTOR.COIN_QUANTITY_10).should('contain', '0개');
  });
  it('충전을 할 수 있다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).should('exist');
    cy.get(SELECTOR.CHARGE_INPUT).type('1000원');

    cy.get(SELECTOR.CHARGE_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.CHARGE_AMOUNT).should('contain', '1000');
      });
  });
  it('충전할 금액이 최소금액보다 작으면 alert가 발생한다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('90원');
    cy.alertMessage(SELECTOR.CHARGE_BUTTON, CHARGE.MIN_AMOUNT);
  });
  it('충전할 금액이 10원으로 나누어 떨어지지 않으면 alert가 발생한다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('111원');
    cy.alertMessage(SELECTOR.CHARGE_BUTTON, CHARGE.AMOUNT_UNIT);
  });
  it('잔돈을 누적해서 충전할 수 있다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('1000');
    cy.get(SELECTOR.CHARGE_BUTTON).click();

    cy.get(SELECTOR.CHARGE_INPUT).type('1500');
    cy.get(SELECTOR.CHARGE_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.CHARGE_AMOUNT).should('contain', '2500');
      });
  });

  it('다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('2500');
    cy.get(SELECTOR.CHARGE_BUTTON).click();
    cy.get(SELECTOR.TAB_PRODUCT_MENU).click();
    cy.get(SELECTOR.TAB_CHARGE_MENU)
      .click()
      .then(() => {
        cy.get(SELECTOR.CHARGE_AMOUNT).should('contain', '2500');
      });
  });
});
