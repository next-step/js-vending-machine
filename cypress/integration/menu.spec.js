import { SELECTOR } from '../../src/constants.js';

describe('메뉴 선택 관련 테스트', () => {
  beforeEach(() => cy.visit('/'));

  context('각 메뉴 버튼을 클릭하면 해당 탭으로 이동합니다.', () => {
    it('상품 관리 탭을 클릭하면 상품 탭으로 이동합니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_MANAGE_MENU_ID}`).click();
      cy.get(`#${SELECTOR.APP_ID} > h3`).should('have.text', '상품 추가하기');
    });

    it('잔돈 충전 탭을 클릭하면 상품 탭으로 이동합니다.', () => {
      cy.get(`#${SELECTOR.VENDING_MACHINE_MANAGE_MENU_ID}`).click();
      cy.get(`#${SELECTOR.APP_ID} > h3`).first().should('have.text', '자판기 돈통 충전하기');
    });

    it('상품 구매 탭을 클릭하면 상품 탭으로 이동합니다.', () => {
      cy.get(`#${SELECTOR.PRODUCT_PURCHASE_MENU_ID}`).click();
      cy.get(`#${SELECTOR.APP_ID} > .purchase-container > h3`).should('have.text', '충전하기');
    });
  });
});
