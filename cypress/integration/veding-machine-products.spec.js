describe('자판기 미션 테스트', () => {
    context('상품관리 페이지', () => {
        beforeEach(() => {
            // given - 상품 목록 화면 렌더링
            cy.visit('#/products');
        });

        it('0. 초기화면 - 상품관리, 잔돈 충전, 상품 구매 버튼과 상품 추가 탭이 노출된다.', () => {
            cy.get('#product-manage-menu').should('be.visible');
            cy.get('#vending-machine-manage-menu').should('be.visible');
            cy.get('#product-manage-menu').should('be.visible');
            cy.get('.product-container').should('be.visible');
        });

        it('1. 최소 상품 목록은 비워진 상태이다.', () => {
            cy.get('.product-inventory tr').should('have.length', 1);
        });

        it('2. 상품명, 금액, 수량을 추가할 수 있다. 버튼을 클릭하면, 상품 현황에 상품이 추가된다.', () => {
            // when - 상품을 상품명, 금액, 수량 순서대로 입력하여 등록한다.
            const item = {
                title: '아이스 아메리카노',
                price: 1500,
                quantity: 5,
            };

            cy.typeProductItem(item);
            cy.get('#product-add-button').click();

            // then - 상품 목록 row가 추가되고, 입력한 값들이 순서대로 노출된다.
            cy.get('.product-inventory tr').should('have.length', 2);
            cy.get('.product-inventory tr')
                .last()
                .contains(item.title)
                .siblings()
                .contains(item.price)
                .siblings()
                .contains(item.quantity);
        });

        it('3. 상품명, 금액, 수량은 공백이 불가능하다.', () => {
            const item = {
                title: '아이스 아메리카노',
                price: 1500,
                quantity: 5,
            };

            cy.get('.product-container').within(() => {
                // when - 미 입력 상태, 유효하지 않은 input field 수량
                cy.get('input:invalid').should('have.length', 3);

                cy.get('#product-name-input').type(item.title);

                cy.get('input:invalid').should('have.length', 2);

                cy.get('#product-price-input').type(item.price);

                cy.get('input:invalid').should('have.length', 1);

                cy.get('#product-quantity-input').type(item.quantity);

                // then - 미 입력 상태, 유효하지 않은 input field 수량
                cy.get('input:valid').should('have.length', 3);
            });
        });

        it('4. 상품 수량은 최소 1개 이상 입력해야 한다.', () => {
            // when - 상품을 0개 등록한다.
            const item = {
                title: '아이스 아메리카노',
                price: 3000,
                quantity: 0,
            };
            cy.typeProductItem(item);
            cy.get('#product-add-button').click();

            // then - 해당 에러 문구가 등장한다.
            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);

            // then - 해당 에러 문구가 등장한다.
            cy.typeProductItem(item)
                .type('{enter}')
                .then(() => {
                    expect(alertStub).to.be.calledWith('상품 수량은 1개 이상이어야 합니다!');
                });
        });

        it('5. 상품 가격은 100원 이상이어야 한다. 100원 미만으로 입력한 경우, alert가 뜬다.', () => {
            // when - 100원 미만 상품을 등록한다.
            const item = {
                title: '아이스 아메리카노',
                price: 30,
                quantity: 5,
            };

            cy.typeProductItem(item);
            cy.get('#product-add-button').click();

            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);

            // then - 해당 에러 문구가 등장한다.
            cy.typeProductItem(item)
                .type('{enter}')
                .then(() => {
                    expect(alertStub).to.be.calledWith('상품 가격은 최소 100원 이상이어야 합니다!');
                });
        });

        it('6. 상품 가격은 10원 단위로 나누어떨어져야한다. 나누어 떨어지지 않으면, alert가 뜬다.', () => {
            // when - 10원 단위로 나누어 떨이지지 않는 상품을 등록한다.
            const item = {
                title: '아이스 아메리카노',
                price: 3333,
                quantity: 5,
            };

            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);

            cy.typeProductItem(item)
                .type('{enter}')
                .then(() => {
                    expect(alertStub).to.be.calledWith('상품 가격은 10원 단위로 나누어 떨어져야합니다!');
                });
        });

        it('7. 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
            // given - 1개의 상품을 등록하여 테이블 row가 2줄 상태이다.
            const item = {
                title: 'ice americano',
                price: 3000,
                quantity: 5,
            };
            cy.get('.product-inventory tr').should('have.length', 1);
            cy.typeProductItem(item);
            cy.get('#product-add-button').click();
            cy.get('.product-inventory tr').should('have.length', 2);

            // when - 같은 이름의 상품을 재등록한다.
            cy.typeProductItem(item);
            cy.get('#product-add-button').click();

            // then - 테이블 row가 증가하지 않는다.
            cy.get('.product-inventory tr').should('have.length', 2);
        });

        it('8. 상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
            // given - 1개의 상품을 등록하여 테이블 row가 2줄 상태이다.
            const item1 = {
                title: 'americano',
                price: 3000,
                quantity: 5,
            };
            cy.typeProductItem(item1);
            cy.get('#product-add-button').click();
            cy.get('.product-inventory tr').should('have.length', 2);

            // when - 다른 tab에 이동한다.
            cy.get('#vending-machine-manage-menu').click();

            // then - 테이블 row가 유지된다.
            cy.get('#product-manage-menu').click();
            cy.get('.product-inventory tr').should('have.length', 2);
        });
    });
});
