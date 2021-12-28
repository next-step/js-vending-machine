import { $ } from '../utils/dom/selector'
import ChargeMoneyView from '../views/chargeMoney/ChargeMoneyView'
import ProductManageView from '../views/productManage/ProductManageView'

export type RouteHashType =
  | '#productManage'
  | '#chargeMoney'
  | '#productPurchase'

const FIRST_ROUTE: RouteHashType = '#productManage'

export const $Root = $({ selector: '#app' }) as HTMLDivElement

type RouteView = {
  productManageView: ProductManageView
  chargeMoneyView: ChargeMoneyView
}
export class Router {
  productManageView: ProductManageView
  chargeMoneyView: ChargeMoneyView

  constructor({ productManageView, chargeMoneyView }: RouteView) {
    this.productManageView = productManageView
    this.chargeMoneyView = chargeMoneyView
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
        $Root.innerHTML = '<div>productPurchase</div>'

        // render product purchase
        break
    }
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange.bind(this))

    window.location.hash = FIRST_ROUTE
  }
}
