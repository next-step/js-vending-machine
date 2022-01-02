import { CHARGE_VENDING_MONEY } from '../../constants/chargeMoney/action'

interface ChargeMoneyAction {
  type: typeof CHARGE_VENDING_MONEY
}

type ChargeMoneyReucerAction = ChargeMoneyAction

export type { ChargeMoneyReucerAction }
