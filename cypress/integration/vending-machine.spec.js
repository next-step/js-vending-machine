import { ERROR_MESSAGES } from '../../src/constants'

describe('자판기 미션 1단계 요구 사항 ', () => {
  const inputs = ['포도', 1000, 2]
  const sameInputs = ['포도', 1500, 4]
  beforeEach(() => {
    cy.visit('/')
    cy.get('#product-name-input').as('name')
    cy.get('#product-price-input').as('price')
    cy.get('#product-quantity-input').as('quantity')
    cy.get('#product-add-button').as('btn')
    cy.get('#product-inventory-container').as('inven')
  })

  it('사용자는 추가한 상품을 확인할 수 있다.', () => {
    cy.get('@name').type('포도').should('have.value', '포도')
    cy.get('@price').type(1000).should('have.value', 1000)
    cy.get('@quantity').type(2).should('have.value', 2)
    cy.get('@btn').click()
    cy.get('#product-inventory-container tr td').each(($el, i) => {
      cy.wrap($el).should('have.text', inputs[i])
    })
    cy.addProduct('오렌지', 1500, 5)
    cy.get('#product-inventory-container tr').should('have.length', 2)
  })

  it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다', () => {
    cy.addProduct('포도', 1000, 2)
    cy.addProduct('포도', 1500, 4)
    cy.get('#product-inventory-container tr td').each(($el, i) => {
      cy.wrap($el).should('have.text', sameInputs[i])
    })
  })

  it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
    cy.addProduct('포도', 1000, 2)
    cy.get('#vending-machine-manage-menu').click()
    cy.get('#product-manage-menu').click()
    cy.get('#product-inventory-container tr td').each(($el, i) => {
      cy.wrap($el).should('have.text', inputs[i])
    })
  })

  it('상품 목록은 로컬 스토리지에 저장되어 페이지 리프레시하여도 유지된다.', () => {
    cy.addProduct('포도', 1000, 2)
    cy.addProduct('주스', 1500, 4)
    cy.reload()
    cy.get('#product-inventory-container tr').should('have.length', 2)
  })

  describe('예외 케이스 테스트', () => {
    it('상품은 10원으로 나누어 떨어져야 한다', () => {
      cy.addProduct('포도', 115, 2)
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGES.INVALID_PRODUCT_PRICE)
      })
    })
    it('상품의 최소 가격은 100원이다', () => {
      cy.addProduct('포도', 5, 5)
      cy.get('@price').then(($input) => {
        expect($input[0].validationMessage).to.eq('값은 100 이상이어야 합니다.')
      })
    })
    it('상품의 최소 수량은 1개이다.', () => {
      cy.addProduct('포도', 1500, 0)
      cy.get('@quantity').then(($input) => {
        expect($input[0].validationMessage).to.eq('값은 1 이상이어야 합니다.')
      })
    })
    it('상품명, 금액, 수량은 공백이 불가능하다.', () => {
      cy.get('@btn').click()
      cy.get('input:invalid').should('have.length', 3)
      cy.get('@name').then(($input) => {
        expect($input[0].validationMessage).to.eq('이 입력란을 작성하세요.')
      })
    })
  })
})
