import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/data/localStorage'
import { getRandomValue } from '../utils/data/random'

const VENDING_MONEY_KEY = 'vending_machine_moeny_key'
const VENDING_COIN_KEY = 'vending_coin_key'
const USER_MONEY_KEY = 'user_money_key'
interface Coin {
  '500원': number
  '100원': number
  '50원': number
  '10원': number
}

type MoneyPayload = { money: number }
export default class MoneyStore {
  #vendingMoney
  #userMoney
  #vendingCoin: Coin

  constructor() {
    this.#vendingMoney = Number(
      getLocalStorageItem({ key: VENDING_MONEY_KEY }) ?? 0
    )

    this.#vendingCoin = getLocalStorageItem({ key: VENDING_COIN_KEY }) ?? {
      '500원': 0,
      '100원': 0,
      '50원': 0,
      '10원': 0,
    }

    this.#userMoney = Number(getLocalStorageItem({ key: USER_MONEY_KEY })) ?? 0
  }

  addUserMoney({ money }: MoneyPayload) {
    this.#userMoney += money

    setLocalStorageItem({
      key: USER_MONEY_KEY,
      value: this.#userMoney.toString(),
    })
  }

  addVendingMoney({ money }: MoneyPayload) {
    this.#vendingMoney += money
    this.setVendingCoin(money)

    setLocalStorageItem({
      key: VENDING_MONEY_KEY,
      value: this.#vendingMoney.toString(),
    })
    setLocalStorageItem({
      key: VENDING_COIN_KEY,
      value: this.#vendingCoin,
    })
  }

  getVendingMoney(): number {
    return this.#vendingMoney
  }

  getUserMoney(): number {
    return this.#userMoney
  }

  setVendingCoin(money: number) {
    if (money === 0) {
      return
    }

    const prevCoin = { ...this.#vendingCoin }

    const coin500 = money >= 500 ? getRandomValue(Math.floor(money / 500)) : 0
    money -= coin500 * 500

    const coin100 = money >= 100 ? getRandomValue(Math.floor(money / 100)) : 0
    money -= coin100 * 100

    const coin50 = money >= 50 ? getRandomValue(Math.floor(money / 50)) : 0
    money -= coin50 * 50

    const coin10 = money >= 10 ? Math.floor(money / 10) : 0

    this.#vendingCoin = {
      '500원': prevCoin['500원'] + coin500,
      '100원': prevCoin['100원'] + coin100,
      '50원': prevCoin['50원'] + coin50,
      '10원': prevCoin['10원'] + coin10,
    }
  }

  getVendingMoneyCoin() {
    return this.#vendingCoin
  }
}
