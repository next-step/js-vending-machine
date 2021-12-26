import App from './App.js'
import Store from './store/index.js'
import { localStorages, storageKey } from './storage/index.js'

const storageItem = localStorages.get(storageKey)
const vendingMachineItems = storageItem ? storageItem : { products: [] }

new App(new Store(), vendingMachineItems)
