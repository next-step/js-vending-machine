import MoneyChargeModel from '../../model/moneyChargeModel'
import MoneyStore from '../../store/MoneyStore'
import { CHARGE_VENDING_MONEY } from '../../utils/constants/action'
import { ChargeMoneyReucerAction } from './chargeMoneyAction'

export default class ChargeMoneyController {
  #model: MoneyChargeModel

  constructor(moneyStore: MoneyStore) {
    this.#model = new MoneyChargeModel(moneyStore)
  }

  dispatch(action: ChargeMoneyReucerAction) {
    switch (action.type) {
      case CHARGE_VENDING_MONEY:
        this.#model.addVendingMoney(action.payload)
        break
    }
  }
}
