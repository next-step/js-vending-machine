import { ADD_PRODUCT } from '../../constants/productManage/action'

interface AddProductAction {
  type: typeof ADD_PRODUCT
}

type ProductManageReucerAction = AddProductAction

export type { ProductManageReucerAction }
