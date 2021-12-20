import { PartialState, State } from '../constants.js'
import { connectStore } from './index.js'
import View from '../view/abstract.js'

export default class ViewStore {
  #prevState: PartialState = {}
  #view: View

  constructor(view: View) {
    this.#view = view
    connectStore().register(this)
  }

  update(state: State) {
    const watchStateKeys = this.#view.watchState || []
    const updatedKeys = new Set()
    const updatedState = watchStateKeys.reduce<PartialState>((p, k: keyof State) => {
      if (state[k] !== this.#prevState[k]) {
        updatedKeys.add(k)
        p[k] = state[k] as any
      }
      return p
    }, {})

    if (updatedKeys.size) {
      this.#prevState = state
      this.#view.onStoreUpdated(updatedState)
    }
  }

  deregister() {
    connectStore().deregister(this)
  }
}
