import { DispatchEvent, ActionWorker, State, PartialState, StateKey, ErrorMsgs, Dispatcher } from '../constants.js'
import ViewStore from './viewStore.js'
import localStorageReducer from './localStorageReducer.js'
import Actions from './actions.js'
import errorHandler from '../util/errorHandler.js'

export default class Store {
  #subscribers = new Set()
  #state: State
  #dispatcher: Dispatcher

  constructor(container: HTMLElement, actionWorker: ActionWorker) {
    this.#dispatcher = actionWorker(this)
    container.addEventListener('dispatch', ({ detail: { actionType, data } }: DispatchEvent) => {
      this.dispatch(actionType, data)
    })
  }

  dispatch(actionType: keyof typeof Actions, data: unknown = null) {
    console.info(`%c[[%c${actionType}%c]]`, 'color: #ee8', 'color: #8ee', 'color: #ee8', data)
    this.#dispatcher(actionType)(data)
  }

  register(viewStore: ViewStore) {
    this.#subscribers.add(viewStore)
  }

  deregister(viewStore: ViewStore) {
    this.#subscribers.delete(viewStore)
  }

  publish() {
    this.#subscribers.forEach((subscriber: ViewStore) => {
      subscriber.update(this.#state)
    })
  }

  setValue(state: PartialState, needUpdate: boolean = true) {
    window.requestAnimationFrame(() => {
      this.#state = { ...this.#state, ...state }
      if (needUpdate) {
        const newStorage = Object.entries(state) as [StateKey, any][]
        newStorage.forEach(([k, v]) => localStorageReducer.set(k, v))
      }
      this.publish()
    })
  }

  get(prop: StateKey) {
    return this.#state[prop]
  }
}

export const connectStore = (() => {
  let closureStore: Store
  return (elem?: HTMLElement, actionWorker?: ActionWorker) => {
    try {
      if (!closureStore) {
        if (!elem || !actionWorker) throw Error(ErrorMsgs.store_InitError)
        closureStore = new Store(elem, actionWorker)
      }
    } catch (err) {
      errorHandler('store', err)
    }
    return closureStore
  }
})()
