import { getLocalStorage } from "../util/localStorage.js"
import { COINS } from '../constants/index.js';

export const initState = {
  currentMachineView: getLocalStorage("currentMachineView") || "product-manage",
  products: getLocalStorage("products") || [],
  machineCharge: getLocalStorage("machineCharge") ||
  {
    totalAmount: 0,
    coins: Object.fromEntries(COINS)
  },
  purchaseCharge: getLocalStorage("purchaseCharge") ||
  {
    totalAmount: 0
  }
}
