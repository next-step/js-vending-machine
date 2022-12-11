import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage';
import { SELECTOR } from '../../src/js/constants/selector';

beforeEach(() => {
  cy.visit('index.html');
});

describe('상품관리 탭을 테스트한다.', () => {
  context('상품을 추가할 때', () => {
    it('최초 상품 목록은 비워진 상태이다.', () => {
      cy.get('#product-inventory-container').children().should('have.length', 0);
    });

    it('상품명은 공백이 불가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1000);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(5);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
        });
    });

    it('금액은 공백이 불가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(5);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
        });
    });

    it('수량은 공백이 불가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1000);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
        });
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1000);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(0);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
        });
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1000);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(0);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
        });
    });

    it('상품의 최소 가격은 100원이여야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(50);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(5);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE);
        });
    });

    it('상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1455);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(5);

      cy.get('#product-add-button')
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
        });
    });

    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('vitamin');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(5000);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(2);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('hot6');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(2000);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(3);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('coke');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(2500);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(10);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el) => {
          if ($el.children()[0].textContent !== 'hot6') return;

          expect($el.children()[0].textContent).to.equal('hot6');
          expect($el.children()[1].textContent).to.equal('2000');
          expect($el.children()[2].textContent).to.equal('3');
        });

      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type('hot6');
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(1500);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(5);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el) => {
          if ($el.children()[0].textContent !== 'hot6') return;

          expect($el.children()[0].textContent).to.equal('hot6');
          expect($el.children()[1].textContent).to.equal('1500');
          expect($el.children()[2].textContent).to.equal('5');
        });
    });

    it('상품을 추가하고 나면 상품의 이름, 가격, 수량순으로 상품 목록이 보여진다.', () => {
      const product1Name = 'vitamin';
      const product1Price = 5000;
      const product1Quantity = 2;
      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(product1Name);
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(product1Price);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(product1Quantity);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      const vitamin = { name: product1Name, price: product1Price, quantity: product1Quantity };

      const product2Name = 'hot6';
      const product2Price = 2000;
      const product2Quantity = 3;
      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(product2Name);
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(product2Price);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(product2Quantity);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      const hot6 = { name: product2Name, price: product2Price, quantity: product2Quantity };

      const products = [vitamin, hot6];

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[0].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[1].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[2].textContent)).to.equal(products[idx].quantity);
        });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지된다.', () => {
      const product1Name = 'vitamin';
      const product1Price = 5000;
      const product1Quantity = 2;
      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(product1Name);
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(product1Price);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(product1Quantity);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      const vitamin = { name: product1Name, price: product1Price, quantity: product1Quantity };

      const product2Name = 'hot6';
      const product2Price = 2000;
      const product2Quantity = 3;
      cy.get(SELECTOR.PRODUCT_NAME_INPUT).type(product2Name);
      cy.get(SELECTOR.PRODUCT_PRICE_INPUT).type(product2Price);
      cy.get(SELECTOR.PRODUCT_QUANTITY_INPUT).type(product2Quantity);
      cy.get(SELECTOR.PRODUCT_ADD_BUTTON).click();

      const hot6 = { name: product2Name, price: product2Price, quantity: product2Quantity };

      const products = [vitamin, hot6];

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[0].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[1].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[2].textContent)).to.equal(products[idx].quantity);
        });

      cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();
      cy.get(SELECTOR.PRODUCT_MANAGE_MENU).click();

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[0].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[1].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[2].textContent)).to.equal(products[idx].quantity);
        });
    });
  });
});
