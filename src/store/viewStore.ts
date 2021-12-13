import { PartialState, State } from '../types.js'
import { connectStore } from './index.js'
import View from '../core/view.js'

export default class ViewStore {
  #prevState: PartialState = {}
  #view: View

  constructor(view: View) {
    this.#view = view
    connectStore().register(this)
  }

  update(state: State) {
    const newState = this.#view.watch!(state)
    const updatedKeys = new Set()
    const updatedState = Object.keys(newState).reduce<PartialState>((p, k: keyof State) => {
      if (newState[k] !== this.#prevState[k]) {
        updatedKeys.add(k)
        p[k] = newState[k] as any
      }
      return p
    }, {})

    if (updatedKeys.size) {
      this.#prevState = state
      this.#view.onStoreUpdated(updatedState, state)
    }
  }

  deregister() {
    connectStore().deregister(this)
  }
}
