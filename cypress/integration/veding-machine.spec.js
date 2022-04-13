describe('자판기 미션 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  context('[STEP1] 상품관리', () => {
    it('1. 초기화면 - 상품관리, 잔돈 충전, 상품 구매 버튼과 상품 추가 탭이 노출된다.', () => {
      cy.initialView();
    });
  });
});
