import { Router } from './routes/router'
import MoneyStore from './store/MoneyStore'
import ProductStore from './store/ProductStore'
import ChargeMoneyView from './views/chargeMoney/ChargeMoneyView'
import ProductManageView from './views/productManage/ProductManageView'

const productStore = new ProductStore()
const moneyStore = new MoneyStore()
const productManageView = new ProductManageView(productStore)
const chargeMoneyView = new ChargeMoneyView(moneyStore)

new Router({ productManageView, chargeMoneyView })

if (module.hot) {
  module.hot.accept()
}
