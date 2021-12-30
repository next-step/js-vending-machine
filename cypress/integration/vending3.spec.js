/// <reference types="cypress" />

import {
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY,
  PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID,
  PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID,
  PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT,
  PURCHASE_PRODUCT_PURCHASE_NO_MONEY,
} from '../support/constants'

const COLA_PRICE = 1_000
const DOCTOR_PEPPER_PRICE = 2_000
const cola = ['콜라', COLA_PRICE, 1]
const doctorPepper = ['닥터페퍼', DOCTOR_PEPPER_PRICE, 1]
const MONEY1 = 2_000
const MONEY2 = 500

describe('자판기 미션 3단계', () => {
  before(() => {
    cy.visit('https://eungyucho.github.io/js-vending-machine/')
    cy.setupProductManage()
    cy.addProductAtBefore(doctorPepper)
    cy.get('@productAddButton').click()
    cy.addProductAtBefore(cola)
    cy.get('@productAddButton').click()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('https://eungyucho.github.io/js-vending-machine/')
    cy.setupNaviSelector()
    cy.get('@purchaseNavi').click()
    cy.setupProductPurchase()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('렌더링 시 상품 구매 화면이 렌더링된다.', () => {
    expect(cy.get('@chargeUserMoneyInput').should('be.visible'))
    expect(cy.get('@chargeUserMoneyButton').should('be.visible'))
    expect(cy.get('@chargeMoneyAmount').should('be.visible'))
    expect(cy.get('@productItemContainer').should('be.visible'))
    expect(cy.get('@returnCoinInventory').should('be.visible'))
  })

  context(
    '사용자는 금액 충전 입력 요소에 충전할 금액을 입력한 후, 구매 금액 충전버튼을 이용하여 금액을 충전한다.',
    () => {
      it('금액을 입력하지 않고 충전할 시 에러메세지를 표시한다.', () => {
        cy.callAlertWith(
          '@chargeUserMoneyButton',
          PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_EMPTY
        )
      })

      it('최소 충전 금액인 10원 미만으로 충전할 시 에러메세지를 표시한다.', () => {
        cy.get('@chargeUserMoneyInput').type(9)
        cy.callAlertWith(
          '@chargeUserMoneyButton',
          PURCHASE_PRODUCT_CHARGE_MONEY_MINIMUM_INPUT_INVALID
        )
      })

      it('금액이 10원으로 나누어 떨어지지 않을 시 에러메세지를 표시한다.', () => {
        cy.get('@chargeUserMoneyInput').type(101)
        cy.callAlertWith(
          '@chargeUserMoneyButton',
          PURCHASE_PRODUCT_CHARGE_MONEY_INPUT_SPLIT_INVALID
        )
      })

      it('충전을 성공하면 금액을 {금액}원 형식으로 나타낸다.', () => {
        cy.get('@chargeUserMoneyInput').type(MONEY1)
        cy.get('@chargeUserMoneyButton')
          .click()
          .then(() => {
            expect(
              cy
                .get('@chargeMoneyAmount')
                .parent()
                .should(
                  'have.text',
                  '충전 금액: ' + MONEY1.toLocaleString() + '원'
                )
            )
          })
      })

      it('금액을 누적으로 충전할 수 있다.', () => {
        cy.get('@chargeUserMoneyInput').type(MONEY2)
        cy.get('@chargeUserMoneyButton')
          .click()
          .then(() => {
            expect(
              cy
                .get('@chargeMoneyAmount')
                .parent()
                .should(
                  'have.text',
                  '충전 금액: ' + (MONEY1 + MONEY2).toLocaleString() + '원'
                )
            )
          })
      })
    }
  )

  context('사용자는 충전한 금액을 바탕으로 상품을 구매할 수 있다.', () => {
    it('정상적으로 상품을 구입 시 충전 금액이 차감되고 상품의 개수도 차감된다. ', () => {
      expect(
        cy
          .get('@productItemContainer')
          .get('tr td')
          .eq(2)
          .should('have.text', '1')
      )

      expect(
        cy
          .get('@chargeMoneyAmount')
          .parent()
          .should(
            'have.text',
            '충전 금액: ' + (MONEY1 + MONEY2).toLocaleString() + '원'
          )
      )

      cy.get('@productItemContainer')
        .get('td button')
        .first()
        .click()
        .then(() => {
          expect(
            cy
              .get('@chargeMoneyAmount')
              .parent()
              .should(
                'have.text',
                '충전 금액: ' +
                  (MONEY1 + MONEY2 - COLA_PRICE).toLocaleString() +
                  '원'
              )
          )
          expect(
            cy
              .get('@productItemContainer')
              .get('tr td')
              .eq(2)
              .should('have.text', '0')
          )
        })
    })

    it('수량이 0인 상품을 구매할 시 에러 메세지를 표시한다.', () => {
      const stub = cy.stub()
      cy.on('window:alert', stub)
      cy.get('@productItemContainer')
        .get('td button')
        .first()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            PURCHASE_PRODUCT_PURCHASE_PRODUCT_SOLD_OUT
          )
        })
    })

    it('구매할 상품의 금액이 현재 충전 금액보다 클 경우 에러 메세지를 표시한다.', () => {
      const stub = cy.stub()
      cy.on('window:alert', stub)
      cy.get('@productItemContainer')
        .get('td button')
        .eq(1)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            PURCHASE_PRODUCT_PURCHASE_NO_MONEY
          )
        })
    })
  })
})
