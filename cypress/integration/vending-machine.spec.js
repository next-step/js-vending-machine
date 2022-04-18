import { hasUncaughtExceptionCaptureCallback } from "process";

describe("Vending Machine", () => {
    beforeEach(() => {
        cy.visit("../../index.html");
    });

    describe("탭 클릭 시 해당 페이지로 이동해야한다.", () => {
        it("상품 관리 탭 클릭 시 상품 관리 탭으로 이동 ", () => {
            cy.get("#product-manage-menu").click();

            cy.get("#product-manage").should("be.visible");
        });

        it("잔돈 충전 탭 클릭 시 잔돈 충전 탭으로 이동 ", () => {
            cy.get("#vending-machine-manage-menu").click();

            cy.get("#vending-machine-manage").should("be.visible");
        });

        it("상품 구매 탭 클릭 시 상품 구매 탭으로 이동 ", () => {
            cy.get("#product-purchase-menu").click();

            cy.get("#product-purchase").should("be.visible");
        });
    });

    describe("입력한 상품 정보의 값은 필수 값이고 조건이 있다.", () => {
        it("상품명에 공백이 입력되면 경고창을 출력한다.", () => {
            const alertStub = cy.stub();
            cy.on("window:alert", alertStub);
            cy.get("#product-name-input").clear();
            cy.get("#product-add-button")
                .click()
                .then(() => {
                    expect(alertStub).to.be.calledWith("상품명을 입력해주세요.");
                });
        });

        it("금액에 100원 미만으로 입력되면 경고창을 출력한다.", () => {
            const alertStub = cy.stub();
            cy.on("window:alert", alertStub);
            cy.get("#product-name-input").type("coke");
            cy.get("#product-price-input").type(10);
            cy.get("#product-add-button")
                .click()
                .then(() => {
                    expect(alertStub).to.be.calledWith("상품 금액은 100원이 최소 금액입니다.");
                });
        });

        it("금액의 단위가 10원이 아니라면 경고창을 출력한다.", () => {
            const alertStub = cy.stub();
            cy.on("window:alert", alertStub);
            cy.get("#product-name-input").type("coke");
            cy.get("#product-price-input").type(111);
            cy.get("#product-add-button")
                .click()
                .then(() => {
                    expect(alertStub).to.be.calledWith("상품 금액은 10원 단위로 입력해야 합니다.");
                });
        });

        it("수량이 1 미만으로 입력되면 경고창을 출력한다.", () => {
            const alertStub = cy.stub();
            cy.on("window:alert", alertStub);
            cy.get("#product-name-input").type("coke");
            cy.get("#product-price-input").type(1200);
            cy.get("#product-quantity-input").type(0);
            cy.get("#product-add-button")
                .click()
                .then(() => {
                    expect(alertStub).to.be.calledWith("상품 수량은 1개 이상 입력해야 합니다.");
                });
        });
    });

    describe("충전할 금액의 값은 필수 값이고 조건이 있다.", () => {
        it("충전할 금액에 공백이 입력되면 경고창을 출력한다.", () => {
            // const alertStub = cy.stub();
            // cy.on("window:alert", alertStub);
            // cy.get("#product-name-input").clear();
            // cy.get("#product-add-button")
            //     .click()
            //     .then(() => {
            //         expect(alertStub).to.be.calledWith("상품명을 입력해주세요.");
            //     });
        });

        it("충전할 금액에 0이 입력되면 경고창을 출력한다.", () => {});
        it("충전할 금액이 10의 단위가 아닌 값이 입력되면 경고창을 출력한다.", () => {});
    });
});
