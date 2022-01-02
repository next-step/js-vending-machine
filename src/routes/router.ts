import { $ } from '../utils/dom/selector'
import ChargeMoneyView from '../views/chargeMoney/ChargeMoneyView'
import ProductManageView from '../views/productManage/ProductManageView'
import ProductPurchaseView from '../views/productPurchase/ProductPurchaseView'
import { ViewInterface } from '../views/View'
import { bindPageChangeEvent, ON_PAGE_CHANGE } from './Event'

const PRODUCT_MANAGE_MENU = '#product-manage-menu'
const VENDING_MACHINE_MANAGE_MENU = '#vending-machine-manage-menu'
const PRODUCT_PURCHASE_MENU = '#product-purchase-menu'

export const $Root = $({ selector: '#app' }) as HTMLDivElement

export class Router {
  views: Map<string, ViewInterface>
  productManageView: ProductManageView
  chargeMoneyView: ChargeMoneyView
  productPurchaseView: ProductPurchaseView

  constructor(views: ViewInterface[]) {
    console.log(views)
    this.views = new Map<string, ViewInterface>()

    views.forEach((view) => {
      console.log('this view', view, view.viewId)
      this.views.set(view.viewId, view)
      console.log('this view', this.views)
    })
    this.init()
  }

  onRouteChanged(event: CustomEvent) {
    const route = event.detail.route as string

    const view = this.views.get(route)

    if (view) {
      view.render()
    }
  }

  init() {
    bindPageChangeEvent(
      $({ selector: PRODUCT_MANAGE_MENU }) as HTMLAnchorElement
    )
    bindPageChangeEvent(
      $({ selector: VENDING_MACHINE_MANAGE_MENU }) as HTMLAnchorElement
    )
    bindPageChangeEvent(
      $({ selector: PRODUCT_PURCHASE_MENU }) as HTMLAnchorElement
    )

    // window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener(ON_PAGE_CHANGE, this.onRouteChanged.bind(this))
    this.onRouteChanged(
      new CustomEvent(ON_PAGE_CHANGE, {
        detail: { route: 'product-manage-menu' },
      })
    )
  }
}
