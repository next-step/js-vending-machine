import {
  CHANGE_CHARGE_MENU_SELECTOR,
  CHARGER_INPUT_SELECTOR,
  COIN_AMOUNT_SELECTOR,
  COIN_CHARGE_BUTTON_SELECTOR,
  COIN_CHARGING_FORM_SELECTOR,
  COIN_INVENTORY_SELECTOR,
  COIN_UNIT_SELECTOR,
  HOLDING_AMOUNT_SELECTOR,
  PRODUCT_MANAGE_MENU_SELECTOR,
} from "../support/selectors.js";
import { ERROR_MESSAGE, MINIMUM_CHARGE_PRICE } from "../support/constants";
import { calculateCoinCount } from "../../src/js/utils/utils.js";

describe("잔돈 충전 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(CHANGE_CHARGE_MENU_SELECTOR).click();
  });

  context("잔돈 충전을 할 수 있다.", () => {
    it("잔돈 충전 입력 폼이 보인다", () => {
      cy.get(COIN_CHARGING_FORM_SELECTOR).should("exist");
    });

    it("잔돈을 입력할 수 있는 Input이 존재한다.", () => {
      cy.get(CHARGER_INPUT_SELECTOR).should("exist");
    });

    it("최초 보유한 금액은 0원이다", () => {
      cy.get(HOLDING_AMOUNT_SELECTOR).should("have.text", "0");
    });

    it("100원부터 충전이 가능하며 잘못 입력시 alert가 뜬다", () => {
      cy.alert({
        action: () => {
          cy.get(CHARGER_INPUT_SELECTOR).type("50");
          return cy.get(COIN_CHARGE_BUTTON_SELECTOR).click();
        },
        message: ERROR_MESSAGE.INVALID_AMOUNT,
      });
    });

    it("잔돈은 10원 단위로 충전이 가능하며 잘못된 값을 충전시 alert가 뜬다", () => {
      cy.alert({
        action: () => {
          cy.get(CHARGER_INPUT_SELECTOR).type("101");
          return cy.get(COIN_CHARGE_BUTTON_SELECTOR).click();
        },
        message: ERROR_MESSAGE.INVALID_UNIT,
      });
    });

    it("최초 보유 금액은 0원이다.", () => {
      cy.get(HOLDING_AMOUNT_SELECTOR).should("have.text", "0");
    });

    it("잔돈 입력 후 Enter키를 눌러서 충전할 수 있다", () => {
      cy.get(CHARGER_INPUT_SELECTOR).type(`${MINIMUM_CHARGE_PRICE}{enter}`);
      cy.get(HOLDING_AMOUNT_SELECTOR).should("have.text", MINIMUM_CHARGE_PRICE);
    });

    it("잔돈 입력후 충전하기 버튼을 눌러서 충전할 수 있다", () => {
      cy.get(CHARGER_INPUT_SELECTOR).type(String(MINIMUM_CHARGE_PRICE));

      cy.get(COIN_CHARGE_BUTTON_SELECTOR)
        .click()
        .then(() => {
          cy.get(HOLDING_AMOUNT_SELECTOR).should(
            "have.text",
            MINIMUM_CHARGE_PRICE
          );
        });
    });

    it("잔돈은 누적하여 충전할 수 있다", () => {
      const FIRST_CHARGE = MINIMUM_CHARGE_PRICE;
      const SECOND_CHARGE = MINIMUM_CHARGE_PRICE * 2;

      cy.get(CHARGER_INPUT_SELECTOR).type(String(FIRST_CHARGE));
      cy.get(COIN_CHARGE_BUTTON_SELECTOR).click();

      cy.get(CHARGER_INPUT_SELECTOR).type(String(SECOND_CHARGE));
      cy.get(COIN_CHARGE_BUTTON_SELECTOR).click();

      cy.get(HOLDING_AMOUNT_SELECTOR).should(
        "have.text",
        String(FIRST_CHARGE + SECOND_CHARGE)
      );
    });
  });

  context("보유한 동전을 갯수를 확인할 수 있다.", () => {
    it("잔돈 현황을 확인할 수 있는 테이블이 보인다", () => {
      cy.get(COIN_INVENTORY_SELECTOR).should("exist");
    });

    it("최초 보유한 동전의 갯수는 각각 0개이다", () => {
      cy.get(COIN_AMOUNT_SELECTOR).each((amount) => {
        expect(amount).text("0개");
      });
    });

    it("500원, 100원, 50원, 10원 단위에 따른 동전의 갯수로 표시된다", () => {
      const coinUnit = ["500", "100", "50", "10"];
      cy.get(COIN_UNIT_SELECTOR).each((unit, index) => {
        expect(unit).text(coinUnit[index]);
      });
    });

    it("보유한 동전은 X개 형식으로 확인할 수 있다", () => {
      const charge = 1000;
      cy.get(CHARGER_INPUT_SELECTOR).type(`${charge}{enter}`);
      const result = calculateCoinCount(charge);

      cy.get(COIN_AMOUNT_SELECTOR).each((amount) => {
        const id = amount.closest("tr").attr("id");
        const unit = id.replace("coin-", "");

        expect(amount).text(`${result[unit]}개`);
      });
    });
  });

  it("다른 메뉴로 이동 후 다시 돌아왔을 경우 값은 유지된다.", () => {
    const charge = 1000;
    cy.get(CHARGER_INPUT_SELECTOR).type(`${charge}{enter}`);
    const result = calculateCoinCount(charge);

    cy.get(COIN_AMOUNT_SELECTOR).each((amount) => {
      const id = amount.closest("tr").attr("id");
      const unit = id.replace("coin-", "");

      expect(amount).text(`${result[unit]}개`);
    });

    cy.get(PRODUCT_MANAGE_MENU_SELECTOR).click();

    cy.get(CHANGE_CHARGE_MENU_SELECTOR).click();

    cy.get(COIN_AMOUNT_SELECTOR).each((amount) => {
      const id = amount.closest("tr").attr("id");
      const unit = id.replace("coin-", "");

      expect(amount).text(`${result[unit]}개`);
    });
  });
});
