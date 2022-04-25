import { SELECTOR, ERROR_MESSAGE } from '../../src/constants.js';

describe('잔돈 충전 탭 관련 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).click();
  });

  context('잔돈 충전 금액 검증 관련', () => {
    it('잔돈 충전 금액은 필수값 입니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.REQUIRED_CHARGE_INPUT);
        });
    });

    it('잔돈 충전 금액은 100원 이상이어야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type('90');
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_OVER_100);
        });
    });

    it('잔돈 충전 금액은 10원으로 나누어 떨어져야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type('115');
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.CHARGE_INPUT_HAVE_TO_DIVIDED_BY_10);
        });
    });
  });

  context('잔돈 충전 금액 표시 관련', () => {
    it('잔돈 충전 금액이 잘 입력되었으면 보유 금액에 잘 반영되어야 합니다.', () => {
      const CHARGE_MONEY = 200;

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type(`${CHARGE_MONEY}`);
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT_ID}`).should('have.text', CHARGE_MONEY);
    });

    it('잔돈 충전 금액은 기존 금액에서 누적되어야 합니다.', () => {
      const CHARGE_MONEY = 200;
      const MORE_CHARGE_MONEY = 500;

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type(`${CHARGE_MONEY}`);
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_INPUT_ID}`).type(`${MORE_CHARGE_MONEY}`);
      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_BUTTON_ID}`).click();

      cy.get(`#${SELECTOR.VENDING_MACHINE_CHARGE_AMOUNT_ID}`).should('have.text', CHARGE_MONEY + MORE_CHARGE_MONEY);
    });
  });
});
