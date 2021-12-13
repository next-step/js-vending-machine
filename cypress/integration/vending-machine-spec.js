// @ts-nocheck
import storage from '../../dist/store/localStorageReducer.js'
import { Route, ErrorBoundaries, ErrorMsgs } from '../../dist/constants.js'

const Routes = [Route.productInventory, Route.machineCharge, Route.userPurchase]

describe('vending-machine mission', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  describe('step 1', () => {
    describe('최초 접속시 localStorage 동기화', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
      it('route 저장데이터가 없으면 "상품관리"탭이 노출됨', () => {
        const target = Routes[0]
        Routes.forEach(r => {
          const cyComponent = cy[r]()
          if (r === target) cyComponent.should('be.visible')
          else cyComponent.should('not.exist')
        })
      })

      it('route 저장데이터가 있으면 기존 저장된 탭이 노출됨', () => {
        // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-preserve-cookies-localStorage-in-between-my-tests
        storage.set('route', 'userPurchase')
        const target = storage.getValue('route')
        expect(target).to.equal('userPurchase')

        Routes.forEach(r => {
          const cyComponent = cy[r]()
          if (r === target) cyComponent.should('be.visible')
          else cyComponent.should('not.exist')
        })
      })

      it('inventory 저장데이터가 없으면 리스트 비노출됨', () => {
        cy.gnbClick(0)
        cy.inventoryList().should('have.length', 0)
      })

      it('(NOT A TEST) localStorage에 데이터를 남기기 위함', () => {
        cy.inventoryAdd('커피', 650, 20)
        cy.inventoryAdd('칠성사이다', 800, 10)
        cy.inventoryAdd('코카콜라', 900, 18)
      })

      it('inventory 저장데이터가 있으면 기존 저장된 리스트 노출됨', () => {
        cy.inventoryList().should('have.length', 3)
      })
    })

    describe('상품 추가/수정', () => {
      describe('정상동작', () => {
        it('새항목 입력시 새로 추가됨', () => {
          cy.inventoryAdd('환타', 500, 20)
          cy.inventoryList()
            .eq(3)
            .find('td')
            .eq(0)
            .should('have.text', '환타')
            .next()
            .should('have.text', '500')
            .next()
            .should('have.text', '20')
        })

        it('동일항목 입력시 기존내용 업데이트됨', () => {
          cy.inventoryAdd('환타', 1000, 15)
          cy.inventoryList()
            .eq(3)
            .find('td')
            .eq(0)
            .should('have.text', '환타')
            .next()
            .should('have.text', '1000')
            .next()
            .should('have.text', '15')
        })
      })

      describe('오류 테스트', () => {
        it('이름: 띄어쓰기 오류', () => {
          cy.inventoryAdd('콜라 사이다', 500, 10)
          cy.on('window:alert', text => {
            expect(text).to.contains(ErrorMsgs.inventory_spaceBetween)
          })
        })

        it(`금액: ${ErrorBoundaries.inventory_PriceMinimum}원 이하일 경우 오류`, () => {
          cy.inventoryAdd('코카콜라', 15, 10)
          cy.inventoryInputs()
            .eq(1)
            .then($el => {
              expect(Cypress.dom.unwrap($el)[0].reportValidity()).to.be.false
            })
        })
        it('금액: 10자리 미만 숫자가 0이 아닌 경우 오류', () => {
          cy.inventoryAdd('코카콜라', 515, 10)
          cy.inventoryInputs()
            .eq(1)
            .then($el => {
              expect(Cypress.dom.unwrap($el)[0].reportValidity()).to.be.false
            })
        })

        it(`수량: ${ErrorBoundaries.inventory_AmountMinimum} 미만일 경우 오류`, () => {
          cy.inventoryAdd('코카콜라', 500, -1)
          cy.inventoryInputs()
            .eq(2)
            .then($el => {
              expect(Cypress.dom.unwrap($el)[0].reportValidity()).to.be.false
            })
        })
      })
    })

    describe('탭이동시에도 데이터 유지', () => {
      it('탭이동시에도 데이터 유지', () => {
        cy.gnbClick(2)
        cy.gnbClick(0)
        cy.inventoryList().should('have.length', 4)
      })
    })
  })

  describe('step 2', () => {
    before(() => {
      cy.visit('http://localhost:3000/')
      cy.gnbClick(1)
    })
    describe('동전 보충', () => {
      const coinChargeSuccessTest = (price, expectedTotal) => {
        cy.chargeAdd(price).then(() => {
          const { total, q500, q100, q50, q10 } = storage.getValue('saving')
          expect(total).to.equal(expectedTotal)
          expect(q500 * 500 + q100 * 100 + q50 * 50 + q10 * 10).to.equal(expectedTotal)
          cy.machineCharged().should('have.text', expectedTotal)
        })
      }

      it('최초상태는 모두 0', () => {
        const storedValue = storage.getValue('saving')
        expect(storedValue).to.be.null
        cy.machineCharged().should('have.text', 0)
      })

      it('돈 보충하면 랜덤하게 금액 충전됨. 이 때 코인 총합은 충전된 돈과 같다.', () => {
        coinChargeSuccessTest(5000, 5000)
        coinChargeSuccessTest(2700, 7700)
        coinChargeSuccessTest(2380, 10080)
        coinChargeSuccessTest(4920, 15000)
      })
    })

    describe('오류 테스트', () => {
      it(`금액 ${ErrorBoundaries.machine_PriceMinimum}원 이하일 경우 오류`, () => {
        cy.chargeAdd(80)
        cy.on('window:alert', text => {
          expect(text).to.contains(ErrorMsgs.machine_PriceMinimum)
        })
      })
      it('금액: 10자리 미만 숫자가 0이 아닌 경우 오류', () => {
        cy.chargeAdd(1055)
        cy.on('window:alert', text => {
          expect(text).to.contains(ErrorMsgs.machine_PriceLimit)
        })
      })
    })

    describe('탭이동시에도 데이터 유지', () => {
      it('탭이동시에도 데이터 유지', () => {
        cy.gnbClick(0)
        cy.gnbClick(1)
        cy.machineCharged().should('have.text', 15000)
      })
    })
  })
})
