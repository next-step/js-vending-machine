import { ERROR_MESSAGE } from "../../src/js/common/error.js";
describe('상 관리 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    });

    beforeEach('상품관리 탭 클릭', () => {
        cy.clickStockTab();
    });

    stockSpec();
})

function stockSpec() {
    const name = '콜라';
    const price = 100;
    const quantity = 1;
    
    it('상품명, 가격, 수량는 필수로 입력해야 한다. :: 전부 미기입', () => {
        checkAlert(cy.clickStockAdd(), ERROR_MESSAGE.InputRequiredStock);
    });

    it('상품명, 가격, 수량는 필수로 입력해야 한다. :: 가격 미기입', () => {
        cy.typename(name);
        cy.typeStockQuantity(quantity);
        checkAlert(cy.clickStockAdd(), ERROR_MESSAGE.InputRequiredStock);
    });

    it('가격은 100원 이상 입력해야 한다.', () => {
        cy.typename(name);
        cy.typeStockPrice(10);
        cy.typeStockQuantity(quantity);
        checkAlert(cy.clickStockAdd(), ERROR_MESSAGE.InputMinInsufficientError);
    });

    it('가격은 10원 단위로 입력해야 한다.', () => {
        cy.typename(name);
        cy.typeStockPrice(1001);
        cy.typeStockQuantity(quantity);
        checkAlert(cy.clickStockAdd(), ERROR_MESSAGE.InputPriceUnitError);
    });

    it('수량은 1개 이상 입력해야 한다.', () => {
        cy.typename(name);
        cy.typeStockPrice(price);
        cy.typeStockQuantity(0);
        checkAlert(cy.clickStockAdd(), ERROR_MESSAGE.InputMinQuantityError);
    });

    it('상품을 추가하면 상품 목록에 추가 되어야 한다.', () => {
        cy.typename(name);
        cy.typeStockPrice(price);
        cy.typeStockQuantity(quantity);
        cy.clickStockAdd();
        cy.get('#stock-inventory-container').children(`.${name}`).should('exist');
    });

    it('같은 상품을 추가하면 상품 목록에 새 정보로 갱신 되어야 한다.', () => {
        cy.typename(name);
        cy.typeStockPrice(price);
        cy.typeStockQuantity(quantity);
        cy.clickStockAdd();

        cy.get('#stock-name-input').clear();
        cy.get('#stock-price-input').clear();
        cy.get('#stock-quantity-input').clear();

        cy.typename(name);
        cy.typeStockPrice(200);
        cy.typeStockQuantity(quantity);
        cy.clickStockAdd();

        cy.get('#stock-inventory-container')
            .children(`.${name}`)
            .children('td').eq(1).should('have.text', 200);
    });

    it('다른 탭을 클릭하더라도 추가된 상품은 저장된다.', () => {
        cy.typename(name);
        cy.typeStockPrice(price);
        cy.typeStockQuantity(quantity);
        cy.clickStockAdd();
        cy.get('#stock-inventory-container').children(`.${name}`).should('exist');

        cy.clickRechargeTab();
        cy.clickStockTab();
        cy.get('#stock-inventory-container').children(`.${name}`).should('exist');
    });
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0)?.lastArg).to.equals(message));
}
