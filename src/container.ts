import el from './util/dom.js'
import { connectStore } from './store/index.js'
import worker from './store/worker.js'
import { Actions } from './store/actions.js'

export default class Container extends HTMLElement {
  static #template = /* html */ `
    <vending-machine-app></vending-machine-app>
  `

  constructor() {
    super()
    this.id = 'app'
    el(this, [el(Container.#template)])
    const store = connectStore(this, worker)
    store.dispatch(Actions.init)
  }
}

customElements.define('app-container', Container)
