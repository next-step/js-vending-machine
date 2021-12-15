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

  const inventoryItemShould = (itemIndex, name, price, amount) => {
    cy.inventoryList()
      .eq(itemIndex)
      .find('td')
      .eq(0)
      .should('have.text', name)
      .next()
      .should('have.text', price)
      .next()
      .should('have.text', amount)
  }

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

      it('__not a test (set route for localStorage test)', () => {
        storage.set('route', 'userPurchase')
      })

      it('route 저장데이터가 있으면 기존 저장된 탭이 노출됨', () => {
        // https://docs.cypress.io/faq/questions/using-cypress-faq#How-do-I-preserve-cookies-localStorage-in-between-my-tests

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
          inventoryItemShould(3, '환타', '500원', '20개')
        })

        it('동일항목 입력시 기존내용 업데이트됨', () => {
          cy.inventoryAdd('환타', 1000, 15)
          inventoryItemShould(3, '환타', '1,000원', '15개')
        })
      })

      describe('오류 테스트', () => {
        it('이름: 띄어쓰기 오류', () => {
          cy.inventoryAdd('콜라 사이다', 500, 10)
          cy.on('window:alert', text => {
            expect(text).to.contains(ErrorMsgs.inventory_SpaceBetween)
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
        cy.machineChargeAdd(price).then(() => {
          const { total, q500, q100, q50, q10 } = storage.getValue('coins')
          expect(total).to.equal(expectedTotal)
          expect(q500 * 500 + q100 * 100 + q50 * 50 + q10 * 10).to.equal(expectedTotal)
          cy.machineCharged().should('have.text', expectedTotal.toLocaleString('ko-KR'))
        })
      }

      it('최초상태는 모두 0', () => {
        const storedValue = storage.getValue('coins')
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
        cy.machineChargeAdd(80)
        cy.on('window:alert', text => {
          expect(text).to.contains(ErrorMsgs.machine_PriceMinimum)
        })
      })
      it('금액: 10자리 미만 숫자가 0이 아닌 경우 오류', () => {
        cy.machineChargeAdd(1055)
        cy.on('window:alert', text => {
          expect(text).to.contains(ErrorMsgs.machine_PriceLimit)
        })
      })
    })

    describe('탭이동시에도 데이터 유지', () => {
      it('탭이동시에도 데이터 유지', () => {
        cy.gnbClick(0)
        cy.gnbClick(1)
        cy.machineCharged().should('have.text', '15,000')
      })
    })
  })

  describe('step 3', () => {
    before(() => {
      cy.visit('http://localhost:3000/')
      cy.gnbClick(2)
      storage.set('inventory', [
        { name: '커피', price: 700, amount: 2 },
        { name: '칠성사이다', price: 750, amount: 3 },
        { name: '펩시콜라', price: 800, amount: 4 },
        { name: '코카콜라', price: 850, amount: 5 },
      ])
      storage.set('coins', { total: 5000, q500: 7, q100: 9, q50: 10, q10: 10 })
    })

    describe('금액 투입', () => {
      it('최초 잔액 0원', () => {
        cy.userCharged().should('have.text', 0)
      })

      const chargeTest = (chargeMoney, expectMoney, expectMachineMoney) => {
        cy.userChargeAdd(chargeMoney)
        cy.userCharged()
          .should('have.text', expectMoney.toLocaleString('ko-KR'))
          .then(() => {
            expect(storage.getValue('coins').total).to.equal(expectMachineMoney)
          })
      }

      it('돈 투입시 금액 충전됨. 기계 잔돈도 함께 충전됨', () => {
        chargeTest(1000, 1000, 6000)
        chargeTest(2000, 3000, 8000)
        chargeTest(2500, 5500, 10500)
      })

      it('돈 투입 오류 테스트', () => {
        cy.userChargeAdd(5)
        cy.on('window:alert', text => {
          expect(text).to.contains(ErrorMsgs.user_PriceMinimum)
        })
      })
    })

    describe('상품 구입', () => {
      const purchaseTest = (itemIndex, expectAmount, expectMoney) => {
        it(`상품 #${itemIndex} 구매. 잔여수량 ${expectAmount} 예상. 잔액 ${expectMoney}원 예상`, () => {
          cy.userBuy(itemIndex)
          cy.getListItem(itemIndex).find('td').eq(2).should('have.text', `${expectAmount}개`)
          cy.userCharged().should('have.text', expectMoney.toLocaleString('ko-KR'))
        })
      }
      purchaseTest(0, 1, 4800)
      purchaseTest(0, 0, 4100)
      purchaseTest(0, 0, 4100)
      purchaseTest(1, 2, 3350)
      purchaseTest(1, 1, 2600)
      purchaseTest(2, 3, 1800)
      purchaseTest(2, 2, 1000)
      purchaseTest(2, 1, 200)
      purchaseTest(2, 1, 200)
    })

    describe('탭이동시에도 데이터 유지', () => {
      it('탭이동시에도 데이터 유지', () => {
        cy.gnbClick(1)
        cy.machineCharged().should('have.text', '10,500')
        cy.gnbClick(0)
        inventoryItemShould(0, '커피', '700원', '0개')
        inventoryItemShould(1, '칠성사이다', '750원', '1개')
        inventoryItemShould(2, '펩시콜라', '800원', '1개')
        cy.gnbClick(2)
        cy.userCharged().should('have.text', '200')
      })
    })
  })
})
