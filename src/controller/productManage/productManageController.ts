import { ADD_PRODUCT } from '../../constants/productManage/action'
import ProductStore from '../../store/ProductStore'
import { ProductManageReucerAction } from './productManageAction'

export default class ProductManageController {
  #productStore: ProductStore

  constructor(productStore: ProductStore) {
    this.#productStore = productStore
  }

  dispatch(action: ProductManageReucerAction) {
    switch (action.type) {
      case ADD_PRODUCT:
        this.#productStore.setProduct(action.payload)
        break
    }
  }
}
