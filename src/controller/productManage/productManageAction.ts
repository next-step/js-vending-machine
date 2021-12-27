import { ProductProps } from '../../store/ProductStore'
import { ADD_PRODUCT, RENDER_PRODUCT } from '../../utils/constants/action'

interface AddProductAction {
  type: typeof ADD_PRODUCT
  payload: ProductProps
}

interface RenderProductAction {
  type: typeof RENDER_PRODUCT
}

type ProductManageReucerAction = AddProductAction | RenderProductAction

export type { ProductManageReucerAction }
