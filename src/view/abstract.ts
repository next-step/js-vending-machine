import { Elem, State, StateKey } from '../constants.js'
import ViewStore from '../store/viewStore.js'
import el from '../util/dom.js'
import errorHandler from '../util/errorHandler.js'

type Handler = (e: Event | CustomEvent) => unknown

const eventHandlerWithValidation = (handler: Handler) => (e: CustomEvent) => {
  try {
    handler(e)
  } catch (err) {
    errorHandler('view', err)
  }
}

export default abstract class View extends HTMLElement {
  events = new Map()
  viewStore: ViewStore
  watchState?: readonly StateKey[]
  onStoreUpdated(updatedState: Partial<State>): void {}
  handlers?: [string, Handler][]

  constructor() {
    super()
    this.#addHandlers()
  }

  on(eventType: string, handler: Handler) {
    let cb = this.events.get(handler)
    if (!cb) {
      cb = eventHandlerWithValidation(handler)
      this.events.set(handler, cb)
    }
    this.addEventListener(eventType, cb)
    return this
  }
  off(eventType: string, handler: Handler) {
    const cb = this.events.get(handler)
    if (cb) this.removeEventListener(eventType, cb)
    return this
  }
  dispatch(actionType: string, data: unknown = null) {
    const event = new CustomEvent('dispatch', { detail: { actionType, data }, bubbles: true })
    this.dispatchEvent(event)
    return this
  }
  render(children: Elem | Elem[]) {
    el(this, children instanceof Array ? children : [children])
    return this
  }

  #addHandlers() {
    if (this.handlers?.length) {
      this.handlers.forEach(([eventType, handler]) => {
        this.on(eventType, handler)
      })
    }
  }

  connectedCallback() {
    if (this.watchState) {
      this.viewStore = new ViewStore(this)
    }
    this.#addHandlers()
  }

  disconnectedCallback() {
    if (this.watchState) {
      this.viewStore.deregister()
    }
    if (this.handlers?.length) {
      this.handlers.forEach(([eventType, handler]) => {
        this.off(eventType, handler)
      })
    }
  }
}
