import { CHARGE_VENDING_MONEY } from '../../constants/chargeMoney/action'
import MoneyStore from '../../store/MoneyStore'
import { ChargeMoneyReucerAction } from './chargeMoneyAction'

export default class ChargeMoneyController {
  #moneyStore: MoneyStore

  constructor(moneyStore: MoneyStore) {
    this.#moneyStore = moneyStore
  }

  dispatch(action: ChargeMoneyReucerAction) {
    switch (action.type) {
      case CHARGE_VENDING_MONEY:
        this.#moneyStore.addVendingMoney({ money: action.payload.money })
        break
    }
  }
}
