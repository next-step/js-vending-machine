import {
  ADD_USER_MONEY,
  PURCHASE_PRODUCT,
  RETURN_COIN,
} from '../../constants/productPurchase/action'

interface ProductPurchaseAction {
  type: typeof PURCHASE_PRODUCT
  payload: { name: string }
}

interface AddUserMoneyAction {
  type: typeof ADD_USER_MONEY
  payload: { money: number }
}

interface ReturnCoinAction {
  type: typeof RETURN_COIN
}

type ProductPurchaseReucerAction =
  | AddUserMoneyAction
  | ProductPurchaseAction
  | ReturnCoinAction

export type { ProductPurchaseReucerAction }
