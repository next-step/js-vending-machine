export type RouteHashType =
  | '#productManage'
  | '#chargeMoney'
  | '#productPurchase'

const FIRST_ROUTE: RouteHashType = '#productManage'
export class Router {
  constructor() {
    window.location.hash = FIRST_ROUTE
    this.init()
  }

  onHashChange() {
    const hash = window.location.hash as RouteHashType

    const fragment = document.createDocumentFragment()

    switch (hash) {
      case '#productManage':
        // render product manage
        break
      case '#chargeMoney':
        // render charge money
        break
      case '#productPurchase':
        // render product purchase
        break
    }
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange)
  }
}
