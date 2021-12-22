import { CoinKeyValues, Coins, ErrorMsgs, InitialCoins } from '../constants.js'
import Store from '../store/index.js'

export const getTotalFromCoins = (coins: Coins) => {
  return CoinKeyValues.reduce((acc, [key, val], i) => {
    acc += coins[key] * val
    return acc
  }, 0)
}

const countSingleCoinValue = (sourceMoney: number, coinValue: number, ownedCoins: number = Number.MAX_SAFE_INTEGER) => {
  const count = Math.min(Math.floor(sourceMoney / coinValue), ownedCoins)
  const remains = sourceMoney - count * coinValue
  return { count, remains }
}

export const saveCoinsCalculator = (store: Store, money: number) => {
  const newOwnedCoins: Coins = { ...(store.get('ownedCoins') as Coins) }

  const finalRemains = [...CoinKeyValues]
    .sort(() => Math.random() - 0.5)
    .reduce((prevSource, [key, val]) => {
      const { count, remains } = countSingleCoinValue(prevSource, val)
      newOwnedCoins[key] += count
      return remains
    }, money)
  if (finalRemains > 0) throw Error(ErrorMsgs.machine_CalculateError)

  return newOwnedCoins
}

export const changeCoinsCalculator = (store: Store) => {
  const prevCharge = store.get('charge') as number
  const ownedCoins: Coins = { ...(store.get('ownedCoins') as Coins) }
  const changeCoins: Coins = { ...InitialCoins }

  const charge = CoinKeyValues.reduce((prevRemains, [key, val]) => {
    const { count, remains } = countSingleCoinValue(prevRemains, val, ownedCoins[key])
    changeCoins[key] = count
    ownedCoins[key] -= count
    return remains
  }, prevCharge)

  return {
    changeCoins,
    charge,
    ownedCoins,
  }
}
