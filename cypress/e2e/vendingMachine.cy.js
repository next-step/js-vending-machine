import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage';
import { SELECTOR } from '../../src/js/constants/selector';

const INDEX = {
  NAME: 0,
  PRICE: 1,
  QUANTITY: 2,
};

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

      cy.typeProductPrice(1000);
      cy.typeProductQuantity(5);

      cy.clickProductAddButton().then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('금액은 공백이 불가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.typeProductName('coke');
      cy.typeProductQuantity(5);

      cy.clickProductAddButton().then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('수량은 공백이 불가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.typeProductName('coke');
      cy.typeProductPrice(1000);

      cy.clickProductAddButton().then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addProduct({ name: 'coke', price: 1000, quantity: 0 }).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
      });
    });

    it('상품의 최소 가격은 100원이여야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addProduct({ name: 'coke', price: 50, quantity: 5 }).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE);
      });
    });

    it('상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addProduct({ name: 'coke', price: 1455, quantity: 3 }).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
      });
    });

    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
      const vitamin = { name: 'vitamin', price: 5000, quantity: 2 };
      const hot6 = { name: 'hot6', price: 2000, quantity: 3 };
      const coke = { name: 'coke', price: 2500, quantity: 10 };

      cy.addProduct(vitamin);
      cy.addProduct(hot6);
      cy.addProduct(coke);

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          if ($tr.children()[INDEX.NAME].textContent !== 'hot6') return;

          expect($tr.children()[INDEX.NAME].textContent).to.equal(hot6.name);
          expect(Number($tr.children()[INDEX.PRICE].textContent)).to.equal(hot6.price);
          expect(Number($tr.children()[INDEX.QUANTITY].textContent)).to.equal(hot6.quantity);
        });

      const modifiedHot6 = { name: 'hot6', price: 1500, quantity: 5 };
      cy.addProduct(modifiedHot6);

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          if ($tr.children()[INDEX.NAME].textContent !== 'hot6') return;

          expect($tr.children()[INDEX.NAME].textContent).to.equal(modifiedHot6.name);
          expect(Number($tr.children()[INDEX.PRICE].textContent)).to.equal(modifiedHot6.price);
          expect(Number($tr.children()[INDEX.QUANTITY].textContent)).to.equal(modifiedHot6.quantity);
        });
    });

    it('상품을 추가하고 나면 상품의 이름, 가격, 수량순으로 상품 목록이 보여진다.', () => {
      const vitamin = { name: 'vitamin', price: 5000, quantity: 2 };
      cy.addProduct(vitamin);

      const hot6 = { name: 'hot6', price: 2000, quantity: 3 };
      cy.addProduct(hot6);

      const products = [vitamin, hot6];

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($tr, idx) => {
          expect($tr.children()[INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($tr.children()[INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($tr.children()[INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
        });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지된다.', () => {
      const vitamin = { name: 'vitamin', price: 5000, quantity: 2 };
      cy.addProduct(vitamin);

      const hot6 = { name: 'hot6', price: 2000, quantity: 3 };
      cy.addProduct(hot6);

      const products = [vitamin, hot6];

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
        });

      cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();
      cy.get(SELECTOR.PRODUCT_MANAGE_MENU).click();

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
        });
    });
  });
});
