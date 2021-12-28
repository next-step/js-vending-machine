export const localStorages = {
  get: (key) => {
    const storageItem = localStorage.getItem(key)
    return storageItem ? JSON.parse(storageItem) : null
  },
  set: (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload))
  },
  clear: () => {
    localStorage.clear()
  },
}
export const storageKey = 'vending-machine'
