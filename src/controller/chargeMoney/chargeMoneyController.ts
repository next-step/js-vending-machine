import { CHARGE_VENDING_MONEY } from '../../constants/chargeMoney/action'
import { VENDING_MACHINE_CHARGE_INPUT } from '../../constants/chargeMoney/element'
import {
  VENDING_MACHINE_CHARGE_COIN_INPUT_EMPTY,
  VENDING_MACHINE_CHARGE_COIN_INPUT_SPLIT_INVALID,
  VENDING_MACHINE_CHARGE_COIN_MINIMUM_INPUT_INVALID,
} from '../../constants/chargeMoney/errorMessage'
import MoneyStore from '../../store/MoneyStore'
import { $ } from '../../utils/dom/selector'
import { ChargeMoneyReucerAction } from './chargeMoneyAction'

export default class ChargeMoneyController {
  #moneyStore: MoneyStore

  constructor(moneyStore: MoneyStore) {
    this.#moneyStore = moneyStore
  }

  chargeMoney(): boolean {
    const $vendingMoneyAddInput = $({
      selector: VENDING_MACHINE_CHARGE_INPUT,
    }) as HTMLInputElement
    const money = Number($vendingMoneyAddInput.value ?? 0)

    if ($vendingMoneyAddInput.value === '') {
      alert(VENDING_MACHINE_CHARGE_COIN_INPUT_EMPTY)
      return false
    }

    if (money < 100) {
      alert(VENDING_MACHINE_CHARGE_COIN_MINIMUM_INPUT_INVALID)
      return false
    }

    if (money % 10 !== 0) {
      alert(VENDING_MACHINE_CHARGE_COIN_INPUT_SPLIT_INVALID)
      return false
    }

    this.#moneyStore.addVendingMoney({ money })
    return true
  }

  dispatch(action: ChargeMoneyReucerAction) {
    switch (action.type) {
      case CHARGE_VENDING_MONEY:
        return this.chargeMoney()
      default:
        return false
    }
  }
}
