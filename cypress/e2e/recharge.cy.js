import { ERROR_MESSAGE } from "../../src/js/common/error.js";
describe('잔돈 충전하기 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    });

    beforeEach('잔돈충전 탭 클릭', () => {
        cy.clickRechargeTab();
    });

    rechargeSpeck();
})

function rechargeSpeck() {
    const amount = 100;

    it('최초 자판기의 보유금액은 0원이다.', () => {
        cy.get('#recharge-amount').should('have.text', 0);
    });

    it('최소 충전 금액은 100원이다. :: 경계값', () => {
        cy.typeRechargeAmount(99);
        checkAlert(cy.clickRecharge(), ERROR_MESSAGE.InputMinInsufficientError);
    });

    it('충전 금액의 단위는 10원이다.', () => {
        cy.typeRechargeAmount(101);
        checkAlert(cy.clickRecharge(), ERROR_MESSAGE.InputPriceUnitError);
    });

    it('자판기에 금액을 입력하여 충전하기 버튼을 누르면 보유 금액을 충전할 수 있다.', () => {
        cy.typeRechargeAmount(amount);
        cy.clickRecharge();
        cy.get('#recharge-amount').should('have.text', amount);
    });

    it('보유 금액은 누적된다.', () => {
        const newAmount = 200;
        cy.typeRechargeAmount(amount);
        cy.clickRecharge();
        cy.get('#recharge-amount').should('have.text', amount);

        cy.get('#recharge-input').clear();
        cy.typeRechargeAmount(newAmount);
        cy.clickRecharge();
        cy.get('#recharge-amount').should('have.text', amount + newAmount);
    });

    it('다른 탭을 클릭해도 보유된 금액은 유지된다.', () => {
        cy.typeRechargeAmount(amount);
        cy.clickRecharge();
        cy.get('#recharge-amount').should('have.text', amount);

        cy.clickStockTab();
        cy.clickRechargeTab();
        cy.get('#recharge-amount').should('have.text', amount);
    });
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0)?.lastArg).to.equals(message));
}
