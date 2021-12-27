import { Router } from './routes/router'
import ProductStore from './store/ProductStore'
import ProductManageView from './views/productManage/ProductManageView'

const productStore = new ProductStore()
const productManageView = new ProductManageView(productStore)

new Router({ productManageView })

if (module.hot) {
  module.hot.accept()
}
