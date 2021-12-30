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

describe('자판기 미션 2단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#vending-machine-manage-menu').click()
    cy.get('#charge-input').as('charge')
    cy.get('#charge-amount').as('amount')
  })
  it('충전 금액을 입력 후, 자판기 동전 충전 버튼을 눌러 자판기가 보유한 금액을 충전할 수 있다', () => {
    cy.chargeChange(5000)
    cy.get('@amount').should('have.text', 5000)
  })
  it('관리자는 잔돈을 누적하여 충전할 수 있다.', () => {
    cy.chargeChange(5000)
    cy.chargeChange(2000)
    cy.get('@amount').should('have.text', 7000)
  })
  it('다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.', () => {
    cy.chargeChange(5000)
    cy.get('#product-manage-menu').click()
    cy.get('#vending-machine-manage-menu').click()
    cy.get('@amount').should('have.text', 5000)
  })
  describe('예외 케이스 테스트', () => {
    it('최소 총전 금액은 100원이다.', () => {
      cy.chargeChange(50)
      cy.get('@charge').then(($input) => {
        expect($input[0].validationMessage).to.eq('값은 100 이상이어야 합니다.')
      })
    })
    it('충전 금액은 10원으로 나누어 떨어지는 금액만 충전이 가능하다', () => {
      cy.chargeChange(50)
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ERROR_MESSAGES.INVALID_CHANGE)
      })
    })
  })
})

describe('자판기 미션 3단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#product-purchase-menu').click()
    cy.get('#purchase-input').as('purchase')
    cy.get('#purchase-amount').as('amount')
  })
  it('사용자는 금액 충전 입력 요소에 충전할 금액을 입력한 후, 구매 금액 충전버튼을 이용하여 금액을 충전한다.', () => {
    cy.chargePurchase(1000)
    cy.get('@amount').should('have.text', 1000)
  })
  it('금액은 누적으로 충전이 가능하다.', () => {
    cy.chargePurchase(1000)
    cy.chargePurchase(2000)
    cy.get('@amount').should('have.text', 3000)
  })
  it('사용자는 충전한 금액을 바탕으로 상품을 구매할 수 있다.', () => {
    cy.get('#product-manage-menu').click()
    cy.addProduct('오렌지', 1500, 2)
    cy.addProduct('포도', 1200, 3)
    cy.addProduct('딸기', 1000, 5)
    cy.get('#product-purchase-menu').click()
    cy.chargePurchase(5000)
    cy.get('.purchase-product-button').eq(0).click()
    cy.get('.purchase-product-button').eq(1).click()
    cy.get('@amount').should('have.text', 2300)
  })
  describe('예외 케이스 테스트', () => {
    it('최소 충전 금액은 10원이다.', () => {
      cy.chargePurchase(5)
      cy.get('@purchase').then(($input) => {
        expect($input[0].validationMessage).to.eq('값은 10 이상이어야 합니다.')
      })
    })
    it('수량이 0인 상품은 구매할 수 없다.', () => {
      cy.get('#product-manage-menu').click()
      cy.addProduct('오렌지', 1500, 1)
      cy.get('#product-purchase-menu').click()
      cy.chargePurchase(3000)
      cy.get('.purchase-product-button').eq(0).click()
      cy.get('@amount').should('have.text', 1500)
      cy.get('.purchase-product-button').eq(0).click()
      cy.get('@amount').should('have.text', 1500)
    })
    it('구매하려는 상품 가격이 보유하고 있는 금액보다 높은 경우 상품을 구매할 수 없다.', () => {
      cy.get('#product-manage-menu').click()
      cy.addProduct('오렌지', 1500, 1)
      cy.get('#product-purchase-menu').click()
      cy.chargePurchase(800)
      cy.get('.purchase-product-button').eq(0).click()
      cy.get('@amount').should('have.text', 800)
    })
  })
})

describe('자판기 미션 4단계 요구 사항 ', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#vending-machine-manage-menu').click()
    cy.mockMathRandom()
    cy.chargeChange(2000)
    cy.chargeChange(2000)
    cy.get('#product-purchase-menu').click()
    cy.get('#purchase-amount').as('amount')
  })
  it('최소 개수의 동전으로 잔돈을 돌려준다.', () => {
    cy.chargePurchase(1000)
    cy.get('#coin-return-button').click()
    cy.get('@amount').should('have.text', 0)
    cy.remains(2, 0, 0, 0)
  })
  it('모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.', () => {
    cy.chargePurchase(4500)
    cy.get('#coin-return-button').click()
    cy.get('@amount').should('have.text', 500)
    cy.remains(4, 0, 40, 0)
  })
  it('반환한 동전의 결과는 누적되지 않는다.', () => {
    cy.chargePurchase(2000)
    cy.get('#coin-return-button').click()
    cy.remains(4, 0, 0, 0)
    cy.reload()
    cy.get('#product-purchase-menu').click()
    cy.remains(0, 0, 0, 0)
  })
})
