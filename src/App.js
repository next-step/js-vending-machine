import ProductInventory from './components/ProductInventory.js'
import ProductPurchase from './components/ProductPurchase.js'
import Change from './components/Change.js'
import { ACTIONS, VIEWS } from './constants.js'
import { localStorages } from './storage/index.js'

export default class App {
  #store
  #state
  constructor(store, state) {
    this.#store = store
    this.#state = state
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
    localStorages.set(storageKey, newState)
    this.#store.notifyObservers([nextRoute])
  }
  setRoute = ({ route }) => {
    this.#store.notifyObservers([route])
  }

  reducer = (prevState, { type, payload }) => {
    switch (type) {
      case ACTIONS.ADD_PRODUCT:
        return this.addProduct(prevState, payload)
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
}
