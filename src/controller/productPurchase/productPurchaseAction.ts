import { PURCHASE_PRODUCT, RETURN_COIN } from '../../utils/constants/action'

interface ProductPurchaseAction {
  type: typeof PURCHASE_PRODUCT
  payload: { name: string }
}

interface ReturnCoinAction {
  type: typeof RETURN_COIN
}
type ProductPurchaseReucerAction = ProductPurchaseAction | ReturnCoinAction

export type { ProductPurchaseReucerAction }
