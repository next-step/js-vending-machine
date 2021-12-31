import { ERROR_MESSAGES, PRODUCT_PRICE } from '../../src/constants/index.js';
import { numberWithCommas, subtractValuesOfObjects } from "../../src/util/index.js";
import changeChargeToCoin, { returnChargeAmountToRestCoin } from "../../src/common/changeChargeToCoin.js";

describe("자판기 상품구매 Tab 테스트", () => {
  const inputCharges = [2000, 260];
  const mockProducts = [
    {
      name: "사이다",
      price: 900,
      quantity: 1
    },
    {
      name: "스프라이트",
      price: 950,
      quantity: 3
    }
  ];
  const machineAmount = 1960;
  let purchaseAmount = inputCharges.reduce((prev, next) => prev + next, 0);

  before(() => {
    cy.visit("/");
    cy.get("#product-purchase-menu").click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage()

    cy.get("#charge-input").as("ip-charge");
    cy.get("#charge-button").as("btn-charge");
    cy.get("#charge-amount").as("charge-amount");
    cy.get("#product-purchase-form").as("form-charge");
    cy.get("product-purchase-table").as("product-table");
    cy.get("#coin-return-button").as("btn-coin-return");
    cy.get(".coin-return-table").as("coin-return-table");
  });

  afterEach(() => {
    cy.saveLocalStorage()
  })

  context("1. 상품구매 Tab을 클릭하면,", () => {
    it("상품구매 button이 active되어 있어야 한다.", () => {

      cy.get("#product-purchase-menu").should('have.class', 'on');
    });

    it("금액을 입력하는 input과 투입하기 버튼, 구매할 수 있는 상품 현황 표, 잔돈 표가 보여야 한다. ", () => {
      const visibleElements = [
        "@ip-charge",
        "@btn-charge",
        "@charge-amount",
        "@form-charge",
        "@product-table",
        "@btn-coin-return",
        "@coin-return-table",
      ];

      visibleElements.forEach(elem => {
        cy.get(elem).should('be.visible');
      })
    });

    it("이전에 입력한 충전 금액이 없다면 현재 보유 금액은 0원이다", () => {
      cy.get("@charge-amount").should('have.text', 0);
    });
  })

  context("2. 금액 투입 입력 Form에서 유효성 검사.", () => {
    context("2-1. 금액을 입력하지 않고 투입하기 버튼을 클릭했을 때,", () => {
      it(`input하단에 "${ERROR_MESSAGES.NO_VALUE}" 에러메세지가 보여야 한다.`, () => {
        cy.get("@form-charge").submit();
        cy.get("@ip-charge").next(".error-message").should('have.text', ERROR_MESSAGES.NO_VALUE);
      });

      it(`input이 error style로 보여야 한다.`, () => {
        cy.get("@ip-charge").parent("label").should('have.class', 'is-error');
      });
    });

    context(`2-2. 충전 금액에 ${PRODUCT_PRICE.MIN_UNIT}보다 더 작은 값 또는 최소 단위 ${PRODUCT_PRICE.MIN_UNIT}보다 더 작은 단위가 포함된 값을 입력했을 때,`, () => {
      it(`충전 금액 input하단에 "${ERROR_MESSAGES.INVALID_PRODUCT_CHARGE}" 에러메세지가 보여야 한다.`, () => {
        const invalidValues = ["0", "9", "101"];

        invalidValues.forEach(value => {
          cy.submitAfterInputType("@ip-charge", value, "@form-charge");
          cy.get("@ip-charge").next(".error-message").should('have.text', ERROR_MESSAGES.INVALID_PRODUCT_CHARGE);
        })
        cy.get("@ip-charge").clear();
      });
    });

  });

  context("3. 금액을 투입했을 때", () => {
    let totalAmount = 0;

    inputCharges.forEach(charge => {
      it(`기존 투입된 금액에 추가 투입 금액 ${charge}을 합한 총 금액이 현재 보유 금액과 동일해야 한다.`, () => {
        cy.submitAfterInputType("@ip-charge", charge, "@form-charge");
        cy.get("@charge-amount").should('have.text', numberWithCommas(totalAmount + charge));
        totalAmount += charge;
      });
    })
  });

  context("4. 상품 구매하기", () => {
    it(`상품과 잔돈 입력 후`, () => {
      cy.get("#product-manage-menu").click();
      mockProducts.forEach(product => {
        cy.submitAfterInputTypeAll(product, "#product-add-form");
      })

      cy.get("#vending-machine-manage-menu").click();
      cy.submitAfterInputType("#vending-machine-charge-input", machineAmount, "#vending-machine-charge-form");

      cy.get("#product-purchase-menu").click();
    })
    mockProducts.forEach(({ name, price, quantity }) => {
      it(`${name}을 구매하면 상품 가격 ${numberWithCommas(price)}원 만큼 보유 금액이 차감된다.`, () => {
        cy.get(`button[data-product-name="${name}"]`).click();
        cy.get("@charge-amount").should('have.text', numberWithCommas(purchaseAmount - price));
        purchaseAmount -= price;
      })

      it(`구매한 상품 수량도 차감된다.`, () => {
        cy.get(`tr[data-key="${name}"] .product-purchase-quantity`).should('have.text', Number(quantity) - 1)
      })
    })

    it(`수량이 0인 상품은 구매가 불가능하다.`, () => {
      mockProducts.forEach(({ name, quantity }) => {
        if (quantity === 0) cy.get(`button[data-product-name="${name}"]`).should('have.attr', "disabled");
      })
    })

    it(`보유 금액보다 상품 가격이 더 높은 경우 상품 구매가 불가능하다.`, () => {
      mockProducts.forEach(({ name, price }) => {
        if (price > purchaseAmount) cy.get(`button[data-product-name="${name}"]`).should('have.attr', "disabled");
      })
    })
  });

  context(`잔돈 반환하기`, () => {
    let machineCoinsObj;
    let returnCoinsObj;
    let returnAmount;
    
    it(`반환하기 버튼을 클릭하면 남은 보유 금액에서 자판기 동전을 반환하고 반환한 동전만큼 보유 금액이 차감된다.`, () => {
      machineCoinsObj = changeChargeToCoin(machineAmount);
      returnCoinsObj = returnChargeAmountToRestCoin(purchaseAmount, Object.entries(machineCoinsObj));
      
      cy.get("@btn-coin-return").click();
      Object.entries(returnCoinsObj).forEach(([coin, amount]) => {
        cy.get(`#coin-${coin}-quantity`).should('have.text', `${amount}개`);
      });
      
      returnAmount = Object.entries(returnCoinsObj).reduce((prev, [coin, amount]) => prev + (coin * amount), 0);
      cy.get("@charge-amount").should('have.text', numberWithCommas(purchaseAmount - returnAmount))
      
    })
    
    it(`반환한 동전만큼 자판기가 보유하고 있는 동전도 차감된다.`, () => {
      cy.get("#vending-machine-manage-menu").click();
  
      Object.entries(subtractValuesOfObjects(machineCoinsObj, returnCoinsObj)).forEach(([coin, amount]) => {
        cy.get(`#vending-machine-coin-${coin}-quantity`).should('have.text', `${amount}개`);
      })
    })
  });

})
