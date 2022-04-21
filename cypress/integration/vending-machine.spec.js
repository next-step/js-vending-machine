before(() => cy.visit('http://127.0.0.1:5500/index.html'));

describe('', () => {
  describe('입력값 유효성 검사', () => {
    it('공백이 입력되면 경고창을 출력한다.', () => {
      cy.submitForm('.js-money-form', 0).alert('');
    });

    it('금액에 100원 미만으로 입력되면 경고창을 출력한다.', () => {
      cy.submitForm('.js-money-form', 90).alert('');
    });

    it('금액의 단위가 10원이 아니라면 경고창을 출력한다.', () => {
      cy.submitForm('.js-money-form', 12).alert('');
    });

    it('수량이 1 미만으로 입력되면 경고창을 출력한다.', () => {
      cy.submitForm('.js-count-form', 0).alert('');
    });

    it('같은 상품명이 입력되면 새로운 정보로 Replace 된다.', () => {
      cy.submitForm('.js-product-form', '콜라');
    });
  });
});
