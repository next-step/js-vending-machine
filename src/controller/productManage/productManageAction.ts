import { ProductProps } from '../../store/ProductStore'
import { ADD_PRODUCT } from '../../utils/constants/action'

interface AddProductAction {
  type: typeof ADD_PRODUCT
  payload: ProductProps
}

type ProductManageReucerAction = AddProductAction

export type { ProductManageReucerAction }
