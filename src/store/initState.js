import { getLocalStorage } from "../util/localStorage.js"
import { COINS } from '../constants/index.js';

export const initState = {
  products: getLocalStorage("products") || [],
  machine: getLocalStorage("machine") ||
  {
    charge: 0,
    coins: Object.fromEntries(COINS)
  }
}
