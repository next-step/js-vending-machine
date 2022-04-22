/// <reference types="cypress" />
describe('step1', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  })


  it('app이 존재해야한다', () => {
    cy.get('#app').should('exist')
  });

  // given
  describe('상품 관리탭이 렌더링된 후', () => {
    const reset = () => {
      cy.reload();
    }

    it('최초 상품 목록은 비워진 상태이다.', () => {
      cy.get('#app').find('#product-manage').should('have.length', 0)
    });

    describe('상품명, 금액, 수량을 추가할 수 있다.', () => {
      it('step1-1 상품명, 금액, 수량은 공백이 불가능하다.', () => {
        cy.get('#product-name-input').then($input => $input[0].checkValidity()).should('be.false');
        cy.get('#product-price-input').then($input => $input[0].checkValidity()).should('be.false');
        cy.get('#product-quantity-input').then($input => $input[0].checkValidity()).should('be.false');
      })

      it('step1-2 상품의 최소 수량은 1개여야 한다.', () => {
        cy.get('#product-quantity-input').type('0')
          .then($input => $input[0].checkValidity()).should('be.false')

        cy.get('#product-quantity-input').clear()

        cy.get('#product-quantity-input').type('1')
          .then($input => $input[0].checkValidity()).should('be.true');
      })

      it('step1-3 상품의 최소 가격은 100원이다', () => {
        cy.get('#product-price-input').type('99')
          .then($input => $input[0].checkValidity()).should('be.false');

        cy.get('#product-quantity-input').clear()

        cy.get('#product-price-input').type('100')
          .then($input => $input[0].checkValidity()).should('be.true');
      })

      it('step-1-4 상품의 가격은 10원으로 나누어 떨어져야 한다.', () => {
        cy.get('#product-price-input').type('111')
          .then($input => $input[0].checkValidity()).should('be.false');

        cy.get('#product-price-input').clear();

        cy.get('#product-price-input').type('100')
          .then($input => $input[0].checkValidity()).should('be.true');
      })
    })

    // given
    describe('이름의 상품이 있을 때' , () => {
      before(() => {
        reset();
      })

      // when
      context('같은 상품명의 데이터를 추가하면', () => {
        before(() => {
          cy.get('#product-name-input').type('상품1')
          cy.get('#product-price-input').type('100')
          cy.get('#product-quantity-input').type('1')

          cy.get('#product-add-button').click()
          cy.get('#product-name-input').clear()
          cy.get('#product-price-input').clear()
          cy.get('#product-quantity-input').clear()

          cy.get('#product-name-input').type('상품1')
          cy.get('#product-price-input').type('200')
          cy.get('#product-quantity-input').type('2')

          cy.get('#product-add-button').click()
        })

        // then
        it('step1-5 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
          expect(cy.get('#product-manage-name').should('have.text', '상품1'))
          expect(cy.get('#product-manage-price').should('have.text', '200'))
          expect(cy.get('#product-manage-quantity').should('have.text', '2'))
        })
      })
    })

    describe('사용자는 추가한 상품을 확인할 수 있다.', () => {
      before(() => {
        reset();
      })
      it('step1-6 상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다.', () => {
        cy.get('#product-name-input').type('상품1')
        cy.get('#product-price-input').type('100')
        cy.get('#product-quantity-input').type('1')

        cy.get('#product-add-button').click()

        expect(cy.get('#product-manage-name').should('have.text', '상품1'))
        expect(cy.get('#product-manage-price').should('have.text', '100'))
        expect(cy.get('#product-manage-quantity').should('have.text', '1'))
      })

      it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {

      })
    })

  })

})
