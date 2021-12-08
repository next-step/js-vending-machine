export default class LocalStorageService<JSON> {
  #key: string
  #storage: Storage

  constructor(key: string) {
    this.#storage = window.localStorage
    this.#key = key
  }

  get(): JSON | null {
    const value = this.#storage.getItem(this.#key)
    if (value === undefined || value === null || value === '') return null
    return this.toTargetType(value)
  }

  set(newValue: JSON) {
    this.#storage.setItem(this.#key, this.toString(newValue))
  }

  clean() {
    this.#storage.removeItem(this.#key)
  }

  toTargetType(data: any): JSON {
    return JSON.parse(data)
  }

  toString(data: JSON): string {
    return JSON.stringify(data)
  }
}
