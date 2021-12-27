import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/data/localStorage'

const VENDING_PRODUCT_KEY = 'vending_machine_product_key'

export type ProductProps = { name: string; price: number; quantity: number }

export default class ProductStore {
  #productMap
  #productList

  constructor() {
    this.#productMap = new Map<string, Omit<ProductProps, 'name'>>()
    const savedProducts: ProductProps[] =
      getLocalStorageItem({ key: VENDING_PRODUCT_KEY }) ?? []

    this.#productList = savedProducts

    savedProducts.forEach(({ name, price, quantity }) => {
      this.#productMap.set(name, { price, quantity })
    })
  }

  setProduct({ name, price, quantity }: ProductProps): boolean {
    if (!this.isValidProduct({ name, price, quantity })) {
      return false
    }

    const isDuplicated = !!this.#productMap.get(name)

    if (isDuplicated) {
      this.#productMap.set(name, { price, quantity })
      this.#productList = this.#productList.filter(
        (product) => product.name !== name
      )
    }

    this.#productList.push({ name, price, quantity })
    setLocalStorageItem({ key: VENDING_PRODUCT_KEY, value: this.#productList })

    return true
  }

  getProduct({ name }: { name: string }): null | ProductProps {
    const product = this.#productMap.get(name)

    if (!product) {
      return null
    }

    return { name, price: product.price, quantity: product.quantity }
  }

  isValidProduct({ name, price, quantity }: ProductProps) {
    if (!name || !price || !quantity) {
      return false
    }

    return this.isPriceValid(price)
  }

  getProducts() {
    return this.#productList
  }

  isPriceValid(price: number) {
    if (price < 100) {
      return false
    }

    if (price % 10 !== 0) {
      return false
    }

    return true
  }
}
