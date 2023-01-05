const MENU_SELECTOR = "#menu";

describe("상품관리 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  context("메뉴 탭 UI 테스트", () => {
    it("메뉴 탭 리스트 UI가 화면에 존재한다.", () => {
      cy.get(MENU_SELECTOR).should("exist");
    });

    it("메뉴는 상품 관리, 잔돈 충전, 상품 구매가 있다.", () => {
      cy.get(`${MENU_SELECTOR} button`).should(($menuButton) => {
        expect($menuButton).to.have.length(3);

        const menuTexts = $menuButton.map((_, el) => el.innerText);

        expect(menuTexts.get()).to.deep.equal([
          "상품 관리",
          "잔돈 충전",
          "상품 구매",
        ]);
      });
    });
  });

  context("상품을 추가할 수 있다.", () => {
    it("상품을 추가할 수 있는 화면이 존재한다.", () => {
      cy.contains("상품 추가하기");
    });
  });
});
