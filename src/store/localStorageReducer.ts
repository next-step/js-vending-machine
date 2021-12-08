import LocalStorageService from '../service/localStorage.js'
import { PartialState, StateKey, StateKeys } from '../constants.js'

class LocalStorageReducer {
  #list: Map<StateKey, LocalStorageService<JSON>>
  constructor(keys: StateKey[]) {
    this.#list = new Map(keys.map(key => [key, new LocalStorageService(key)]))
  }
  getAll(): PartialState {
    return [...this.#list].reduce<{ [k in StateKey]: any }>((res, [key, storage]) => {
      const val = storage.get()
      if (val) res[key] = val
      return res
    }, {} as any)
  }
  get(key: StateKey) {
    return this.#list.get(key)!
  }
  set(key: StateKey, val: JSON) {
    const item = this.get(key)
    item.set(val)
    this.#list.set(key, item)
  }
  clean(key: StateKey) {
    const item = this.get(key)
    item.clean()
    this.#list.set(key, item)
  }
}

export default new LocalStorageReducer(StateKeys)
