import { $ } from '../utils/dom/selector'
import ChargeMoneyView from '../views/chargeMoney/ChargeMoneyView'
import ProductManageView from '../views/productManage/ProductManageView'
import ProductPurchaseView from '../views/productPurchase/ProductPurchaseView'

export type RouteHashType =
  | '#productManage'
  | '#chargeMoney'
  | '#productPurchase'

const FIRST_ROUTE: RouteHashType = '#productManage'

export const $Root = $({ selector: '#app' }) as HTMLDivElement

type RouteView = {
  productManageView: ProductManageView
  chargeMoneyView: ChargeMoneyView
  productPurchaseView: ProductPurchaseView
}
export class Router {
  productManageView: ProductManageView
  chargeMoneyView: ChargeMoneyView
  productPurchaseView: ProductPurchaseView

  constructor({
    productManageView,
    chargeMoneyView,
    productPurchaseView,
  }: RouteView) {
    this.productManageView = productManageView
    this.chargeMoneyView = chargeMoneyView
    this.productPurchaseView = productPurchaseView
    this.init()
  }

  onHashChange() {
    const hash = window.location.hash as RouteHashType

    switch (hash) {
      case '#productManage':
        this.productManageView.render()
        break
      case '#chargeMoney':
        this.chargeMoneyView.render()
        break
      case '#productPurchase':
        this.productPurchaseView.render()
        break
    }
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange.bind(this))

    window.location.hash = FIRST_ROUTE
  }
}
