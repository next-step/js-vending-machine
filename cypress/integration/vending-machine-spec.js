// @ts-nocheck
import { ErrorMsgs } from '../../dist/store/worker.js'
import storage from '../../dist/store/storage.js'
import { Route } from '../../dist/types.js'

const Routes = [Route.productInventory, Route.machineCharge, Route.userPurchase]

describe('vending-machine step 1', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

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
      storage.set('route', Routes[2])
      const target = storage.get('route')
      Routes.forEach(r => {
        const cyComponent = cy[r]()
        if (r === target) cyComponent.should('be.visible')
        else cyComponent.should('not.exist')
      })
    })

    it('inventory 저장데이터가 없으면 리스트 비노출됨', () => {
      storage.set('route', Routes[0])
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

      it('금액: 100원 이하일 경우 오류', () => {
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

      it('수량: 0 이하일 경우 오류', () => {
        cy.inventoryAdd('코카콜라', 500, -1)
        cy.inventoryInputs()
          .eq(2)
          .then($el => {
            expect(Cypress.dom.unwrap($el)[0].reportValidity()).to.be.false
          })
      })
    })
  })
})
