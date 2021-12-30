import { ACTIONS, VIEWS } from './constants.js'
import { getRandomInt } from './utils/index.js'

export const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PRODUCT:
      return addProduct(prevState, payload)
    case ACTIONS.UPDATE_CHANGE:
      return updateChange(prevState, payload)
    case ACTIONS.CHARGE_PURCHASE:
      return chargePurhcase(prevState, payload)
    case ACTIONS.BUY_PRODUCT:
      return buyProduct(prevState, payload)
    case ACTIONS.RETURN_REMAIN:
      return returnRemain(prevState)
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

const chargePurhcase = (prevState, { purchase: userPurchase }) => {
  const purchase = userPurchase + prevState.purchase
  return [VIEWS.PRODUCT_PURCHASE, { ...prevState, purchase }]
}

const buyProduct = (prevState, { productName }) => {
  const { products: prevProducts, purchase: prevPurchase } = prevState
  const i = prevProducts.findIndex((product) => product.name === productName)
  const quantity = prevProducts[i]['quantity']
  if (quantity && prevPurchase >= prevProducts[i]['price']) {
    const purchase = prevPurchase - prevProducts[i]['price']
    const products = prevProducts.map((prevProduct, index) => {
      if (index === i) return { ...prevProduct, quantity: prevProduct.quantity - 1 }
      return prevProduct
    })
    return [VIEWS.PRODUCT_PURCHASE, { ...prevState, purchase, products }]
  }
  return [VIEWS.NOT_RENDER, prevState]
}

const returnRemain = (prevState) => {
  const { coins, purchase } = prevState
  const remains = { 500: 0, 100: 0, 50: 0, 10: 0 }
  let prevPurchase = purchase
  let [COIN_10, COIN_50, COIN_100, COIN_500] = Object.keys(coins)
  let [COIN_10_NUM, COIN_50_NUM, COIN_100_NUM, COIN_500_NUM] = Object.values(coins)

  while (prevPurchase >= 10) {
    if (prevPurchase >= COIN_500 && COIN_500_NUM > 0) {
      prevPurchase -= COIN_500
      COIN_500_NUM -= 1
      remains[COIN_500] += 1
      coins[COIN_500] -= 1
      continue
    }
    if (prevPurchase >= COIN_100 && COIN_100_NUM > 0) {
      prevPurchase -= COIN_100
      COIN_100_NUM -= 1
      remains[COIN_100] += 1
      coins[COIN_100] -= 1
      continue
    }
    if (prevPurchase >= COIN_50 && COIN_50_NUM > 0) {
      prevPurchase -= COIN_50
      COIN_50_NUM -= 1
      remains[COIN_50] += 1
      coins[COIN_50] -= 1
      continue
    }
    if (prevPurchase >= COIN_10 && COIN_10_NUM > 0) {
      prevPurchase -= COIN_10
      COIN_10_NUM -= 1
      remains[COIN_10] += 1
      coins[COIN_10] -= 1
      continue
    }
    break
  }
  return [
    VIEWS.PRODUCT_PURCHASE,
    { ...prevState, purchase: prevPurchase, remains, coins, money: getMoney(coins) },
  ]
}
