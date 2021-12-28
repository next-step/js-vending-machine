import MoneyStore from '../store/MoneyStore'

export default class MoneyChargeModel {
  #store: MoneyStore

  constructor(moneyStore: MoneyStore) {
    this.#store = moneyStore
  }

  addVendingMoney({ money }: { money: number }) {
    this.#store.addVendingMoney({ money })
  }
}
