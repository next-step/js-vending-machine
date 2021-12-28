// @ts-nocheck
import storage from '../../dist/store/localStorageReducer.js'
import { Route, ErrorBoundaries, ErrorMsgs } from '../../dist/constants.js'
import { getTotalFromCoins } from '../../dist/service/coinCalculator.js'
import lnKo from '../../dist/util/lnKo'

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
          const ownedCoins = storage.getValue('ownedCoins')
          if (ownedCoins) expect(getTotalFromCoins(ownedCoins)).to.equal(expectedTotal)
          cy.machineCharged().should('have.text', lnKo(expectedTotal))
        })
      }

      it('최초상태는 모두 0', () => {
        const storedValue = storage.getValue('ownedCoins')
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
      storage.set('ownedCoins', { q500: 7, q100: 9, q50: 10, q10: 10 })
    })

    describe('금액 투입', () => {
      it('최초 잔액 0원', () => {
        cy.userCharged().should('have.text', 0)
      })

      const chargeTest = (chargeMoney, expectMoney, expectMachineMoney) => {
        cy.userChargeAdd(chargeMoney)
        cy.userCharged()
          .should('have.text', lnKo(expectMoney))
          .then(() => {
            expect(getTotalFromCoins(storage.getValue('ownedCoins'))).to.equal(expectMachineMoney)
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
          cy.userCharged().should('have.text', lnKo(expectMoney))
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

  describe('step 4', () => {
    const getChangesTest = ({ change, prevCharged }, expectedCharge) => {
      cy.getChange().then(() => {
        expect(storage.getValue('changeCoins')).to.deep.equal({
          q500: change[0],
          q100: change[1],
          q50: change[2],
          q10: change[3],
        })
        expect(storage.getValue('ownedCoins')).to.deep.equal({
          q500: prevCharged[0] - change[0],
          q100: prevCharged[1] - change[1],
          q50: prevCharged[2] - change[2],
          q10: prevCharged[3] - change[3],
        })
        if (expectedCharge) {
          expect(storage.getValue('charge')).to.equal(expectedCharge)
        }
      })
    }

    describe('전액을 반환할 수 있는 경우 - 매번 기계 5000원(7, 9, 10, 10개) / 사용자 4000원 충전된 상태에서 테스트.', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/')
        storage.set('inventory', [
          { name: '커피', price: 700, amount: 2 },
          { name: '칠성사이다', price: 750, amount: 3 },
          { name: '펩시콜라', price: 800, amount: 4 },
          { name: '코카콜라', price: 850, amount: 5 },
        ])
        storage.set('ownedCoins', { q500: 7, q100: 9, q50: 10, q10: 10 })
        storage.set('charge', 4000)
        cy.gnbClick(2)
      })
      it('잔돈은 금액이 큰 동전부터 반환한다 (1) - 700원 구매 / 3300원 남음.', () => {
        cy.userBuy(0)
        getChangesTest({ change: [6, 3, 0, 0], prevCharged: [7, 9, 10, 10] })
      })
      it('잔돈은 금액이 큰 동전부터 반환한다 (2) - 1400원 구매 / 2600원 남음.', () => {
        cy.userBuy(0)
        cy.userBuy(0)
        getChangesTest({ change: [5, 1, 0, 0], prevCharged: [7, 9, 10, 10] })
      })
      it('잔돈은 금액이 큰 동전부터 반환한다 (3) - 2150원 구매 / 1850원 남음.', () => {
        cy.userBuy(0)
        cy.userBuy(0)
        cy.userBuy(1)
        getChangesTest({ change: [3, 3, 1, 0], prevCharged: [7, 9, 10, 10] })
      })
      it('잔돈은 금액이 큰 동전부터 반환한다 (4) - 2950원 구매 / 1050원 남음.', () => {
        cy.userBuy(0)
        cy.userBuy(0)
        cy.userBuy(1)
        cy.userBuy(2)
        getChangesTest({ change: [2, 0, 1, 0], prevCharged: [7, 9, 10, 10] })
      })
      it('잔돈은 금액이 큰 동전부터 반환한다 (5) - 3750원 구매 / 250원 남음.', () => {
        cy.userBuy(0)
        cy.userBuy(0)
        cy.userBuy(1)
        cy.userBuy(2)
        cy.userBuy(2)
        getChangesTest({ change: [0, 2, 1, 0], prevCharged: [7, 9, 10, 10] })
      })
    })

    describe('전액을 반환할 수 없는 경우 (1) - 매번 기계 2030원(3, 0, 10, 3개) / 사용자 1090원 충전된 상태에서 테스트.', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/')
        storage.set('inventory', [
          { name: '커피', price: 700, amount: 2 },
          { name: '칠성사이다', price: 750, amount: 3 },
          { name: '펩시콜라', price: 800, amount: 4 },
          { name: '코카콜라', price: 850, amount: 5 },
        ])
        storage.set('ownedCoins', { q500: 3, q100: 0, q50: 10, q10: 3 })
        storage.set('charge', 1090)
        cy.gnbClick(2)
      })
      it('700원 구매 / 390원 남음. => 10원 반환불가', () => {
        cy.userBuy(0)
        getChangesTest({ change: [0, 0, 7, 3], prevCharged: [3, 0, 10, 3] }, 10)
      })
      it('850원 구매 / 240원 남음. => 10원 반환불가', () => {
        cy.userBuy(3)
        getChangesTest({ change: [0, 0, 4, 3], prevCharged: [3, 0, 10, 3] }, 10)
      })
    })

    describe('전액을 반환할 수 없는 경우 (2) - 매번 기계 1070원(2, 0, 1, 2개) / 사용자 1500원 충전된 상태에서 테스트.', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/')
        storage.set('inventory', [
          { name: '커피', price: 700, amount: 2 },
          { name: '칠성사이다', price: 750, amount: 3 },
          { name: '펩시콜라', price: 800, amount: 4 },
          { name: '코카콜라', price: 850, amount: 5 },
        ])
        storage.set('ownedCoins', { q500: 2, q100: 0, q50: 1, q10: 2 })
        storage.set('charge', 1500)
        cy.gnbClick(2)
      })
      it('700원 구매 / 800원 남음. => 230원 반환불가', () => {
        cy.userBuy(0)
        getChangesTest({ change: [1, 0, 1, 2], prevCharged: [2, 0, 1, 2] }, 230)
      })
      it('구매X => 430원 반환불가', () => {
        getChangesTest({ change: [2, 0, 1, 2], prevCharged: [2, 0, 1, 2] }, 430)
      })
    })

    describe('반환액은 누적되지 않음 (1) - 기계 160원 (0, 1, 1, 1개) / 사용자 1000원 충전(500원 2개)', () => {
      before(() => {
        cy.visit('http://localhost:3000/')
        storage.set('inventory', [
          { name: '커피', price: 700, amount: 2 },
          { name: '칠성사이다', price: 750, amount: 3 },
          { name: '펩시콜라', price: 800, amount: 4 },
          { name: '코카콜라', price: 850, amount: 5 },
        ])
        storage.set('charge', 1000)
        storage.set('ownedCoins', { q500: 2, q100: 1, q50: 1, q10: 1 })
        cy.gnbClick(2)
      })
      it('700원 구매 -> 160원 반환. 140원 남음.', () => {
        cy.userBuy(0)
        getChangesTest({ change: [0, 1, 1, 1], prevCharged: [2, 1, 1, 1] }, 140)
      })
    })
    describe('반환액은 누적되지 않음 (2) - 기계 1000원 (2, 0, 0, 0개) / 사용자 1000원 충전(500원 2개)', () => {
      before(() => {
        cy.visit('http://localhost:3000/')
        storage.set('inventory', [
          { name: '커피', price: 700, amount: 2 },
          { name: '칠성사이다', price: 750, amount: 3 },
          { name: '펩시콜라', price: 800, amount: 4 },
          { name: '코카콜라', price: 850, amount: 5 },
        ])
        storage.set('charge', 1140)
        storage.set('ownedCoins', { q500: 4, q100: 0, q50: 0, q10: 0 })
        cy.gnbClick(2)
      })
      it('1000원 입력(500원 2개 추가 강제) 후 850원 구매 -> 반환 X. 290원 남음.', () => {
        cy.userBuy(3)
        getChangesTest({ change: [0, 0, 0, 0], prevCharged: [4, 0, 0, 0] }, 290)
      })
    })
  })
})
