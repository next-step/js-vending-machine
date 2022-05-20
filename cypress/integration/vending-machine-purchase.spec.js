describe('자판기 미션 테스트', () => {
    context('상품 구매 페이지', () => {
        beforeEach(() => {
            // given - 상품 구매 화면 렌더링
            cy.visit('#/purchase');
        });

        it('0. 초기화면 - 금액투입 폼, 상품 테이블, 잔돈 테이블이 노출된다.', () => {
            cy.get('.inputPrice-form').should('be.visible');
            cy.get('.purchase-available').should('be.visible');
            cy.get('.cashbox-change').should('be.visible');
        });

        it('1. 상품 구매 페이지 에서 최초 충전 금액은 0원이다.', () => {
            // then - 최초 충전 금액은 0원이다.
            cy.get('.purchase-input-price')
                .find('span')
                .invoke('text')
                .then(text => {
                    expect(text).to.equal('0');
                });
        });

        it('2. 반환된 각 동전의 개수는 0개이다.', () => {
            // then - 최초 반환 동전 개수는 0개이다.
            cy.get('.cashbox-change')
                .find('tbody tr')
                .each($tr => {
                    cy.wrap($tr)
                        .get('td')
                        .last()
                        .invoke('text')
                        .then(text => {
                            expect(text).contains('0개');
                        });
                });
        });

        it('3. 사용자는 금액 충전 입력 요소에 충전할 금액을 입력 할 수 있다.', () => {
            //given - 최초 충전 금액은 0이다.
            //when - 3000을 입력한다.
            //then - input value는 3000이다.
            const inputPrice = 3000;
            cy.get('#input-price').type(inputPrice).should('have.value', inputPrice);
        });

        it('4. 구매 금액 충전버튼을 이용하여 금액을 충전한다.', () => {
            //given - 최초 충전 금액은 0이다.
            //when - 3000을 입력한다.
            //then - 충전된 금액 3000이 출력된다..

            const inputPrice = 3000;
            cy.get('#input-price').type(inputPrice).type('{enter}');
            cy.get('.purchase-input-price')
                .find('span')
                .invoke('text')
                .then(text => {
                    expect(text.trim()).to.equal(inputPrice.toString());
                });
        });

        it('5. 최소 충전 금액은 10원이다.', () => {
            //given - 최초 충전 금액은 0이다.
            //when - 10을 입력한다.
            //then - 충전 실패에 대한 alert 나온다. 충전 금액은 0이다.

            const inputPrice = 5;
            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);

            cy.get('#input-price')
                .type(inputPrice)
                .type('{enter}')
                .then(() => {
                    expect(alertStub).to.be.calledWith('충전 금액은 최소 10원 이상이어야 합니다!');
                });

            cy.get('.purchase-input-price')
                .find('span')
                .invoke('text')
                .then(text => {
                    expect(text.trim()).to.equal('0');
                });
        });

        it('6. 금액은 10원으로 나누어 떨어지는 금액만 충전이 가능하다.', () => {
            //given - 최초 충전 금액은 0이다.
            //when - 33을 입력한다.
            //then - 충전 실패에 대한 alert 나온다. 충전 금액은 0이다.

            const inputPrice = 33;
            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);

            cy.get('#input-price')
                .type(inputPrice)
                .type('{enter}')
                .then(() => {
                    expect(alertStub).to.be.calledWith('충전 금액은 10원 단위로 나누어 떨어져야합니다!');
                });

            cy.get('.purchase-input-price')
                .find('span')
                .invoke('text')
                .then(text => {
                    expect(text.trim()).to.equal('0');
                });
        });

        it('7. 자판기가 보유한 금액은 {금액}원 형식으로 나타낸다.', () => {
            // then - 보유 금액 단위는 '원'으로 표기된다.
            cy.get('.purchase-input-price').find('label').contains('원');
        });

        it('8. 금액은 누적으로 충전이 가능하다.', () => {
            //given - 최초 충전 금액은 0이다.
            //when - 1000, 500을 연달아 입력한다.
            //then - 합산 금액(1500)이 출력된다.

            const inputPrice1 = 1000;
            const inputPrice2 = 500;
            cy.get('#input-price').type(inputPrice1).type('{enter}');
            cy.get('#input-price').type(inputPrice2).type('{enter}');

            cy.get('.purchase-input-price')
                .find('span')
                .invoke('text')
                .then(text => {
                    expect(text.trim()).to.equal((inputPrice1 + inputPrice2).toString());
                });
        });
    });
});