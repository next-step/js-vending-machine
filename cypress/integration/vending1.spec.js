/// <reference types="cypress" />

import {
  PRODUCT_ADD_INPUT_INVALID,
  PRODUCT_ADD_PRICE_INVALID,
  PRODUCT_ADD_QUANTITY_INVALID,
} from '../support/constants'

const cola = ['콜라', 1300, 20]
const updatedCola = ['콜라', 1500, 1500]
const water = ['물', 800, 10]

describe('자판기 미션 1단계', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('https://eungyucho.github.io/js-vending-machine/')
    cy.setupProductManageSelector()
    cy.setupNaviSelector()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })
  it('렌더링 시 상품 관리 화면의 컴포넌트가 렌더링된다.', () => {
    cy.get('@name').should('be.visible')
    cy.get('@price').should('be.visible')
    cy.get('@quantity').should('be.visible')
    cy.get('@button').should('be.visible')
    cy.get('@inventory').get('tr').should('have.length', 1)
  })

  it('상품명, 금액, 수량은 공백이 불가능하다.', () => {
    cy.get('@name').type('잘못된 상품')
    cy.get('@price').type(5000)

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('@button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(PRODUCT_ADD_INPUT_INVALID)
      })
  })

  it('상품의 최소 수량은 1개여야 한다.', () => {
    cy.get('@name').type('잘못된 상품')
    cy.get('@price').type(5000)
    cy.get('@price').type(0)

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('@button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(PRODUCT_ADD_QUANTITY_INVALID)
      })
  })

  it('상품 금액이 10원으로 안나누어 떨어질 경우 에러를 띄워준다.', () => {
    cy.addProduct(['잘못된 상품', 5555, 20])

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('@button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(PRODUCT_ADD_PRICE_INVALID)
      })
  })

  it('정상적으로 상품을 입력하면 상품목록에 추가한 상품이 추가된다.', () => {
    cy.addProduct(cola)

    cy.get('@button')
      .click()
      .then(() => {
        cy.get('@inventory')
          .get('tr td')
          .each(($cell, index) => {
            if (typeof cola[index] === 'number') {
              cy.wrap($cell).should('have.text', cola[index].toLocaleString())
              return
            }
            cy.wrap($cell).should('have.text', cola[index])
          })
      })
  })

  it('같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.', () => {
    cy.addProduct(updatedCola)

    cy.get('@button')
      .click()
      .then(() => {
        cy.get('@inventory')
          .get('tr td')
          .each(($cell, index) => {
            if (typeof updatedCola[index] === 'number') {
              cy.wrap($cell).should(
                'have.text',
                updatedCola[index].toLocaleString()
              )
              return
            }
            cy.wrap($cell).should('have.text', updatedCola[index])
          })
      })
  })

  it('정상적으로 상품을 추가로 입력하면 상품목록 리스트에 추가된다.', () => {
    cy.addProduct(water)

    cy.get('@button')
      .click()
      .then(() => {
        cy.get('@inventory').get('tr').should('have.length', 3)
      })
  })

  it('상품 목록은 탭을 이동하여도 기존의 상품 목록이 유지되어야 한다.', () => {
    cy.get('@purchaseNavi').click()
    cy.get('@manageNavi')
      .click()
      .then(() => {
        cy.get('@inventory').get('tr').should('have.length', 3)
      })
  })
})
