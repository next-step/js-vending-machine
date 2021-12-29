import { $ } from '../utils/dom/selector'
import ProductManageView from '../views/productManage/ProductManageView'

export type RouteHashType =
  | '#productManage'
  | '#chargeMoney'
  | '#productPurchase'

const FIRST_ROUTE: RouteHashType = '#productManage'

export const $Root = $({ selector: '#app' }) as HTMLDivElement

type RouteView = { productManageView: ProductManageView }
export class Router {
  productManageView: ProductManageView

  constructor({ productManageView }: RouteView) {
    this.productManageView = productManageView
    this.init()
  }

  onHashChange() {
    const hash = window.location.hash as RouteHashType

    switch (hash) {
      case '#productManage':
        this.productManageView.render()
        break
      case '#chargeMoney':
        $Root.innerHTML = '<div>chargeMoney</div>'
        // render charge money
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
