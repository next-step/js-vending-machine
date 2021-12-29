/// <reference types="cypress" />

import {
  VENDING_MACHINE_CHARGE_COIN_INPUT_EMPTY,
  VENDING_MACHINE_CHARGE_COIN_INPUT_SPLIT_INVALID,
  VENDING_MACHINE_CHARGE_COIN_MINIMUM_INPUT_INVALID,
} from '../support/constants'

const MONEY1 = 1320
const MONEY2 = 2000
describe('자판기 미션 2단계', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('https://eungyucho.github.io/js-vending-machine/')
    cy.setupNaviSelector()
    cy.get('@chargeNavi').click()
    cy.setupChargeVendingMachineSelector()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('렌더링 시 상품 관리 화면의 컴포넌트가 렌더링된다.', () => {
    expect(cy.get('@input').should('be.visible'))
    expect(cy.get('@button').should('be.visible'))
    expect(cy.get('@moneyInventory').should('be.visible'))
    expect(cy.get('@coinInventory').should('be.visible'))
  })

  it('잔돈 충전 페이지에서 최초 자판기가 보유한 금액은 0원이며, 각 동전의 개수는 0개이다.', () => {
    expect(cy.get('@moneyInventory').should('have.text', '0'))
    const initialCoin = [0, 0, 0, 0]
    cy.checkVendingCoinAmount(initialCoin)
  })

  it('충전 금액을 입력하지 않고 버튼을 누르면 에러메세지를 표시한다.', () => {
    cy.callAlertWith('@button', VENDING_MACHINE_CHARGE_COIN_INPUT_EMPTY)
  })

  it('최소 충전 금액인 100원 이하를 충전할 시 에러메세지를 표시한다.', () => {
    cy.get('@input').type(90)

    cy.callAlertWith(
      '@button',
      VENDING_MACHINE_CHARGE_COIN_MINIMUM_INPUT_INVALID
    )
  })

  it('충전 금액이 10원으로 나누어 떨어지지 않으면 에러메세지를 표시한다.', () => {
    cy.get('@input').type(101)
    cy.callAlertWith('@button', VENDING_MACHINE_CHARGE_COIN_INPUT_SPLIT_INVALID)
  })

  it('자판기가 보유한 금액은 {금액}원 형식으로 나타낸다. ', () => {
    cy.get('@input').type(MONEY1)
    cy.get('@button')
      .click()
      .then(() => {
        expect(
          cy
            .get('@moneyInventory')
            .parent()
            .should('have.text', '보유 금액: ' + MONEY1.toLocaleString() + '원')
        )
      })
  })

  it('관리자는 잔돈을 누적하여 충전할 수 있다. ', () => {
    cy.get('@input').type(MONEY2)
    cy.get('@button')
      .click()
      .then(() => {
        expect(
          cy
            .get('@moneyInventory')
            .parent()
            .should(
              'have.text',
              '보유 금액: ' + (MONEY1 + MONEY2).toLocaleString() + '원'
            )
        )
      })
  })

  it('동전의 개수를 나타내는 정보는 {개수}개 형식으로 나타낸다.', () => {
    cy.checkInventorySuffix()
  })

  it('다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.', () => {
    cy.get('@manageNavi').click()
    cy.get('@chargeNavi')
      .click()
      .then(() => {
        expect(
          cy
            .get('@moneyInventory')
            .parent()
            .should(
              'have.text',
              '보유 금액: ' + (MONEY1 + MONEY2).toLocaleString() + '원'
            )
        )
      })
  })
})
