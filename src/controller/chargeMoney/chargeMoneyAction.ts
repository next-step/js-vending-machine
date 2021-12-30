import { CHARGE_VENDING_MONEY } from '../../utils/constants/action'

interface ChargeMoneyAction {
  type: typeof CHARGE_VENDING_MONEY
  payload: { money: number }
}

type ChargeMoneyReucerAction = ChargeMoneyAction

export type { ChargeMoneyReucerAction }
