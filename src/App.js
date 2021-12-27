import ProductInventory from './components/ProductInventory.js'
import ProductPurchase from './components/ProductPurchase.js'
import Change from './components/Change.js'
import { ACTIONS, VIEWS } from './constants.js'
import { storageKey } from './storage/index.js'
import { getRandomInt } from './utils/index.js'

export default class App {
  #store
  #state
  #storage
  constructor(store, state, storage) {
    this.#store = store
    this.#state = state
    this.#storage = storage
    this.init()
  }
  init = () => {
    document.querySelectorAll('button').forEach((node) => {
      node.addEventListener('click', () => {
        this.setRoute({ route: node.id })
      })
    })

    const getState = this.getState
    const setState = this.setState
    this.#store.registerObserver(
      {
        key: 'vending-machine-manage-menu',
        component: new Change('#app', { getState, setState }),
      },
      {
        key: 'product-purchase-menu',
        component: new ProductPurchase('#app', { getState, setState }),
      },
      {
        key: 'product-manage-menu',
        component: new ProductInventory('#app', { getState, setState }),
      }
    )
  }
  getState = () => this.#state

  setState = (action) => {
    const [nextRoute, newState] = this.reducer(this.#state, action)
    this.#state = newState
    this.#storage.set(storageKey, newState)
    this.#store.notifyObservers([nextRoute])
  }
  setRoute = ({ route }) => {
    this.#store.notifyObservers([route])
  }

  reducer = (prevState, { type, payload }) => {
    switch (type) {
      case ACTIONS.ADD_PRODUCT:
        return this.addProduct(prevState, payload)
      case ACTIONS.UPDATE_CHANGE:
        return this.updateChange(prevState, payload)
      default:
        prevState
    }
  }
  addProduct = (prevState, { name, price, quantity }) => {
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
  updateChange = (prevState, { change }) => {
    const coins = this.getCoins(change, prevState.coins)
    const money = this.getMoney(coins)
    return [VIEWS.CHANGE, { ...prevState, coins, money }]
  }
  getCoins = (originChange, prevCoins) => {
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
  getMoney = (coins) => {
    const nums = Object.values(coins)
    const baseCoins = Object.keys(coins)
    return baseCoins.reduce((p, c, i) => p + c * nums[i], 0)
  }
}
