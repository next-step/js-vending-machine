import { ERROR_MESSAGES, PRODUCT_PRICE, COINS } from '../../src/constants/index.js';
import { numberWithCommas, sumValuesOfObjects } from "../../src/util/index.js";
import changeChargeToCoin from "../../src/common/changeChargeToCoin.js";

describe("자판기 잔돈충전 Tab 테스트", () => {
  const inputCharges = [1000, 260];

  before(() => {
    cy.visit("/");
    cy.get("#vending-machine-manage-menu").click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage()

    cy.get("#vending-machine-charge-input").as("ip-charge");
    cy.get("#vending-machine-charge-button").as("btn-add-charge");
    cy.get(".vending-machine-wrapper").as("form-add-charge");
    cy.get(".cashbox-remaining").as("cashbox-remaining");
    cy.get("#vending-machine-charge-amount").as("total-amount");
  });

  afterEach(() => {
    cy.saveLocalStorage()
  })

  context("1. 잔돈 충전 Tab을 클릭하면,", () => {
    it("잔돈 충전 button이 active되어 있어야 한다.", () => {

      cy.get("#vending-machine-manage-menu").should('have.class', 'on');
    });

    it("충전 금액을 입력하는 input과 충전하기 버튼, 동전 보유 현황 표가 보여야 한다. ", () => {
      const coins = COINS.map(([coin]) => {
        cy.get(`#vending-machine-coin-${coin}-quantity`).as(`coin-${coin}`);
        return `@coin-${coin}`;
      });
      const visibleElements = ["@ip-charge", "@btn-add-charge", "@total-amount", "@cashbox-remaining", ...coins];

      visibleElements.forEach(elem => {
        cy.get(elem).should('be.visible');
      })
    });

    it("이전에 입력한 충전 금액이 없다면 현재 보유 금액은 0원이다", () => {
      cy.get("@total-amount").should('have.text',0);
    });
  })

  context("2. 상품 추가하기 입력 Form에서 유효성 검사.", () => {
    context("2-1. 충전 금액을 입력하지 않고 추가하기 버튼을 클릭했을 때,", () => {
      it(`충전 금액 input하단에 "${ERROR_MESSAGES.NO_VALUE}" 에러메세지가 보여야 한다.`, () => {
        cy.get("@form-add-charge").submit();
        cy.get("@ip-charge").next(".error-message").should('have.text', ERROR_MESSAGES.NO_VALUE);
      });

      it(`충전 금액 input이 error style로 보여야 한다.`, () => {
        cy.get("@ip-charge").parent("label").should('have.class', 'is-error');
      });
    });

    context(`2-2. 충전 금액에 최솟값 ${PRODUCT_PRICE.MIN}보다 더 작은 값 또는 최소 단위 ${PRODUCT_PRICE.MIN_UNIT}보다 더 작은 단위가 포함된 값을 입력 후 추가하기 버튼을 클릭했을 때,`, () => {
      it(`충전 금액 input하단에 "${ERROR_MESSAGES.INVALID_MACHINE_CHARGE}" 에러메세지가 보여야 한다.`, () => {
        const invalidValues = ["90", "101"];

        invalidValues.forEach(value => {
          cy.submitAfterInputType("@ip-charge", value, "@form-add-charge");
          cy.get("@ip-charge").next(".error-message").should('have.text', ERROR_MESSAGES.INVALID_MACHINE_CHARGE);
        })
        cy.get("@ip-charge").clear();
      });
    });

  });

  context("3. 자판기 잔돈을 충전했을 때", () => {
    let totalAmount = 0;
    let coinsObj = Object.fromEntries(COINS);

    inputCharges.forEach(charge => {
      it(`기존 보유 금액에 충전 금액을 합한 총 금액이 현재 보유 금액과 동일해야 한다.`, () => {
        cy.submitAfterInputType("@ip-charge", charge, "@form-add-charge");
        cy.get("@total-amount").should('have.text',numberWithCommas(totalAmount + charge));
        totalAmount += charge;
      });

      it(`입력된 금액 ${charge}만큼의 동전이 생성된다.`, () => {
        Object.entries(changeChargeToCoin(charge)).forEach(([coin, amount]) => {
          cy.log(`${coin}원이 ${amount}개 생성되었다.`);
        });
      });

      it("동전 보유 현황에는 입력된 금액만큼의 동전이 추가되어 보여야 한다.", () => {
        Object.entries(sumValuesOfObjects(coinsObj, changeChargeToCoin(charge))).forEach(([coin, amount]) => {
          cy.get(`#vending-machine-coin-${coin}-quantity`).should('have.text', `${amount}개`);
        })

        coinsObj = sumValuesOfObjects(coinsObj, changeChargeToCoin(charge));
      });
    })
  });

  context("4. 페이지를 새로고침 했을 때, 다른 탭에 진입하고 다시 잔돈 충전 탭에 왔을 때,", () => {
    it("보유 금액이 그대로 유지되어야 한다.", () => {
      cy.reload();

      cy.get("#product-manage-menu").click();
      cy.get("#vending-machine-manage-menu").click();
      
      cy.get("@total-amount").should('have.text',numberWithCommas(inputCharges.reduce((p, n) => (p + n), 0)));
    });
  });
})
