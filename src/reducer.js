import { ACTIONS, VIEWS } from './constants.js'
import { getRandomInt } from './utils/index.js'

export const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PRODUCT:
      return addProduct(prevState, payload)
    case ACTIONS.UPDATE_CHANGE:
      return updateChange(prevState, payload)
    default:
      prevState
  }
}
const addProduct = (prevState, { name, price, quantity }) => {
  const { products: prevProducts } = prevState
  const sameProductIndex = prevProducts.findIndex((p) => p.name === name)
  let products = [...prevProducts]
  if (sameProductIndex > -1) {
    products = products.filter((p, i) => i !== sameProductIndex)
  }
  return [
    VIEWS.PRODUCT_INVENTORY,
    { ...prevState, products: [...products, { name, price, quantity }] },
  ]
}
const updateChange = (prevState, { change }) => {
  const coins = getCoins(change, prevState.coins)
  const money = getMoney(coins)
  return [VIEWS.CHANGE, { ...prevState, coins, money }]
}
const getCoins = (originChange, prevCoins) => {
  let change = originChange
  const baseCoins = [500, 100, 50, 10]
  const coins = { ...prevCoins }
  while (change >= 10) {
    const i = getRandomInt(0, 4)
    if (change > baseCoins[i]) {
      const coin = baseCoins[i]
      const coinNum = Math.floor(change / coin)
      coins[coin] = coins[coin] + coinNum
      change -= coin * coinNum
    }
  }
  return coins
}
const getMoney = (coins) => {
  const nums = Object.values(coins)
  const baseCoins = Object.keys(coins)
  return baseCoins.reduce((p, c, i) => p + c * nums[i], 0)
}
