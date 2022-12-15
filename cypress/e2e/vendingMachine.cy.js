import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage';
import { SELECTOR } from '../../src/js/constants/selector';

const PRODUCT_INDEX = {
  NAME: 0,
  PRICE: 1,
  QUANTITY: 2,
};

const getAlertStub = () => {
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  return alertStub;
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
      const stub = getAlertStub();

      cy.typeProductPrice(1000);
      cy.typeProductQuantity(5);
      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('금액은 공백이 불가능하다.', () => {
      const stub = getAlertStub();

      cy.typeProductName('coke');
      cy.typeProductQuantity(5);

      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('수량은 공백이 불가능하다.', () => {
      const stub = getAlertStub();

      cy.typeProductName('coke');
      cy.typeProductPrice(1000);

      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.EMPTY_INPUT);
      });
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 1000, quantity: 0 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_QUANTITY);
      });
    });

    it('상품의 최소 가격은 100원이여야 한다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 50, quantity: 5 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_MIN_PRICE);
      });
    });

    it('상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 1455, quantity: 3 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.INVALID_PRODUCT_PRICE_UNIT);
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
          if ($tr.children()[PRODUCT_INDEX.NAME].textContent !== 'hot6') return;

          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(hot6.name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(hot6.price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(hot6.quantity);
        });

      const modifiedHot6 = { name: 'hot6', price: 1500, quantity: 5 };
      cy.addProduct(modifiedHot6);

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          if ($tr.children()[PRODUCT_INDEX.NAME].textContent !== 'hot6') return;

          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(modifiedHot6.name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(modifiedHot6.price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(modifiedHot6.quantity);
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
          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
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
          expect($el.children()[PRODUCT_INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
        });

      cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();
      cy.get(SELECTOR.PRODUCT_MANAGE_MENU).click();

      cy.get(SELECTOR.PRODUCT_INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          expect($el.children()[PRODUCT_INDEX.NAME].textContent).to.equal(products[idx].name);
          expect(Number($el.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(products[idx].price);
          expect(Number($el.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(products[idx].quantity);
        });
    });
  });
});

describe('잔돈 충전 탭을 테스트한다.', () => {
  context('잔돈 충전을 할 때', () => {
    beforeEach(() => {
      cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();
    });
    it('최초의 자판기 보유 금액은 0원이고, 각 동전의 개수는 0개이다.', () => {
      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '0');

      cy.get(SELECTOR.VENDING_MACHINE_COIN_500_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE_COIN_100_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE_COIN_50_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE_COIN_10_QUANTITY).should('have.text', '0개');
    });

    it('최소 충전 금액은 100원이다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addCharge(50).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_VENDING_MACHINE_MIN_CHARGE);
      });
    });

    it('충전 금액은 10원으로 나누어 떨어지는 금액만 충전이 가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addCharge(1045).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_VENDING_MACHINE_CHARGE_UNIT);
      });
    });

    it('자판기가 보유한 금액은 {금액}원 형식으로 나타낸다', () => {
      cy.addCharge(1200);

      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '1200');
    });

    it('잔돈은 누적하여 충전할 수 있다', () => {
      cy.addCharge(1200);

      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '1200');

      cy.addCharge(1800);

      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '3000');
    });

    // it('자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.', () => {
    //   cy.get(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).type(5000);
    //   cy.get(SELECTOR.VENDING_MACHINE_CHARGE_BUTTON).click();
    //   // 생성된 동전 개수를 객체에 담아서 변수에 저장

    //   // 초기화
    //   cy.visit('index.html');
    //   cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();

    //   cy.get(SELECTOR.VENDING_MACHINE_CHARGE_INPUT).type(5000);
    //   cy.get(SELECTOR.VENDING_MACHINE_CHARGE_BUTTON).click();
    //   // 생성된 동전 개수를 객체에 담아서 변수에 저장

    //   // 2개의 변수를 비교하여 다르면, 무작위로 생성되었다고 가정한다.
    // });

    it('자판기가 보유한 동전의 개수는 {개수}개 형식으로 나타낸다', () => {
      cy.addCharge(1760);

      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE_COIN_500_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE_COIN_100_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE_COIN_50_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE_COIN_10_QUANTITY);
    });

    it('다른 탭을 클릭해도 자판기가 보유한 금액은 유지된다.', () => {
      cy.addCharge(1000);
      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '1000');

      cy.get(SELECTOR.PRODUCT_MANAGE_MENU).click();
      cy.get(SELECTOR.VENDING_MACHINE_MANAGE_MENU).click();

      cy.get(SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT).should('have.text', '1000');
    });
  });
});
