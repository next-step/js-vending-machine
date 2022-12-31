import { ERROR_MESSAGE } from '../../src/js/constants/errorMessage';
import { SELECTOR } from '../../src/js/constants/selector';
import { CHARGE_KEY, COINS_KEY } from '../../src/js/constants/storage';

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
      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER).children().should('have.length', 0);
    });

    it('상품명은 공백이 불가능하다.', () => {
      const stub = getAlertStub();

      cy.typeProductPrice(1000);
      cy.typeProductQuantity(5);

      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.COMMON.EMPTY_INPUT);
      });
    });

    it('금액은 공백이 불가능하다.', () => {
      const stub = getAlertStub();

      cy.typeProductName('coke');
      cy.typeProductQuantity(5);

      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.COMMON.EMPTY_INPUT);
      });
    });

    it('수량은 공백이 불가능하다.', () => {
      const stub = getAlertStub();

      cy.typeProductName('coke');
      cy.typeProductPrice(1000);

      cy.clickProductAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.COMMON.EMPTY_INPUT);
      });
    });

    it('상품의 최소 수량은 1개여야 한다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 1000, quantity: 0 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.PRODUCT.INVALID_MIN_QUANTITY);
      });
    });

    it('상품의 가격이 100원 이하면 alert가 뜬다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 80, quantity: 5 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.PRODUCT.INVALID_MIN_PRICE);
      });
    });

    it('상품의 최소 가격은 100원이여야 한다.', () => {
      const coke = { name: 'coke', price: 100, quantity: 5 };
      cy.addProduct(coke);

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(coke.name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(coke.price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(coke.quantity);
        });
    });

    it('상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
      const stub = getAlertStub();

      cy.addProduct({ name: 'coke', price: 1455, quantity: 3 }).then(() => {
        stub.calledWith(ERROR_MESSAGE.PRODUCT.INVALID_PRICE_UNIT);
      });
    });

    it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
      const vitamin = { name: 'vitamin', price: 5000, quantity: 2 };
      const hot6 = { name: 'hot6', price: 2000, quantity: 3 };
      const coke = { name: 'coke', price: 2500, quantity: 10 };

      cy.addProduct(vitamin);
      cy.addProduct(hot6);
      cy.addProduct(coke);

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          if ($tr.children()[PRODUCT_INDEX.NAME].textContent !== 'hot6') return;

          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(hot6.name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(hot6.price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(hot6.quantity);
        });

      const modifiedHot6 = { name: 'hot6', price: 1500, quantity: 5 };
      cy.addProduct(modifiedHot6);

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
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

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($tr, idx) => {
          const { name, price, quantity } = products[idx];

          expect($tr.children()[PRODUCT_INDEX.NAME].textContent).to.equal(name);
          expect(Number($tr.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(price);
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(quantity);
        });
    });

    it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지된다.', () => {
      const vitamin = { name: 'vitamin', price: 5000, quantity: 2 };
      cy.addProduct(vitamin);

      const hot6 = { name: 'hot6', price: 2000, quantity: 3 };
      cy.addProduct(hot6);

      const products = [vitamin, hot6];

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          const { name, price, quantity } = products[idx];

          expect($el.children()[PRODUCT_INDEX.NAME].textContent).to.equal(name);
          expect(Number($el.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(price);
          expect(Number($el.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(quantity);
        });

      cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();
      cy.get(SELECTOR.COMMON.PRODUCT_MANAGE_MENU).click();

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($el, idx) => {
          const { name, price, quantity } = products[idx];

          expect($el.children()[PRODUCT_INDEX.NAME].textContent).to.equal(name);
          expect(Number($el.children()[PRODUCT_INDEX.PRICE].textContent)).to.equal(price);
          expect(Number($el.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(quantity);
        });
    });
  });
});

describe('잔돈충전 탭을 테스트한다.', () => {
  beforeEach(() => {
    cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();
  });
  context('잔돈 충전을 할 때', () => {
    it('최초의 자판기 보유 금액은 0원이고, 각 동전의 개수는 0개이다.', () => {
      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '0');

      cy.get(SELECTOR.VENDING_MACHINE.COIN_500_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_100_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_50_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_10_QUANTITY).should('have.text', '0개');
    });

    it('최소 충전 금액은 100원이다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addCharge(50).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.VENDING_MACHINE.INVALID_MIN_CHARGE);
      });
    });

    it('충전 금액은 10원으로 나누어 떨어지는 금액만 충전이 가능하다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.addCharge(1045).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.VENDING_MACHINE.INVALID_CHARGE_UNIT);
      });
    });

    it('자판기가 보유한 금액은 {금액}원 형식으로 나타낸다', () => {
      cy.addCharge(1200);

      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '1200');
    });

    it('잔돈은 누적하여 충전할 수 있다', () => {
      cy.addCharge(1200);

      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '1200');

      cy.addCharge(1800);

      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '3000');
    });

    it('자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.', () => {
      const prevObj = { 500: 0, 100: 0, 50: 0, 10: 0 };
      const nextObj = { 500: 0, 100: 0, 50: 0, 10: 0 };

      const UNIT_INDEX = 0;
      const QUANTITY_INDEX = 1;

      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_INPUT).type(55730);
      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_BUTTON).click();

      cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
        .children()
        .each(($el) => {
          const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
          const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
          prevObj[unit] = quantity;
        })
        .then(() => {
          cy.clearLocalStorage(CHARGE_KEY);
          cy.clearLocalStorage(COINS_KEY);
          cy.visit('index.html');
          cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();

          cy.get(SELECTOR.VENDING_MACHINE.CHARGE_INPUT).type(55730);
          cy.get(SELECTOR.VENDING_MACHINE.CHARGE_BUTTON).click();

          cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
            .children()
            .each(($el) => {
              const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
              const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
              nextObj[unit] = quantity;
            });
        })
        .then(() => {
          expect(prevObj).to.not.deep.equal(nextObj);
        });
    });

    it('자판기가 보유한 동전의 개수는 {개수}개 형식으로 나타낸다', () => {
      cy.addCharge(1760);

      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE.COIN_500_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE.COIN_100_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE.COIN_50_QUANTITY);
      cy.checkCoinFormat(SELECTOR.VENDING_MACHINE.COIN_10_QUANTITY);
    });

    it('다른 탭을 클릭해도 자판기가 보유한 금액은 유지된다.', () => {
      cy.addCharge(1000);
      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '1000');

      cy.get(SELECTOR.COMMON.PRODUCT_MANAGE_MENU).click();
      cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();

      cy.get(SELECTOR.VENDING_MACHINE.CHARGE_AMOUNT).should('have.text', '1000');
    });
  });
});
describe('상품구매 탭을 테스트한다.', () => {
  beforeEach(() => {
    cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
  });
  context('금액을 충전할 때', () => {
    it('최초 충전 금액은 0원이고, 반한된 각 동전의 개수는 0개이다.', () => {
      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 0);
      cy.get(SELECTOR.VENDING_MACHINE.COIN_500_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_100_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_50_QUANTITY).should('have.text', '0개');
      cy.get(SELECTOR.VENDING_MACHINE.COIN_10_QUANTITY).should('have.text', '0개');
    });

    it('10원 미만의 금액을 충전하면 alert를 띄워준다.', () => {
      const stub = getAlertStub();

      cy.typePurchaseMoney(5);
      cy.clickPurchaseMoneyAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.PRODUCT_PURCHASE.INVALID_MIN_MONEY);
      });
    });

    it('충전 금액이 10원으로 나누어 떨어지지 않으면 alert를 띄워준다.', () => {
      const stub = getAlertStub();

      cy.typePurchaseMoney(1043);
      cy.clickPurchaseMoneyAddButton().then(() => {
        stub.calledWith(ERROR_MESSAGE.PRODUCT_PURCHASE.INVALID_MONEY_UNIT);
      });
    });

    it('최소 충전 금액은 10원이다.', () => {
      cy.typePurchaseMoney(10);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 10);
    });

    it('금액은 누적으로 충전이 가능하다.', () => {
      cy.typePurchaseMoney(1000);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 1000);

      cy.typePurchaseMoney(2000);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 3000);
    });
  });

  context('상품을 구매할 때', () => {
    it('수량이 0인 상품을 구매할 수 없고 alert를 띄워준다.', () => {
      const stub = getAlertStub();

      cy.get(SELECTOR.COMMON.PRODUCT_MANAGE_MENU).click();
      const vitamin = { name: 'vitamin', price: 1000, quantity: 1 };
      cy.addProduct(vitamin);

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(2000);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.BUY_BUTTON).click();
      cy.get(SELECTOR.PRODUCT_PURCHASE.BUY_BUTTON)
        .click()
        .then(() => {
          stub.calledWith(ERROR_MESSAGE.PRODUCT_PURCHASE.INVALID_MIN_QUANTITY);
        });
    });

    it('구매하려는 상품 가격이 보유하고 있는 금액보다 높은 경우 상품을 구매할 수 없고 alert를 띄워준다.', () => {
      const stub = getAlertStub();

      cy.get(SELECTOR.COMMON.PRODUCT_MANAGE_MENU).click();
      const vitamin = { name: 'vitamin', price: 2000, quantity: 1 };
      cy.addProduct(vitamin);

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(1000);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.BUY_BUTTON)
        .click()
        .then(() => {
          stub.calledWith(ERROR_MESSAGE.PRODUCT_PURCHASE.INVALID_CHARGE_AMOUNT);
        });
    });

    it('상품 구매에 성공하면, 충전한 금액이 상품 금액만큼 차감 된다. 또한 상품의 수량도 차감된다.', () => {
      cy.get(SELECTOR.COMMON.PRODUCT_MANAGE_MENU).click();
      const vitamin = { name: 'vitamin', price: 2000, quantity: 1 };
      cy.addProduct(vitamin);

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(5000);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.BUY_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 3000);

      cy.get(SELECTOR.PRODUCT.INVENTORY_CONTAINER)
        .children()
        .each(($tr) => {
          expect(Number($tr.children()[PRODUCT_INDEX.QUANTITY].textContent)).to.equal(vitamin.quantity - 1);
        });
    });
  });

  context('잔돈을 계산할 때', () => {
    it('모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.', () => {
      cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();
      cy.typeCharge(500);
      cy.clickAddChargeButton();

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(800);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.RETURN_BUTTON).click();

      cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 300);
    });

    it('반환된 동전만큼 사용자가 충전한 금액이 차감된다.', () => {
      const UNIT_INDEX = 0;
      const QUANTITY_INDEX = 1;

      cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();
      cy.typeCharge(500);
      cy.clickAddChargeButton();

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(800);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.RETURN_BUTTON).click();

      let sum = 0;
      cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
        .children()
        .each(($el) => {
          const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
          const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
          sum += unit * quantity;
        })
        .then(() => {
          cy.get(SELECTOR.PRODUCT_PURCHASE.CHARGE_AMOUNT).should('have.text', 800 - sum);
        });
    });

    it('반환된 동전만큼 자판기가 보유하고 있는 동전도 차감된다.', () => {
      const UNIT_INDEX = 0;
      const QUANTITY_INDEX = 1;

      cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();
      cy.typeCharge(500);
      cy.clickAddChargeButton();

      const prevCoins = {};
      cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
        .children()
        .each(($el) => {
          const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
          const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
          prevCoins[unit] = quantity;
        });

      cy.get(SELECTOR.COMMON.PRODUCT_PURCHASE_MENU).click();
      cy.typePurchaseMoney(800);
      cy.clickPurchaseMoneyAddButton();

      cy.get(SELECTOR.PRODUCT_PURCHASE.RETURN_BUTTON).click();

      const returnCoins = {};

      cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
        .children()
        .each(($el) => {
          const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
          const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
          returnCoins[unit] = quantity;
        })
        .then(() => {
          cy.get(SELECTOR.COMMON.VENDING_MACHINE_MANAGE_MENU).click();

          cy.get(SELECTOR.VENDING_MACHINE.COINS_CONTAINER)
            .children()
            .each(($el) => {
              const unit = $el.children()[UNIT_INDEX].textContent.split('원')[0];
              const quantity = Number($el.children()[QUANTITY_INDEX].textContent.split('개')[0]);
              expect(quantity).to.equal(prevCoins[unit] - returnCoins[unit]);
            });
        });
    });
  });
});
