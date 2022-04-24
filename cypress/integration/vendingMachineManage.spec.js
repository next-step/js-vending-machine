import { SELECTOR, ERROR_MESSAGE } from '../../src/constants.js';

describe('잔돈 충전 탭 관련 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).click();
  });

  context('잔돈 충전 금액은 알맞게 입력되어야 합니다.', () => {
    it('잔돈 충전 금액은 100원 이상이어야 합니다.', () => {
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type('90');
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`).click();
      cy.expectAlertWithMessage(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_OVER_100);
    });

    it('잔돈 충전 금액은 10원으로 나누어 떨어져야 합니다.', () => {
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type('115');
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`).click();
      cy.expectAlertWithMessage(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10);
    });
  });
});
