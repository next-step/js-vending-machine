import ProductInventory from './components/ProductInventory.js'
import ProductPurchase from './components/ProductPurchase.js'
import Change from './components/Change.js'
import { storageKey } from './storage/index.js'
import { reducer } from './reducer.js'

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
    const [nextRoute, newState] = reducer(this.#state, action)
    this.#state = newState
    this.#storage.set(storageKey, newState)
    this.#store.notifyObservers([nextRoute])
  }
  setRoute = ({ route }) => {
    this.#store.notifyObservers([route])
  }
}
