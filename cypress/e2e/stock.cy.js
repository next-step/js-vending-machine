import { ERROR_MESSAGE } from "../../src/js/common/error.js";

describe('사이트 홈 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    });

    homeSpec();
})

describe('상태 관리 테스트', () => {
    beforeEach('페이지 방문', () => {
        cy.visit('/');
    });

    beforeEach('상품 관리 탭 클릭', () => {
        cy.clickStockTab();
    });

    stockSpec();
})

function homeSpec() {
    it('첫 페이지에 상품관리, 잔돈충전, 상품구매 버튼이 있다.', () => {
        cy.get('#stock-manage-menu').should('exist');
        cy.get('#vending-machine-manage-menu').should('exist');
        cy.get('#product-purchase-menu').should('exist');
        cy.get('.stock-container').should('not.be.visible');
    });

    it('상품관리탭을 클릭하면 상품 추가하기 창이 보여진다.', () => {
        cy.clickStockTab();
        cy.get('.stock-container').should('be.visible');
    });
}

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
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0)?.lastArg).to.equals(message));
}
