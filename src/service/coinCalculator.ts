import { CoinValues, ErrorMsgs } from '../constants.js'

const singleCoinCalculator = (source: number, coin: number) => {
  const count = Math.floor(source / coin)
  const remains = source - count * coin
  return { count, remains }
}

const chargeCalculator = (source: number) => {
  const res: number[] = [source]
  const finalRemains = [...CoinValues]
    .sort(() => Math.random() - 0.5)
    .reduce((prevSource, c) => {
      const { count, remains } = singleCoinCalculator(prevSource, c)
      res[CoinValues.indexOf(c) + 1] = count
      return remains
    }, source)
  if (finalRemains > 0) throw Error(ErrorMsgs.charge_calculateError)
  return res
}

export { chargeCalculator }
