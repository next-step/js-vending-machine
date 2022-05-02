describe('자판기 미션 테스트', () => {
  context('상품 관리 페이지', () => {
    beforeEach(() => {
      // given - 동전 충전 화면 렌더링
      cy.visit('#/charge');
    });

    it('0. 초기화면 - 잔돈 충전 기능 관련 화면이 노출된다.', () => {
      cy.get('#vending-machine-charge-input').should('be.visible');
      cy.get('#vending-machine-charge-button').should('be.visible');
      cy.get('#vending-machine-charge-amount').should('be.visible');
      cy.get('.cashbox-remaining').should('be.visible');
    });

    it('1. 잔돈 충전 페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
      // then - 초기 보유 금액은 0원이다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal('0');
        });
    });

    it('2. 관리자는 잔돈 충전 입력 요소에 충전할 금액을 입력한 후, 자판기 동전 충전 버튼을 눌러 보유한 금액을 충전할 수 있다.', () => {
      const chargeInput = 3000;

      // given - 초기 보유 금액은 0원이다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal('0');
        });

      // when - 3000원을 입력한다.
      cy.get('#vending-machine-charge-input').type(chargeInput).type('{enter}');

      // then - 3000원이 충전된다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal(chargeInput.toString());
        });
    });

    it('3. 최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.', () => {
      // given - 초기 보유 금액은 0원이다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal('0');
        });

      // when, then - 100원 미만을 입력하면 에러 문구가 등장한다.
      const chargeInput = 50;
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#vending-machine-charge-input')
        .type(chargeInput)
        .type('{enter}')
        .then(() => {
          expect(alertStub).to.be.calledWith('충전 금액은 최소 100원 이상이어야 합니다!');
        });

      //then - 잔돈이 초기 금액과 동일하다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal('0');
        });
    });

    it('4. 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다..', () => {
      // then - 보유 금액을 표시하는 p 태그는 '원' 단위를 노출한다.
      cy.get('#vending-machine-charge-amount').parents().contains('원');
    });

    it('5. 관리자는 잔돈을 누적하여 충전할 수 있다.', () => {
      const chargeInput = 3000;
      // given - 초기 보유 금액은 0원이다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal('0');
        });

      // when - 3000원을 2번 충전한다.
      cy.get('#vending-machine-charge-input').type(chargeInput).type('{enter}');
      cy.get('#vending-machine-charge-input').type(chargeInput).type('{enter}');

      // then - 6000원이 충전된다.
      cy.get('#vending-machine-charge-amount')
        .invoke('text')
        .then(text => {
          expect(text.trim()).to.equal((chargeInput * 2).toString());
        });
    });

    it('6. 동전은 500원, 100원, 50원, 10원의 동전만 생성된다.', () => {
      // given - 초기 보유 금액은 1000원이 충전된 상태이다.
      cy.get('#vending-machine-charge-input').type(1000).type('{enter}');

      // then - tbody에 500,100,50,10에 해당하는 row가 4개 존재한다.
      cy.get('.cashbox-remaining').find('tbody tr').should('have.length', 4);
      cy.get('.cashbox-remaining').find('tbody tr').contains('500원');
      cy.get('.cashbox-remaining').find('tbody tr').contains('100원');
      cy.get('.cashbox-remaining').find('tbody tr').contains('50원');
      cy.get('.cashbox-remaining').find('tbody tr').contains('10원');
    });

    it.only('7. 동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.', () => {
      // given - 초기 보유 금액은 1000원이 충전된 상태이다.
      cy.get('#vending-machine-charge-input').type(1000).type('{enter}');

      // then - 충전된 동전 단위를 '개'로 표기된다.
      cy.get('.cashbox-remaining')
        .find('tbody tr')
        .each($tr => {
          cy.wrap($tr)
            .get('td')
            .last()
            .invoke('text')
            .then(text => {
              expect(text).contains('개');
            });
        });
    });
  });
});
