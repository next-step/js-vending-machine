const SELECTOR = {
  PRODUCT_NAME: '#product-name-input',
  PRODUCT_PRICE: '#product-price-input',
  PRODUCT_QUANTITY: '#product-quantity-input',
  PRODUCT_ADD_BUTTON: '#product-add-button',

  PRODUCT_MANAGE_NAME: '.product-manage-name',
  PRODUCT_MANAGE_PRICE: '.product-manage-price',
  PRODUCT_MANAGE_QUANTITY: '.product-manage-quantity',

  CHARGE_INPUT: '#charge-input',
  CHARGE_BUTTON: '#charge-button',
  CHARGE_AMOUNT: '#charge-amount',

  COIN_QUANTITY_500: '#coin-500-quantity',
  COIN_QUANTITY_100: '#coin-100-quantity',
  COIN_QUANTITY_50: '#coin-50-quantity',
  COIN_QUANTITY_10: '#coin-10-quantity',
};

const MESSAGE = {
  PRODUCT_MIN_PRICE: '최소 가격은 100원입니다.',
  PRODUCT_PRICE_UNIT: '가격 단위는 10원입니다.',
  PRODUCT_MIN_QUANTITY: '최소 수량은 1개입니다.',

  CHARGE_AMOUNT_MIN: '최소 충전 금액은 100원입니다.',
  CHARGE_AMOUNT_UNIT: '충전 금액은 10원단위이다.',
};

beforeEach(() => {
  cy.visit('/');
});
describe('상품 관리를 한다', () => {
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
    cy.get(SELECTOR.PRODUCT_PRICE).type('99');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, MESSAGE.PRODUCT_MIN_PRICE);

    cy.get(SELECTOR.PRODUCT_PRICE).type('111');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, MESSAGE.PRODUCT_PRICE_UNIT);

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
    cy.get(SELECTOR.PRODUCT_QUANTITY).type('0');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();
    cy.alertMessage(SELECTOR.PRODUCT_ADD_BUTTON, MESSAGE.PRODUCT_MIN_QUANTITY);
  });
  it('추가하기를 클릭하면 form은 초기화된다', () => {
    cy.get(SELECTOR.PRODUCT_NAME).type('콜라');
    cy.get(SELECTOR.PRODUCT_PRICE).type('200');
    cy.get(SELECTOR.PRODUCT_QUANTITY).type('1');
    cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

    cy.get(SELECTOR.PRODUCT_NAME).should('have.value', '');
    cy.get(SELECTOR.PRODUCT_PRICE).should('have.value', '');
    cy.get(SELECTOR.PRODUCT_QUANTITY).should('have.value', '');
  });
  it('추가하기를 클릭하면 상품 목록에 표기된다', () => {});
  it('같은 상품명의 데이터를 추가하면 대체된다', () => {});
});

describe('잔돈 충전을 한다.', () => {
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
  it('충전할 금액을 입력해 충전할 수 있다', () => {
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
    cy.alertMessage(SELECTOR.CHARGE_BUTTON, MESSAGE.CHARGE_AMOUNT_MIN);
  });
  it('충전할 금액이 10원으로 나누어 떨어지지 않으면 alert가 발생한다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('111원');
    cy.alertMessage(SELECTOR.CHARGE_BUTTON, MESSAGE.CHARGE_AMOUNT_UNIT);
  });
  it('잔돈을 누적해서 충전할 수 있다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('1000원');
    cy.get(SELECTOR.CHARGE_BUTTON).click();

    cy.get(SELECTOR.CHARGE_INPUT).type('1500원');
    cy.get(SELECTOR.CHARGE_BUTTON).click();

    cy.get(SELECTOR.CHARGE_AMOUNT).should('contain', '2500원');
  });
  it('자판기가 보유한 금액 만큼 동전이 생성된다', () => {
    cy.get(SELECTOR.CHARGE_INPUT).type('2500원');
    cy.get(SELECTOR.CHARGE_BUTTON).click();

    cy.get(SELECTOR.COIN_QUANTITY_500).should('have.val', '5개');
  });
});
