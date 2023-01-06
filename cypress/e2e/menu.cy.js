import { MENU_SELECTOR } from "../support/selectors.js";

describe("메뉴 탭 UI 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });
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

  context("각 메뉴 클릭시 해당 메뉴화면이 노출된다.", () => {
    it("잔돈 충전 메뉴 클릭시 해당 화면이 노출된다.", () => {});
    it("상품 구매 메뉴 클릭시 해당 화면이 노출된다.", () => {});
    it("상품 관리 메뉴 클릭시 해당 화면이 노출된다.", () => {});
  });
});
