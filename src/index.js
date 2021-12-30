import App from './App.js'
import Store from './store/index.js'
import { localStorages, storageKey } from './storage/index.js'

const storageItem = localStorages.get(storageKey)
const vendingMachineItems = storageItem
  ? storageItem
  : { products: [], coins: { 500: 0, 100: 0, 50: 0, 10: 0 }, money: 0 }

new App(new Store(), vendingMachineItems, localStorages)
