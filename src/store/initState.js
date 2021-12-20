import { getLocalStorage } from "../util/localStorage.js"

export const initState = {
  products: getLocalStorage("products") || []
}
