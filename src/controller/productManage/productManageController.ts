import ProductManageModel from '../../model/productManageModel'
import ProductStore from '../../store/ProductStore'
import { ADD_PRODUCT, RENDER_PRODUCT } from '../../utils/constants/action'
import { ProductManageReucerAction } from './productManageAction'

export default class ProductManageController {
  #model: ProductManageModel

  constructor(productStore: ProductStore) {
    this.#model = new ProductManageModel(productStore)
  }

  dispatch(action: ProductManageReucerAction) {
    switch (action.type) {
      case ADD_PRODUCT:
        this.#model.addProduct(action.payload)
        break

      case RENDER_PRODUCT:
        this.#model.renderProduct()
        break
    }
  }
}
