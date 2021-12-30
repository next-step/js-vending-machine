import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/data/localStorage'

const VENDING_MONEY_KEY = 'vending_machine_moeny_key'

interface CoinOutput {
  '500원': number
  '100원': number
  '50원': number
  '10원': number
}
export default class MoneyStore {
  #vendingMoney

  constructor() {
    const vendingMoney = Number(
      getLocalStorageItem({ key: VENDING_MONEY_KEY }) ?? 0
    )

    this.#vendingMoney = vendingMoney
  }

  addVendingMoney({ money }: { money: number }) {
    this.#vendingMoney += money

    setLocalStorageItem({
      key: VENDING_MONEY_KEY,
      value: this.#vendingMoney.toString(),
    })
  }

  getVendingMoney(): number {
    return this.#vendingMoney
  }

  getVendingMoneyCoin(): CoinOutput {
    let money = this.#vendingMoney

    if (money === 0) {
      return {
        '500원': 0,
        '100원': 0,
        '50원': 0,
        '10원': 0,
      }
    }

    const coin500 = Math.floor(money / 500)
    money -= coin500 * 500

    const coin100 = Math.floor(money / 100)
    money -= coin100 * 100

    const coin50 = Math.floor(money / 50)
    money -= coin50 * 50

    const coin10 = Math.floor(money / 10)
    money -= coin50 * 10

    return {
      '500원': coin500,
      '100원': coin100,
      '50원': coin50,
      '10원': coin10,
    }
  }
}
